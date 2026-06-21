
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-cream-bg border-t border-soft-beige mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="font-display text-2xl text-primary mb-3">Shrutibhyam</div>
          <p className="text-sm text-deep-charcoal/80 max-w-xs">
            Nurturing holistic well-being through ancient Ayurvedic wisdom and mindful movement.
          </p>
        </div>
        <FooterCol title="Explore" items={[["About Us","/about"],["Shop","/shop"],["Yoga","/yoga"],["Events","/events"]]} />
        <FooterCol title="Support" items={[["Sustainability","#"],["Shipping & Returns","#"],["Contact Us","/contact"]]} />
        <FooterCol title="Legal" items={[["Privacy Policy","#"],["Terms of Service","#"],["Press","#"]]} />
        <div className="md:col-span-4 pt-8 border-t border-soft-beige/70 text-xs text-deep-charcoal/60">
          © 2024 Shrutibhyam Wellness. Rooted in Ayurvedic Purity.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <nav className="flex flex-col gap-3">
      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-1">{title}</div>
      {items.map(([label, href]) => (
        <Link
          key={label}
          to={href}
          className="text-sm text-on-surface-variant hover:text-clay-muted transition-colors"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
