import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { 
  IMG, 
  PRODUCTS, 
  TRUST, 
  MARQUEE, 
  HERO_CAROUSEL, 
  FAQ, 
  CONTACT_INFO
} from "@/constant";
import { ArrowRight, Star, Quote, ChevronDown, Instagram, Facebook, Linkedin } from "lucide-react";
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
  staleTime: 1000 * 60 * 5, // 5 minutes cache
  component: Home,
});

function Home() {
  const { products: wooProducts } = Route.useLoaderData();
  const products = wooProducts && wooProducts.length > 0 ? wooProducts : PRODUCTS;
  const [currentImg, setCurrentImg] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

      {/* Testimonials */}
      <TestimonialsGallery />


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

      {/* FAQ Section */}
      <section className="bg-cream-bg border-t border-b border-soft-beige py-20" id="faqs">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green block mb-2">Common Inquiries</span>
              <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">Frequently Asked Questions</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Here are some of the most common inquiries we receive. If you don't find the answer you're looking for, feel free to reach out to our team.
              </p>
            </div>
            <div className="bg-surface border border-soft-beige rounded">
              {FAQ.map((item, i) => (
                <div key={item.q} className="border-b border-soft-beige last:border-b-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center text-left p-5 group hover:bg-cream-bg/40 transition-colors"
                  >
                    <span className="font-display text-base md:text-lg text-primary group-hover:text-sage-green transition-colors">{item.q}</span>
                    <ChevronDown size={18} className={`text-on-surface-variant transition-transform duration-300 ${openFaq === i ? "rotate-180 text-sage-green" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <p className="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed">
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green block">Social Rituals</span>
              <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">Follow Our Journey</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                We share daily inspiration, Ayurvedic wisdom, slow-beauty rituals, and snaps from our yoga studio in Rishikesh. Join our community online.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href={CONTACT_INFO.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 bg-transparent border border-primary text-primary text-xs font-semibold uppercase tracking-[0.12em] px-4 py-3 hover:bg-soft-beige transition-all shrink-0"
                >
                  <Instagram size={16} /> Instagram
                </a>
                <a 
                  href={CONTACT_INFO.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 bg-transparent border border-primary text-primary text-xs font-semibold uppercase tracking-[0.12em] px-4 py-3 hover:bg-soft-beige transition-all shrink-0"
                >
                  <Facebook size={16} /> Facebook
                </a>
                <a 
                  href={CONTACT_INFO.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 bg-transparent border border-primary text-primary text-xs font-semibold uppercase tracking-[0.12em] px-4 py-3 hover:bg-soft-beige transition-all shrink-0"
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
