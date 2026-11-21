# CLAUDE.md

## What this is

Atlas is an unofficial learning roadmap for CharaChorder 3D input devices (CharaChorder One, CharaChorder Two, CCU, Master Forge). It ties together Tangent's other unofficial tools and blog posts into one step-by-step path: memorizing the layout before a device arrives, a first guided tutorial (Capella), practicing character entry, practicing chorded entry (Chara), and a list of other tools.

Deployed as a static site to GitHub Pages at https://andy23512.github.io/atlas/.

## Tech stack

- React 19 + TypeScript, built with Vite 8
- No state library — the only state is which roadmap item is open in the detail panel, held with `useState` in `App.tsx`
- Plain CSS per component (no Tailwind/UI framework), using `light-dark()` for automatic light/dark theming
- Linting: `oxlint`
- Testing: `vitest` with `jsdom` and Testing Library

## Commands

- Install: `npm install`
- Dev server: `npm run dev` (Vite, default port 5173)
- Build: `npm run build` (runs `tsc -b` then `vite build`)
- Preview production build: `npm run preview`
- Lint: `npm run lint` (oxlint)
- Test: `npm test` (`vitest run`; tests live in `test/` and are matched by `test/**/*.test.{ts,tsx}`)

CI (`.github/workflows/ci.yml`) runs lint, test, and build on every push to `main` and on pull requests.

## Structure

- `src/data/roadmap.ts` — all roadmap content: an array of `RoadmapSection`, each with `RoadmapItem`s (title, description, optional `note` e.g. a suggested WPM range, optional external `links`, optional `details` blocks for the side panel). Items with `details` are clickable and open the panel; items without it are plain cards. Edit this file to add/reorder roadmap content; components are generic renderers.
- `src/components/RoadmapSection.tsx` / `.css` — renders one numbered section with its connecting timeline dot/line
- `src/components/RoadmapItem.tsx` / `.css` — renders one card within a section (title, note, description, link pills)
- `src/components/RoadmapDetailPanel.tsx` / `.css` — modal side panel for an item's `details` and `links`. Closes on Escape or overlay click, traps Tab focus, locks body scroll while open, and returns focus to the opener on close
- `src/App.tsx` — maps `roadmap` to `RoadmapSection`s and owns the selected-item state

## Notable/non-obvious points

- `vite.config.ts` sets `base: '/atlas/'` — deployed under a `/atlas/` subpath, not the domain root.
- Atlas is listed in the `andy23512.github.io` portfolio site (card in `src/data/projects.ts`, star entry in `src/data/stars.ts`). Those live in that separate repo, so changes to Atlas's description or URL need a matching edit there.
- Section 5 ("Other Tools") only lists Mira, Sirius, Alnasl, and Arcturus — the tools explicitly named when the roadmap was scoped, not every project in the `andy23512.github.io` portfolio.
