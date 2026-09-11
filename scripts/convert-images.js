import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public/images');

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') return;

  const baseName = filePath.slice(0, -ext.length);
  const webpPath = `${baseName}.webp`;

  try {
    const inputBuffer = fs.readFileSync(filePath);
    const metadata = await sharp(inputBuffer).metadata();
    console.log(`Processing: ${filePath} (${metadata.width}x${metadata.height}, ${inputBuffer.length} bytes)`);

    // Generate high quality WebP
    await sharp(inputBuffer)
      .webp({ quality: 85, effort: 6 })
      .toFile(webpPath);

    const webpStat = fs.statSync(webpPath);
    console.log(` -> Generated WebP: ${webpPath} (${webpStat.size} bytes - ${Math.round((1 - webpStat.size / inputBuffer.length) * 100)}% savings)`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

async function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await scanDir(fullPath);
    } else {
      await processImage(fullPath);
    }
  }
}

async function run() {
  console.log('Starting image WebP optimization...');
  await scanDir(publicDir);
  console.log('Image optimization complete!');
}

run();
