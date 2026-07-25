import fs from 'fs';

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

// Parse current products block
const startIdx = data.indexOf('export const products: Product[] = [');
const endIdx = data.indexOf('];', startIdx);
let productsBlock = data.substring(startIdx, endIdx);

// Remove all product blocks that have categorySlug: "automation-products"
const blockRegex = /\{\s*id:[^}]+categorySlug:\s*"automation-products"[^}]+features:\s*\[[^\]]+\]\s*\},?/g;
productsBlock = productsBlock.replace(blockRegex, '');

data = data.substring(0, startIdx) + productsBlock + data.substring(endIdx);
fs.writeFileSync('src/lib/data.ts', data);
console.log('Removed old automation products from data.ts');
