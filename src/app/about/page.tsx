import type { Metadata } from "next";
import Image from "next/image";
import { companyInfo } from "@/lib/data";
import {
  Award,
  Target,
  Eye,
  Heart,
  Users,
  CheckCircle,
  Calendar,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Star Instrument Engineers — 25+ years of expertise in precision process instrumentation and automation. Founded by Mr. Vallabh Patel in Ankleshwar, Gujarat.",
};

const timeline = [
  {
    year: "2000",
    title: "Company Founded",
    description:
      "Mr. Vallabh Patel establishes Star Instrument Engineers in Ankleshwar, Gujarat, with a vision to provide world-class process instrumentation.",
  },
  {
    year: "2005",
    title: "ISO 9001 Certified",
    description:
      "Achieved ISO 9001 certification, demonstrating commitment to quality management systems in instrumentation manufacturing.",
  },
  {
    year: "2010",
    title: "IBR Approval",
    description:
      "Received IBR (Indian Boiler Regulations) approval for steam flow measurement instruments, expanding into power and boiler industries.",
  },
  {
    year: "2015",
    title: "500+ Installations",
    description:
      "Crossed the milestone of 500+ successful installations across pharma, chemical, and oil & gas industries.",
  },
  {
    year: "2020",
    title: "Automation Division",
    description:
      "Launched dedicated automation products division with Phoenix signal conditioners and I/O modules.",
  },
  {
    year: "2025",
    title: "Digital Transformation",
    description:
      "Embracing Industry 4.0 with smart instruments featuring HART, Modbus, and cloud connectivity.",
  },
];

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every instrument calibrated to exacting standards.",
  },
  {
    icon: Award,
    title: "Quality",
    description: "Premium materials and 100% factory testing.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Transparent dealings and honest technical consulting.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "Long-term relationships built on mutual trust.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-navy via-navy-light to-navy-accent pt-28 pb-20">
        <div className="absolute inset-0 hero-grid-pattern opacity-50" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Calendar size={14} className="text-cyan" />
            <span className="text-cyan text-xs font-semibold">
              Established {companyInfo.foundedYear}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            About Star Instrument{" "}
            <span className="text-orange">Engineers</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Over two decades of precision engineering and unwavering commitment
            to industrial process instrumentation excellence.
          </p>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="section-padding bg-eng-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/facility.png"
                  alt="Star Instrument Engineers Facility"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 px-5 py-3 bg-orange rounded-xl shadow-lg">
                <span className="text-white font-bold text-sm">
                  25+ Years of Excellence
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-navy mb-4">
                Founded by{" "}
                <span className="text-orange">{companyInfo.founder}</span>
              </h2>
              <div className="flex items-center gap-2 text-slate-muted text-sm mb-6">
                <MapPin size={16} className="text-cyan" />
                {companyInfo.city}, {companyInfo.state}
              </div>
              <div className="space-y-4 text-slate text-sm leading-relaxed">
                <p>
                  Star Instrument Engineers was established in 2000 by Mr.
                  Vallabh Patel with a singular mission: to provide Indian
                  industries with world-class process instrumentation solutions
                  at competitive prices.
                </p>
                <p>
                  Starting from a small workshop in Ankleshwar GIDC, the
                  company has grown into a comprehensive instrumentation partner
                  serving 200+ clients across pharma, chemical, oil & gas,
                  textiles, and power generation sectors.
                </p>
                <p>
                  Today, Star Instrument Engineers offers a complete range of
                  flow meters, level transmitters, temperature and pressure
                  instruments, analyzers, control valves, and turnkey erection
                  services — all backed by ISO 9001:2015 quality standards and
                  IBR certification.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {companyInfo.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan/10 border border-cyan/20 rounded-full text-cyan text-xs font-semibold"
                  >
                    <CheckCircle size={12} />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-navy to-navy-accent">
              <div className="w-12 h-12 rounded-xl bg-orange/20 flex items-center justify-center mb-4">
                <Target size={24} className="text-orange" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Our Mission
              </h3>
              <p className="text-white/60 leading-relaxed">
                To deliver reliable, accurate, and cost-effective process
                instrumentation solutions that empower Indian industries to
                achieve operational excellence, safety compliance, and energy
                efficiency.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-navy to-navy-accent">
              <div className="w-12 h-12 rounded-xl bg-cyan/20 flex items-center justify-center mb-4">
                <Eye size={24} className="text-cyan" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Our Vision
              </h3>
              <p className="text-white/60 leading-relaxed">
                To be recognized as India&apos;s most trusted instrumentation
                partner — known for technical expertise, product quality, and
                unwavering customer commitment across every industry we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-eng-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="section-title">
            Our Core <span className="text-orange">Values</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="p-6 rounded-2xl bg-white border border-border/50 card-hover">
                  <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mx-auto mb-3">
                    <Icon size={22} className="text-navy" />
                  </div>
                  <h4 className="text-navy font-bold text-sm mb-1">
                    {v.title}
                  </h4>
                  <p className="text-slate-muted text-xs leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title mb-12">
            Our <span className="text-orange">Journey</span>
          </h2>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-6 ${
                    index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 pl-12 md:pl-0 ${
                      index % 2 === 0
                        ? "md:text-right md:pr-12"
                        : "md:text-left md:pl-12"
                    }`}
                  >
                    <div className="inline-block px-3 py-1 bg-orange/10 rounded-full text-orange text-xs font-bold mb-2">
                      {item.year}
                    </div>
                    <h4 className="text-navy font-bold text-base mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-orange border-4 border-white shadow-md md:-translate-x-1/2 mt-2" />

                  {/* Spacer for other side */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
