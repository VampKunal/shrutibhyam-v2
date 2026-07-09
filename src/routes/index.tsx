import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/Layout";
import {
 IMG,
 PRODUCTS,
 TRUST,
 MARQUEE,
 HERO_CAROUSEL,
 CONTACT_INFO
} from "@/constant";
import { ArrowRight, Star, Quote, Instagram, Facebook, Linkedin } from "lucide-react";
import { getWooProducts } from "@/lib/api/woocommerce.functions";
import { Partners } from "@/components/site/Partners";
import { TestimonialsGallery } from "@/components/site/TestimonialsGallery";


export const Route = createFileRoute("/")({
 head: () => ({
 meta: [
 { title: "Shrutibhyam Wellness — Rooted in Ayurvedic Purity" },
 { name: "description", content: "Discover slow-beauty Ayurvedic skincare, mindful yoga, and holistic events." },
 { property: "og:title", content: "Shrutibhyam Wellness" },
 { property: "og:image", content: IMG.hero },
 ],
 }),
 loader: async () => {
 const products = await getWooProducts();
 return { products };
 },
 staleTime: 1000 * 60 * 5,
 component: Home,
});

function Home() {
 const { products: wooProducts } = Route.useLoaderData();
 const products = wooProducts && wooProducts.length > 0 ? wooProducts : PRODUCTS;
 const [currentImg, setCurrentImg] = useState(0);

 useEffect(() => {
 const interval = setInterval(() => {
 setCurrentImg((prev) => (prev + 1) % HERO_CAROUSEL.length);
 }, 5000);
 return () => clearInterval(interval);
 }, []);

 return (
 <SiteLayout>
 {/* Hero */}
 <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden group">
 {/* Background Image Carousel with Cross-Fade */}
 {HERO_CAROUSEL.map(({ img, to }, idx) => (
 <Link
 key={img}
 to={to as any}
 className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-1000 mix-blend-multiply ${idx === currentImg ? "opacity-60 z-0 pointer-events-auto" : "opacity-0 -z-10 pointer-events-none"
 }`}
 >
 <img
 src={img}
 alt="Serene wellness ritual"
 className="w-full h-full object-cover"
 />
 </Link>
 ))}

 {/* Carousel Indicators */}
 <div className="absolute bottom-6 flex gap-2 z-20">
 {HERO_CAROUSEL.map((_, idx) => (
 <button
 key={idx}
 onClick={() => setCurrentImg(idx)}
 aria-label={`Go to slide ${idx + 1}`}
 className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImg ? "bg-primary w-6" : "bg-primary/30 hover:bg-primary/60"
 }`}
 />
 ))}
 </div>

 <div className="relative z-10 max-w-3xl text-center px-6 py-24 space-y-6">
 <span className="inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal">Rituals Rooted in Nature - For Body, Breath & Being</span>
 <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-primary leading-[1.1]">
 Rooted in Tradition,<br />Crafted for Today
 </h1>
 <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
 A slow-beauty and mindful-movement practice - handcrafted Ayurvedic skincare and traditional yoga, brought from the earth to your daily ritual.
 </p>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
 <Link to="/shop" className="interactive-card bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-surface-tint border border-primary">Shop Collection</Link>
 <Link to="/yoga" className="interactive-card border border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-soft-beige hover:text-primary">Explore Yoga</Link>
 </div>

 </div>
 </section>

 {/* Marquee */}
 <div className="bg-primary text-primary-foreground py-4 overflow-hidden">
 <div className="animate-marquee whitespace-nowrap">
 {Array.from({ length: 2 }).map((_, i) => (
 <div key={i} className="flex items-center gap-10 px-6">
 {MARQUEE.map((w) => (
 <span key={w + i} className="text-xs font-semibold uppercase tracking-[0.18em] flex items-center gap-10">
 {w}<span className="w-1.5 h-1.5 rounded-full bg-sage-green" />
 </span>
 ))}
 </div>
 ))}
 </div>
 </div>

 {/* Partners Logos */}
 <Partners />

 {/* Material Products Showcase */}
 <section
 className="relative py-20 bg-fixed bg-center"

 >
 <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
 <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-soft-beige order-2 lg:order-1">
 <img src="/materials_showcase.png" alt="Apothecary raw ingredients" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
 </div>
 <div className="space-y-6 order-1 lg:order-2">
 <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green block">Earth Sourced</span>
 <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">What Goes Into Every Bar</h2>
 <p className="text-base text-on-surface-variant leading-relaxed">
 Cold-pressed coconut, olive, almond, castor and neem oils. Vitamin E. Pure essential oils - cedarwood, ylang ylang, geranium, frankincense, lavender, patchouli. Never synthetic fragrance. Never synthetic colour.
 </p>
 <div className="grid grid-cols-2 gap-6 pt-4 text-sm text-deep-charcoal font-semibold">
 <div className="border-l-2 border-sage-green pl-3">
 <p className="text-primary font-bold">Cold-Pressed Oils</p>
 <p className="text-xs text-on-surface-variant font-medium mt-1">Coconut, olive, almond, castor, and neem.</p>
 </div>
 <div className="border-l-2 border-sage-green pl-3">
 <p className="text-primary font-bold">Pure Essential Oils</p>
 <p className="text-xs text-on-surface-variant font-medium mt-1">Lavender, patchouli, frankincense, geranium, and more.</p>
 </div>
 <div className="border-l-2 border-sage-green pl-3">
 <p className="text-primary font-bold">Vitamin E</p>
 <p className="text-xs text-on-surface-variant font-medium mt-1">Added care for a nourishing daily cleanse.</p>
 </div>
 <div className="border-l-2 border-sage-green pl-3">
 <p className="text-primary font-bold">No Shortcuts</p>
 <p className="text-xs text-on-surface-variant font-medium mt-1">No synthetic fragrance. No synthetic colour.</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Products Categories */}
 <section
 className="relative py-24 bg-fixed bg-center"

 >
 <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
 <div className="text-center mb-12">
 <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">Products</h2>
 <div className="w-16 h-px bg-sage-green mx-auto" />
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <Link to="/shop" search={{ category: "Skincare" } as any} className="interactive-card group bg-cream-bg border border-soft-beige rounded overflow-hidden">
 <div className="aspect-square relative overflow-hidden bg-surface-container-low">
 <img src={IMG.faceOil} alt="Skincare" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
 </div>
 <div className="p-6 text-center group-hover:bg-surface-container-low transition-colors">
 <h3 className="font-display text-xl text-primary mb-1 group-hover:text-sage-green transition-colors">Skincare</h3>
 <p className="text-sm text-on-surface-variant">Cold-process soap bars made by hand</p>
 </div>
 </Link>
 <Link to="/yoga" className="interactive-card group bg-cream-bg border border-soft-beige rounded overflow-hidden">
 <div className="aspect-square relative overflow-hidden bg-surface-container-low">
 <img src={IMG.yoga} alt="Yoga Products" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
 </div>
 <div className="p-6 text-center group-hover:bg-surface-container-low transition-colors">
 <h3 className="font-display text-xl text-primary mb-1 group-hover:text-sage-green transition-colors">Yoga</h3>
 <p className="text-sm text-on-surface-variant">Hatha, Ashtanga and prop-based practice</p>
 </div>
 </Link>
 <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="interactive-card group bg-cream-bg border border-soft-beige rounded overflow-hidden">
 <div className="aspect-square relative overflow-hidden bg-surface-container-low">
 <img src={IMG.tea} alt="Sound Healing" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
 </div>
 <div className="p-6 text-center group-hover:bg-surface-container-low transition-colors">
 <h3 className="font-display text-xl text-primary mb-1 group-hover:text-sage-green transition-colors">Coming Soon..</h3>

 </div>
 </a>
 </div>
 <div className="text-center mt-12">
 <Link to="/shop" className="border-b border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] pb-1 hover:text-sage-green hover:border-sage-green transition-colors">
 View All Products
 </Link>
 </div>
 </div>
 </section>

 {/* Testimonials */}
 <TestimonialsGallery />


 {/* Stats Section */}
 <section
 className="relative py-16 bg-fixed bg-center"
 style={{ backgroundImage: 'url(/backdrop1.png)', backgroundSize: '100vw 100vh' }}
 >
 <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 text-primary-foreground"
 >
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
 >
 <div className="space-y-2">
 <p className="font-display text-4xl md:text-5xl font-bold text-sage-green">4</p>
 <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black">Signature Bars</p>
 </div>
 <div className="space-y-2">
 <p className="font-display text-4xl md:text-5xl font-bold text-sage-green">100%</p>
 <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black">Handcrafted</p>
 </div>
 <div className="space-y-2">
 <p className="font-display text-4xl md:text-5xl font-bold text-sage-green">AYUSH</p>
 <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black">Certified Yoga</p>
 </div>
 <div className="space-y-2">
 <p className="font-display text-4xl md:text-5xl font-bold text-sage-green">0%</p>
 <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black">Synthetics</p>
 </div>
 </div>
 </div>
 </section>

 {/* Bento: Yoga + Events + About Story */}
 <section
 className="relative py-20 bg-fixed bg-center"

 >
 <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
 <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[600px]">
 <div className="md:col-span-6 relative overflow-hidden rounded-lg group flex flex-col justify-end p-8 border border-soft-beige min-h-[350px] interactive-card">
 <img src={IMG.yoga} alt="Yoga session" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
 <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/85 via-deep-charcoal/30 to-transparent group-hover:from-deep-charcoal/90 transition-colors" />
 <div className="relative z-10 text-primary-foreground">
 <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-[0.15em] mb-4 border border-white/30">Mind & Body</span>
 <h3 className="font-display text-3xl mb-2">Join a Yoga Class</h3>
 <p className="text-xs md:text-sm max-w-sm mb-6 opacity-90">Align your physical and spiritual self through guided, traditional practice.</p>
 <Link to="/yoga" className="interactive-card inline-block bg-surface text-primary text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-soft-beige border border-soft-beige">View Schedule</Link>
 </div>
 </div>
 <div className="md:col-span-3 flex flex-col gap-6">
 <div className="interactive-card flex-1 bg-surface-container-low border border-soft-beige rounded-lg p-6 flex flex-col justify-center hover:bg-cream-bg">
 <h3 className="font-display text-xl text-primary mb-2">Corporate Wellness</h3>
 <p className="text-xs text-on-surface-variant mb-6">Mindfulness and Ayurvedic wellness sessions for teams.</p>
 <Link to="/events" className="inline-flex items-center text-primary text-xs font-semibold uppercase tracking-[0.15em] hover:text-sage-green transition-colors">
 Enquire Now <ArrowRight size={16} className="ml-2" />
 </Link>
 </div>
 <div className="interactive-card h-44 border border-soft-beige rounded-lg overflow-hidden relative group cursor-pointer">
 <img src={IMG.tea} alt="Wellness workshop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
 <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
 <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur p-3 rounded text-center border border-soft-beige">
 <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Sound Healing</p>
 </div>
 </div>
 </div>
 {/* Bento: Explore More About Story */}
 <div className="md:col-span-3 interactive-card bg-cream-bg border border-soft-beige rounded-lg p-6 flex flex-col justify-between min-h-[300px] hover:bg-surface-container-low">
 <div>
 <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-sage-green">Our Story</span>
 <h3 className="font-display text-2xl text-primary mt-2 mb-3">Rooted in Gurugram</h3>
 <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
 Born from a founder's personal health journey, Shrutibhyam brings cold-process soap, yoga, and sound healing into one honest ritual.
 </p>
 </div>
 <Link to="/about" className="interactive-card w-full bg-primary text-primary-foreground text-center text-xs font-semibold uppercase tracking-[0.12em] py-3.5 hover:bg-surface-tint border border-primary">
 Explore Our Story
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Social Section */}
 <section
 className="relative py-20 bg-fixed bg-center"

 >
 <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
 <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
 <div className="space-y-6">
 <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green block">Social Rituals</span>
 <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">Follow Our Journey</h2>
 <p className="text-sm text-on-surface-variant leading-relaxed">
 We share daily inspiration, Ayurvedic wisdom, slow-beauty rituals, and updates from Gurugram. Join our community online.
 </p>
 <div className="flex flex-col sm:flex-row gap-3 pt-2">
 <a
 href={CONTACT_INFO.instagram}
 target="_blank"
 rel="noopener noreferrer"
 className="interactive-card flex items-center justify-center gap-2 bg-transparent border border-primary text-primary text-xs font-semibold uppercase tracking-[0.12em] px-4 py-3 hover:bg-soft-beige hover:text-primary shrink-0"
 >
 <Instagram size={16} /> Instagram
 </a>
 <a
 href={CONTACT_INFO.facebook}
 target="_blank"
 rel="noopener noreferrer"
 className="interactive-card flex items-center justify-center gap-2 bg-transparent border border-primary text-primary text-xs font-semibold uppercase tracking-[0.12em] px-4 py-3 hover:bg-soft-beige hover:text-primary shrink-0"
 >
 <Facebook size={16} /> Facebook
 </a>
 <a
 href={CONTACT_INFO.linkedin}
 target="_blank"
 rel="noopener noreferrer"
 className="interactive-card flex items-center justify-center gap-2 bg-transparent border border-primary text-primary text-xs font-semibold uppercase tracking-[0.12em] px-4 py-3 hover:bg-soft-beige hover:text-primary shrink-0"
 >
 <Linkedin size={16} /> LinkedIn
 </a>
 </div>
 </div>
 <div className="relative rounded-lg overflow-hidden border border-soft-beige bg-surface">
 <img src="/social_grid_preview.png" alt="Instagram grid preview" className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition-opacity" />
 </div>
 </div>
 </div>
 </section>
 </SiteLayout>
 );
}
