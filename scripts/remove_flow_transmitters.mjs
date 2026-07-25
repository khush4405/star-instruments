import fs from 'fs';

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

// Wipe subcategories from flow-transmitters
data = data.replace(
  /slug:\s*"flow-transmitters",\n\s*description:[^}]+image:[^}]+subcategories:\s*\[[^\]]+\]/,
  (match) => {
    return match.replace(/subcategories:\s*\[[^\]]+\]/, 'subcategories: []');
  }
);

data = data.replace(
  /sampleProducts:\s*\[[^\]]+\]/,
  (match, offset, str) => {
    // Only replace the first one after flow-transmitters, which is safe since we just replaced subcategories
    if (str.substring(offset - 200, offset).includes('flow-transmitters')) {
      return 'sampleProducts: []';
    }
    return match;
  }
);

// We won't delete the products from the array because they will just be ignored since they aren't linked anymore,
// but the prompt said "remvoe existing categories in flow-transmitters". We already removed the subcategories from the Category object.
// We'll also remove the actual products from the products array to keep it clean.
const startIdx = data.indexOf('export const products: Product[] = [');
const endIdx = data.indexOf('];', startIdx);
let productsBlock = data.substring(startIdx, endIdx);

// Remove all product blocks that have categorySlug: "flow-transmitters"
const blockRegex = /\{\s*id:[^}]+categorySlug:\s*"flow-transmitters"[^}]+features:\s*\[[^\]]+\]\s*\},?/g;
productsBlock = productsBlock.replace(blockRegex, '');

// Clean up any stray commas/syntax errors like last time
productsBlock = productsBlock.replace(/\}\s*\{/g, '},\n  {');

data = data.substring(0, startIdx) + productsBlock + data.substring(endIdx);

fs.writeFileSync('src/lib/data.ts', data);
console.log('Removed old flow transmitters from data.ts');
