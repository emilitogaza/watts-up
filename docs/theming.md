# Theming & icons — how to re-skin this template

This template is built so that **re-theming is a small, mechanical job**: one
colour ramp drives every surface, and the app icon is generated from a single
[Lucide](https://lucide.dev) glyph. This doc is the complete recipe. It's
written for an AI agent, but a human can follow it too.

> **If you're an agent starting a new site from this template:** first ask the
> user for (1) the **theme** — a colour or hue — and (2) the **icon** — which
> Lucide glyph. Then write the content, then follow this guide. See
> `AGENTS.md` for the workflow rules.

---

## 1. The colour system in 30 seconds

There is **one raw palette** — a ten-stop `accent` ramp — and a set of
**semantic tokens** that map onto it. Components never use the raw ramp
directly; they use semantic utilities like `bg-fill`, `text-ink`, `text-brand`,
`border-border`. Those semantic tokens are re-pointed per theme (light vs dark).

```
--color-accent-50 … --color-accent-950   ← the ONE ramp you edit (globals.css)
        ↓  mapped by
--sem-ink / --sem-fill / --sem-brand / …  ← light + dark mappings (globals.css)
        ↓  inlined into utilities
bg-fill, text-ink, text-brand, …          ← what components actually use
```

**Consequence:** to re-theme the entire site you change **ten values**. You do
not rename anything, and you do not touch components.

---

## 2. Where every colour lives

| # | File | What to change |
| - | ---- | -------------- |
| 1 | `app/globals.css` | The ten `--color-accent-*` values (the source of truth). |
| 2 | `app/layout.tsx` | `viewport.themeColor` — two HSL literals (light = `accent-50`, dark = `accent-950`). |
| 3 | `app/manifest.webmanifest` | `background_color` and `theme_color` — both the `accent-950` value. |
| 4 | `app/icon.svg` + `public/icons/icon.svg` | The two accent **hex** values in the SVG. |
| 5 | `public/icons/icon-*.png` (×4) | Regenerated from the SVG (see §5). |

Files 2–5 are just the ramp's endpoints repeated where a CSS variable can't
reach (browser chrome, static SVG/PNG). Keep them in sync with file 1.

---

## 3. Choosing a palette

Pick **one hue** (0–360 on the colour wheel) and run the lightness from very
light at `-50` down to near-black at `-950`. Keep saturation fairly high for a
confident brand colour. A subtle hue drift toward the darks is optional polish.

Paste this into the `@theme` block of `app/globals.css`, swapping `HUE` for your
number (and fine-tune saturation `S` per taste):

```css
--color-accent-50:  hsl(HUE, 60%, 96%);  /* page background (light) */
--color-accent-100: hsl(HUE, 60%, 88%);  /* raised surfaces (light) */
--color-accent-200: hsl(HUE, 55%, 72%);  /* borders (light) */
--color-accent-400: hsl(HUE, 85%, 55%);  /* links (dark) */
--color-accent-500: hsl(HUE, 90%, 48%);  /* brand / the signature colour */
--color-accent-600: hsl(HUE, 80%, 40%);  /* links (light) */
--color-accent-700: hsl(HUE, 75%, 28%);
--color-accent-800: hsl(HUE, 70%, 16%);  /* borders (dark) */
--color-accent-900: hsl(HUE, 60%, 8%);   /* raised surfaces (dark) */
--color-accent-950: hsl(HUE, 55%, 4%);   /* page background (dark) */
```

Reference hues used across these projects:

| Theme         | Hue | Signature (`-500`)        |
| ------------- | --- | ------------------------- |
| Orange (default) | 10  | `hsl(10, 82%, 52%)`   |
| Terminal green   | 142 | `hsl(142, 100%, 45%)` |
| Blue             | 220 | `hsl(220, 85%, 52%)`  |
| Violet           | 270 | `hsl(270, 70%, 55%)`  |

**Readability check:** body text on the dark theme is `accent-50` on
`accent-950`; on light it's `accent-900` on `accent-50`. Both are near-max
contrast at any hue, so you rarely need to worry — but glance at both themes
after changing values (see §7).

### The semantic tokens (only if you want to remap)

You almost never edit these — but here's what they do, in `:root` (light) and
`.dark`:

| Token | Role |
| ----- | ---- |
| `--sem-ink` / `--sem-ink-dim` | Primary / secondary text |
| `--sem-ink-flip` | Text on top of a brand-coloured surface |
| `--sem-fill` / `--sem-fill-raised` | Page background / cards, code, blockquotes |
| `--sem-brand` | The accent itself (icon, active states, selection) |
| `--sem-border` | Hairlines and dividers |
| `--sem-link` | Link text |

---

## 4. Re-theming the colours — steps

1. **`app/globals.css`** — replace the ten `--color-accent-*` values (§3).
2. **`app/layout.tsx`** — set the two `themeColor` literals: light = your
   `accent-50` value, dark = your `accent-950` value.
3. **`app/manifest.webmanifest`** — set `background_color` and `theme_color` to
   your `accent-950` value.
4. Regenerate the icons (§5) so they match the new accent.
5. Verify light **and** dark (§7).

The ramp **may be renamed after its colour** (`blue-*`, `spruce-*`, …) — if you
do, update every `var(--color-…)` reference in the `--sem-*` blocks (light,
dark, scrollbar) to the new name. And after any ramp change, check the primary
button: a dark `-500` stop needs `text-ink-flip` instead of `text-brand-ink`
in `components/button.tsx` (see AGENTS.md, "Theming quick rules").

---

## 5. The icon — generate one from a Lucide glyph

The app icon is a **dark rounded "screen" with the accent-coloured glyph**.
It's a static SVG (so it uses hex, not CSS variables) plus four PNGs rendered
from it. You need two accent hex values:

- **Background** = your `accent-950` (near-black). Default orange: `#150806`.
- **Glyph** = your `accent-500` (bright). Default orange: `#E9402C`.

> Convert HSL→hex with any colour tool, or just ask Claude to compute it.

### 5a. Get the glyph's path data

1. Choose a glyph at **lucide.dev** (search e.g. `terminal`, `book-open`,
   `rocket`, `zap`, `heart-pulse`). Note its **kebab-case name**.
2. Read its path data from the installed package — no download needed:

   ```bash
   cat node_modules/lucide-react/dist/esm/icons/<name>.mjs
   ```

   The `__iconNode` array lists the SVG elements (`path`, `line`, `circle`, …).
   Lucide glyphs are authored in a **24×24 viewBox**, `stroke-width: 2`, round
   caps/joins, no fill.

### 5b. Compose the icon SVG

Drop the glyph's elements into this template. The `transform` scales the 24-unit
glyph up and centres it.

```svg
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" ry="112" fill="#150806"/>
  <rect x="12" y="12" width="488" height="488" rx="100" ry="100"
        fill="none" stroke="#E9402C" stroke-opacity="0.16" stroke-width="4"/>
  <g transform="translate(112,112) scale(12)"
     fill="none" stroke="#E9402C" stroke-linecap="round" stroke-linejoin="round">
    <g stroke-opacity="1" stroke-width="2.4">
      <!-- paste glyph paths here -->
    </g>
  </g>
</svg>
```

Notes:
- **No halo/outline layer.** An earlier version of this recipe drew a wide,
  faint copy of the glyph underneath as a glow — don't: on any glyph whose
  paths overlap or sit close together, the halo strokes overlap each other and
  read as ugly double outlines.
- Keep the seemingly redundant `stroke-opacity="1"` on the inner group —
  ImageMagick's built-in SVG renderer (used in §5d) drops group strokes
  without an explicit stroke-opacity.
- `translate(112,112) scale(12)` centres a typical Lucide glyph in the 512
  canvas. If your glyph sits off-centre, nudge the translate values.
- Stroke widths are in *glyph units* (they scale ×12): `2.4` ≈ a 29px stroke.
  Bump to `2.6–2.8` for thin glyphs.
- Simple glyphs (like `terminal`, a `>` chevron + line) are easier to redraw
  directly at 512-scale than to transform — either approach is fine.

Save this as **`app/icon.svg`** and copy it to **`public/icons/icon.svg`**.

### 5c. Make the maskable variant

Android masks icons to a circle/squircle, so the maskable version must:
- fill the **whole square** (no rounded corners, no bezel), and
- keep the glyph inside the central **~80% safe zone** (a touch smaller).

Same SVG, but: drop the two `rx`/bezel rects for a plain
`<rect width="512" height="512" fill="#150806"/>`, and shrink the glyph a step
(e.g. `translate(124,124) scale(11)`).

### 5d. Render the PNGs (ImageMagick)

Four files, from the two SVGs. Rendering at high density then downscaling keeps
edges crisp:

```bash
OUT=public/icons
magick -background none -density 384 app/icon.svg           -resize 512x512 "$OUT/icon-512x512.png"
magick -background none -density 384 app/icon.svg           -resize 192x192 "$OUT/icon-192x192.png"
magick -background none -density 384 icon-maskable.svg      -resize 512x512 "$OUT/icon-512x512-maskable.png"
magick -background none -density 384 icon-maskable.svg      -resize 192x192 "$OUT/icon-192x192-maskable.png"
magick "$OUT/icon-512x512.png" -define icon:auto-resize=48,32,16 app/favicon.ico
```

(`icon-maskable.svg` is a scratch file — it doesn't need to ship.) The manifest
at `app/manifest.webmanifest` already references all four PNGs plus the SVG; you
don't edit it for icons unless you add sizes.

**Don't skip `app/favicon.ico`** — modern browsers use the SVG, but services
that fetch `/favicon.ico` directly (the Vercel dashboard's project avatar,
older crawlers, RSS readers) fall back to a framework logo without it.

### 5e. Update the wordmark

The header/logo uses the **same** glyph as a React component. Swap the import in
**both**:

- `app/(course)/layout.tsx`
- `components/mobile-nav.tsx`

```tsx
import { BookOpen } from "lucide-react";   // → your icon, PascalCase of the name
// ...
<BookOpen className="size-5 text-brand" />
```

Lucide's React names are PascalCase of the kebab name: `book-open` → `BookOpen`,
`square-terminal` → `SquareTerminal`, `heart-pulse` → `HeartPulse`.

---

## 6. Naming the site

Not colour, but part of every rebrand. Replace the placeholder "Docs Starter":

- `app/layout.tsx` — `SITE_NAME`, `SITE_TITLE`, `SITE_DESCRIPTION`.
- `app/manifest.webmanifest` — `name`, `short_name`, `description`.
- Wordmark text in `app/(course)/layout.tsx` and `components/mobile-nav.tsx`.
- Landing page copy in `app/page.tsx` — the constants at the top (`WORDMARK`,
  hero/eyebrow/CTA/footer strings, and the hero `<h1>`), plus its glyph import
  (same Lucide icon as the wordmark). The chapter grid, stats, and marquee fill
  themselves in from `content/`.

---

## 7. Verify

Run the dev server and look at **both** themes (toggle is top-right on desktop,
in the bottom tray on mobile):

```bash
pnpm dev
```

Check: body text is readable on both backgrounds, the brand colour reads on the
active sidebar item and the logo, code blocks look right, and the browser tab
shows the new icon. Then confirm it builds:

```bash
pnpm build
```

---

## 8. Full re-theme checklist

- [ ] `app/globals.css` — ten `--color-accent-*` values
- [ ] `app/layout.tsx` — two `themeColor` literals + `SITE_*` strings
- [ ] `app/manifest.webmanifest` — `background_color`, `theme_color`, `name`, `short_name`, `description`
- [ ] `app/icon.svg` + `public/icons/icon.svg` — new glyph, accent hexes
- [ ] `public/icons/icon-{192,512}x{192,512}{,-maskable}.png` — regenerated (×4)
- [ ] `app/favicon.ico` — regenerated from the 512 PNG
- [ ] `app/(course)/layout.tsx` + `components/mobile-nav.tsx` — wordmark icon + text
- [ ] Verified in light **and** dark; `pnpm build` passes
