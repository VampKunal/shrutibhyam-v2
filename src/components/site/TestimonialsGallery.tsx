import { useState, useCallback } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, X, MessageSquare, Heart, Maximize2 } from "lucide-react";
import { HOME_TESTIMONIALS, SCREENSHOT_TESTIMONIALS } from "@/constant";
import { useOverlay } from "@/hooks/useOverlay";
import { StarRating } from "@/components/ui/StarRating";

type TabType = "text" | "screenshots";

export function TestimonialsGallery() {
  const [activeTab, setActiveTab] = useState<TabType>("text");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Divide screenshots dynamically into two groups for two scrolling rows
  const half = Math.ceil(SCREENSHOT_TESTIMONIALS.length / 2);
  const row1Screenshots = SCREENSHOT_TESTIMONIALS.slice(0, half);
  const row2Screenshots = SCREENSHOT_TESTIMONIALS.slice(half);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % SCREENSHOT_TESTIMONIALS.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + SCREENSHOT_TESTIMONIALS.length) % SCREENSHOT_TESTIMONIALS.length
            : null
        );
      }
    },
    [lightboxIndex]
  );

  useOverlay({
    isOpen: lightboxIndex !== null,
    onClose: () => setLightboxIndex(null),
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + SCREENSHOT_TESTIMONIALS.length) % SCREENSHOT_TESTIMONIALS.length
        : null
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % SCREENSHOT_TESTIMONIALS.length : null
    );
  };

  // Maps a clicked marquee image to its index in the original SCREENSHOT_TESTIMONIALS array
  const handleScreenshotClick = (src: string) => {
    const originalIndex = SCREENSHOT_TESTIMONIALS.indexOf(src);
    if (originalIndex !== -1) {
      setLightboxIndex(originalIndex);
    }
  };

  return (
    <section
      className="relative py-24 overflow-hidden bg-fixed bg-center"
      style={{
        backgroundImage: "url('/flowerdrop.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center 10%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4 px-4">
          <Quote className="text-sage-green mx-auto mb-2 opacity-80" size={40} strokeWidth={1.5} />
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">
            Community Experiences
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Real stories of alignment, skincare transformations, and mindful living from those who journey with us.
          </p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="flex justify-center mb-12 px-4">
          <div className="bg-surface border border-soft-beige p-1.5 rounded-full flex gap-2 shadow-sm">
            <button
              onClick={() => setActiveTab("text")}
              className={`interactive-card flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] ${activeTab === "text"
                ? "bg-primary text-primary-foreground shadow-sm border border-primary"
                : "text-on-surface-variant hover:text-primary hover:bg-cream-bg border border-transparent"
                }`}
            >
              <Heart size={14} className={activeTab === "text" ? "fill-current" : ""} />
              Kind Words
            </button>
            <button
              onClick={() => setActiveTab("screenshots")}
              className={`interactive-card flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] ${activeTab === "screenshots"
                ? "bg-primary text-primary-foreground shadow-sm border border-primary"
                : "text-on-surface-variant hover:text-primary hover:bg-cream-bg border border-transparent"
                }`}
            >
              <MessageSquare size={14} />
              Verified Reviews
            </button>
          </div>
        </div>

        {/* Tab Content: Text Reviews Marquee */}
        {activeTab === "text" && (
          <div className="w-full overflow-hidden py-4 select-none">
            <div className="animate-marquee-slow flex gap-6 hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
              {Array.from({ length: 4 }).map((_, loopIdx) => (
                <div key={loopIdx} className="flex gap-6">
                  {HOME_TESTIMONIALS.map((t, idx) => (
                    <div
                      key={`${loopIdx}-${idx}`}
                      className="interactive-card w-[320px] md:w-[380px] flex-shrink-0 bg-cream-bg p-8 border border-soft-beige rounded-xl shadow-sm flex flex-col justify-between whitespace-normal"
                    >
                      <div>
                        <StarRating rating={5} />
                        <p className="text-sm md:text-base italic text-on-surface-variant mb-6 leading-relaxed">
                          "{t.quote}"
                        </p>
                      </div>
                      <div className=" pt-4 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                            {t.name}
                          </h4>
                          <p className="text-[11px] text-outline mt-0.5">{t.role}</p>
                        </div>
                        <span className="bg-sage-green/10 text-sage-green text-[9px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded border border-sage-green/20">
                          Verified
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Screenshot Marquee (Two Rows Moving in Opposite Directions) */}
        {activeTab === "screenshots" && (
          <div className="flex flex-col gap-6 w-full overflow-hidden py-4 select-none">
            {/* Row 1: Left-scrolling marquee */}
            <div className="animate-marquee-slow flex gap-6 hover:[animation-play-state:paused]">
              {Array.from({ length: 3 }).map((_, loopIdx) => (
                <div key={loopIdx} className="flex gap-6">
                  {row1Screenshots.map((src, idx) => (
                    <div
                      key={`${loopIdx}-${idx}`}
                      onClick={() => handleScreenshotClick(src)}
                      className="interactive-card flex-shrink-0 relative group overflow-hidden rounded-xl border border-soft-beige shadow-sm cursor-pointer"
                    >
                      <img
                        src={src}
                        alt={`Customer review ${idx + 1}`}
                        loading="lazy"
                        className="h-64 md:h-72 w-auto object-contain bg-cream-bg pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-surface/90 backdrop-blur text-primary text-[10px] font-bold uppercase tracking-[0.12em] px-3.5 py-2 rounded-full shadow-sm flex items-center gap-1.5 border border-soft-beige">
                          <Maximize2 size={10} />
                          Zoom
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Row 2: Right-scrolling marquee (reversed) */}
            <div className="animate-marquee-slow [animation-direction:reverse] flex gap-6 hover:[animation-play-state:paused]">
              {Array.from({ length: 3 }).map((_, loopIdx) => (
                <div key={loopIdx} className="flex gap-6">
                  {row2Screenshots.map((src, idx) => (
                    <div
                      key={`${loopIdx}-${idx}`}
                      onClick={() => handleScreenshotClick(src)}
                      className="interactive-card flex-shrink-0 relative group overflow-hidden rounded-xl border border-soft-beige shadow-sm cursor-pointer"
                    >
                      <img
                        src={src}
                        alt={`Customer review ${idx + 16}`}
                        loading="lazy"
                        className="h-64 md:h-72 w-auto object-contain bg-cream-bg pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-surface/90 backdrop-blur text-primary text-[10px] font-bold uppercase tracking-[0.12em] px-3.5 py-2 rounded-full shadow-sm flex items-center gap-1.5 border border-soft-beige">
                          <Maximize2 size={10} />
                          Zoom
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
          {/* Top Controls */}
          <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center z-[110]">
            <span className="text-white/60 text-xs uppercase tracking-[0.15em] font-semibold">
              Review {lightboxIndex + 1} of {SCREENSHOT_TESTIMONIALS.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 p-4 rounded-full transition-all z-[110]"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-full max-h-[80vh] flex items-center justify-center p-2"
          >
            <img
              src={SCREENSHOT_TESTIMONIALS[lightboxIndex]}
              alt={`Zoomed customer testimonial screenshot ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10 select-none animate-scaleIn"
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 p-4 rounded-full transition-all z-[110]"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Bottom helper */}
          <div className="absolute bottom-6 text-white/40 text-[10px] tracking-[0.12em] uppercase font-semibold">
            Use Left/Right arrows to navigate • ESC to exit
          </div>
        </div>
      )}
    </section>
  );
}
