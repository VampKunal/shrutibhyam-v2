import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Calendar, MapPin } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Shrutibhyam Wellness" },
      { name: "description", content: "Intentional wellness experiences, workshops, and retreats." },
    ],
  }),
  component: Events,
});

const EVENTS = [
  { date: "Oct 15, 2024", name: "Wellness Retreat @ Capgemini", desc: "A day of mindfulness, Ayurvedic practices, and deep relaxation designed for corporate wellness.", location: "Capgemini Campus, Pune" },
  { date: "Nov 02, 2024", name: "Holistic Living Workshop @ DLF", desc: "Explore cold-processed beauty, mindful nutrition, and grounding techniques for everyday life.", location: "DLF Cyber City, Gurugram" },
  { date: "Dec 10, 2024", name: "Mindful Flow @ Signature Global", desc: "A guided yoga and somatic movement session focusing on breathwork and emotional release.", location: "Signature Global Park, NCR" },
];

function Events() {
  return (
    <SiteLayout>
      <section className="bg-cream-bg border-b border-soft-beige">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
          <span className="inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal mb-4">Gather & Grow</span>
          <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Upcoming Gatherings</h1>
          <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
            Join us for intentional wellness experiences, workshops, and retreats designed to reconnect you with nature and self.
          </p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 py-20 space-y-6">
        {EVENTS.map((e) => (
          <article key={e.name} className="bg-surface border border-soft-beige rounded p-8 grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-6 items-start md:items-center">
            <div className="flex items-center gap-2 text-sage-green">
              <Calendar size={18} />
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{e.date}</span>
            </div>
            <div>
              <h3 className="font-display text-2xl text-primary mb-2">{e.name}</h3>
              <p className="text-sm text-on-surface-variant mb-3 leading-relaxed">{e.desc}</p>
              <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                <MapPin size={12} /> {e.location}
              </div>
            </div>
            <button className="bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-surface-tint">Register Now</button>
          </article>
        ))}
      </section>

      <section className="bg-surface-container-low py-20">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-2">Memories & Kind Words</h2>
            <p className="text-on-surface-variant">Reflections from our community on their journey towards balance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { q: "The retreat at Capgemini was a breath of fresh air. It re-centered my focus and introduced me to practices I now use daily.", name: "Anjali S." },
              { q: "Attending the DLF workshop completely shifted my perspective on wellness. The holistic approach felt genuine and rooted.", name: "Vikram R." },
              { q: "Beautifully organized and grounding. The Signature Global event was exactly the pause I needed in my busy life.", name: "Priya M." },
            ].map((t) => (
              <div key={t.name} className="bg-cream-bg border border-soft-beige rounded p-6">
                <p className="italic text-sm text-on-surface-variant mb-3 leading-relaxed">"{t.q}"</p>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
