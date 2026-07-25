"use client";

import { useEffect, useRef, useState } from "react";
import { industryApplications } from "@/lib/data";
import {
  Pill,
  Droplets,
  Waves,
  Factory,
  FlaskConical,
  Zap,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Pill,
  Droplets,
  Waves,
  Factory,
  FlaskConical,
  Zap,
};

export default function IndustryApplications() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-padding bg-gradient-to-br from-navy via-navy-light to-navy relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 hero-grid-pattern opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/3 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/3 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto">
        <div className={inView ? "animate-fade-in-up" : "opacity-0"}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-3 tracking-tight">
            Industries We <span className="text-cyan">Serve</span>
          </h2>
          <p className="text-white/40 text-center text-base max-w-xl mx-auto mb-12">
            Precision instruments tailored for the most demanding industrial
            environments.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industryApplications.map((industry, index) => {
            const Icon = iconMap[industry.icon] || Factory;
            return (
              <div
                key={industry.name}
                className={`group text-center p-5 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/8 hover:border-cyan/20 transition-all duration-300 ${
                  inView ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${100 + index * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan/20 group-hover:scale-110 transition-all duration-300">
                  <Icon
                    size={26}
                    className="text-cyan group-hover:text-cyan-light transition-colors"
                  />
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">
                  {industry.name}
                </h4>
                <p className="text-white/30 text-[11px] leading-relaxed hidden md:block">
                  {industry.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
