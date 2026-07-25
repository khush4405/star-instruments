"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, CheckCircle, FileText } from "lucide-react";
import { Product } from "@/lib/data";

interface ProductTabsProps {
  product: Product;
}

type TabType = "DESCRIPTION" | "KEY_SPECIFICATIONS" | "SEND_INQUIRY" | "DOCUMENTATION";

import dynamic from "next/dynamic";
const PDFViewer = dynamic(() => import("@/components/PDFViewer"), { ssr: false });

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("DESCRIPTION");

  const tabs: { id: TabType; label: string }[] = [
    { id: "DESCRIPTION", label: "DESCRIPTION" },
    { id: "KEY_SPECIFICATIONS", label: "KEY SPECIFICATIONS" },
    { id: "SEND_INQUIRY", label: "SEND INQUIRY" },
    { id: "DOCUMENTATION", label: "DOCUMENTATION" },
  ];

  const getFormattedPdfUrl = (url: string) => {
    if (!url) return "";
    let cleanUrl = url;
    // If user accidentally included 'public/' in the path, strip it out
    if (cleanUrl.includes("public/")) {
      cleanUrl = cleanUrl.split("public/")[1];
    }
    if (cleanUrl.includes("star-instruments/")) {
      cleanUrl = cleanUrl.split("star-instruments/")[1];
    }
    
    if (!cleanUrl.startsWith("http") && !cleanUrl.startsWith("/")) {
      cleanUrl = "/" + cleanUrl;
    }
    return cleanUrl;
  };

  const pdfUrl = product.datasheet ? getFormattedPdfUrl(product.datasheet) : "";

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-8">
      {/* Sidebar Tabs - Horizontal on mobile, Vertical on desktop */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible border md:border-none border-border rounded-lg md:rounded-none bg-white md:bg-transparent">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                text-left px-6 py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all
                ${idx !== 0 && "border-l md:border-l-0 md:border-t border-border"}
                ${
                  activeTab === tab.id
                    ? "bg-navy text-white"
                    : "bg-eng-white text-slate-muted hover:bg-white hover:text-navy"
                }
                ${idx === 0 && "md:rounded-t-lg"}
                ${idx === tabs.length - 1 && "md:rounded-b-lg"}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white border border-border p-6 md:p-10 rounded-xl min-h-[400px]">
        {activeTab === "DESCRIPTION" && (
          <div className="animate-in fade-in duration-300">
            <h3 className="text-xl font-bold text-navy mb-6">Product Description</h3>
            <p className="text-slate-muted text-base leading-relaxed mb-8 whitespace-pre-line">
              {product.description}
            </p>
            {product.features && product.features.length > 0 && (
              <>
                <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">
                  Key Features
                </h4>
                <ul className="space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate">
                      <CheckCircle size={18} className="text-cyan mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {activeTab === "KEY_SPECIFICATIONS" && (
          <div className="animate-in fade-in duration-300">
             <h3 className="text-xl font-bold text-navy mb-6">Key Specifications</h3>
             <div className="rounded-lg border border-border overflow-hidden">
                {Object.entries(product.specs).map(([key, value], index) => (
                  <div
                    key={key}
                    className={`flex flex-col sm:flex-row sm:items-center py-4 px-6 text-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-eng-white"
                    }`}
                  >
                    <span className="text-slate-muted font-medium w-full sm:w-1/3 mb-1 sm:mb-0">
                      {key}
                    </span>
                    <span className="text-navy font-semibold w-full sm:w-2/3">
                      {value}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === "SEND_INQUIRY" && (
          <div className="animate-in fade-in duration-300">
             <h3 className="text-xl font-bold text-navy mb-6">Send Inquiry</h3>
             <p className="text-slate-muted mb-8">
               Get in touch with our sales team for pricing, custom specifications, and bulk orders for the {product.name}.
             </p>
             <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 bg-orange hover:bg-orange-hover text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange/20 active:scale-95 text-sm"
                >
                  <Phone size={18} />
                  Request Quote
                </Link>
                <a
                  href={`https://wa.me/919426129718?text=Hi, I'm interested in ${product.name}. Please share details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-xl transition-all text-sm"
                >
                  WhatsApp Inquiry
                </a>
              </div>
          </div>
        )}

        {activeTab === "DOCUMENTATION" && (
          <div className="animate-in fade-in duration-300">
             <h3 className="text-xl font-bold text-navy mb-6">Documentation</h3>
             {product.datasheet ? (
               <div className="flex flex-col gap-6">
                 {/* PDF Embed */}
                 <div className="w-full h-[600px] sm:h-[700px] border border-border rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                   <PDFViewer 
                     fileUrl={pdfUrl} 
                   />
                 </div>
                 
                 {/* Download Button */}
                 <div className="flex items-center justify-between border-t border-border pt-6 mt-2">
                   <div>
                     <div className="font-bold text-navy text-lg mb-1">{product.name} Datasheet</div>
                     <div className="text-sm text-slate-muted">PDF Document</div>
                   </div>
                   <a 
                     href={pdfUrl} 
                     download 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="flex items-center gap-2 px-8 py-3 bg-navy hover:bg-navy-light text-white font-bold rounded-full transition-all shadow hover:shadow-lg active:scale-95"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                     Download
                   </a>
                 </div>
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-lg">
                 <FileText className="text-slate-300 mb-4" size={48} />
                 <p className="text-slate-muted">Datasheet is currently unavailable for this product.</p>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
