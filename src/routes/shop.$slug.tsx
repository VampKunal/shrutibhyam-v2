import { createFileRoute, notFound, Link, useRouter, defer } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { SiteLayout } from "@/components/site/Layout";
import {
  Minus,
  Plus,
  ChevronDown,
  Edit3,
  Trash2,
  Loader2,
  MessageSquare,
  Check,
  X,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Upload,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { DiwaliProductView } from "@/components/site/DiwaliProductView";
import { getWooProductBySlug, getWooProducts } from "@/lib/api/woocommerce.functions";
import { getProductEnrichment, getSiteSettings } from "@/lib/api/sanity.functions";
import {
  DEFAULT_ACCORDIONS,
  PURITY,
  PRODUCT_STATS,
  CUSTOMER_STORIES,
  COMMON_ACCORDIONS,
} from "@/constant";
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "@/lib/api/comments.functions";
import { useAuth } from "@/context/AuthContext";
import { parseProductDescription } from "@/lib/woocommerce";
import { useWishlist } from "@/hooks/useWishlist";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { StarRating } from "@/components/ui/StarRating";
import { scrollContainerLeft, scrollContainerRight } from "@/lib/scroll";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/shop/$slug")({
  loader: async ({ params }) => {
    const slug = params.slug;

    const productPromise = getWooProductBySlug({ data: slug });
    const enrichmentPromise = getProductEnrichment({ data: slug });
    const commentsPromise = getComments({ data: slug });
    const allProductsPromise = getWooProducts();
    const siteSettingsPromise = getSiteSettings();

    // Only await the critical product data
    const product = await productPromise;

    if (!product) throw notFound();

    return { 
      product,
      deferredEnrichment: defer(enrichmentPromise.catch(() => null)),
      deferredComments: defer(commentsPromise.catch(() => [])),
      deferredProducts: defer(allProductsPromise.catch(() => [])),
      deferredSettings: defer(siteSettingsPromise.catch(() => null))
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} | Shrutibhyam` },
      {
        name: "description",
        content: `${loaderData?.product.name} — ${loaderData?.product.subtitle}. Handcrafted Ayurvedic skincare.`,
      },
      { property: "og:title", content: loaderData?.product.name },
      { property: "og:image", content: loaderData?.product.image },
    ],
    links: loaderData?.product.image ? [
      { rel: "preload", as: "image", href: loaderData.product.image, fetchPriority: "high" }
    ] : [],
  }),
  staleTime: 1000 * 60 * 5, // 5 minutes cache
  component: Product,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="max-w-[800px] mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-primary mb-4">Product not found</h1>
        <Link to="/shop" className="text-sage-green underline">
          Back to shop
        </Link>
      </div>
    </SiteLayout>
  ),
});

function Product() {
  const { product, deferredEnrichment, deferredComments, deferredProducts, deferredSettings } = Route.useLoaderData();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const { data: allProducts = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => deferredProducts,
    staleTime: 1000 * 60 * 10,
  });

  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", product.slug],
    queryFn: () => deferredComments,
    staleTime: 1000 * 60 * 5,
  });

  const { data: enrichment, isLoading: enrichmentLoading } = useQuery({
    queryKey: ["enrichment", product.slug],
    queryFn: () => deferredEnrichment,
    staleTime: 1000 * 60 * 5,
  });

  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: () => deferredSettings,
    staleTime: 1000 * 60 * 5,
  });

  if (product.slug === "diwali-gift-box") {
    return <DiwaliProductView product={product} allProducts={allProducts} />;
  }

  const similarProducts = allProducts.filter((p: any) => p.slug !== product.slug).slice(0, 4);

  const [qty, setQty] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("Benefits");
  const [activeImage, setActiveImage] = useState(product.image);
  const [showFullSubtitle, setShowFullSubtitle] = useState(false);
  const [bundleChecked, setBundleChecked] = useState(true);

  const storiesRef = useRef<HTMLDivElement>(null);
  const recommendedRef = useRef<HTMLDivElement>(null);

  const images =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image];

  // Calculate Discounts
  const discountPercent =
    product.onSale && product.regularPrice
      ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
      : 0;

  // Bundle logic
  const bundleProduct = similarProducts[0];
  const bundleTotal = bundleProduct ? product.price + bundleProduct.price : product.price;
  const bundleOriginalTotal =
    bundleProduct && bundleProduct.regularPrice && product.regularPrice
      ? product.regularPrice + bundleProduct.regularPrice
      : bundleTotal;
  const bundleSavings = bundleOriginalTotal - bundleTotal;

  useEffect(() => {
    setActiveImage(product.image);
  }, [product.slug]);

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    alert("Proceeding to checkout...");
  };

  const handleAddBundle = () => {
    addToCart(product, 1);
    if (bundleChecked && bundleProduct) addToCart(bundleProduct, 1);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.subtitle,
        url: window.location.href,
      });
    } catch (err) {
      // ignore
    }
  };

  const parsedContent = product.descriptionHtml
    ? parseProductDescription(product.descriptionHtml, product.name)
    : null;

  const getAccordions = () => {
    if (enrichment?.accordions && enrichment.accordions.length > 0) {
      return [...enrichment.accordions, ...COMMON_ACCORDIONS];
    }
    if (parsedContent && parsedContent.accordions.length > 0) {
      return [...parsedContent.accordions, ...COMMON_ACCORDIONS];
    }
    return DEFAULT_ACCORDIONS(product.name, product.tag || "Wellness");
  };

  const fullDescriptionHtml =
    product.descriptionHtml ||
    product.shortDescriptionHtml ||
    parsedContent?.description ||
    product.subtitle ||
    "A premium Ayurvedic ritual crafted with the purest botanical ingredients to restore and balance your skin's natural radiance.";
  const plainTextDescription = fullDescriptionHtml.replace(/<[^>]*>/g, "").trim();

  const details = {
    description: fullDescriptionHtml,
    purityTags: enrichment?.purityTags?.length
      ? enrichment.purityTags
      : product.categories && product.categories.length > 0
        ? product.categories
        : [product.tag || "Ayurvedic", "100% Vegan"],
    accordions: getAccordions(),
  };

  const truncatedSubtitle =
    plainTextDescription.length > 200
      ? plainTextDescription.slice(0, 200) + "..."
      : plainTextDescription;

  return (
    <SiteLayout>
      <section className="bg-surface py-8 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <Link
            to="/shop"
            className="text-xs uppercase tracking-[0.12em] text-on-surface-variant hover:text-primary mb-8 inline-block"
          >
            ← Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 h-full">
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0 md:h-[600px] md:w-24">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`shrink-0 w-20 h-20 md:w-full md:h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${activeImage === img ? "border-sage-green p-1" : "border-transparent hover:border-soft-beige"}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      className="w-full h-full object-contain rounded"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>

              <div className="relative flex-1 bg-cream-bg rounded-2xl overflow-hidden group border border-soft-beige md:h-[550px] md:w-[100px]">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-contain transition-opacity duration-300"
                  width={600}
                  height={800}
                  fetchPriority="high"
                />
                {discountPercent > 0 && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {discountPercent}% OFF
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col pt-2 md:pt-0">
              <div className="flex gap-2 flex-wrap mb-4">
                {details.purityTags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-[0.15em] bg-sage-green/10 text-sage-green px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-end gap-4 mb-6">
                <PriceDisplay
                  price={product.price}
                  regularPrice={product.regularPrice}
                  onSale={product.onSale}
                  variant="lg"
                />
                {product.onSale && product.regularPrice && product.regularPrice > product.price && (
                  <span className="text-sm font-bold text-sage-green mb-2">
                    (Save ₹{(product.regularPrice - product.price).toLocaleString("en-IN")})
                  </span>
                )}
              </div>

              <div className="mb-8">
                <div
                  className="text-sm text-on-surface-variant leading-relaxed mb-2"
                  dangerouslySetInnerHTML={{
                    __html: showFullSubtitle ? details.description : truncatedSubtitle,
                  }}
                />
                {details.description.length > 200 && (
                  <button
                    onClick={() => setShowFullSubtitle(!showFullSubtitle)}
                    className="text-xs font-bold uppercase tracking-wider text-sage-green hover:text-primary transition-colors cursor-pointer mb-4"
                  >
                    {showFullSubtitle ? "Read Less" : "Load More"}
                  </button>
                )}

                <div className="flex flex-wrap gap-3 mt-6">
                  {details.purityTags.slice(0, 5).map((label: string) => {
                    // Try to find matching icon in PURITY, otherwise use Check
                    const matchingIcon = PURITY.find(
                      (p) => p.label.toLowerCase() === label.toLowerCase(),
                    );
                    const Icon = matchingIcon ? matchingIcon.icon : Check;
                    return (
                      <div key={label} className="flex flex-col items-center gap-2 w-16">
                        <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-sage-green border border-soft-beige ">
                          <Icon size={18} strokeWidth={1.5} />
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-center text-primary leading-tight">
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-soft-beige shadow-sm space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-soft-beige rounded-lg overflow-hidden bg-surface">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="p-3 hover:bg-soft-beige/50 transition-colors text-primary cursor-pointer"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center text-sm font-bold">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="p-3 hover:bg-soft-beige/50 transition-colors text-primary cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium">
                    <span className="text-green-600 font-bold">In Stock</span> — Ready to ship
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-white text-sm font-bold uppercase tracking-wider py-4 rounded-lg hover:bg-sage-green transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-sage-green text-white text-sm font-bold uppercase tracking-wider py-4 rounded-lg hover:bg-primary transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="flex justify-between pt-4 border-t border-soft-beige">
                  <button
                    onClick={() => toggleWishlist(product.slug)}
                    className="flex items-center justify-center w-12 h-12 rounded-xl border border-soft-beige hover:bg-cream-bg text-primary hover:text-sage-green transition-colors cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={20}
                      className={isInWishlist(product.slug) ? "fill-red-500 text-red-500" : ""}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-primary">
                {enrichment?.estimatedDeliveryText && (
                  <div className="flex items-start gap-3 bg-soft-beige/30 p-3 rounded-lg">
                    <Truck className="text-sage-green shrink-0 mt-0.5" size={18} />
                    <div>
                      <span className="block font-bold mb-0.5">Estimated Delivery</span>
                      <span className="text-on-surface-variant">{enrichment.estimatedDeliveryText}</span>
                    </div>
                  </div>
                )}
                {enrichment?.returnPolicyText && (
                  <div className="flex items-start gap-3 bg-soft-beige/30 p-3 rounded-lg">
                    <RotateCcw className="text-sage-green shrink-0 mt-0.5" size={18} />
                    <div>
                      <span className="block font-bold mb-0.5">Return Policy</span>
                      <span className="text-on-surface-variant">{enrichment.returnPolicyText}</span>
                    </div>
                  </div>
                )}
                {enrichment?.secureCheckoutText && (
                  <div className="flex items-start gap-3 bg-soft-beige/30 p-3 rounded-lg col-span-2 justify-center">
                    <ShieldCheck className="text-sage-green shrink-0" size={18} />
                    <span className="font-bold mr-2">{enrichment.secureCheckoutText}</span>
                    <div className="flex gap-2">
                      <CreditCard size={18} className="text-on-surface-variant" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {productsLoading ? (
        <section className="bg-cream-bg py-16 border-y border-soft-beige">
          <div className="max-w-[1000px] mx-auto px-4 md:px-8">
            <div className="animate-pulse h-8 bg-soft-beige rounded w-64 mb-8"></div>
            <div className="animate-pulse h-48 bg-soft-beige rounded-2xl w-full"></div>
          </div>
        </section>
      ) : bundleProduct ? (
        <section className="bg-cream-bg py-16 border-y border-soft-beige">
          <div className="max-w-[1000px] mx-auto px-4 md:px-8">
            <h2 className="font-display text-3xl text-primary mb-8 text-center md:text-left">
              Frequently Bought Together
            </h2>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-soft-beige shadow-sm flex flex-col md:flex-row items-center gap-8">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-soft-beige shadow-sm mb-3 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                    <div className="absolute top-1 left-1 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                      This item
                    </div>
                  </div>
                  <span className="text-xs font-bold text-center w-24 truncate">
                    {product.name}
                  </span>
                </div>

                <Plus className="text-sage-green shrink-0" size={24} strokeWidth={3} />

                <div className="flex flex-col items-center opacity-100 transition-opacity">
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-soft-beige shadow-sm mb-3">
                    <img
                      src={bundleProduct.image}
                      alt={bundleProduct.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs font-bold text-center w-24 truncate">
                    {bundleProduct.name}
                  </span>
                </div>
              </div>

              <div className="flex-1 bg-surface rounded-xl p-6 border border-soft-beige w-full md:w-auto">
                <div className="space-y-4 mb-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="mt-1 w-4 h-4 text-sage-green bg-white border-soft-beige rounded focus:ring-sage-green"
                    />
                    <div>
                      <span className="text-sm font-bold block group-hover:text-sage-green transition-colors">
                        This item: {product.name}
                      </span>
                      <span className="text-xs font-semibold text-on-surface-variant">
                        ₹{product.price}
                      </span>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={bundleChecked}
                      onChange={(e) => setBundleChecked(e.target.checked)}
                      className="mt-1 w-4 h-4 text-sage-green bg-white border-soft-beige rounded focus:ring-sage-green cursor-pointer"
                    />
                    <div className={bundleChecked ? "opacity-100" : "opacity-50"}>
                      <span className="text-sm font-bold block group-hover:text-sage-green transition-colors">
                        {bundleProduct.name}
                      </span>
                      <span className="text-xs font-semibold text-on-surface-variant">
                        ₹{bundleProduct.price}
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t border-soft-beige/50">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-primary">Total Price:</span>
                    <span className="text-2xl font-display text-primary font-bold">
                      ₹{bundleChecked ? bundleTotal : product.price}
                    </span>
                  </div>
                  {bundleChecked && bundleSavings > 0 && (
                    <p className="text-xs font-bold text-green-600 text-right mb-4">
                      You save ₹{bundleSavings}!
                    </p>
                  )}
                  <button
                    onClick={handleAddBundle}
                    className="w-full bg-primary text-white text-xs font-bold uppercase tracking-wider py-4 rounded hover:bg-sage-green transition-all shadow-md cursor-pointer"
                  >
                    Add {bundleChecked ? "Bundle" : "Item"} to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <section>
          <h2 className="font-display text-3xl text-primary mb-8">Product Information</h2>
          <div className="border border-soft-beige rounded-2xl bg-white overflow-hidden shadow-sm">
            {details.accordions.map((a, idx) => (
              <div
                key={a.title}
                className={`${idx !== details.accordions.length - 1 ? "border-b border-soft-beige" : ""}`}
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === a.title ? null : a.title)}
                  className="w-full flex justify-between items-center py-5 px-6 text-left hover:bg-surface/50 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm uppercase tracking-wider text-primary">
                    {a.title}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-sage-green transition-transform duration-300 ${openAccordion === a.title ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openAccordion === a.title ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="p-6 pt-0 text-sm text-on-surface-variant leading-relaxed">
                    {a.body.startsWith("<") ? (
                      <div dangerouslySetInnerHTML={{ __html: a.body }} />
                    ) : (
                      <p>{a.body}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl text-primary mb-8">
            Results That Speak For Themselves
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(enrichment?.productStats?.length ? enrichment.productStats : PRODUCT_STATS).map(
              (stat: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-cream-bg rounded-2xl p-8 border border-soft-beige text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="block font-display text-5xl text-sage-green mb-4">
                    {stat.value}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wider text-primary leading-tight">
                    {stat.label}
                  </span>
                </div>
              ),
            )}
          </div>
          <div className="mt-8 bg-surface p-6 rounded-2xl border border-soft-beige">
            <p className="text-xs text-on-surface-variant italic text-center">
              *Based on an independent consumer testing panel of 50 participants over a 4-week
              period. Individual results may vary.
            </p>
          </div>
        </section>
      </div>

      <section className="py-12 bg-primary text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-display text-2xl md:text-3xl">Real Customer Stories</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollContainerLeft(storiesRef)}
                className="w-10 h-10 rounded-full border border-soft-beige flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-primary bg-white shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollContainerRight(storiesRef)}
                className="w-10 h-10 rounded-full border border-soft-beige flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-primary bg-white shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar" ref={storiesRef}>
            <div
              className={`flex gap-4 pb-4 snap-x snap-mandatory ${
                (enrichment?.customerStories?.length || CUSTOMER_STORIES.length) <= 4
                  ? "w-max mx-auto"
                  : "w-max"
              }`}
            >
              {(enrichment?.customerStories?.length
                ? enrichment.customerStories
                : CUSTOMER_STORIES
              ).map((story: any, idx: number) => (
                <div
                  key={idx}
                  className="snap-center shrink-0 w-[240px] md:w-[260px] h-[380px] bg-white text-primary rounded-xl overflow-hidden shadow-lg flex flex-col"
                >
                  <div className="h-[60%] relative overflow-hidden">
                    {story.videoUrl ? (
                      <video
                        src={story.videoUrl}
                        className="w-full h-full object-cover"
                        controls
                        muted
                        loop
                      />
                    ) : (
                      <img
                        src={story.image || story.imageUrl}
                        alt={story.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    )}

                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1">
                      <Check size={12} className="text-green-600" />
                      Verified Buyer
                    </div>
                  </div>

                  <div className="h-[40%] p-4 flex flex-col">
                    <StarRating rating={story.rating} size={12} colorClass="text-amber-500 mb-2" />

                    <p className="text-xs italic leading-relaxed line-clamp-3 flex-1">
                      "{story.text}"
                    </p>

                    <p className="mt-3 font-bold text-xs uppercase tracking-wider">{story.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. RECOMMENDED PRODUCTS */}
      <section className="py-20 bg-surface">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-display text-4xl text-primary text-center md:text-left">
              You May Also Like
            </h2>
            <div className="hidden md:flex gap-4">
              <button
                onClick={() => scrollContainerLeft(recommendedRef)}
                className="w-12 h-12 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-primary"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scrollContainerRight(recommendedRef)}
                className="w-12 h-12 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-primary"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar" ref={recommendedRef}>
            {productsLoading ? (
              <div className="flex gap-6 pb-6">
                 {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="animate-pulse shrink-0 w-[280px] md:w-[300px]">
                     <div className="aspect-[4/5] bg-soft-beige rounded-xl mb-4"></div>
                     <div className="h-6 bg-soft-beige rounded w-3/4 mb-2"></div>
                     <div className="h-5 bg-soft-beige rounded w-1/4"></div>
                   </div>
                 ))}
              </div>
            ) : (
              <div
                className={`flex gap-6 pb-6 snap-x snap-mandatory ${
                  similarProducts.length <= 4 ? "w-max mx-auto" : "w-max"
                }`}
              >
                {similarProducts.map((p: any) => (
                  <Link
                    key={p.slug}
                    to="/shop/$slug"
                    params={{ slug: p.slug }}
                    preload="intent"
                    className="snap-start shrink-0 w-[280px] md:w-[300px] group"
                  >
                    <div className="aspect-[4/5] relative overflow-hidden rounded-xl">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-wider text-primary z-20">
                        {p.tag}
                      </span>
                    </div>

                    <div className="pt-4">
                      <h3 className="font-semibold text-lg text-primary line-clamp-1">{p.name}</h3>

                      <div className="mt-2">
                        <PriceDisplay
                          price={p.price}
                          regularPrice={p.regularPrice}
                          onSale={p.onSale}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. CUSTOMER REVIEWS SECTION (With Image Upload) */}
      <ReviewsSection productSlug={product.slug} comments={comments} isLoading={commentsLoading} />
    </SiteLayout>
  );
}

// ============================================================================
// REVIEWS SECTION COMPONENT
// ============================================================================

interface ReviewsSectionProps {
  productSlug: string;
  comments: any[];
  isLoading?: boolean;
}

function ReviewsSection({ productSlug, comments, isLoading }: ReviewsSectionProps) {
  const { user, setLoginOpen } = useAuth();
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Edit review state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [editingRating, setEditingRating] = useState(5);

  if (isLoading) {
    return (
      <section className="bg-cream-bg py-16 border-t border-soft-beige">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h2 className="font-display text-3xl text-primary mb-12 text-center">Customer Reviews</h2>
          <div className="animate-pulse space-y-4 max-w-4xl mx-auto">
             <div className="h-32 bg-soft-beige rounded-xl"></div>
             <div className="h-32 bg-soft-beige rounded-xl"></div>
             <div className="h-32 bg-soft-beige rounded-xl"></div>
          </div>
        </div>
      </section>
    );
  }

  const reviewCount = comments.length;
  const averageRating =
    reviewCount > 0
      ? parseFloat((comments.reduce((sum, c) => sum + c.rating, 0) / reviewCount).toFixed(1))
      : 5.0;

  const hasAlreadyReviewed = user && comments.some((c) => c.userId === user.id);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("Image must be smaller than 5MB");
        return;
      }
      setReviewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setReviewImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!commentText.trim()) {
      setSubmitError("Review content cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Note: Real implementation would handle `reviewImage` upload to cloud storage here
      // and append the resulting URL to the comment payload.
      // Assuming addComment API accepts imageUrl in payload.
      const mockImageUrl = previewUrl ? "https://example.com/mock-upload.webp" : undefined;

      await addComment({
        data: {
          productSlug,
          rating,
          comment: commentText,
          imageUrl: mockImageUrl, // Theoretical extension to API
          user: { id: user.id, email: user.email, displayName: user.displayName },
        } as any,
      });
      setCommentText("");
      setRating(5);
      clearImage();
      router.invalidate();
    } catch (err: any) {
      setSubmitError(err?.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (c: any) => {
    setEditingId(c.id);
    setEditingText(c.comment);
    setEditingRating(c.rating);
  };

  const handleSaveEdit = async (id: string) => {
    if (!user || !editingText.trim()) return;
    try {
      await updateComment({
        data: { commentId: id, userId: user.id, rating: editingRating, comment: editingText },
      });
      setEditingId(null);
      router.invalidate();
    } catch (err) {
      console.error("Failed to edit review:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete your review?")) return;
    try {
      await deleteComment({ data: { commentId: id, userId: user.id } });
      router.invalidate();
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  return (
    <section className="py-20 bg-white border-t border-soft-beige">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Write a Review Form */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-cream-bg rounded-3xl p-8 border border-soft-beige text-center">
              <div className="flex justify-center items-baseline gap-2 mb-4">
                <span className="text-6xl font-display text-primary">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-xl text-on-surface-variant">/ 5</span>
              </div>
              <div className="flex justify-center mb-2">
                <StarRating rating={averageRating} size={24} colorClass="text-amber-500" />
              </div>
              <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
                Based on {reviewCount} Reviews
              </p>
            </div>

            {!user ? (
              <div className="bg-surface rounded-3xl p-8 border border-soft-beige text-center">
                <h3 className="font-display text-2xl text-primary mb-4">Share Your Experience</h3>
                <p className="text-sm text-on-surface-variant mb-6">
                  Log in to leave a review and share photos of your results.
                </p>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="w-full bg-primary text-white text-xs font-bold uppercase tracking-wider py-4 rounded hover:bg-sage-green transition-colors cursor-pointer"
                >
                  Log In to Review
                </button>
              </div>
            ) : hasAlreadyReviewed ? (
              <div className="bg-surface rounded-3xl p-8 border border-soft-beige text-center">
                <Check className="mx-auto text-sage-green mb-4" size={32} strokeWidth={2} />
                <h3 className="font-display text-2xl text-primary mb-2">Thank You!</h3>
                <p className="text-sm text-on-surface-variant">
                  You've already reviewed this product. Your feedback helps our community.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 border border-soft-beige shadow-xl shadow-soft-beige/50"
              >
                <h3 className="font-display text-2xl text-primary mb-6">Write a Review</h3>

                <div className="mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary block mb-3">
                    Overall Rating
                  </label>
                  <StarRating
                    rating={rating}
                    size={28}
                    colorClass="text-amber-500"
                    interactive
                    onChange={setRating}
                    hoverRating={hoverRating}
                    onHoverChange={setHoverRating}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="review"
                    className="text-xs font-bold uppercase tracking-wider text-primary block mb-3"
                  >
                    Your Experience
                  </label>
                  <textarea
                    id="review"
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="How did this product work for you?"
                    className="w-full bg-surface border-2 border-soft-beige rounded-xl p-4 text-sm focus:outline-none focus:border-sage-green transition-colors resize-none"
                  />
                </div>

                <div className="mb-8">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary block mb-3">
                    Upload Photo (Optional)
                  </label>
                  {!previewUrl ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-soft-beige border-dashed rounded-xl cursor-pointer hover:bg-surface transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="text-sage-green mb-2" size={24} />
                        <p className="text-xs text-on-surface-variant font-medium">
                          Click to upload image
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  ) : (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-sage-green">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 cursor-pointer shadow-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {submitError && (
                  <p className="text-xs text-red-600 font-bold mb-4">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-sage-green transition-colors cursor-pointer disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Publish Review"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-7">
            {reviewCount === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center bg-surface rounded-3xl border border-soft-beige">
                <MessageSquare className="text-soft-beige mb-4" size={48} />
                <h4 className="font-display text-2xl text-primary mb-2">No Reviews Yet</h4>
                <p className="text-sm text-on-surface-variant max-w-sm">
                  Be the first to review this product and help others make an informed decision.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {comments.map((c) => {
                  const isAuthor = user && (user.id === c.userId || user.email === c.userEmail);
                  const isEditing = editingId === c.id;

                  return (
                    <div
                      key={c.id}
                      className="bg-white border-b border-soft-beige pb-6 last:border-0"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 bg-cream-bg rounded-full flex items-center justify-center text-lg font-display text-sage-green">
                            {c.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-sm text-primary">{c.userName}</span>
                              {c.userId > 100 && c.userId <= 106 && (
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-sage-green text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <Check size={10} /> Verified
                                </span>
                              )}
                            </div>
                            <StarRating rating={c.rating} size={12} colorClass="text-amber-500" />
                          </div>
                        </div>
                        <span className="text-xs text-on-surface-variant font-medium">
                          {new Date(c.date).toLocaleDateString("en-IN", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {isEditing ? (
                        <div className="bg-surface p-4 rounded-xl space-y-4">
                          <textarea
                            rows={3}
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full text-sm bg-white border border-soft-beige rounded-lg p-3 focus:outline-none focus:border-sage-green"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-4 py-2 bg-white border border-soft-beige text-xs font-bold rounded hover:bg-soft-beige"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(c.id)}
                              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded hover:bg-sage-green"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-on-surface-variant leading-relaxed font-medium mb-4">
                            "{c.comment}"
                          </p>

                          {/* Display mock image if API supported it */}
                          {c.imageUrl && (
                            <img
                              src={c.imageUrl}
                              alt="Review"
                              className="w-32 h-32 object-cover rounded-lg mb-4 border border-soft-beige"
                            />
                          )}

                          {isAuthor && (
                            <div className="flex gap-4">
                              <button
                                onClick={() => handleStartEdit(c)}
                                className="text-xs font-bold uppercase tracking-wider text-sage-green hover:text-primary transition-colors flex items-center gap-1"
                              >
                                <Edit3 size={14} /> Edit
                              </button>
                              <button
                                onClick={() => handleDelete(c.id)}
                                className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
