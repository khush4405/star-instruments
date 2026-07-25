import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import QuickInquiryPanel from "@/components/QuickInquiryPanel";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Star Instrument Engineers | Precision Process Instrumentation & Automation",
    template: "%s | Star Instrument Engineers",
  },
  description:
    "Leading manufacturer and supplier of precision process instrumentation & automation solutions since 2000. Flow meters, level transmitters, temperature sensors, pressure instruments, control valves. ISO & IBR certified. Ankleshwar, Gujarat, India.",
  keywords: [
    "process instrumentation",
    "flow meter",
    "level transmitter",
    "temperature sensor",
    "pressure transmitter",
    "control valve",
    "automation",
    "Ankleshwar",
    "Gujarat",
    "India",
    "Star Instrument Engineers",
  ],
  authors: [{ name: "Star Instrument Engineers" }],
  openGraph: {
    title: "Star Instrument Engineers | Precision Process Instrumentation",
    description:
      "Trusted provider of flow meters, level transmitters, temperature & pressure instruments, and complete automation solutions since 2000.",
    type: "website",
    locale: "en_IN",
    siteName: "Star Instrument Engineers",
  },
};

import fs from 'fs';
import path from 'path';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let navCategories: any[] = [];
  try {
    const filePath = path.join(process.cwd(), 'src/data/masterContent.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    navCategories = (data.tree || []).map((folder: any) => ({
      id: folder.id,
      slug: folder.id,
      name: folder.title,
      icon: "Cpu",
      subcategories: (folder.subFolders || []).map((sub: any) => sub.title)
    }));
  } catch (error) {
    console.error("Failed to read masterContent.json for layout", error);
  }

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header navCategories={navCategories} />
        <main className="flex-1">{children}</main>
        <Footer navCategories={navCategories} />
        <FloatingWidgets />
        <QuickInquiryPanel navCategories={navCategories} />
      </body>
    </html>
  );
}
