# CLAUDE.md

## What this is

Atlas is an unofficial learning roadmap for CharaChorder 3D input devices (CharaChorder One, CharaChorder Two, CCU, Master Forge). It ties together Tangent's other unofficial tools and blog posts into one step-by-step path: memorizing the layout before a device arrives, a first guided tutorial (Capella), practicing character entry, practicing chorded entry (Chara), and a list of other tools.

Deployed as a static site to GitHub Pages at https://andy23512.github.io/atlas/.

## Tech stack

- React 19 + TypeScript, built with Vite 8
- No state library — the roadmap is static content, no interactive state yet
- Plain CSS per component (no Tailwind/UI framework), using `light-dark()` for automatic light/dark theming
- Linting: `oxlint`

## Commands

- Install: `npm install`
- Dev server: `npm run dev` (Vite, default port 5173)
- Build: `npm run build` (runs `tsc -b` then `vite build`)
- Preview production build: `npm run preview`
- Lint: `npm run lint` (oxlint)

There is no test script/framework configured in this repo.

## Structure

- `src/data/roadmap.ts` — all roadmap content: an array of `RoadmapSection`, each with `RoadmapItem`s (title, description, optional `note` e.g. a suggested WPM range, optional external `links`). Edit this file to add/reorder roadmap content; components are generic renderers.
- `src/components/RoadmapSection.tsx` / `.css` — renders one numbered section with its connecting timeline dot/line
- `src/components/RoadmapItem.tsx` / `.css` — renders one card within a section (title, note, description, link pills)
- `src/App.tsx` — maps `roadmap` to `RoadmapSection`s

## Notable/non-obvious points

- `vite.config.ts` sets `base: '/atlas/'` — deployed under a `/atlas/` subpath, not the domain root.
- This project is not yet wired into the `andy23512.github.io` portfolio site (`index.astro` card / `stars.ts` `key` for the Atlas star) — that integration was intentionally deferred.
- Section 5 ("Other Tools") only lists Mira, Sirius, Alnasl, and Arcturus — the tools explicitly named when the roadmap was scoped, not every project in the `andy23512.github.io` portfolio.
