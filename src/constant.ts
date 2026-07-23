import {
  Leaf,
  Hand,
  Recycle,
  Droplets,
  PawPrint,
  FlaskConical,
  Sparkles,
  Flower2,
  Palette
} from "lucide-react";


// WooCommerce configuration defaults
export const WOOCOMMERCE_DEFAULT_URL = "https://your-woocommerce-store.com";

export const MARQUEE_MSG = "Sign up to get 10% off on your first order | Free shipping on all orders above ₹399/-";

// Shared Contact details
export const CONTACT_INFO = {
  name: "Shrutibhyam Wellness",
  address: "Godrej Aria, Tower D, Gurugram, Haryana, India",
  addressShort: "Godrej Aria, Gurugram, Haryana",
  email: "customercare@shrutibhyam.com",
  phone: "DM us on Instagram or email us for the quickest response",
  instagram: "https://www.instagram.com/shrutibhyamyog/",
  facebook: "https://www.facebook.com/people/Shrutibhyam/61590584156475/",
  linkedin: "https://www.linkedin.com/company/110937120",
};

export const IMG = {
  hero: "/backdrop1.webp",
  trust: "/backdrop2.webp",
  faceOil: "/backdrop3.webp",
  powder: "/backdrop4.webp",
  serum: "/backdrop5.webp",
  yoga: "/extras/yog.webp",
  tea: "/extras/introimg.webp",
  Buy: "/extras/Gobuy.webp",
  intro: "/extras/introimg.webp",
  yog: "/extras/yog.webp",
  video: "/extras/introvideo.mp4",
  neem1: "/productg/neem1.avif",
  neem2: "/productg/neem2.avif",
  neem3: "/productg/neem3.avif",
  frenchclay1: "/productg/frenchclay1.avif",
  frenchclay2: "/productg/frenchclay2.avif",
  haldi1: "/productg/haldi1.avif",
  haldi2: "/productg/haldi2.avif",
  lavender1: "/productg/lavender1.avif",
  lavender2: "/productg/lavender2.avif",
  lavender3: "/productg/lavnender3.avif",
  Home: "/extras/Home .png",
  pro1: "/productg/Beige Beauty Skincare Product Fe.webp",
  pro2: "/productg/Earthy Turmeric Ingredients.webp",
  pro3: "/productg/Lavender Soap Ingredients.webp",
  pro4: "/productg/Neem Purify Ingredients.webp",
  pro5: "/productg/Neutral Shadow Skincare Product  (1).webp",
  pro6: "/productg/Neutral Shadow Skincare Product  (3).webp",
  yoga2: "/yoga2.png",
  yoga3: "/yoga3.png",
  img1: "/productg/IMG_9707.PNG",
  img2: "/productg/IMG_9824.PNG",
  img3: "/productg/IMG_9825.PNG",
  img4: "/productg/IMG_9827.PNG",
  img5: "/productg/IMG_9828.PNG",
  img6: "/productg/IMG_9829.PNG",
};

// Local product catalog fallbacks
export const PRODUCTS = [
  { slug: "shrutibhyam-neem-handmade-soap", name: "Shrutibhyam Neem Handmade Soap", tag: "Skincare", subtitle: "Pure Care, Naturally", price: 350, regularPrice: 500, onSale: true, image: "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/1-3.avif", wooId: 40 },
  { slug: "shrutibhyam-haldi-handmade-soap", name: "Shrutibhyam Haldi Handmade Soap", tag: "Skincare", subtitle: "Brightening & Nourishing Care", price: 350, regularPrice: 500, onSale: true, image: "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/2-2.avif", wooId: 36 },
  { slug: "shrutibhyam-lavender-handmade-soap", name: "Shrutibhyam Lavender Handmade Soap", tag: "Skincare", subtitle: "Soothing & Nourishing Care", price: 350, regularPrice: 500, onSale: true, image: "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/1-1.avif", wooId: 32 },
  { slug: "shrutibhyam-french-clay-handmade-soap", name: "Shrutibhyam French Clay Handmade Soap", tag: "Skincare", subtitle: "Gentle detoxifying & nourishing bar", price: 350, regularPrice: 500, onSale: true, image: "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/2.avif", wooId: 24 },
];

