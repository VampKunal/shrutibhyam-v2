import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { getMultiProductCheckoutUrl } from "@/lib/woocommerce";
import { getCheckoutLoginUrl } from "@/lib/api/woocommerce.functions";
import { X, Minus, Plus, Trash2, ShoppingBag, LogIn, UserCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useOverlay } from "@/hooks/useOverlay";
import { PriceDisplay } from "@/components/ui/PriceDisplay";

export function CartDrawer() {
  const { cartItems, isOpen, toggleCart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { user, setLoginOpen } = useAuth();
  // GUEST_CHECKOUT: const [showGuestPrompt, setShowGuestPrompt] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useOverlay({ isOpen, onClose: () => toggleCart(false) });

  const proceedToCheckout = async () => {
    setIsNavigating(true);
    const checkoutItems = cartItems.map((item) => ({
      wooId: item.product.wooId,
      quantity: item.quantity,
    }));
    
    // For single item fallback if length is 1, standard woo behavior
    if (checkoutItems.length === 1) {
       const url = getMultiProductCheckoutUrl(checkoutItems);
       if (!user) {
         window.location.href = url;
         return;
       }
    }

    const cartQuery = checkoutItems.map(item => `${item.wooId}:${item.quantity}`).join(",");

    try {
      if (user) {
        // Securely bridge auth session
        const res = await getCheckoutLoginUrl({ data: { cartQuery } });
        window.location.href = res.url;
      } else {
        // Guest direct
        window.location.href = getMultiProductCheckoutUrl(checkoutItems);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      window.location.href = getMultiProductCheckoutUrl(checkoutItems);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      // GUEST_CHECKOUT: Prompt disabled — show login modal directly
      // To re-enable guest checkout, replace with: setShowGuestPrompt(true);
      setLoginOpen(true);
      return;
    }
    proceedToCheckout();
  };

  // GUEST_CHECKOUT:
  // const handleSignInThenCheckout = () => {
  //   setShowGuestPrompt(false);
  //   setLoginOpen(true);
  // };

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${
        isOpen ? "visible" : "invisibleDelay"
      }`}
      style={{
        transitionProperty: "visibility",
      }}
    >
      {/* Backdrop Overlay */}
      <div
        onClick={() => toggleCart(false)}
        className={`absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-full sm:max-w-md bg-cream-bg border-l border-soft-beige shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <h2 className="font-display text-2xl text-primary flex items-center gap-2">
            <ShoppingBag size={22} className="text-sage-green" /> Shopping Bag
          </h2>
          <button
            onClick={() => toggleCart(false)}
            className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-soft-beige transition-colors"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-soft-beige flex items-center justify-center text-on-surface-variant">
                <ShoppingBag size={30} />
              </div>
              <div>
                <h3 className="font-display text-lg text-primary">Your bag is empty</h3>
                <p className="text-sm text-on-surface-variant mt-1">
                  Explore our pure Ayurvedic collection and add some rituals to your routine.
                </p>
              </div>
              <button
                onClick={() => toggleCart(false)}
                className="bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-surface-tint transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.slug}
                className="flex items-center gap-4 pb-6 last:border-0 last:pb-0"
              >
                <div className="w-20 h-20 bg-cream-bg border border-soft-beige rounded overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-base text-primary truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant truncate">
                    {item.product.subtitle}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <PriceDisplay price={item.product.price} regularPrice={item.product.regularPrice} onSale={item.product.onSale} />
                  </div>

                  {/* Quantity and Remove controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-soft-beige rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                        className="p-1.5 hover:bg-soft-beige transition-colors text-on-surface-variant"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                        className="p-1.5 hover:bg-soft-beige transition-colors text-on-surface-variant"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.slug)}
                      className="text-on-surface-variant hover:text-destructive p-1.5 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-on-surface-variant">Subtotal</span>
              <span className="font-display text-xl text-primary font-semibold">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
              Shipping & taxes calculated at checkout. Rooted in purity.
            </p>
            <div className="space-y-3">
              {/* GUEST_CHECKOUT: Prompt disabled. To re-enable:
                - Restore: const [showGuestPrompt, setShowGuestPrompt] = useState(false);
                - Restore: setShowGuestPrompt(true) in handleCheckout
                - Restore the showGuestPrompt && !user block below
              */}
              <button
                id="cart-checkout-btn"
                onClick={handleCheckout}
                disabled={isNavigating}
                className="w-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] py-4 hover:bg-surface-tint transition-colors flex items-center justify-center cursor-pointer animate-fade-in disabled:opacity-70"
              >
                {isNavigating ? "Redirecting..." : (user ? "Proceed to Checkout" : "Sign In to Checkout")}
              </button>
              <button
                onClick={() => { toggleCart(false); /* GUEST_CHECKOUT: setShowGuestPrompt(false); */ }}
                className="w-full border border-soft-beige text-primary text-xs font-semibold uppercase tracking-[0.15em] py-4 hover:bg-cream-bg transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
