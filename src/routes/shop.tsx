
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PRODUCTS } from "@/components/site/content";
import { Quote, Star } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Collections — Shrutibhyam Wellness" },
      { name: "description", content: "Handcrafted Ayurvedic apothecary: cold-pressed soaps, herbal creams, oils, and ritual accessories." },
      { property: "og:title", content: "Ayurvedic Apothecary — Shrutibhyam" },
    ],
  }),
  component: Shop,
});

const FILTERS = {
  Category: ["All Products", "Cold-Pressed Soaps", "Herbal Creams", "Yoga Accessories"],
  Benefit: ["Calming", "Energizing", "Purifying", "Hydrating"],
};

function Shop() {
  return (
    <SiteLayout>
      <section className="bg-cream-bg border-b border-soft-beige">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
          <span className="inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal mb-4">Apothecary</span>
          <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Ayurvedic Apothecary</h1>
          <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
            Discover our handcrafted collections. Rooted in ancient wisdom, formulated for modern wellness with pure botanical ingredients.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
        {/* Sidebar */}
        <aside className="space-y-8">
          {Object.entries(FILTERS).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display text-lg text-primary mb-3">{title}</h4>
              <ul className="space-y-2">
                {items.map((i) => (
                  <li key={i}>
                    <label className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer hover:text-primary">
                      <input type="checkbox" className="accent-sage-green" />
                      {i}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-display text-lg text-primary mb-3">Price Range</h4>
            <input type="range" min={0} max={5000} className="w-full accent-sage-green" defaultValue={2500} />
            <div className="flex justify-between text-xs text-on-surface-variant mt-2">
              <span>₹0</span><span>₹5000+</span>
            </div>
          </div>
          <div className="border-t border-soft-beige pt-6">
            <h4 className="font-display text-lg text-primary mb-3">Brand Purity</h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>✦ Vegan</li>
              <li>✦ Handcrafted</li>
              <li>✦ Cruelty Free</li>
              <li>✦ Sulphate Free</li>
              <li>✦ Paraben Free</li>
            </ul>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-on-surface-variant">Showing 1–{PRODUCTS.length} of {PRODUCTS.length} products</p>
            <select className="bg-surface border border-soft-beige px-3 py-2 text-sm rounded">
              <option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Newest</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((p, idx) => (
              <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="group bg-cream-bg border border-soft-beige rounded overflow-hidden hover:shadow-sm transition">
                <div className="aspect-square relative overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {idx === 2 && <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-1">New</span>}
                  <span className="absolute bottom-3 right-3 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Quick Add — ₹{p.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-primary">{p.name}</h3>
                  <p className="text-sm text-on-surface-variant">{p.subtitle}</p>
                  <p className="mt-3 text-sm font-semibold text-deep-charcoal">₹{p.price.toLocaleString("en-IN")}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-surface-container-low border border-soft-beige rounded-lg p-8 text-center">
            <Quote className="mx-auto text-sage-green mb-3" size={32} strokeWidth={1.5} />
            <p className="italic text-on-surface-variant max-w-2xl mx-auto mb-3">
              "Switching to Shrutibhyam's cold-pressed soaps has completely transformed my daily ritual. My skin has never felt so pure and balanced."
            </p>
            <div className="flex items-center justify-center gap-1 text-sage-green mb-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
            </div>
            <p className="text-xs uppercase tracking-[0.12em] text-primary">— Elena M., Verified Buyer</p>
          </div>

          <div className="flex justify-center items-center gap-2 mt-10 text-sm">
            <button className="w-9 h-9 border border-soft-beige hover:bg-soft-beige">‹</button>
            <button className="w-9 h-9 bg-primary text-primary-foreground">1</button>
            <button className="w-9 h-9 border border-soft-beige hover:bg-soft-beige">2</button>
            <button className="w-9 h-9 border border-soft-beige hover:bg-soft-beige">3</button>
            <button className="w-9 h-9 border border-soft-beige hover:bg-soft-beige">›</button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
