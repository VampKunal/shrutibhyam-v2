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
  name: "Shrutibhyam Wellness Center",
  address: "108 Ayurvedic Lane, Rishikesh, Uttarakhand 249201, India",
  addressShort: "108 Ayurvedic Lane, Rishikesh, India",
  email: "namaste@shrutibhyam.com",
  phone: "+91 98765 43210 — Mon-Fri, 9am – 5pm IST",
  instagram: "https://www.instagram.com/shrutibhyam?igsh=bmJ0dm8xZXY3cjUx&utm_source=qr",
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
  { icon: Leaf, label: "Vegan" },
  { icon: Hand, label: "Handcrafted" },
  { icon: Recycle, label: "Sustainable" },
  { icon: Droplets, label: "100% Non-Toxic" },
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
  { date: "Nov 02, 2024", name: "Holistic Living Workshop @ DLF", desc: "Explore cold-processed beauty, mindful nutrition, and grounding techniques for everyday life.", location: "DLF Cyber City, Gurugram" },
  { date: "Dec 10, 2024", name: "Mindful Flow @ Signature Global", desc: "A guided yoga and somatic movement session focusing on breathwork and emotional release.", location: "Signature Global Park, NCR" },
];

// Yoga practices
export const PRACTICES = [
  { tag: "Grounding", name: "Hatha Earth", desc: "Static postures, deep breathing, and mindful alignment. Build stability and reconnect with the earth's rhythm." },
  { tag: "Fluidity", name: "Vinyasa Flow", desc: "A dynamic sequence syncing breath with movement. Builds heat, cultivates flexibility, and clears the mind." },
  { tag: "Restorative", name: "Yin & Restore", desc: "Long-held postures held in stillness. A meditative practice for deep tissue release and nervous system calm." },
];

// Yoga schedule
export const SCHEDULE = [
  { time: "07:00", period: "AM", name: "Morning Vinyasa", duration: "60 Min", teacher: "Elena Woods", state: "open" },
  { time: "12:30", period: "PM", name: "Midday Hatha Restore", duration: "45 Min", teacher: "Marcus Lin", state: "open" },
  { time: "18:00", period: "PM", name: "Sunset Yin Yoga", duration: "75 Min", teacher: "Sarah Jenkins", state: "waitlist" },
];

// Testimonials configurations
export const HOME_TESTIMONIALS = [
  { quote: "The purity of these products is unmatched. Integrating them into my daily routine feels less like skincare and more like a grounding ritual.", name: "Akratu", role: "Verified Buyer" },
  { quote: "Morning yoga sessions have transformed my week. The environment is serene and the instructors are deeply rooted in tradition.", name: "Abhinav", role: "Studio Member" },
  { quote: "The Bhringraj hair oil changed my hair care entirely. Smells so natural and feels so pure.", name: "Priya M.", role: "Repeat Customer" },
  { quote: "Their workshops are enlightening. Connecting with my roots while taking care of my body.", name: "Rishabh", role: "Retreat Guest" },
];

export const YOGA_TESTIMONIALS = [
  { q: "It's not just a workout; it's a profound grounding experience. The integration of Ayurvedic wisdom makes every breath feel intentional.", name: "Amanda T.", role: "Hatha Regular" },
  { q: "Elena's Vinyasa classes flow like water, leaving me feeling cleansed and thoroughly revitalized.", name: "Julian R.", role: "Vinyasa Practitioner" },
  { q: "A true sanctuary in the city. The Yin classes have been transformative for my sleep.", name: "Claire M.", role: "Yin Enthusiast" },
];

export const EVENT_TESTIMONIALS = [
  { q: "The retreat at Capgemini was a breath of fresh air. It re-centered my focus and introduced me to practices I now use daily.", name: "Anjali S." },
  { q: "Attending the DLF workshop completely shifted my perspective on wellness. The holistic approach felt genuine and rooted.", name: "Vikram R." },
  { q: "Beautifully organized and grounding. The Signature Global event was exactly the pause I needed in my busy life.", name: "Priya M." },
];

export const SHOP_TESTIMONIAL = {
  quote: "Switching to Shrutibhyam's cold-pressed soaps has completely transformed my daily ritual. My skin has never felt so pure and balanced.",
  author: "Elena M.",
  role: "Verified Buyer"
};