// Derived from PRODUCTS — single source of truth for bestseller data
export const BESTSELLERS = PRODUCTS.map(p => ({
  slug: p.slug,
  name: p.name,
  tag: "Bestseller" as const,
  price: p.price,
  image: p.image,
}));

// Home page trust indicators
export const TRUST = [
  { icon: Leaf, label: "AYUSH-Certified Instruction" },
  { icon: Hand, label: "Handcrafted in Gurugram" },
  { icon: Recycle, label: "Small Honest Batches" },
  { icon: Droplets, label: "Cold-Process Skincare" },
];

// Marquee terms
export const MARQUEE = [
  "Vegan",
  "Handcrafted",
  "Hand poured",
  "Cruelty free",
  "Sulphate free",
  "Paraben free",
  "No synthetic fragrance",
  "No synthetic colour"
];

// Home carousel slides
export const HERO_CAROUSEL = [
  { videoDesktop: IMG.video, to: "/about", isVideo: true, imgDesktop: undefined, imgMobile: undefined },
  { imgDesktop: IMG.Buy, imgMobile: IMG.Buy, to: "/shop", isVideo: false, videoDesktop: undefined },
  { imgDesktop: IMG.yog, imgMobile: IMG.trust, to: "/yoga", isVideo: false, videoDesktop: undefined },
  { imgDesktop: IMG.Home, imgMobile: IMG.Home, to: "/events", isVideo: false, videoDesktop: undefined }
];

// Home Frequently Asked Questions
export const FAQ = [
  { q: "Are your products truly cold-pressed?", a: "Yes — we adhere strictly to traditional Ayurvedic cold-pressing methods to preserve vital nutrients, enzymes, and natural aromas." },
  { q: "Do you ship internationally?", a: "We ship within India and to select international destinations including the US, UK, and UAE." },
  { q: "How can I book a private Yoga session?", a: "Use the form on our contact page and select 'Yoga Sessions' as your subject. A master practitioner will follow up." },
  { q: "What is your return policy?", a: "Due to the artisanal nature of our products we do not accept returns, but please contact us within 48 hours of delivery if your order arrives damaged." },
];

// Upcoming Events and Retreats
export const EVENTS = [
  { date: "Oct 15, 2024", name: "Wellness Retreat @ Capgemini", desc: "A day of mindfulness, Ayurvedic practices, and deep relaxation designed for corporate wellness.", location: "Capgemini Campus, Pune" },
  { date: "Nov 02, 2024", name: "Holistic Living Workshop @ DLF", desc: "Explore cold-process beauty, mindful nutrition, and grounding techniques for everyday life.", location: "DLF Cyber City, Gurugram" },
  { date: "Dec 10, 2024", name: "Mindful Flow @ Signature Global", desc: "A guided yoga and somatic movement session focused on breathwork and emotional release.", location: "Signature Global Park, NCR" },
];

// Yoga practices
export const PRACTICES = [
  { tag: "Grounding", name: "Hatha Yoga", desc: "Static postures, deep breathing, and mindful alignment. Build stability while returning to breath and stillness." },
  { tag: "Discipline", name: "Ashtanga Yoga", desc: "A structured, breath-linked sequence for strength, focus, and steady inner rhythm." },
  { tag: "Supported", name: "Prop-Based Practice", desc: "Bolsters, blocks, and straps support accessible, sustainable alignment for every level." },
  { tag: "Stillness", name: "Sound Healing Yoga", desc: "Movement paired with immersive sound in collaboration with Arahat Sound Dwellness." },
];

// Yoga schedule
export const SCHEDULE = [
  { time: "07:00", period: "AM", name: "Morning Hatha Yoga", duration: "60 Min", teacher: "AYUSH-certified instructor", state: "open" },
  { time: "12:30", period: "PM", name: "Prop-Based Practice", duration: "45 Min", teacher: "AYUSH-certified instructor", state: "open" },
  { time: "18:00", period: "PM", name: "Sound Healing Yoga", duration: "75 Min", teacher: "With Arahat Sound Dwellness", state: "waitlist" },
];

// Testimonials configurations
export const HOME_TESTIMONIALS = [
  { quote: "We're a young, growing brand - every bar is still made by hand, in small batches, by us. Your feedback shapes what we make next.", name: "Team Shrutibhyam", role: "Founder-led brand" },
  { quote: "Every class is kept personal and grounded in breath, alignment, and traditional practice.", name: "Shrutibhyam Yoga", role: "AYUSH-certified instruction" },
  { quote: "Sound healing sessions are designed as a quiet pause for the nervous system, created with Arahat Sound Dwellness.", name: "Shrutibhyam", role: "Sound healing" },
];

