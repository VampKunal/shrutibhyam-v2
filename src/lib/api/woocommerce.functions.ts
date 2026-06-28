import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { mapWooCommerceProduct, LocalProduct } from "../woocommerce";
import process from "node:process";
import { WOOCOMMERCE_DEFAULT_URL } from "@/constant";

// Safe helper to run fetch requests to WooCommerce REST API on the server
async function fetchWooCommerce(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE" = "GET", body?: any) {
  const siteUrl = process.env.WOOCOMMERCE_URL || WOOCOMMERCE_DEFAULT_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || "";
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || "";

  // Append credentials to URL for authentication
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${siteUrl.replace(/\/$/, "")}/wp-json/wc/v3/${endpoint}${separator}consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorMsg = `WooCommerce API Error: ${response.status} ${response.statusText}`;
    try {
      const errorJson = await response.json();
      if (errorJson.message) errorMsg = errorJson.message;
    } catch {}
    throw new Error(errorMsg);
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
                const nameLower = (item.name || "").toLowerCase();
                if (nameLower.includes("neem")) {
                  image = "https://lh3.googleusercontent.com/aida-public/AB6AXuAQfRJwv1Xb6I-IFnyy2EKoulNGjLvUulC9Crl07IpYwNWfK0A2v3Eo8HorTKTW0Bbz0V2gb5pXWD_jdzEXt3es1HW6uP3MxMC4mcD4tbrvBZaS6ynqe0twAYtIHtWzneYQwj95nwMUitNW5gjOmsUm2eJad7x4zjR03EqzRhFJ50qgH5QwWN1Aa2FZdHIPUGcRpEmeFzw6LXP9CpfQ6pQV6d2xHUD_0bT0Q9JA7v16T0I9r2uDm-mX3tWA_-mCBp739zahIqTAkvs";
                } else if (nameLower.includes("haldi")) {
                  image = "https://lh3.googleusercontent.com/aida-public/AB6AXuAQfRJwv1Xb6I-IFnyy2EKoulNGjLvUulC9Crl07IpYwNWfK0A2v3Eo8HorTKTW0Bbz0V2gb5pXWD_jdzEXt3es1HW6uP3MxMC4mcD4tbrvBZaS6ynqe0twAYtIHtWzneYQwj95nwMUitNW5gjOmsUm2eJad7x4zjR03EqzRhFJ50qgH5QwWN1Aa2FZdHIPUGcRpEmeFzw6LXP9CpfQ6pQV6d2xHUD_0bT0Q9JA7v16T0I9r2uDm-mX3tWA_-mCBp739zahIqTAkvs";
                } else if (nameLower.includes("lavender")) {
                  image = "https://lh3.googleusercontent.com/aida-public/AB6AXuAoAfn-VZ12KVYMg0ZLJFQGmnX9lcnvGabBwCF_Gwzt04aHBai61-0dS5-furtqtFwTSg12LQwWMjR3O1zS3X_nqNqgl0dQHSjwYDJV0drhn8g7BnoI2vKyhbHNx5d-ss38KdeRFU_ae2MFvGOoaWFGrTxduaAaITp_jwGC7Y0noaEwVwPUuNOTCijqOpE-2H2x_BSEn4ef7n0HBO7C9w6x6MO3b5TxeVBn5uUzLJUUgiN2ujrXFLN2Hry-jXWrvPZAC1zacp25wfM";
                } else if (nameLower.includes("clay") || nameLower.includes("french")) {
                  image = "https://lh3.googleusercontent.com/aida-public/AB6AXuB05hpJLG59gXzTieixMZePrnSgzi3wIA3HG432wz1VVUF3smdlsorH-q7VBhr9m66l2RnF7Z4zjvyxTgDojz7MwJhxBokMAs_4NIZO-QKXSz0gwMcafyPRhj_e2bJ9cRGgYtFz7QS_fUFRUkRi5UDedAqYavMN98-iYVpFIbv_2VwwQ0vxKGQ7KPgqcaXzqFFHFhfFSnKdx5_Xqn0urJ-4MMex9mgJQ62F82kgzXoJ2MAb2mv7a0FHp6rXaIbfL7fJUY6-TMsqkug";
                } else {
                  image = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500";
                }
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
