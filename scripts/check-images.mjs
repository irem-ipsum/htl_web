/**
 * Checks that every image path written in lib/data.ts actually exists in
 * public/, and that every gallery photo has alt text.
 *
 * Run it with:  npm run check-images
 *
 * Catches the two mistakes that are easy to make and hard to spot: a folder or
 * filename that does not match what data.ts says (capital letters, underscores
 * instead of hyphens, a typo), and a photo added without a description.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "lib/data.ts"), "utf8");

const RED = "\x1b[31m", YELLOW = "\x1b[33m", GREEN = "\x1b[32m", DIM = "\x1b[2m", OFF = "\x1b[0m";

// Every "/images/..." string in the file, with the line it sits on.
const missing = [];
const seen = new Set();
source.split("\n").forEach((line, i) => {
  for (const m of line.matchAll(/"(\/images\/[^"]+)"/g)) {
    const path = m[1];
    seen.add(path);
    if (!existsSync(join(root, "public", path))) {
      missing.push({ path, line: i + 1 });
    }
  }
});

// Gallery entries with no alt text.
const noAlt = [];
const galleryBlock = source.slice(
  source.indexOf("export const gallery"),
  source.indexOf("];", source.indexOf("export const gallery"))
);
galleryBlock.split("\n").forEach((line) => {
  const src = line.match(/src:\s*"([^"]+)"/);
  if (src && !/alt:\s*"[^"]*\S[^"]*"/.test(line)) noAlt.push(src[1]);
});

console.log(`\n${DIM}Checked ${seen.size} image paths in lib/data.ts${OFF}\n`);

if (missing.length) {
  console.log(`${RED}${missing.length} image${missing.length > 1 ? "s" : ""} not found in public/${OFF}`);
  for (const m of missing) console.log(`  ${RED}x${OFF} ${m.path}  ${DIM}(data.ts line ${m.line})${OFF}`);
  console.log(`\n  ${DIM}Check the folder and file name match exactly, including capitals,`);
  console.log(`  hyphens and underscores. "Oyun_Bozan" and "oyun-bozan" are different.${OFF}\n`);
}

if (noAlt.length) {
  console.log(`${YELLOW}${noAlt.length} gallery photo${noAlt.length > 1 ? "s have" : " has"} no alt text${OFF}`);
  for (const s of noAlt) console.log(`  ${YELLOW}!${OFF} ${s}`);
  console.log(`\n  ${DIM}Add alt: "what is happening in the photo" to each one.${OFF}\n`);
}

if (!missing.length && !noAlt.length) {
  console.log(`${GREEN}All good. Every image exists and every photo has alt text.${OFF}\n`);
}

process.exit(missing.length ? 1 : 0);
