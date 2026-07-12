import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { mapWooCommerceProduct, LocalProduct, getProductFallbackImage } from "../woocommerce";
import process from "node:process";
import { WOOCOMMERCE_DEFAULT_URL } from "@/constant";

// Thin wrapper around the unified fetchWP helper, pinned to the WooCommerce v3 namespace.
export async function fetchWooCommerce(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE" = "GET", body?: any) {
  const { fetchWP } = await import("./wp.server");
  return fetchWP("wc/v3", endpoint, method, body);
}

/**
 * Server Function: Get all products from WooCommerce.
 */
export const getWooProducts = createServerFn({ method: "GET" })
  .handler(async (): Promise<LocalProduct[]> => {
    try {
      const wpProducts = await fetchWooCommerce("products?per_page=100&status=publish");
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
      const wpProducts = await fetchWooCommerce(`products?slug=${encodeURIComponent(slug)}&status=publish`);
      if (Array.isArray(wpProducts) && wpProducts.length > 0) {
        return mapWooCommerceProduct(wpProducts[0]);
      }
      return null;
    } catch (error) {
      console.error(`Error in getWooProductBySlug for slug "${slug}":`, error);
      return null;
    }
  });

/**
 * Server Function: Get customer profile from WooCommerce.
 */
export const getCustomerProfile = createServerFn({ method: "GET" })
  .validator(z.number())
  .handler(async ({ data: userId }) => {
    try {
      const customer = await fetchWooCommerce(`customers/${userId}`);
      return {
        phone: customer.billing?.phone || "",
        address: customer.shipping?.address_1 || customer.billing?.address_1 || "",
        billing: customer.billing || {},
        shipping: customer.shipping || {},
      };
    } catch (error) {
      console.error(`Error in getCustomerProfile for userId ${userId}:`, error);
      return {
        phone: "",
        address: "",
        billing: {},
        shipping: {},
      };
    }
  });

/**
 * Server Function: Update WooCommerce customer details.
 */
export const updateCustomerProfile = createServerFn({ method: "POST" })
  .validator(z.object({
    userId: z.number(),
    displayName: z.string(),
    phone: z.string(),
    address: z.string(),
  }))
  .handler(async ({ data: { userId, displayName, phone, address } }) => {
    try {
      const parts = displayName.trim().split(/\s+/);
      const first_name = parts[0] || "";
      const last_name = parts.slice(1).join(" ") || "";

      await fetchWooCommerce(`customers/${userId}`, "PUT", {
        first_name,
        last_name,
        billing: {
          first_name,
          last_name,
          phone,
          address_1: address,
        },
        shipping: {
          first_name,
          last_name,
          address_1: address,
        }
      });

      // Update WordPress user profile (name, display name)
      const { getCookie } = await import("@tanstack/react-start/server");
      const token = getCookie("wp_jwt_token");
      if (token) {
        const siteUrl = process.env.WOOCOMMERCE_URL || WOOCOMMERCE_DEFAULT_URL;
        await fetch(`${siteUrl.replace(/\/$/, "")}/wp-json/wp/v2/users/me`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: displayName,
            first_name,
            last_name,
          }),
        });
      }

      return { success: true };
    } catch (error) {
      console.error(`Error in updateCustomerProfile for userId ${userId}:`, error);
      throw error;
    }
  });

/**
 * Server Function: Fetch customer orders from WooCommerce.
 */
export const getCustomerOrders = createServerFn({ method: "GET" })
  .validator(z.number())
  .handler(async ({ data: userId }) => {
    try {
      const wpOrders = await fetchWooCommerce(`orders?customer=${userId}`);
      if (Array.isArray(wpOrders)) {
        return wpOrders.map((o: any) => {
          let statusColor = "text-gray-600 bg-gray-50 border-gray-200";
          let friendlyStatus = o.status.charAt(0).toUpperCase() + o.status.slice(1);
          
          if (o.status === "processing") {
            statusColor = "text-amber-600 bg-amber-50 border-amber-200";
            friendlyStatus = "Processing";
          } else if (o.status === "completed") {
            statusColor = "text-sage-green bg-green-50 border-green-200";
            friendlyStatus = "Delivered";
          } else if (o.status === "on-hold") {
            statusColor = "text-blue-600 bg-blue-50 border-blue-200";
            friendlyStatus = "On Hold";
          } else if (["cancelled", "refunded", "failed"].includes(o.status)) {
            statusColor = "text-red-600 bg-red-50 border-red-200";
            friendlyStatus = o.status.charAt(0).toUpperCase() + o.status.slice(1);
          }

          let step = 1;
          if (o.status === "processing") step = 2;
          else if (o.status === "completed") step = 4;

          let carrier = "Standard Shipping";
          let trackingNumber = "N/A";
          
          if (Array.isArray(o.meta_data)) {
            const trackingProvider = o.meta_data.find((m: any) => m.key === "_tracking_provider" || m.key === "_shipping_provider");
            const trackingNum = o.meta_data.find((m: any) => m.key === "_tracking_number" || m.key === "_shipping_number");
            if (trackingProvider) carrier = trackingProvider.value;
            if (trackingNum) trackingNumber = trackingNum.value;
          }

          return {
            id: `SB-${o.id}`,
            date: o.date_created ? o.date_created.split("T")[0] : "",
            total: parseFloat(o.total || "0"),
            status: friendlyStatus,
            statusColor,
            items: (o.line_items || []).map((item: any) => {
              let image = item.image?.src || "";
              if (!image) {
                image = getProductFallbackImage(item.name || "");
              }

              return {
                name: item.name || "",
                qty: item.quantity || 1,
                price: parseFloat(item.price || "0"),
                image,
              };
            }),
            tracking: {
              carrier,
              number: trackingNumber,
              step,
            }
          };
        });
      }
      return [];
    } catch (error) {
      console.error(`Error in getCustomerOrders for userId ${userId}:`, error);
      return [];
    }
  });
