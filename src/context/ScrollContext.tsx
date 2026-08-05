import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
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
  const routerState = useRouterState();
  const prevPathRef = useRef(routerState.location.pathname);
  const readyRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Prevent TanStack Router's default Link behavior from immediately scrolling to (0,0)
    // before the new page has loaded, which causes the screen to flash or jump.
    // Our own scrollToTop function relies on scrollTop and Lenis, so ignoring this is safe.
    const originalScrollTo = window.scrollTo;
    window.scrollTo = function (...args: any[]) {
      const isScrollToTop = 
        (args.length === 2 && args[0] === 0 && args[1] === 0) ||
        (args.length === 1 && args[0] && args[0].top === 0 && args[0].left === 0) ||
        (args.length === 1 && args[0] && args[0].top === 0 && args[0].left === undefined);
        
      if (isScrollToTop) return;
      
      return originalScrollTo.apply(window, args as any);
    };

    lenisRef.current = lenis;
    readyRef.current = true;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.scrollTo = originalScrollTo;
      lenis.destroy();
      lenisRef.current = null;
      readyRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Only scroll to top when navigation has fully completed (status is idle)
    if (routerState.status === 'idle') {
      if (prevPathRef.current !== routerState.location.pathname) {
        prevPathRef.current = routerState.location.pathname;
        scrollToTop();
        const frame = requestAnimationFrame(() => scrollToTop());
        return () => cancelAnimationFrame(frame);
      }
    }
  }, [routerState.status, routerState.location.pathname]);

  return (
    <ScrollContext.Provider value={{ ready: readyRef.current }}>
      {children}
    </ScrollContext.Provider>
  );
}