export const SHOP_REVIEWS = [
  { stars: 5, q: "The earthy scent is incredibly grounding. It doesn't strip my skin like commercial soaps do.", name: "Elena R." },
  { stars: 5, q: "Has been a lifesaver for my sensitive skin. Lathers beautifully and leaves my skin nourished.", name: "Marcus T." },
  { stars: 4.5, q: "Beautiful packaging and an even better product. You can feel the artisanal quality.", name: "Sarah L." },
];

const testimonialModules = import.meta.glob(
  "/public/testimonials/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  { eager: true }
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
    description: "Rooted in ancient Ayurvedic wisdom, this cold-processed bar is enriched with wild turmeric and raw shea butter. It gently purifies, brightens, and restores your skin's natural glow.",
    purityTags: ["Cold-Pressed", "Vegan"],
    accordions: [
      { title: "Ingredients", body: "Saponified Oils of Olive, Coconut, and Castor; Raw Unrefined Shea Butter; Organic Haldi (Turmeric) Root Extract; Essential Oils of Sandalwood, Vetiver, and Sweet Orange. Free from synthetic fragrances, dyes, and palm oil." },
      { title: "Benefits", body: "Wild Turmeric calms redness and promotes even skin tone. Raw Shea Butter deeply moisturizes without clogging pores. Sandalwood and Vetiver provide a grounding, earthy aromatherapy." },
      { title: "How to Use", body: "Lather between hands with warm water, gently massage onto damp skin in circular motions, and rinse thoroughly. Store on a well-draining soap dish to prolong life." },
    ]
  },
  "shrutibhyam-neem-handmade-soap": {
    description: "Handcrafted with pure cold-pressed neem oil, tea tree essential oil, and rich mango butter to soothe, purify, and protect your skin while restoring balance.",
    purityTags: ["Cold-Pressed", "Purifying"],
    accordions: [
      { title: "Ingredients", body: "Saponified Oils of Olive, Coconut, and Castor; Raw Mango Butter; Pure Cold-Pressed Neem Oil; Essential Oils of Tea Tree and Lavender; Vitamin E. Free from synthetic fragrances, paraben, and palm oil." },
      { title: "Benefits", body: "Neem oil and tea tree essential oil support clear, healthy skin and soothe irritation. Mango butter provides deep hydration, while lavender essential oil calms and balances." },
      { title: "How to Use", body: "Lather between hands with warm water, gently massage onto damp skin in circular motions, and rinse thoroughly. Store on a well-draining soap dish to prolong life." },
    ]
  },
  "shrutibhyam-lavender-handmade-soap": {
    description: "Infused with organic French lavender buds and pure lavender and chamomile essential oils to soothe the skin, calm the senses, and ease the mind.",
    purityTags: ["Cold-Pressed", "Calming"],
    accordions: [
      { title: "Ingredients", body: "Saponified Oils of Olive, Coconut, and Castor; Raw Cocoa Butter; Organic French Lavender Buds; Pure Lavender and Chamomile Essential Oils. Free from synthetic fragrances, dyes, and paraben." },
      { title: "Benefits", body: "Lavender and chamomile provide deep relaxation and calm the nervous system. Cocoa butter leaves the skin feeling silky smooth and deeply moisturized." },
      { title: "How to Use", body: "Lather between hands with warm water, gently massage onto damp skin in circular motions, and rinse thoroughly. Store on a well-draining soap dish to prolong life." },
    ]
  },
  "shrutibhyam-french-clay-handmade-soap": {
    description: "Formulated with mineral-rich pink French clay and organic rose water to gently exfoliate, refine skin texture, draw out impurities, and tone the skin.",
    purityTags: ["Cold-Pressed", "Detoxifying"],
    accordions: [
      { title: "Ingredients", body: "Saponified Oils of Olive, Coconut, and Castor; Raw Shea Butter; Pink French Clay; Organic Rose Water; Essential Oils of Damask Rose and Geranium. Free from synthetic fragrances and dyes." },
      { title: "Benefits", body: "French clay gently detoxifies, refines pores, and removes dead skin. Rose water and rose essential oil hydrate, balance pH, and leave a delicate floral aroma." },
      { title: "How to Use", body: "Lather between hands with warm water, gently massage onto damp skin in circular motions, and rinse thoroughly. Store on a well-draining soap dish to prolong life." },
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
