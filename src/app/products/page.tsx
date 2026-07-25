import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Box } from 'lucide-react';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export default async function ProductsIndexPage() {
  const filePath = path.join(process.cwd(), 'src/data/masterContent.json');
  let data: { tree: any[] } = { tree: [] };
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to read masterContent.json", error);
  }

  const rootFolders = data.tree || [];

  return (
    <>
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy-accent pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Our Products
            </h1>
            <p className="text-lg text-blue-100/80 leading-relaxed mb-8">
              Explore our extensive range of industrial automation and instrumentation solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {rootFolders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <Box size={48} className="mx-auto text-slate-300 mb-4" />
              <h2 className="text-xl font-bold text-slate-400">No Categories Found</h2>
              <p className="text-slate-500 mt-2">The product catalog is currently empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rootFolders.map((folder: any) => (
                <Link
                  key={folder.id}
                  href={`/products/${folder.id}`}
                  className="group bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl hover:shadow-navy/5 transition-all duration-300 flex flex-col"
                >
                  <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                    {folder.folderCover ? (
                      <Image 
                        src={folder.folderCover} 
                        alt={folder.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-cover group-hover:scale-105 transition-transform duration-500 ${folder.imageClassName || ''}`}
                      />
                    ) : (
                      <Box size={48} className="text-slate-300" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow bg-white border-t border-slate-100">
                    <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-blue-600 transition-colors">
                      {folder.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                      {folder.description || "Explore products in this category."}
                    </p>
                    <div className="mt-auto flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">
                      Explore Category <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
