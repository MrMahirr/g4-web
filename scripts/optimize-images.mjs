#!/usr/bin/env node
/**
 * Görsel arşivi → WebP.
 *
 *   gorsel-arsivi/<klasör>/<ad>.(jpg|jpeg|png|webp|avif)   orijinaller (tek kaynak, sitede sunulmaz)
 *   public/images/<klasör>/<ad>.webp                      sitenin kullandığı küçültülmüş kopya
 *
 * Yeni görsel eklemek: dosyayı arşivde doğru klasöre koy → `npm run images` → manifestte
 * `src: "/images/<klasör>/<ad>.webp"` olarak kullan.
 *
 * Yalnız değişen dosyalar işlenir (kaynak, çıktıdan yeniyse). Hepsini yeniden üretmek için: `npm run images -- --force`.
 * Arşivde karşılığı kalmayan .webp dosyaları listelenir, silinmez (`--prune` ile silinir).
 */
import { mkdir, readdir, stat, unlink } from "node:fs/promises";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = join(ROOT, "gorsel-arsivi");
const OUTPUT_DIR = join(ROOT, "public", "images");
const SOURCE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Uzun kenar sınırı: tam ekran kapak 1440px'te 2x için yeterli; next/image bundan küçük boyları üretir. */
const MAX_EDGE = 2000;
/** Fotoğraf kalitesi; şeffaf (alfa kanallı) ürün kesimlerinde kenar temiz kalsın diye alfa kayıpsız. */
const WEBP_OPTIONS = { quality: 80, alphaQuality: 100, effort: 5, smartSubsample: true };
/** Plan 8.5: kaynak dosyalar ≤ 400 KB. Aşan olursa uyarılır. */
const SIZE_BUDGET = 400 * 1024;

const args = new Set(process.argv.slice(2));
const force = args.has("--force");
const prune = args.has("--prune");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return files.flat();
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;
const toPosix = (path) => path.split(sep).join("/");

const sources = (await walk(SOURCE_DIR)).filter((file) => SOURCE_EXT.has(extname(file).toLowerCase()));
if (!sources.length) {
  console.error(`Arşivde görsel yok: ${SOURCE_DIR}`);
  process.exit(1);
}

// Aynı ada sahip iki kaynak (ör. x.jpg ve x.png) aynı x.webp'ye yazılırdı.
const byOutput = new Map();
for (const file of sources) {
  const key = toPosix(relative(SOURCE_DIR, file)).replace(/\.[^.]+$/, "");
  if (byOutput.has(key)) {
    console.error(`Çakışma: "${key}" için iki kaynak var:\n  ${byOutput.get(key)}\n  ${file}`);
    process.exit(1);
  }
  byOutput.set(key, file);
}

let converted = 0;
let skipped = 0;
let totalIn = 0;
let totalOut = 0;
const overBudget = [];

for (const [key, source] of byOutput) {
  const output = join(OUTPUT_DIR, `${key}.webp`);
  const [sourceStat, outputStat] = await Promise.all([stat(source), stat(output).catch(() => null)]);

  if (!force && outputStat && outputStat.mtimeMs >= sourceStat.mtimeMs) {
    skipped++;
    if (outputStat.size > SIZE_BUDGET) overBudget.push(`${key}.webp (${kb(outputStat.size)})`);
    continue;
  }

  await mkdir(dirname(output), { recursive: true });
  const info = await sharp(source)
    .rotate() // EXIF yönünü uygula
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp(WEBP_OPTIONS)
    .toFile(output);

  converted++;
  totalIn += sourceStat.size;
  totalOut += info.size;
  if (info.size > SIZE_BUDGET) overBudget.push(`${key}.webp (${kb(info.size)})`);
  console.log(`  ${key}  ${kb(sourceStat.size)} → ${kb(info.size)}  (${info.width}×${info.height})`);
}

// Arşivde kaynağı olmayan çıktılar
const orphans = (await walk(OUTPUT_DIR)).filter((file) => {
  if (extname(file).toLowerCase() !== ".webp") return false;
  return !byOutput.has(toPosix(relative(OUTPUT_DIR, file)).replace(/\.webp$/i, ""));
});
for (const orphan of orphans) {
  if (prune) await unlink(orphan);
  console.warn(`  ${prune ? "silindi" : "kaynaksız"}: ${toPosix(relative(ROOT, orphan))}`);
}

console.log(
  `\n${converted} dönüştürüldü, ${skipped} güncel` +
    (converted ? ` · ${kb(totalIn)} → ${kb(totalOut)} (%${Math.round((1 - totalOut / totalIn) * 100)} küçük)` : ""),
);
if (overBudget.length) console.warn(`400 KB sınırını aşan ${overBudget.length} dosya:\n  ${overBudget.join("\n  ")}`);
