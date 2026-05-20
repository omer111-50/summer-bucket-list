# The Summer Bucket List

A mobile-first React app for the lads — 64 curated activities across Manchester, the Peak District, Lake District, Yorkshire Dales, and North Wales. Built to replace defaulting to the same restaurants every weekend with actual outdoors stuff worth doing.

Live at: <https://omer111-50.github.io/summer-bucket-list/>

## What's in it

- **64 activities** across 6 categories: Hikes, City Trips, Nature, Big Days, Chill
- **Filters** on drive time, effort, budget, duration, and halal food nearby
- **Browse / Saved / Done** tabs with localStorage persistence
- **Surprise Me** — random pick from the filtered-and-not-yet-done pool, with reroll
- **Share** — copies a deep link (`?id=...`) that opens straight to the activity sheet
- **Dark forest theme** with amber accents, Bebas Neue + Outfit typography

## Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite 8** for dev/build
- **react-icons** for the shuffle icon — no other UI libraries
- Hand-written CSS in [src/styles/globals.css](src/styles/globals.css) — no Tailwind, no CSS-in-JS
- **gh-pages** for deployment

## Project layout

```
src/
├── components/
│   ├── activity/      ActivityCard, ActivitySheet (detail + surprise)
│   ├── filters/       CategoryChips, FilterRow, HalalToggle
│   ├── layout/        Header
│   └── ui/            EmptyState
├── hooks/
│   ├── useFilters.ts      filter state + filtered list
│   ├── usePersistence.ts  favs/done + localStorage sync
│   └── useDeepLink.ts     ?id= param on mount
├── lib/
│   ├── activities.ts  the 64-entry ACTIVITIES array
│   ├── constants.ts   category/effort/cost/filter option config
│   └── utils.ts       catInfo(), durStr(), doShare()
├── styles/
│   └── globals.css    full stylesheet
├── types/
│   └── index.ts       Activity, FilterState, Cat, Effort, ...
├── App.tsx            orchestrator — hooks + components, no logic
└── main.tsx
```

## Running it

```bash
npm install
npm run dev        # dev server (default http://localhost:5173/summer-bucket-list/)
npm run build      # production build → dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Deploying

GitHub Pages via the `gh-pages` branch:

```bash
npm run deploy
```

This runs `npm run build` then pushes `dist/` to `gh-pages`. The base path is set to `/summer-bucket-list/` in [vite.config.js](vite.config.js) — keep that in mind if you fork.

## Adding an activity

1. Open [src/lib/activities.ts](src/lib/activities.ts)
2. Add a new object to the `ACTIVITIES` array — TypeScript will tell you what fields are missing or wrong
3. Use a unique `id` (it's used in share links and persistence)
4. `category` must be one of `hike | city | nature | bigday | chill`
5. `effort` must be one of `chill | light | moderate | hard | very-hard`
6. `cost` is `1–4`, `engagement` is `1–5`

The new entry shows up on next render — no other wiring needed.

## Design decisions (don't change without reason)

- **Dark forest green theme**: `--bg: #09140c`, `--surf: #0f1c12`, `--card: #152019`
- **Accent**: amber `#e9a020` — primary CTAs, active filters, logo mark
- **Category colours**: hike cyan, city purple, nature green, bigday orange, chill pink
- **localStorage keys**: `sbl-favs`, `sbl-done` — don't rename without a migration
- **Single CSS file** — all styling lives in `globals.css`, no per-component stylesheets

## License

Private. For the lads.
