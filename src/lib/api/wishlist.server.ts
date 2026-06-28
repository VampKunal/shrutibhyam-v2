import process from "node:process";
import { WOOCOMMERCE_DEFAULT_URL } from "@/constant";

/**
 * Helper to call custom WordPress Wishlist REST API.
 */
async function fetchWordPressWishlist(endpoint: string, method: "GET" | "POST" = "GET", body?: any) {
  const siteUrl = process.env.WOOCOMMERCE_URL || WOOCOMMERCE_DEFAULT_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || "";
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || "";

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${siteUrl.replace(/\/$/, "")}/wp-json/wishlist/v1/${endpoint}${separator}consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorMsg = `WordPress Wishlist API Error: ${response.status}`;
    try {
      const errorJson = await response.json();
      if (errorJson.message) errorMsg = errorJson.message;
    } catch {}
    throw new Error(errorMsg);
  }

  return response.json();
}

/**
 * Server Function: Retrieve list of wishlisted product slugs for a user from WordPress meta.
 */
export async function serverGetWishlist(userId: number): Promise<string[]> {
  try {
    const data = await fetchWordPressWishlist(`get?userId=${userId}`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error in serverGetWishlist for user ${userId}:`, error);
    return [];
  }
}

/**
 * Server Function: Add a product slug to user's wishlist in WordPress meta.
 */
export async function serverAddToWishlist(userId: number, productSlug: string): Promise<boolean> {
  try {
    await fetchWordPressWishlist("add", "POST", { userId, productSlug });
    return true;
  } catch (error) {
    console.error(`Error adding to wishlist for user ${userId}:`, error);
    return false;
  }
}

/**
 * Server Function: Remove a product slug from user's wishlist in WordPress meta.
 */
export async function serverRemoveFromWishlist(userId: number, productSlug: string): Promise<boolean> {
  try {
    await fetchWordPressWishlist("remove", "POST", { userId, productSlug });
    return true;
  } catch (error) {
    console.error(`Error removing from wishlist for user ${userId}:`, error);
    return false;
  }
}
