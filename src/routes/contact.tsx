import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import { CONTACT_INFO } from "@/constant";

export const Route = createFileRoute("/contact")({
 head: () => ({
 meta: [
 { title: "Contact Us — Shrutibhyam Wellness" },
 { name: "description", content: "Reach Shrutibhyam Wellness in Gurugram for soaps, yoga sessions, and sound healing inquiries." },
 ],
 }),
 component: Contact,
});



function Contact() {
 const [open, setOpen] = useState<number | null>(0);
 return (
 <SiteLayout>
 <section
 className="relative bg-fixed bg-center"

 >
 <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
 <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Get in Touch</h1>
 <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
 We're a small, founder-run studio. Reach out with questions about our soaps, yoga classes, or sound healing sessions.
 </p>
 </div>
 </section>

 <section
 className="relative py-16 bg-fixed bg-center"

 >
 <div className="relative z-10 max-w-[1100px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
 <form className="bg-surface border border-soft-beige rounded p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
 <Field label="Name"><input type="text" className="form-input" /></Field>
 <Field label="Email"><input type="email" className="form-input" /></Field>
 <Field label="Subject">
 <select className="form-input">
 <option>General Inquiry</option>
 <option>Product Question</option>
 <option>Yoga Sessions</option>
 <option>Sound Healing</option>
 <option>Customer Support</option>
 </select>
 </Field>
 <Field label="Message"><textarea rows={5} className="form-input" /></Field>
 <button className="w-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] py-4 hover:bg-surface-tint">Send Message</button>
 </form>

 <aside className="space-y-6">
 <h2 className="font-display text-2xl text-primary">Studio</h2>
 <InfoRow icon={MapPin} title={CONTACT_INFO.name} body={CONTACT_INFO.address} />
 <InfoRow icon={Mail} title="Email Us" body={CONTACT_INFO.email} />
 <InfoRow icon={Phone} title="Reach Us" body={CONTACT_INFO.phone} />
 <div className="bg-cream-bg border border-soft-beige rounded p-6 mt-6">
 <div className="flex text-sage-green mb-3">
 {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
 </div>
 <p className="italic text-sm text-on-surface-variant mb-3">
 "Every bar and every session is made with attention, patience, and care. Your message reaches us directly."
 </p>
 <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Team Shrutibhyam</p>
 <p className="text-xs text-outline">Founder-led studio</p>
 </div>
 </aside>
 </div>
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
