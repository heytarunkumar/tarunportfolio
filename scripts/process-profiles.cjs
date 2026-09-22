const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcWhite = 'C:/Users/hp/.gemini/antigravity-ide/brain/6f0dc5f4-4da9-4083-bae3-6b241bfc752a/.user_uploaded/media_1790094831957.png';
const srcBlack = 'C:/Users/hp/.gemini/antigravity-ide/brain/6f0dc5f4-4da9-4083-bae3-6b241bfc752a/.user_uploaded/media_1790094831980.png';

async function generate() {
  const outDir = 'e:/portfolio/public/images';

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Soft warm studio backdrop
  function getStudioBg(w, h) {
    return Buffer.from(`
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="light" cx="50%" cy="32%" r="65%" fx="50%" fy="28%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="45%" stop-color="#FAF8F3"/>
            <stop offset="85%" stop-color="#F0E8DC"/>
            <stop offset="100%" stop-color="#E4D9C8"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#light)"/>
      </svg>
    `);
  }

  // =========================================================================
  // 1. HERO PORTRAIT: tarun-light-portrait.webp (800x1000 - 4:5 vertical)
  // White shirt, dark blazer, sunglasses.
  // Head is centered around x=520, y=30.
  // Extract width 450, height 562 from (x=295, y=0)
  // =========================================================================
  const heroCropped = await sharp(srcWhite)
    .extract({ left: 295, top: 0, width: 450, height: 562 })
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .toBuffer();

  const heroBg = await sharp(getStudioBg(800, 1000)).png().toBuffer();

  await sharp(heroBg)
    .composite([{ input: heroCropped, blend: 'over' }])
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(outDir, 'tarun-light-portrait.webp'));

  await sharp(heroBg)
    .composite([{ input: heroCropped, blend: 'over' }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'tarun-light-hero.jpg'));

  console.log('✓ Hero Portrait 4:5 generated (800x1000)');

  // =========================================================================
  // 2. EXECUTIVE SPOTLIGHT: tarun-executive.webp (800x1000 - 4:5 vertical)
  // Black shirt, dark blazer, armchair, watch, hand on chin.
  // Head is centered around x=555, y=20.
  // Extract width 450, height 562 from (x=330, y=0)
  // =========================================================================
  const spotCropped = await sharp(srcBlack)
    .extract({ left: 330, top: 0, width: 450, height: 562 })
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .toBuffer();

  const spotBg = await sharp(getStudioBg(800, 1000)).png().toBuffer();

  await sharp(spotBg)
    .composite([{ input: spotCropped, blend: 'over' }])
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(outDir, 'tarun-executive.webp'));

  await sharp(spotBg)
    .composite([{ input: spotCropped, blend: 'over' }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'tarun-executive.jpg'));

  console.log('✓ Executive Spotlight 4:5 generated (800x1000)');

  // =========================================================================
  // 3. HEADSHOT / AVATAR: tarun-headshot.webp (600x600 - 1:1)
  // Close-up on face, sunglasses, beard, shirt collar
  // =========================================================================
  const headCropped = await sharp(srcWhite)
    .extract({ left: 330, top: 0, width: 380, height: 380 })
    .resize(600, 600, { fit: 'cover', position: 'center' })
    .toBuffer();

  const sqBg = await sharp(getStudioBg(600, 600)).png().toBuffer();

  await sharp(sqBg)
    .composite([{ input: headCropped, blend: 'over' }])
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(outDir, 'tarun-headshot.webp'));

  await sharp(sqBg)
    .composite([{ input: headCropped, blend: 'over' }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'tarun-headshot.jpg'));

  console.log('✓ Headshot Avatar 1:1 generated (600x600)');

  // =========================================================================
  // 4. DIRECT BADGE: tarun-about.webp (600x600 - 1:1)
  // Close-up on armchair executive pose (face + hand on chin)
  // =========================================================================
  const aboutCropped = await sharp(srcBlack)
    .extract({ left: 365, top: 0, width: 380, height: 380 })
    .resize(600, 600, { fit: 'cover', position: 'center' })
    .toBuffer();

  await sharp(sqBg)
    .composite([{ input: aboutCropped, blend: 'over' }])
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(outDir, 'tarun-about.webp'));

  await sharp(sqBg)
    .composite([{ input: aboutCropped, blend: 'over' }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'tarun-about.jpg'));

  console.log('✓ Direct Badge 1:1 generated (600x600)');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
