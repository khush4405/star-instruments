"use client";

import { useEffect, useRef, useState } from "react";
import { whyChooseUsItems } from "@/lib/data";
import {
  Rocket,
  Laptop,
  Star,
  Clock,
  Users,
  ShieldCheck,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Laptop,
  Star,
  Clock,
  Users,
  ShieldCheck,
};

export default function WhyChooseUs() {
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
      className="section-padding bg-gradient-to-b from-eng-white to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className={inView ? "animate-fade-in-up" : "opacity-0"}>
          <h2 className="section-title">
            Why Choose{" "}
            <span className="text-orange">Star Instruments</span>?
          </h2>
          <p className="section-subtitle">
            Delivering precision, reliability, and exceptional service since
            2000.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUsItems.map((item, index) => {
            const Icon = iconMap[item.icon] || Star;
            return (
              <div
                key={item.title}
                className={`group p-6 rounded-2xl bg-white border border-border/50 card-hover ${
                  inView ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${100 + index * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy to-navy-accent flex items-center justify-center mb-4 group-hover:from-orange group-hover:to-orange-hover transition-all duration-300">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-navy font-bold text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
