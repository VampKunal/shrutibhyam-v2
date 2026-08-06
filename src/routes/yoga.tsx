import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { IMG, PRACTICES } from "@/constant";
import { ArrowRight } from "lucide-react";
import { getYogaData } from "@/lib/api/sanity.functions";
import { PortableText } from "@portabletext/react";

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
  loader: async () => {
    const yogaData = await getYogaData();
    return { yogaData };
  },
  component: Yoga,
});

function Yoga() {
  const { yogaData } = Route.useLoaderData();

  return (
    <SiteLayout>
      <section className="relative min-h-[60vh] flex items-center bg-cream-bg overflow-hidden">
        <img src={yogaData?.hero?.backgroundImage || "/backdrop1.webp"} alt="Yoga studio" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply" fetchPriority="high" />
        <div className="relative max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-10 text-center w-full">
          <span className="inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal mb-4">Find Your Flow</span>
          <h1 className="font-display text-4xl md:text-6xl text-primary leading-tight mb-4">
            {yogaData?.hero?.heading ? (
              <span dangerouslySetInnerHTML={{ __html: yogaData.hero.heading.replace(/\n/g, "<br />") }} />
            ) : (
              <>Rooted in Earth,<br />Guided by Breath</>
            )}
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
            {yogaData?.hero?.description || "Traditional yoga guided by Ayurvedic principles - Hatha, Ashtanga, and prop-based practice to align body, breath, and stillness."}
          </p>
          <Link to="/book-yoga" className="inline-block bg-[#66BB6A] text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-surface-tint transition">Book Now</Link>
        </div>
      </section>

      <section
        className="relative py-8 md:py-10 bg-fixed bg-center"

      >
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">Our Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(yogaData?.practices?.length > 0 ? yogaData.practices : PRACTICES).map((p: any) => (
              <div key={p.name} className="bg-surface border border-soft-beige rounded p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sage-green mb-3">{p.tag}</p>
                <h3 className="font-display text-2xl text-primary mb-3">{p.name}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{p.desc}</p>
                <Link to="/book-yoga" className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-primary hover:text-sage-green">
                  Book Now <ArrowRight size={14} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {yogaData?.gallery?.length > 0 && (
        <section className="relative py-8 md:py-10 bg-fixed bg-center">
          <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-primary mb-2">Yoga Studio</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {yogaData.gallery.map((img: string, i: number) => (
                <div key={i} className="relative rounded-lg overflow-hidden border border-soft-beige bg-surface block aspect-square group">
                  <img src={img} alt={`Yoga Gallery ${i + 1}`} className="w-full h-full object-cover opacity-95 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </SiteLayout>
  );
}
