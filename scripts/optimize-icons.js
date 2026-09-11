import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function optimizeIcons() {
  const faviconPath = path.resolve('public/favicon.png');
  const monogramPath = path.resolve('public/images/brand/tarun-monogram.png');

  const sourcePath = fs.existsSync(monogramPath) ? monogramPath : faviconPath;
  const sourceBuffer = fs.readFileSync(sourcePath);

  // Resize and compress favicon (192x192)
  await sharp(sourceBuffer)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(path.resolve('public/favicon.png'));

  // Resize and compress apple touch icon (180x180)
  await sharp(sourceBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(path.resolve('public/apple-touch-icon.png'));

  console.log('Favicons and touch icons optimized successfully!');
}

optimizeIcons().catch(console.error);
