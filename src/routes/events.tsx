import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Calendar, MapPin } from "lucide-react";
import { CONTACT_INFO, EVENT_TESTIMONIALS } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/lib/api/sanity.functions";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Shrutibhyam Wellness" },
      { name: "description", content: "Past corporate wellness sessions and upcoming Shrutibhyam workshops, yoga, and sound healing updates." },
    ],
  }),
  component: Events,
});

function Events() {
  const { data: eventsData, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => getEvents(),
  });

  const activeEvents = eventsData || [];

  return (
    <SiteLayout>
      <section className="relative bg-cover bg-fixed bg-center bg-no-repeat" style={{ backgroundImage: "url('/backdrop2.webp')" }}>
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
          <span className="inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal mb-4">Gather & Grow</span>
          <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Gatherings & Corporate Wellness</h1>
          <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
            {activeEvents.length === 0 && !isLoading
              ? "No public events are scheduled right now. Follow us on Instagram to know first when the next retreat, workshop, or sound healing session is announced."
              : "Discover our upcoming gatherings and past events."}
          </p>
          <a
            href={CONTACT_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-[#66BB6A] text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-surface-tint"
          >
            Follow for Updates
          </a>
        </div>
      </section>

      <section
        className="relative py-20"
      >
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 md:px-6 space-y-6">
          <div className="text-center mb-10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green block mb-2">Where We've Been</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-2">Events & Gatherings</h2>
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-on-surface-variant">Loading events...</div>
          ) : (
            activeEvents.map((e: any) => (
              <article key={e.title} className="bg-surface border border-soft-beige rounded p-8 grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-6 items-start md:items-center">
                <div className="flex items-center gap-2 text-sage-green">
                  <Calendar size={18} />
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{e.date}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl text-primary mb-2">{e.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-3 leading-relaxed">{e.description}</p>
                  <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                    <MapPin size={12} /> {e.location}
                  </div>
                </div>
                <a
                  href={e.link || CONTACT_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-surface-tint text-center"
                >
                  {e.link ? "Register" : "Enquire"}
                </a>
              </article>
            ))
          )}

          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-10 text-center mt-10">
            <h2 className="font-display text-3xl mb-3">Bring Shrutibhyam to Your Workplace</h2>
            <p className="text-sm text-primary-foreground/85 max-w-2xl mx-auto mb-6">
              We've hosted mindfulness and Ayurvedic wellness sessions at Godrej, Delhi Public School, and more. Interested in a session for your team?
            </p>
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-surface text-primary text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-soft-beige"
            >
              Enquire for Corporate Wellness
            </a>
          </div>
        </div>
      </section>

      <section
        className="relative py-20"
      >
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-2">Memories & Kind Words</h2>
            <p className="text-on-surface-variant">Reflections from our community on their journey towards balance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENT_TESTIMONIALS.map((t) => (
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
