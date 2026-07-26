import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { CONTACT_INFO, IMG, PRACTICES, SCHEDULE, YOGA_TESTIMONIALS } from "@/constant";
import { ArrowRight, Star, User } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";

export const Route = createFileRoute("/yoga")({
  head: () => ({
    meta: [
      { title: "Yoga | Shrutibhyam Wellness" },
      { name: "description", content: "Traditional Hatha, Ashtanga, prop-based yoga, and sound healing sessions in Gurugram." },
      { property: "og:image", content: IMG.yoga },
    ],
    links: [
      { rel: "preload", as: "image", href: IMG.yoga, fetchPriority: "high" }
    ]
  }),
  component: Yoga,
});

function Yoga() {
  return (
    <SiteLayout>
      <section className="relative min-h-[60vh] flex items-center bg-cream-bg overflow-hidden">
        <img src={"/backdrop1.webp"} alt="Yoga studio" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply" fetchPriority="high" />
        <div className="relative max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-16 text-center w-full">
          <span className="inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal mb-4">Find Your Flow</span>
          <h1 className="font-display text-4xl md:text-6xl text-primary leading-tight mb-4">Rooted in Earth,<br />Guided by Breath</h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
            Traditional yoga guided by Ayurvedic principles - Hatha, Ashtanga, and prop-based practice to align body, breath, and stillness.
          </p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScRGltMvYcmmCd2m_nEwFEy7A1_AFcaUa7uc9uf3QpAOemMiA/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-surface-tint transition">Book Now</a>
        </div>
      </section>

      <section
        className="relative py-12 md:py-16 bg-fixed bg-center"

      >
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">Our Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRACTICES.map((p) => (
              <div key={p.name} className="bg-surface border border-soft-beige rounded p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sage-green mb-3">{p.tag}</p>
                <h3 className="font-display text-2xl text-primary mb-3">{p.name}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{p.desc}</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScRGltMvYcmmCd2m_nEwFEy7A1_AFcaUa7uc9uf3QpAOemMiA/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-primary hover:text-sage-green">
                  Book Now <ArrowRight size={14} className="ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section
        className="relative py-12 md:py-16 bg-fixed bg-center"

      >
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-2">Echoes of the Studio</h2>
            <p className="text-on-surface-variant">Small, personal sessions rooted in breath, alignment, and stillness.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {YOGA_TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-cream-bg border border-soft-beige rounded p-6">
                <StarRating rating={5} />
                <p className="italic text-sm text-on-surface-variant mb-4 leading-relaxed">"{t.q}"</p>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{t.name}</p>
                <p className="text-xs text-outline">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}
