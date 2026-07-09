import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function TopLoader() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    let timeout: any;
    if (isLoading) {
      setVisible(true);
      // Small tick to ensure class transition starts after mounting
      timeout = setTimeout(() => {
        setAnimating(true);
      }, 50);
    } else {
      setAnimating(false);
      // Wait for complete animation to finish before unmounting
      timeout = setTimeout(() => {
        setVisible(false);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className="top-loader" aria-hidden="true">
      <div className={`top-loader__bar ${animating ? "loading" : "done"}`} />
    </div>
  );
}
