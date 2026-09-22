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

  // Soft warm studio backdrop gradient
  function getStudioBg(w, h) {
    return Buffer.from(`
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="light" cx="50%" cy="36%" r="65%" fx="50%" fy="30%">
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
  // Full subject fit with generous headroom and zero cutoff
  // =========================================================================
  const blackTrimmed = await sharp(srcBlack).trim().toBuffer({ resolveWithObject: true });
  
  // Scale black subject to fit width of ~760 inside 800 canvas (height becomes ~502)
  const blackScaled = await sharp(blackTrimmed.data)
    .resize({ width: 760, height: null, fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const spotBg = await sharp(getStudioBg(800, 1000)).png().toBuffer();
  const spotTop = Math.round(1000 - blackScaled.info.height - 40); // 40px padding from bottom, ~458px top headroom
  const spotLeft = Math.round((800 - blackScaled.info.width) / 2);

  // Also create a 4:5 balanced crop variant where head is at ~10% from top and entire subject is framed
  // The subject trimmed is 840w x 555h.
  // Extract with full hair: y=0, height=575, width=720, left=160
  const spotCropBalanced = await sharp(srcBlack)
    .extract({ left: 160, top: 0, width: 720, height: 575 })
    .resize(800, 1000, {
      fit: 'contain',
      background: { r: 250, g: 248, b: 243, alpha: 1 }
    })
    .toBuffer();

  await sharp(spotBg)
    .composite([{ input: spotCropBalanced, blend: 'over' }])
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(outDir, 'tarun-executive.webp'));

  await sharp(spotBg)
    .composite([{ input: spotCropBalanced, blend: 'over' }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'tarun-executive.jpg'));

  console.log('✓ Executive Spotlight 4:5 (Full Head, Hair & Suit Framed) generated');

  // =========================================================================
  // 2. HERO PORTRAIT: tarun-light-portrait.webp (800x1000 - 4:5 vertical)
  // White shirt, dark blazer, sunglasses with full hair and headroom
  // =========================================================================
  const heroCropBalanced = await sharp(srcWhite)
    .extract({ left: 140, top: 0, width: 720, height: 576 })
    .resize(800, 1000, {
      fit: 'contain',
      background: { r: 250, g: 248, b: 243, alpha: 1 }
    })
    .toBuffer();

  const heroBg = await sharp(getStudioBg(800, 1000)).png().toBuffer();

  await sharp(heroBg)
    .composite([{ input: heroCropBalanced, blend: 'over' }])
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(outDir, 'tarun-light-portrait.webp'));

  await sharp(heroBg)
    .composite([{ input: heroCropBalanced, blend: 'over' }])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'tarun-light-hero.jpg'));

  console.log('✓ Hero Portrait 4:5 (Full Head & Torso Framed) generated');

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
