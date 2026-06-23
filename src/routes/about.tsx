import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { IMG } from "@/components/site/content";
import { Leaf, HandHeart, Sparkles, MapPin, Flower2, Heart } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Shrutibhyam Wellness" },
      { name: "description", content: "Learn about the origins of Shrutibhyam. Rooted in purity, crafted for today." },
    ],
  }),
  component: About,
});

function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero fade in
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Alternating Sections Fade In & Parallax
      const sections = gsap.utils.toArray(".story-section");
      sections.forEach((sec: any) => {
        const isLeft = sec.classList.contains("left-to-right");
        
        gsap.from(sec.querySelector(".story-text"), {
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
          },
          x: isLeft ? -50 : 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });

        const imageGroup = sec.querySelector(".collage-img-group");
        if (imageGroup) {
          gsap.from(imageGroup, {
            scrollTrigger: {
              trigger: sec,
              start: "top 80%",
            },
            x: isLeft ? 50 : -50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          });

          // Collage Images Parallax
          const images = imageGroup.querySelectorAll(".parallax-img");
          images.forEach((img: any, i: number) => {
            gsap.fromTo(img, 
              { y: 30 * (i % 2 === 0 ? 1 : -1) }, 
              {
                scrollTrigger: {
                  trigger: imageGroup,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
                y: -30 * (i % 2 === 0 ? 1 : -1),
                ease: "none"
              }
            );
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SiteLayout>
      <div ref={containerRef}>
        {/* Hero */}
        <section className="bg-cream-bg border-b border-soft-beige pt-32 pb-24 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-sage-green)_0%,_transparent_70%)]" />
          <div className="max-w-[1000px] mx-auto px-4 md:px-6 text-center relative z-10">
            <span className="hero-text inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal mb-6">Our Journey</span>
            <h1 className="hero-text font-display text-5xl md:text-7xl text-primary mb-6 leading-tight">Rooted in <i className="text-sage-green">Nature</i></h1>
            <p className="hero-text text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              We are a slow-beauty wellness sanctuary, bridging ancient Ayurvedic wisdom with the needs of modern life through handcrafted purity.
            </p>
          </div>
        </section>

        {/* 1. How we came to be (L-R) */}
        <section className="story-section left-to-right max-w-[1200px] mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="story-text space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-2 text-sage-green font-semibold text-xs uppercase tracking-wider">
                <MapPin size={16} /> The Origin
              </div>
              <h2 className="font-display text-4xl text-primary leading-tight">How We Came To Be</h2>
              <p className="text-base text-on-surface-variant leading-relaxed">
                Our story began in the foothills of the Himalayas, surrounded by pristine nature and the profound silence of the Ganges. We observed the simplicity of traditional wellness practices and realized the modern world had lost this connection.
              </p>
              <p className="text-base text-on-surface-variant leading-relaxed">
                Shrutibhyam was born out of a desire to create a sanctuary. A place where wellness is not a rushed chore, but a deliberate ritual of returning to oneself.
              </p>
            </div>
            
            <div className="collage-img-group relative h-[400px] lg:h-[600px] w-full order-1 lg:order-2">
              <div className="parallax-img absolute top-0 right-0 w-[70%] h-[70%] rounded-2xl overflow-hidden shadow-lg border-4 border-cream-bg z-10">
                <img src={IMG.hero} alt="Nature" className="w-full h-full object-cover" />
              </div>
              <div className="parallax-img absolute bottom-0 left-0 w-[60%] h-[60%] rounded-2xl overflow-hidden shadow-xl border-4 border-cream-bg z-20">
                <img src={IMG.trust} alt="Ingredients" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. What we do (R-L) */}
        <section className="story-section right-to-left bg-surface-container-low py-24 md:py-32 border-t border-b border-soft-beige">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="collage-img-group relative h-[400px] lg:h-[600px] w-full order-1">
                <div className="parallax-img absolute top-[10%] left-0 w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-lg border-4 border-cream-bg z-10">
                  <img src={IMG.faceOil} alt="Crafting" className="w-full h-full object-cover" />
                </div>
                <div className="parallax-img absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] rounded-2xl overflow-hidden shadow-xl border-4 border-cream-bg z-20">
                  <img src={IMG.powder} alt="Herbs" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="story-text space-y-6 order-2">
                <div className="flex items-center gap-2 text-sage-green font-semibold text-xs uppercase tracking-wider">
                  <HandHeart size={16} /> Our Craft
                </div>
                <h2 className="font-display text-4xl text-primary leading-tight">What We Do</h2>
                <p className="text-base text-on-surface-variant leading-relaxed">
                  We handcraft Ayurvedic skincare, wellness formulations, and curate holistic experiences. Every product is poured in micro-batches and aged slowly to preserve the vitality of the earth's ingredients.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Cold-processed, 6-week aged botanical soaps",
                    "Wild-harvested herbal powders & elixirs",
                    "Sustainably sourced wellness accessories"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                      <span className="text-sage-green mt-0.5">✦</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Events (L-R) */}
        <section className="story-section left-to-right max-w-[1200px] mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="story-text space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-2 text-sage-green font-semibold text-xs uppercase tracking-wider">
                <Heart size={16} /> Community
              </div>
              <h2 className="font-display text-4xl text-primary leading-tight">Events & Gatherings</h2>
              <p className="text-base text-on-surface-variant leading-relaxed">
                Wellness is not pursued in isolation. We host retreats, workshops, and immersive sound-healing sessions that bring people together to share energy, knowledge, and restorative practices.
              </p>
              <p className="text-base text-on-surface-variant leading-relaxed">
                From guided meditation under the open sky to intensive workshops on creating your own herbal infusions, our events are designed to anchor your spirit.
              </p>
            </div>
            
            <div className="collage-img-group relative h-[400px] lg:h-[600px] w-full order-1 lg:order-2">
              <div className="parallax-img absolute top-[5%] right-[5%] w-[65%] h-[85%] rounded-2xl overflow-hidden shadow-lg border-4 border-cream-bg z-10">
                <img src={IMG.tea} alt="Event gathering" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="parallax-img absolute bottom-[10%] left-[5%] w-[45%] h-[45%] rounded-2xl overflow-hidden shadow-xl border-4 border-cream-bg z-20">
                <img src={IMG.yoga} alt="Meditation" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. How and why we are natural (R-L) */}
        <section className="story-section right-to-left bg-surface-container-low py-24 md:py-32 border-t border-b border-soft-beige">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="collage-img-group relative h-[400px] lg:h-[600px] w-full order-1">
                <div className="parallax-img absolute inset-0 w-[90%] h-[90%] m-auto rounded-full overflow-hidden shadow-lg border-8 border-cream-bg z-10">
                  <img src={IMG.serum} alt="Natural elements" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-sage-green/20 rounded-full blur-3xl z-0" />
              </div>

              <div className="story-text space-y-6 order-2">
                <div className="flex items-center gap-2 text-sage-green font-semibold text-xs uppercase tracking-wider">
                  <Leaf size={16} /> Pure Ethos
                </div>
                <h2 className="font-display text-4xl text-primary leading-tight">How & Why We Are Natural</h2>
                <p className="text-base text-on-surface-variant leading-relaxed">
                  We believe that whatever you put on your skin eventually enters your bloodstream. That is why we refuse to use synthetic fragrances, artificial hardeners, or chemical preservatives.
                </p>
                <p className="text-base text-on-surface-variant leading-relaxed">
                  Our raw materials are sourced directly from sustainable micro-farms. By honoring the natural cycle of these botanicals, we ensure that you receive their undiluted healing properties.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Yoga portfolio (L-R) */}
        <section className="story-section left-to-right max-w-[1200px] mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="story-text space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-2 text-sage-green font-semibold text-xs uppercase tracking-wider">
                <Flower2 size={16} /> Movement
              </div>
              <h2 className="font-display text-4xl text-primary leading-tight">Yoga Portfolio</h2>
              <p className="text-base text-on-surface-variant leading-relaxed">
                Yoga is an integral part of the Shrutibhyam lifestyle. We offer a curated collection of eco-friendly, ethically produced yoga gear.
              </p>
              <p className="text-base text-on-surface-variant leading-relaxed">
                From cork mats that grip better with sweat, to meditation cushions filled with organic buckwheat hulls, every item is designed to support your physical alignment and spiritual focus without harming the planet.
              </p>
            </div>
            
            <div className="collage-img-group relative h-[400px] lg:h-[600px] w-full order-1 lg:order-2">
              <div className="parallax-img absolute top-[10%] right-[10%] w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-lg border-4 border-cream-bg z-10">
                <img src={IMG.yoga} alt="Yoga poses" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-[20%] right-[-5%] w-24 h-24 bg-sage-green/10 rounded-full blur-2xl z-0" />
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
