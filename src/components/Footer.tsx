import Link from "next/link";
import Image from "next/image";
import { companyInfo } from "@/lib/data";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export default function Footer({ navCategories = [] }: { navCategories?: any[] }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light/30 to-transparent pointer-events-none" />

      {/* CTA Strip */}
      <div className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Ready to Discuss Your{" "}
                <span className="text-orange">Instrumentation</span> Needs?
              </h3>
              <p className="text-white/50 mt-2 text-sm">
                Get expert consultation and custom quotes for your process
                control requirements.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 bg-orange hover:bg-orange-hover text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange/20 active:scale-95 text-sm"
              >
                Get a Quote
              </Link>
              <a
                href={`https://wa.me/${companyInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/20 hover:border-cyan/50 text-white font-semibold rounded-xl transition-all hover:bg-white/5 text-sm"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/star-logo.png"
                alt="Star Instrument Engineers - ISE S-TECH"
                width={360}
                height={90}
                className="h-14 w-auto object-contain logo-glow drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Trusted provider of precision process instrumentation and
              automation solutions since 2000. Serving Pharma, Oil & Gas,
              Chemical, and Power industries across India.
            </p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-cyan/10 border border-cyan/20 rounded-full text-cyan text-[10px] font-semibold uppercase tracking-wider">
                ISO 9001:2015
              </span>
              <span className="px-3 py-1 bg-orange/10 border border-orange/20 rounded-full text-orange text-[10px] font-semibold uppercase tracking-wider">
                IBR Approved
              </span>
            </div>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <a
                href={`tel:${companyInfo.phone1}`}
                className="flex items-start gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <Phone
                  size={16}
                  className="mt-0.5 text-orange group-hover:text-orange shrink-0"
                />
                <div className="text-sm">
                  <div>{companyInfo.phone1}</div>
                  <div>{companyInfo.phone2}</div>
                </div>
              </a>
              <a
                href={`mailto:${companyInfo.email1}`}
                className="flex items-start gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <Mail
                  size={16}
                  className="mt-0.5 text-cyan group-hover:text-cyan shrink-0"
                />
                <div className="text-sm">
                  <div>{companyInfo.email1}</div>
                  <div>{companyInfo.email2}</div>
                </div>
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <MapPin
                  size={16}
                  className="mt-0.5 text-orange shrink-0"
                />
                <div className="text-sm leading-relaxed">
                  {companyInfo.address}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/products", label: "Products" },
                { href: "/gallery", label: "Gallery" },
                { href: "/videos", label: "Videos" },
                { href: "/clients", label: "Our Clients" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Our Products
            </h4>
            <ul className="space-y-2.5">
              {navCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan"
                    />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {currentYear} Star Instrument Engineers. All Rights Reserved.
          </p>
          <p className="text-white/20 text-xs">
            Precision Instrumentation Since 2000
          </p>
        </div>
      </div>
    </footer>
  );
}
