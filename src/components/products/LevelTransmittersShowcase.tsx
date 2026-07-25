"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const levelCategories = [
  {
    title: "Radar Level",
    description: "Highly accurate radar level measurement for continuous level monitoring.",
    image: "", // Placeholder
    link: "/products/level-transmitters/radar",
  },
  {
    title: "Ultrasonic Level",
    description: "Non-contact ultrasonic level transmitters for liquids and bulk solids.",
    image: "",
    link: "/products/level-transmitters/ultrasonic",
  },
  {
    title: "RF Admittance",
    description: "Reliable RF admittance point level switches and continuous transmitters.",
    image: "",
    link: "/products/level-transmitters/rf-admittance",
  }
];

export default function LevelTransmittersShowcase({ category }: { category: any }) {
  const [imgErrors, setImgErrors] = React.useState<Record<number, boolean>>({});

  return (
    <>
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy-accent pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/products" className="text-white/40 hover:text-white transition-colors">
              Products
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/70 font-medium">{category.name}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            {category.name}
          </h1>
          <p className="text-white/70 mt-4 text-base md:text-lg max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="section-padding bg-eng-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {levelCategories.map((subcat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image Box */}
                <div className="h-48 bg-[#F8FAFC] flex items-center justify-center p-4 relative border-b border-border/50 group">
                  {subcat.image && !imgErrors[idx] ? (
                    <Image
                      src={subcat.image}
                      alt={subcat.title}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      onError={() => setImgErrors(prev => ({ ...prev, [idx]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-slate/30 rounded-lg bg-white/50 text-slate-muted text-sm font-medium text-center p-4">
                      [ Drop Photo Here: {subcat.title} ]
                    </div>
                  )}
                </div>
                
                {/* Info Box */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-navy">
                    {subcat.title}
                  </h3>
                  <p className="text-slate-muted text-sm leading-relaxed mb-6 flex-grow">
                    {subcat.description}
                  </p>
                  
                  <Link 
                    href={subcat.link}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy/5 hover:bg-navy text-navy hover:text-white font-semibold rounded-lg transition-all text-sm w-full"
                  >
                    View Category <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
