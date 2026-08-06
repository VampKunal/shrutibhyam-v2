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
  }`,
  // Get home page data
  home: `*[_type == "home"][0] {
    "heroCarousel": heroCarousel[] {
      "desktopImage": desktopImage.asset->url,
      "mobileImage": mobileImage.asset->url,
      link
    },
    "partnersLogos": partnersLogos[].asset->url,
    "stats": stats[] {
      value,
      label
    },
    "craftedWithCare": craftedWithCare[] {
      "mainImage": mainImage.asset->url,
      "subImage1": subImage1.asset->url,
      "subImage2": subImage2.asset->url
    },
    "craftedWithIntention": craftedWithIntention {
      heading,
      description,
      "image": image.asset->url
    },
    "communityExperiences": communityExperiences {
      heading,
      subheading,
      "kindWords": kindWords[] {
        quote,
        name,
        role,
        rating
      },
      "verifiedReviews": verifiedReviews[].asset->url
    },
    "socialRituals": socialRituals {
      heading,
      description,
      "images": images[] {
        "image": image.asset->url,
        link
      }
    }
  }`,
  // Get about page data
  about: `*[_type == "about"][0] {
    "hero": hero {
      heading,
      description,
      "backgroundImage": backgroundImage.asset->url
    },
    "origin": origin {
      heading,
      text,
      "image1": image1.asset->url,
      "image2": image2.asset->url
    },
    "whatWeDo": whatWeDo {
      heading,
      text,
      points,
      "image1": image1.asset->url,
      "image2": image2.asset->url
    },
    "yoga": yoga {
      heading,
      text,
      "image1": image1.asset->url,
      "image2": image2.asset->url
    },
    "pureEthos": pureEthos {
      heading,
      text,
      "image": image.asset->url
    }
  }`,
  // Get yoga page data
  yoga: `*[_type == "yoga"][0] {
    "hero": hero {
      heading,
      description,
      "backgroundImage": backgroundImage.asset->url
    },
    "practices": practices[] {
      name,
      tag,
      desc
    },
    "gallery": gallery[].asset->url
  }`
};
