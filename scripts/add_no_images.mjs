import fs from 'fs';

const imagesDir = 'd:/Star Instrumets/downloaded_images';
const destDir = 'd:/Star Instrumets/star-instruments/public/images/products/photos';

const files = fs.readdirSync(imagesDir).filter(f => f.toLowerCase().includes('-no'));

// Copy files
for (const f of files) {
  fs.copyFileSync(`${imagesDir}/${f}`, `${destDir}/${f}`);
}

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

const subcatMap = {
  'flow-transmitters': ["Electromagnetic", "Vortex", "Turbine & Helical", "Ultrasonic", "Thermal Mass", "Oval Gear", "Fuel Consumption", "Flow Switch"],
  'level-transmitters': ["Ultrasonic", "Radar", "Capacitance", "Float"],
  'gas-detectors': ["Fixed Detectors", "Portable Detectors", "Multi-Gas"],
  'automation-products': ["Signal Conditioners", "I/O Modules", "Relay Systems"],
  'temperature': ["RTD", "Thermocouple", "Transmitters", "Controllers", "Gauges"],
  'pressure': ["Transmitters", "Gauges", "Switches", "Differential"],
  'ph-tds-orp-analyzer': ["pH Analyzers", "TDS Analyzers", "ORP Analyzers"],
  'control-valves': ["Globe Valves", "Butterfly Valves", "Diaphragm Valves", "Actuators"],
  'proximity-sensors': ["Inductive", "Capacitive", "Photoelectric"],
  'instrument-hardware': ["Manifolds", "Tubing", "Fittings"],
  'erection-work': ["Turnkey Installation", "Commissioning", "Maintenance"]
};

function categorize(filename) {
  const clean = filename.replace(/-no/gi, '').replace(/\.[^/.]+$/, '').replace(/_+/g, ' ').trim();
  if (clean.includes('automation') || clean.includes('indicator') || clean.includes('controller')) return 'automation-products';
  if (clean.includes('pressure')) return 'pressure';
  if (clean.includes('temperature') || clean.includes('rtd') || clean.includes('thermocouple') || clean.includes('thermometer') || clean.includes('head mounted')) return 'temperature';
  if (clean.includes('ph') || clean.includes('tds') || clean.includes('orp')) return 'ph-tds-orp-analyzer';
  if (clean.includes('ip_ep_converter') || clean.includes('positioner')) return 'control-valves';
  if (clean.includes('profimity') || clean.includes('proximity') || clean.includes('limit switch')) return 'proximity-sensors';
  if (clean.includes('flow')) return 'flow-transmitters';
  return 'instrument-hardware'; // fallback for accessories
}

const parsedImages = files.map(file => {
  const clean = file.replace(/-no/gi, '').replace(/\.[^/.]+$/, '').replace(/_+/g, ' ').replace(/-/g, ' ').trim();
  const cleanName = clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const catSlug = categorize(file);
  
  // Find subcategory
  let newSubcat = "General";
  const availSubs = subcatMap[catSlug] || [];
  if (availSubs.length > 0) {
    newSubcat = availSubs[0];
    const nameLower = cleanName.toLowerCase();
    for (const sub of availSubs) {
      const subLower = sub.toLowerCase();
      if (nameLower.includes(subLower) || subLower.includes(nameLower.split(' ')[0])) {
        newSubcat = sub;
        break;
      }
    }
  }

  return {
    filename: file,
    cleanName: cleanName,
    categorySlug: catSlug,
    subcategory: newSubcat
  };
});

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

// Parse current products block
const startIdx = data.indexOf('export const products: Product[] = [');
const endIdx = data.indexOf('];', startIdx);
let productsBlock = data.substring(startIdx, endIdx);

// Remove the placeholder objects (where image is empty string)
productsBlock = productsBlock.replace(/\{\s*id:\s*"[^"]+",\s*name:\s*"Standard[^"]+",[^}]+image:\s*"",[^}]+\},?\s*/g, '');

let idCounter = 100; // start from a high number to avoid collisions
let appendedProducts = '';

parsedImages.forEach(img => {
  appendedProducts += `  {
    id: "p${idCounter++}",
    name: "${img.cleanName}",
    slug: "${img.cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
    categorySlug: "${img.categorySlug}",
    subcategory: "${img.subcategory}",
    description: "${img.cleanName} for industrial applications.",
    image: "/images/products/photos/${img.filename}",
    specs: { "Type": "Industrial" },
    features: ["Reliable", "High Accuracy", "Durable"]
  },\n`;
});

const newProductsBlock = productsBlock + appendedProducts;
data = data.substring(0, startIdx) + newProductsBlock + data.substring(endIdx);
fs.writeFileSync('src/lib/data.ts', data);
console.log('Added -no images to data.ts!');
