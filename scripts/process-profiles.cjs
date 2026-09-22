const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcWhiteShirt = 'C:/Users/hp/.gemini/antigravity-ide/brain/6f0dc5f4-4da9-4083-bae3-6b241bfc752a/.user_uploaded/media_1790094831957.png';
const srcBlackArmchair = 'C:/Users/hp/.gemini/antigravity-ide/brain/6f0dc5f4-4da9-4083-bae3-6b241bfc752a/.user_uploaded/media_1790094831980.png';

const outDir = 'e:/portfolio/public/images';

async function generateAssets() {
  console.log('Generating tailored portfolio visual assets...');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Soft subtle warm studio background gradient matching portfolio (#FAF8F3 / #F4EEE4)
  function makeStudioBgSvg(width, height) {
    return Buffer.from(`
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="studioLight" cx="50%" cy="38%" r="65%" fx="50%" fy="32%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
            <stop offset="45%" stop-color="#FAF7F2" stop-opacity="1"/>
            <stop offset="80%" stop-color="#F2EBE0" stop-opacity="1"/>
            <stop offset="100%" stop-color="#E5DCCE" stop-opacity="1"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#studioLight)"/>
      </svg>
    `);
  }

  // --- ASSET 1: HERO PORTRAIT (4:5 Ratio - 800x1000) ---
  // White Shirt & Suit - Crisp, visionary, sharp contrast
  const heroW = 800;
  const heroH = 1000;
  
  // Trim first to remove empty padding, then resize to fit nicely within heroW x heroH
  const whiteTrimmedHero = await sharp(srcWhiteShirt)
    .trim()
    .resize({ width: heroW, height: Math.round(heroH * 0.82), fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const heroBg = await sharp(makeStudioBgSvg(heroW, heroH)).png().toBuffer();

  const heroTop = heroH - whiteTrimmedHero.info.height;
  const heroLeft = Math.round((heroW - whiteTrimmedHero.info.width) / 2);

  await sharp(heroBg)
    .composite([
      {
        input: whiteTrimmedHero.data,
        left: Math.max(0, heroLeft),
        top: Math.max(0, heroTop),
      },
    ])
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(outDir, 'tarun-light-portrait.webp'));

  await sharp(heroBg)
    .composite([
      {
        input: whiteTrimmedHero.data,
        left: Math.max(0, heroLeft),
        top: Math.max(0, heroTop),
      },
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'tarun-light-hero.jpg'));

  console.log('✓ Generated tarun-light-portrait.webp & tarun-light-hero.jpg (Hero Section)');

  // --- ASSET 2: EXECUTIVE SPOTLIGHT (4:5 Ratio - 800x1000) ---
  // Black Shirt & Suit in Leather Armchair - Executive Founder & President aesthetic
  const blackTrimmedSpotlight = await sharp(srcBlackArmchair)
    .trim()
    .resize({ width: heroW, height: Math.round(heroH * 0.82), fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const spotlightBg = await sharp(makeStudioBgSvg(heroW, heroH)).png().toBuffer();
  const spotTop = heroH - blackTrimmedSpotlight.info.height;
  const spotLeft = Math.round((heroW - blackTrimmedSpotlight.info.width) / 2);

  await sharp(spotlightBg)
    .composite([
      {
        input: blackTrimmedSpotlight.data,
        left: Math.max(0, spotLeft),
        top: Math.max(0, spotTop),
      },
    ])
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(outDir, 'tarun-executive.webp'));

  await sharp(spotlightBg)
    .composite([
      {
        input: blackTrimmedSpotlight.data,
        left: Math.max(0, spotLeft),
        top: Math.max(0, spotTop),
      },
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'tarun-executive.jpg'));

  console.log('✓ Generated tarun-executive.webp & tarun-executive.jpg (Spotlight / About Section)');

  // --- ASSET 3: HEADSHOT / AVATAR (Square 1:1 - 600x600) ---
  // Using white shirt forward posture cropped closer to head/torso
  const sqSize = 600;
  const sqBg = await sharp(makeStudioBgSvg(sqSize, sqSize)).png().toBuffer();
  
  const whiteTrimmedSq = await sharp(srcWhiteShirt)
    .trim()
    .resize({ width: sqSize, height: Math.round(sqSize * 0.88), fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const sqTop = sqSize - whiteTrimmedSq.info.height;
  const sqLeft = Math.round((sqSize - whiteTrimmedSq.info.width) / 2);

  await sharp(sqBg)
    .composite([
      {
        input: whiteTrimmedSq.data,
        left: Math.max(0, sqLeft),
        top: Math.max(0, sqTop),
      },
    ])
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(outDir, 'tarun-headshot.webp'));

  await sharp(sqBg)
    .composite([
      {
        input: whiteTrimmedSq.data,
        left: Math.max(0, sqLeft),
        top: Math.max(0, sqTop),
      },
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'tarun-headshot.jpg'));

  console.log('✓ Generated tarun-headshot.webp & tarun-headshot.jpg (Links Page / Headshot)');

  // --- ASSET 4: DIRECT LINE / ABOUT BADGE (Square 1:1 - 600x600) ---
  // Using armchair executive posture
  const blackTrimmedSq = await sharp(srcBlackArmchair)
    .trim()
    .resize({ width: sqSize, height: Math.round(sqSize * 0.88), fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const blkSqTop = sqSize - blackTrimmedSq.info.height;
  const blkSqLeft = Math.round((sqSize - blackTrimmedSq.info.width) / 2);

  await sharp(sqBg)
    .composite([
      {
        input: blackTrimmedSq.data,
        left: Math.max(0, blkSqLeft),
        top: Math.max(0, blkSqTop),
      },
    ])
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(outDir, 'tarun-about.webp'));

  await sharp(sqBg)
    .composite([
      {
        input: blackTrimmedSq.data,
        left: Math.max(0, blkSqLeft),
        top: Math.max(0, blkSqTop),
      },
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'tarun-about.jpg'));

  console.log('✓ Generated tarun-about.webp & tarun-about.jpg (Direct Line / Contact Badge)');

  // --- ASSET 5: TRANSPARENT PNG COPIES ---
  fs.copyFileSync(srcWhiteShirt, path.join(outDir, 'tarun-white-suit.png'));
  fs.copyFileSync(srcBlackArmchair, path.join(outDir, 'tarun-black-armchair.png'));

  console.log('✓ All visual assets successfully generated and synchronized!');
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
