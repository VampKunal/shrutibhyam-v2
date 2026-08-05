import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { CONTACT_INFO, MARQUEE_MSG } from "@/constant";
import { SearchDialog } from "./SearchDialog";
import { getSiteSettings } from "@/lib/api/sanity.functions";
import { useQuery } from "@tanstack/react-query";
import { LoginDialog } from "./LoginDialog";
import { useOverlay } from "@/hooks/useOverlay";

const links = [
    { to: "/about", label: "About", hash: undefined },
    { to: "/shop", label: "Shop", hash: undefined },
    { to: "/yoga", label: "Yoga", hash: undefined },
    { to: "/events", label: "Events", hash: undefined },
    { to: "/faq", label: "FAQ", hash: undefined },
    { to: "/contact", label: "Contact", hash: undefined },
] as const;

export function MarqueeBar() {
    const { data: settings } = useQuery({
        queryKey: ['siteSettings'],
        queryFn: () => getSiteSettings(),
    });
    const msg = settings?.discountMarquee || MARQUEE_MSG;
    return (
        <div className="bg-[#BBDC12] py-2 border-b border-sage-green/20 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-12 px-6">
                        {Array.from({ length: 3 }).map((_, j) => (
                            <span key={j} className="text-[11px] md:text-[12px] font-semibold tracking-[0.1em] uppercase text-deep-charcoal">
                                {msg}<span className="ml-12 inline-block w-1 h-1 rounded-full bg-[#D90000] align-middle" />
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function DealPopup() {
    const { data: settings } = useQuery({
        queryKey: ['siteSettings'],
        queryFn: () => getSiteSettings(),
    });

    const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (!settings?.dealActive || !settings?.dealEndTime) return;

        // Check if user already dismissed it in this session
        if (sessionStorage.getItem('dealPopupDismissed')) {
            setIsOpen(false);
            return;
        }

        const endTime = new Date(settings.dealEndTime).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                setTimeLeft(null);
                return;
            }

            setTimeLeft({
                d: Math.floor(distance / (1000 * 60 * 60 * 24)),
                h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                s: Math.floor((distance % (1000 * 60)) / 1000),
            });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [settings?.dealActive, settings?.dealEndTime]);

    if (!isOpen || !settings?.dealActive || !settings?.dealEndTime || !timeLeft) {
        return null;
    }

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('dealPopupDismissed', 'true');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl overflow-hidden relative flex flex-col md:flex-row">
                
                {/* Close Button */}
                <button 
                    onClick={handleClose}
                    className="absolute top-3 right-3 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-tint transition-colors z-10"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>

                {/* Left Content */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col items-center justify-center text-center">
                    {settings.dealTitle && (
                        <h2 className="text-xl md:text-2xl font-bold text-primary mb-1">
                            {settings.dealTitle}
                        </h2>
                    )}
                    
                    {settings.dealHeading && (
                        <h3 className="text-5xl md:text-6xl font-extrabold text-primary mb-4 tracking-tight">
                            {settings.dealHeading}
                        </h3>
                    )}
                    
                    {settings.dealSubheading && (
                        <p className="font-semibold tracking-[0.1em] text-deep-charcoal mb-2 uppercase text-sm">
                            {settings.dealSubheading}
                        </p>
                    )}
                    
                    {settings.dealDescription && (
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">
                            {settings.dealDescription}
                        </p>
                    )}

                    {/* Timer */}
                    <div className="flex gap-3 justify-center mb-8">
                        <div className="flex flex-col items-center">
                            <div className="bg-pink-50 text-primary text-2xl font-bold w-14 h-14 flex items-center justify-center rounded">
                                {timeLeft.d.toString().padStart(2, '0')}
                            </div>
                            <span className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">Days</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-pink-50 text-primary text-2xl font-bold w-14 h-14 flex items-center justify-center rounded">
                                {timeLeft.h.toString().padStart(2, '0')}
                            </div>
                            <span className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">Hrs</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-pink-50 text-primary text-2xl font-bold w-14 h-14 flex items-center justify-center rounded">
                                {timeLeft.m.toString().padStart(2, '0')}
                            </div>
                            <span className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">Min</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-pink-50 text-primary text-2xl font-bold w-14 h-14 flex items-center justify-center rounded">
                                {timeLeft.s.toString().padStart(2, '0')}
                            </div>
                            <span className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">Sec</span>
                        </div>
                    </div>

                    <Link 
                        to={(settings.dealButtonLink as any) || "/shop"}
                        onClick={handleClose}
                        className="w-full bg-primary text-white font-bold py-3 px-6 hover:bg-surface-tint transition-colors text-sm uppercase tracking-wider"
                    >
                        {settings.dealButtonText || "Shop The Flash Sale Now"}
                    </Link>

                    <button 
                        onClick={handleClose}
                        className="mt-4 text-xs font-semibold text-gray-400 hover:text-deep-charcoal transition-colors uppercase tracking-wider"
                    >
                        No, Thanks!
                    </button>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-1/2 bg-pink-50 min-h-[300px] md:min-h-full order-first md:order-last relative">
                    {settings.dealPopupImage ? (
                        <img 
                            src={settings.dealPopupImage} 
                            alt="Flash Sale" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            Image from Sanity
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function Header() {
    const { toggleCart, cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useOverlay({
        isOpen: isMenuOpen,
        onClose: () => setIsMenuOpen(false),
        closeOnDesktopResize: true,
    });

    return (
        <>
            <MarqueeBar />
            <DealPopup />
            <header className="bg-surface sticky top-0 z-50">
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
                                key={l.to + (l.hash || "")}
                                to={l.to as any}
                                hash={l.hash}
                                className="text-sm font-semibold uppercase tracking-[0.08em] text-on-surface-variant hover:text-sage-green transition-colors"
                                activeProps={{ className: "text-primary" }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-4 text-primary">
                        <SearchDialog />
                        <LoginDialog />
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
                className={`fixed inset-0 z-50 transition-visibility duration-300 md:hidden ${isMenuOpen ? "visible" : "invisibleDelay"
                    }`}
                style={{
                    transitionProperty: "visibility",
                }}
            >
                {/* Backdrop Overlay */}
                <div
                    onClick={() => setIsMenuOpen(false)}
                    className={`absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${isMenuOpen ? "opacity-100" : "opacity-0"
                        }`}
                />

                {/* Drawer Panel */}
                <div
                    className={`absolute top-0 left-0 h-full w-[280px] bg-cream-bg border-r border-soft-beige shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    {/* Header */}
                    <div className="p-6 flex items-center justify-between">
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
                                key={l.to + (l.hash || "")}
                                to={l.to as any}
                                hash={l.hash}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-base font-semibold uppercase tracking-[0.1em] text-on-surface-variant hover:text-sage-green transition-colors"
                                activeProps={{ className: "text-primary font-bold" }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Footer Contact Info */}
                    <div className="p-6 bg-white/50 text-xs text-on-surface-variant space-y-2">
                        <p className="font-semibold text-primary">{CONTACT_INFO.name}</p>
                        <p>{CONTACT_INFO.addressShort}</p>
                        <p>{CONTACT_INFO.email}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
