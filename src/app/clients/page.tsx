import type { Metadata } from "next";
import Image from "next/image";
import { clients } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Clients",
  description:
    "Trusted by industry leaders across pharma, chemical, oil & gas, and power sectors. See our valued clients.",
};

export default function ClientsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy via-navy-light to-navy-accent pt-28 pb-16">
        <div className="absolute inset-0 hero-grid-pattern opacity-50" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Our <span className="text-orange">Clients</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Trusted by India&apos;s leading manufacturers across multiple
            industry sectors.
          </p>
        </div>
      </section>

      {/* Client Grid */}
      <section className="section-padding bg-eng-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="group bg-white rounded-2xl border border-border/50 p-6 flex flex-col items-center justify-center gap-4 card-hover min-h-[140px]"
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  width={180}
                  height={70}
                  className="object-contain transition-all duration-500 group-hover:scale-105"
                />
                <span className="text-slate-muted text-xs font-medium group-hover:text-navy transition-colors text-center">
                  {client.name}
                </span>
              </div>
            ))}
          </div>

          {/* Trust statement */}
          <div className="mt-16 text-center p-8 bg-white rounded-2xl border border-border/50">
            <h3 className="text-navy font-bold text-xl mb-3">
              And Many More...
            </h3>
            <p className="text-slate-muted text-sm max-w-lg mx-auto leading-relaxed">
              Over 500+ clients across pharma, chemical, oil & gas, textiles,
              water treatment, and power generation industries trust Star
              Instrument Engineers for their process instrumentation needs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
