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

// Shared image references hotlinked from original mockups.
const A = "https://lh3.googleusercontent.com/aida-public/";
export const IMG = {
  hero: A + "AB6AXuC2-7QZ0yyuJjztqDxh8riUJ6-uxnS5DvbPWHlk1Ca0a2ALcA5asqQ-54Z6WIk6zzfyAFyX8b4DAnNjsxiUsYUscs_GD9CUXoOA53CJAcxCKlP6kHJAN45I4Udhzj3_2Xx61gv-lTFx9yEhFHZYAw1hSGlSbJzdqgi0zOjuRYFBTSKjZ1uk7gjJ15E2tddqdduDbibY6HqjLLFQAzhnR4yVZ3qiwzN81_Hp9avzuszVuAnfcCAuwoLiqADiUOW0ETAQNk85v8DzDnU",
  trust: A + "AB6AXuC6pjnQ8CXt0oud7V5LZSzpgc63mKx5GC004_ikGfBV2aUlvwjQMud-BTdL-qbiNYg4HM_tyx7GJ6XKlH91LZaFDtWOV9DqkH0Ds8F4a6XSBnf-dCy-nixY6k8c5XnRy03AEHujBzJq11JaDGmpLIXwk_AS0bcajdyAEtsx6JZ_CXrSYlSUeyY51Ey9VM_IqEtvs_FXrJ9GO0EaaEJZZRlg9KF-O-hSIEzsgCFgdorVrg82vcBSm71JlGIGm-2V8SlKsbm8VeJ4i6E",
  faceOil: A + "AB6AXuAQfRJwv1Xb6I-IFnyy2EKoulNGjLvUulC9Crl07IpYwNWfK0A2v3Eo8HorTKTW0Bbz0V2gb5pXWD_jdzEXt3es1HW6uP3MxMC4mcD4tbrvBZaS6ynqe0twAYtIHtWzneYQwj95nwMUitNW5gjOmsUm2eJad7x4zjR03EqzRhFJ50qgH5QwWN1Aa2FZdHIPUGcRpEmeFzw6LXP9CpfQ6pQV6d2xHUD_0bT0Q9JA7v16T0I9r2uDm-mX3tWA_-mCBp739zahIqTAkvs",
  powder: A + "AB6AXuB05hpJLG59gXzTieixMZePrnSgzi3wIA3HG432wz1VVUF3smdlsorH-q7VBhr9m66l2RnF7Z4zjvyxTgDojz7MwJhxBokMAs_4NIZO-QKXSz0gwMcafyPRhj_e2bJ9cRGgYtFz7QS_fUFRUkRi5UDedAqYavMN98-iYVpFIbv_2VwwQ0vxKGQ7KPgqcaXzqFFHFhfFSnKdx5_Xqn0urJ-4MMex9mgJQ62F82kgzXoJ2MAb2mv7a0FHp6rXaIbfL7fJUY6-TMsqkug",
  serum: A + "AB6AXuAoAfn-VZ12KVYMg0ZLJFQGmnX9lcnvGabBwCF_Gwzt04aHBai61-0dS5-furtqtFwTSg12LQwWMjR3O1zS3X_nqNqgl0dQHSjwYDJV0drhn8g7BnoI2vKyhbHNx5d-ss38KdeRFU_ae2MFvGOoaWFGrTxduaAaITp_jwGC7Y0noaEwVwPUuNOTCijqOpE-2H2x_BSEn4ef7n0HBO7C9w6x6MO3b5TxeVBn5uUzLJUUgiN2ujrXFLN2Hry-jXWrvPZAC1zacp25wfM",
  yoga: A + "AB6AXuAkG4L3nMbPGkhhuUA4OUIgZtEMux7Qu8czrPf_jwFrIOXNqq5qObPvv8shsrLacIgGv3OfT9z7kUbI-FH_qgFWMhjtJXcnrc4OnZkXT9qL7VteNMkvpotWyy-Qj55QVjPVgknjW5_yon55inQFHjZ2iTHnwQsYkRPuDITa-_g0_SM0SukCvGzz_e8R9VUaG_g2Htr3E1OfLuFe5bIEp1R4Em4vtKNgwRpKjkOpPOyjGadubFQTNt1cl06uNekOzQd17pi4ikGCz7I",
  tea: A + "AB6AXuDip7dKAPBXGP6bSXLPLRhVp5HY3SvbzylwIuQloNYo8lh1H0G2PWJxMyD56KvNMCXWNSYHKnbyVR1TwouYCHb2c4m1VdbNJ1ZTYyll3nqvR_fprKRaK5jH3z4jNPDM3B9REkSvt2CVoJHfgdh2OBFXfCELC1zPakml95vLjdOQvqheTuq9u_a7r9H2eR6Y6iRO1K6aGjwmpz9V5G_9GPQmgJgSsIKgEuTViQqNkK_nKdmP94zGwg1GIZArXCIKG610I7iow1sHEnU",
};

// Local product catalog fallbacks
export const PRODUCTS = [
  { slug: "shrutibhyam-neem-handmade-soap", name: "Shrutibhyam Neem Handmade Soap", tag: "Skincare", subtitle: "Pure Care, Naturally", price: 350, regularPrice: 500, onSale: true, image: "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/1-3.avif", wooId: 40 },
  { slug: "shrutibhyam-haldi-handmade-soap", name: "Shrutibhyam Haldi Handmade Soap", tag: "Skincare", subtitle: "Brightening & Nourishing Care", price: 350, regularPrice: 500, onSale: true, image: "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/2-2.avif", wooId: 36 },
  { slug: "shrutibhyam-lavender-handmade-soap", name: "Shrutibhyam Lavender Handmade Soap", tag: "Skincare", subtitle: "Soothing & Nourishing Care", price: 350, regularPrice: 500, onSale: true, image: "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/1-1.avif", wooId: 32 },
  { slug: "shrutibhyam-french-clay-handmade-soap", name: "Shrutibhyam French Clay Handmade Soap", tag: "Skincare", subtitle: "Gentle detoxifying & nourishing bar", price: 350, regularPrice: 500, onSale: true, image: "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/2.avif", wooId: 24 },
];

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
  { img: IMG.hero, to: "/about" },
  { img: IMG.yoga, to: "/shop" },
  { img: IMG.trust, to: "/yoga" },
  { img: IMG.tea, to: "/events" }
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
  quote: "We're a young, growing brand - every bar is still made by hand, in small batches, by us. Your feedback shapes what we make next.",
  author: "Team Shrutibhyam",
  role: "Founder-led brand"
};

export const SHOP_REVIEWS = [
  { stars: 5, q: "Small-batch, handmade, and still shaped by real customer feedback.", name: "Team Shrutibhyam" },
];

const testimonialModules = import.meta.glob(
  "/public/testimonials/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  { eager: true, query: "?url", import: "default" }
);

export const SCREENSHOT_TESTIMONIALS = Object.keys(testimonialModules).map((path) =>
  path.replace(/^\/public/, "")
);


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

export const DEFAULT_ACCORDIONS = (name: string, tag: string) => [
  { title: "Ingredients", body: `100% natural, ethically sourced botanical extracts of ${name}. Free from synthetic fillers, parabens, and sulfates.` },
  { title: "Benefits", body: `Enriched with natural properties of ${name} (${tag}) to nourish, restore, and maintain your skin's natural balance.` },
  { title: "How to Use", body: "Apply a small amount to clean damp skin. Massage gently in circular motions until absorbed. Use daily in your morning or evening wellness ritual." }
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
