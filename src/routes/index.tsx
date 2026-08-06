import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import { SiteLayout } from "@/components/site/Layout";
import {
    IMG,
    PRODUCTS,
    TRUST,
    MARQUEE,
    HERO_CAROUSEL,
    CONTACT_INFO,
    PURITY,
    BESTSELLERS
} from "@/constant";
import { ArrowRight, Star, Quote, Instagram, Facebook, Linkedin, ChevronLeft, ChevronRight, Youtube, Leaf } from "lucide-react";
import { getWooProducts } from "@/lib/api/woocommerce.functions";
import { getHomeData } from "@/lib/api/sanity.functions";
import { Partners } from "@/components/site/Partners";
import { TestimonialsGallery } from "@/components/site/TestimonialsGallery";
import { ProductCardImage } from "@/components/site/ProductCardImage";
import { scrollContainerLeft, scrollContainerRight } from "@/lib/scroll";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { PortableText } from "@portabletext/react";


export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "Shrutibhyam Wellness — Rooted in Ayurvedic Purity" },
            { name: "description", content: "Discover slow-beauty Ayurvedic skincare, mindful yoga, and holistic events." },
            { property: "og:title", content: "Shrutibhyam Wellness" },
            { property: "og:image", content: IMG.Home },
        ],
        links: [
            { rel: "preload", as: "image", href: HERO_CAROUSEL[0].imgDesktop, fetchPriority: "high", media: "(min-width: 768px)" },
            { rel: "preload", as: "image", href: HERO_CAROUSEL[0].imgMobile, fetchPriority: "high", media: "(max-width: 767px)" }
        ]
    }),
    loader: async () => {
        const products = await getWooProducts();
        const homeData = await getHomeData();
        return { products, homeData };
    },
    staleTime: 1000 * 60 * 5,
    component: Home,
});

