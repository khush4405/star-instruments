import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight, Box } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import ProductTabs from '@/components/ProductTabs';

export const dynamic = 'force-dynamic';

export default async function DynamicProductRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const filePath = path.join(process.cwd(), 'src/data/masterContent.json');
  let data: { tree: any[] } = { tree: [] };
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to read masterContent.json", error);
  }

  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Traverse the recursive tree to find the node
  let currentNode: any = null;
  let currentList = data.tree;
  let isProduct = false;
  
  // Breadcrumb tracking for UI
  const breadcrumbs: { title: string, path: string }[] = [{ title: 'Products', path: '/products' }];

  for (let i = 0; i < slug.length; i++) {
    const pathSegment = slug[i];
    
    // Check if it's a folder in the current list
    const folderMatch = currentList.find((f: any) => f.id === pathSegment);
    if (folderMatch) {
      currentNode = folderMatch;
      currentList = folderMatch.subFolders || [];
      breadcrumbs.push({ title: folderMatch.title, path: breadcrumbs[breadcrumbs.length-1].path + '/' + pathSegment });
      isProduct = false;
      continue;
    }

    // If not a folder, check if it's a product in the previously matched folder
    if (currentNode && currentNode.products) {
      const productMatch = currentNode.products.find((p: any) => p.id === pathSegment);
      if (productMatch) {
        currentNode = productMatch;
        breadcrumbs.push({ title: productMatch.title, path: '#' });
        isProduct = true;
        break; // Products are leaf nodes, so we stop traversing
      }
    }

    // If we reach here, the path segment was not found
    notFound();
  }

  if (!currentNode) notFound();

  // ----- RENDER PRODUCT DETAIL LAYOUT -----
  if (isProduct) {
    return (
      <>
        <section className="bg-gradient-to-br from-navy via-navy-light to-navy-accent pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-sm overflow-x-auto whitespace-nowrap pb-2">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-white/20">/</span>}
                  {idx === breadcrumbs.length - 1 ? (
                    <span className="text-white/70 font-medium">{crumb.title}</span>
                  ) : (
                    <Link href={crumb.path} className="text-white/40 hover:text-white transition-colors">{crumb.title}</Link>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-eng-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="bg-white rounded-2xl border border-border/50 overflow-hidden relative w-full aspect-video lg:aspect-square flex items-center justify-center shadow-sm">
                {currentNode.imagePath && currentNode.imagePath !== '/images/products/photos/no-image.png' && currentNode.imagePath !== '/images/placeholders/no-image.png' ? (
                  <Image src={currentNode.imagePath} alt={currentNode.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className={`object-cover ${currentNode.imageClassName || ''}`} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate/20 rounded-xl text-slate-muted font-medium m-8">
                    [ Main Image Placeholder ]
                  </div>
                )}
              </div>

              <div>
                <div className="inline-flex px-3 py-1 bg-navy/5 rounded-full text-navy text-xs font-semibold mb-3">
                  {breadcrumbs.length >= 2 ? breadcrumbs[breadcrumbs.length-2].title : 'Product'}
                </div>
                <h1 className="text-3xl font-black text-navy mb-4 tracking-tight">{currentNode.title}</h1>
                <p className="text-slate-muted text-base leading-relaxed">{currentNode.shortDesc}</p>
              </div>
            </div>

            <ProductTabs 
              product={{
                id: currentNode.id,
                name: currentNode.title,
                slug: currentNode.id,
                categorySlug: slug[slug.length-2] || 'unknown',
                subcategory: breadcrumbs.length >= 2 ? breadcrumbs[breadcrumbs.length-2].title : '',
                description: currentNode.fullDesc || currentNode.shortDesc,
                image: currentNode.imagePath,
                specs: currentNode.specs?.reduce((acc: any, spec: any) => ({ ...acc, [spec.label]: spec.value }), {}) || {},
                features: [],
                datasheet: currentNode.pdfPath
              }} 
            />
          </div>
        </section>
      </>
    );
  }

  // ----- RENDER FOLDER LAYOUT -----
  return (
    <>
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy-accent pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-sm mb-6 text-white/60">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-white/20">/</span>}
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-white font-medium">{crumb.title}</span>
                ) : (
                  <Link href={crumb.path} className="hover:text-white transition-colors">{crumb.title}</Link>
                )}
              </React.Fragment>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">{currentNode.title}</h1>
          {currentNode.description && (
            <p className="text-lg text-blue-100/80 leading-relaxed max-w-3xl mb-8">{currentNode.description}</p>
          )}
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Render Sub-Folders */}
          {currentNode.subFolders && currentNode.subFolders.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-navy mb-8 border-b border-border/50 pb-4">Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentNode.subFolders.map((folder: any) => (
                  <Link key={folder.id} href={`${breadcrumbs[breadcrumbs.length-1].path}/${folder.id}`} className="group bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl hover:shadow-navy/5 transition-all duration-300 flex flex-col">
                    <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                      {folder.folderCover ? (
                        <Image src={folder.folderCover} alt={folder.title} fill className={`object-cover group-hover:scale-105 transition-transform duration-500 ${folder.imageClassName || ''}`} />
                      ) : <Box size={48} className="text-slate-300" />}
                    </div>
                    <div className="p-6 flex flex-col flex-grow bg-white">
                      <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-blue-600 transition-colors">{folder.title}</h3>
                      <div className="mt-auto flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">Open Category <ArrowRight size={16} /></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Render Products */}
          {currentNode.products && currentNode.products.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-navy mb-8 border-b border-border/50 pb-4">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentNode.products.map((product: any) => (
                  <Link 
                    key={product.id} 
                    href={product.externalLink || `${breadcrumbs[breadcrumbs.length-1].path}/${product.id}`} 
                    target={product.externalLink ? "_blank" : undefined}
                    rel={product.externalLink ? "noopener noreferrer" : undefined}
                    className="group bg-white rounded-xl border border-border/50 overflow-hidden hover:shadow-lg transition-all flex flex-col"
                  >
                    <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                      {product.imagePath ? (
                        <Image src={product.imagePath} alt={product.title} fill sizes="(max-width: 768px) 100vw, 25vw" className={`object-cover group-hover:scale-105 transition-transform duration-500 ${product.imageClassName || ''}`} />
                      ) : <Box size={40} className="text-slate-300" />}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-navy group-hover:text-blue-600 leading-snug">{product.title}</h3>
                        {product.externalLink && <div className="text-slate-400 group-hover:text-blue-500 shrink-0"><ArrowRight size={16} className="-rotate-45" /></div>}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">{product.shortDesc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(!currentNode.subFolders || currentNode.subFolders.length === 0) && (!currentNode.products || currentNode.products.length === 0) && (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <Box size={48} className="mx-auto text-slate-300 mb-4" />
              <h2 className="text-xl font-bold text-slate-400">Empty Category</h2>
              <p className="text-slate-500 mt-2">There are no products listed in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
