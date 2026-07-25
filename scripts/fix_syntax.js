const fs = require('fs');

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

// The leftover fragments look like this:
//   features: ["Standard features"]
//   },
// or with a comma before it.

data = data.replace(/,\s*features:\s*\["Standard features"\]\s*\},?/g, '');
// Also if there's no comma
data = data.replace(/features:\s*\["Standard features"\]\s*\},?/g, '');

fs.writeFileSync('src/lib/data.ts', data);
console.log('Fixed syntax errors');
