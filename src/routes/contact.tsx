import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Mail, MapPin, Phone, Star } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Shrutibhyam Wellness" },
      { name: "description", content: "Reach our sanctuary in Rishikesh with questions about Ayurvedic offerings or holistic practices." },
    ],
  }),
  component: Contact,
});



function Contact() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SiteLayout>
      <section className="bg-cream-bg border-b border-soft-beige">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Get in Touch</h1>
          <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
            We are here to guide you on your wellness journey. Reach out with any questions about our artisanal offerings or holistic practices.
          </p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <form className="bg-surface border border-soft-beige rounded p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Field label="Name"><input type="text" className="form-input" /></Field>
          <Field label="Email"><input type="email" className="form-input" /></Field>
          <Field label="Subject">
            <select className="form-input">
              <option>General Inquiry</option>
              <option>Product Question</option>
              <option>Yoga Sessions</option>
              <option>Customer Support</option>
            </select>
          </Field>
          <Field label="Message"><textarea rows={5} className="form-input" /></Field>
          <button className="w-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] py-4 hover:bg-surface-tint">Send Message</button>
        </form>

        <aside className="space-y-6">
          <h2 className="font-display text-2xl text-primary">Our Sanctuary</h2>
          <InfoRow icon={MapPin} title="Shrutibhyam Wellness Center" body="108 Ayurvedic Lane, Rishikesh, Uttarakhand 249201, India" />
          <InfoRow icon={Mail} title="Email Us" body="namaste@shrutibhyam.com" />
          <InfoRow icon={Phone} title="Call Us" body="+91 98765 43210 — Mon-Fri, 9am – 5pm IST" />
          <div className="bg-cream-bg border border-soft-beige rounded p-6 mt-6">
            <div className="flex text-sage-green mb-3">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
            </div>
            <p className="italic text-sm text-on-surface-variant mb-3">
              "The care and intentionality Shrutibhyam puts into customer support is as pure as their products."
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Priya M.</p>
            <p className="text-xs text-outline">Verified Member</p>
          </div>
        </aside>
      </section>



      <style>{`.form-input{width:100%;background:transparent;border:1px solid var(--color-soft-beige);padding:.75rem 1rem;font-size:.875rem;color:var(--color-on-surface);outline:none;border-radius:.25rem}.form-input:focus{border-color:var(--color-sage-green)}`}</style>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary block mb-2">{label}</span>
      {children}
    </label>
  );
}

function InfoRow({ icon: Icon, title, body }: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-soft-beige flex items-center justify-center rounded shrink-0">
        <Icon size={18} className="text-primary" />
      </div>
      <div>
        <p className="text-sm font-semibold text-primary">{title}</p>
        <p className="text-sm text-on-surface-variant">{body}</p>
      </div>
    </div>
  );
}
