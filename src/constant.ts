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

export const FIRST_ORDER_PROMO_MSG = "Sign up to get 10% off on your first order";
export const SHIPPING_PROMO_MSG = "Free Razorpay shipping on 2+ soaps and Diwali packs | COD shipping ₹60";
export const MARQUEE_MSG = `${FIRST_ORDER_PROMO_MSG} | ${SHIPPING_PROMO_MSG}`;

// Shared Contact details
export const CONTACT_INFO = {
  name: "Shrutibhyam Wellness",
  address: "Godrej Aria, Tower D, Gurugram, Haryana, India",
  addressShort: "Godrej Aria, Gurugram, Haryana",
  email: "care@shrutibhyam.com",
  phone: "DM us on Instagram or email us for the quickest response",
  whatsapp: "8884399876",
  instagram: "https://www.instagram.com/shrutibhyamyog/",
  instagram2: "https://www.instagram.com/shrutibhyam/",
  facebook: "https://www.facebook.com/people/Shrutibhyam/61590584156475/",
  linkedin: "https://www.linkedin.com/company/110937120",
  youtube: "https://youtube.com/shorts/HGpwI3y-S50?si=pYuy4lfuRfCxsP4S"
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
  Home: "/extras/home.png",
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
  diwaliHorizontal: "/horizontal_diwali.PNG",
  diwaliHorizontal2: "/horizontal_diwali2.PNG",
  diwaliVertical: "/vertical_diwali.PNG",
};

// Local product catalog fallbacks
export const PRODUCTS = [
  {
    slug: "diwali-gift-box",
    name: "Shrutibhyam Diwali Gift Box",
    tag: "Festive Gifting",
    subtitle: "Roshni ghar mein, glow chehre pe ✨",
    price: 1199,
    regularPrice: 1500,
    onSale: true,
    image: "/vertical_diwali.PNG",
    wooId: 187,
  },
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
  { imgDesktop: "/horizontal_diwali2.PNG", imgMobile: "/vertical_diwali.PNG", to: "/shop/diwali-gift-box", isVideo: false, videoDesktop: undefined, imgClass: "object-contain bg-[#FAF5F2]", bgClass: "bg-[#FAF5F2]" },
  { imgDesktop: IMG.Home, imgMobile: IMG.Home, to: "/shop", isVideo: false, videoDesktop: undefined },
  { imgDesktop: IMG.Buy, imgMobile: IMG.Buy, to: "/shop", isVideo: false, videoDesktop: undefined },
  { imgDesktop: IMG.yog, imgMobile: IMG.trust, to: "/yoga", isVideo: false, videoDesktop: undefined },
  { imgDesktop: IMG.Home, imgMobile: IMG.Home, to: "/events", isVideo: false, videoDesktop: undefined }
];

export const SHIPPING_FAQ = {
  q: "How does shipping work?",
  a: "One soap ships for ₹60. Buy 2 or more soaps for free shipping with Razorpay. Diwali packs ship free with Razorpay. COD shipping is ₹60.",
};

// Home Frequently Asked Questions
export const FAQ = [
  { q: "Are your products truly cold-pressed?", a: "Yes — we adhere strictly to traditional Ayurvedic cold-pressing methods to preserve vital nutrients, enzymes, and natural aromas." },
  { q: "Do you ship internationally?", a: "We ship within India and to select international destinations including the US, UK, and UAE." },
  { q: "How can I book a private Yoga session?", a: "Use the form on our contact page and select 'Yoga Sessions' as your subject. A master practitioner will follow up." },
  { q: "What is your return policy?", a: "Due to the artisanal nature of our products we do not accept returns, but please contact us within 48 hours of delivery if your order arrives damaged." },
  SHIPPING_FAQ,
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
  quote: "Shruti, your handmade soaps are truly amazing! I could feel the difference within just two days of using them. Consider me a loyal customer from now on.",
  author: "Shehnaaz",
  role: "Verified Customer",
};

