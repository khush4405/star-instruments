import sharp from 'sharp';
import path from 'path';

const input = path.resolve('public/images/star-logo.png');
const output = path.resolve('public/images/star-logo-trimmed.png');

async function trimLogo() {
  const metadata = await sharp(input).metadata();
  console.log(`Original: ${metadata.width}x${metadata.height}`);

  // Trim transparent whitespace and add a tiny 10px pad back
  await sharp(input)
    .trim()       // auto-removes uniform borders (transparent pixels)
    .extend({     // add back small padding so it doesn't feel cramped
      top: 4,
      bottom: 4,
      left: 8,
      right: 8,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFile(output);

  const trimmed = await sharp(output).metadata();
  console.log(`Trimmed:  ${trimmed.width}x${trimmed.height}`);
  console.log('✅ Saved to', output);
}

trimLogo().catch(console.error);
