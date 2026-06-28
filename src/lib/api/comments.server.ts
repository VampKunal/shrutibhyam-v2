import process from "node:process";
import { WOOCOMMERCE_DEFAULT_URL } from "@/constant";
import { fetchWooCommerce } from "./woocommerce.functions";

export interface CommentItem {
  id: string;
  productSlug: string;
  userId: number;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
}

/**
 * Maps a WooCommerce review response to the frontend's CommentItem.
 */
function mapReview(r: any, productSlug: string): CommentItem {
  return {
    id: String(r.id),
    productSlug: productSlug,
    userId: Number(r.customer_id) || 0,
    userName: r.reviewer || "Anonymous",
    userEmail: r.reviewer_email || "",
    rating: r.rating || 5,
    comment: r.review ? r.review.replace(/<[^>]*>/g, "").trim() : "",
    date: r.date_created_gmt ? new Date(r.date_created_gmt + "Z").toISOString() : new Date().toISOString(),
  };
}

/**
 * Get product WooCommerce ID by slug.
 */
async function getWooIdBySlug(slug: string): Promise<number | null> {
  const staticMap: Record<string, number> = {
    "shrutibhyam-neem-handmade-soap": 40,
    "shrutibhyam-haldi-handmade-soap": 36,
    "shrutibhyam-lavender-handmade-soap": 32,
    "shrutibhyam-french-clay-handmade-soap": 24,
  };
  if (staticMap[slug]) return staticMap[slug];

  try {
    const data = await fetchWooCommerce(`products?slug=${encodeURIComponent(slug)}`);
    if (Array.isArray(data) && data.length > 0) {
      return data[0].id;
    }
  } catch (error) {
    console.error("Error looking up wooId by slug:", error);
  }
  return null;
}

/**
 * Get product slug by WooCommerce ID.
 */
async function getSlugByWooId(wooId: number): Promise<string> {
  const reverseStaticMap: Record<number, string> = {
    40: "shrutibhyam-neem-handmade-soap",
    36: "shrutibhyam-haldi-handmade-soap",
    32: "shrutibhyam-lavender-handmade-soap",
    24: "shrutibhyam-french-clay-handmade-soap",
  };
  if (reverseStaticMap[wooId]) return reverseStaticMap[wooId];

  try {
    const data = await fetchWooCommerce(`products/${wooId}`);
    return data.slug || "";
  } catch (error) {
    console.error(`Error looking up slug for wooId ${wooId}:`, error);
  }
  return "";
}

/**
 * Get comments for a specific product.
 */
export async function serverGetComments(productSlug: string): Promise<CommentItem[]> {
  const wooId = await getWooIdBySlug(productSlug);
  if (!wooId) return [];

  try {
    const reviews = await fetchWooCommerce(`products/reviews?product=${wooId}`);
    if (Array.isArray(reviews)) {
      return reviews.map((r) => mapReview(r, productSlug));
    }
  } catch (error) {
    console.error(`Error fetching reviews for slug ${productSlug}:`, error);
  }
  return [];
}

/**
 * Get all comments posted by a specific user.
 */
export async function serverGetCommentsByUser(userId: number): Promise<CommentItem[]> {
  try {
    const reviews = await fetchWooCommerce(`products/reviews?customer=${userId}`);
    if (Array.isArray(reviews)) {
      const mapped: CommentItem[] = [];
      for (const r of reviews) {
        const productSlug = await getSlugByWooId(r.product_id);
        mapped.push(mapReview(r, productSlug));
      }
      return mapped;
    }
  } catch (error) {
    console.error(`Error fetching reviews for user ${userId}:`, error);
  }
  return [];
}

/**
 * Add a new comment.
 */
export async function serverAddComment(
  productSlug: string,
  user: { id: number; email: string; displayName: string },
  rating: number,
  commentText: string
): Promise<CommentItem> {
  const wooId = await getWooIdBySlug(productSlug);
  if (!wooId) throw new Error("Product not found");

  // Check for duplicates
  const existingReviews = await fetchWooCommerce(
    `products/reviews?product=${wooId}&reviewer_email=${encodeURIComponent(user.email)}`
  );
  if (Array.isArray(existingReviews) && existingReviews.length > 0) {
    throw new Error("You have already reviewed this product.");
  }

  const reviewData = {
    product_id: wooId,
    review: commentText,
    reviewer: user.displayName || user.email.split("@")[0],
    reviewer_email: user.email,
    rating: rating,
    status: "approved",
    customer_id: user.id
  };

  const newReview = await fetchWooCommerce("products/reviews", "POST", reviewData);
  return mapReview(newReview, productSlug);
}

/**
 * Update an existing comment (author validation required).
 */
export async function serverUpdateComment(
  commentId: string,
  userId: number,
  rating: number,
  commentText: string
): Promise<CommentItem | null> {
  const review = await fetchWooCommerce(`products/reviews/${commentId}`);
  if (!review) {
    throw new Error("Review not found");
  }

  // Ensure user is the author
  if (Number(review.customer_id) !== userId) {
    throw new Error("You are not authorized to update this review");
  }

  const updatedReview = await fetchWooCommerce(`products/reviews/${commentId}`, "PUT", {
    review: commentText,
    rating: rating,
  });

  const productSlug = await getSlugByWooId(updatedReview.product_id);
  return mapReview(updatedReview, productSlug);
}

/**
 * Delete a comment (author validation required).
 */
export async function serverDeleteComment(commentId: string, userId: number): Promise<boolean> {
  const review = await fetchWooCommerce(`products/reviews/${commentId}`);
  if (!review) {
    throw new Error("Review not found");
  }

  // Ensure user is the author
  if (Number(review.customer_id) !== userId) {
    throw new Error("You are not authorized to delete this review");
  }

  await fetchWooCommerce(`products/reviews/${commentId}?force=true`, "DELETE");
  return true;
}
