import process from "node:process";
import { WOOCOMMERCE_DEFAULT_URL } from "@/constant";

/**
 * Unified, safe helper to run fetch requests to the WordPress / WooCommerce REST API on the server.
 */
export async function fetchWP(
  namespace: string,
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
) {
  const siteUrl = process.env.WOOCOMMERCE_URL || WOOCOMMERCE_DEFAULT_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || "";
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || "";

  // Append credentials to URL for authentication
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${siteUrl.replace(/\/$/, "")}/wp-json/${namespace}/${endpoint}${separator}consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorMsg = `WordPress API Error (${namespace}): ${response.status} ${response.statusText}`;
    try {
      const errorJson = await response.json();
      if (errorJson.message) errorMsg = errorJson.message;
    } catch {}
    throw new Error(errorMsg);
  }

  return response.json();
}
