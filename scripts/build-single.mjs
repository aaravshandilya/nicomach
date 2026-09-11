/**
 * Builds the whole site into ONE self-contained HTML file at dist-single/index.html.
 *
 * Why this exists: GitHub Pages serves a project site from a subpath
 * (username.github.io/repo/), which breaks any build that references its assets
 * by absolute path. A single file with everything inlined has no asset
 * references at all, so it works at the apex, at a subpath, from a file:// URL,
 * or anywhere else — with no `base` to configure and nothing to get wrong.
 *
 * html-inline can't cope with absolute URLs (it tries to open
 * "https://fonts.googleapis.com" as a local file and throws), so the font link
 * is stripped out of a temporary entry before bundling and put back afterwards.
 */
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const run = (cmd) => execSync(cmd, { cwd: root, stdio: "inherit" });

const entry = readFileSync(resolve(root, "index.html"), "utf8");

// pull the font tags out, remember them
const fontTags = [...entry.matchAll(/^\s*<link[^>]*fonts\.g[^>]*>\s*$/gm)].map((m) => m[0].trim());
const stripped = entry.replace(/^\s*<link[^>]*fonts\.g[^>]*>\s*$/gm, "");

rmSync(resolve(root, "dist"), { recursive: true, force: true });
rmSync(resolve(root, ".parcel-cache"), { recursive: true, force: true });
writeFileSync(resolve(root, "_single-entry.html"), stripped);

try {
  run("pnpm exec parcel build _single-entry.html --dist-dir dist --no-source-maps");
  run("pnpm exec html-inline dist/_single-entry.html > _single-raw.html");

  let out = readFileSync(resolve(root, "_single-raw.html"), "utf8");

  // put the fonts back, right after the charset meta
  const fonts = fontTags.join("\n    ");
  out = out.replace(/(<meta charset=[^>]*>)/i, `$1\n    ${fonts}`);
  if (!out.includes("fonts.googleapis")) {
    throw new Error("font link was not re-injected — check the entry markup");
  }

  mkdirSync(resolve(root, "dist-single"), { recursive: true });
  writeFileSync(resolve(root, "dist-single/index.html"), out);
  writeFileSync(resolve(root, "dist-single/.nojekyll"), "");

  const kb = Math.round(Buffer.byteLength(out) / 1024);
  console.log(`\n✓ dist-single/index.html  (${kb} KB, self-contained)`);
} finally {
  rmSync(resolve(root, "_single-entry.html"), { force: true });
  rmSync(resolve(root, "_single-raw.html"), { force: true });
}
