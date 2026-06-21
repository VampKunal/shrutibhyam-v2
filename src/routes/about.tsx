import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { IMG } from "@/components/site/content";
import { Sparkles, ShieldCheck, Heart, MapPin } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Shrutibhyam Wellness" },
      { name: "description", content: "Learn about the origins of Shrutibhyam, born along the banks of the Ganges in Rishikesh. Rooted in purity, crafted for today." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: ShieldCheck, title: "Uncompromising Purity", desc: "We source organic, cold-pressed raw ingredients directly from local micro-farms. Zero synthetic chemicals, sulfates, or parabens." },
  { icon: Heart, title: "Artisanal Integrity", desc: "Every bar of soap is aged for six weeks, hand-poured in micro-batches, and crafted with intention rather than industrial speed." },
  { icon: Sparkles, title: "Ayurvedic Heritage", desc: "Our formulations are guided by ancient texts, adapting slow-beauty wellness rituals to restore and balance modern skin." },
];

function About() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-cream-bg border-b border-soft-beige">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
          <span className="inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal mb-4">Our Story</span>
          <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Rooted in Rishikesh</h1>
          <p className="text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Shrutibhyam is a slow-beauty wellness sanctuary. We honor ancestral heritage and natural purity, bridging ancient Ayurvedic wisdom with modern life.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sage-green font-semibold text-xs uppercase tracking-wider">
              <MapPin size={16} /> Born on the Banks of the Ganges
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">The Origin of Shrutibhyam</h2>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
              Our journey began in Rishikesh, Uttarakhand, where the fresh air of the Himalayas meets the holy flow of the Ganges. Inspired by the daily rituals of the local sages and the deep-seated knowledge of traditional healers, Shrutibhyam was founded as a sanctuary for intentional living.
            </p>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
              We realized that in a world dominated by instant gratification and chemical-filled fast beauty, there is a profound need for slow, pure, and grounding skincare. Our cold-processed soaps, herbal oils, and yoga practices are designed to restore that lost connection to nature.
            </p>
          </div>
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-soft-beige">
            <img src={IMG.trust} alt="Rishikesh nature" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/10" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low py-20 border-t border-b border-soft-beige">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-primary">Core Pillars of Purity</h2>
            <div className="w-16 h-px bg-sage-green mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="bg-cream-bg p-8 border border-soft-beige rounded-lg space-y-4">
                  <div className="w-12 h-12 rounded-full bg-soft-beige flex items-center justify-center text-sage-green">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl text-primary">{val.title}</h3>
                  <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder / Ethos section */}
      <section className="max-w-[800px] mx-auto px-4 md:px-6 py-20 text-center space-y-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green">Our Vision</span>
        <h2 className="font-display text-3xl text-primary">Wellness as a Grounding Ritual</h2>
        <p className="italic text-base text-on-surface-variant leading-relaxed">
          "Skincare is not just a cosmetic chore; it is an intimate conversation with your body. By using cold-pressed soaps infused with wild-harvested herbs, you are honoring your skin and taking a moment to breathe and reconnect with the earth's natural rhythm."
        </p>
        <div className="pt-4">
          <div className="w-12 h-12 rounded-full bg-sage-green/20 mx-auto flex items-center justify-center text-primary font-display font-semibold mb-2">
            SB
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Shrutibhyam Sanctuary</p>
          <p className="text-[10px] text-outline">Rishikesh, India</p>
        </div>
      </section>
    </SiteLayout>
  );
}
