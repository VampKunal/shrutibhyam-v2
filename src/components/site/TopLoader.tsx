import { useEffect, useState } from "react";
import { useRouterState, useLocation } from "@tanstack/react-router";

export function TopLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <TopLoaderInner />;
}

function TopLoaderInner() {
  const routerState = useRouterState();
  const location = useLocation();
  const isPending = routerState.status === "pending";
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  // 1. Listen to TanStack Router's loading status (e.g. loader functions fetching WooCommerce products)
  useEffect(() => {
    let timer: any;
    let progressTimer: any;

    if (isPending) {
      setVisible(true);
      setProgress((prev) => Math.max(prev, 15));

      const tick = () => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          const diff = Math.random() * 8;
          return Math.min(prev + diff, 90);
        });
        progressTimer = setTimeout(tick, 150 + Math.random() * 250);
      };
      progressTimer = setTimeout(tick, 50);
    } else {
      // Completed loading
      setProgress(100);
      timer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(progressTimer);
    };
  }, [isPending]);

  // 2. Also trigger a fast, satisfying top-bar sweep on any route transition (even if instant/cached)
  useEffect(() => {
    // Prevent double triggering if it's already pending
    if (isPending) return;

    setVisible(true);
    setProgress(35);

    const completeTimer = setTimeout(() => {
      setProgress(100);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(hideTimer);
    }, 150);

    return () => clearTimeout(completeTimer);
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none"
      style={{
        height: "3.5px",
        background: "rgba(51, 69, 55, 0.05)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #334537 0%, #506354 50%, #8ba88e 100%)",
          boxShadow: "0 0 8px rgba(51,69,55,0.5), 0 0 3px rgba(51,69,55,0.3)",
          transition: progress === 100 ? "width 0.3s ease-out, opacity 0.3s ease-out" : "width 0.4s cubic-bezier(0.1, 0.8, 0.3, 1)",
        }}
      />
    </div>
  );
}
