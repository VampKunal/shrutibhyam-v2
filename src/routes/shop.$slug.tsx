import { createFileRoute, notFound, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Minus, Plus, ChevronDown, Star, StarHalf, Edit3, Trash2, Loader2, MessageSquare, Check, X, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getWooProductBySlug, getWooProducts } from "@/lib/api/woocommerce.functions";
import { PRODUCT_DETAILS, DEFAULT_ACCORDIONS, PURITY } from "@/constant";
import { getComments, addComment, updateComment, deleteComment } from "@/lib/api/comments.functions";
import { useAuth } from "@/context/AuthContext";
import { parseProductDescription } from "@/lib/woocommerce";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/lib/api/wishlist.functions";

export const Route = createFileRoute("/shop/$slug")({
  loader: async ({ params }) => {
    const product = await getWooProductBySlug({ data: params.slug });
    if (!product) throw notFound();

    const allProducts = await getWooProducts();
    const similarProducts = allProducts.filter((p) => p.slug !== params.slug).slice(0, 3);

    // Fetch comments on the server for initial render
    const comments = await getComments({ data: params.slug });

    return { product, similarProducts, comments };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} — Shrutibhyam` },
      { name: "description", content: `${loaderData?.product.name} — ${loaderData?.product.subtitle}. Handcrafted Ayurvedic skincare.` },
      { property: "og:title", content: loaderData?.product.name },
      { property: "og:image", content: loaderData?.product.image },
    ],
  }),
  staleTime: 1000 * 60 * 5, // 5 minutes cache
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

function Product() {
  const { product, similarProducts, comments } = Route.useLoaderData();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>("Ingredients");
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (user) {
      getWishlist({ data: user.id })
        .then((slugs) => {
          setIsInWishlist(slugs.includes(product.slug));
        })
        .catch(console.error);
    } else {
      setIsInWishlist(false);
    }
  }, [user, product.slug]);

  const handleToggleWishlist = async () => {
    if (!user) {
      alert("Please log in using the profile icon at the top right to manage your wishlist.");
      return;
    }
    try {
      if (isInWishlist) {
        await removeFromWishlist({ data: { userId: user.id, productSlug: product.slug } });
        setIsInWishlist(false);
      } else {
        await addToWishlist({ data: { userId: user.id, productSlug: product.slug } });
        setIsInWishlist(true);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  const parsedContent = product.descriptionHtml
    ? parseProductDescription(product.descriptionHtml, product.name)
    : null;

  const details = {
    description: parsedContent?.description || PRODUCT_DETAILS[product.slug]?.description || product.subtitle || "A premium Ayurvedic ritual crafted with the purest botanical ingredients to restore and balance your skin's natural radiance.",
    purityTags: PRODUCT_DETAILS[product.slug]?.purityTags || [product.tag || "Ayurvedic", "100% Vegan"],
    accordions: parsedContent && parsedContent.accordions.length > 0
      ? parsedContent.accordions
      : (PRODUCT_DETAILS[product.slug]?.accordions || DEFAULT_ACCORDIONS(product.name, product.tag || "Wellness"))
  };

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
              {details.purityTags.map((tag) => (
                <span key={tag} className="text-[10px] font-semibold uppercase tracking-[0.15em] bg-soft-beige px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">{product.name}</h1>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-display text-primary">₹{product.price.toLocaleString("en-IN")}</span>
              {product.onSale && product.regularPrice && product.regularPrice > product.price && (
                <span className="text-base text-on-surface-variant/50 line-through">₹{product.regularPrice.toLocaleString("en-IN")}</span>
              )}
            </div>
            {details.description.startsWith("<") ? (
              <div 
                className="text-base text-on-surface-variant leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: details.description }}
              />
            ) : (
              <p className="text-base text-on-surface-variant leading-relaxed">
                {details.description}
              </p>
            )}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-primary">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-soft-beige"><Minus size={14} /></button>
                <span className="px-5 text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-soft-beige"><Plus size={14} /></button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] py-4 hover:bg-surface-tint transition-colors cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className="p-4 border border-primary hover:bg-soft-beige transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                aria-label="Toggle Wishlist"
              >
                <Heart size={18} className={isInWishlist ? "fill-red-500 text-red-500" : "text-primary"} />
              </button>
            </div>
            <div className="border-t border-soft-beige pt-4">
              {details.accordions.map((a) => (
                <div key={a.title} className="border-b border-soft-beige">
                  <button onClick={() => setOpen(open === a.title ? null : a.title)} className="w-full flex justify-between items-center py-4 text-left">
                    <span className="font-display text-lg text-primary">{a.title}</span>
                    <ChevronDown size={18} className={`transition-transform ${open === a.title ? "rotate-180" : ""}`} />
                  </button>
                  {open === a.title && (
                    a.body.startsWith("<") ? (
                      <div 
                        className="text-sm text-on-surface-variant pb-4 leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
                        dangerouslySetInnerHTML={{ __html: a.body }}
                      />
                    ) : (
                      <p className="text-sm text-on-surface-variant pb-4 leading-relaxed">{a.body}</p>
                    )
                  )}
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
        <ReviewsSection productSlug={product.slug} comments={comments} />

        {/* Similar Products */}
        <section className="mt-20 border-t border-soft-beige pt-16">
          <h2 className="font-display text-3xl text-primary text-center mb-8">Similar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProducts.map((p) => (
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
        </section>
      </div>
    </SiteLayout>
  );
}

interface ReviewsSectionProps {
  productSlug: string;
  comments: any[];
}

function ReviewsSection({ productSlug, comments }: ReviewsSectionProps) {
  const { user, setLoginOpen } = useAuth();
  const router = useRouter();
  
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Edit review state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [editingRating, setEditingRating] = useState(5);
  const [editingHover, setEditingHover] = useState<number | null>(null);

  // Calculate average rating
  const reviewCount = comments.length;
  const averageRating = reviewCount > 0 
    ? parseFloat((comments.reduce((sum, c) => sum + c.rating, 0) / reviewCount).toFixed(1))
    : 5;

  // Check if current user has already submitted a review
  const hasAlreadyReviewed = user && comments.some((c) => c.userId === user.id);

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
      await addComment({
        data: {
          productSlug,
          rating,
          comment: commentText,
          user: {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
          }
        }
      });
      setCommentText("");
      setRating(5);
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

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
    setEditingRating(5);
  };

  const handleSaveEdit = async (id: string) => {
    if (!user) return;
    if (!editingText.trim()) return;

    try {
      await updateComment({
        data: {
          commentId: id,
          userId: user.id,
          rating: editingRating,
          comment: editingText,
        }
      });
      setEditingId(null);
      router.invalidate();
    } catch (err) {
      console.error("Failed to edit review:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete your review? This action cannot be undone.")) return;

    try {
      await deleteComment({
        data: {
          commentId: id,
          userId: user.id
        }
      });
      router.invalidate();
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  return (
    <section className="mt-20">
      <div className="border-t border-soft-beige pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Reviews Summary */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="font-display text-3xl text-primary">Customer Reviews</h2>
            <div className="bg-cream-bg border border-soft-beige rounded-xl p-6 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-display text-primary font-bold">{averageRating}</span>
                <span className="text-sm text-on-surface-variant font-medium">/ 5.0</span>
              </div>
              
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => {
                  const starVal = i + 1;
                  if (averageRating >= starVal) {
                    return <Star key={i} size={18} fill="currentColor" className="text-amber-500" strokeWidth={0} />;
                  } else if (averageRating > i && averageRating < starVal) {
                    return <StarHalf key={i} size={18} fill="currentColor" className="text-amber-500" strokeWidth={0} />;
                  } else {
                    return <Star key={i} size={18} className="text-on-surface-variant/20" strokeWidth={1.5} />;
                  }
                })}
              </div>
              
              <p className="text-xs text-on-surface-variant font-medium tracking-wide">
                Based on {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
              </p>
            </div>

            {/* Write a review login block or form */}
            {!user ? (
              <div className="bg-soft-beige/40 border border-soft-beige/80 rounded-xl p-6 text-center space-y-4">
                <MessageSquare className="mx-auto text-sage-green" size={28} strokeWidth={1.5} />
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Have you experienced this Ayurvedic ritual? Share your thoughts with the community.
                </p>
                <div className="inline-block">
                  <p
                    onClick={() => setLoginOpen(true)}
                    className="text-xs text-primary font-semibold uppercase tracking-wider bg-primary text-white hover:bg-sage-green px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-xs"
                  >
                    Please Log In to Review
                  </p>
                </div>
              </div>
            ) : hasAlreadyReviewed ? (
              <div className="bg-soft-beige/40 border border-soft-beige/80 rounded-xl p-6 text-center space-y-3">
                <Check className="mx-auto text-sage-green" size={24} strokeWidth={2} />
                <h3 className="font-display text-base text-primary font-semibold">Review Submitted</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  You have already reviewed this product. You can update or delete your review in the list below.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-cream-bg border border-soft-beige rounded-xl p-6 space-y-4">
                <h3 className="font-display text-lg text-primary font-semibold">Write a Review</h3>
                
                {/* Rating selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Rating</label>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const starVal = i + 1;
                      const active = hoverRating !== null ? hoverRating >= starVal : rating >= starVal;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRating(starVal)}
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="focus:outline-hidden transition-scale hover:scale-110 cursor-pointer animate-fade-in"
                        >
                          <Star
                            size={20}
                            fill={active ? "currentColor" : "none"}
                            className={active ? "text-amber-500" : "text-on-surface-variant/30"}
                            strokeWidth={active ? 0 : 1.5}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-1.5">
                  <label htmlFor="review-text" className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Review Details</label>
                  <textarea
                    id="review-text"
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share details about the scent, lather, and how it feels on your skin..."
                    className="w-full text-sm bg-white border border-soft-beige rounded-lg p-3 text-primary focus:outline-hidden focus:border-sage-green focus:ring-1 focus:ring-sage-green transition-all resize-none"
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-red-600 font-medium">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white hover:bg-sage-green hover:shadow-md active:bg-primary py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Review</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-display text-xl text-primary font-semibold">
              Reviews ({reviewCount})
            </h3>
            
            {reviewCount === 0 ? (
              <div className="bg-cream-bg/40 border border-soft-beige border-dashed rounded-xl p-12 text-center text-on-surface-variant">
                <p className="text-sm italic">No reviews yet for this product. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {comments.map((c) => {
                  const isAuthor = user && user.id === c.userId;
                  const isEditing = editingId === c.id;

                  return (
                    <div key={c.id} className="bg-cream-bg border border-soft-beige rounded-xl p-6 space-y-4 shadow-2xs hover:shadow-xs transition-shadow">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-primary">{c.userName}</span>
                            {c.userId > 100 && c.userId <= 106 && (
                              <span className="text-[9px] font-bold uppercase tracking-wider bg-sage-green/10 text-sage-green px-2 py-0.5 rounded-full">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-on-surface-variant/70">
                            {new Date(c.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })}
                          </span>
                        </div>

                        {/* Stars */}
                        {!isEditing && (
                          <div className="flex text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                fill={i < c.rating ? "currentColor" : "none"}
                                className={i < c.rating ? "text-amber-500" : "text-on-surface-variant/20"}
                                strokeWidth={i < c.rating ? 0 : 1.5}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="space-y-4 pt-2">
                          {/* Editing Stars */}
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">Edit Rating</span>
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => {
                                const starVal = i + 1;
                                const active = editingHover !== null ? editingHover >= starVal : editingRating >= starVal;
                                return (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => setEditingRating(starVal)}
                                    onMouseEnter={() => setEditingHover(starVal)}
                                    onMouseLeave={() => setEditingHover(null)}
                                    className="focus:outline-hidden cursor-pointer"
                                  >
                                    <Star
                                      size={18}
                                      fill={active ? "currentColor" : "none"}
                                      className={active ? "text-amber-500" : "text-on-surface-variant/30"}
                                      strokeWidth={active ? 0 : 1.5}
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          
                          {/* Editing Textarea */}
                          <textarea
                            rows={3}
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full text-sm bg-white border border-soft-beige rounded-lg p-3 text-primary focus:outline-hidden focus:border-sage-green focus:ring-1 focus:ring-sage-green transition-all"
                          />
                          
                          {/* Edit Buttons */}
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-1.5 border border-soft-beige hover:bg-soft-beige/50 text-xs font-semibold rounded-md transition-colors flex items-center gap-1 cursor-pointer text-primary"
                            >
                              <X size={12} />
                              <span>Cancel</span>
                            </button>
                            <button
                              onClick={() => handleSaveEdit(c.id)}
                              disabled={!editingText.trim()}
                              className="px-4 py-1.5 bg-primary hover:bg-sage-green text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            >
                              <Check size={12} />
                              <span>Save</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="italic text-sm text-on-surface-variant leading-relaxed font-sans">
                            "{c.comment}"
                          </p>

                          {/* Author Actions */}
                          {isAuthor && (
                            <div className="flex justify-end gap-3 pt-2 border-t border-soft-beige/50">
                              <button
                                onClick={() => handleStartEdit(c)}
                                className="flex items-center gap-1 text-[11px] font-semibold text-sage-green hover:text-primary transition-colors cursor-pointer"
                              >
                                <Edit3 size={11} />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDelete(c.id)}
                                className="flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                              >
                                <Trash2 size={11} />
                                <span>Delete</span>
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
