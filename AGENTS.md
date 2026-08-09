<!-- BEGIN:site-rules -->
# This is "Watt's Up" — a fun course site about electricity

This repo is a **finished course site** (not the template — it was built from
the reusable **Docs Starter** template that lives at
`../content-site-template`). It's a fun English course on electricity in
**two arcs** — the big world of power (grid, plants, home wiring) and the
workbench (measurement, components, solder metallurgy, microcontrollers,
LED strips): eighteen Markdown chapters in `content/`, an electric-yellow
`volt-*` ramp, and a Lucide `zap` app icon + wordmark.

## Working on this site

- **Content edits** are the usual job: one Markdown file per page in
  `content/`, conventions in `content/README.md`. Keep the voice light and
  fun — jokes welcome, physics accurate. The reader wants to **understand
  electronics**, not follow build guides: explain mechanisms and derive
  rules from physics; never write step-by-step tutorial instructions
  ("step 1, grab your soldering iron" is banned). Recurring bit: each
  chapter has one "**⚡ Spark fact:**" blockquote.
- **The landing page** (`app/page.tsx`) fills itself from `content/` —
  chapter cards, stats, and marquee need no updates when chapters change.
  Only its copy constants, hero heading, and the manually curated
  `OTHER_COURSES` list are hand-written.
- **Branding lives in**: `SITE_*` in `app/layout.tsx`, the manifest, the
  wordmark in `app/(course)/layout.tsx` + `components/mobile-nav.tsx`, and
  the landing copy at the top of `app/page.tsx`. The icon must stay the same
  Lucide glyph (`zap`) everywhere.

## Theming quick rules

- **One ramp, ten stops.** All colours come from the ten `--color-volt-*`
  values at the top of `app/globals.css` (+ the two `themeColor` literals in
  `app/layout.tsx` and the two colours in `app/manifest.webmanifest`).
  Re-theming = swap those ten values.
- **The ramp is named after its colour** (volt — electric yellow — here). If
  you rename it, update every `var(--color-…)` reference in the `--sem-*`
  blocks (light theme, dark theme, scrollbar) to match. Components never
  touch the ramp directly — they use semantic utilities (`bg-fill`,
  `text-ink`, `text-brand`, …) resolved through `--sem-*` runtime variables,
  which is what lets `.dark` swap the whole palette at once.
- **Keep `globals.css` comment-light.** Theming documentation lives here and
  in `docs/theming.md` — not as comment essays inside the CSS.
- **Check primary-button contrast after re-theming.** The default Button
  variant is `bg-brand text-brand-ink`, and `brand-ink` is *dark* in light
  mode — that only works on bright brand colours (luminous orange, gold,
  light green). If the ramp's `-500` stop is dark (rough guide: HSL lightness
  under ~55%, e.g. a deep blue), switch the default variant's text to
  `text-ink-flip` in `components/button.tsx` so the label reads light-on-dark.
  The other extreme: on a very bright/neon `-500` (high luminance), use
  `text-fill-dark` so the label stays dark in *both* themes. **This site does
  exactly that** — volt-500 is a bright yellow, so the default variant uses
  `text-fill-dark`. Eyeball the primary button in **both** themes either way.
- Icons are generated from a Lucide glyph (dark screen + accent glyph — no
  halo/outline layer, it double-strokes on complex shapes), rendered to PNGs
  incl. a maskable variant with ImageMagick. Full recipe: `docs/theming.md`.
- The wordmark icon (`app/(course)/layout.tsx`, `components/mobile-nav.tsx`) must
  be the **same** Lucide glyph as the app icon.
<!-- END:template-rules -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# No third-party UI component libraries

All UI components are built from scratch using React and Tailwind.

**Never install or import from:**

- `@radix-ui/*` (Radix UI primitives)
- `shadcn/ui` (component registry)
- `class-variance-authority` / `cva`
- `@headlessui/*`, `@ark-ui/*`, or any other component primitive library

- Use `lib/utils.ts` `cn()` for class merging and variant maps (plain objects)
- Use `lib/slot.tsx` for the `asChild` render pattern

**`motion/react` is allowed, with constraints:**

- Use the `m` component (not `motion`) — it requires `LazyMotion` to be in scope, cutting the bundle from ~34kb to ~4.6kb initial
- `LazyMotion` with `domAnimation` is mounted once globally in `app/layout.tsx` via `components/motion-provider.tsx` — do not add it anywhere else
<!-- END:component-rules -->

<!-- BEGIN:Proxy/Middleware -->
## Middlware & Proxy
- There is no middleware file in next16
- Do not use Middleware
- The correct file is Proxy.ts, it has replaced Middleware entierly
<!-- END:Proxy/Middleware -->

<!-- BEGIN:Style rules -->
## Styles
- Always use globals.css file for themed tokens
- Always use globals.css rounded scale (rounded-3, rounded-4), do not use tailwind default rounded scale (rounded-xl, rounded-md)
- When you need an icon, reach for lucide icons
<!-- END:Style rules -->

<!-- BEGIN:hosting-rules -->
# This site is hosted on Vercel
This project is hosted on Vercel. When talking about hosting, refer to Vercel.
<!-- END:hosting-rules -->
