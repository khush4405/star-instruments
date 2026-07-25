"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const flowCategories = [
  {
    title: "Electromagnetic",
    description: "Highly accurate flow measurement for conductive liquids in demanding industrial applications.",
    image: "", // Placeholder
    link: "/products/flow-transmitters/electromagnetic",
  },
  {
    title: "Vortex",
    description: "Versatile flow measurement for liquids, gases, and steam with high reliability.",
    image: "",
    link: "/products/flow-transmitters/vortex",
  },
  {
    title: "Turbine & Helical",
    description: "Precision flow measurement solutions for clean liquids and gases.",
    image: "",
    link: "/products/flow-transmitters/turbine",
  },
  {
    title: "Ultrasonic",
    description: "Non-intrusive flow measurement using advanced ultrasonic technology.",
    image: "",
    link: "/products/flow-transmitters/ultrasonic",
  },
  {
    title: "Thermal Mass",
    description: "Direct mass flow measurement of gases with high sensitivity and low pressure drop.",
    image: "",
    link: "/products/flow-transmitters/thermal-mass",
  },
  {
    title: "Oval Gear",
    description: "Positive displacement flow meters for highly viscous fluids and precise batching.",
    image: "",
    link: "/products/flow-transmitters/oval-gear",
  },
  {
    title: "Flow Switch",
    description: "Reliable flow detection and switching for safety and process control.",
    image: "",
    link: "/products/flow-transmitters/flow-switch",
  },
  {
    title: "Fuel Consumption",
    description: "Accurate measurement of diesel and fuel consumption for engines and generators.",
    image: "",
    link: "/products/flow-transmitters/fuel-consumption",
  }
];

export default function FlowTransmittersShowcase({ category }: { category: any }) {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flowCategories.map((subcat, idx) => (
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
                    View Product <ArrowRight size={16} />
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
