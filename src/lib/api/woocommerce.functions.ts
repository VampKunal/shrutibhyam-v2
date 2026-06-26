import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { mapWooCommerceProduct, LocalProduct } from "../woocommerce";
import process from "node:process";
import { WOOCOMMERCE_DEFAULT_URL } from "@/constant";

// Safe helper to run fetch requests to WooCommerce REST API on the server
async function fetchWooCommerce(endpoint: string) {
  const siteUrl = process.env.WOOCOMMERCE_URL || WOOCOMMERCE_DEFAULT_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || "";
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || "";

  // Append credentials to URL for authentication
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${siteUrl.replace(/\/$/, "")}/wp-json/wc/v3/${endpoint}${separator}consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`WooCommerce API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Server Function: Get all products from WooCommerce.
 */
export const getWooProducts = createServerFn({ method: "GET" })
  .handler(async (): Promise<LocalProduct[]> => {
    try {
      const wpProducts = await fetchWooCommerce("products?per_page=100");
      if (Array.isArray(wpProducts)) {
        return wpProducts.map(mapWooCommerceProduct);
      }
      return [];
    } catch (error) {
      console.error("Error in getWooProducts server function:", error);
      return [];
    }
  });

/**
 * Server Function: Get a single product from WooCommerce by slug.
 */
export const getWooProductBySlug = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: slug }): Promise<LocalProduct | null> => {
    try {
      const wpProducts = await fetchWooCommerce(`products?slug=${encodeURIComponent(slug)}`);
      if (Array.isArray(wpProducts) && wpProducts.length > 0) {
        return mapWooCommerceProduct(wpProducts[0]);
      }
      return null;
    } catch (error) {
      console.error(`Error in getWooProductBySlug for slug "${slug}":`, error);
      return null;
    }
  });
