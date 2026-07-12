import { useEffect } from "react";

interface UseOverlayOptions {
  /** Whether the overlay is currently open */
  isOpen: boolean;
  /** Called when the user presses Escape */
  onClose: () => void;
  /** If true, closes the overlay when the window resizes above 768px (for mobile drawers) */
  closeOnDesktopResize?: boolean;
}

/**
 * Shared hook for overlay/drawer/modal behaviour:
 * - Closes on Escape key
 * - Locks body scroll while open
 * - Optionally closes on desktop resize (for mobile-only drawers)
 */
export function useOverlay({ isOpen, onClose, closeOnDesktopResize = false }: UseOverlayOptions) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    if (closeOnDesktopResize) {
      window.addEventListener("resize", handleResize);
    }
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (closeOnDesktopResize) {
        window.removeEventListener("resize", handleResize);
      }
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, closeOnDesktopResize]);
}
