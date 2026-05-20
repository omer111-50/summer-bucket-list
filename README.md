# The Summer Bucket List

A mobile-first React app for the lads — 64 curated activities across Manchester, the Peak District, Lake District, Yorkshire Dales, and North Wales. Built to replace defaulting to the same restaurants every weekend with actual outdoors stuff worth doing.

Live at: <https://summerbucketlist.me>

## What's in it

- **64 activities** across 6 categories: Hikes, City Trips, Nature, Big Days, Chill
- **Filter bar** — single button below the tabs opens a bottom sheet with category selection and all filters (drive time, effort, budget, duration, halal food nearby)
- **Browse / Saved / Done** tabs with localStorage persistence
- **Surprise Me** — random pick from the filtered-and-not-yet-done pool, with reroll
- **Share** — copies a deep link (`?id=...`) that opens straight to the activity sheet
- **Dark forest theme** with amber accents, Bebas Neue + Outfit typography

## Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite 8** for dev/build
- **react-icons** (Lucide set via `react-icons/lu`) for all UI icons — navigation tabs, filter labels, card metadata, action buttons. Category and effort emojis are kept as-is for personality.
- Hand-written CSS in [src/styles/globals.css](src/styles/globals.css) — no Tailwind, no CSS-in-JS
- **gh-pages** for deployment

### Toolchain

- **Prettier** — [.prettierrc](.prettierrc): 2-space indent, double quotes, semicolons, 100-char print width
- **ESLint** — [eslint.config.js](eslint.config.js): covers `.ts/.tsx` via `typescript-eslint` + `eslint-config-prettier`

## Project layout

```
src/
├── components/
│   ├── activity/      ActivityCard, ActivitySheet (detail + surprise)
│   ├── filters/       CategoryChips, FilterRow, HalalToggle, FilterBar, FilterSheet
│   ├── layout/        Header (sticky — logo row, tabs, FilterBar)
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
npm run dev        # dev server (default http://localhost:5173/)
npm run build      # production build → dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (covers .ts/.tsx via typescript-eslint)
npx prettier --check "src/**/*.{ts,tsx,css}"  # check formatting
npx prettier --write "src/**/*.{ts,tsx,css}"  # auto-format
```

## Accessibility checks

Run against a local server (`npm run build && npm run preview`):

```bash
# pa11y — WCAG 2 AA, HTML_CS ruleset
npx pa11y http://localhost:4173/

# axe-core — use --load-delay 1500 to let staggered card animations complete before testing
npx @axe-core/cli http://localhost:4173/ --load-delay 1500
```

Both must report **0 violations** before deploying. The `--load-delay` flag is required for axe because cards have a staggered `animationDelay` with `fill-mode: both` — without it axe catches cards at `opacity: 0` mid-delay and reports false contrast failures.


## Deploying

GitHub Pages via the `gh-pages` branch:

```bash
npm run deploy
```

This runs `npm run build` then pushes `dist/` to `gh-pages`. The site is served from the root (`base: "/"` in [vite.config.js](vite.config.js)) via the custom domain `summerbucketlist.me`. If you fork to a GitHub Pages subdirectory, set `base` back to `"/<repo-name>/"` and update the `homepage` field in [package.json](package.json).

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
