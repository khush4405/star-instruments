"use client";

import { useState } from "react";
import { Image as ImageIcon, ZoomIn, X, ChevronLeft, ChevronRight, Download } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export default function CertificatesClient({
  galleryImages = [],
}: {
  galleryImages: GalleryItem[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Categories list
  const categories = [
    "All",
    ...Array.from(new Set(galleryImages.map((img) => img.category))),
  ];

  // Filtered gallery items
  const filtered =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

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

  const activeLightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-navy via-navy-light to-navy-accent pt-28 pb-16">
        <div className="absolute inset-0 hero-grid-pattern opacity-50" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Project <span className="text-orange">Gallery</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Photos from our installations, manufacturing facility, and quality testing labs.
          </p>
        </div>
      </section>

      {/* Main Content & Filter Bar */}
      <section className="bg-eng-white min-h-screen pb-20">
        
        {/* Sticky Filter Bar */}
        <div className="bg-white border-b border-border sticky top-16 z-20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-navy text-white shadow-sm"
                    : "bg-eng-white/80 text-slate-muted hover:text-navy hover:bg-white border border-border/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-border/50">
              <ImageIcon size={48} className="mx-auto text-slate-300 mb-3" />
              <h3 className="text-navy font-bold text-lg">No Gallery Photos Found</h3>
              <p className="text-slate-muted text-sm mt-1">Try selecting a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className="group bg-white rounded-2xl border border-border/60 overflow-hidden card-hover flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <div>
                    {/* Media Preview Box */}
                    <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/facility.png";
                        }}
                      />
                      
                      {/* Zoom Overlay */}
                      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 text-navy flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-lg">
                          <ZoomIn size={22} />
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-navy/80 text-white text-xs font-bold rounded-full shadow-md backdrop-blur">
                          <ImageIcon size={13} /> {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Details Box */}
                    <div className="p-5">
                      <h3 className="text-navy font-bold text-base mb-1 group-hover:text-orange transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <span className="text-slate-muted text-xs">
                        Category: {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={goPrev}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>

          {/* Modal Content */}
          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center px-4 md:px-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-white/10 max-h-[70vh] flex items-center justify-center">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="max-h-[68vh] w-auto max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/facility.png";
                }}
              />
            </div>

            {/* Caption Box */}
            <div className="text-center mt-6 text-white max-w-2xl">
              <span className="px-3 py-1 bg-orange/20 border border-orange/40 text-orange rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
                {activeLightboxItem.category}
              </span>
              <h3 className="text-xl md:text-2xl font-black">{activeLightboxItem.title}</h3>

              <div className="mt-4 flex items-center justify-center gap-3">
                <a
                  href={activeLightboxItem.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="px-5 py-2.5 bg-orange hover:bg-orange-hover text-white font-bold rounded-xl text-xs transition-all shadow-lg flex items-center gap-2"
                >
                  <Download size={14} /> Download Image
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
