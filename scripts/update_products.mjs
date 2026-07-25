import fs from 'fs';
import path from 'path';

const imagesDir = 'public/images/products/photos';
const files = fs.readdirSync(imagesDir).filter(f => f.toLowerCase().includes('-yes'));

const categories = {
  'automation-products': [],
  'flow-transmitters': [],
  'level-transmitters': [],
  'temperature': [],
  'pressure': [],
  'ph-tds-orp-analyzer': [],
  'control-valves': [],
  'proximity-sensors': [],
  'gas-detectors': [],
  'instrument-hardware': [],
  'erection-work': []
};

function categorize(filename) {
  const clean = filename.replace(/-yes/gi, '').replace(/\.[^/.]+$/, '').replace(/_+/g, ' ').trim();
  if (clean.includes('flow meter') || clean.includes('flow sensor') || clean.includes('flow switch') || clean.includes('fuel dispenser') || clean.includes('dispenser')) return 'flow-transmitters';
  if (clean.includes('level transmitter') || clean.includes('level gauge') || clean.includes('level meter') || clean.includes('level switch')) return 'level-transmitters';
  if (clean.includes('gas') || clean.includes('radius') || clean.includes('ventis') || clean.includes('tango') || clean.includes('sid ') || clean.includes('sid_') || clean.includes('g finder') || clean.includes('gasbadge') || clean.includes('inet') || clean.includes('1000ex') || clean.includes('2000tx') || clean.includes('3000ex') || clean.includes('5000') || clean.includes('5100')) return 'gas-detectors';
  return 'flow-transmitters'; // Fallback
}

const parsedImages = files.map(file => {
  const clean = file.replace(/-yes/gi, '').replace(/\.[^/.]+$/, '').replace(/_+/g, ' ').replace(/-/g, ' ').trim();
  const cleanName = clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    filename: file,
    cleanName: cleanName,
    category: categorize(file)
  };
});

parsedImages.forEach(img => categories[img.category].push(img));

let productsStr = 'export const products: Product[] = [\n';
let idCounter = 1;

for (const [catSlug, imgs] of Object.entries(categories)) {
  if (imgs.length > 0) {
    imgs.forEach(img => {
      productsStr += `  {
    id: "p${idCounter++}",
    name: "${img.cleanName}",
    slug: "${img.cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
    categorySlug: "${catSlug}",
    subcategory: "General",
    description: "${img.cleanName} for industrial applications.",
    image: "/images/products/photos/${img.filename}",
    specs: { "Type": "Industrial" },
    features: ["Reliable", "Durable"]
  },\n`;
    });
  } else {
    productsStr += `  {
    id: "p${idCounter++}",
    name: "Standard ${catSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}",
    slug: "${catSlug}-standard",
    categorySlug: "${catSlug}",
    subcategory: "General",
    description: "Standard industrial solution.",
    image: "", // TODO: No "-yes" image found for this category.
    specs: { "Type": "Standard" },
    features: ["Standard features"]
  },\n`;
  }
}
productsStr += '];';

let data = fs.readFileSync('src/lib/data.ts', 'utf8');
const startIdx = data.indexOf('export const products: Product[] = [');
const endIdx = data.indexOf('// ── Client Logos ──');
if (startIdx !== -1 && endIdx !== -1) {
  data = data.substring(0, startIdx) + productsStr + '\n\n' + data.substring(endIdx);
  fs.writeFileSync('src/lib/data.ts', data);
  console.log('Updated data.ts successfully!');
} else {
  console.log('Could not find products array bounds');
}