export const YOGA_TESTIMONIALS = [
  { q: "Every session is small, personal, and taught with real Ayurvedic grounding - not a studio franchise script. Come as you are.", name: "Shrutibhyam", role: "Founder voice" },
];

export const EVENT_TESTIMONIALS = [
  { q: "The retreat at Capgemini was a breath of fresh air. It re-centered my focus and introduced me to practices I now use daily.", name: "Anjali S." },
  { q: "Attending the DLF workshop completely shifted my perspective on wellness. The holistic approach felt genuine and rooted.", name: "Vikram R." },
  { q: "Beautifully organized and grounding. The Signature Global event was exactly the pause I needed in my busy life.", name: "Priya M." },
];

export const SHOP_TESTIMONIAL = {
  quote: HOME_TESTIMONIALS[0].quote,
  author: HOME_TESTIMONIALS[0].name,
  role: HOME_TESTIMONIALS[0].role,
};

export const SHOP_REVIEWS = [
  { stars: 5, q: "Small-batch, handmade, and still shaped by real customer feedback.", name: "Team Shrutibhyam" },
];

export const SCREENSHOT_TESTIMONIALS = [
  "/testimonials/d41930fd-3ce2-41bf-9aae-44d2e5201913.webp",
  "/testimonials/ec52fb5b-3e99-41cc-bd4c-21f856dabcaa.webp",
  "/testimonials/f95a9437-c35a-4c40-aaac-fdfa32df34f7.webp"
];


// Product details configuration & interfaces
export interface DetailContent {
  description: string;
  accordions: { title: string; body: string }[];
  purityTags: string[];
}

export const PRODUCT_DETAILS: Record<string, DetailContent> = {
  "shrutibhyam-haldi-handmade-soap": {
    description: "Rooted in ancient Ayurvedic wisdom, this cold-process bar is enriched with turmeric, cold-pressed oils, vitamin E, and pure essential oils. It gently cleanses while preserving natural glycerin for lasting moisture.",
    purityTags: ["Cold-Pressed", "Vegan"],
    accordions: [
      { title: "Ingredients", body: "Cold-pressed coconut, olive, almond, castor, and neem oils; vitamin E; turmeric; pure essential oils. Free from synthetic fragrance and synthetic colour." },
      { title: "Benefits", body: "A brightening everyday cleanse with gentle moisture from naturally formed glycerin." },
      { title: "How to Use", body: "Lather between hands with warm water, gently massage onto damp skin, and rinse thoroughly. Store on a well-draining soap dish to prolong life." },
    ]
  },
  "shrutibhyam-neem-handmade-soap": {
    description: "Handcrafted with cold-pressed neem and nourishing plant oils, this cold-process bar supports a clean, balanced skin ritual without harsh synthetic additives.",
    purityTags: ["Cold-Pressed", "Purifying"],
    accordions: [
      { title: "Ingredients", body: "Cold-pressed coconut, olive, almond, castor, and neem oils; vitamin E; pure essential oils. Free from synthetic fragrance and synthetic colour." },
      { title: "Benefits", body: "Neem supports a purifying cleanse while cold-process soap keeps naturally formed glycerin intact." },
      { title: "How to Use", body: "Lather between hands with warm water, gently massage onto damp skin, and rinse thoroughly. Store on a well-draining soap dish to prolong life." },
    ]
  },
  "shrutibhyam-lavender-handmade-soap": {
    description: "A calming cold-process soap crafted with cold-pressed oils, vitamin E, and pure lavender-forward essential oils for a soft, grounded daily ritual.",
    purityTags: ["Cold-Pressed", "Calming"],
    accordions: [
      { title: "Ingredients", body: "Cold-pressed coconut, olive, almond, castor, and neem oils; vitamin E; lavender and pure essential oils. Free from synthetic fragrance and synthetic colour." },
      { title: "Benefits", body: "A soothing cleanse for slow evenings and gentle everyday care." },
      { title: "How to Use", body: "Lather between hands with warm water, gently massage onto damp skin, and rinse thoroughly. Store on a well-draining soap dish to prolong life." },
    ]
  },
  "shrutibhyam-french-clay-handmade-soap": {
    description: "A mineral-rich cold-process soap with French clay, cold-pressed oils, vitamin E, and pure essential oils for a gentle detoxifying cleanse.",
    purityTags: ["Cold-Pressed", "Detoxifying"],
    accordions: [
      { title: "Ingredients", body: "Cold-pressed coconut, olive, almond, castor, and neem oils; vitamin E; French clay; pure essential oils including geranium where used. Free from synthetic fragrance and synthetic colour." },
      { title: "Benefits", body: "French clay supports a gentle, refining cleanse without stripping the skin." },
      { title: "How to Use", body: "Lather between hands with warm water, gently massage onto damp skin, and rinse thoroughly. Store on a well-draining soap dish to prolong life." },
    ]
  }
};

