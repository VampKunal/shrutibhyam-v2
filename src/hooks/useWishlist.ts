import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/lib/api/wishlist.functions";

/**
 * Centralised wishlist state & API calls.
 * Fetches the user's wishlist on mount (when logged in) and
 * provides a toggle function that handles add/remove + login check.
 */
export function useWishlist() {
  const { user } = useAuth();
  const [wishlistSlugs, setWishlistSlugs] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      getWishlist({ data: user.id }).then(setWishlistSlugs).catch(console.error);
    } else {
      setWishlistSlugs([]);
    }
  }, [user]);

  const isInWishlist = useCallback(
    (slug: string) => wishlistSlugs.includes(slug),
    [wishlistSlugs],
  );

  const toggleWishlist = useCallback(
    async (slug: string, e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!user) {
        alert("Please log in using the profile icon at the top right to manage your wishlist.");
        return;
      }
      const wishlisted = wishlistSlugs.includes(slug);
      try {
        if (wishlisted) {
          await removeFromWishlist({ data: { userId: user.id, productSlug: slug } });
          setWishlistSlugs((prev) => prev.filter((s) => s !== slug));
        } else {
          await addToWishlist({ data: { userId: user.id, productSlug: slug } });
          setWishlistSlugs((prev) => [...prev, slug]);
        }
      } catch (err) {
        console.error("Error toggling wishlist:", err);
      }
    },
    [user, wishlistSlugs],
  );

  return { wishlistSlugs, isInWishlist, toggleWishlist };
}
