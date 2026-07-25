"use client";

import { useEffect, useRef, useState } from "react";
import { Award, Shield, CheckCircle, Clock } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: Clock, value: 25, suffix: "+", label: "Years Experience" },
  { icon: CheckCircle, value: 100, suffix: "%", label: "Factory Tested" },
  { icon: Award, value: 500, suffix: "+", label: "Installations" },
  { icon: Shield, value: 0, suffix: "", label: "ISO / IBR Certified" },
];

function AnimatedCounter({
  target,
  suffix,
  duration = 2000,
  inView,
}: {
  target: number;
  suffix: string;
  duration?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === 0) return;

    let start = 0;
    const startTime = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);

      if (current !== start) {
        start = current;
        setCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [inView, target, duration]);

  if (target === 0) {
    return <span className="text-3xl md:text-4xl font-black text-white">✓</span>;
  }

  return (
    <span className="text-3xl md:text-4xl font-black text-white tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function TrustBar() {
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
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-r from-navy via-navy-accent to-navy overflow-hidden"
    >
      {/* Cyan accent line on top */}
      <div className="h-1 bg-gradient-to-r from-transparent via-cyan to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`text-center ${inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 mb-3">
                  <Icon size={22} className="text-cyan" />
                </div>
                <div className="mb-1">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </div>
                <div className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
