import type { SVGProps } from "react";

export function Partners() {
  const logos = (
    <div className="flex items-center gap-16 md:gap-28 shrink-0">
      {/* Capgemini Logo */}
      <div className="hover:text-primary transition-colors duration-300" title="Capgemini">
        <svg
          viewBox="0 0 160 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-9 w-auto"
        >
          {/* Stylized Spade Emblem */}
          <path
            d="M12 22C12 22 7 19 7 14C7 9.5 10.5 7 12 7C13.5 7 17 9.5 17 14C17 19 12 22 12 22Z"
            fill="currentColor"
            fillOpacity="0.25"
            strokeWidth="1.5"
          />
          <path d="M10 21L12 25L14 21" strokeWidth="1.5" />
          {/* Wordmark */}
          <text
            x="28"
            y="20"
            fontFamily="var(--font-body)"
            fontWeight="700"
            fontSize="14"
            letterSpacing="0.04em"
            fill="currentColor"
            stroke="none"
          >
            Capgemini
          </text>
        </svg>
      </div>

      {/* MSME Logo */}
      <div className="hover:text-primary transition-colors duration-300" title="Ministry of MSME">
        <svg
          viewBox="0 0 135 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-9 w-auto"
        >
          {/* Wheel/Gear Emblem */}
          <circle cx="16" cy="16" r="8" strokeWidth="1.5" />
          <path d="M16 4v4M16 24v4M4 16h4M24 16h4" strokeWidth="1.5" />
          <path d="M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M21.7 7.5l-2.8 2.8M7.5 21.7l2.8-2.8" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
          {/* Text */}
          <text
            x="34"
            y="18"
            fontFamily="var(--font-body)"
            fontWeight="800"
            fontSize="12.5"
            letterSpacing="0.08em"
            fill="currentColor"
            stroke="none"
          >
            MSME
          </text>
          <text
            x="34"
            y="25"
            fontFamily="var(--font-body)"
            fontWeight="500"
            fontSize="5.5"
            letterSpacing="0.04em"
            fill="currentColor"
            stroke="none"
          >
            GOVERNMENT OF INDIA
          </text>
        </svg>
      </div>

      {/* DLF Logo */}
      <div className="hover:text-primary transition-colors duration-300" title="DLF">
        <svg
          viewBox="0 0 100 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-9 w-auto"
        >
          {/* Three Slanted Buildings */}
          <path d="M5 22L11 7h4L9 22H5z" fill="currentColor" stroke="none" />
          <path d="M13 22l6-15h4l-6 15h-4z" fill="currentColor" stroke="none" />
          <path d="M21 22l6-15h4l-6 15h-4z" fill="currentColor" stroke="none" />
          {/* Wordmark */}
          <text
            x="36"
            y="20"
            fontFamily="var(--font-body)"
            fontWeight="800"
            fontSize="15.5"
            letterSpacing="0.05em"
            fill="currentColor"
            stroke="none"
          >
            DLF
          </text>
        </svg>
      </div>

      {/* Ministry of Ayush Logo */}
      <div className="hover:text-primary transition-colors duration-300" title="Ministry of Ayush">
        <svg
          viewBox="0 0 200 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className="h-10 w-auto"
        >
          {/* Ayush Lotus/Yoga Sun Circle */}
          <circle cx="16" cy="16" r="10" strokeDasharray="3 2" />
          <path d="M16 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="currentColor" stroke="none" />
          <path d="M11 21.5c2-3 8-3 10 0" />
          <path d="M16 11v6.5l-3.5 3M16 17.5l3.5 3" />
          <path d="M11.5 14.5c2.5-1 6.5-1 9 0" />
          {/* Text */}
          <text
            x="34"
            y="16"
            fontFamily="var(--font-body)"
            fontWeight="700"
            fontSize="10"
            letterSpacing="0.08em"
            fill="currentColor"
            stroke="none"
          >
            MINISTRY OF AYUSH
          </text>
          <text
            x="34"
            y="24"
            fontFamily="var(--font-body)"
            fontWeight="500"
            fontSize="6"
            letterSpacing="0.04em"
            fill="currentColor"
            stroke="none"
          >
            GOVERNMENT OF INDIA
          </text>
        </svg>
      </div>
      {/* Spacer to simulate gap-16 md:gap-28 at repeat boundary */}
      <div className="w-16 md:w-28 shrink-0" />
    </div>
  );

  return (
    <section className="bg-cream-bg py-12 border-b border-soft-beige overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-on-surface-variant/60 mb-8">
          Trusted Partners & Corporate Engagements
        </p>
      </div>

      <div className="w-full relative overflow-hidden flex">
        {/* Subtle fade effect on the edges of the marquee */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream-bg to-transparent z-10 pointer-events-none" />

        {/* Scrolling marquee container */}
        <div className="animate-marquee flex gap-0 text-primary/45 hover:[animation-play-state:paused] cursor-pointer">
          {logos}
          {logos}
        </div>
      </div>
    </section>
  );
}