export const COMMON_ACCORDIONS = [
  { title: "Specifications", body: `Weight: 100g. Handcrafted in small batches. Shelf life: 24 months.` },
  { title: "Care Instructions", body: "Store in a cool, dry place away from direct sunlight. Use a well-draining soap dish." },
  { title: "Shipping", body: "Dispatched within 24-48 hours. Free delivery on orders over ₹1000." },

];

export const DEFAULT_ACCORDIONS = (name: string, tag: string) => [
  { title: "Benefits", body: `Enriched with natural properties of ${name} (${tag}) to nourish, restore, and maintain your skin's natural balance.` },
  { title: "Ingredients", body: `100% natural, ethically sourced botanical extracts of ${name}. Free from synthetic fillers, parabens, and sulfates.` },
  { title: "How To Use", body: "Apply a small amount to clean damp skin. Massage gently in circular motions until absorbed. Use daily in your morning or evening wellness ritual." },
  ...COMMON_ACCORDIONS
];

export const PURITY = [
  { icon: Leaf, label: "Vegan" },
  { icon: Hand, label: "Handcrafted" },
  { icon: Droplets, label: "Hand poured" },
  { icon: PawPrint, label: "Cruelty free" },
  { icon: FlaskConical, label: "Sulphate free" },
  { icon: Sparkles, label: "Paraben free" },
  { icon: Flower2, label: "No synthetic fragrance" },
  { icon: Palette, label: "No synthetic colour" },
];

export const PRODUCT_GALLERY: Record<string, string[]> = {
  "shrutibhyam-haldi-handmade-soap": [
    "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/2-2.avif",
    IMG.haldi1,
    IMG.haldi2,
  ],
  "shrutibhyam-neem-handmade-soap": [
    "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/1-3.avif",
    IMG.neem1,
    IMG.neem2,
    IMG.neem3,
  ],
  "shrutibhyam-lavender-handmade-soap": [
    "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/1-1.avif",
    IMG.lavender1,
    IMG.lavender2,
    IMG.lavender3,
  ],
  "shrutibhyam-french-clay-handmade-soap": [
    "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/2.avif",
    IMG.frenchclay1,
    IMG.frenchclay2,
  ]
};

export const PRODUCT_STATS = [
  { value: "98%", label: "Saw clearer skin in 2 weeks" },
  { value: "100%", label: "Reported no irritation" },
  { value: "95%", label: "Felt deeper hydration" },
  { value: "3x", label: "Longer lasting moisture" }
];

export const CUSTOMER_STORIES = [
  {
    name: "Aarti S.",
    image: IMG.faceOil,
    video: false,
    rating: 5,
    text: "This handmade soap completely transformed my morning routine. The natural scent is divine and my skin feels so soft without that tight, dry feeling. Knowing it's cold-pressed and pure makes all the difference."
  },
  {
    name: "Neha M.",
    image: IMG.powder,
    video: false,
    rating: 5,
    text: "I was skeptical about artisanal soaps, but Shrutibhyam's products are magical. The texture, the lather, and the way it leaves my skin glowing – I've stopped using commercial body washes altogether."
  },
  {
    name: "Rohan K.",
    image: IMG.serum,
    video: false,
    rating: 5,
    text: "Finally, a brand that actually delivers on its '100% natural' promise. No artificial colors, no synthetic fragrances. Just pure, earthy goodness that works wonders for my sensitive skin."
  }
];

