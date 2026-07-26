"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      hero.style.setProperty("--mouse-x", `${x}px`);
      hero.style.setProperty("--mouse-y", `${y}px`);
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy"
    >
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy-accent" />

        {/* Hero image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 hero-grid-pattern" />

        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange/5 rounded-full blur-[100px]" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-[10%] w-20 h-20 border border-cyan/10 rounded-2xl animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-[15%] w-16 h-16 border border-orange/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-[20%] w-12 h-12 border border-white/5 rounded-lg animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-[8%] w-24 h-24 border border-cyan/5 rounded-3xl animate-float"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up">
          <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-cyan text-xs font-semibold tracking-wider uppercase">
            Trusted Since 2000 · ISO & IBR Certified
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          Precision Process
          <br />
          <span className="bg-gradient-to-r from-orange via-orange to-cyan-light bg-clip-text text-transparent">
            Instrumentation
          </span>
          <br />& Automation
        </h1>

        {/* Subtext */}
        <p
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          Trusted by leading{" "}
          <span className="text-white/70">Pharma, Chemical & Oil & Gas</span>{" "}
          plants across India. Flow meters, level transmitters, temperature
          sensors, and complete automation solutions.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <Link
            href="/products"
            className="group flex items-center gap-2 px-8 py-4 bg-orange hover:bg-orange-hover text-white font-bold rounded-xl transition-all hover:shadow-2xl hover:shadow-orange/30 active:scale-95 text-sm"
          >
            Explore Product Catalog
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/contact"
            className="group flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 text-white font-bold rounded-xl transition-all hover:bg-white/5 text-sm"
          >
            <Phone size={16} />
            Consult an Engineer
          </Link>
        </div>

        {/* Stats Preview */}
        <div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "500ms" }}
        >
          {[
            { value: "25+", label: "Years Experience" },
            { value: "500+", label: "Installations" },
            { value: "100%", label: "Factory Tested" },
            { value: "500+", label: "Happy Clients" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white">
                {stat.value}
              </div>
              <div className="text-white/30 text-xs mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-white/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
