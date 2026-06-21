import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Quote, Star } from "lucide-react";
import { getWooProducts } from "@/lib/api/woocommerce.functions";
import { useState, useMemo, useEffect } from "react";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop Collections — Shrutibhyam Wellness" },
      { name: "description", content: "Handcrafted Ayurvedic apothecary: cold-pressed soaps, herbal creams, oils, and ritual accessories." },
      { property: "og:title", content: "Ayurvedic Apothecary — Shrutibhyam" },
    ],
  }),
  loader: async () => {
    const products = await getWooProducts();
    return { products };
  },
  component: Shop,
});

function Shop() {
  const { products } = Route.useLoaderData();
  
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [priceLimit, setPriceLimit] = useState(5000);
  const [sortBy, setSortBy] = useState("Featured");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract categories dynamically from active products list
  const categories = useMemo(() => {
    return ["All Products", ...Array.from(new Set(products.map((p) => p.tag).filter(Boolean)))];
  }, [products]);

  // Determine highest product price to scale slider dynamically
  const maxPrice = useMemo(() => {
    const highest = products.reduce((max, p) => (p.price > max ? p.price : max), 0);
    return Math.ceil(highest / 500) * 500 || 5000;
  }, [products]);

  useEffect(() => {
    setPriceLimit(maxPrice);
  }, [maxPrice]);

  // Filter products by category and max price
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === "All Products" || p.tag === selectedCategory;
      const matchPrice = p.price <= priceLimit;
      return matchCategory && matchPrice;
    });
  }, [products, selectedCategory, priceLimit]);

  // Sort products based on criteria
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "Price: Low to High") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "Price: High to Low") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "Newest") {
      return list.reverse();
    }
    return list; // Featured / Default
  }, [filteredProducts, sortBy]);

  // Reset page to 1 when filters or sort criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceLimit, sortBy]);

  // Pagination calculations
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE) || 1;
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

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
          <div>
            <h4 className="font-display text-lg text-primary mb-3">Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => {
                const count = cat === "All Products" 
                  ? products.length 
                  : products.filter((p) => p.tag === cat).length;
                return (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-sm cursor-pointer hover:text-primary transition-colors flex items-center justify-between w-full text-left font-medium ${
                        selectedCategory === cat ? "text-primary font-semibold" : "text-on-surface-variant"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[10px] bg-soft-beige/50 px-2 py-0.5 rounded-full text-on-surface-variant">
                        {count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg text-primary mb-3">Price Range</h4>
            <input
              type="range"
              min={0}
              max={maxPrice}
              step={10}
              value={priceLimit}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
              className="w-full accent-sage-green cursor-pointer"
            />
            <div className="flex justify-between text-xs text-on-surface-variant mt-2 font-medium">
              <span>₹0</span>
              <span className="text-primary font-semibold">Max: ₹{priceLimit.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <div className="border-t border-soft-beige pt-6">
            <h4 className="font-display text-lg text-primary mb-3">Brand Purity</h4>
            <ul className="space-y-2 text-sm text-on-surface-variant font-medium">
              <li>✦ 100% Vegan</li>
              <li>✦ Handcrafted in Small Batches</li>
              <li>✦ Cruelty Free</li>
              <li>✦ Sulphate & Paraben Free</li>
              <li>✦ No Synthetic Fragrance</li>
            </ul>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-on-surface-variant">
              Showing {sortedProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface border border-soft-beige px-3 py-2 text-sm rounded cursor-pointer focus:outline-none focus:ring-1 focus:ring-sage-green"
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="text-center py-16 bg-cream-bg border border-soft-beige rounded">
              <h3 className="font-display text-xl text-primary mb-2">No products found</h3>
              <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
                Try adjusting your price range or selecting another category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All Products");
                  setPriceLimit(maxPrice);
                }}
                className="mt-4 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-5 py-3 hover:bg-surface-tint transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((p, idx) => (
                <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="group bg-cream-bg border border-soft-beige rounded overflow-hidden hover:shadow-sm transition">
                  <div className="aspect-square relative overflow-hidden bg-surface-container-low">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {idx === 0 && <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2 py-1">New</span>}
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-sage-green">{p.tag}</span>
                    <h3 className="font-display text-lg text-primary mt-1">{p.name}</h3>
                    <p className="text-sm text-on-surface-variant line-clamp-1">{p.subtitle}</p>
                    <p className="mt-3 text-sm font-semibold text-deep-charcoal">₹{p.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

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

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10 text-sm">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 border border-soft-beige hover:bg-soft-beige flex items-center justify-center disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer"
                aria-label="Previous page"
              >
                ‹
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 flex items-center justify-center font-medium transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-primary text-primary-foreground"
                        : "border border-soft-beige hover:bg-soft-beige"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 border border-soft-beige hover:bg-soft-beige flex items-center justify-center disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer"
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
