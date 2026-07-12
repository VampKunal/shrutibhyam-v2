import { type RefObject } from "react";

/**
 * Scroll a container element left by a fixed amount.
 */
export function scrollContainerLeft(ref: RefObject<HTMLElement | null>) {
  if (ref.current) ref.current.scrollBy({ left: -320, behavior: "smooth" });
}

/**
 * Scroll a container element right by a fixed amount.
 */
export function scrollContainerRight(ref: RefObject<HTMLElement | null>) {
  if (ref.current) ref.current.scrollBy({ left: 320, behavior: "smooth" });
}
