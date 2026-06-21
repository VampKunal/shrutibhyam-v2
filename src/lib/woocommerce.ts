/**
 * WooCommerce integration helpers.
 */

// Define your WordPress/WooCommerce site base URL here.
// You can override this using the VITE_WOOCOMMERCE_URL environment variable in your production build.
export const WOOCOMMERCE_BASE_URL =
  (import.meta.env.VITE_WOOCOMMERCE_URL as string) || "https://your-woocommerce-store.com";

export interface LocalProduct {
  slug: string;
  name: string;
  tag: string;
  subtitle: string;
  price: number;
  regularPrice?: number;
  onSale?: boolean;
  image: string;
  wooId: number;
}

const A = "https://lh3.googleusercontent.com/aida-public/";
const FALLBACK_IMAGES = {
  neem: A + "AB6AXuAQfRJwv1Xb6I-IFnyy2EKoulNGjLvUulC9Crl07IpYwNWfK0A2v3Eo8HorTKTW0Bbz0V2gb5pXWD_jdzEXt3es1HW6uP3MxMC4mcD4tbrvBZaS6ynqe0twAYtIHtWzneYQwj95nwMUitNW5gjOmsUm2eJad7x4zjR03EqzRhFJ50qgH5QwWN1Aa2FZdHIPUGcRpEmeFzw6LXP9CpfQ6pQV6d2xHUD_0bT0Q9JA7v16T0I9r2uDm-mX3tWA_-mCBp739zahIqTAkvs", // faceOil (soap look)
  haldi: A + "AB6AXuAQfRJwv1Xb6I-IFnyy2EKoulNGjLvUulC9Crl07IpYwNWfK0A2v3Eo8HorTKTW0Bbz0V2gb5pXWD_jdzEXt3es1HW6uP3MxMC4mcD4tbrvBZaS6ynqe0twAYtIHtWzneYQwj95nwMUitNW5gjOmsUm2eJad7x4zjR03EqzRhFJ50qgH5QwWN1Aa2FZdHIPUGcRpEmeFzw6LXP9CpfQ6pQV6d2xHUD_0bT0Q9JA7v16T0I9r2uDm-mX3tWA_-mCBp739zahIqTAkvs", // faceOil (soap look)
  lavender: A + "AB6AXuAoAfn-VZ12KVYMg0ZLJFQGmnX9lcnvGabBwCF_Gwzt04aHBai61-0dS5-furtqtFwTSg12LQwWMjR3O1zS3X_nqNqgl0dQHSjwYDJV0drhn8g7BnoI2vKyhbHNx5d-ss38KdeRFU_ae2MFvGOoaWFGrTxduaAaITp_jwGC7Y0noaEwVwPUuNOTCijqOpE-2H2x_BSEn4ef7n0HBO7C9w6x6MO3b5TxeVBn5uUzLJUUgiN2ujrXFLN2Hry-jXWrvPZAC1zacp25wfM", // serum
  clay: A + "AB6AXuB05hpJLG59gXzTieixMZePrnSgzi3wIA3HG432wz1VVUF3smdlsorH-q7VBhr9m66l2RnF7Z4zjvyxTgDojz7MwJhxBokMAs_4NIZO-QKXSz0gwMcafyPRhj_e2bJ9cRGgYtFz7QS_fUFRUkRi5UDedAqYavMN98-iYVpFIbv_2VwwQ0vxKGQ7KPgqcaXzqFFHFhfFSnKdx5_Xqn0urJ-4MMex9mgJQ62F82kgzXoJ2MAb2mv7a0FHp6rXaIbfL7fJUY6-TMsqkug", // powder
};

function extractFirstImageFromHtml(html: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

/**
 * Maps a raw WooCommerce API product payload to the frontend's LocalProduct structure.
 */
export function mapWooCommerceProduct(wpProduct: any): LocalProduct {
  // Extract and clean the description or short description for a subtitle
  const rawSubtitle = wpProduct.short_description || wpProduct.description || "";
  let subtitle = rawSubtitle
    ? rawSubtitle.replace(/<[^>]*>/g, "").trim()
    : "";

  if (subtitle) {
    if (subtitle.length > 80) {
      subtitle = subtitle.substring(0, 77) + "...";
    }
  } else {
    // Premium fallback based on product type
    const nameLower = (wpProduct.name || "").toLowerCase();
    if (nameLower.includes("soap")) {
      subtitle = "Cold-Processed Handmade Soap Bar";
    } else {
      subtitle = "Handcrafted Wellness Purity";
    }
  }

  // Get categories tag
  let tag = wpProduct.categories?.[0]?.name || "";
  if (!tag || tag === "Uncategorized") {
    const nameLower = (wpProduct.name || "").toLowerCase();
    if (nameLower.includes("soap")) {
      tag = "Cold-Pressed";
    } else {
      tag = "Ayurvedic";
    }
  }

  // Extract first image, or try to fallback to the first image inside description HTML or keyword
  let image = wpProduct.images?.[0]?.src 
    || extractFirstImageFromHtml(wpProduct.description)
    || extractFirstImageFromHtml(wpProduct.short_description);

  if (!image) {
    const slugLower = (wpProduct.slug || "").toLowerCase();
    if (slugLower.includes("neem")) {
      image = FALLBACK_IMAGES.neem;
    } else if (slugLower.includes("haldi")) {
      image = FALLBACK_IMAGES.haldi;
    } else if (slugLower.includes("lavender")) {
      image = FALLBACK_IMAGES.lavender;
    } else if (slugLower.includes("clay") || slugLower.includes("french")) {
      image = FALLBACK_IMAGES.clay;
    } else {
      image = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500";
    }
  }

  return {
    slug: wpProduct.slug || "",
    name: wpProduct.name || "",
    tag: tag,
    subtitle: subtitle,
    price: parseFloat(wpProduct.price || "0"),
    regularPrice: wpProduct.regular_price ? parseFloat(wpProduct.regular_price) : undefined,
    onSale: !!wpProduct.on_sale,
    image: image,
    wooId: wpProduct.id,
  };
}


/**
 * Generates a direct checkout URL for a single product.
 * @param wooId The product ID in WooCommerce
 * @param quantity The quantity to add
 */
export function getSingleProductCheckoutUrl(wooId: number, quantity: number = 1): string {
  // Safe normalization of base URL (removing trailing slash)
  const normalizedBaseUrl = WOOCOMMERCE_BASE_URL.replace(/\/$/, "");
  return `${normalizedBaseUrl}/checkout/?add-to-cart=${wooId}&quantity=${quantity}`;
}

/**
 * Generates a direct checkout URL for multiple products (requires the custom PHP functions.php helper on WordPress).
 * @param items Array of objects containing wooId and quantity
 */
export function getMultiProductCheckoutUrl(items: { wooId: number; quantity: number }[]): string {
  const normalizedBaseUrl = WOOCOMMERCE_BASE_URL.replace(/\/$/, "");
  if (items.length === 0) {
    return `${normalizedBaseUrl}/checkout/`;
  }
  
  // Use standard native WooCommerce format for single items to ensure compatibility
  if (items.length === 1) {
    return `${normalizedBaseUrl}/checkout/?add-to-cart=${items[0].wooId}&quantity=${items[0].quantity}&clear-cart=1`;
  }
  
  // Format: ID1:QTY1,ID2:QTY2... (requires custom PHP functions.php helper on WordPress site)
  const cartQuery = items
    .map(item => `${item.wooId}:${item.quantity}`)
    .join(",");
    
  return `${normalizedBaseUrl}/checkout/?add-to-cart=${cartQuery}&clear-cart=1`;
}
