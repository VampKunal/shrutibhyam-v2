import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: import.meta.env.PROD,
  apiVersion: '2024-03-01', // use a recent date
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Reusable GROQ queries
export const queries = {
  // Get product enrichment data matching the WooCommerce slug
  productEnrichment: `*[_type == "productEnrichment" && slug.current == $slug][0] {
    ...,
    purityTags,
    "productStats": productStats[] {
      value,
      label
    },
    "customerStories": customerStories[] {
      name,
      rating,
      text,
      "image": image.asset->url,
      "video": video.asset->url
    },
    "accordions": accordions[] {
      title,
      body
    }
  }`,
  // Get site-wide FAQs
  faqs: `*[_type == "faq"] | order(order asc)`,
  // Site settings / configuration
  siteSettings: `*[_type == "siteSettings"][0] {
    ...,
    "dealPopupImage": dealPopupImage.asset->url
  }`,
  // Get active events
  events: `*[_type == "event" && isActive == true] | order(order asc, date desc) {
    ...,
    "image": image.asset->url
  }`
};
