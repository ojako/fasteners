# Fastener Icon Imports

The fastener icon source of truth now lives in `icons/fasteners/`.

## Files

- `manifest.json`: shape metadata, viewBoxes, and alias entries
- `slug-map.json`: page slug to shape-key mapping used by the site
- `*.svg`: framework-neutral raw SVG assets

## Styling contract

- Primary geometry uses `currentColor`
- Secondary detail uses `var(--fastener-icon-inset, currentColor)`
- Raw SVG files intentionally do not include classes, sizing attributes, or framework-specific accessibility attributes
- Raw SVG geometry is authored directly in the declared viewBox rather than being centered with a top-level translate wrapper
- Render icons in a fixed bounding frame and let the SVG fill it with `preserveAspectRatio="xMidYMid meet"`

## Plain HTML

Inline the SVG markup and set the color tokens from CSS:

```html
<div style="color:#c9d1db; --fastener-icon-inset:#516170">
  <!-- paste icons/fasteners/screw-flat.svg here -->
</div>
```

## Bundler import

Projects using Vite-compatible raw imports can consume the assets directly:

```ts
import screwFlat from '../../icons/fasteners/screw-flat.svg?raw';
```

Use `manifest.json` when you need to resolve a shape key or alias first.
