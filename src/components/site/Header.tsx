
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/yoga", label: "Yoga" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
] as const;

export function MarqueeBar() {
  const msg = "Sign up to get 10% off on your first order  |  Free shipping on all orders above ₹399/-";
  return (
    <div className="bg-soft-beige py-2 border-b border-sage-green/20 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            {Array.from({ length: 3 }).map((_, j) => (
              <span key={j} className="text-[11px] md:text-[12px] font-semibold tracking-[0.1em] uppercase text-deep-charcoal">
                {msg}<span className="ml-12 inline-block w-1 h-1 rounded-full bg-sage-green align-middle" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const { toggleCart, cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu on Escape key press or resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", handleResize);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <MarqueeBar />
      <header className="bg-surface border-b border-soft-beige/60 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.avif"
              alt="Shrutibhyam"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-semibold uppercase tracking-[0.08em] text-on-surface-variant hover:text-sage-green transition-colors"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-primary">
            <button 
              aria-label="Cart" 
              onClick={() => toggleCart(true)} 
              className="hover:text-sage-green relative p-1.5"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-sage-green text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button aria-label="Menu" onClick={() => setIsMenuOpen(true)} className="md:hidden hover:text-sage-green"><Menu size={22} /></button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-visibility duration-300 md:hidden ${
          isMenuOpen ? "visible" : "invisibleDelay"
        }`}
        style={{
          transitionProperty: "visibility",
        }}
      >
        {/* Backdrop Overlay */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-[280px] bg-cream-bg border-r border-soft-beige shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="p-6 border-b border-soft-beige flex items-center justify-between">
            <span className="font-display text-xl text-primary font-bold">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-soft-beige transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-6 flex flex-col gap-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-semibold uppercase tracking-[0.1em] text-on-surface-variant hover:text-sage-green transition-colors"
                activeProps={{ className: "text-primary font-bold" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Footer Contact Info */}
          <div className="p-6 border-t border-soft-beige bg-white/50 text-xs text-on-surface-variant space-y-2">
            <p className="font-semibold text-primary">Shrutibhyam Wellness</p>
            <p>108 Ayurvedic Lane, Rishikesh, India</p>
            <p>namaste@shrutibhyam.com</p>
          </div>
        </div>
      </div>
    </>
  );
}
