import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { 
 User, 
 Mail, 
 ShoppingBag, 
 Heart, 
 MessageSquare, 
 Activity, 
 ChevronRight, 
 Star, 
 Clock, 
 Sparkles, 
 ArrowRight, 
 Check, 
 Edit3, 
 Trash2, 
 Loader2, 
 UserCheck, 
 MapPin, 
 Calendar 
} from "lucide-react";
import { getCommentsByUser, updateComment, deleteComment } from "@/lib/api/comments.functions";
import { getCustomerProfile, updateCustomerProfile, getCustomerOrders, getWooProducts } from "@/lib/api/woocommerce.functions";
import { getWishlist, removeFromWishlist } from "@/lib/api/wishlist.functions";

export const Route = createFileRoute("/dashboard")({
 validateSearch: (search: Record<string, unknown>) => {
 return {
 tab: (search.tab as string) || "profile"
 };
 },
 component: UserDashboard
});

type ActiveTab = "profile" | "orders" | "wishlist" | "comments";

function UserDashboard() {
 const { tab } = Route.useSearch();
 const { user, isLoading: isAuthLoading, refreshUser } = useAuth();
 const router = useRouter();
 const { addToCart } = useCart();

 const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
 const [userComments, setUserComments] = useState<any[]>([]);
 const [isCommentsLoading, setIsCommentsLoading] = useState(false);

 // WooCommerce Actual Orders
 const [orders, setOrders] = useState<any[]>([]);
 const [isOrdersLoading, setIsOrdersLoading] = useState(false);

 // WooCommerce/Database Actual Wishlist
 const [wishlist, setWishlist] = useState<any[]>([]);
 const [isWishlistLoading, setIsWishlistLoading] = useState(false);

 // Profile Form States
 const [displayName, setDisplayName] = useState("");
 const [phone, setPhone] = useState("");
 const [address, setAddress] = useState("");
 const [isProfileLoading, setIsProfileLoading] = useState(false);
 const [isSavingProfile, setIsSavingProfile] = useState(false);
 const [profileSuccess, setProfileSuccess] = useState(false);

 // Comment Editing States inside dashboard
 const [editingId, setEditingId] = useState<string | null>(null);
 const [editingText, setEditingText] = useState("");
 const [editingRating, setEditingRating] = useState(5);

 // Synchronize activeTab state with the search query param 'tab'
 useEffect(() => {
 if (tab && ["profile", "orders", "wishlist", "comments"].includes(tab)) {
 setActiveTab(tab as ActiveTab);
 }
 }, [tab]);

 // Load User Comments, Profile, Orders and Wishlist
 useEffect(() => {
 if (user) {
 setDisplayName(user.displayName);
 fetchComments();
 fetchProfile();
 fetchOrders();
 fetchWishlist();
 }
 }, [user]);

 const fetchComments = async () => {
 if (!user) return;
 setIsCommentsLoading(true);
 try {
 const data = await getCommentsByUser({ data: user.id });
 setUserComments(data);
 } catch (err) {
 console.error("Error fetching user comments:", err);
 } finally {
 setIsCommentsLoading(false);
 }
 };

 const fetchProfile = async () => {
 if (!user) return;
 setIsProfileLoading(true);
 try {
 const data = await getCustomerProfile({ data: user.id });
 if (data) {
 if (data.phone) setPhone(data.phone);
 if (data.address) setAddress(data.address);
 }
 } catch (err) {
 console.error("Error fetching customer profile:", err);
 } finally {
 setIsProfileLoading(false);
 }
 };

 const fetchOrders = async () => {
 if (!user) return;
 setIsOrdersLoading(true);
 try {
 const data = await getCustomerOrders({ data: user.id });
 setOrders(data || []);
 } catch (err) {
 console.error("Error fetching customer orders:", err);
 } finally {
 setIsOrdersLoading(false);
 }
 };

 const fetchWishlist = async () => {
 if (!user) return;
 setIsWishlistLoading(true);
 try {
 const slugs = await getWishlist({ data: user.id });
 const products = await getWooProducts();
 const filtered = products.filter(p => slugs.includes(p.slug));
 setWishlist(filtered);
 } catch (err) {
 console.error("Error fetching wishlist:", err);
 } finally {
 setIsWishlistLoading(false);
 }
 };

 const handleRemoveFromWishlist = async (productSlug: string) => {
 if (!user) return;
 try {
 await removeFromWishlist({
 data: {
 userId: user.id,
 productSlug,
 }
 });
 fetchWishlist();
 } catch (err) {
 console.error("Error removing item from wishlist:", err);
 }
 };

 if (isAuthLoading) {
 return (
 <SiteLayout>
 <div className="min-h-[60vh] flex flex-col items-center justify-center text-sage-green">
 <Loader2 className="animate-spin mb-4" size={40} />
 <span className="font-semibold tracking-wide">Securing connection...</span>
 </div>
 </SiteLayout>
 );
 }

 // Not Logged In screen
 if (!user) {
 return (
 <SiteLayout>
 <div className="max-w-[800px] mx-auto px-6 py-20 text-center space-y-8">
 <div className="w-20 h-20 rounded-full bg-soft-beige flex items-center justify-center text-sage-green mx-auto shadow-sm">
 <Sparkles size={36} className="animate-pulse" />
 </div>
 <div className="space-y-3">
 <h1 className="font-display text-4xl text-primary font-bold">Your Wellness Sanctuary</h1>
 <p className="text-on-surface-variant max-w-[450px] mx-auto leading-relaxed">
 Experience the customized Ayurvedic journey. Access order history, track deliveries, view reviews, and find your primary Dosha alignment.
 </p>
 </div>
 <div className="bg-cream-bg border border-soft-beige rounded-2xl p-8 max-w-[500px] mx-auto shadow-md">
 <p className="text-sm font-semibold text-primary mb-6 uppercase tracking-wider">
 Please sign in to view your dashboard
 </p>
 <div className="flex justify-center">
 {/* Inform user how to trigger the login modal */}
 <p className="text-xs text-on-surface-variant leading-relaxed">
 Click on the 👤 user icon at the top right of the page to login securely with Google.
 </p>
 </div>
 </div>
 </div>
 </SiteLayout>
 );
 }

 const initials = user.displayName
 ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
 : user.email.slice(0, 2).toUpperCase();

 // Profile Save Handler
 const handleSaveProfile = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!user) return;
 setIsSavingProfile(true);
 setProfileSuccess(false);
 try {
 await updateCustomerProfile({
 data: {
 userId: user.id,
 displayName,
 phone,
 address,
 }
 });
 await refreshUser();
 setProfileSuccess(true);
 setTimeout(() => setProfileSuccess(false), 3000);
 } catch (err) {
 console.error("Error saving profile details:", err);
 } finally {
 setIsSavingProfile(false);
 }
 };

 // Dashboard Comment Edit Handler
 const handleStartEdit = (c: any) => {
 setEditingId(c.id);
 setEditingText(c.comment);
 setEditingRating(c.rating);
 };

 const handleSaveEdit = async (id: string) => {
 if (!user) return;
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
 fetchComments();
 } catch (err) {
 console.error(err);
 }
 };

 const handleDeleteComment = async (id: string) => {
 if (!user) return;
 if (!window.confirm("Are you sure you want to delete this review?")) return;

 try {
 await deleteComment({
 data: {
 commentId: id,
 userId: user.id
 }
 });
 fetchComments();
 } catch (err) {
 console.error(err);
 }
 };



 return (
 <SiteLayout>
 <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12">
 {/* Welcome Banner */}
 <div className="bg-cream-bg border border-soft-beige rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm justify-between">
 <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
 <div className="h-20 w-20 bg-soft-beige text-primary font-bold text-2xl flex items-center justify-center rounded-2xl border border-sage-green/20 shadow-xs uppercase">
 {initials}
 </div>
 <div className="space-y-1.5">
 <div className="flex items-center gap-2 justify-center md:justify-start">
 <h1 className="font-display text-2xl md:text-3xl text-primary font-bold">{user.displayName}</h1>
 <span className="bg-sage-green/10 text-sage-green font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-sage-green/15 flex items-center gap-1">
 <UserCheck size={10} />
 <span>Verified Practitioner</span>
 </span>
 </div>
 <p className="text-xs text-on-surface-variant flex items-center gap-1.5 justify-center md:justify-start">
 <Mail size={12} />
 <span>{user.email}</span>
 </p>
 </div>
 </div>
 
 <div className="flex items-center gap-4 border-t md:border-t-0 border-soft-beige/80 pt-4 md:pt-0 w-full md:w-auto justify-around md:justify-end">
 <div className="text-center bg-white px-4 py-2 border border-soft-beige rounded-xl min-w-[90px]">
 <p className="text-xs font-semibold text-on-surface-variant tracking-wider uppercase">Reviews</p>
 <p className="text-xl font-bold text-primary font-display mt-0.5">{userComments.length}</p>
 </div>
 <div className="text-center bg-white px-4 py-2 border border-soft-beige rounded-xl min-w-[90px]">
 <p className="text-xs font-semibold text-on-surface-variant tracking-wider uppercase">Orders</p>
 <p className="text-xl font-bold text-primary font-display mt-0.5">{isOrdersLoading ? "..." : orders.length}</p>
 </div>
 </div>
 </div>

 {/* Layout Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12 items-start">
 {/* Left Navigation Menu */}
 <div className="lg:col-span-1 bg-cream-bg border border-soft-beige rounded-2xl p-4 space-y-1">
 <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 px-3 mb-2">My Sanctuary</p>
 <button
 onClick={() => setActiveTab("profile")}
 className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
 activeTab === "profile" 
 ? "bg-primary text-white shadow-xs" 
 : "text-primary hover:bg-soft-beige/60 hover:text-sage-green"
 }`}
 >
 <div className="flex items-center gap-2">
 <User size={15} />
 <span>Profile Settings</span>
 </div>
 <ChevronRight size={14} className={activeTab === "profile" ? "opacity-100" : "opacity-30"} />
 </button>

 <button
 onClick={() => setActiveTab("orders")}
 className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
 activeTab === "orders" 
 ? "bg-primary text-white shadow-xs" 
 : "text-primary hover:bg-soft-beige/60 hover:text-sage-green"
 }`}
 >
 <div className="flex items-center gap-2">
 <ShoppingBag size={15} />
 <span>Order History</span>
 </div>
 <ChevronRight size={14} className={activeTab === "orders" ? "opacity-100" : "opacity-30"} />
 </button>

 <button
 onClick={() => setActiveTab("wishlist")}
 className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
 activeTab === "wishlist" 
 ? "bg-primary text-white shadow-xs" 
 : "text-primary hover:bg-soft-beige/60 hover:text-sage-green"
 }`}
 >
 <div className="flex items-center gap-2">
 <Heart size={15} />
 <span>My Wishlist</span>
 </div>
 <ChevronRight size={14} className={activeTab === "wishlist" ? "opacity-100" : "opacity-30"} />
 </button>

 <button
 onClick={() => setActiveTab("comments")}
 className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
 activeTab === "comments" 
 ? "bg-primary text-white shadow-xs" 
 : "text-primary hover:bg-soft-beige/60 hover:text-sage-green"
 }`}
 >
 <div className="flex items-center gap-2">
 <MessageSquare size={15} />
 <span>My Comments</span>
 </div>
 <ChevronRight size={14} className={activeTab === "comments" ? "opacity-100" : "opacity-30"} />
 </button>
 </div>

 {/* Right Main Content */}
 <div className="lg:col-span-3 min-h-[400px]">
 {/* PROFILE SETTINGS TAB */}
 {activeTab === "profile" && (
 <div className="bg-cream-bg border border-soft-beige rounded-2xl p-6 md:p-8 space-y-6">
 <div>
 <h2 className="font-display text-2xl text-primary font-bold">Profile Settings</h2>
 <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
 Update your account details and address configuration below.
 </p>
 </div>

 <form onSubmit={handleSaveProfile} className="space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-1.5">
 <label htmlFor="pf-name" className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Display Name</label>
 <input
 id="pf-name"
 type="text"
 value={displayName}
 onChange={(e) => setDisplayName(e.target.value)}
 className="w-full text-sm bg-white border border-soft-beige rounded-xl p-3 text-primary focus:outline-hidden focus:border-sage-green focus:ring-1 focus:ring-sage-green transition-all"
 required
 />
 </div>
 <div className="space-y-1.5">
 <label htmlFor="pf-email" className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Email Address</label>
 <input
 id="pf-email"
 type="email"
 value={user.email}
 disabled
 className="w-full text-sm bg-soft-beige/30 border border-soft-beige rounded-xl p-3 text-on-surface-variant/75 cursor-not-allowed"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-1.5">
 <label htmlFor="pf-phone" className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Phone Number</label>
 <input
 id="pf-phone"
 type="tel"
 value={phone}
 onChange={(e) => setPhone(e.target.value)}
 className="w-full text-sm bg-white border border-soft-beige rounded-xl p-3 text-primary focus:outline-hidden focus:border-sage-green focus:ring-1 focus:ring-sage-green transition-all"
 />
 </div>
 <div className="space-y-1.5">
 <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Practitioner Role</label>
 <input
 type="text"
 value="Ayurvedic Wellness Enthusiast"
 disabled
 className="w-full text-sm bg-soft-beige/30 border border-soft-beige rounded-xl p-3 text-on-surface-variant/75 cursor-not-allowed"
 />
 </div>
 </div>

 <div className="space-y-1.5">
 <label htmlFor="pf-addr" className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Shipping Address</label>
 <textarea
 id="pf-addr"
 rows={3}
 value={address}
 onChange={(e) => setAddress(e.target.value)}
 className="w-full text-sm bg-white border border-soft-beige rounded-xl p-3 text-primary focus:outline-hidden focus:border-sage-green focus:ring-1 focus:ring-sage-green transition-all resize-none"
 />
 </div>

 {profileSuccess && (
 <div className="p-3 bg-green-50 border border-green-200 text-sage-green text-xs font-semibold rounded-lg flex items-center gap-2">
 <Check size={16} />
 <span>Profile updated successfully!</span>
 </div>
 )}

 <button
 type="submit"
 disabled={isSavingProfile}
 className="bg-primary text-white hover:bg-sage-green hover:shadow-md py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
 >
 {isSavingProfile ? (
 <>
 <Loader2 size={14} className="animate-spin" />
 <span>Saving...</span>
 </>
 ) : (
 <span>Save Changes</span>
 )}
 </button>
 </form>
 </div>
 )}

 {/* ORDER HISTORY TAB */}
 {activeTab === "orders" && (
 <div className="space-y-6">
 <div>
 <h2 className="font-display text-2xl text-primary font-bold">Order History</h2>
 <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
 Track the fulfillment and transit details of your Ayurvedic purchases.
 </p>
 </div>

 {isOrdersLoading ? (
 <div className="flex items-center justify-center gap-2 text-sage-green py-12">
 <Loader2 className="animate-spin" size={24} />
 <span className="text-sm font-semibold">Retrieving your orders...</span>
 </div>
 ) : orders.length === 0 ? (
 <div className="text-center py-12 border border-dashed border-soft-beige rounded-xl bg-white/40 text-on-surface-variant/80">
 <ShoppingBag className="mx-auto text-on-surface-variant/30 mb-2" size={28} />
 <p className="text-sm italic">You haven't placed any orders yet.</p>
 </div>
 ) : (
 <div className="space-y-6">
 {orders.map((o) => (
 <div key={o.id} className="bg-cream-bg border border-soft-beige rounded-2xl p-6 space-y-6 shadow-2xs">
 {/* Header info */}
 <div className="flex flex-wrap justify-between items-center gap-4 pb-4 ">
 <div className="space-y-1">
 <p className="text-xs font-bold uppercase tracking-wider text-primary">{o.id}</p>
 <p className="text-[10px] text-on-surface-variant/80 flex items-center gap-1">
 <Calendar size={12} />
 <span>Ordered on {new Date(o.date).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
 </p>
 </div>
 <div className="flex items-center gap-4">
 <span className="text-sm font-bold text-primary font-display">Total: ₹{o.total.toLocaleString("en-IN")}</span>
 <span className={`text-[10px] font-bold uppercase tracking-wider border px-3 py-1 rounded-full ${o.statusColor}`}>
 {o.status}
 </span>
 </div>
 </div>

 {/* Items List */}
 <div className="space-y-4">
 {o.items.map((item: any, idx: number) => (
 <div key={idx} className="flex gap-4 items-center">
 <div className="h-14 w-14 rounded-lg bg-white border border-soft-beige/60 overflow-hidden shrink-0 flex items-center justify-center p-1">
 <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-md" />
 </div>
 <div className="flex-1">
 <p className="text-sm font-semibold text-primary">{item.name}</p>
 <p className="text-xs text-on-surface-variant font-medium mt-0.5">Quantity: {item.qty} | Price: ₹{item.price}</p>
 </div>
 </div>
 ))}
 </div>

 {/* Tracking / Stepper */}
 <div className="bg-white/60 border border-soft-beige/50 rounded-xl p-4 space-y-4">
 <div className="flex justify-between items-center flex-wrap gap-2 text-xs">
 <p className="text-on-surface-variant font-medium">Carrier: <span className="font-bold text-primary">{o.tracking.carrier}</span></p>
 <p className="text-on-surface-variant font-medium">Tracking: <span className="font-bold text-primary font-mono">{o.tracking.number}</span></p>
 </div>

 {/* Visual Stepper */}
 <div className="grid grid-cols-4 gap-2 pt-2 relative">
 {/* Progress Line */}
 <div className="absolute top-[9px] left-[12%] right-[12%] h-[2px] bg-soft-beige -z-1" />
 <div 
 className="absolute top-[9px] left-[12%] h-[2px] bg-sage-green -z-1 transition-all duration-500" 
 style={{ width: `${(o.tracking.step - 1) * 25.33}%` }}
 />

 <div className="text-center space-y-1">
 <div className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto text-[10px] font-bold ${
 o.tracking.step >= 1 ? "bg-sage-green text-white" : "bg-soft-beige text-on-surface-variant/40"
 }`}>
 {o.tracking.step > 1 ? <Check size={10} /> : "1"}
 </div>
 <span className={`text-[9px] font-bold uppercase tracking-wider block ${o.tracking.step >= 1 ? "text-primary" : "text-on-surface-variant/40"}`}>
 Confirmed
 </span>
 </div>

 <div className="text-center space-y-1">
 <div className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto text-[10px] font-bold ${
 o.tracking.step >= 2 ? "bg-sage-green text-white" : "bg-soft-beige text-on-surface-variant/40"
 }`}>
 {o.tracking.step > 2 ? <Check size={10} /> : "2"}
 </div>
 <span className={`text-[9px] font-bold uppercase tracking-wider block ${o.tracking.step >= 2 ? "text-primary" : "text-on-surface-variant/40"}`}>
 Processed
 </span>
 </div>

 <div className="text-center space-y-1">
 <div className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto text-[10px] font-bold ${
 o.tracking.step >= 3 ? "bg-sage-green text-white" : "bg-soft-beige text-on-surface-variant/40"
 }`}>
 {o.tracking.step > 3 ? <Check size={10} /> : "3"}
 </div>
 <span className={`text-[9px] font-bold uppercase tracking-wider block ${o.tracking.step >= 3 ? "text-primary" : "text-on-surface-variant/40"}`}>
 Shipped
 </span>
 </div>

 <div className="text-center space-y-1">
 <div className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto text-[10px] font-bold ${
 o.tracking.step >= 4 ? "bg-sage-green text-white" : "bg-soft-beige text-on-surface-variant/40"
 }`}>
 {o.tracking.step > 4 ? <Check size={10} /> : "4"}
 </div>
 <span className={`text-[9px] font-bold uppercase tracking-wider block ${o.tracking.step >= 4 ? "text-primary" : "text-on-surface-variant/40"}`}>
 Delivered
 </span>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 )}

 {/* MY WISHLIST TAB */}
 {activeTab === "wishlist" && (
 <div className="bg-cream-bg border border-soft-beige rounded-2xl p-6 md:p-8 space-y-6">
 <div>
 <h2 className="font-display text-2xl text-primary font-bold">My Wishlist</h2>
 <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
 Products you have bookmarked for your future self-care rituals.
 </p>
 </div>

 {isWishlistLoading ? (
 <div className="flex items-center justify-center gap-2 text-sage-green py-12">
 <Loader2 className="animate-spin" size={24} />
 <span className="text-sm font-semibold">Retrieving your wishlist...</span>
 </div>
 ) : wishlist.length === 0 ? (
 <div className="text-center py-12 border border-dashed border-soft-beige rounded-xl bg-white/40 text-on-surface-variant/80">
 <Heart className="mx-auto text-on-surface-variant/30 mb-2" size={28} />
 <p className="text-sm italic">Your wishlist is empty.</p>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {wishlist.map((p) => (
 <div key={p.slug} className="bg-white border border-soft-beige rounded-xl p-4 flex gap-4 items-center">
 <div className="h-16 w-16 bg-cream-bg border border-soft-beige rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
 <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
 </div>
 <div className="flex-1 space-y-1 min-w-0">
 <h3 className="text-sm font-semibold text-primary truncate">{p.name}</h3>
 <p className="text-[11px] text-on-surface-variant/80 truncate leading-relaxed">{p.subtitle}</p>
 <p className="text-xs font-bold text-primary font-display">₹{p.price}</p>
 </div>
 <div className="flex flex-col gap-2 shrink-0">
 <Link 
 to="/shop/$slug" 
 params={{ slug: p.slug }}
 className="bg-primary text-white hover:bg-sage-green py-1.5 px-3 text-center text-[10px] font-bold uppercase tracking-wider rounded-md transition-colors"
 >
 View
 </Link>
 <button 
 onClick={() => handleRemoveFromWishlist(p.slug)}
 className="text-red-600 hover:text-red-700 text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer transition-colors"
 >
 Remove
 </button>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 )}

 {/* COMMENTS & REVIEWS TAB */}
 {activeTab === "comments" && (
 <div className="bg-cream-bg border border-soft-beige rounded-2xl p-6 md:p-8 space-y-6">
 <div>
 <h2 className="font-display text-2xl text-primary font-bold">My Comments & Reviews</h2>
 <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
 View, modify, or remove product feedback you've shared with other practitioners.
 </p>
 </div>

 {isCommentsLoading ? (
 <div className="flex items-center justify-center gap-2 text-sage-green py-12">
 <Loader2 className="animate-spin" size={24} />
 <span className="text-sm font-semibold">Retrieving comment history...</span>
 </div>
 ) : userComments.length === 0 ? (
 <div className="text-center py-12 border border-dashed border-soft-beige rounded-xl bg-white/40 text-on-surface-variant/80">
 <MessageSquare className="mx-auto text-on-surface-variant/30 mb-2" size={28} />
 <p className="text-sm italic">You haven't written any product reviews yet.</p>
 </div>
 ) : (
 <div className="space-y-4">
 {userComments.map((c) => {
 const isEditing = editingId === c.id;
 // Generate pretty product name from slug
 const productName = c.productSlug
 .split("-")
 .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
 .join(" ");

 return (
 <div key={c.id} className="bg-white border border-soft-beige rounded-xl p-6 space-y-4">
 <div className="flex justify-between items-start gap-4">
 <div className="space-y-1">
 <Link 
 to="/shop/$slug" 
 params={{ slug: c.productSlug }} 
 className="text-sm font-bold text-primary hover:text-sage-green transition-colors"
 >
 {productName}
 </Link>
 <div className="text-[10px] text-on-surface-variant/75 flex items-center gap-2">
 <Clock size={11} />
 <span>{new Date(c.date).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
 </div>
 </div>
 
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
 <div className="space-y-3 pt-2">
 <div className="space-y-1">
 <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Edit Rating</label>
 <div className="flex gap-1">
 {Array.from({ length: 5 }).map((_, i) => {
 const starVal = i + 1;
 return (
 <button
 key={i}
 type="button"
 onClick={() => setEditingRating(starVal)}
 className="focus:outline-hidden cursor-pointer"
 >
 <Star
 size={16}
 fill={editingRating >= starVal ? "currentColor" : "none"}
 className={editingRating >= starVal ? "text-amber-500" : "text-on-surface-variant/30"}
 strokeWidth={editingRating >= starVal ? 0 : 1.5}
 />
 </button>
 );
 })}
 </div>
 </div>

 <textarea
 rows={2}
 value={editingText}
 onChange={(e) => setEditingText(e.target.value)}
 className="w-full text-sm bg-white border border-soft-beige rounded-lg p-2.5 text-primary focus:outline-hidden focus:border-sage-green focus:ring-1 focus:ring-sage-green transition-all"
 />

 <div className="flex justify-end gap-2 text-xs font-semibold">
 <button
 onClick={() => setEditingId(null)}
 className="px-3 py-1.5 border border-soft-beige rounded hover:bg-soft-beige/40 text-primary cursor-pointer"
 >
 Cancel
 </button>
 <button
 onClick={() => handleSaveEdit(c.id)}
 className="px-3 py-1.5 bg-primary text-white rounded hover:bg-sage-green cursor-pointer"
 >
 Save
 </button>
 </div>
 </div>
 ) : (
 <div className="space-y-3">
 <p className="italic text-sm text-on-surface-variant leading-relaxed">
 "{c.comment}"
 </p>
 
 <div className="flex justify-end gap-3 pt-2 ">
 <button
 onClick={() => handleStartEdit(c)}
 className="flex items-center gap-1 text-[11px] font-semibold text-sage-green hover:text-primary transition-colors cursor-pointer"
 >
 <Edit3 size={11} />
 <span>Edit Review</span>
 </button>
 <button
 onClick={() => handleDeleteComment(c.id)}
 className="flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
 >
 <Trash2 size={11} />
 <span>Delete</span>
 </button>
 </div>
 </div>
 )}
 </div>
 );
 })}
 </div>
 )}
 </div>
 )}


 </div>
 </div>
 </div>
 </SiteLayout>
 );
}
