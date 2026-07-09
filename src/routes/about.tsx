import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { IMG } from "@/constant";
import { Leaf, HandHeart, MapPin, Flower2, Heart } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/about")({
 head: () => ({
 meta: [
 { title: "Our Story — Shrutibhyam Wellness" },
 { name: "description", content: "Learn the real Shrutibhyam story: founder-led Ayurvedic soap, yoga, and sound healing from Gurugram." },
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
 <section className="bg-cream-bg pt-32 pb-24 overflow-hidden relative">
 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-sage-green)_0%,_transparent_70%)]" />
 <div className="max-w-[1000px] mx-auto px-4 md:px-6 text-center relative z-10">
 <span className="hero-text inline-block px-4 py-1 bg-soft-beige rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal mb-6">Our Journey</span>
 <h1 className="hero-text font-display text-5xl md:text-7xl text-primary mb-6 leading-tight">Rooted in <i className="text-sage-green">Nature</i></h1>
 <p className="hero-text text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
 A slow-beauty and mindful-movement practice - handcrafted Ayurvedic skincare and traditional yoga, brought from the earth to your daily ritual.
 </p>
 </div>
 </section>

 {/* 1. How we came to be (L-R) */}
 <section
 className="relative story-section left-to-right py-24 md:py-32 bg-fixed bg-center"

 >
 <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 <div className="relative order-2 lg:order-1 py-6 sm:py-8">
 <img
 src="/lavender.png"
 alt=""
 aria-hidden="true"
 className="
 absolute
 -left-24
 top-1/2
 -translate-y-1/2
 w-[70rem]
 md:w-[80rem]
 lg:w-[90rem]
 xl:w-[100rem]
 opacity-40
 pointer-events-none
 select-none
 object-contain
 -z-0
 "
 />
 <div className="story-text relative z-10 space-y-6">
 <div className="flex items-center gap-2 text-sage-green font-semibold text-xs uppercase tracking-wider">
 <MapPin size={16} /> The Origin
 </div>
 <h2 className="font-display text-4xl text-primary leading-tight">How We Came To Be</h2>
 <p className="text-base text-on-surface-variant leading-relaxed">
 Shrutibhyam began with one woman's own health journey. A shift toward mindful eating and yoga led our founder to question everything she put on - and in - her body. As she trained to become a certified yoga instructor under the Ministry of AYUSH, one realisation stayed with her: our skin breathes, and whatever touches it eventually makes its way into our body too.
 </p>
 <p className="text-base text-on-surface-variant leading-relaxed">
 That thought sent her looking for a gentler way to cleanse - one without harsh chemicals, synthetic fragrance, or artificial additives. Months of research into cold-pressed oils and pure essential oils later, the first Shrutibhyam bar was handcrafted in Gurugram, the way skincare used to be made.
 </p>
 <p className="text-base text-on-surface-variant leading-relaxed">
 Shrutibhyam is not just skincare. It is a return to simplicity, purity, and honesty.
 </p>
 </div>
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
 </div>
 </section>

 {/* 2. What we do (R-L) */}
 <section
 className="relative story-section right-to-left py-24 md:py-32 bg-fixed bg-center"

 >
 <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
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
 We handcraft Ayurvedic soap using the traditional cold-process method, which preserves natural glycerin for gentle, lasting moisture. Every bar is made with cold-pressed coconut, olive, almond, castor, and neem oils, vitamin E, and pure essential oils - cedarwood, ylang ylang, geranium, frankincense, lavender, and patchouli. Never synthetic fragrance. Never synthetic colour.
 </p>
 <ul className="space-y-4 pt-4">
 {[
 "Cold-process, hand-poured soap bars, cured over weeks",
 "Traditional Hatha, Ashtanga and prop-based yoga instruction",
 "Immersive sound healing sessions with Arahat Sound Dwellness"
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

 {/* 3. Yoga and Sound Healing (L-R) */}
 <section
 className="relative story-section left-to-right py-24 md:py-32 bg-fixed bg-center"

 >
 <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 <div className="story-text space-y-6 order-2 lg:order-1">
 <div className="flex items-center gap-2 text-sage-green font-semibold text-xs uppercase tracking-wider">
 <Heart size={16} /> Practice
 </div>
 <h2 className="font-display text-4xl text-primary leading-tight">Yoga & Sound Healing</h2>
 <p className="text-base text-on-surface-variant leading-relaxed">
 Yoga is at the heart of the Shrutibhyam philosophy - not as a fitness routine, but as a daily return to breath and stillness. Our founder teaches Hatha, Ashtanga, and prop-based sessions at Godrej Aria Clubhouse, Gurugram, for every level.
 </p>
 <p className="text-base text-on-surface-variant leading-relaxed">
 We also host sound healing sessions in collaboration with Arahat Sound Dwellness - immersive sound baths designed to slow the nervous system and restore quiet.
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
 </div>
 </section>

 {/* 4. Pure Ethos (R-L) */}
 <section
 className="relative story-section right-to-left py-24 md:py-32 bg-fixed bg-center"

 >
 <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
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
 We believe that whatever you put on your skin eventually enters your bloodstream - which is why we never use synthetic fragrances, artificial hardeners, or chemical preservatives.
 </p>
 <p className="text-base text-on-surface-variant leading-relaxed">
 Every ingredient is ethically sourced, and every product is cruelty-free, never tested on animals. Nature, time, and care guide the work. Never rushed.
 </p>
 </div>
 </div>
 </div>
 </section>
 </div>
 </SiteLayout>
 );
}
