interface PriceDisplayProps {
  price: number;
  regularPrice?: number;
  onSale?: boolean;
  /** Size variant. Default "sm". */
  variant?: "xs" | "sm" | "lg";
}

const sizeClasses = {
  xs: { price: "text-xs font-semibold", regular: "text-[10px]" },
  sm: { price: "text-sm font-semibold", regular: "text-xs" },
  lg: { price: "text-3xl font-display font-bold", regular: "text-lg" },
};

/**
 * Consistent price display with sale price / strikethrough formatting.
 */
export function PriceDisplay({
  price,
  regularPrice,
  onSale,
  variant = "sm",
}: PriceDisplayProps) {
  const classes = sizeClasses[variant];
  const showSale = onSale && regularPrice && regularPrice > price;

  return (
    <div className="flex items-baseline gap-2">
      <span className={`${classes.price} text-deep-charcoal`}>
        ₹{price.toLocaleString("en-IN")}
      </span>
      {showSale && (
        <span className={`${classes.regular} text-on-surface-variant/50 line-through`}>
          ₹{regularPrice.toLocaleString("en-IN")}
        </span>
      )}
    </div>
  );
}
