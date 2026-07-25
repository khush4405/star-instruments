import type { Metadata } from "next";
import Image from "next/image";
import { Play } from "lucide-react";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch product demonstration videos, installation guides, and facility tours from Star Instrument Engineers.",
};

export const dynamic = 'force-dynamic';

export default async function VideosPage() {
  const filePath = path.join(process.cwd(), 'src/data/masterContent.json');
  let dynamicVideos: any[] = [];
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    dynamicVideos = data.videos || [];
  } catch (error) {
    console.error("Failed to read masterContent.json", error);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy via-navy-light to-navy-accent pt-28 pb-16">
        <div className="absolute inset-0 hero-grid-pattern opacity-50" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Video <span className="text-orange">Showcase</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Product demonstrations, installation guides, and facility tours.
          </p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="section-padding bg-eng-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dynamicVideos.map((video) => (
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                key={video.id}
                className="group bg-white rounded-2xl border border-border/50 overflow-hidden card-hover block"
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnailPath || '/images/placeholders/no-image.png'}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-navy/30 flex items-center justify-center group-hover:bg-navy/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-orange/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                      <Play size={28} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-navy font-bold text-sm mb-2 group-hover:text-orange transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-slate-muted text-xs leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
