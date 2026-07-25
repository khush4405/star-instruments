import fs from 'fs';

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

// 1. Remove instrument-hardware from productCategories
// Look for the block { id: ..., slug: "instrument-hardware", ... }
const catStart = data.indexOf('slug: "instrument-hardware"');
if (catStart !== -1) {
  // Find the start of the object {
  let objStart = data.lastIndexOf('{', catStart);
  // Find the end of the object },
  let objEnd = data.indexOf('},', catStart);
  
  if (objStart !== -1 && objEnd !== -1) {
    // Remove the entire object block
    data = data.substring(0, objStart) + data.substring(objEnd + 2);
  }
}

// 2. Remove any products with categorySlug: "instrument-hardware"
const startIdx = data.indexOf('export const products: Product[] = [');
const endIdx = data.indexOf('];', startIdx);
let productsBlock = data.substring(startIdx, endIdx);

const blockRegex = /\{\s*id:[^}]+categorySlug:\s*"instrument-hardware"[\s\S]*?(?=\},\s*\{|\}\s*\])/g;

productsBlock = productsBlock.replace(blockRegex, '');

// Clean up any stray syntax errors
productsBlock = productsBlock.replace(/\}\s*,\s*,/g, '},');
productsBlock = productsBlock.replace(/,\s*\}/g, '}');

data = data.substring(0, startIdx) + productsBlock + data.substring(endIdx);

fs.writeFileSync('src/lib/data.ts', data);
console.log('Removed instrument-hardware category and products from data.ts');
