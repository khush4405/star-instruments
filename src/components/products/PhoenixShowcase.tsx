"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';

const phoenixProducts = [
  {
    title: "Power Supplies",
    description: "Reliable power supply units, UPS systems, and redundancy modules for maximum plant availability.",
    image: "/assets/products/phoenix/power-supply.jpg",
  },
  {
    title: "Industrial Ethernet",
    description: "Managed and unmanaged switches, security routers, and wireless data communication for secure networks.",
    image: "/assets/products/phoenix/ethernet.jpg",
  },
  {
    title: "PLCnext Technology",
    description: "The open ecosystem for industrial automation, combining classic PLC reliability with open-source software.",
    image: "/assets/products/phoenix/plcnext.jpg",
  },
  {
    title: "Remote I/O Systems",
    description: "IP20 and IP67 I/O systems for flexible signal acquisition directly in the control cabinet or field.",
    image: "/assets/products/phoenix/remote-io.jpg",
  },
  {
    title: "Device Circuit Breakers",
    description: "Thermal, thermomagnetic, and electronic circuit breakers for targeted equipment protection.",
    image: "/assets/products/phoenix/circuit-breaker.jpg",
  },
  {
    title: "Explore Full Phoenix Catalog",
    description: "Looking for terminal blocks, connectors, or surge protection? Browse the official 10,000+ product master library.",
    image: "/assets/products/phoenix/catalog-cover.jpg",
    isExternalLink: true,
    externalUrl: "https://www.phoenixcontact.com/en-in/service-and-support/catalogs-and-brochures",
  }
];

export default function PhoenixShowcase({ category }: { category: any }) {
  // A clean fallback component if image fails to load
  const [imgErrors, setImgErrors] = React.useState<Record<number, boolean>>({});

  return (
    <>
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

      <section className="section-padding bg-eng-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {phoenixProducts.map((product, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col bg-white rounded-2xl border ${product.isExternalLink ? 'border-orange/30 shadow-lg shadow-orange/5' : 'border-border/50 shadow-sm'} overflow-hidden hover:shadow-md transition-shadow`}
              >
                <div className="h-48 bg-[#F8FAFC] flex items-center justify-center p-4 relative border-b border-border/50 group">
                  {!imgErrors[idx] ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      onError={() => setImgErrors(prev => ({ ...prev, [idx]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-slate/30 rounded-lg bg-white/50 text-slate-muted text-sm font-medium text-center p-4">
                      [ Drop Photo Here: {product.title} ]
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className={`text-xl font-bold mb-2 ${product.isExternalLink ? 'text-orange' : 'text-navy'}`}>
                    {product.title}
                  </h3>
                  <p className="text-slate-muted text-sm leading-relaxed mb-6 flex-grow">
                    {product.description}
                  </p>
                  
                  {product.isExternalLink ? (
                    <a 
                      href={product.externalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange hover:bg-orange-hover text-white font-semibold rounded-lg transition-all text-sm w-full"
                    >
                      Open Official Catalog <ExternalLink size={16} />
                    </a>
                  ) : (
                    <Link 
                      href="/phoenix-category-template"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy/5 hover:bg-navy text-navy hover:text-white font-semibold rounded-lg transition-all text-sm w-full"
                    >
                      View Products <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
