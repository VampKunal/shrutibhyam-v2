import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ as CONSTANT_FAQS } from "@/constant";
import { SiteLayout } from "@/components/site/Layout";
import { getFaqs } from "@/lib/api/sanity.functions";

export const Route = createFileRoute("/faq")({
 loader: async () => {
   const sanityFaqs = await getFaqs();
   return { sanityFaqs };
 },
 head: () => ({
 meta: [
 { title: "FAQ — Shrutibhyam Wellness" },
 { name: "description", content: "Answers to common Shrutibhyam product, yoga, shipping, and booking questions." },
 ],
 }),
 component: Faq,
});

function Faq() {
 const { sanityFaqs } = Route.useLoaderData();
 const [openFaq, setOpenFaq] = useState<number | null>(0);
 
 const displayFaqs = sanityFaqs?.length ? sanityFaqs.map((f: any) => ({ q: f.question, a: f.answer })) : CONSTANT_FAQS;

 return (
 <SiteLayout>
 <section
 className="relative bg-fixed bg-center"

 >
 <div className="relative z-10 max-w-[1000px] mx-auto px-4 md:px-6 py-20 text-center">
 <span className="inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal mb-4">Common Inquiries</span>
 <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Frequently Asked Questions</h1>
 <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
 Quick answers for orders, products, yoga sessions, and wellness bookings.
 </p>
 </div>
 </section>

 <section
 className="relative py-20 bg-fixed bg-center"

 >
 <div className="relative z-10 max-w-[900px] mx-auto px-4 md:px-6">
 <div className="bg-surface/80 backdrop-blur-sm border border-soft-beige rounded-lg shadow-sm overflow-hidden">
 {displayFaqs.map((item: any, i: number) => (
 <div key={item.q} className=" last:border-b-0">
 <button
 onClick={() => setOpenFaq(openFaq === i ? null : i)}
 className="w-full flex justify-between items-center gap-4 text-left p-5 md:p-6 group hover:bg-cream-bg/70 transition-colors"
 >
 <span className="font-display text-base md:text-lg text-primary group-hover:text-sage-green transition-colors">{item.q}</span>
 <ChevronDown size={18} className={`text-on-surface-variant shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-sage-green" : ""}`} />
 </button>
 {openFaq === i && (
 <p className="px-5 md:px-6 pb-6 text-sm text-on-surface-variant leading-relaxed">
 {item.a}
 </p>
 )}
 </div>
 ))}
 </div>
 </div>
 </section>
 </SiteLayout>
 );
}
