"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Phone,
  Cpu,
  Waves,
  Gauge,
  Thermometer,
  Activity,
  FlaskConical,
  Settings,
  Radio,
  ShieldAlert,
  Wrench,
  HardHat,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Waves,
  Gauge,
  Thermometer,
  Activity,
  FlaskConical,
  Settings,
  Radio,
  ShieldAlert,
  Wrench,
  HardHat,
};

export default function Header({ navCategories = [] }: { navCategories?: any[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMegaMenuEnter = () => {
    if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
    setMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimerRef.current = setTimeout(() => setMegaMenuOpen(false), 200);
  };

  const filteredCategories = searchQuery
    ? navCategories.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subcategories.some((s: string) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    : [];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "glass-dark shadow-lg shadow-navy/20"
        : "bg-navy/90 backdrop-blur-md"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 md:h-22">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/images/star-logo.png"
              alt="Star Instrument Engineers - ISE S-TECH"
              width={990}
              height={206}
              className="h-10 sm:h-12 w-auto object-contain logo-glow drop-shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(6,182,212,0.4)]"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              About
            </Link>

            {/* Products Mega Menu */}
            <div
              className="relative"
              ref={megaMenuRef}
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              >
                Products
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] glass-dark rounded-2xl shadow-2xl shadow-navy/40 p-6 animate-fade-in">
                  <div className="grid grid-cols-3 gap-3">
                    {navCategories.map((cat) => {
                      const Icon = iconMap[cat.icon] || Cpu;
                      return (
                        <Link
                          key={cat.id}
                          href={`/products/${cat.slug}`}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                          onClick={() => setMegaMenuOpen(false)}
                        >
                          <div className="mt-0.5 w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center shrink-0 group-hover:bg-cyan/20 transition-colors">
                            <Icon size={16} className="text-cyan" />
                          </div>
                          <div>
                            <div className="text-white text-xs font-semibold group-hover:text-orange transition-colors leading-tight">
                              {cat.name}
                            </div>
                            <div className="text-white/40 text-[10px] mt-0.5 leading-tight">
                              {cat.subcategories.slice(0, 2).join(", ")}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Link
                      href="/products"
                      className="text-cyan text-xs hover:text-cyan-light transition-colors font-medium"
                      onClick={() => setMegaMenuOpen(false)}
                    >
                      View All Products →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/certificates"
              className="px-3 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              Certificates
            </Link>
            <Link
              href="/videos"
              className="px-3 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              Videos
            </Link>
            <Link
              href="/clients"
              className="px-3 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              Clients
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
              aria-label="Search products"
            >
              <Search size={16} />
            </button>

            {/* CTA */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-orange hover:bg-orange-hover text-white text-sm font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-orange/20 active:scale-95"
            >
              <Phone size={14} />
              Request Quote
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 animate-fade-in">
            <div className="relative max-w-md mx-auto">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                placeholder="Search by product, model, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30 transition-all"
                autoFocus
              />
              {searchQuery && filteredCategories.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 glass-dark rounded-xl p-2 shadow-xl">
                  {filteredCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products/${cat.slug}`}
                      className="block px-3 py-2 text-white text-sm hover:bg-white/5 rounded-lg transition-colors"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-navy/98 backdrop-blur-xl z-40 animate-fade-in overflow-y-auto">
          <nav className="max-w-lg mx-auto px-6 py-8 space-y-2">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-white text-base font-medium hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="px-4 py-3">
              <div className="text-white/50 text-xs uppercase tracking-wider mb-3 font-semibold">
                Products
              </div>
              <div className="space-y-1 pl-2">
                {navCategories.map((cat) => {
                  const Icon = iconMap[cat.icon] || Cpu;
                  return (
                    <Link
                      key={cat.id}
                      href={`/products/${cat.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-white/80 text-sm hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Icon size={16} className="text-cyan shrink-0" />
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {[
              { href: "/certificates", label: "Certificates" },
              { href: "/videos", label: "Videos" },
              { href: "/clients", label: "Clients" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-white text-base font-medium hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-orange hover:bg-orange-hover text-white font-semibold rounded-xl transition-all"
              >
                <Phone size={16} />
                Request Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
