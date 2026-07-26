import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import CertificatesClient from "./CertificatesClient";
import { galleryImages as fallbackGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Photos from our installations, manufacturing facility, and quality testing labs from Star Instrument Engineers.",
};

export const dynamic = 'force-dynamic';

export default async function CertificatesPage() {
  const filePath = path.join(process.cwd(), 'src/data/masterContent.json');
  let dynamicGallery: any[] = [];

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    dynamicGallery = (data.galleryImages && data.galleryImages.length > 0)
      ? data.galleryImages
      : fallbackGallery;
  } catch (error) {
    console.error("Failed to read masterContent.json in CertificatesPage", error);
    dynamicGallery = fallbackGallery;
  }

  return <CertificatesClient galleryImages={dynamicGallery} />;
}
