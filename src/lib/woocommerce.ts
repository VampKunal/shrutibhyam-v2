/**
 * WooCommerce integration helpers.
 */

// Define your WordPress/WooCommerce site base URL here.
// You can override this using the VITE_WOOCOMMERCE_URL environment variable in your production build.
import { WOOCOMMERCE_DEFAULT_URL, IMG } from "@/constant";

export const WOOCOMMERCE_BASE_URL =
  (import.meta.env.VITE_WOOCOMMERCE_URL as string) || WOOCOMMERCE_DEFAULT_URL;

export interface LocalProduct {
  slug: string;
  name: string;
  tag: string;
  categories: string[];
  subtitle: string;
  price: number;
  regularPrice?: number;
  onSale?: boolean;
  image: string;
  galleryImages: string[];
  wooId: number;
  descriptionHtml?: string;
  shortDescriptionHtml?: string;
}

function extractFirstImageFromHtml(html: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

/**
 * Returns a fallback image URL based on a product name or slug.
 * Single source of truth — used by mapWooCommerceProduct and getCustomerOrders.
 */
export function getProductFallbackImage(nameOrSlug: string): string {
  const lower = nameOrSlug.toLowerCase();
  if (lower.includes("neem")) return IMG.faceOil;
  if (lower.includes("haldi")) return IMG.faceOil;
  if (lower.includes("lavender")) return IMG.serum;
  if (lower.includes("clay") || lower.includes("french")) return IMG.powder;
  return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500";
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

  if (subtitle && subtitle.length > 80) {
    subtitle = subtitle.substring(0, 77) + "...";
  }

  // Get categories from WooCommerce
  const categories = (wpProduct.categories || []).map((c: any) => c.name);
  const tag = categories.length > 0 ? categories[0] : "Others";

  // Get all gallery images
  const galleryImages = (wpProduct.images || []).map((img: any) => img.src);

  // Extract first image, or try to fallback
  let image = galleryImages.length > 0 ? galleryImages[0] 
    : extractFirstImageFromHtml(wpProduct.description)
    || extractFirstImageFromHtml(wpProduct.short_description);

  if (!image) {
    image = getProductFallbackImage(wpProduct.slug || wpProduct.name || "");
  }

  return {
    slug: wpProduct.slug || "",
    name: wpProduct.name || "",
    tag: tag,
    categories: categories,
    subtitle: subtitle,
    price: parseFloat(wpProduct.price || "0"),
    regularPrice: wpProduct.regular_price ? parseFloat(wpProduct.regular_price) : undefined,
    onSale: !!wpProduct.on_sale,
    image: image,
    galleryImages: galleryImages,
    wooId: wpProduct.id,
    descriptionHtml: wpProduct.description || "",
    shortDescriptionHtml: wpProduct.short_description || "",
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

export interface ParsedProductContent {
  description: string;
  accordions: { title: string; body: string }[];
}

/**
 * Dynamically parses a WooCommerce HTML description into a clean description paragraph
 * and structured accordions based on standard heading formats (e.g. bold titles inside paragraphs).
 */
export function parseProductDescription(html: string, productName: string): ParsedProductContent {
  if (!html) return { description: "", accordions: [] };

  const sections: { title: string; body: string }[] = [];
  let description = "";

  // Normalize headings (e.g. h1-h6) to <p><strong> for parsing consistency
  let cleanHtml = html
    .replace(/<h[1-6][^>]*>/g, '<p><strong>')
    .replace(/<\/h[1-6]>/g, '</strong></p>');

  // Find headings: <p><strong>Title</strong></p>
  const headingRegex = /<p[^>]*>\s*<strong>(.*?)<\/strong>\s*<\/p>/gi;
  
  let match;
  const headings: { title: string; index: number; length: number }[] = [];
  while ((match = headingRegex.exec(cleanHtml)) !== null) {
    headings.push({
      title: match[1].replace(/<[^>]*>/g, '').trim(),
      index: match.index,
      length: match[0].length
    });
  }

  // Fallback to searching inline strong elements (e.g. <strong>Title:</strong>)
  if (headings.length === 0) {
    const inlineHeadingRegex = /<strong>(Why choose Neem Soap\?|Why Haldi Soap\?|Why Lavender Soap\?|Key Ingredients|Ingredients|Directions for Use|Safety &amp; Precautions|Safety Precautions|Storage &amp; Shelf Life|Skin Type Suitability|Additional Information)<\/strong>/gi;
    let inlineMatch;
    while ((inlineMatch = inlineHeadingRegex.exec(cleanHtml)) !== null) {
      headings.push({
        title: inlineMatch[1].replace(/<[^>]*>/g, '').trim(),
        index: inlineMatch.index,
        length: inlineMatch[0].length
      });
    }
  }

  headings.sort((a, b) => a.index - b.index);

  if (headings.length > 0) {
    description = cleanHtml.substring(0, headings[0].index).trim();

    for (let i = 0; i < headings.length; i++) {
      const current = headings[i];
      const start = current.index + current.length;
      const end = (i + 1 < headings.length) ? headings[i + 1].index : cleanHtml.length;
      
      const contentHtml = cleanHtml.substring(start, end).trim();
      const bodyHtml = contentHtml.replace(/^(?:\s*<p>&nbsp;<\/p>|\s*<br\s*\/?>)+|(?:\s*<p>&nbsp;<\/p>|\s*<br\s*\/?>)+$/g, '').trim();

      const titleDecoded = current.title
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
        .replace(/:/g, '')
        .trim();

      if (titleDecoded && bodyHtml) {
        sections.push({
          title: titleDecoded,
          body: bodyHtml
        });
      }
    }
  } else {
    description = cleanHtml;
  }

  // If the first section title matches the product name or "shrutibhyam", make its body the description and remove it from accordions
  if (sections.length > 0) {
    const firstTitle = sections[0].title.toLowerCase();
    const prodNameLower = productName.toLowerCase();
    if (firstTitle.includes("shrutibhyam") || firstTitle.includes(prodNameLower) || prodNameLower.includes(firstTitle)) {
      description = sections[0].body;
      sections.shift();
    }
  }

  if (!description.trim()) {
    description = cleanHtml;
  }

  return { description, accordions: sections };
}
