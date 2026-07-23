
import { Link } from "@tanstack/react-router";

export function Footer() {
 return (
 <footer className="bg-cream-bg mt-auto"
 style={{
 backgroundImage: "url('/backdrop4.webp')",
 backgroundSize: "cover",
 backgroundPosition: "center 90%",
 backgroundRepeat: "no-repeat",
 }}>
 <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
 <div>
 <div className="font-display text-2xl font-bold text-black mb-3">Shrutibhyam</div>

 </div>
 <FooterCol title="Explore" items={[["About Us", "/about"], ["Shop", "/shop"], ["Yoga", "/yoga"], ["Events", "/events"]]} />
 <FooterCol title="Support" items={[["FAQ", "/faq"], ["Contact Us", "/contact"]]} />
 <FooterCol title="Legal" items={[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"]]} />
 <div className="md:col-span-4 pt-8 text-xs font-medium text-black/75">
 © {new Date().getFullYear()} Shrutibhyam Wellness. Rooted in Ayurvedic Purity.
 </div>
 </div>
 </footer>
 );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
 return (
 <nav className="flex flex-col gap-3">
 <div className="text-xs font-bold uppercase tracking-[0.12em] text-primary mb-1">{title}</div>
 {items.map(([label, href]) => (
 <Link
 key={label}
 to={href}
 className="text-sm font-medium text-primary hover:text-clay-muted transition-colors"
 >
 {label}
 </Link>
 ))}
 </nav>
 );
}
