import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { IMG, PRACTICES, SCHEDULE, YOGA_TESTIMONIALS } from "@/constant";
import { ArrowRight, Star, User } from "lucide-react";

export const Route = createFileRoute("/yoga")({
  head: () => ({
    meta: [
      { title: "Yoga — Shrutibhyam Wellness" },
      { name: "description", content: "Find your flow with traditional Hatha, Vinyasa, and Yin yoga classes rooted in Ayurvedic principles." },
      { property: "og:image", content: IMG.yoga },
    ],
  }),
  component: Yoga,
});

function Yoga() {
  return (
    <SiteLayout>
      <section className="relative min-h-[60vh] flex items-center bg-cream-bg overflow-hidden">
        <img src={IMG.yoga} alt="Yoga studio" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply" />
        <div className="relative max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center w-full">
          <span className="inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal mb-4">Find Your Flow</span>
          <h1 className="font-display text-4xl md:text-6xl text-primary leading-tight mb-4">Rooted in Earth.<br />Elevated in Spirit.</h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
            A sanctuary of holistic movement. Yoga guided by Ayurvedic principles to align body, mind, and nature.
          </p>
          <a href="#schedule" className="inline-block bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-surface-tint transition">View Schedule</a>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">Our Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRACTICES.map((p) => (
            <div key={p.name} className="bg-cream-bg border border-soft-beige rounded p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sage-green mb-3">{p.tag}</p>
              <h3 className="font-display text-2xl text-primary mb-3">{p.name}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{p.desc}</p>
              <a href="#" className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-primary hover:text-sage-green">
                Learn More <ArrowRight size={14} className="ml-2" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="schedule" className="bg-surface-container-low py-20">
        <div className="max-w-[1000px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-3">Class Schedule</h2>
            <p className="text-on-surface-variant">Find a time to reconnect. All levels welcome.</p>
            <div className="inline-flex border border-soft-beige mt-6 bg-surface">
              {["Today", "Tomorrow", "Upcoming"].map((t, i) => (
                <button key={t} className={`px-6 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${i === 0 ? "bg-primary text-primary-foreground" : "text-on-surface-variant hover:bg-soft-beige"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {SCHEDULE.map((c) => (
              <div key={c.name} className="bg-surface border border-soft-beige rounded p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <div className="flex items-baseline gap-1 w-24">
                  <span className="font-display text-3xl text-primary">{c.time}</span>
                  <span className="text-xs text-on-surface-variant">{c.period}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-primary">{c.name}</h3>
                  <p className="text-sm text-on-surface-variant flex items-center gap-3">
                    <span>{c.duration}</span>
                    <span className="w-1 h-1 bg-outline rounded-full" />
                    <span className="flex items-center gap-1"><User size={12} />{c.teacher}</span>
                  </p>
                </div>
                {c.state === "open" ? (
                  <button className="bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-surface-tint">Book Now</button>
                ) : (
                  <div className="text-right">
                    <p className="text-xs text-clay-muted font-semibold uppercase tracking-[0.1em] mb-1">Waitlist Only</p>
                    <button className="border border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] px-5 py-2 hover:bg-soft-beige">Join Waitlist</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="border-b border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] pb-1 hover:text-sage-green hover:border-sage-green">View Full Calendar</button>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-2">Echoes of the Studio</h2>
          <p className="text-on-surface-variant">Stories of alignment and serenity from our community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {YOGA_TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-cream-bg border border-soft-beige rounded p-6">
              <div className="flex text-sage-green mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
              </div>
              <p className="italic text-sm text-on-surface-variant mb-4 leading-relaxed">"{t.q}"</p>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{t.name}</p>
              <p className="text-xs text-outline">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
