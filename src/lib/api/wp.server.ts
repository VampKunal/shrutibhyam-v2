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
  // Env variables are loaded by the framework (Tanstack Start/Vinxi).
  const siteUrl = process.env.WOOCOMMERCE_URL || WOOCOMMERCE_DEFAULT_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || "";
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || "";

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${siteUrl.replace(/\/$/, "")}/wp-json/${namespace}/${endpoint}${separator}consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

  const startNetwork = performance.now();
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      // Optional: Add a User-Agent to bypass some basic WAF rules
      "User-Agent": "WooCommerce API Client/1.0"
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const networkTime = performance.now() - startNetwork;

  if (!response.ok) {
    let errorBody = "";
    try {
      errorBody = await response.text();
    } catch (e) {
      errorBody = "Could not read response body.";
    }
    
    console.error(`[fetchWP] ERROR ${response.status} ${response.statusText}`);

    let errorMsg = `WordPress API Error (${namespace}): ${response.status} ${response.statusText}`;
    try {
      const errorJson = JSON.parse(errorBody);
      if (errorJson.message) errorMsg = errorJson.message;
    } catch {}
    
    throw new Error(`${errorMsg} - Hostinger CDN might be blocking your local IP. Response: ${errorBody.substring(0,100)}...`);
  }

  const startParse = performance.now();
  const data = await response.json();
  const parseTime = performance.now() - startParse;

  return data;
}

export async function fetchWooCommerce(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
) {
  return fetchWP("wc/v3", endpoint, method, body);
}
