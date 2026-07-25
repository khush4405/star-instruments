import fs from 'fs';

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

// A quick and dirty way to parse the arrays from the file using eval,
// but since it's TS, it's safer to just do a string replacement using a regex or simple logic.
// Actually, let's just write a regex replacer that looks at each product block.

const productRegex = /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*categorySlug:\s*"([^"]+)",\s*subcategory:\s*"([^"]+)",/g;

// Subcategories map
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

let updatedData = data.replace(productRegex, (match, id, name, slug, catSlug, subcategory) => {
  let newSubcat = "General";
  const availSubs = subcatMap[catSlug] || [];
  
  if (availSubs.length > 0) {
    newSubcat = availSubs[0]; // fallback to first
    
    // Semantic match
    const nameLower = name.toLowerCase();
    for (const sub of availSubs) {
      const subLower = sub.toLowerCase();
      if (nameLower.includes(subLower) || subLower.includes(nameLower.split(' ')[0])) {
        newSubcat = sub;
        break;
      }
    }
    
    // Specific overrides
    if (catSlug === 'gas-detectors') {
      if (nameLower.includes('portable') || nameLower.includes('ventis') || nameLower.includes('tango') || nameLower.includes('gasbadge')) {
         newSubcat = 'Portable Detectors';
      } else if (nameLower.includes('multi')) {
         newSubcat = 'Multi-Gas';
      } else {
         newSubcat = 'Fixed Detectors'; // default for SIDs etc
      }
    } else if (catSlug === 'flow-transmitters') {
      if (nameLower.includes('electromagnetic')) newSubcat = 'Electromagnetic';
      else if (nameLower.includes('vortex')) newSubcat = 'Vortex';
      else if (nameLower.includes('turbine') || nameLower.includes('helical')) newSubcat = 'Turbine & Helical';
      else if (nameLower.includes('ultrasonic')) newSubcat = 'Ultrasonic';
      else if (nameLower.includes('thermal')) newSubcat = 'Thermal Mass';
      else if (nameLower.includes('oval')) newSubcat = 'Oval Gear';
      else if (nameLower.includes('fuel') || nameLower.includes('dispenser')) newSubcat = 'Fuel Consumption';
    } else if (catSlug === 'level-transmitters') {
      if (nameLower.includes('ultrasonic')) newSubcat = 'Ultrasonic';
      else if (nameLower.includes('radar') || nameLower.includes('microwave')) newSubcat = 'Radar';
      else if (nameLower.includes('tuning fork')) newSubcat = 'Float'; // approximation
    }
  }
  
  return `{
    id: "${id}",
    name: "${name}",
    slug: "${slug}",
    categorySlug: "${catSlug}",
    subcategory: "${newSubcat}",`;
});

fs.writeFileSync('src/lib/data.ts', updatedData);
console.log('Fixed subcategories!');
