import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { PRODUCTS } from "@/components/site/content";
import { Minus, Plus, ChevronDown, Star, StarHalf, Leaf, Hand, Droplets, PawPrint, FlaskConical, Sparkles, Flower2, Palette } from "lucide-react";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} — Shrutibhyam` },
      { name: "description", content: `${loaderData?.product.name} — ${loaderData?.product.subtitle}. Handcrafted Ayurvedic skincare.` },
      { property: "og:title", content: loaderData?.product.name },
      { property: "og:image", content: loaderData?.product.image },
    ],
  }),
  component: Product,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="max-w-[800px] mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-primary mb-4">Product not found</h1>
        <Link to="/shop" className="text-sage-green underline">Back to shop</Link>
      </div>
    </SiteLayout>
  ),
});

const ACCORDIONS = [
  { title: "Ingredients", body: "Saponified Oils of Olive, Coconut, and Castor; Raw Unrefined Shea Butter; Organic Haldi (Turmeric) Root Extract; Essential Oils of Sandalwood, Vetiver, and Sweet Orange. Free from synthetic fragrances, dyes, and palm oil." },
  { title: "Benefits", body: "Wild Turmeric calms redness and promotes even skin tone. Raw Shea Butter deeply moisturizes without clogging pores. Sandalwood and Vetiver provide a grounding, earthy aromatherapy." },
  { title: "How to Use", body: "Lather between hands with warm water, gently massage onto damp skin in circular motions, and rinse thoroughly. Store on a well-draining soap dish to prolong life." },
];

const PURITY = [
  { icon: Leaf, label: "Vegan" }, { icon: Hand, label: "Handcrafted" }, { icon: Droplets, label: "Hand poured" }, { icon: PawPrint, label: "Cruelty free" },
  { icon: FlaskConical, label: "Sulphate free" }, { icon: Sparkles, label: "Paraben free" }, { icon: Flower2, label: "No synthetic fragrance" }, { icon: Palette, label: "No synthetic colour" },
];

function Product() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>("Ingredients");

  return (
    <SiteLayout>
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12">
        <Link to="/shop" className="text-xs uppercase tracking-[0.12em] text-on-surface-variant hover:text-primary">← Back to Shop</Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
          <div className="aspect-square bg-cream-bg border border-soft-beige rounded overflow-hidden relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <div className="flex gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] bg-soft-beige px-3 py-1 rounded-full">Cold-Pressed</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] bg-soft-beige px-3 py-1 rounded-full">Vegan</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">{product.name}</h1>
            <p className="text-2xl font-display text-primary">₹{product.price.toLocaleString("en-IN")}</p>
            <p className="text-base text-on-surface-variant leading-relaxed">
              Rooted in ancient Ayurvedic wisdom, this cold-processed bar is enriched with wild turmeric and raw shea butter. It gently purifies, brightens, and restores your skin's natural glow.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-primary">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-soft-beige"><Minus size={14} /></button>
                <span className="px-5 text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-soft-beige"><Plus size={14} /></button>
              </div>
              <button className="flex-1 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] py-4 hover:bg-surface-tint transition-colors">
                Add to Cart
              </button>
            </div>
            <div className="border-t border-soft-beige pt-4">
              {ACCORDIONS.map((a) => (
                <div key={a.title} className="border-b border-soft-beige">
                  <button onClick={() => setOpen(open === a.title ? null : a.title)} className="w-full flex justify-between items-center py-4 text-left">
                    <span className="font-display text-lg text-primary">{a.title}</span>
                    <ChevronDown size={18} className={`transition-transform ${open === a.title ? "rotate-180" : ""}`} />
                  </button>
                  {open === a.title && <p className="text-sm text-on-surface-variant pb-4 leading-relaxed">{a.body}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Purity */}
        <section className="mt-20">
          <h2 className="font-display text-2xl text-primary text-center mb-8">Purity & Quality</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {PURITY.map(({ icon: Icon, label }) => (
              <div key={label} className="bg-cream-bg border border-soft-beige rounded p-6 text-center">
                <Icon size={28} className="mx-auto text-sage-green mb-3" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-deep-charcoal">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-20">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl text-primary mb-2">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-1 text-sage-green">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
              <span className="text-sm text-on-surface-variant ml-2">4.9/5 based on 128 reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stars: 5, q: "The earthy scent is incredibly grounding. It doesn't strip my skin like commercial soaps do.", name: "Elena R." },
              { stars: 5, q: "Has been a lifesaver for my sensitive skin. Lathers beautifully and leaves my skin nourished.", name: "Marcus T." },
              { stars: 4.5, q: "Beautiful packaging and an even better product. You can feel the artisanal quality.", name: "Sarah L." },
            ].map((r) => (
              <div key={r.name} className="bg-cream-bg border border-soft-beige rounded p-6">
                <div className="flex text-sage-green mb-3">
                  {Array.from({ length: Math.floor(r.stars) }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                  {r.stars % 1 !== 0 && <StarHalf size={14} fill="currentColor" strokeWidth={0} />}
                </div>
                <p className="italic text-sm text-on-surface-variant mb-4">"{r.q}"</p>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">— {r.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
