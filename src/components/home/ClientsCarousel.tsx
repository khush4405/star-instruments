"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { clients } from "@/lib/data";

export default function ClientsCarousel() {
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Duplicate clients for seamless infinite scroll
  const allClients = [...clients, ...clients];

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className={inView ? "animate-fade-in-up" : "opacity-0"}>
          <h2 className="section-title">
            Trusted by <span className="text-orange">Industry Leaders</span>
          </h2>
          <p className="section-subtitle">
            Serving India&apos;s leading manufacturers across pharma, chemical,
            oil & gas, and power sectors.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden mt-8">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <div
            className={`flex gap-8 ${inView ? "animate-scroll-logos" : ""}`}
            style={{ width: "max-content" }}
          >
            {allClients.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 w-52 h-24 rounded-xl border border-border/50 bg-eng-white flex items-center justify-center px-4 hover:border-cyan/30 transition-all duration-300 group"
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  width={200}
                  height={80}
                  className="object-contain transition-all duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
