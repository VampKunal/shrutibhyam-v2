import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, X, Sparkles, Check } from "lucide-react";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { getWooProducts } from "@/lib/api/woocommerce.functions";
import { LocalProduct } from "@/lib/woocommerce";
import { useCart } from "@/context/CartContext";
import { PriceDisplay } from "@/components/ui/PriceDisplay";

export function SearchDialog() {
 const [isOpen, setIsOpen] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");
 const [similarToProduct, setSimilarToProduct] = useState<LocalProduct | null>(null);

 const [products, setProducts] = useState<LocalProduct[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const [addedSlugs, setAddedSlugs] = useState<Record<string, boolean>>({});

 const { addToCart } = useCart();
 const navigate = useNavigate();

 // Load products when the dialog opens
 useEffect(() => {
 if (!isOpen) return;

 let isMounted = true;
 const fetchProducts = async () => {
 setIsLoading(true);
 try {
 const data = await getWooProducts();
 if (isMounted) {
 setProducts(data || []);
 }
 } catch (err) {
 console.error("Error fetching products in search dialog:", err);
 } finally {
 if (isMounted) {
 setIsLoading(false);
 }
 }
 };

 fetchProducts();

 return () => {
 isMounted = false;
 };
 }, [isOpen]);

 // Clean up queries and filters when modal is closed
 useEffect(() => {
 if (!isOpen) {
 setSearchQuery("");
 setSimilarToProduct(null);
 }
 }, [isOpen]);

 // Popular categories list
 const categories = ["Skincare", "Yoga", "Others"];

 // Filter products based on search input and similar-to selection
 const filteredProducts = useMemo(() => {
 if (!products.length) return [];

 if (similarToProduct) {
 // Find similar products in the same category/tag, excluding the selected product itself
 return products.filter(
 (p) => p.tag === similarToProduct.tag && p.slug !== similarToProduct.slug
 );
 }

 if (!searchQuery.trim()) return [];

 const query = searchQuery.toLowerCase().trim();
 return products.filter(
 (p) =>
 p.name.toLowerCase().includes(query) ||
 p.subtitle.toLowerCase().includes(query) ||
 p.tag.toLowerCase().includes(query)
 );
 }, [products, searchQuery, similarToProduct]);

 // Add item to cart and show quick "Added" feedback
 const handleAddToCart = (product: LocalProduct) => {
 addToCart(product, 1);
 setAddedSlugs((prev) => ({ ...prev, [product.slug]: true }));
 setTimeout(() => {
 setAddedSlugs((prev) => ({ ...prev, [product.slug]: false }));
 }, 1500);
 };

 const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
 if (e.key === "Enter" && searchQuery.trim()) {
 setIsOpen(false);
 navigate({ to: "/shop", search: { search: searchQuery.trim() } });
 }
 };

 const SkeletonRow = () => (
 <div className="flex items-center gap-4 p-3 bg-white/40 border border-soft-beige/40 rounded-lg animate-pulse">
 <div className="w-14 h-14 bg-soft-beige/50 rounded flex-shrink-0" />
 <div className="flex-1 space-y-2">
 <div className="h-4 bg-soft-beige/50 rounded w-1/3" />
 <div className="h-3 bg-soft-beige/30 rounded w-1/2" />
 </div>
 <div className="w-16 h-8 bg-soft-beige/40 rounded" />
 </div>
 );

 return (
 <>
 {/* Mobile Trigger: Simple Icon Search Button */}
 <button
 onClick={() => setIsOpen(true)}
 className="hover:text-sage-green p-1.5 text-primary cursor-pointer"
 aria-label="Search"
 >
 <Search size={20} />
 </button>

 <Dialog open={isOpen} onOpenChange={setIsOpen}>
 <DialogContent className="max-w-2xl bg-cream-bg border-soft-beige max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-lg shadow-2xl">
 {/* Header */}
 <DialogHeader className="px-6 pt-6 pb-4 ">
 <DialogTitle className="font-display text-2xl text-primary flex items-center gap-2">
 <Search size={22} className="text-sage-green" />
 <span>Search Our Apothecary</span>
 </DialogTitle>
 <DialogDescription className="text-xs text-on-surface-variant/70">
 Find cold-pressed handmade soaps, botanical creams, oils, and Ayurvedic wellness rituals.
 </DialogDescription>
 </DialogHeader>

 {/* Search Input field */}
 <div className="px-6 py-4 bg-surface">
 <div className="relative">
 <Search
 className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
 size={18}
 />
 <input
 type="text"
 placeholder="Type to search..."
 value={searchQuery}
 onChange={(e) => {
 setSearchQuery(e.target.value);
 setSimilarToProduct(null);
 }}
 onKeyDown={handleKeyDown}
 className="w-full pl-11 pr-4 py-2.5 bg-cream-bg border border-soft-beige rounded-full focus:outline-none focus:ring-1 focus:ring-sage-green focus:border-sage-green transition-all text-sm text-primary placeholder:text-on-surface-variant/40 font-semibold"
 autoFocus
 />
 </div>
 </div>

 {/* Similar Products Active Filter Banner */}
 {similarToProduct && (
 <div className="px-6 py-2.5 bg-sage-green/10 border-b border-sage-green/20 flex items-center justify-between text-xs text-primary font-medium animate-in fade-in slide-in-from-top-1">
 <span className="flex items-center gap-1.5">
 <Sparkles size={13} className="text-sage-green" />
 Showing products similar to: <strong className="text-primary font-bold">{similarToProduct.name}</strong>
 </span>
 <button
 onClick={() => setSimilarToProduct(null)}
 className="text-sage-green hover:text-primary transition-colors hover:underline cursor-pointer flex items-center gap-1 font-semibold"
 >
 Clear filter <X size={12} />
 </button>
 </div>
 )}

 {/* Dialog Body (Results / Recommendations) */}
 <div className="flex-1 overflow-y-auto p-6 min-h-[250px] max-h-[450px]">
 {isLoading ? (
 <div className="space-y-3">
 <SkeletonRow />
 <SkeletonRow />
 <SkeletonRow />
 </div>
 ) : similarToProduct || searchQuery.trim() ? (
 // Results Found
 filteredProducts.length > 0 ? (
 <div className="space-y-3">
 {filteredProducts.map((p) => (
 <div
 key={p.slug}
 className="flex items-center gap-4 p-3 bg-white hover:bg-surface border border-soft-beige/50 hover:border-soft-beige rounded-lg transition-all group"
 >
 <Link
 to="/shop/$slug"
 params={{ slug: p.slug }}
 onClick={() => setIsOpen(false)}
 className="w-14 h-14 bg-cream-bg rounded overflow-hidden flex-shrink-0 border border-soft-beige/40 cursor-pointer"
 >
 <img
 src={p.image}
 alt={p.name}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
 />
 </Link>

 <div className="flex-1 min-w-0">
 <Link
 to="/shop/$slug"
 params={{ slug: p.slug }}
 onClick={() => setIsOpen(false)}
 className="hover:text-sage-green cursor-pointer block"
 >
 <h4 className="font-display text-sm text-primary font-bold truncate">
 {p.name}
 </h4>
 </Link>
 <p className="text-xs text-on-surface-variant truncate">
 {p.subtitle}
 </p>
 <div className="flex items-center gap-2 mt-1">
 <PriceDisplay price={p.price} />
 <span className="text-[10px] uppercase bg-soft-beige/50 px-2 py-0.5 rounded text-on-surface-variant/80 font-medium">
 {p.tag}
 </span>
 </div>
 </div>

 <div className="flex items-center gap-2 flex-shrink-0">
 {/* Similar Products Button */}
 <button
 onClick={() => setSimilarToProduct(p)}
 className="p-2 border border-soft-beige rounded bg-cream-bg text-on-surface-variant hover:text-sage-green hover:bg-soft-beige transition-colors text-xs flex items-center gap-1.5 font-semibold cursor-pointer"
 title={`Find products similar to ${p.name}`}
 >
 <Sparkles size={13} className="text-sage-green" />
 <span className="hidden sm:inline">Similar</span>
 </button>

 {/* Quick Add To Cart Button */}
 <button
 onClick={() => handleAddToCart(p)}
 className={`p-2 border rounded transition-colors text-xs flex items-center gap-1.5 font-semibold cursor-pointer ${addedSlugs[p.slug]
 ? "bg-sage-green border-sage-green text-white"
 : "bg-primary border-primary text-white hover:bg-surface-tint"
 }`}
 >
 {addedSlugs[p.slug] ? (
 <>
 <Check size={13} />
 <span className="hidden sm:inline">Added</span>
 </>
 ) : (
 <>
 <ShoppingBag size={13} />
 <span className="hidden sm:inline">Add</span>
 </>
 )}
 </button>
 </div>
 </div>
 ))}
 </div>
 ) : (
 // No Results
 <div className="h-full flex flex-col items-center justify-center text-center py-8">
 <div className="w-12 h-12 rounded-full bg-soft-beige/30 flex items-center justify-center text-on-surface-variant/60 mb-3">
 <Search size={22} />
 </div>
 <h4 className="font-display text-base text-primary font-bold">
 No rituals found
 </h4>
 <p className="text-xs text-on-surface-variant/70 mt-1 max-w-xs">
 We couldn't find anything matching your search. Try adjusting keywords or exploring categories.
 </p>
 </div>
 )
 ) : (
 // Empty search screen: display Categories & Recommendations
 <div className="space-y-6">
 <div>
 <h5 className="text-[10px] uppercase tracking-[0.12em] text-on-surface-variant/80 font-bold mb-3">
 Popular Categories
 </h5>
 <div className="flex flex-wrap gap-2">
 {categories.map((cat) => (
 <button
 key={cat}
 onClick={() => setSearchQuery(cat)}
 className="px-3.5 py-1.5 bg-white hover:bg-surface border border-soft-beige text-xs text-primary font-semibold hover:border-sage-green hover:text-sage-green rounded-full transition-all cursor-pointer"
 >
 {cat}
 </button>
 ))}
 </div>
 </div>

 <div>
 <h5 className="text-[10px] uppercase tracking-[0.12em] text-on-surface-variant/80 font-bold mb-3">
 Recommended Rituals
 </h5>
 {products.length > 0 ? (
 <div className="space-y-3">
 {products.slice(0, 3).map((p) => (
 <div
 key={p.slug}
 className="flex items-center gap-4 p-2.5 bg-white/40 hover:bg-white border border-soft-beige/30 hover:border-soft-beige rounded-lg transition-all group"
 >
 <Link
 to="/shop/$slug"
 params={{ slug: p.slug }}
 onClick={() => setIsOpen(false)}
 className="w-12 h-12 bg-cream-bg rounded overflow-hidden flex-shrink-0 border border-soft-beige/30 cursor-pointer"
 >
 <img
 src={p.image}
 alt={p.name}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
 />
 </Link>

 <div className="flex-1 min-w-0">
 <Link
 to="/shop/$slug"
 params={{ slug: p.slug }}
 onClick={() => setIsOpen(false)}
 className="hover:text-sage-green cursor-pointer block"
 >
 <h4 className="font-display text-sm text-primary font-bold truncate">
 {p.name}
 </h4>
 </Link>
 <p className="text-[11px] text-on-surface-variant truncate">
 {p.subtitle}
 </p>
 </div>

 <div className="flex items-center gap-2">
 <PriceDisplay price={p.price} />
 <button
 onClick={() => handleAddToCart(p)}
 className={`p-1.5 border rounded transition-colors text-xs flex items-center justify-center font-semibold cursor-pointer ${addedSlugs[p.slug]
 ? "bg-sage-green border-sage-green text-white"
 : "bg-primary border-primary text-white hover:bg-surface-tint"
 }`}
 title="Add to Cart"
 >
 {addedSlugs[p.slug] ? <Check size={13} /> : <ShoppingBag size={13} />}
 </button>
 </div>
 </div>
 ))}
 </div>
 ) : (
 <div className="space-y-3 animate-pulse">
 <SkeletonRow />
 <SkeletonRow />
 </div>
 )}
 </div>
 </div>
 )}
 </div>
 </DialogContent>
 </Dialog>
 </>
 );
}