function Home() {
    const { products: wooProducts, homeData } = Route.useLoaderData();
    const products = wooProducts && wooProducts.length > 0 ? wooProducts : PRODUCTS;
    const [currentImg, setCurrentImg] = useState(0);
    const [craftedIndex, setCraftedIndex] = useState(0);

    const craftedRef = useRef<HTMLDivElement>(null);
    const bestsellerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const bestsellers = useMemo(() => {
        return products.slice(0, 8).map((p) => ({
            slug: p.slug,
            name: p.name,
            price: p.price,
            regularPrice: p.regularPrice,
            onSale: p.onSale,
            image: p.image,
            tag: p.onSale ? "Sale" : "Bestseller",
            wooId: p.wooId,
        }));
    }, [products]);

    // Data handling — must be above useEffect
    const heroCarousel = homeData?.heroCarousel?.length > 0
        ? homeData.heroCarousel.map((h: any) => ({
            imgDesktop: h.desktopImage,
            imgMobile: h.mobileImage || h.desktopImage,
            to: h.link || "/shop"
        }))
        : HERO_CAROUSEL;

    const partnersLogos = homeData?.partnersLogos?.length > 0 ? homeData.partnersLogos : null;

    const craftedWithCareCards = homeData?.craftedWithCare?.length > 0
        ? homeData.craftedWithCare
        : [
            { mainImage: IMG.img1, subImage1: IMG.img2, subImage2: IMG.img3 },
            { mainImage: IMG.img4, subImage1: IMG.img5, subImage2: IMG.img6 },
            { mainImage: IMG.pro1, subImage1: IMG.pro2, subImage2: IMG.pro3 },
        ];

    const stats = homeData?.stats?.length > 0
        ? homeData.stats
        : [
            { value: "4", label: "Signature Bars" },
            { value: "100%", label: "Handcrafted" },
            { value: "AYUSH", label: "Certified Yoga" },
            { value: "0%", label: "Synthetics" }
        ];

    const socialRituals = homeData?.socialRituals?.heading
        ? homeData.socialRituals
        : {
            heading: "Follow Our Journey",
            description: "We share daily inspiration, Ayurvedic wisdom, slow-beauty rituals, and updates from Gurugram. Join our community online.",
            images: [
                { image: IMG.img1, link: CONTACT_INFO.instagram2 },
                { image: IMG.img2, link: CONTACT_INFO.instagram2 },
                { image: IMG.img3, link: CONTACT_INFO.instagram2 },
                { image: IMG.img4, link: CONTACT_INFO.instagram2 },
                { image: IMG.img5, link: CONTACT_INFO.instagram2 },
                { image: IMG.img6, link: CONTACT_INFO.instagram2 }
            ]
        };

    const craftedWithIntention = homeData?.craftedWithIntention || null;
    const communityData = homeData?.communityExperiences || null;


    useEffect(() => {
        const currentSlide = heroCarousel[currentImg];
        if (!currentSlide) return;
        let timer: ReturnType<typeof setTimeout>;

        if (!currentSlide.isVideo) {
            timer = setTimeout(() => {
                setCurrentImg((prev) => (prev + 1) % heroCarousel.length);
            }, 8000);
        } else {
            const videoEl = videoRefs.current[currentImg];
            if (videoEl) {
                videoEl.currentTime = 0;
                videoEl.play().catch(() => { });
            }
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [currentImg, homeData]);

    return (
        <SiteLayout>
            {/* Hero */}
            <section className="relative w-full h-[60vh] md:h-[86vh] flex items-center justify-center p-4 md:px-0 lg:p-8">
                <div className="relative w-full h-full rounded-3xl overflow-hidden group border border-soft-beige shadow-lg bg-surface-container-low">

                    {/* Background Image Carousel */}
                    {heroCarousel.map((slide: any, idx: number) => (
                        <Link
                            key={(slide.imgDesktop || slide.imgMobile) + idx}
                            to={slide.to}
                            className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-1000 ${idx === currentImg
                                ? "opacity-100 z-0 pointer-events-auto"
                                : "opacity-0 -z-10 pointer-events-none"
                                }`}
                        >
                            <picture>
                                <source
                                    media="(min-width: 768px)"
                                    srcSet={slide.imgDesktop}
                                />
                                <img
                                    src={slide.imgMobile}
                                    alt={slide.alt || "Shrutibhyam Hero"}
                                    className="w-full h-full object-cover"
                                    width={1920}
                                    height={1080}
                                    {...(idx === 0
                                        ? { fetchPriority: "high" }
                                        : { loading: "lazy" })}
                                />
                            </picture>
                        </Link>
                    ))}

                    {/* Left / Right Arrows */}
                    {heroCarousel.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 z-20 pointer-events-none">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentImg(
                                        (prev) =>
                                            (prev - 1 + heroCarousel.length) %
                                            heroCarousel.length
                                    );
                                }}
                                className="pointer-events-auto p-2 md:p-3 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-sm"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft size={32} />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentImg(
                                        (prev) => (prev + 1) % heroCarousel.length
                                    );
                                }}
                                className="pointer-events-auto p-2 md:p-3 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-sm"
                                aria-label="Next slide"
                            >
                                <ChevronRight size={32} />
                            </button>
                        </div>

                    )}

                </div>
            </section>

            {/* Marquee */}
            <div className="bg-orange-500 text-white py-4 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-10 px-6">
                            {MARQUEE.map((w) => (
                                <span
                                    key={w + i}
                                    className="text-xs font-semibold uppercase tracking-[0.18em] flex items-center gap-10"
                                >
                                    {w}
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#BBDC12]" />
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Partners Logos */}
            <Partners logos={partnersLogos} />

            {/* Products Categories */}
            <section
                className="relative py-8 md:py-10 bg-fixed bg-center bg-[#FFFAF3]/60"

            >
                <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">Products</h2>
                        <div className="w-16 h-px bg-sage-green mx-auto mb-12" />
                    </div>

                    {/* Bestsellers Carousel */}
                    <div className="mb-20">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-display text-2xl text-primary">Bestsellers</h3>
                            <div className="flex gap-2 items-center">
                                <span className="text-xs text-on-surface-variant md:hidden uppercase tracking-widest mr-2">Swipe</span>
                                <button onClick={() => scrollContainerLeft(bestsellerRef)} className="hidden md:flex w-10 h-10 rounded-full border border-soft-beige items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-primary bg-white shadow-sm">
                                    <ChevronLeft size={20} />
                                </button>
                                <button onClick={() => scrollContainerRight(bestsellerRef)} className="hidden md:flex w-10 h-10 rounded-full border border-soft-beige items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-primary bg-white shadow-sm">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto no-scrollbar relative group -mx-4 px-4 md:mx-0 md:px-0" ref={bestsellerRef}>
                            <div className="flex gap-6 pb-6 snap-x snap-mandatory w-max">
                                {bestsellers.map((product, idx) => (
                                    <Link key={idx} to={`/shop/${product.slug}` as any} className="snap-center shrink-0 w-[240px] md:w-[280px] flex flex-col group/item cursor-pointer">
                                        <div className="aspect-[4/5] relative overflow-hidden mb-4 rounded bg-surface-container-low">
                                            <ProductCardImage product={product as any} imageClassName="group-hover/item:scale-105" />
                                            {product.tag && (
                                                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 text-[10px] uppercase tracking-widest text-primary border border-soft-beige font-semibold rounded z-20">
                                                    {product.tag}
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-display text-lg text-primary mb-1 group-hover/item:text-sage-green transition-colors">{product.name}</h4>
                                        <div className="mt-1">
                                            <PriceDisplay price={product.price} regularPrice={product.regularPrice} onSale={product.onSale} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 mt-12 ">
                        <h3 className="font-display text-2xl text-primary mb-6">Explore More</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link to="/shop" search={{ category: "Skincare" } as any} className="interactive-card group bg-cream-bg border border-soft-beige rounded overflow-hidden">
                            <div className="aspect-square relative overflow-hidden bg-surface-container-low">
                                <img src={IMG.pro1} alt="Skincare" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                            </div>
                            <div className="p-6 text-center group-hover:bg-surface-container-low transition-colors">
                                <h3 className="font-display text-xl text-primary mb-1 group-hover:text-sage-green transition-colors">Skincare</h3>
                                <p className="text-sm text-on-surface-variant">Cold-process soap bars made by hand</p>
                            </div>
                        </Link>
                        <Link to="/yoga" className="interactive-card group bg-cream-bg border border-soft-beige rounded overflow-hidden">
                            <div className="aspect-square relative overflow-hidden bg-surface-container-low">
                                <img src={IMG.yoga2} alt="Yoga Products" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                            </div>
                            <div className="p-6 text-center group-hover:bg-surface-container-low transition-colors">
                                <h3 className="font-display text-xl text-primary mb-1 group-hover:text-sage-green transition-colors">Yoga</h3>
                                <p className="text-sm text-on-surface-variant">Hatha, Ashtanga and prop-based practice</p>
                            </div>
                        </Link>
                        <a href={CONTACT_INFO.instagram2} target="_blank" rel="noopener noreferrer" className="interactive-card group bg-cream-bg border border-soft-beige rounded overflow-hidden">
                            <div className="aspect-square relative overflow-hidden bg-surface-container-low">
                                <img src={IMG.pro5} alt="Sound Healing" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                            </div>
                            <div className="p-6 text-center group-hover:bg-surface-container-low transition-colors">
                                <h3 className="font-display text-xl text-primary mb-1 group-hover:text-sage-green transition-colors">Coming Soon..</h3>

                            </div>
                        </a>
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/shop" className="border-b border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] pb-1 hover:text-sage-green hover:border-sage-green transition-colors">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Crafted With Care / The Ingredient Story */}
            <section className="relative py-8 md:py-10 bg-[#FFFAF3]/60">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="mb-16">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage-green mb-4 block">
                            The Philosophy
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
                            Crafted With Care
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative flex-1 group cursor-pointer overflow-hidden rounded-xl border border-soft-beige" onClick={() => setCraftedIndex(prev => (prev + 1) % craftedWithCareCards.length)}>
                            <img src={craftedWithCareCards[craftedIndex]?.mainImage} className="w-full h-[250px] md:h-[600px] object-cover transition-all duration-500" loading="lazy" />
                            <div className="absolute inset-0 flex items-center justify-end pr-6 md:pr-8 opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity duration-300">
                                <div className="bg-white/20 backdrop-blur-md rounded-full p-4 text-white transform scale-90 group-hover:scale-100 transition-transform border border-white/30">
                                    <ArrowRight size={32} />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-row gap-3 md:gap-6">
                            <div className="flex-1 relative overflow-hidden rounded-xl border border-soft-beige h-[250px] md:h-auto">
                                <img src={craftedWithCareCards[craftedIndex]?.subImage1} className="absolute inset-0 w-full h-full object-cover transition-all duration-500" loading="lazy" />
                            </div>
                            <div className="flex-1 relative overflow-hidden rounded-xl border border-soft-beige h-[250px] md:h-auto">
                                <img src={craftedWithCareCards[craftedIndex]?.subImage2} className="absolute inset-0 w-full h-full object-cover transition-all duration-500" loading="lazy" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                        <Link
                            to="/about"
                            className="interactive-card bg-[#66BB6A] text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-[#66BB6A]/80 border border-primary text-center min-w-[200px]"
                        >
                            Explore Our Story
                        </Link>

                        <Link
                            to="/shop"
                            className="interactive-card border border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-soft-beige hover:text-primary text-center min-w-[200px]"
                        >
                            Shop Collection
                        </Link>
                    </div>
                </div>
            </section>

            {/* Meet the Founder */}
            <section className="relative py-8 md:py-10 bg-cream-bg">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        {/* Text Content: Left on desktop, below on mobile */}
                        <div className="order-2 md:order-1 flex-1 text-center md:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage-green mb-4 block">Meet The Founder</span>
                            <h2 className="font-display text-4xl md:text-5xl text-primary leading-tight mb-6">
                                {craftedWithIntention?.heading || "Crafted with Intention"}
                            </h2>
                            <div className="text-sm text-on-surface-variant leading-relaxed space-y-4">
                                {craftedWithIntention?.description ? (
                                    <PortableText value={craftedWithIntention.description} />
                                ) : (
                                    <>
                                        <p>Welcome to Shrutibhyam. My journey began with a simple need: to find skincare that was truly pure, free from synthetic shortcuts, and rooted in the deep wisdom of Ayurveda.</p>
                                        <p>Every bar of soap, every formulation you see here is a labor of love—cold-processed by hand, cured slowly, and designed to honor your skin and well-being.</p>
                                    </>
                                )}
                            </div>
                            <div className="mt-8">
                                <Link to="/about" className="interactive-card inline-block bg-[#66BB6A] text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-surface-tint border border-primary">
                                    Read My Story
                                </Link>
                            </div>
                        </div>

                        {/* Image Content: Right on desktop, above on mobile */}
                        <div className="order-1 md:order-2 flex-1 w-full max-w-md mx-auto">
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-soft-beige shadow-lg">
                                <img src={craftedWithIntention?.image || IMG.Home} alt="Founder" className="w-full h-full object-cover" loading="lazy" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Testimonials */}
            <TestimonialsGallery communityData={communityData} />


            {/* Stats Section */}
            <section
                className="relative py-8 md:py-10 bg-fixed bg-center"
                style={{ backgroundImage: 'url(/backdrop1.webp)', backgroundSize: '100vw 100vh' }}
            >
                <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 text-primary-foreground"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                    >
                        {stats.map((s: any, idx: number) => (
                            <div key={idx} className="space-y-2">
                                <p className="font-display text-4xl md:text-5xl font-bold text-amber-500">{s.value}</p>
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bento: Yoga + Events + About Story */}
            <section
                className="relative py-8 md:py-10 bg-fixed bg-center"

            >
                <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[600px]">
                        <div className="md:col-span-6 relative overflow-hidden rounded-lg group flex flex-col justify-end p-8 border border-soft-beige min-h-[350px] interactive-card">
                            <img src={IMG.yoga2} alt="Yoga session" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/85 via-deep-charcoal/30 to-transparent group-hover:from-deep-charcoal/90 transition-colors" />
                            <div className="relative z-10 text-primary-foreground">
                                <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-[0.15em] mb-4 border border-white/30">Mind & Body</span>
                                <h3 className="font-display text-3xl mb-2">Join a Yoga Class</h3>
                                <p className="text-xs md:text-sm max-w-sm mb-6 opacity-90">Align your physical and spiritual self through guided, traditional practice.</p>
                                <Link to="/yoga" className="interactive-card inline-block bg-surface text-primary text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-soft-beige border border-soft-beige">BOOK NOW</Link>
                            </div>
                        </div>
                        <div className="md:col-span-6 relative overflow-hidden rounded-lg group flex flex-col justify-end p-8 border border-soft-beige min-h-[350px] interactive-card">
                            <img src={IMG.yoga3} alt="Sound Healing session" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/85 via-deep-charcoal/30 to-transparent group-hover:from-deep-charcoal/90 transition-colors" />
                            <div className="relative z-10 text-primary-foreground">
                                <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-[0.15em] mb-4 border border-white/30">Vibration & Healing</span>
                                <h3 className="font-display text-3xl mb-2">Sound Healing</h3>
                                <p className="text-xs md:text-sm max-w-sm mb-6 opacity-90">A quiet pause for the nervous system, created with Arahat Sound Dwellness.</p>
                                <Link to="/yoga" className="interactive-card inline-block bg-surface text-primary text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-soft-beige border border-soft-beige">BOOK NOW</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Section */}
            <section
                className="relative py-8 md:py-10 bg-fixed bg-center bg-[#FFFAF3]/60"

            >
                <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
                        <div className="space-y-6">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green block">Social Rituals</span>
                            <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">{socialRituals.heading}</h2>
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                                {socialRituals.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <a
                                    href={CONTACT_INFO.instagram2}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="interactive-card flex items-center justify-center gap-2 bg-transparent border border-primary text-primary text-xs font-semibold uppercase tracking-[0.12em] px-4 py-3 hover:bg-soft-beige hover:text-primary shrink-0"
                                >
                                    <Instagram size={16} /> Instagram
                                </a>
                                <a
                                    href={CONTACT_INFO.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="interactive-card flex items-center justify-center gap-2 bg-transparent border border-primary text-primary text-xs font-semibold uppercase tracking-[0.12em] px-4 py-3 hover:bg-soft-beige hover:text-primary shrink-0"
                                >
                                    <Facebook size={16} /> Facebook
                                </a>
                                <a
                                    href={CONTACT_INFO.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="interactive-card flex items-center justify-center gap-2 bg-transparent border border-primary text-primary text-xs font-semibold uppercase tracking-[0.12em] px-4 py-3 hover:bg-soft-beige hover:text-primary shrink-0"
                                >
                                    <Linkedin size={16} /> LinkedIn
                                </a>
                                <a
                                    href={CONTACT_INFO.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="interactive-card flex items-center justify-center gap-2 bg-transparent border border-primary text-primary text-xs font-semibold uppercase tracking-[0.12em] px-4 py-3 hover:bg-soft-beige hover:text-primary shrink-0"
                                >
                                    <Youtube size={16} /> YouTube
                                </a>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {socialRituals.images.map((imgData: any, i: number) => (
                                <a key={i} href={imgData.link} target="_blank" rel="noopener noreferrer" className="relative rounded-lg overflow-hidden border border-soft-beige bg-surface block aspect-square group">
                                    <img src={imgData.image} alt={`Instagram preview ${i + 1}`} className="w-full h-full object-cover opacity-95 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" loading="lazy" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
