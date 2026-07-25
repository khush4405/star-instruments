const fs = require('fs');

let data = fs.readFileSync('src/lib/data.ts', 'utf8');

// Fix missing commas between objects
data = data.replace(/\}\s*\{/g, '},\n  {');

fs.writeFileSync('src/lib/data.ts', data);
console.log('Fixed missing commas');
