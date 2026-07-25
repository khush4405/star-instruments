// Static product data — replaces Firebase for initial build.
// Can be migrated to Firestore later.

// Static product data
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  imageStyle?: string;
  subcategories: string[];
  sampleProducts: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  subcategory: string;
  description: string;
  image: string;
  specs: Record<string, string>;
  features: string[];
  datasheet?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
}

// ── Client Logos ──
export const clients: ClientLogo[] = [
  { id: "c1", name: "Adani Group", image: "/images/clients/client-1.svg" },
  { id: "c2", name: "Reliance Industries", image: "/images/clients/client-2.svg" },
  { id: "c3", name: "ONGC", image: "/images/clients/client-3.svg" },
  { id: "c4", name: "Indian Oil", image: "/images/clients/client-4.svg" },
  { id: "c5", name: "NTPC", image: "/images/clients/client-5.svg" },
  { id: "c6", name: "Tata Chemicals", image: "/images/clients/client-6.svg" },
  { id: "c7", name: "GAIL India", image: "/images/clients/client-7.svg" },
  { id: "c8", name: "Gujarat Alkalis", image: "/images/clients/client-8.svg" },
  { id: "c9", name: "Deepak Nitrite", image: "/images/clients/client-9.svg" },
];

// ── Gallery Images ──
export const galleryImages: GalleryImage[] = [
  { id: "g1", title: "Flow Meter Installation at Chemical Plant", category: "Installation", image: "/images/hero-bg.png" },
  { id: "g2", title: "Control Panel Assembly", category: "Manufacturing", image: "/images/facility.png" },
  { id: "g3", title: "Pressure Transmitter Calibration", category: "Calibration", image: "/images/hero-bg.png" },
  { id: "g4", title: "Plant Instrumentation Project", category: "Installation", image: "/images/facility.png" },
  { id: "g5", title: "Quality Testing Lab", category: "Quality", image: "/images/hero-bg.png" },
  { id: "g6", title: "Instrument Erection Work", category: "Installation", image: "/images/facility.png" },
];

// ── Videos ──
export const videos: Video[] = [
  {
    id: "v1",
    title: "Electromagnetic Flow Meter Working Principle",
    description: "Learn how electromagnetic flow meters measure conductive liquid flow using Faraday's law of electromagnetic induction.",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/images/hero-bg.png",
  },
  {
    id: "v2",
    title: "Star Instruments Manufacturing Facility Tour",
    description: "Take a virtual tour of our manufacturing facility in Ankleshwar, Gujarat.",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/images/facility.png",
  },
  {
    id: "v3",
    title: "Vortex Flow Meter Installation Guide",
    description: "Step-by-step guide for installing vortex flow meters for steam measurement.",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/images/hero-bg.png",
  },
];

// ── Company Info ──
export const companyInfo = {
  name: "Star Instrument Engineers",
  founder: "Mr. Vallabh Patel",
  foundedYear: 2000,
  phone1: "+91 9426129718",
  phone2: "+91 9428588901",
  whatsapp: "919426129718",
  email1: "starankleshwar@gmail.com",
  email2: "sie_ank@yahoo.com",
  address: "Sardar Patel Complex, B/G-5, Near GIDC Over Bridge, GIDC, Ankleshwar GIDC, Ankleshwar, Gujarat 393002",
  city: "Ankleshwar",
  state: "Gujarat",
  pincode: "393002",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3716.6!2d73.0!3d21.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDM4JzEyLjAiTiA3M8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1",
  industries: ["Pharma", "Oil & Gas", "Water Treatment", "Textiles", "Chemical", "Power Generation"],
  certifications: ["ISO 9001:2015", "IBR Approved"],
  stats: {
    yearsExperience: 25,
    installationsCompleted: 500,
    factoryTested: 100,
    clientsSatisfied: 200,
  },
};

// ── Why Choose Us ──
export const whyChooseUsItems = [
  {
    icon: "Rocket",
    title: "Expertise & Experience",
    description: "Over 25 years of hands-on experience in process instrumentation across diverse industries.",
  },
  {
    icon: "Laptop",
    title: "Customization",
    description: "Tailor-made solutions designed specifically for your unique process requirements.",
  },
  {
    icon: "Star",
    title: "Quality Materials",
    description: "Only premium-grade components sourced from certified global manufacturers.",
  },
  {
    icon: "Clock",
    title: "Timely Delivery",
    description: "Committed to on-time delivery with efficient project management and logistics.",
  },
  {
    icon: "Users",
    title: "Excellent Customer Service",
    description: "Dedicated support team providing 24/7 assistance and after-sales service.",
  },
  {
    icon: "ShieldCheck",
    title: "Dependability",
    description: "Trusted partner for critical process instrumentation since 2000.",
  },
];

// ── Industry Applications ──
export const industryApplications = [
  {
    icon: "Pill",
    name: "Pharmaceutical",
    description: "Clean room compatible instruments with FDA compliance for pharma manufacturing.",
  },
  {
    icon: "Droplets",
    name: "Oil & Gas",
    description: "Hazardous area rated instruments with ATEX/IECEx certifications for refineries.",
  },
  {
    icon: "Waves",
    name: "Water Treatment",
    description: "Flow, level, and pH analyzers for municipal and industrial water treatment plants.",
  },
  {
    icon: "Factory",
    name: "Textiles",
    description: "Temperature, pressure, and flow control for dyeing and finishing processes.",
  },
  {
    icon: "FlaskConical",
    name: "Chemical",
    description: "Corrosion-resistant instruments for aggressive chemical environments.",
  },
  {
    icon: "Zap",
    name: "Power Generation",
    description: "IBR approved steam flow meters and high-temperature instruments for power plants.",
  },
];

// Helper: Get category by slug