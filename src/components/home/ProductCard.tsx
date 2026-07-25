import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ProductCategory } from "@/lib/data";

export default function ProductCard({
  category,
}: {
  category: ProductCategory;
}) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group glass-card rounded-2xl overflow-hidden card-hover orange-underline-hover"
    >
      {/* Image Area */}
      <div className="relative h-44 bg-gradient-to-br from-eng-white to-white flex items-center justify-center overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${(category as any).imageClassName || ''}`}
        />
        {/* Category badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-navy/80 backdrop-blur-sm rounded-lg">
          <span className="text-[10px] text-white font-semibold uppercase tracking-wider">
            {category.subcategories.length} Types
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-navy font-bold text-base mb-2 group-hover:text-orange transition-colors leading-tight">
          {category.name}
        </h3>
        <ul className="space-y-1 mb-4">
          {category.subcategories.slice(0, 3).map((sub) => (
            <li
              key={sub}
              className="text-slate-muted text-xs flex items-center gap-1.5"
            >
              <span className="w-1 h-1 rounded-full bg-cyan shrink-0" />
              {sub}
            </li>
          ))}
          {category.subcategories.length > 3 && (
            <li className="text-slate-muted text-xs pl-2.5">
              +{category.subcategories.length - 3} more
            </li>
          )}
        </ul>
        <div className="flex items-center gap-1 text-orange text-xs font-semibold group-hover:gap-2 transition-all">
          View Specs & Inquire
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}
