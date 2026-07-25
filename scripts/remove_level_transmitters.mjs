import fs from 'fs';

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

// Wipe subcategories from level-transmitters
data = data.replace(
  /slug:\s*"level-transmitters",\n\s*description:[^}]+image:[^}]+subcategories:\s*\[[^\]]+\]/,
  (match) => {
    return match.replace(/subcategories:\s*\[[^\]]+\]/, 'subcategories: []');
  }
);

// We won't try replacing sampleProducts with regex for safety, let's just wipe the actual products
const startIdx = data.indexOf('export const products: Product[] = [');
const endIdx = data.indexOf('];', startIdx);
let productsBlock = data.substring(startIdx, endIdx);

// Remove all product blocks that have categorySlug: "level-transmitters"
const blockRegex = /\{\s*id:[^}]+categorySlug:\s*"level-transmitters"[^}]+features:\s*\[[^\]]+\]\s*\},?/g;
productsBlock = productsBlock.replace(blockRegex, '');

// Clean up any stray commas/syntax errors
productsBlock = productsBlock.replace(/\}\s*\{/g, '},\n  {');

data = data.substring(0, startIdx) + productsBlock + data.substring(endIdx);

fs.writeFileSync('src/lib/data.ts', data);
console.log('Removed old level transmitters from data.ts');
