
import { useEffect, useRef, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "@tanstack/react-router";
import { scrollToTop } from "@/context/ScrollContext";

gsap.registerPlugin(ScrollTrigger);

export function SiteLayout({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
    const frame = requestAnimationFrame(() => scrollToTop());
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  useEffect(() => {
    if (!mainRef.current) return;

    ScrollTrigger.refresh();

    const sections = mainRef.current.querySelectorAll("section");
    const ctx = gsap.context(() => {
      sections.forEach((sec) => {
        gsap.fromTo(sec, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, [location.pathname]); // Re-run when path changes

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header />
      <main ref={mainRef} className="flex-1 overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
