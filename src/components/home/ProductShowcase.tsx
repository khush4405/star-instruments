"use client";

import { useEffect, useRef, useState } from "react";

import ProductCard from "./ProductCard";

export default function ProductShowcase({ categories }: { categories: any[] }) {
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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-eng-white">
      <div className="max-w-7xl mx-auto">
        <div className={inView ? "animate-fade-in-up" : "opacity-0"}>
          <h2 className="section-title">
            Our Instrumentation{" "}
            <span className="text-orange">Portfolio</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive range of process instruments, analyzers, and
            automation solutions for every industrial application.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={inView ? "animate-fade-in-up" : "opacity-0"}
              style={{ animationDelay: `${100 + index * 60}ms` }}
            >
              <ProductCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
