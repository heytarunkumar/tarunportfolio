import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateResponsiveIcons() {
  console.log('Generating optimized responsive icons...');

  const monogramSrc = path.resolve('public/images/brand/tarun-monogram.png');
  const origoSrc = path.resolve('public/images/origohost/origohost-icon.png');

  if (fs.existsSync(monogramSrc)) {
    const monoBuf = fs.readFileSync(monogramSrc);
    // 64x64 for navbar / footer
    await sharp(monoBuf)
      .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90, effort: 6 })
      .toFile(path.resolve('public/images/brand/tarun-monogram-64.webp'));

    // 128x128 for retina displays
    await sharp(monoBuf)
      .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90, effort: 6 })
      .toFile(path.resolve('public/images/brand/tarun-monogram-128.webp'));

    console.log('Generated tarun-monogram-64.webp and tarun-monogram-128.webp');
  }

  if (fs.existsSync(origoSrc)) {
    const origoBuf = fs.readFileSync(origoSrc);
    // 64x64 for small logo display
    await sharp(origoBuf)
      .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90, effort: 6 })
      .toFile(path.resolve('public/images/origohost/origohost-icon-64.webp'));

    // 128x128 for retina displays
    await sharp(origoBuf)
      .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90, effort: 6 })
      .toFile(path.resolve('public/images/origohost/origohost-icon-128.webp'));

    console.log('Generated origohost-icon-64.webp and origohost-icon-128.webp');
  }

  console.log('Responsive icon generation complete!');
}

generateResponsiveIcons().catch(console.error);
