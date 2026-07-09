import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Shield } from "lucide-react";
import { CONTACT_INFO } from "@/constant";

export const Route = createFileRoute("/privacy")({
 head: () => ({
 meta: [
 { title: "Privacy Policy — Shrutibhyam Wellness" },
 { name: "description", content: "Learn how we handle your personal data and respect your privacy." },
 ],
 }),
 component: PrivacyPolicy,
});

function PrivacyPolicy() {
 return (
 <SiteLayout>
 <section className="bg-cream-bg animate-fade-in">
 <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
 <div className="w-12 h-12 rounded-full bg-soft-beige flex items-center justify-center text-sage-green mx-auto mb-4">
 <Shield size={24} />
 </div>
 <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Privacy Policy</h1>
 <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
 Your trust is our foundation. Learn about how we handle and protect your personal information.
 </p>
 </div>
 </section>

 <section className="max-w-[800px] mx-auto px-4 md:px-6 py-16 space-y-10 animate-fade-in">
 <article className="space-y-4">
 <h2 className="font-display text-2xl text-primary">1. Information We Collect</h2>
 <p className="text-sm text-on-surface-variant leading-relaxed">
 We collect personal data to process your orders, improve your wellness experience, and authenticate your account. This includes:
 </p>
 <ul className="list-disc pl-5 text-sm text-on-surface-variant space-y-2">
 <li><strong>Identity & Account Data:</strong> Your name, email address, and profile details provided during Google Sign-In.</li>
 <li><strong>Transactional Data:</strong> Delivery addresses, billing information, phone numbers, and order history processed via WooCommerce.</li>
 <li><strong>Preferences & Feedback:</strong> Wishlist items, comments, ratings, and reviews submitted on our product pages.</li>
 </ul>
 </article>

 <article className="space-y-4">
 <h2 className="font-display text-2xl text-primary">2. Cookies & Local Storage</h2>
 <p className="text-sm text-on-surface-variant leading-relaxed">
 We use essential cookies to maintain your authenticated session. A secure, HTTP-only cookie containing your WordPress JWT token (<code className="bg-soft-beige px-1.5 py-0.5 rounded text-xs text-primary font-mono">wp_jwt_token</code>) is stored in your browser upon sign-in to securely manage orders and personal comments.
 </p>
 </article>

 <article className="space-y-4">
 <h2 className="font-display text-2xl text-primary">3. How We Use Your Data</h2>
 <p className="text-sm text-on-surface-variant leading-relaxed">
 Your information is used solely to:
 </p>
 <ul className="list-disc pl-5 text-sm text-on-surface-variant space-y-2">
 <li>Process and ship your orders of cold-pressed Ayurvedic soaps.</li>
 <li>Enable you to write, edit, and delete product reviews.</li>
 <li>Manage your personal wishlist and order dashboard.</li>
 <li>Improve the functionality and aesthetics of the Shrutibhyam platform.</li>
 </ul>
 </article>

 <article className="space-y-4">
 <h2 className="font-display text-2xl text-primary">4. Data Sharing & Security</h2>
 <p className="text-sm text-on-surface-variant leading-relaxed">
 We do not sell, trade, or rent your personal information to third parties. We employ industrial-grade security measures to safeguard transaction data and verify Google account credentials directly through secure token exchange.
 </p>
 </article>

 <article className="space-y-4 pt-8">
 <h2 className="font-display text-2xl text-primary">5. Contact Us</h2>
 <p className="text-sm text-on-surface-variant leading-relaxed">
 If you have questions about our privacy practices, wish to update your details, or want to request data deletion, contact us at:
 </p>
 <p className="text-sm text-primary font-semibold">
 Email: <a href={`mailto:${CONTACT_INFO.email}`} className="underline hover:text-sage-green transition-colors">{CONTACT_INFO.email}</a>
 </p>
 </article>
 </section>
 </SiteLayout>
 );
}
