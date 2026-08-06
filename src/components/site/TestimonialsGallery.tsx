import { useState, useCallback, useRef } from "react";
import { Quote, ChevronLeft, ChevronRight, X, MessageSquare, Heart, Maximize2 } from "lucide-react";
import { HOME_TESTIMONIALS, SCREENSHOT_TESTIMONIALS } from "@/constant";
import { useOverlay } from "@/hooks/useOverlay";
import { StarRating } from "@/components/ui/StarRating";

type TabType = "text" | "screenshots";

interface CommunityExperiencesData {
  heading?: string;
  subheading?: string;
  kindWords?: { quote: string; name: string; role: string; rating?: number }[];
  verifiedReviews?: string[];
}

/** Ensures a list is long enough to fill a marquee loop smoothly */
function ensureMinLength<T>(arr: T[], min = 8): T[] {
  if (arr.length === 0) return arr;
  const result = [...arr];
  while (result.length < min) result.push(...arr);
  return result;
}

export function TestimonialsGallery({ communityData }: { communityData?: CommunityExperiencesData | null }) {
  const [activeTab, setActiveTab] = useState<TabType>("text");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Use Sanity data if available, else fallback to constants
  const rawTextReviews = communityData?.kindWords?.length ? communityData.kindWords : HOME_TESTIMONIALS;
  const rawScreenshots = communityData?.verifiedReviews?.length ? communityData.verifiedReviews : SCREENSHOT_TESTIMONIALS;
  const sectionHeading = communityData?.heading || "Community Experiences";
  const sectionSubheading = communityData?.subheading || "Real stories of alignment, skincare transformations, and mindful living from those who journey with us.";

  // Pad arrays so the CSS animation has enough items to loop seamlessly
  const textReviews = ensureMinLength(rawTextReviews, 8);
  // For screenshots use the raw array (not padded) for lightbox index accuracy
  const screenshots = rawScreenshots;

  // Pad screenshots for display — duplicate for seamless loop
  const screenshotLoop = ensureMinLength(rawScreenshots, 8);
  const half = Math.ceil(screenshotLoop.length / 2);
  const row1 = screenshotLoop.slice(0, half);
  const row2 = screenshotLoop.slice(half);

  // ── Keyboard nav for lightbox ──────────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % screenshots.length : null));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + screenshots.length) % screenshots.length : null
        );
      }
    },
    [lightboxIndex, screenshots.length]
  );

  useOverlay({ isOpen: lightboxIndex !== null, onClose: () => setLightboxIndex(null) });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + screenshots.length) % screenshots.length : null
    );
  };
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % screenshots.length : null));
  };

  const handleScreenshotClick = (src: string) => {
    const idx = rawScreenshots.indexOf(src);
    if (idx !== -1) setLightboxIndex(idx);
  };

  // ── Drag-to-scroll helpers ─────────────────────────────────────
  function useDragScroll() {
    const ref = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const moved = useRef(false);

    const onMouseDown = (e: React.MouseEvent) => {
      if (!ref.current) return;
      isDragging.current = true;
      moved.current = false;
      startX.current = e.pageX - ref.current.offsetLeft;
      scrollLeft.current = ref.current.scrollLeft;
      ref.current.style.cursor = "grabbing";
      ref.current.style.animationPlayState = "paused";
    };
    const onMouseMove = (e: React.MouseEvent) => {
      if (!isDragging.current || !ref.current) return;
      e.preventDefault();
      moved.current = true;
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      ref.current.scrollLeft = scrollLeft.current - walk;
    };
    const onMouseUp = () => {
      if (!ref.current) return;
      isDragging.current = false;
      ref.current.style.cursor = "grab";
      ref.current.style.animationPlayState = "";
    };
    const onMouseLeave = () => {
      if (!ref.current || !isDragging.current) return;
      isDragging.current = false;
      ref.current.style.cursor = "grab";
      ref.current.style.animationPlayState = "";
    };

    return { ref, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, moved };
  }

  const textDrag = useDragScroll();
  const row1Drag = useDragScroll();
  const row2Drag = useDragScroll();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/flowerdrop.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 10%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4 px-4">
          <Quote className="text-sage-green mx-auto mb-2 opacity-80" size={40} strokeWidth={1.5} />
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">
            {sectionHeading}
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            {sectionSubheading}
          </p>
        </div>

        {/* Tab Switcher */}
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

        {/* ── Kind Words: flat looping marquee ─────────────────── */}
        {activeTab === "text" && (
          <div
            ref={textDrag.ref}
            className="w-full overflow-x-auto no-scrollbar py-4 select-none cursor-grab"
            onMouseDown={textDrag.onMouseDown}
            onMouseMove={textDrag.onMouseMove}
            onMouseUp={textDrag.onMouseUp}
            onMouseLeave={textDrag.onMouseLeave}
          >
            {/* Duplicate the full padded array twice for seamless loop */}
            <div className="animate-marquee-slow flex gap-6 w-max hover:[animation-play-state:paused]">
              {[...textReviews, ...textReviews].map((t: any, idx: number) => (
                <div
                  key={idx}
                  className="w-[320px] md:w-[380px] flex-shrink-0 bg-cream-bg p-8 border border-soft-beige rounded-xl shadow-sm flex flex-col justify-between whitespace-normal"
                >
                  <div>
                    <StarRating rating={t.rating ?? 5} />
                    <p className="text-sm md:text-base italic text-on-surface-variant mb-6 leading-relaxed mt-3">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
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
          </div>
        )}

        {/* ── Verified Reviews: two draggable rows ─────────────── */}
        {activeTab === "screenshots" && (
          <div className="flex flex-col gap-6 w-full overflow-hidden py-4 select-none">
            {/* Row 1 — left-scrolling */}
            <div
              ref={row1Drag.ref}
              className="overflow-x-auto no-scrollbar cursor-grab"
              onMouseDown={row1Drag.onMouseDown}
              onMouseMove={row1Drag.onMouseMove}
              onMouseUp={row1Drag.onMouseUp}
              onMouseLeave={row1Drag.onMouseLeave}
            >
              <div className="animate-marquee-slow flex gap-6 w-max hover:[animation-play-state:paused]">
                {[...row1, ...row1].map((src, idx) => (
                  <div
                    key={idx}
                    onClick={() => !row1Drag.moved.current && handleScreenshotClick(src)}
                    className="interactive-card flex-shrink-0 relative group overflow-hidden rounded-xl border border-soft-beige shadow-sm cursor-pointer"
                  >
                    <img
                      src={src}
                      alt={`Customer review ${(idx % row1.length) + 1}`}
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
            </div>

            {/* Row 2 — right-scrolling */}
            {row2.length > 0 && (
              <div
                ref={row2Drag.ref}
                className="overflow-x-auto no-scrollbar cursor-grab"
                onMouseDown={row2Drag.onMouseDown}
                onMouseMove={row2Drag.onMouseMove}
                onMouseUp={row2Drag.onMouseUp}
                onMouseLeave={row2Drag.onMouseLeave}
              >
                <div className="animate-marquee-slow [animation-direction:reverse] flex gap-6 w-max hover:[animation-play-state:paused]">
                  {[...row2, ...row2].map((src, idx) => (
                    <div
                      key={idx}
                      onClick={() => !row2Drag.moved.current && handleScreenshotClick(src)}
                      className="interactive-card flex-shrink-0 relative group overflow-hidden rounded-xl border border-soft-beige shadow-sm cursor-pointer"
                    >
                      <img
                        src={src}
                        alt={`Customer review ${(idx % row2.length) + row1.length + 1}`}
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
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
          <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center z-[110]">
            <span className="text-white/60 text-xs uppercase tracking-[0.15em] font-semibold">
              Review {lightboxIndex + 1} of {screenshots.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 p-4 rounded-full transition-all z-[110]"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-full max-h-[80vh] flex items-center justify-center p-2"
          >
            <img
              src={screenshots[lightboxIndex]}
              alt={`Zoomed customer testimonial screenshot ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10 select-none animate-scaleIn"
            />
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 p-4 rounded-full transition-all z-[110]"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-6 text-white/40 text-[10px] tracking-[0.12em] uppercase font-semibold">
            Use Left/Right arrows to navigate • ESC to exit
          </div>
        </div>
      )}
    </section>
  );
}
