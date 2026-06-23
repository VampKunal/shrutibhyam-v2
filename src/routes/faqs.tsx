import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Shrutibhyam Wellness" },
      { name: "description", content: "Frequently asked questions about our products, shipping, and return policies." },
    ],
  }),
  component: FAQs,
});

const FAQ = [
  { q: "Are your products truly cold-pressed?", a: "Yes — we adhere strictly to traditional Ayurvedic cold-pressing methods to preserve vital nutrients, enzymes, and natural aromas." },
  { q: "Do you ship internationally?", a: "We ship within India and to select international destinations including the US, UK, and UAE." },
  { q: "How can I book a private Yoga session?", a: "Use the form on our contact page and select 'Yoga Sessions' as your subject. A master practitioner will follow up." },
  { q: "What is your return policy?", a: "Due to the artisanal nature of our products we do not accept returns, but please contact us within 48 hours of delivery if your order arrives damaged." },
];

function FAQs() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <SiteLayout>
      <section className="bg-cream-bg border-b border-soft-beige">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Frequently Asked Questions</h1>
          <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
            Here are some of the most common inquiries we receive. If you don't find the answer you're looking for, feel free to contact us.
          </p>
        </div>
      </section>

      <section className="bg-surface-container-low py-16">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <div className="bg-surface border border-soft-beige rounded">
            {FAQ.map((item, i) => (
              <div key={item.q} className="border-b border-soft-beige last:border-b-0">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center text-left p-5">
                  <span className="font-display text-lg text-primary">{item.q}</span>
                  <ChevronDown size={18} className={`transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <p className="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
