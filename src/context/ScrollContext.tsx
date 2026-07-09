import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import Lenis from "@studio-freight/lenis";

const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  lenisRef.current?.scrollTo(0, { immediate: true });
}

const ScrollContext = createContext<{ ready: boolean }>({ ready: false });

export function useScroll() {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const readyRef = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    readyRef.current = true;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      readyRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;
    scrollToTop();
    const frame = requestAnimationFrame(() => scrollToTop());
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  return (
    <ScrollContext.Provider value={{ ready: readyRef.current }}>
      {children}
    </ScrollContext.Provider>
  );
}
