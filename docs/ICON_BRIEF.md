# Fastener Icon Illustration Brief

Maintain a scalable SVG icon library for 60 shape keys across the fasteners.fyi catalog.
The library currently resolves to 59 canonical drawings plus one exact alias (`bolt-hanger` -> `screw-hanger`).

This document is a production spec, not just art direction. The SVGs should render consistently in fixed bounding frames, scale cleanly, and preserve their category proportions.

## Deliverables

- **Format:** SVG, single `<svg>` element per shape
- **Color:** Primary geometry in `currentColor`, secondary detail in `var(--fastener-icon-inset, currentColor)`
- **Style:** Clean technical silhouette. Not photorealistic, not cartoonish. Think McMaster-Carr catalog line drawings.
- **Orientation:** Profile/side view. Fastener pointing down (threaded end at bottom) for screws/bolts. Top-down for washers. Side profile for nuts.
- **Thread indication:** Simplified. 3-4 angled lines suggesting thread pitch, not exact thread count.
- **Stroke weight:** Uniform 1.5-2px at reference size
- **ViewBox:** Standardized per category (see below)
- **Root SVG contract:** `xmlns`, `viewBox`, `fill="none"`, `stroke="currentColor"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `preserveAspectRatio="xMidYMid meet"`
- **No root sizing:** Do not set root `width` or `height`
- **No framework attrs:** No root `class`, `style`, `role`, `aria-*`, or app-specific attributes inside the raw asset
- **No text, no labels, no dimensions** inside the SVG

### ViewBox Sizes

| Category | viewBox | Orientation |
|----------|---------|-------------|
| Screws | `0 0 60 100` | Portrait (tall) |
| Bolts | `0 0 60 100` | Portrait (tall) |
| Nuts | `0 0 80 60` | Landscape (wide) |
| Washers | `0 0 80 40` | Landscape (wide) |
| Anchors | `0 0 60 100` | Portrait (tall) |

### Usable Art Area

Use the category viewBox as the canvas and keep the visible silhouette inside the following art boxes:

| Category | Art box | Alignment rule |
|----------|---------|----------------|
| Screws | `x=10..50`, `y=6..94` | Centered on `x=30`; head and tip align optically near top/bottom landmarks |
| Bolts | `x=10..50`, `y=6..94` | Centered on `x=30`; no blanket translation padding |
| Anchors | `x=10..50`, `y=6..94` | Centered on `x=30`; expansion details stay inside the portrait frame |
| Nuts | `x=8..72`, `y=4..56` | Centered on `x=40`; outer silhouette fills the wide frame evenly |
| Washers | `x=10..70`, `y=4..36` | Centered on `x=40`; outer ring fills the frame without clipping |

Narrow parts such as studs, eye bolts, and J/L bolts should stay optically centered rather than being artificially widened to hit the side walls.

### Render Contract

- Size icons with a fixed **bounding frame** per display context, not with width-only or height-only wrappers
- Recommended shared frames for the current app:
  - list cards: `96 x 48`
  - home/category cards: `112 x 56`
  - detail rows: `160 x 80`
  - QA/gallery: `160 x 80`
- The consuming component should center the SVG inside that frame and render it with `display: block; width: 100%; height: 100%`
- The raw SVG must preserve its own aspect ratio via `preserveAspectRatio="xMidYMid meet"`
- Do not switch portrait categories to landscape framing, or vice versa, just to make cards look fuller
- Do not use a top-level translate wrapper as a substitute for centering; canonical geometry should be authored directly in the declared viewBox

---

## Shape Reference

Each entry includes:
- **Shape key** (filename: `{shape-key}.svg`)
- **What it covers** (fastener types sharing this silhouette)
- **Key visual features** to get right
- **Reference URLs** (McMaster-Carr for technical drawings, Grainger for product photos)

---

## SCREWS (12 shapes)

### screw-flat
**Covers:** Wood screw, drywall screw, deck screw, flat-head cap screw, trim-head screw, drywall anchor screw
**Key features:** Countersunk (flush) conical head, tapered body with coarse threads, sharp point
**References:**
- [Flat Head Wood Screws | McMaster-Carr](https://www.mcmaster.com/products/flat-head-wood-screws/)

### screw-pan
**Covers:** Machine screw, sheet metal screw, pocket-hole screw, chipboard screw, sems screw, thread-cutting screw, thread-forming screw
**Key features:** Rounded dome/pan head with flat bearing surface, cylindrical shank, machine threads
**References:**
- [Pan Head Tapping Screws | McMaster-Carr](https://www.mcmaster.com/products/pan-head-tapping-screws/)
- [DIN 7985 Machine Screws | McMaster-Carr](https://www.mcmaster.com/products/din-7985-machine-screws)

### screw-hex-washer
**Covers:** Self-drilling screw, concrete screw, construction screw
**Key features:** Hex head with integrated washer flange, self-drilling tip (drill-bit point), hex drive
**References:**
- [Washer Head Wood Screws | McMaster-Carr](https://www.mcmaster.com/products/washer-head-wood-screws/)
- [Self-Drilling Tapping Screws | McMaster-Carr](https://www.mcmaster.com/products/self-drilling-tapping-screws/)

### screw-socket
**Covers:** Socket head cap screw, shoulder screw, captive screw
**Key features:** Tall cylindrical head with hex socket recess, precision-machined body
**References:**
- [Allen Cap Screws | McMaster-Carr](https://www.mcmaster.com/products/allen-cap-screws)
- [How to Choose a Socket Head Screw | McMaster-Carr](https://www.mcmaster.com/info/how-to-choose-a-socket-head-screw.html)

### screw-button
**Covers:** Button head cap screw
**Key features:** Low-profile dome head (wider and flatter than pan), hex socket recess
**References:**
- [Steel Button Head Socket Cap Screws | McMaster-Carr](https://www.mcmaster.com/products/steel-button-head-socket-cap-screws/)

### screw-set
**Covers:** Set screw (grub screw)
**Key features:** Headless cylinder, hex socket on top, various tip styles (cup, flat, cone, oval)
**References:**
- [Metric Set Screws | McMaster-Carr](https://www.mcmaster.com/products/metric-set-screws)
- [How to Choose a Set Screw | McMaster-Carr](https://www.mcmaster.com/info/how-to-choose-a-set-screw.html) (excellent profile illustrations of tip styles)

### screw-confirmat
**Covers:** Confirmat screw (furniture/RTA)
**Key features:** Large-diameter coarse threads, blunt tip, flat countersunk head, hex drive, thick unthreaded shank section
**References:**
- [Confirmat Screws | McFeely's](https://www.mcfeelys.com/screw-fastener-web-store/rta-ready-to-assemble-hardware/confirmat-screws.html)

### screw-security
**Covers:** Security screw (tamper-resistant)
**Key features:** Distinctive drive recess (pin-in-torx, snake-eye, tri-wing, spanner), otherwise similar to pan or flat head
**References:**
- [Tamper-Resistant Machine Screws | Grainger](https://www.grainger.com/category/fasteners/bolts-screws/machine-screws/tamper-resistant-machine-screws)

### screw-thumb
**Covers:** Thumb screw
**Key features:** Wide knurled head (diamond pattern) for hand turning, short shank
**References:**
- [Metric Thumb Screws | McMaster-Carr](https://www.mcmaster.com/metric-thumb-screws)
- [Washer-Face Thumb Screws | McMaster-Carr](https://www.mcmaster.com/products/washer-face-thumb-screws/)

### screw-weld
**Covers:** Weld screw (projection weld)
**Key features:** Round head with 3 projections (bumps) on underside for welding, no drive recess
**References:**
- [Weld Bolts | McMaster-Carr](https://www.mcmaster.com/products/weld-bolts/)
- [Projection Weld Studs & Screws | JHP Monroe Fasteners](https://www.jhpfasteners.com/weld-fasteners/ring-weld-projection-studs-screws/projection)

### screw-hanger
**Covers:** Hanger bolt
**Key features:** Headless, dual-threaded: wood screw threads on one end, machine threads on the other
**References:**
- [Hanger Bolts | The Nutty Company](https://www.nutty.com/bolts/hanger-bolts/)
- [Hanger Bolts | Albany County Fasteners](https://www.albanycountyfasteners.com/screws-bolts/hanger-bolts-dowel-screws)

### screw-drive
**Covers:** Drive screw (U-drive / hammer drive screw)
**Key features:** Round head, helical thread designed to be hammered in (not turned), no drive recess
**References:**
- [U Drive Screw | Grainger](https://www.grainger.com/product/GRAINGER-APPROVED-U-Drive-Screw-3-4-in-Lg-6YFT8)

---

## BOLTS (14 shapes)

### bolt-hex
**Covers:** Hex bolt, structural bolt
**Key features:** Hexagonal head, machine-threaded shank, partially or fully threaded
**References:**
- [Brass Hex Head Screws | McMaster-Carr](https://www.mcmaster.com/products/brass-hex-head-screws) (category with profile drawings)

### bolt-flange
**Covers:** Flange bolt
**Key features:** Hex head with integrated circular flange (washer) at base
**References:**
- [Flange Bolts | McMaster-Carr](https://www.mcmaster.com/products/flange-bolts/)

### bolt-carriage
**Covers:** Carriage bolt, elevator bolt, plow bolt
**Key features:** Smooth dome head, square neck (anti-rotation) under head, machine threads
**References:**
- [Coach Bolts | McMaster-Carr](https://www.mcmaster.com/products/coach-bolts/)

### bolt-lag
**Covers:** Lag bolt / lag screw
**Key features:** Hex head, wood-screw (tapered) threads, gimlet point
**References:**
- [Hex Head Lag Screws | Grainger](https://www.grainger.com/category/fasteners/bolts-screws/drilling-tapping-screws/hex-head-lag-screws)

### bolt-eye
**Covers:** Eye bolt
**Key features:** Closed loop/ring at top instead of head, threaded shank, optional shoulder
**References:**
- [Eyebolts for Lifting | McMaster-Carr](https://www.mcmaster.com/products/eyebolts/application~for-lifting/)

### bolt-u
**Covers:** U-bolt
**Key features:** U-shaped bent rod, two parallel threaded legs, no head
**References:**
- [Steel U-Bolts | McMaster-Carr](https://www.mcmaster.com/products/u-bolts/material~steel-2/)

### bolt-j
**Covers:** J-bolt
**Key features:** J-shaped: straight threaded shank with 180-degree hook at bottom
**References:**
- [J-Hooks | McMaster-Carr](https://www.mcmaster.com/products/j-hooks/)
- [Concrete Studs | McMaster-Carr](https://www.mcmaster.com/products/concrete-studs/)

### bolt-l
**Covers:** L-bolt (anchor bolt)
**Key features:** L-shaped: straight threaded shank with 90-degree bend at bottom
**References:**
- [L-Hook Anchor Bolt | Grainger](https://www.grainger.com/product/GRAINGER-APPROVED-Anchor-Bolt-L-Hook-Anchor-21Y470)

### bolt-stud
**Covers:** Stud bolt (threaded rod)
**Key features:** Headless cylindrical rod, threaded on both ends (or fully threaded)
**References:**
- [Fully Threaded Studs | McMaster-Carr](https://www.mcmaster.com/products/fully-threaded-studs/)
- [Dowel Bolts | McMaster-Carr](https://www.mcmaster.com/products/dowel-bolts/)

### bolt-hanger
**Covers:** Hanger bolt (bolt category duplicate)
**Key features:** Same as screw-hanger: headless, wood thread one end, machine thread other
**References:**
- (Same as screw-hanger above)

### bolt-shoulder
**Covers:** Shoulder bolt / stripper bolt
**Key features:** Socket head, precision ground unthreaded shoulder (larger diameter than thread), short threaded end
**References:**
- [Precision Shoulder Bolts | McMaster-Carr](https://www.mcmaster.com/products/precision-shoulder-bolts/)

### bolt-sex
**Covers:** Sex bolt / Chicago screw / barrel bolt
**Key features:** Two-piece: male screw + female barrel (internally threaded), flat heads on both ends
**References:**
- [Binding Barrels and Screws | McMaster-Carr](https://www.mcmaster.com/products/binding-barrels-and-screws/)

### bolt-t
**Covers:** T-bolt
**Key features:** T-shaped head (rectangular cross-bar) for sliding into T-slot channels
**References:**
- [T-Slotted Framing Fasteners | McMaster-Carr](https://www.mcmaster.com/products/t-slotted-framing-fasteners/)

### bolt-toggle
**Covers:** Toggle bolt
**Key features:** Machine screw with spring-loaded butterfly wings that fold to pass through hole, then spread behind wall
**References:**
- [Spring Anchors | McMaster-Carr](https://www.mcmaster.com/products/spring-anchors/)
- [Toggle Bolt Anchor | Grainger](https://www.grainger.com/product/RED-HEAD-Toggle-Bolt-Anchor-8-32-Thread-4E824)

---

## NUTS (14 shapes)

### nut-hex
**Covers:** Hex nut, jam nut
**Key features:** Six-sided, internal threads, flat top and bottom. Jam nut is thinner.
**References:**
- [Zinc Plated Steel Hex Nuts | McMaster-Carr](https://www.mcmaster.com/products/zinc-plated-steel-hex-nuts/)

### nut-lock
**Covers:** Lock nut (nyloc), prevailing torque nut
**Key features:** Hex body with nylon insert ring visible at top (white/colored ring)
**References:**
- [Lock Nut, Nylon Insert | Grainger](https://www.grainger.com/product/Lock-Nut-Nylon-Insert-3PDG9)

### nut-wing
**Covers:** Wing nut
**Key features:** Two opposing wings/ears for hand turning, small threaded body between wings
**References:**
- [Wing Nut | Grainger](https://www.grainger.com/product/GRAINGER-APPROVED-Wing-Nut-Stainless-Steel-54FV06)

### nut-acorn
**Covers:** Acorn nut / cap nut
**Key features:** Dome-topped hex nut that covers the bolt end, decorative/protective
**References:**
- [Cap Nut | Grainger](https://www.grainger.com/product/GRAINGER-APPROVED-Cap-Nut-Cap-Nut-Nut-6CB93)

### nut-castle
**Covers:** Castle nut / slotted nut
**Key features:** Hex nut with castellated (notched) crown on top for cotter pin retention
**References:**
- [Castle Nut, Slotted | Grainger](https://www.grainger.com/product/Castle-Nut-Slotted-Castle-6YHK8)
- [Castellated Nut | Wikipedia](https://en.wikipedia.org/wiki/Castellated_nut) (good profile diagram)

### nut-coupling
**Covers:** Coupling nut
**Key features:** Elongated hex nut (3x length of standard), joins two threaded rods end-to-end
**References:**
- [Stainless Steel Coupling Nuts | McMaster-Carr](https://www.mcmaster.com/products/stainless-steel-coupling-nuts/)

### nut-flange
**Covers:** Flange nut (serrated)
**Key features:** Hex nut with integrated washer flange at base, serrated bearing surface
**References:**
- [Flange Nut, Serrated | Grainger](https://www.grainger.com/product/GRAINGER-APPROVED-M4-0-70-Flange-Nut-Serrated-38DH68)

### nut-square
**Covers:** Square nut
**Key features:** Four-sided nut, thinner than hex, sits in square recesses/channels
**References:**
- [Stainless Steel Square Nuts | McMaster-Carr](https://www.mcmaster.com/products/stainless-steel-square-nuts/)

### nut-t
**Covers:** T-nut (pronged tee nut)
**Key features:** Cylindrical barrel with internal threads, flat flange with 3-4 prongs for hammering into wood
**References:**
- [Prong Nuts | McMaster-Carr](https://www.mcmaster.com/products/prong-nuts/)
- [Steel Tee Nuts | McMaster-Carr](https://www.mcmaster.com/steel-tee-nuts)

### nut-knurled
**Covers:** Knurled nut / thumb nut
**Key features:** Cylindrical body with diamond knurl pattern, hand-tightened
**References:**
- [Knurled Thumb Screw Nuts | McMaster-Carr](https://www.mcmaster.com/products/knurled-thumb-screw-nuts/)

### nut-barrel
**Covers:** Barrel nut / cross dowel
**Key features:** Smooth cylinder with cross-drilled threaded hole (perpendicular to axis), for furniture knockdown joints
**References:**
- [Dowel Nuts | McMaster-Carr](https://www.mcmaster.com/dowels) (McMaster calls these "dowel nuts")
- [Barrel Nuts / Cross Dowels | McFeely's](https://www.mcfeelys.com/1-4-in-20-x-9-16-in-off-center-barrel-nuts-qty-100.html)

### nut-rivet
**Covers:** Rivet nut / nutsert
**Key features:** Tubular body with internal threads and flange, installed by collapsing body into thin sheet
**References:**
- [Rivnuts | McMaster-Carr](https://www.mcmaster.com/products/rivnuts/thread-size~10-32/)

### nut-weld
**Covers:** Weld nut
**Key features:** Hex or square body with 3 projection bumps on bottom face for resistance welding, pilot collar
**References:**
- [Weld Nuts | McMaster-Carr](https://www.mcmaster.com/products/weld-nuts/thread-size~m6-2/)

### nut-cage
**Covers:** Cage nut (server rack)
**Key features:** Square nut floating inside a spring steel cage/clip, snaps into square panel holes
**References:**
- [Snap-In Nuts | McMaster-Carr](https://www.mcmaster.com/products/snap-in-nuts/) (McMaster calls these "snap-in nuts")

---

## WASHERS (8 shapes)

### washer-flat
**Covers:** Flat washer, fender washer, dock washer
**Key features:** Simple flat ring/disc. Fender washers have larger OD relative to ID.
**References:**
- [Stainless Steel Flat Washers | McMaster-Carr](https://www.mcmaster.com/products/stainless-steel-flat-washers/)

### washer-split
**Covers:** Lock washer (split ring), Nord-Lock washer
**Key features:** Single coil of spring steel, split at one point, slightly helical
**References:**
- [Helical Spring Lock Washers | McMaster-Carr](https://www.mcmaster.com/products/helical-spring-lock-washers/)

### washer-star
**Covers:** Star washer, external tooth washer
**Key features:** Flat ring with radial teeth/serrations around inner or outer edge
**References:**
- [Internal Tooth Lock Washer | Grainger](https://www.grainger.com/product/Lock-Washer-For-Screw-Size-6FY28)

### washer-belleville
**Covers:** Belleville washer / disc spring
**Key features:** Conical (dished) disc, acts as a spring, tapers from OD to ID
**References:**
- [Disc / Belleville Springs | Grainger](https://www.grainger.com/category/hardware/springs/disc-belleville-springs)

### washer-wave
**Covers:** Wave washer
**Key features:** Flat ring with sinusoidal wave pattern (3-4 waves around circumference)
**References:**
- [Wave Disc Spring Washers | McMaster-Carr](https://www.mcmaster.com/products/wave-disc-spring-washers/)

### washer-finishing
**Covers:** Finishing washer / countersunk washer
**Key features:** Cup/cone-shaped with countersunk center hole, provides finished appearance for flat-head screws
**References:**
- [Countersunk Washers | McMaster-Carr](https://www.mcmaster.com/products/countersunk-washers/)

### washer-shoulder
**Covers:** Shoulder washer (insulating)
**Key features:** Stepped shoulder (tubular sleeve + flange), typically nylon/plastic for electrical insulation
**References:**
- [Electrical Insulating Washers | McMaster-Carr](https://www.mcmaster.com/products/electrical-insulating-washers/)

### washer-sealing
**Covers:** Sealing washer (bonded)
**Key features:** Metal washer bonded to rubber/neoprene ring on one face for watertight seal
**References:**
- [Pressure Sealing Washers | McMaster-Carr](https://www.mcmaster.com/products/pressure-sealing-washers)

---

## ANCHORS (12 shapes)

### anchor-toggle
**Covers:** Toggle bolt, snap toggle
**Key features:** Machine screw with spring-loaded butterfly wings (toggle bolt) or metal channel strap (snap toggle) that grips behind hollow wall
**References:**
- [Toggle Bolt Anchor | Grainger](https://www.grainger.com/product/RED-HEAD-Toggle-Bolt-Anchor-8-32-Thread-4E824)
- [Strap Toggles | McMaster-Carr](https://www.mcmaster.com/products/strap-toggles)

### anchor-plastic
**Covers:** Plastic anchor, lead anchor
**Key features:** Ribbed/finned cylindrical sleeve that expands when screw is driven in, tapered body
**References:**
- [Nylon Anchors | McMaster-Carr](https://www.mcmaster.com/products/nylon-anchors/)

### anchor-wedge
**Covers:** Wedge anchor
**Key features:** Threaded stud with expansion clip/wedge at bottom, nut and washer at top, for concrete
**References:**
- [Wedge Anchors | Grainger](https://www.grainger.com/category/fasteners/anchors/anchors-for-concrete-block-brick/wedge-anchors)

### anchor-sleeve
**Covers:** Sleeve anchor
**Key features:** Bolt through expanding metal sleeve with split bottom, nut pulls sleeve tight against hole wall
**References:**
- [Sleeve Anchor | Grainger](https://www.grainger.com/product/RED-HEAD-Sleeve-Anchor-4-in-Overall-15X733)

### anchor-dropin
**Covers:** Drop-in anchor
**Key features:** Internally threaded cylindrical body, set flush with concrete surface using setting tool, accepts bolt from above
**References:**
- [Drop-In Anchors | Grainger](https://www.grainger.com/category/fasteners/anchors/drop-in-anchors)

### anchor-molly
**Covers:** Molly bolt, hollow wall anchor
**Key features:** Screw through slotted metal sleeve that mushrooms/collapses behind drywall when tightened
**References:**
- [Hollow Wall & Wallboard Anchors | Grainger](https://www.grainger.com/category/fasteners/anchors/hollow-wall-and-wallboard-anchors)

### anchor-selfdrill
**Covers:** Self-drilling drywall anchor (EZ Ancor / zip-it style)
**Key features:** Zinc alloy body with coarse outer threads and drill-point tip, large flange head, drives directly into drywall
**References:**
- [Self-Drilling Drywall Anchor | Grainger](https://www.grainger.com/product/ITW-BUILDEX-Self-Drilling-Drywall-Anchor-60RE99)

### anchor-insert
**Covers:** Threaded insert (for wood/plastic)
**Key features:** Knurled or hex-drive brass/steel cylinder with internal and external threads, screws into wood
**References:**
- [Solid Inserts | McMaster-Carr](https://www.mcmaster.com/products/solid-inserts/)

### anchor-tnut
**Covers:** T-nut (anchor category usage)
**Key features:** Same as nut-t (pronged barrel nut hammered into wood from back side)
**References:**
- [Prong Nuts | McMaster-Carr](https://www.mcmaster.com/products/prong-nuts/)

### anchor-hammer
**Covers:** Hammer drive anchor, split drive anchor
**Key features:** Cylindrical body with nail/pin driven through center to expand in concrete hole
**References:**
- [Hammer Drive Pin Anchor | Grainger](https://www.grainger.com/product/Hammer-Drive-Pin-Anchor-Set-11K344)

### anchor-chemical
**Covers:** Chemical anchor / adhesive anchor
**Key features:** Threaded rod or rebar inserted into resin-filled hole. Show: rod + capsule/cartridge tube (the system, not just the rod)
**References:**
- [Chemical Anchors | McMaster-Carr](https://www.mcmaster.com/products/chemical-anchors/)

### anchor-screw
**Covers:** Concrete screw anchor (Tapcon)
**Key features:** Hex or Phillips head, hi-lo thread pattern (alternating high/low threads), blue coating typical
**References:**
- [Tapcon Screw Anchors | Grainger](https://www.grainger.com/category/fasteners/anchors/anchors-for-concrete-block-brick/screw-anchors?brandName=TAPCON&filters=brandName)
- [Tapcon.com](https://www.tapcon.com/products/genuine-tapcon-screw-anchors/genuine-tapcon/)

---

## Notes for the Illustrator

1. **Consistency matters more than detail.** All 60 shape keys should feel like they belong to the same family: same stroke weight, same level of simplification, same viewing angle within each category, and consistent occupancy inside the art box.

2. **McMaster-Carr pages** show technical line drawings alongside product listings. These are the gold standard for shape accuracy. You may need to create a free account to view full catalog imagery.

3. **Grainger pages** show actual product photographs. Use these to verify proportions and real-world appearance, but don't try to replicate photographic detail.

4. **Thread simplification:** Use 3-4 angled parallel lines to suggest threading. Don't draw individual threads.

5. **Shared shapes:** Only exact pose-and-canvas duplicates should share a canonical drawing. `bolt-hanger` can reuse `screw-hanger`; similar real-world objects in different categories may still need different drawings if their orientation or canvas differs.

6. **Priority order:** If doing this in batches, start with the most common shapes:
   - **Batch 1 (highest traffic):** screw-flat, screw-pan, bolt-hex, bolt-carriage, nut-hex, nut-lock, washer-flat, washer-split, anchor-wedge, anchor-plastic
   - **Batch 2:** screw-socket, screw-button, screw-hex-washer, bolt-lag, bolt-eye, bolt-u, nut-wing, nut-acorn, nut-flange, anchor-toggle, anchor-molly
   - **Batch 3:** Everything else
