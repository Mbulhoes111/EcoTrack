import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ASSETS_DIR = path.join(process.cwd(), 'assets');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    // Ignore directory-creation issues when assets already exist
  }
}

async function convertFile(file) {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  const input = path.join(ASSETS_DIR, file);
  const outWebp = path.join(ASSETS_DIR, `${base}.webp`);
  const outPng = path.join(ASSETS_DIR, `${base}.png`);

  try {
    const image = sharp(input, { density: 300 });
    await image.webp({ quality: 80 }).toFile(outWebp);
    await image.png({ compressionLevel: 8 }).toFile(outPng);
    console.log(`Converted ${file} -> ${base}.webp, ${base}.png`);
  } catch (err) {
    console.warn(`Skipping ${file}: ${err.message}`);
  }
}

async function run() {
  await ensureDir(ASSETS_DIR);
  const files = await fs.readdir(ASSETS_DIR);
  const candidates = files.filter((f) => /\.(png|jpg|jpeg|svg)$/i.test(f));
  for (const f of candidates) await convertFile(f);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
