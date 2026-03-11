import manifestData from '../../icons/fasteners/manifest.json';
import slugMapData from '../../icons/fasteners/slug-map.json';

export const FASTENER_ICON_CATEGORIES = ['screws', 'bolts', 'anchors', 'nuts', 'washers'] as const;

export type FastenerIconCategory = typeof FASTENER_ICON_CATEGORIES[number];
export type FastenerIconOrientation = 'portrait' | 'landscape';

interface BaseManifestEntry {
  shapeKey: string;
  category: FastenerIconCategory;
  viewBox: string;
  orientation: FastenerIconOrientation;
}

interface CanonicalManifestEntry extends BaseManifestEntry {
  file: string;
}

interface AliasManifestEntry extends BaseManifestEntry {
  sameAs: string;
}

export type FastenerIconManifestEntry = CanonicalManifestEntry | AliasManifestEntry;
export type FastenerIconSlugMap = Record<FastenerIconCategory, Record<string, string>>;

const fastenerIconManifest = manifestData.icons as FastenerIconManifestEntry[];
export const fastenerIconSlugMap = slugMapData as FastenerIconSlugMap;
export { fastenerIconManifest };

const svgModules = import.meta.glob('../../icons/fasteners/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const manifestByShapeKey = new Map(fastenerIconManifest.map((entry) => [entry.shapeKey, entry]));
const svgByShapeKey = new Map<string, string>();

for (const entry of fastenerIconManifest) {
  if ('sameAs' in entry) {
    continue;
  }

  const svg = svgModules[`../../icons/fasteners/${entry.file}`];

  if (!svg) {
    throw new Error(`Missing SVG asset for ${entry.shapeKey}`);
  }

  svgByShapeKey.set(entry.shapeKey, svg);
}

function escapeAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((token) => token[0]?.toUpperCase() + token.slice(1))
    .join(' ');
}

function resolveCanonicalShapeKey(shapeKey: string): string | null {
  const seen = new Set<string>();
  let current = shapeKey;

  while (current) {
    if (seen.has(current)) {
      throw new Error(`Circular fastener icon alias detected for ${shapeKey}`);
    }

    seen.add(current);

    const entry = manifestByShapeKey.get(current);

    if (!entry) {
      return null;
    }

    if (!('sameAs' in entry)) {
      return current;
    }

    current = entry.sameAs;
  }

  return null;
}

function injectSvgAttributes(svg: string, attributes: Record<string, string>): string {
  const serialized = Object.entries(attributes)
    .filter(([, value]) => value.length > 0)
    .map(([key, value]) => `${key}="${escapeAttribute(value)}"`)
    .join(' ');

  return svg.replace('<svg ', `<svg ${serialized} `);
}

interface RenderShapeOptions {
  className?: string;
  decorative?: boolean;
  title?: string;
}

export interface RenderFastenerIconOptions extends RenderShapeOptions {
  slug: string;
  category: FastenerIconCategory;
}

export function resolveFastenerShapeKey(category: FastenerIconCategory, slug: string): string | null {
  return fastenerIconSlugMap[category]?.[slug] ?? null;
}

export function getFastenerIconSvg(shapeKey: string): string | null {
  const canonicalShapeKey = resolveCanonicalShapeKey(shapeKey);

  if (!canonicalShapeKey) {
    return null;
  }

  return svgByShapeKey.get(canonicalShapeKey) ?? null;
}

export function renderFastenerShapeIcon(shapeKey: string, options: RenderShapeOptions = {}): string | null {
  const svg = getFastenerIconSvg(shapeKey);

  if (!svg) {
    return null;
  }

  const decorative = options.decorative ?? true;
  const label = !decorative ? options.title?.trim() || humanizeSlug(shapeKey) : '';
  const attributes: Record<string, string> = {
    'data-fastener-icon': shapeKey,
    'focusable': 'false',
    'class': options.className ?? '',
    'aria-hidden': decorative ? 'true' : '',
    'role': decorative ? '' : 'img',
    'aria-label': decorative ? '' : label,
    'title': options.title?.trim() ?? '',
  };

  return injectSvgAttributes(svg, attributes);
}

export function renderFastenerIcon(options: RenderFastenerIconOptions): string | null {
  const shapeKey = resolveFastenerShapeKey(options.category, options.slug);

  if (!shapeKey) {
    return null;
  }

  return renderFastenerShapeIcon(shapeKey, {
    className: options.className,
    decorative: options.decorative,
    title: options.title?.trim() || (!options.decorative ? humanizeSlug(options.slug) : undefined),
  });
}
