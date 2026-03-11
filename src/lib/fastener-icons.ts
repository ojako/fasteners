import manifestData from '../../icons/fasteners/manifest.json';
import slugMapData from '../../icons/fasteners/slug-map.json';

export const FASTENER_ICON_CATEGORIES = ['screws', 'bolts', 'anchors', 'nuts', 'washers'] as const;
export const FASTENER_ICON_FRAMES = ['list', 'home', 'detail', 'qa'] as const;

export type FastenerIconCategory = typeof FASTENER_ICON_CATEGORIES[number];
export type FastenerIconOrientation = 'portrait' | 'landscape';
export type FastenerIconFrame = typeof FASTENER_ICON_FRAMES[number];

interface FastenerIconCategorySpec {
  viewBox: string;
  viewportWidth: number;
  viewportHeight: number;
  artBoxInset: string;
}

interface FastenerIconFrameSpec {
  width: number;
  height: number;
}

export const FASTENER_ICON_CATEGORY_SPECS: Record<FastenerIconCategory, FastenerIconCategorySpec> = {
  screws: {
    viewBox: '0 0 60 100',
    viewportWidth: 60,
    viewportHeight: 100,
    artBoxInset: '6% 16.667% 6% 16.667%',
  },
  bolts: {
    viewBox: '0 0 60 100',
    viewportWidth: 60,
    viewportHeight: 100,
    artBoxInset: '6% 16.667% 6% 16.667%',
  },
  anchors: {
    viewBox: '0 0 60 100',
    viewportWidth: 60,
    viewportHeight: 100,
    artBoxInset: '6% 16.667% 6% 16.667%',
  },
  nuts: {
    viewBox: '0 0 80 60',
    viewportWidth: 80,
    viewportHeight: 60,
    artBoxInset: '6.667% 10% 6.667% 10%',
  },
  washers: {
    viewBox: '0 0 80 40',
    viewportWidth: 80,
    viewportHeight: 40,
    artBoxInset: '10% 12.5% 10% 12.5%',
  },
};

export const FASTENER_ICON_FRAME_SPECS: Record<FastenerIconFrame, FastenerIconFrameSpec> = {
  list: {
    width: 96,
    height: 48,
  },
  home: {
    width: 112,
    height: 56,
  },
  detail: {
    width: 160,
    height: 80,
  },
  qa: {
    width: 160,
    height: 80,
  },
};

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
  svgClassName?: string;
  decorative?: boolean;
  title?: string;
}

export interface RenderFastenerIconOptions extends RenderShapeOptions {
  slug: string;
  category: FastenerIconCategory;
}

function formatPx(value: number): string {
  return `${Number.parseFloat(value.toFixed(3))}px`;
}

export function getFastenerIconFrameStyle(frame: FastenerIconFrame): string {
  const spec = FASTENER_ICON_FRAME_SPECS[frame];
  return `width: ${spec.width}px; height: ${spec.height}px;`;
}

export function getFastenerIconArtBoxStyle(category: FastenerIconCategory): string {
  return `inset: ${FASTENER_ICON_CATEGORY_SPECS[category].artBoxInset};`;
}

export function getFastenerIconViewportStyle(category: FastenerIconCategory, frame: FastenerIconFrame): string {
  const categorySpec = FASTENER_ICON_CATEGORY_SPECS[category];
  const frameSpec = FASTENER_ICON_FRAME_SPECS[frame];
  const categoryAspectRatio = categorySpec.viewportWidth / categorySpec.viewportHeight;
  let viewportWidth = frameSpec.width;
  let viewportHeight = viewportWidth / categoryAspectRatio;

  if (viewportHeight > frameSpec.height) {
    viewportHeight = frameSpec.height;
    viewportWidth = viewportHeight * categoryAspectRatio;
  }

  const left = (frameSpec.width - viewportWidth) / 2;
  const top = (frameSpec.height - viewportHeight) / 2;

  return [
    `left: ${formatPx(left)}`,
    `top: ${formatPx(top)}`,
    `width: ${formatPx(viewportWidth)}`,
    `height: ${formatPx(viewportHeight)}`,
  ].join('; ');
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
    'class': options.svgClassName ?? '',
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
    svgClassName: options.svgClassName,
    decorative: options.decorative,
    title: options.title?.trim() || (!options.decorative ? humanizeSlug(options.slug) : undefined),
  });
}
