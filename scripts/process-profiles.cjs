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
          <radialGradient id="light" cx="50%" cy="28%" r="65%" fx="50%" fy="24%">
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
  // 1. EXECUTIVE SPOTLIGHT: tarun-executive.webp (800x1000 - 4:5 vertical)
  // Scaled down with natural headroom and full armchair / posture presence
  // Black shirt, dark blazer, armchair, watch, hand on chin.
  // Extract width 660, height 555 from (x=215, y=0)
  // =========================================================================
  const spotCropped = await sharp(srcBlack)
    .extract({ left: 215, top: 0, width: 660, height: 555 })
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

  console.log('✓ Executive Spotlight 4:5 (Proportionally Sized) generated');

  // =========================================================================
  // 2. HERO PORTRAIT: tarun-light-portrait.webp (800x1000 - 4:5 vertical)
  // White shirt, dark blazer, sunglasses.
  // Extract width 620, height 560 from (x=205, y=0)
  // =========================================================================
  const heroCropped = await sharp(srcWhite)
    .extract({ left: 205, top: 0, width: 620, height: 560 })
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

  console.log('✓ Hero Portrait 4:5 (Proportionally Sized) generated');

  // =========================================================================
  // 3. HEADSHOT / AVATAR: tarun-headshot.webp (600x600 - 1:1)
  // =========================================================================
  const headCropped = await sharp(srcWhite)
    .extract({ left: 290, top: 0, width: 470, height: 470 })
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

  console.log('✓ Headshot Avatar 1:1 generated');

  // =========================================================================
  // 4. DIRECT BADGE: tarun-about.webp (600x600 - 1:1)
  // =========================================================================
  const aboutCropped = await sharp(srcBlack)
    .extract({ left: 310, top: 0, width: 470, height: 470 })
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

  console.log('✓ Direct Badge 1:1 generated');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
