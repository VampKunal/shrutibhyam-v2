// A full-screen animated loader shown on first page load.
// Automatically fades out after ~2.9s and unmounts from DOM.
// Uses useEffect to safely access sessionStorage (SSR-safe).
import { useEffect, useState } from "react";

const LOADING_STEPS = [
  "Sourcing raw Ayurvedic botanicals...",
  "Infusing mindful slow-beauty rituals...",
  "Preparing your holistic wellness space...",
];

export function PageLoader() {
  const [show, setShow] = useState<boolean | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem("sb_loader_shown");
    if (!seen) {
      sessionStorage.setItem("sb_loader_shown", "1");
      setShow(true);

      // Auto-unmount after animation (2.2s delay + 0.6s fade + 150ms buffer)
      const t = setTimeout(() => setShow(false), 2950);

      // Cycle loading steps text
      const stepInterval = setInterval(() => {
        setStepIndex((prev) => Math.min(prev + 1, LOADING_STEPS.length - 1));
      }, 900);

      return () => {
        clearTimeout(t);
        clearInterval(stepInterval);
      };
    } else {
      setShow(false);
    }
  }, []);

  // Render nothing until client-side check completes (avoids hydration mismatch)
  if (show !== true) return null;

  return (
    <div className="page-loader" aria-hidden="true">
      {/* Brand Logo Header */}
      <div className="page-loader__logo-container flex flex-col items-center gap-3">
        <img
          src="/logo.avif"
          alt="Shrutibhyam Logo"
          className="h-16 w-auto object-contain invert brightness-200 opacity-90 animate-pulse duration-1000"
          style={{ filter: "invert(1) brightness(2)" }}
        />
      </div>

      {/* Animated Leaf SVG */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80"
      >
        {/* Outer leaf petal */}
        <path
          className="page-loader__leaf"
          d="M36 8 C52 8, 64 20, 64 36 C64 52, 52 64, 36 64 C36 64, 8 52, 8 36 C8 20, 20 8, 36 8 Z"
          stroke="#8ba88e"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Inner vein left */}
        <path
          className="page-loader__leaf"
          d="M36 64 C36 48, 28 32, 20 20"
          stroke="#c9daca"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          style={{ animationDelay: "0.55s" }}
        />
        {/* Inner vein right */}
        <path
          className="page-loader__leaf"
          d="M36 52 C40 42, 50 34, 58 28"
          stroke="#c9daca"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          style={{ animationDelay: "0.75s" }}
        />
        {/* Center stem */}
        <path
          className="page-loader__leaf"
          d="M36 8 L36 64"
          stroke="#6d8f72"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          style={{ animationDelay: "0.35s" }}
        />
      </svg>

      {/* Brand Typography */}
      <div className="text-center space-y-1">
        <h2 className="page-loader__word tracking-[0.3em] font-bold text-cream-bg">
          SHRUTIBHYAM
        </h2>
        <p className="page-loader__sub text-sage-green font-medium">
          Wellness &amp; Ayurveda
        </p>
      </div>

      {/* Progress Track & Changing Loading Messages */}
      <div className="flex flex-col items-center gap-3 mt-2">
        <div className="page-loader__bar-track">
          <div className="page-loader__bar-fill" />
        </div>
        <p className="text-[10px] md:text-xs text-soft-beige/70 font-medium tracking-[0.1em] h-5 transition-all duration-500 ease-in-out">
          {LOADING_STEPS[stepIndex]}
        </p>
      </div>
    </div>
  );
}
