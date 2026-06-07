
import { Link } from "@tanstack/react-router";
import { ShoppingBag, User, Menu, Search } from "lucide-react";

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
  return (
    <>
      <MarqueeBar />
      <header className="bg-surface border-b border-soft-beige/60 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-primary">
            Shrutibhyam
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
            <button aria-label="Search" className="hidden md:block hover:text-sage-green"><Search size={20} /></button>
            <button aria-label="Cart" className="hover:text-sage-green"><ShoppingBag size={20} /></button>
            <button aria-label="Account" className="hidden md:block hover:text-sage-green"><User size={20} /></button>
            <button aria-label="Menu" className="md:hidden"><Menu size={22} /></button>
          </div>
        </div>
      </header>
    </>
  );
}
