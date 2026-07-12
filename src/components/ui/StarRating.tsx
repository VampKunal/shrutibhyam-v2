import { Star } from "lucide-react";

interface StarRatingProps {
  /** Rating value (0-5). Fractional values round to nearest integer for fill. */
  rating: number;
  /** Icon size in pixels. Default 14. */
  size?: number;
  /** Colour class applied to filled stars. Default "text-sage-green". */
  colorClass?: string;
  /** If true, renders interactive stars (hover + click). */
  interactive?: boolean;
  /** Called with the new rating when the user clicks a star (interactive mode only). */
  onChange?: (rating: number) => void;
  /** Currently hovered rating (interactive mode only). Managed externally for flexibility. */
  hoverRating?: number | null;
  /** Called with the hovered star value or null (interactive mode only). */
  onHoverChange?: (rating: number | null) => void;
}

/**
 * Reusable star rating display.
 * Supports read-only display and interactive (clickable) modes.
 */
export function StarRating({
  rating,
  size = 14,
  colorClass = "text-sage-green",
  interactive = false,
  onChange,
  hoverRating,
  onHoverChange,
}: StarRatingProps) {
  return (
    <div className={`flex ${interactive ? "gap-2" : "gap-0"} ${colorClass}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const starVal = i + 1;
        const active = interactive
          ? (hoverRating !== null && hoverRating !== undefined ? hoverRating >= starVal : rating >= starVal)
          : i < Math.round(rating);

        if (interactive) {
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange?.(starVal)}
              onMouseEnter={() => onHoverChange?.(starVal)}
              onMouseLeave={() => onHoverChange?.(null)}
              className="cursor-pointer transition-transform hover:scale-110"
            >
              <Star
                size={size}
                fill={active ? "currentColor" : "none"}
                className={active ? colorClass : "text-soft-beige"}
                strokeWidth={active ? 0 : 2}
              />
            </button>
          );
        }

        return (
          <Star
            key={i}
            size={size}
            fill={active ? "currentColor" : "none"}
            strokeWidth={active ? 0 : 1.5}
          />
        );
      })}
    </div>
  );
}
