# AGENTS.md — The Summer Bucket List

> Architecture, scripts, and how-to-add-things all live in [README.md](README.md).
> This file is for context an agent (or future contributor) needs that doesn't
> belong in the public README.

## What this is

A mobile-first React app for a group of Muslim lads (21–25) based in Oldham,
Greater Manchester. Curated activity guide for summer 2026 — built to replace
defaulting to the same restaurants every weekend with outdoor and adventure
activities across Manchester, the Peak District, Lake District, Yorkshire
Dales, and North Wales.

**Live**: <https://omer111-50.github.io/summer-bucket-list/>

## Status

Deployed and working. Architecture refactored from a single 1800-line `App.jsx`
into a typed component tree (see [README.md](README.md#project-layout)). All
behaviour and styling preserved verbatim during the refactor — no UX changes.

UI icons migrated from emoji to Lucide icons via `react-icons/lu` — navigation
tabs, filter labels, card metadata (drive/time/effort/cost/halal), action
buttons (save/done/share), stars, location pin, notes label. Category and effort
emojis (⛰️ 🏙️ 🌿 🎢 😌, 🌿 🚶 🥾 💪 🔥) are intentionally kept for personality.

Toolchain added: Prettier, `typescript-eslint` (ESLint now covers `.ts/.tsx`).
Git repo initialised.

## Constraints worth knowing before you edit

- **TypeScript strict mode** — `npm run typecheck` must pass. Any new code goes in `.ts`/`.tsx`.
- **Single stylesheet** — all CSS lives in [src/styles/globals.css](src/styles/globals.css). Don't introduce CSS Modules, styled-components, or per-component stylesheets.
- **No new runtime deps without a reason** — current deps are `react`, `react-dom`, `react-icons`. Vite/esbuild handles everything else.
- **Icons use `react-icons/lu`** (Lucide) — import from that namespace, not `lucide-react`. Keep category/effort emojis as-is.
- **Prettier config** — [.prettierrc](.prettierrc) is the source of truth for formatting. Run `npx prettier --write "src/**/*.{ts,tsx,css}"` before committing.
- **localStorage keys are `sbl-favs` and `sbl-done`** — renaming them silently breaks every user who already has data. If you ever change them, write a migration.
- **`id` field on every activity is permanent** — it's in share URLs (`?id=mam-tor`) and persistence. Don't rename existing ids.
- **Design tokens are fixed** — see the "Design decisions" section in [README.md](README.md). The dark-forest palette and amber accent are deliberate; change with reason.

## Remaining post-deploy tasks (priority order)

1. **More activities** — the markdown guide (`summer-activities-guide-2026.md`, if it still exists) has ~40 more entries not yet in [src/lib/activities.ts](src/lib/activities.ts). Priority additions: Fairfield Horseshoe, Bleaklow, Pen-y-ghent standalone, Lyme Park, Dunham Massey, Tarn Hows, Arnside Knott.
2. **Combo day tab** — the source guide has ~10 pre-planned combo itineraries (e.g. "Castleton Full Day: Speedwell + Blue John + Mam Tor"). Would be a 6th view tab alongside Browse/Saved/Done.
3. **PWA** — `manifest.json` is already in [public/](public/) (`site.webmanifest`); needs a service worker so the lads can install to home screen and use offline.
4. **Custom domain** — currently on `github.io` subpath. Either set up a CNAME or accept the path.

## Owner context

- **Developer**: Omer Ali Omer — Platform Engineer at IBM, degree apprentice (BSc Digital & Technology Solutions)
- **GitHub**: omer111-50
- **Personal site**: www.omeraliomer.com (Astro + React + TypeScript + Tailwind — separate project)
- **Stack familiarity**: React, TypeScript, Tailwind, Vite, GitHub Pages, Docker, FastAPI
- **Preferred style**: Clean, no over-engineering. No abstractions beyond what the task requires, no speculative future-proofing.
