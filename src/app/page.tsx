import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ProductShowcase from "@/components/home/ProductShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import IndustryApplications from "@/components/home/IndustryApplications";
import ClientsCarousel from "@/components/home/ClientsCarousel";

import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const filePath = path.join(process.cwd(), 'src/data/masterContent.json');
  let data: { tree: any[] } = { tree: [] };
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to read masterContent.json", error);
  }

  // Map the CMS folders to the format ProductShowcase expects
  const dynamicCategories = (data.tree || []).map((folder: any) => ({
    id: folder.id,
    slug: folder.id,
    name: folder.title,
    image: folder.folderCover || '/images/placeholders/no-image.png',
    imageClassName: folder.imageClassName || '',
    itemCount: (folder.subFolders?.length || 0) + (folder.products?.length || 0),
    subcategories: [
      ...(folder.subFolders || []).map((s: any) => s.title),
      ...(folder.products || []).map((p: any) => p.title)
    ]
  }));

  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProductShowcase categories={dynamicCategories} />
      <WhyChooseUs />
      <IndustryApplications />
      <ClientsCarousel />
    </>
  );
}
