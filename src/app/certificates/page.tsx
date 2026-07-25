"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/lib/data";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(galleryImages.map((img) => img.category))),
  ];
  const filtered =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
    );
  const goNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null
    );

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy via-navy-light to-navy-accent pt-28 pb-16">
        <div className="absolute inset-0 hero-grid-pattern opacity-50" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Project <span className="text-orange">Gallery</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Photos from our installations, manufacturing facility, and
            quality testing.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-border sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filter === cat
                  ? "bg-navy text-white"
                  : "text-slate-muted hover:bg-eng-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-eng-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((img, index) => (
              <button
                key={img.id}
                onClick={() => openLightbox(index)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-border/50 card-hover text-left"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.image}
                    alt={img.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors flex items-center justify-center">
                    <ZoomIn
                      size={28}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-navy text-sm font-bold">{img.title}</h3>
                  <span className="text-slate-muted text-xs">
                    {img.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-lg flex items-center justify-center animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
          <button
            onClick={goPrev}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

          <div className="max-w-4xl w-full px-16">
            <Image
              src={filtered[lightboxIndex].image}
              alt={filtered[lightboxIndex].title}
              width={1200}
              height={800}
              className="w-full h-auto rounded-xl object-contain max-h-[75vh]"
            />
            <div className="text-center mt-4">
              <h3 className="text-white font-bold text-lg">
                {filtered[lightboxIndex].title}
              </h3>
              <p className="text-white/40 text-sm">
                {filtered[lightboxIndex].category}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