export const SHOP_REVIEWS = [
  { stars: 5, q: "Soaps are very good. Good quality and truly natural and organic.", name: "Vivek" },
  { stars: 5, q: "I am in love with the haldi soap! It's so gentle and feels amazing on the skin.", name: "Sapna" },
  { stars: 5, q: "Fragrance is so fresh and long-lasting. Made my skin feel soft and fresh.", name: "Akrati" },
];

export const SCREENSHOT_TESTIMONIALS = [
  "/testimonials/898382c3-df2c-49cf-a163-8913ba6f48f4.jpg",
  "/testimonials/d41930fd-3ce2-41bf-9aae-44d2e5201913.jpg",
  "/testimonials/e5cadb5a-d707-40a6-883e-d04fc99db9a1.jpg",
  "/testimonials/ee04c667-0925-49c2-9ad5-5e2218e13f00.jpg",
  "/testimonials/f95a9437-c35a-4c40-aaac-fdfa32df34f7.jpg",
  "/testimonials/1992b673-1a85-415b-b692-0f43910bdf50.webp",
  "/testimonials/38d30a0f-119b-44d7-ba6b-0c9e63abb164.webp",
  "/testimonials/4f50649d-5bc6-4f66-89c0-12a65e3db490.webp",
  "/testimonials/76efa728-5ded-4050-8bf4-b30ae3d08d2a.webp",
  "/testimonials/898382c3-df2c-49cf-a163-8913ba6f48f4.webp",
  "/testimonials/910588ce-5d8a-48c8-b001-2590c0281077.webp",
  "/testimonials/a73def99-901e-43e5-a059-2651827d4204.webp",
  "/testimonials/ac2f5aaa-ca1d-4ec6-b4e1-6842c453f530.webp",
  "/testimonials/d278bb31-7851-4e74-a591-a160ff8042b3.webp",
  "/testimonials/df758d99-108c-4144-8186-57f683ba0912.webp",
  "/testimonials/fd30c560-932d-491c-b516-cc9bd65e5b7c.webp",
  "/testimonials/IMG_8922.webp",
  "/testimonials/IMG_8923.webp",
  "/testimonials/IMG_8924.webp",
  "/testimonials/IMG_8925.webp",
  "/testimonials/IMG_8945.webp",
  "/testimonials/IMG_8946.webp",
  "/testimonials/IMG_8948.webp",
  "/testimonials/IMG_8949.webp",
  "/testimonials/IMG_8950.webp",
  "/testimonials/IMG_8951.webp"
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
  { title: "Shipping", body: "Dispatched within 24-48 hours. One soap ships for ₹60. Buy 2 or more soaps for free shipping with Razorpay. Diwali packs ship free with Razorpay. COD shipping is ₹60." },

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


export interface SoapFeedbackComment {
  id: string;
  userId: number;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
}

export const SOAP_FEEDBACK_COMMENTS: SoapFeedbackComment[] = [
  {
    id: "soap-fb-1",
    userId: 101,
    userName: "Shehnaaz",
    userEmail: "shehnaaz@customer.shrutibhyam.com",
    rating: 5,
    comment: "Shruti, your handmade soaps are truly amazing! I could feel the difference within just two days of using them. Even Zaheer was impressed and liked them. Consider me a loyal customer from now on. I'll be relying on your soaps for all my skincare needs.",
    date: "2026-10-15T10:00:00.000Z",
  },
  {
    id: "soap-fb-2",
    userId: 102,
    userName: "Sapna",
    userEmail: "sapna@customer.shrutibhyam.com",
    rating: 5,
    comment: "I am in love with the haldi soap! It's so gentle and feels amazing on the skin. I believe it has some very gentle exfoliating particles that felt like love on the skin. Thank you so much for getting these soaps in our life. Love love love it.",
    date: "2026-10-18T14:30:00.000Z",
  },
  {
    id: "soap-fb-3",
    userId: 103,
    userName: "Akrati",
    userEmail: "akrati@customer.shrutibhyam.com",
    rating: 5,
    comment: "I absolutely loved the handcrafted Haldi Soap from Shrutibhyam. The fragrance is so fresh and long-lasting, even the bathroom smells amazing after use. It made my skin feel soft and fresh. Would definitely love to try the other variants once this one is consumed. Thank you for creating such a lovely product!",
    date: "2026-10-22T09:15:00.000Z",
  },
  {
    id: "soap-fb-4",
    userId: 104,
    userName: "Shaily Arya",
    userEmail: "shaily@customer.shrutibhyam.com",
    rating: 5,
    comment: "It's a very good soap. I have tried the haldi and neem ones, both were very good. Especially the aroma, and it was very gentle on the skin. I definitely recommend this. Also the packing is very true to the product. Natural and raw, just like the soap.",
    date: "2026-10-26T16:45:00.000Z",
  },
  {
    id: "soap-fb-5",
    userId: 105,
    userName: "Priyanka",
    userEmail: "priyanka@customer.shrutibhyam.com",
    rating: 5,
    comment: "Really happy with Shrutibhyam soaps, especially neem and haldi. It feels gentle on my sensitive skin and doesn't dry it out at all. Leaves my skin soft, fresh, and comfortable after every wash. I love that I can use it multiple times a day without my skin feeling dry or irritated. Definitely a good choice for daily use.",
    date: "2026-10-30T11:20:00.000Z",
  },
  {
    id: "soap-fb-6",
    userId: 106,
    userName: "Vivek",
    userEmail: "vivek@customer.shrutibhyam.com",
    rating: 5,
    comment: "Soaps are very good. Good quality and truly natural and organic.",
    date: "2026-11-02T13:10:00.000Z",
  },
];

export const CUSTOMER_STORIES = [
  {
    name: "Shehnaaz",
    image: IMG.haldi1,
    video: false,
    rating: 5,
    text: "Shruti, your handmade soaps are truly amazing! I could feel the difference within just two days of using them. Even Zaheer was impressed and liked them. Consider me a loyal customer from now on. I'll be relying on your soaps for all my skincare needs."
  },
  {
    name: "Sapna",
    image: IMG.haldi2,
    video: false,
    rating: 5,
    text: "I am in love with the haldi soap! It's so gentle and feels amazing on the skin. I believe it has some very gentle exfoliating particles that felt like love on the skin. Thank you so much for getting these soaps in our life. Love love love it."
  },
  {
    name: "Akrati",
    image: IMG.neem1,
    video: false,
    rating: 5,
    text: "I absolutely loved the handcrafted Haldi Soap from Shrutibhyam. The fragrance is so fresh and long-lasting, even the bathroom smells amazing after use. It made my skin feel soft and fresh. Would definitely love to try the other variants once this one is consumed. Thank you for creating such a lovely product!"
  },
  {
    name: "Shaily Arya",
    image: IMG.neem2,
    video: false,
    rating: 5,
    text: "It's a very good soap. I have tried the haldi and neem ones, both were very good. Especially the aroma, and it was very gentle on the skin. I definitely recommend this. Also the packing is very true to the product. Natural and raw, just like the soap."
  },
  {
    name: "Priyanka",
    image: IMG.lavender1,
    video: false,
    rating: 5,
    text: "Really happy with Shrutibhyam soaps, especially neem and haldi. It feels gentle on my sensitive skin and doesn't dry it out at all. Leaves my skin soft, fresh, and comfortable after every wash. I love that I can use it multiple times a day without my skin feeling dry or irritated. Definitely a good choice for daily use."
  },
  {
    name: "Vivek",
    image: IMG.frenchclay1,
    video: false,
    rating: 5,
    text: "Soaps are very good. Good quality and truly natural and organic."
  }
];

