import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Quote, Star, Heart, Loader2 } from "lucide-react";
import { getWooProducts } from "@/lib/api/woocommerce.functions";
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedCategory, setPriceLimit, setSortBy, setCurrentPage, resetFilters } from "@/store/slices/shopSlice";
import { SHOP_TESTIMONIAL } from "@/constant";
import { useAuth } from "@/context/AuthContext";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/lib/api/wishlist.functions";
import { ProductCardImage } from "@/components/site/ProductCardImage";

type ShopSearch = {
  search?: string;
  category?: string;
};

export const Route = createFileRoute("/shop/")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    return {
      search: search.search as string | undefined,
      category: search.category as string | undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Shop Collections — Shrutibhyam Wellness" },
      { name: "description", content: "Handcrafted cold-process Ayurvedic soap bars — pure oils, essential oils, no shortcuts. Rooted in tradition, crafted for today." },
      { property: "og:title", content: "Ayurvedic Apothecary — Shrutibhyam" },
    ],
  }),
  loader: async () => {
    const products = await getWooProducts();
    return { products };
    return {};
  },
  staleTime: 1000 * 60 * 5, // 5 minutes cache
  component: Shop,
});

function Shop() {
  const searchParams = Route.useSearch();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { selectedCategory, priceLimit, sortBy, currentPage } = useAppSelector((state) => state.shop);

  const routerState = useRouterState();
  const pendingPath = routerState.status === "pending" ? (routerState as any).pendingLocation?.pathname : null;

  // Fetch from React Query (stale-while-revalidate), already prefetched in root!
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => getWooProducts(),
    staleTime: 1000 * 60 * 10,
  });

  const [wishlistSlugs, setWishlistSlugs] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      getWishlist({ data: user.id }).then(setWishlistSlugs).catch(console.error);
    } else {
      setWishlistSlugs([]);
    }
  }, [user]);

  const handleToggleWishlist = async (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please log in using the profile icon at the top right to manage your wishlist.");
      return;
    }
    const isWishlisted = wishlistSlugs.includes(slug);
    try {
      if (isWishlisted) {
        await removeFromWishlist({ data: { userId: user.id, productSlug: slug } });
        setWishlistSlugs(prev => prev.filter(s => s !== slug));
      } else {
        await addToWishlist({ data: { userId: user.id, productSlug: slug } });
        setWishlistSlugs(prev => [...prev, slug]);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  useEffect(() => {
    if (searchParams.category) {
      dispatch(setSelectedCategory(searchParams.category));
    }
  }, [searchParams.category, dispatch]);

  // Clean up products tags from cache or unexpected backend values
  const normalizedProducts = useMemo(() => {
    return products.map(p => {
      let newTag = "Others";
      const nameL = p.name.toLowerCase();
      const rawTagL = (p.tag || "").toLowerCase();

      if (rawTagL.includes("skin") || rawTagL.includes("soap") || rawTagL.includes("cold") ||
        nameL.includes("soap") || nameL.includes("cream") || nameL.includes("mist") || nameL.includes("elixir") || nameL.includes("oil")) {
        newTag = "Skincare";
      } else if (rawTagL.includes("yoga") || rawTagL.includes("mat") || nameL.includes("yoga") || nameL.includes("mat") || nameL.includes("block")) {
        newTag = "Yoga";
      }
      return { ...p, tag: newTag };
    });
  }, [products]);

  const categories = useMemo(() => {
    const base = ["All Products", "Skincare", "Yoga", "Others"];
    return base.filter((cat) => cat === "All Products" || normalizedProducts.some((p) => p.tag === cat));
  }, [normalizedProducts]);

  // Determine highest product price to scale slider dynamically
  const maxPrice = useMemo(() => {
    const highest = normalizedProducts.reduce((max, p) => (p.price > max ? p.price : max), 0);
    return Math.ceil(highest / 500) * 500 || 5000;
  }, [normalizedProducts]);

  // Removed useEffect for priceLimit override because Redux maintains its own limit.
  // We can just bound the current value locally if we want.
  const effectivePriceLimit = Math.min(priceLimit, maxPrice);

  // Filter products by category and max price
  const filteredProducts = useMemo(() => {
    return normalizedProducts.filter((p) => {
      const matchCategory = selectedCategory === "All Products" || p.tag === selectedCategory;
      const matchPrice = p.price <= effectivePriceLimit;
      const matchSearch = searchParams.search
        ? p.name.toLowerCase().includes(searchParams.search.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchParams.search.toLowerCase())
        : true;
      return matchCategory && matchPrice && matchSearch;
    });
  }, [normalizedProducts, selectedCategory, effectivePriceLimit, searchParams.search]);

  // Sort products based on criteria
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "Price: Low to High") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "Price: High to Low") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "Newest") {
      return list.reverse();
    }
    return list; // Featured / Default
  }, [filteredProducts, sortBy]);

  // Sorting and Pagination are handled directly via Redux state updates,
  // so no local useEffect is needed to reset page numbers (the Redux reducers do it automatically).

  // Pagination calculations
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE) || 1;

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  return (
    <SiteLayout>
      <section
        className="relative bg-cover bg-fixed bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/backdrop1.png')" }}
      >
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
          <span className="inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal mb-4">Apothecary</span>
          <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Ayurvedic Apothecary</h1>
          <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
            Every bar is cold-processed and cured for weeks - preserving natural glycerin for gentler, longer-lasting moisture. No synthetic fragrance. No synthetic colour.
          </p>
        </div>
      </section>

      <section
        className="relative"
      >
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="space-y-8">
            <div>
              <h4 className="font-display text-lg text-primary mb-3">Categories</h4>
              <ul className="space-y-2">
                {categories.map((cat) => {
                  const count = cat === "All Products"
                    ? normalizedProducts.length
                    : normalizedProducts.filter((p) => p.tag === cat).length;
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => dispatch(setSelectedCategory(cat))}
                        className={`text-sm cursor-pointer hover:text-primary transition-colors flex items-center justify-between w-full text-left font-medium ${selectedCategory === cat ? "text-primary font-semibold" : "text-on-surface-variant"
                          }`}
                      >
                        <span>{cat}</span>
                        <span className="text-[10px] bg-soft-beige/50 px-2 py-0.5 rounded-full text-on-surface-variant">
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg text-primary mb-3">Price Range</h4>
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={effectivePriceLimit}
                onChange={(e) => dispatch(setPriceLimit(Number(e.target.value)))}
                className="w-full accent-sage-green cursor-pointer"
              />
              <div className="flex justify-between text-xs text-on-surface-variant mt-2 font-medium">
                <span>₹0</span>
                <span className="text-primary font-semibold">Max: ₹{effectivePriceLimit.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-on-surface-variant">
                Showing {sortedProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} products
              </p>
              <select
                value={sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value))}
                className="bg-surface border border-soft-beige px-3 py-2 text-sm rounded cursor-pointer focus:outline-none focus:ring-1 focus:ring-sage-green"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16 bg-cream-bg border border-soft-beige rounded">
                <h3 className="font-display text-xl text-primary mb-2">No products found</h3>
                <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
                  Try adjusting your price range or selecting another category.
                </p>
                <button
                  onClick={() => dispatch(resetFilters(maxPrice))}
                  className="mt-4 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-5 py-3 hover:bg-surface-tint transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((p, idx) => {
                  const isNavigating = pendingPath === `/shop/${p.slug}`;
                  return (
                    <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="group bg-cream-bg border border-soft-beige rounded overflow-hidden hover:shadow-sm transition relative block">
                      <div className="aspect-square relative overflow-hidden bg-surface-container-low">
                        {isNavigating && (
                          <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-[2px] flex items-center justify-center transition-all">
                            <Loader2 className="animate-spin text-sage-green" size={32} />
                          </div>
                        )}
                        <ProductCardImage product={p as any} imageClassName="group-hover:scale-105" />
                        {idx === 0 && <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-1 z-10">New</span>}
                        <button
                          onClick={(e) => handleToggleWishlist(e, p.slug)}
                          className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm text-primary hover:text-sage-green transition-colors cursor-pointer z-10 flex items-center justify-center"
                          aria-label="Toggle Wishlist"
                        >
                          <Heart
                            size={16}
                            className={wishlistSlugs.includes(p.slug) ? "fill-red-500 text-red-500" : "text-primary hover:text-sage-green"}
                          />
                        </button>
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-sage-green">{p.tag}</span>
                        <h3 className="font-display text-lg text-primary mt-1">{p.name}</h3>
                        <p className="text-sm text-on-surface-variant line-clamp-1">{p.subtitle}</p>
                        <div className="flex items-center gap-2 mt-3 font-medium">
                          {p.onSale && p.regularPrice && p.regularPrice > p.price ? (
                            <>
                              <span className="text-sm font-semibold text-deep-charcoal">₹{p.price.toLocaleString("en-IN")}</span>
                              <span className="text-xs text-on-surface-variant/50 line-through">₹{p.regularPrice.toLocaleString("en-IN")}</span>
                            </>
                          ) : (
                            <span className="text-sm font-semibold text-deep-charcoal">₹{p.price.toLocaleString("en-IN")}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="mt-12 bg-surface-container-low border border-soft-beige rounded-lg p-8 text-center">
              <Quote className="mx-auto text-sage-green mb-3" size={32} strokeWidth={1.5} />
              <p className="italic text-on-surface-variant max-w-2xl mx-auto mb-3">
                "{SHOP_TESTIMONIAL.quote}"
              </p>
              <div className="flex items-center justify-center gap-1 text-sage-green mb-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
              </div>
              <p className="text-xs uppercase tracking-[0.12em] text-primary">— {SHOP_TESTIMONIAL.author}, {SHOP_TESTIMONIAL.role}</p>
            </div>

            <div className="mt-8 bg-cream-bg border border-soft-beige rounded-lg p-6 text-center">
              <p className="text-sm text-on-surface-variant mb-4">
                Skincare is only half the ritual. Explore our yoga classes and sound healing sessions.
              </p>
              <Link to="/yoga" className="inline-flex items-center text-primary text-xs font-semibold uppercase tracking-[0.15em] hover:text-sage-green transition-colors">
                Explore Yoga & Sound Healing
              </Link>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10 text-sm">
                <button
                  onClick={() => dispatch(setCurrentPage(Math.max(1, currentPage - 1)))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 border border-soft-beige hover:bg-soft-beige flex items-center justify-center disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  aria-label="Previous page"
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => dispatch(setCurrentPage(pageNum))}
                      className={`w-9 h-9 flex items-center justify-center font-medium transition-colors cursor-pointer ${currentPage === pageNum
                        ? "bg-primary text-primary-foreground"
                        : "border border-soft-beige hover:bg-soft-beige"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => dispatch(setCurrentPage(Math.min(totalPages, currentPage + 1)))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 border border-soft-beige hover:bg-soft-beige flex items-center justify-center disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  aria-label="Next page"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
