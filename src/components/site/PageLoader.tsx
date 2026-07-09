// A full-screen animated loader shown on first page load.
// Automatically fades out after ~3.5s and unmounts from DOM.
// Uses useEffect to safely access sessionStorage (SSR-safe).
import { useEffect, useState } from "react";

export function PageLoader() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    setShow(true);
    const t = setTimeout(() => setShow(false), 3600);
    return () => clearTimeout(t);
  }, []);

  if (show !== true) return null;

  return (
    <div className="page-loader" aria-hidden="true">
      {/* Brand logo wrap */}
      <div className="flex flex-col items-center gap-6 max-w-sm px-6 text-center animate-fadeIn">
        {/* Dedicated Logo in rounded card to display green-black details beautifully */}
        <div className="bg-[#fbf9f6] p-4 rounded-full shadow-xl border border-[#e8e2d6]/30 flex items-center justify-center w-24 h-24 md:w-28 md:h-28 animate-[pulse_2.2s_infinite_ease-in-out]">
          <img
            src="/logo.avif"
            alt="Shrutibhyam Dedicated Logo"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
        </div>

        {/* Brand Name Text */}
        <div className="space-y-1">
          <p className="page-loader__word">SHRUTIBHYAM</p>
          <p className="page-loader__sub">Wellness &amp; Ayurveda</p>
        </div>

        {/* Brand Core Taglines */}
        <div className="space-y-2 max-w-xs mt-1">
          <p 
            className="text-sm font-semibold italic text-[#e8e2d6] opacity-0"
            style={{
              animation: "loaderWordIn 1.1s ease-out 0.6s forwards",
            }}
          >
            "Rooted in Ayurvedic Purity"
          </p>
          <p 
            className="text-xs text-[#8ba88e]/80 leading-relaxed font-medium tracking-wide opacity-0"
            style={{
              animation: "loaderWordIn 1.1s ease-out 1.2s forwards",
            }}
          >
            Honoring ancestral heritage and clean living. Slowly crafted from the earth for your wellness ritual.
          </p>
        </div>

        {/* Progress Bar Track */}
        <div className="page-loader__bar-track mt-2">
          <div className="page-loader__bar-fill" />
        </div>

        {/* Calming text status */}
        <span 
          className="text-[10px] uppercase tracking-[0.25em] text-[#8ba88e]/70 font-semibold opacity-0"
          style={{
            animation: "loaderWordIn 0.8s ease-out 1.8s forwards, pulse 2s infinite 2.6s",
          }}
        >
          Nourishing Soul...
        </span>
      </div>
    </div>
  );
}
