# Watt's Up — how electricity actually works

A fun, free mini-course on **electricity**: what it actually is (spoiler: the
electrons move slower than snails), how spinning magnets make nearly all of
it, how it crosses a country at 400,000 volts into your wall socket, and why
the third pin on your plug is a silent bodyguard. Ten short chapters,
readable in under an hour.

Built from the **Docs Starter** content-site template (a sibling repo at
`../content-site-template`): every page is one Markdown file in `content/`,
and the site generates the landing page, sidebar, "On this page" rail, and
previous/next paging automatically. Branding: electric-yellow `volt-*` ramp,
Lucide `zap` icon.

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- React with UI components built from scratch — no third-party component libraries
- Tailwind CSS with themed tokens in `app/globals.css`
- [motion](https://motion.dev) for animation (via `LazyMotion` in `components/motion-provider.tsx`)
- Hosted on [Vercel](https://vercel.com)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing the course

- **Add or edit a chapter** — one Markdown file per page in `content/`;
  frontmatter and conventions are documented in
  [`content/README.md`](content/README.md). The sidebar, landing-page cards,
  reading-time stat, and pager all update automatically.
- **Re-theme** — the whole palette is ten `--color-volt-*` values in
  `app/globals.css`; the full recipe (including regenerating the app icon) is
  in [`docs/theming.md`](docs/theming.md).
- **Rename / rebrand** — `SITE_*` in `app/layout.tsx`, the manifest fields,
  the wordmark in `app/(course)/layout.tsx` + `components/mobile-nav.tsx`, and
  the landing copy at the top of `app/page.tsx`.

## Project structure

- `app/` — routes (landing page, chapter pages), global styles, favicon + icon, manifest
- `components/` — UI components (sidebar, mobile nav, pager, marquee, theme toggle, …)
- `content/` — the ten course chapters as Markdown, one file per page
- `docs/theming.md` — the re-skinning guide inherited from the template
- `lib/` — utilities (`content.ts` page loader, `cn()` class merging, `Slot`)
- `public/icons/` — PWA icons referenced by `app/manifest.webmanifest`
- `AGENTS.md` — instructions for AI agents working in this repo
