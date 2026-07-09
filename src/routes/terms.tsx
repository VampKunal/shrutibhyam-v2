import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { FileText } from "lucide-react";
import { CONTACT_INFO } from "@/constant";

export const Route = createFileRoute("/terms")({
 head: () => ({
 meta: [
 { title: "Terms of Service — Shrutibhyam Wellness" },
 { name: "description", content: "Review the terms and conditions for using our website and buying our wellness products." },
 ],
 }),
 component: TermsOfService,
});

function TermsOfService() {
 return (
 <SiteLayout>
 <section className="bg-cream-bg animate-fade-in">
 <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
 <div className="w-12 h-12 rounded-full bg-soft-beige flex items-center justify-center text-sage-green mx-auto mb-4">
 <FileText size={24} />
 </div>
 <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Terms of Service</h1>
 <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
 Please read these terms carefully before accessing or using our Ayurvedic wellness platform.
 </p>
 </div>
 </section>

 <section className="max-w-[800px] mx-auto px-4 md:px-6 py-16 space-y-10 animate-fade-in">
 <article className="space-y-4">
 <h2 className="font-display text-2xl text-primary">1. Agreement to Terms</h2>
 <p className="text-sm text-on-surface-variant leading-relaxed">
 By visiting our website, signing in, and purchasing products from Shrutibhyam, you agree to be bound by the following terms and conditions. These terms apply to all users of the site, including visitors, customers, and contributors of reviews.
 </p>
 </article>

 <article className="space-y-4">
 <h2 className="font-display text-2xl text-primary">2. Products & Pricing</h2>
 <p className="text-sm text-on-surface-variant leading-relaxed">
 Our offerings are artisanal, cold-processed soaps crafted with botanical ingredients and Ayurvedic principles.
 </p>
 <ul className="list-disc pl-5 text-sm text-on-surface-variant space-y-2">
 <li>We reserve the right to modify prices, descriptions, and packaging of our products at any time without prior notice.</li>
 <li>All prices listed on the shop page are in Indian Rupees (INR) and are inclusive of standard local taxes.</li>
 <li>Due to the natural, handcrafted nature of our soaps, slight variations in color, aroma, and shape are normal and a hallmark of purity.</li>
 </ul>
 </article>

 <article className="space-y-4">
 <h2 className="font-display text-2xl text-primary">3. User Conduct & Accounts</h2>
 <p className="text-sm text-on-surface-variant leading-relaxed">
 To leave reviews or proceed with a checkout, you must sign in securely via Google authentication. You agree to:
 </p>
 <ul className="list-disc pl-5 text-sm text-on-surface-variant space-y-2">
 <li>Provide accurate and complete email and display name details.</li>
 <li>Write reviews based on genuine experiences, refraining from offensive, defamatory, or duplicate commentary.</li>
 <li>Be responsible for maintaining the privacy and security of your sign-in session.</li>
 </ul>
 </article>

 <article className="space-y-4">
 <h2 className="font-display text-2xl text-primary">4. Shipping & Deliveries</h2>
 <p className="text-sm text-on-surface-variant leading-relaxed">
 We deliver across India. Orders are dispatched within 2-3 business days and usually reach clients within 5-7 business days. Shipping rates are calculated at checkout, with free delivery applied to all orders above the specified threshold in the site announcement bar.
 </p>
 </article>

 <article className="space-y-4 pt-8">
 <h2 className="font-display text-2xl text-primary">5. Contact Support</h2>
 <p className="text-sm text-on-surface-variant leading-relaxed">
 If you have questions regarding these terms, product usage, order issues, or wholesale inquiries, please reach out to our team:
 </p>
 <p className="text-sm text-primary font-semibold">
 Email: <a href={`mailto:${CONTACT_INFO.email}`} className="underline hover:text-sage-green transition-colors">{CONTACT_INFO.email}</a>
 </p>
 </article>
 </section>
 </SiteLayout>
 );
}
