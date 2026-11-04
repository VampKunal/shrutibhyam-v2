import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { LocalProduct } from "@/lib/woocommerce";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import {
  Sparkles,
  Heart,
  Share2,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  Gift,
  Flame,
  Leaf,
  Package,
  MessageCircle,
  Star,
  Instagram,
  ArrowRight
} from "lucide-react";

interface DiwaliProductViewProps {
  product: LocalProduct;
  allProducts?: LocalProduct[];
}

export function DiwaliProductView({ product, allProducts = [] }: DiwaliProductViewProps) {
  const { addToCart, toggleCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState("/vertical_diwali.PNG");
  const [copied, setCopied] = useState(false);

  const images = ["/vertical_diwali.PNG", "/horizontal_diwali2.PNG"];

  const handleAddToCart = () => {
    addToCart(product, qty);
    toggleCart(true);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    toggleCart(true);
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Shrutibhyam Diwali Gift Box",
          text: "Roshni ghar mein, glow chehre pe ✨ — Shrutibhyam Diwali Gift Box",
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const signatureSoaps = [
    {
      name: "Earthy Turmeric",
      tag: "Brightening & Glow",
      desc: "Warm turmeric & pure botanical oils for natural glow, barrier healing & radiance.",
      image: "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/2-2.avif",
    },
    {
      name: "Lavender Calm",
      tag: "Soothing & Hydrating",
      desc: "Pure French lavender essential oil & rich shea butter for deep nourishment and nervous system calming.",
      image: "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/1-1.avif",
    },
    {
      name: "Neem Purify",
      tag: "Clarifying & Detox",
      desc: "Cold-pressed neem & tea tree for clarifying blemish defense, purification & oil balance.",
      image: "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/1-3.avif",
    },
    {
      name: "French Clay Detox",
      tag: "Pore Cleansing & Smooth",
      desc: "Mineral-rich French green clay gently drawing out impurities while keeping skin supple.",
      image: "https://checkout.shrutibhyam.com/wp-content/uploads/2026/06/2.avif",
    },
  ];

  const otherProducts = allProducts.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <SiteLayout>
      {/* Top Festive Announcement Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 text-xs py-3 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-amber-800/60 shadow-xs">
        <Sparkles size={14} className="text-amber-300 animate-pulse shrink-0" />
        <span className="font-serif italic font-semibold">Roshni ghar mein, glow chehre pe ✨</span>
        <span className="hidden sm:inline text-amber-400/80">•</span>
        <span className="hidden sm:inline">🪔 Diwali price ₹1,199 valid till 8th November</span>
        <span className="hidden sm:inline text-amber-400/80">•</span>
        <span className="hidden md:inline">🚚 Free shipping across India</span>
        <Sparkles size={14} className="text-amber-300 animate-pulse shrink-0" />
      </div>

      <section className="bg-surface py-8 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/shop"
              className="text-xs uppercase tracking-[0.14em] text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1.5"
            >
              ← Back to Shop
            </Link>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-900 bg-amber-100/90 px-3.5 py-1 rounded-full border border-amber-300">
              🪔 Diwali Special • Limited Stock
            </span>
          </div>

          {/* Main Product Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Gallery Column */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 shrink-0">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`shrink-0 w-20 h-24 md:w-24 md:h-32 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-white p-1.5 ${
                      activeImage === img
                        ? "border-amber-600 ring-2 ring-amber-400/40 shadow-sm"
                        : "border-soft-beige hover:border-amber-300 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Diwali Gift Box View ${idx + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </button>
                ))}
              </div>

              {/* Main Featured Image Showcase */}
              <div className="relative flex-1 bg-[#FAF5F2] rounded-3xl overflow-hidden border border-amber-200/90 shadow-xl max-h-[750px] flex items-center justify-center p-3 sm:p-5">
                <img
                  src={activeImage}
                  alt="Shrutibhyam Diwali Gift Box"
                  className="w-full h-full object-contain rounded-2xl max-h-[700px] transition-transform duration-500 hover:scale-[1.01]"
                  fetchPriority="high"
                />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 bg-amber-800/90 backdrop-blur-xs text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Sparkles size={12} className="text-amber-300" />
                  Diwali Edition
                </div>

                <div className="absolute top-4 right-4 bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  Save ₹301
                </div>
              </div>
            </div>

            {/* Details & Actions Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
                    Festive Keepsake
                  </span>
                  <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span>5.0</span>
                    <span className="text-on-surface-variant font-normal">(Festive Bestseller)</span>
                  </div>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight">
                  Shrutibhyam Diwali Gift Box
                </h1>

                {/* Catchy Hook */}
                <p className="text-xl sm:text-2xl text-amber-900 font-serif italic">
                  Roshni ghar mein, glow chehre pe ✨
                </p>

                <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                  Thoughtful • Handmade • Naturally Yours
                </p>
              </div>

              {/* Price & Offer Box */}
              <div className="bg-gradient-to-br from-amber-50 via-amber-50/70 to-orange-50/50 border border-amber-200 rounded-2xl p-5 mb-6 shadow-xs">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-3xl sm:text-4xl font-bold text-primary">
                    ₹1,199
                  </span>
                  <span className="text-lg text-on-surface-variant line-through font-medium">
                    ₹1,500
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                    Save ₹301 (20% OFF)
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-amber-200/60 text-xs">
                  <p className="text-amber-900 font-bold flex items-center gap-2">
                    <span>🪔</span>
                    <span>Diwali price, valid till <strong>8th November</strong></span>
                  </p>
                  <p className="text-amber-900 flex items-center gap-2 font-medium">
                    <span>🎁</span>
                    <span><strong className="text-amber-950 font-bold">3 festive candles FREE</strong> in every box</span>
                  </p>
                  <p className="text-emerald-700 flex items-center gap-2 font-medium">
                    <Truck size={14} className="text-emerald-700 shrink-0" />
                    <span><strong>Free shipping</strong> across India</span>
                  </p>
                </div>
              </div>

              {/* Your Box Includes (Primary Checklist) */}
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 mb-6 shadow-sm">
                <h3 className="font-display text-base text-primary font-bold mb-3 flex items-center gap-2">
                  <span>✨</span> Your Box Includes:
                </h3>
                <ul className="space-y-2.5 text-xs text-primary">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold text-sm leading-none mt-0.5">✔️</span>
                    <span className="leading-relaxed">
                      <strong>2 surprise handcrafted cold process soaps</strong> 🎉
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold text-sm leading-none mt-0.5">✔️</span>
                    <span className="leading-relaxed">
                      <strong>Natural loofah</strong> for daily skin polish & exfoliation
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold text-sm leading-none mt-0.5">✔️</span>
                    <span className="leading-relaxed">
                      <strong>Premium keepsake gift box</strong> with red satin ribbon handle
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 bg-amber-50 p-2.5 rounded-xl border border-amber-200/80">
                    <span className="text-base leading-none">🎁</span>
                    <span className="text-amber-950 font-semibold leading-relaxed">
                      <strong>FREE:</strong> Motichoor Laddoo, Gujiya and Sutli Bomb candles
                    </span>
                  </li>
                </ul>
              </div>

              {/* Purchasing Actions */}
              <div className="bg-white rounded-2xl p-5 border border-soft-beige shadow-sm space-y-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-soft-beige rounded-xl overflow-hidden bg-surface">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="p-3 hover:bg-soft-beige/50 transition-colors text-primary cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-primary">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="p-3 hover:bg-soft-beige/50 transition-colors text-primary cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="text-xs">
                    <span className="text-emerald-600 font-bold block">In Stock & Ready to Dispatch</span>
                    <span className="text-on-surface-variant">Ships within 24 hours across India</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-white text-xs font-bold uppercase tracking-[0.16em] py-4 rounded-xl hover:bg-amber-900 transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} /> Add to Bag
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-amber-700 text-white text-xs font-bold uppercase tracking-[0.16em] py-4 rounded-xl hover:bg-amber-800 transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles size={16} /> Buy Now
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-soft-beige/60 text-xs">
                  <button
                    onClick={() => toggleWishlist(product.slug)}
                    className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    <Heart
                      size={18}
                      className={isInWishlist(product.slug) ? "fill-red-500 text-red-500" : ""}
                    />
                    <span>{isInWishlist(product.slug) ? "Saved in Wishlist" : "Save to Wishlist"}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    <Share2 size={16} />
                    <span>{copied ? "Link Copied!" : "Share Hamper"}</span>
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs text-on-surface-variant">
                <div className="flex items-center gap-2.5 bg-surface p-3 rounded-xl border border-soft-beige">
                  <Truck size={16} className="text-amber-700 shrink-0" />
                  <span>Ships within 24h</span>
                </div>
                <div className="flex items-center gap-2.5 bg-surface p-3 rounded-xl border border-soft-beige">
                  <ShieldCheck size={16} className="text-amber-700 shrink-0" />
                  <span>100% Handcrafted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Surprise Story Section */}
      <section className="bg-gradient-to-b from-cream-bg via-amber-50/40 to-cream-bg py-16 md:py-24 border-y border-soft-beige">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-amber-200/90 shadow-md">
            <div className="max-w-[800px] mx-auto text-center space-y-4 mb-12">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-800 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-200">
                The Surprise Element
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-primary">
                The Surprise in Every Box 🎉
              </h2>
              <blockquote className="text-base sm:text-lg text-primary/90 leading-relaxed font-serif italic bg-amber-50/60 p-6 rounded-2xl border border-amber-200/70">
                “Every box holds 2 of our 4 signature soaps (Earthy Turmeric, Lavender Calm, Neem Purify and French Clay Detox), handpicked by us. Each soap is pure, natural and made with love, so whichever two you get, your skin will thank you ✨”
              </blockquote>
            </div>

            {/* The 4 Signature Soaps Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {signatureSoaps.map((soap, idx) => (
                <div
                  key={idx}
                  className="bg-cream-bg rounded-2xl p-5 border border-amber-200/80 hover:border-amber-400 transition-all flex flex-col justify-between shadow-xs hover:shadow-sm"
                >
                  <div>
                    <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 bg-white border border-soft-beige/70">
                      <img
                        src={soap.image}
                        alt={soap.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-white px-2.5 py-1 rounded-full border border-amber-200 inline-block mb-2">
                      {soap.tag}
                    </span>
                    <h3 className="font-display text-lg text-primary mb-1.5 font-bold">
                      {soap.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {soap.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-200/50 flex items-center text-[10px] font-semibold text-emerald-700 gap-1">
                    <Check size={12} /> Pure Cold-Process Soap
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Your Box Includes - Detailed 4 Items Grid */}
      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-[700px] mx-auto mb-14">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200">
              Complete Package
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-primary mt-4 mb-3">
              Everything Inside Your Box
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Curated with pure botanical care, handcrafted in Gurugram, and packaged ready to celebrate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Item 1 */}
            <div className="bg-white rounded-2xl p-6 border border-soft-beige shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl mb-4">
                  🧼
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 inline-block mb-2">
                  Handcrafted Soaps
                </span>
                <h3 className="font-display text-lg text-primary mb-2 font-bold">
                  2 Surprise Handcrafted Cold Process Soaps 🎉
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Two artisan spa bars handpicked from Earthy Turmeric, Lavender Calm, Neem Purify, or French Clay Detox. Cured for 4 weeks.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-soft-beige/60 text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5">
                <Check size={14} /> 100% Ayurvedic Purity
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-white rounded-2xl p-6 border border-soft-beige shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl mb-4">
                  🌿
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                  Exfoliating Bath Tool
                </span>
                <h3 className="font-display text-lg text-primary mb-2 font-bold">
                  Natural Loofah
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  100% natural, biodegradable plant-based loofah. Gently exfoliates dead skin cells and stimulates healthy circulation.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-soft-beige/60 text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5">
                <Check size={14} /> Zero Synthetic Plastics
              </div>
            </div>

            {/* Item 3 */}
            <div className="bg-white rounded-2xl p-6 border border-soft-beige shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-2xl mb-4">
                  🎁
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-800 bg-red-50 px-2.5 py-1 rounded-full border border-red-200 inline-block mb-2">
                  Luxury Packaging
                </span>
                <h3 className="font-display text-lg text-primary mb-2 font-bold">
                  Premium Keepsake Gift Box
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  High-durability rigid festive gift box featuring a rich red satin handle and eco-friendly crinkled paper cushioning.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-soft-beige/60 text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5">
                <Check size={14} /> Ready to Gift Immediately
              </div>
            </div>

            {/* Item 4 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/70 rounded-2xl p-6 border-2 border-amber-300 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl mb-4">
                  🪔
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-amber-700 px-2.5 py-1 rounded-full inline-block mb-2">
                  FREE Festive Gift
                </span>
                <h3 className="font-display text-lg text-primary mb-2 font-bold">
                  FREE: Motichoor Laddoo, Gujiya & Sutli Bomb Candles
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  3 handcrafted decorative candles made of 100% clean-burning wax. Festive nostalgia with zero toxic smoke or pollution.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-amber-200/80 text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles size={14} /> 3 Free Candles in Every Box
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk and Corporate Orders Section */}
      <section className="bg-cream-bg py-12 md:py-16 border-t border-soft-beige">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-amber-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 font-semibold">
                📦 Bulk & Corporate Gifting
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-primary font-bold">
                Bulk and corporate orders welcome
              </h3>
              <p className="text-xs md:text-sm text-on-surface-variant max-w-[550px] leading-relaxed">
                Looking for thoughtful corporate hampers, team appreciation packages, or bulk festive orders?
                <strong> DM us on Instagram @shrutibhyam</strong> or contact us via WhatsApp for customized cards and corporate pricing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://www.instagram.com/shrutibhyam/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white text-xs font-bold uppercase tracking-[0.14em] px-6 py-4 rounded-xl hover:bg-amber-900 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Instagram size={16} /> DM @shrutibhyam
              </a>
              <a
                href="https://wa.me/918884399876?text=Hi%20Shrutibhyam,%20I'm%20interested%20in%20bulk/corporate%20orders%20for%20the%20Diwali%20Gift%20Box!"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-700 text-white text-xs font-bold uppercase tracking-[0.14em] px-6 py-4 rounded-xl hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Products */}
      {otherProducts.length > 0 && (
        <section className="bg-surface py-16 border-t border-soft-beige">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-primary">
                Explore More Handcrafted Care
              </h2>
              <Link
                to="/shop"
                className="text-xs uppercase tracking-wider font-bold text-amber-800 hover:text-primary transition-colors flex items-center gap-1"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {otherProducts.map((p) => (
                <Link
                  key={p.slug}
                  to="/shop/$slug"
                  params={{ slug: p.slug }}
                  className="group bg-white rounded-2xl p-4 border border-soft-beige hover:border-amber-300 transition-all shadow-xs hover:shadow-md flex flex-col"
                >
                  <div className="aspect-square rounded-xl bg-cream-bg overflow-hidden mb-3 border border-soft-beige/50">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant">
                    {p.tag}
                  </span>
                  <h4 className="font-display text-sm text-primary group-hover:text-amber-800 transition-colors line-clamp-1 mt-0.5">
                    {p.name}
                  </h4>
                  <div className="mt-auto pt-2 font-display text-sm font-bold text-primary">
                    ₹{p.price.toLocaleString("en-IN")}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
