import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const iconsDir = path.join(rootDir, 'icons', 'fasteners');
const manifest = JSON.parse(readFileSync(path.join(iconsDir, 'manifest.json'), 'utf8'));
const slugMap = JSON.parse(readFileSync(path.join(iconsDir, 'slug-map.json'), 'utf8'));

const categories = new Set(['screws', 'bolts', 'anchors', 'nuts', 'washers']);
const allowedColorTokens = new Set(['none', 'currentColor', 'var(--fastener-icon-inset, currentColor)']);
const errors = [];

function fail(message) {
  errors.push(message);
}

function validateSvgContract(entry, svg) {
  const svgRootMatches = [...svg.matchAll(/<svg\b/g)];
  const rootOpenTagMatch = svg.match(/^<svg\b([^>]*)>/);

  if (svgRootMatches.length !== 1) {
    fail(`${entry.shapeKey}: expected exactly one root <svg> element`);
  }

  if (!svg.includes('xmlns="http://www.w3.org/2000/svg"')) {
    fail(`${entry.shapeKey}: missing SVG namespace`);
  }

  if (!svg.includes('preserveAspectRatio="xMidYMid meet"')) {
    fail(`${entry.shapeKey}: missing preserveAspectRatio contract`);
  }

  if (!svg.startsWith('<svg ') || !svg.trim().endsWith('</svg>')) {
    fail(`${entry.shapeKey}: SVG must start with <svg> and end with </svg>`);
  }

  const viewBoxMatch = svg.match(/<svg[^>]*viewBox="([^"]+)"/);

  if (!viewBoxMatch || viewBoxMatch[1] !== entry.viewBox) {
    fail(`${entry.shapeKey}: viewBox mismatch, expected ${entry.viewBox}`);
  }

  if (/\s(?:class|style|role|focusable|aria-[\w-]+)=/.test(svg)) {
    fail(`${entry.shapeKey}: raw SVG contains framework or accessibility attributes`);
  }

  if (rootOpenTagMatch && /\s(?:width|height)=/.test(rootOpenTagMatch[1])) {
    fail(`${entry.shapeKey}: root SVG should not include width or height attributes`);
  }

  if (/<svg\b[^>]*>\s*<g\b[^>]*transform="translate\([^)]+\)"/.test(svg)) {
    fail(`${entry.shapeKey}: canonical SVG should not use a top-level translate wrapper for centering`);
  }

  for (const match of svg.matchAll(/\b(?:stroke|fill)="([^"]+)"/g)) {
    if (!allowedColorTokens.has(match[1])) {
      fail(`${entry.shapeKey}: unsupported color token "${match[1]}"`);
    }
  }
}

if (!Array.isArray(manifest.icons)) {
  fail('manifest.json must expose an icons array');
}

const manifestByShapeKey = new Map();

for (const entry of manifest.icons ?? []) {
  if (manifestByShapeKey.has(entry.shapeKey)) {
    fail(`Duplicate manifest shapeKey ${entry.shapeKey}`);
    continue;
  }

  if (!categories.has(entry.category)) {
    fail(`${entry.shapeKey}: invalid category ${entry.category}`);
  }

  manifestByShapeKey.set(entry.shapeKey, entry);
}

for (const entry of manifest.icons ?? []) {
  if ('sameAs' in entry) {
    const target = manifestByShapeKey.get(entry.sameAs);

    if (!target) {
      fail(`${entry.shapeKey}: alias target ${entry.sameAs} does not exist`);
      continue;
    }

    if (entry.viewBox !== target.viewBox || entry.orientation !== target.orientation) {
      fail(`${entry.shapeKey}: alias metadata must match canonical target ${entry.sameAs}`);
    }

    continue;
  }

  const filePath = path.join(iconsDir, entry.file);

  if (!existsSync(filePath)) {
    fail(`${entry.shapeKey}: missing SVG file ${entry.file}`);
    continue;
  }

  validateSvgContract(entry, readFileSync(filePath, 'utf8').trim());
}

for (const [category, mappings] of Object.entries(slugMap)) {
  if (!categories.has(category)) {
    fail(`slug-map.json contains invalid category ${category}`);
    continue;
  }

  for (const [slug, shapeKey] of Object.entries(mappings)) {
    if (!manifestByShapeKey.has(shapeKey)) {
      fail(`${category}/${slug}: missing manifest entry for ${shapeKey}`);
    }
  }
}

if (errors.length > 0) {
  console.error('Fastener icon validation failed:\n');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const canonicalCount = manifest.icons.filter((entry) => !('sameAs' in entry)).length;
const slugCount = Object.values(slugMap).reduce((count, mappings) => count + Object.keys(mappings).length, 0);

console.log(`Validated ${manifest.icons.length} manifest entries, ${canonicalCount} canonical SVG files, and ${slugCount} slug mappings.`);
