import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { IMG, PRODUCTS } from "@/components/site/content";
import { ArrowRight, Leaf, Hand, Recycle, Droplets, Star, Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shrutibhyam Wellness — Rooted in Ayurvedic Purity" },
      { name: "description", content: "Discover slow-beauty Ayurvedic skincare, mindful yoga, and holistic events." },
      { property: "og:title", content: "Shrutibhyam Wellness" },
      { property: "og:image", content: IMG.hero },
    ],
  }),
  component: Home,
});

const TRUST = [
  { icon: Leaf, label: "Vegan" },
  { icon: Hand, label: "Handcrafted" },
  { icon: Recycle, label: "Sustainable" },
  { icon: Droplets, label: "100% Non-Toxic" },
];

const MARQUEE = ["Vegan","Handcrafted","Hand poured","Cruelty free","Sulphate free","Paraben free","No synthetic fragrance","No synthetic colour"];

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-cream-bg overflow-hidden">
        <img src={IMG.hero} alt="Serene wellness ritual" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply" />
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

      {/* Top Sellers */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">Ayurvedic Essentials</h2>
          <div className="w-16 h-px bg-sage-green mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.slice(0, 3).map((p) => (
            <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="group bg-cream-bg border border-soft-beige hover:shadow-sm transition-all rounded overflow-hidden">
              <div className="aspect-square relative overflow-hidden bg-surface-container-low">
                <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-soft-beige rounded-full text-xs text-deep-charcoal">{p.tag}</span>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-display text-xl text-primary mb-1">{p.name}</h3>
                <p className="text-sm text-on-surface-variant mb-3">{p.subtitle}</p>
                <p className="text-sm font-semibold text-deep-charcoal">₹{p.price.toLocaleString("en-IN")}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/shop" className="border-b border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] pb-1 hover:text-sage-green hover:border-sage-green transition-colors">
            View All Products
          </Link>
        </div>
      </section>

      <div className="w-full h-px bg-soft-beige max-w-[1200px] mx-auto" />

      {/* Bento: Yoga + Events */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[600px]">
          <div className="md:col-span-8 relative overflow-hidden rounded-lg group flex flex-col justify-end p-8 border border-soft-beige min-h-[400px]">
            <img src={IMG.yoga} alt="Yoga session" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/85 via-deep-charcoal/30 to-transparent" />
            <div className="relative z-10 text-primary-foreground">
              <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-[0.15em] mb-4 border border-white/30">Mind & Body</span>
              <h3 className="font-display text-3xl md:text-4xl mb-2">Join a Yoga Class</h3>
              <p className="text-sm md:text-base max-w-md mb-6 opacity-90">Align your physical and spiritual self through guided, traditional practice.</p>
              <Link to="/yoga" className="inline-block bg-surface text-primary text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-soft-beige transition-colors">View Schedule</Link>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex-1 bg-surface-container-low border border-soft-beige rounded-lg p-8 flex flex-col justify-center">
              <h3 className="font-display text-2xl text-primary mb-2">Upcoming Events</h3>
              <p className="text-sm text-on-surface-variant mb-6">Workshops, retreats, and gatherings rooted in Ayurvedic living.</p>
              <Link to="/events" className="inline-flex items-center text-primary text-xs font-semibold uppercase tracking-[0.15em] hover:text-sage-green transition-colors">
                Explore Events <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="h-48 border border-soft-beige rounded-lg overflow-hidden relative group">
              <img src={IMG.tea} alt="Wellness workshop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
              <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur p-3 rounded text-center border border-soft-beige">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Weekend Retreat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Quote className="text-sage-green mx-auto mb-3" size={40} strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl text-primary">Community Voices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { quote: "The purity of these products is unmatched. Integrating them into my daily routine feels less like skincare and more like a grounding ritual.", name: "Akratu", role: "Verified Buyer" },
              { quote: "Morning yoga sessions have transformed my week. The environment is serene and the instructors are deeply rooted in tradition.", name: "Abhinav", role: "Studio Member" },
            ].map((t) => (
              <div key={t.name} className="bg-cream-bg p-8 border border-soft-beige rounded-lg">
                <div className="flex text-sage-green mb-4">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                </div>
                <p className="text-sm md:text-base italic text-on-surface-variant mb-6 leading-relaxed">"{t.quote}"</p>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{t.name}</p>
                <p className="text-xs text-outline">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
