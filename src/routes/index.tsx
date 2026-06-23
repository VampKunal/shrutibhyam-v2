import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { IMG, PRODUCTS } from "@/components/site/content";
import { ArrowRight, Leaf, Hand, Recycle, Droplets, Star, Quote } from "lucide-react";
import { getWooProducts } from "@/lib/api/woocommerce.functions";
import { Partners } from "@/components/site/Partners";


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
  staleTime: 1000 * 60 * 5, // 5 minutes cache
  component: Home,
});

const TRUST = [
  { icon: Leaf, label: "Vegan" },
  { icon: Hand, label: "Handcrafted" },
  { icon: Recycle, label: "Sustainable" },
  { icon: Droplets, label: "100% Non-Toxic" },
];

const MARQUEE = ["Vegan","Handcrafted","Hand poured","Cruelty free","Sulphate free","Paraben free","No synthetic fragrance","No synthetic colour"];

const HERO_CAROUSEL = [
  { img: IMG.hero, to: "/about" },
  { img: IMG.yoga, to: "/shop" },
  { img: IMG.trust, to: "/yoga" },
  { img: IMG.tea, to: "/events" }
];

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
      <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-cream-bg overflow-hidden group">
        {/* Background Image Carousel with Cross-Fade */}
        {HERO_CAROUSEL.map(({ img, to }, idx) => (
          <Link
            key={img}
            to={to as any}
            className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-1000 mix-blend-multiply ${
              idx === currentImg ? "opacity-60 z-0 pointer-events-auto" : "opacity-0 -z-10 pointer-events-none"
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
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentImg ? "bg-primary w-6" : "bg-primary/30 hover:bg-primary/60"
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl text-center px-6 py-24 space-y-6">
          <span className="inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal">Ayurvedic Purity</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-primary leading-[1.1]">
            Rooted in Tradition,<br />Crafted for Today
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            A slow-beauty experience that prioritizes intentionality over industrial speed. Holistic wellness, brought from the earth to your daily ritual.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link to="/shop" className="bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-surface-tint transition-colors">Shop Collection</Link>
            <Link to="/yoga" className="border border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-soft-beige transition-colors">Explore Yoga</Link>
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

      {/* Trust */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight max-w-md">Here's why you can trust we're the real deal.</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {TRUST.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-start gap-3">
                  <Icon size={36} className="text-sage-green" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-deep-charcoal">{label}</span>
                </div>
              ))}
            </div>
            <Link to="/shop" className="inline-block bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-surface-tint transition-colors">Explore Categories</Link>
          </div>
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-soft-beige">
            <img src={IMG.trust} alt="Ayurvedic nature" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Introduction to About */}
      <section className="bg-surface-container-low py-24 border-t border-b border-soft-beige">
        <div className="max-w-[800px] mx-auto px-4 md:px-6 text-center space-y-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green">Our Essence</span>
          <h2 className="font-display text-4xl md:text-5xl text-primary leading-tight">Rooted in Ancient Purity</h2>
          <p className="text-base md:text-lg text-on-surface-variant leading-relaxed">
            Shrutibhyam is more than just a store—it is a slow-beauty wellness sanctuary. Born on the sacred banks of the Ganges, our creations bridge ancient Ayurvedic wisdom with the rhythm of modern life. We believe in uncompromised purity, intentional craftsmanship, and honoring the earth through every ritual.
          </p>
          <div className="pt-4">
            <Link to="/about" className="inline-block bg-transparent border border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Discover Our Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Products Categories */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">Products</h2>
          <div className="w-16 h-px bg-sage-green mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/shop" search={{ category: "Skincare" } as any} className="group bg-cream-bg border border-soft-beige hover:shadow-sm transition-all rounded overflow-hidden">
            <div className="aspect-square relative overflow-hidden bg-surface-container-low">
              <img src={IMG.faceOil} alt="Skincare" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-display text-xl text-primary mb-1">Skincare</h3>
              <p className="text-sm text-on-surface-variant">Explore our natural skincare collection</p>
            </div>
          </Link>
          <Link to="/shop" search={{ category: "Yoga" } as any} className="group bg-cream-bg border border-soft-beige hover:shadow-sm transition-all rounded overflow-hidden">
            <div className="aspect-square relative overflow-hidden bg-surface-container-low">
              <img src={IMG.yoga} alt="Yoga Products" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-display text-xl text-primary mb-1">Yoga Products</h3>
              <p className="text-sm text-on-surface-variant">Mats, blocks and spiritual accessories</p>
            </div>
          </Link>
          <div className="group bg-cream-bg border border-soft-beige transition-all rounded overflow-hidden opacity-80">
            <div className="aspect-square relative overflow-hidden bg-surface-container-low">
              <img src={IMG.powder} alt="Coming Soon" className="absolute inset-0 w-full h-full object-cover grayscale" />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-display text-xl text-primary mb-1">More Categories</h3>
              <p className="text-sm text-on-surface-variant">Coming soon to our apothecary</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link to="/shop" className="border-b border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] pb-1 hover:text-sage-green hover:border-sage-green transition-colors">
            View All Products
          </Link>
        </div>
      </section>

      {/* Testimonials (Moved after products) */}
      <section className="bg-surface-container-low py-20 border-t border-b border-soft-beige overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 mb-12">
          <div className="text-center">
            <Quote className="text-sage-green mx-auto mb-3" size={40} strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl text-primary">Community Voices</h2>
          </div>
        </div>
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-6 px-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-6">
                {[
                  { quote: "The purity of these products is unmatched. Integrating them into my daily routine feels less like skincare and more like a grounding ritual.", name: "Akratu", role: "Verified Buyer" },
                  { quote: "Morning yoga sessions have transformed my week. The environment is serene and the instructors are deeply rooted in tradition.", name: "Abhinav", role: "Studio Member" },
                  { quote: "The Bhringraj hair oil changed my hair care entirely. Smells so natural and feels so pure.", name: "Priya M.", role: "Repeat Customer" },
                  { quote: "Their workshops are enlightening. Connecting with my roots while taking care of my body.", name: "Rishabh", role: "Retreat Guest" },
                ].map((t, idx) => (
                  <div key={`${i}-${idx}`} className="bg-cream-bg p-8 border border-soft-beige rounded-lg w-[400px] flex-shrink-0 whitespace-normal">
                    <div className="flex text-sage-green mb-4">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    <p className="text-sm md:text-base italic text-on-surface-variant mb-6 leading-relaxed">"{t.quote}"</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{t.name}</p>
                    <p className="text-xs text-outline">{t.role}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section className="bg-surface py-20 border-b border-soft-beige">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green block mb-2">Artisanal vs Industrial</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary">Made with Intention</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-cream-bg p-8 border border-soft-beige rounded-lg">
              <h3 className="font-display text-xl text-primary mb-4 flex items-center gap-2">🌿 Shrutibhyam Slow Rituals</h3>
              <ul className="space-y-3 text-sm text-on-surface-variant font-medium">
                <li className="flex items-start gap-2">✦ <span className="text-primary font-semibold">Cold-Processed Soaps:</span> Aged for 6 weeks to preserve natural glycerine & nutrients.</li>
                <li className="flex items-start gap-2">✦ <span className="text-primary font-semibold">100% Pure Essential Oils:</span> Real therapeutic aromas, never synthetic fragrances.</li>
                <li className="flex items-start gap-2">✦ <span className="text-primary font-semibold">Micro-Batch Hand poured:</span> Ensuring absolute quality and attention in every bar.</li>
                <li className="flex items-start gap-2">✦ <span className="text-primary font-semibold">Sourced Ethically:</span> Direct partnerships with traditional Himalayan micro-farms.</li>
              </ul>
            </div>
            <div className="bg-surface-container border border-soft-beige/40 p-8 rounded-lg opacity-85">
              <h3 className="font-display text-xl text-outline mb-4 flex items-center gap-2">⚡ Commercial Industry</h3>
              <ul className="space-y-3 text-sm text-outline font-medium">
                <li className="flex items-start gap-2">✕ <span className="text-on-surface-variant font-semibold">Hot-Melt Processing:</span> High heat destroys beneficial enzymes & properties.</li>
                <li className="flex items-start gap-2">✕ <span className="text-on-surface-variant font-semibold">Synthetic Fragrances:</span> Chemical perfumes that cause irritation and dryness.</li>
                <li className="flex items-start gap-2">✕ <span className="text-on-surface-variant font-semibold">Mass Manufactured:</span> Standardized assembly line production prioritizing speed.</li>
                <li className="flex items-start gap-2">✕ <span className="text-on-surface-variant font-semibold">Chemical Detergents:</span> Heavy parabens, sulfates, and cheap palm oil fillers.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Material Products Showcase */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-soft-beige order-2 lg:order-1">
            <img src="/materials_showcase.png" alt="Apothecary raw ingredients" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green block">Earth Sourced</span>
            <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">Our Raw Materials</h2>
            <p className="text-base text-on-surface-variant leading-relaxed">
              Every botanical element in our apothecary is chosen for its Ayurvedic affinity. From wild-harvested turmeric roots in Pune to therapeutic neem leaves, we source only raw, wild, or organic materials directly from the earth.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 text-sm text-deep-charcoal font-semibold">
              <div className="border-l-2 border-sage-green pl-3">
                <p className="text-primary font-bold">Wild Turmeric</p>
                <p className="text-xs text-on-surface-variant font-medium mt-1">Calming and skin-brightening root extract.</p>
              </div>
              <div className="border-l-2 border-sage-green pl-3">
                <p className="text-primary font-bold">Organic Neem</p>
                <p className="text-xs text-on-surface-variant font-medium mt-1">Deep cleansing, anti-bacterial leaf oil.</p>
              </div>
              <div className="border-l-2 border-sage-green pl-3">
                <p className="text-primary font-bold">Raw Shea Butter</p>
                <p className="text-xs text-on-surface-variant font-medium mt-1">Rich, non-comedogenic moisture.</p>
              </div>
              <div className="border-l-2 border-sage-green pl-3">
                <p className="text-primary font-bold">French Pink Clay</p>
                <p className="text-xs text-on-surface-variant font-medium mt-1">Exfoliates gently, draws out impurities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="font-display text-4xl md:text-5xl font-bold text-sage-green">10k+</p>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground/80">Happy Souls</p>
            </div>
            <div className="space-y-2">
              <p className="font-display text-4xl md:text-5xl font-bold text-sage-green">100%</p>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground/80">Handcrafted</p>
            </div>
            <div className="space-y-2">
              <p className="font-display text-4xl md:text-5xl font-bold text-sage-green">50+</p>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground/80">Micro-Farms</p>
            </div>
            <div className="space-y-2">
              <p className="font-display text-4xl md:text-5xl font-bold text-sage-green">0%</p>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground/80">Synthetics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Restocking Soon Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20 border-b border-soft-beige">
        <div className="text-center mb-12">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green block mb-2">Coming Back Soon</span>
          <h2 className="font-display text-3xl md:text-4xl text-primary">Restocking Soon</h2>
          <div className="w-16 h-px bg-sage-green mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="group bg-cream-bg border border-soft-beige rounded overflow-hidden p-6 text-center space-y-4">
            <div className="aspect-square relative overflow-hidden bg-surface-container-low rounded">
              <img src="/upcoming_product.png" alt="Apothecary Hair Elixir" className="absolute inset-0 w-full h-full object-cover filter blur-[2px] scale-102" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/10 text-white text-xs font-semibold uppercase tracking-widest backdrop-blur-[1px]">Restocking July</span>
            </div>
            <div>
              <h3 className="font-display text-lg text-primary">Bhringraj & Sesame Hair Elixir</h3>
              <p className="text-xs text-on-surface-variant mt-1">Deep conditioning hair oil</p>
            </div>
          </div>
          <div className="group bg-cream-bg border border-soft-beige rounded overflow-hidden p-6 text-center space-y-4">
            <div className="aspect-square relative overflow-hidden bg-surface-container-low rounded">
              <img src="/upcoming_product.png" alt="Damask Rosewater Spritz" className="absolute inset-0 w-full h-full object-cover filter blur-[2px] scale-102" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/10 text-white text-xs font-semibold uppercase tracking-widest backdrop-blur-[1px]">Restocking July</span>
            </div>
            <div>
              <h3 className="font-display text-lg text-primary">Pure Damask Rosewater Spritz</h3>
              <p className="text-xs text-on-surface-variant mt-1">Hydrodistilled rose mist</p>
            </div>
          </div>
          <div className="group bg-cream-bg border border-soft-beige rounded overflow-hidden p-6 text-center space-y-4">
            <div className="aspect-square relative overflow-hidden bg-surface-container-low rounded">
              <img src="/upcoming_product.png" alt="Vetiver Body Polish" className="absolute inset-0 w-full h-full object-cover filter blur-[2px] scale-102" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/10 text-white text-xs font-semibold uppercase tracking-widest backdrop-blur-[1px]">Restocking August</span>
            </div>
            <div>
              <h3 className="font-display text-lg text-primary">Vetiver & Cardamom Body Polish</h3>
              <p className="text-xs text-on-surface-variant mt-1">Exfoliating Ayurvedic scrub</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento: Yoga + Events + About Story */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[600px]">
          <div className="md:col-span-6 relative overflow-hidden rounded-lg group flex flex-col justify-end p-8 border border-soft-beige min-h-[350px]">
            <img src={IMG.yoga} alt="Yoga session" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/85 via-deep-charcoal/30 to-transparent" />
            <div className="relative z-10 text-primary-foreground">
              <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-[0.15em] mb-4 border border-white/30">Mind & Body</span>
              <h3 className="font-display text-3xl mb-2">Join a Yoga Class</h3>
              <p className="text-xs md:text-sm max-w-sm mb-6 opacity-90">Align your physical and spiritual self through guided, traditional practice.</p>
              <Link to="/yoga" className="inline-block bg-surface text-primary text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-soft-beige transition-colors">View Schedule</Link>
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col gap-6">
            <div className="flex-1 bg-surface-container-low border border-soft-beige rounded-lg p-6 flex flex-col justify-center">
              <h3 className="font-display text-xl text-primary mb-2">Upcoming Events</h3>
              <p className="text-xs text-on-surface-variant mb-6">Workshops, retreats, and gatherings rooted in Ayurvedic living.</p>
              <Link to="/events" className="inline-flex items-center text-primary text-xs font-semibold uppercase tracking-[0.15em] hover:text-sage-green transition-colors">
                Explore Events <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="h-44 border border-soft-beige rounded-lg overflow-hidden relative group">
              <img src={IMG.tea} alt="Wellness workshop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
              <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur p-3 rounded text-center border border-soft-beige">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Weekend Retreat</p>
              </div>
            </div>
          </div>
          {/* Bento: Explore More About Story */}
          <div className="md:col-span-3 bg-cream-bg border border-soft-beige rounded-lg p-6 flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-sage-green">Our Story</span>
              <h3 className="font-display text-2xl text-primary mt-2 mb-3">Rooted in Rishikesh</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Born along the banks of the Ganges, Shrutibhyam is a slow-beauty wellness sanctuary. We honor ancestral heritage and clean living.
              </p>
            </div>
            <Link to="/about" className="w-full bg-primary text-primary-foreground text-center text-xs font-semibold uppercase tracking-[0.12em] py-3.5 hover:bg-surface-tint transition-colors">
              Explore Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="bg-surface-container-low py-20 border-t border-soft-beige">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green block">Social Rituals</span>
              <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">Follow Our Journey</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                We share daily inspiration, Ayurvedic wisdom, slow-beauty rituals, and snaps from our yoga studio in Rishikesh. Join our community online.
              </p>
              <a href="https://instagram.com/shrutibhyam" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent border border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3.5 hover:bg-soft-beige transition-colors">
                @shrutibhyam on Instagram
              </a>
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
