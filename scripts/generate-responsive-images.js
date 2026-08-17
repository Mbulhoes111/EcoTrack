import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { JSDOM } from 'jsdom';

const ASSETS_DIR = path.join(process.cwd(), 'assets');
const HTML_FILE = path.join(process.cwd(), 'index.html');
const SIZES = [320, 640, 1280];

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    // Ignore directory-creation issues when assets already exist
  }
}

async function generateVariants(file) {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  const input = path.join(ASSETS_DIR, file);
  const outputs = [];

  for (const w of SIZES) {
    const webpName = `${base}-${w}.webp`;
    const pngName = `${base}-${w}.png`;
    const outWebp = path.join(ASSETS_DIR, webpName);
    const outPng = path.join(ASSETS_DIR, pngName);
    try {
      await sharp(input, { density: 300 })
        .resize({ width: w })
        .webp({ quality: 80 })
        .toFile(outWebp);

      await sharp(input, { density: 300 })
        .resize({ width: w })
        .png({ compressionLevel: 8 })
        .toFile(outPng);

      outputs.push({ w, webp: `assets/${webpName}`, png: `assets/${pngName}` });
      console.log(`Generated ${webpName}, ${pngName}`);
    } catch (err) {
      console.warn(`Failed to generate ${w} for ${file}: ${err.message}`);
    }
  }
  return outputs;
}

function buildSrcset(entries) {
  // prefer webp
  return entries.map(e => `${e.webp} ${e.w}w`).join(', ');
}

async function updateHtmlMappings(mappings) {
  const html = await fs.readFile(HTML_FILE, 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const imgs = Array.from(doc.querySelectorAll('img'));

  for (const img of imgs) {
    const src = img.getAttribute('src');
    if (!src || !src.startsWith('assets/')) continue;
    const name = path.basename(src);
    const map = mappings[name];
    if (!map) continue;

    const srcset = buildSrcset(map);
    img.setAttribute('srcset', srcset);
    img.setAttribute('sizes', '(max-width: 640px) 100vw, 640px');
    // if picture has a <source>, update it too
    const picture = img.closest('picture');
    if (picture) {
      const source = picture.querySelector('source');
      if (source) source.setAttribute('srcset', srcset);
    }
  }

  await fs.writeFile(HTML_FILE, dom.serialize(), 'utf8');
  console.log('Updated index.html with srcset attributes.');
}

async function run() {
  await ensureDir(ASSETS_DIR);
  const files = await fs.readdir(ASSETS_DIR);
  const images = files.filter(f => /\.(png|jpg|jpeg|svg)$/i.test(f));
  const mappings = {};

  for (const f of images) {
    const entries = await generateVariants(f);
    if (entries.length) mappings[f] = entries;
  }

  await updateHtmlMappings(mappings);
}

run().catch(err => { console.error(err); process.exit(1); });
