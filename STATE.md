# STATE: Tectra brand site

Spec: `rule/Brand-site.md` (master spec) and `rule/07-tectra.md` (this project's link and layout direction).

## Project facts

- Next.js 16.4.6 (App Router, Turbopack), React 19.3.0, JavaScript only.
- App lives in `src/app`. In the spec, `app/`, `components/` and `lib/` mean `src/app`, `src/components`, `src/lib`.
- Tailwind CSS 4.3.3, set up through the `@tailwindcss/turbopack` loader in `next.config.mjs` and
  `@import "tailwindcss"` in `src/app/globals.css` (tokens go in `@theme inline`).
- Import alias: `@/*` -> `./src/*`.
- framer-motion ^14.12.0. playwright (dev) added for the checks.
- Node v22.18.0, git 2.54.0. Browser tool: playwright-cli skill (global), Chromium 1254.
- Remote: `origin` = https://github.com/own-nanolix/Tectra.git, branch `main`.
- BEHANCE_URL: https://www.behance.net/gallery/225852373/Tectra-Construction-SaaS-UX
- SITE_NAME: tectra-brand-site

## Steps

- [x] 1. Check the project and the PC, tool files, `next.config` keys, `.gitignore` lines
- [x] 2. Extract the case study
- [x] 3. Study it and write `SOURCE.md`
- [ ] 4. `LAYOUTS.md`, `pages.json`, shared system, 30 stub routes, `BRIEF.md`; dev server started
- [ ] 5. Build team, two waves; check reports 30 of 30 `ok`
- [ ] 6. Review team; shared fixes applied
- [ ] 7. Verify in the browser; SVG export
- [ ] 8. `REPORT.md` and `README.md`
- [ ] 9. Offer to publish to Vercel

## Decisions

- The spec names `PROJECT.md` and `BRAND-SITE.md` in the project root. Here they are `rule/07-tectra.md` and
  `rule/Brand-site.md`. They are left where they are and are not edited. From `07-tectra.md` only the Behance
  link, the site name and section 2b (layout direction) apply; the rest of that file describes a single-file
  build that `Brand-site.md` replaces.
- `next.config.mjs`: `cacheComponents: true` and `partialPrefetching: true` were removed. With `output: 'export'`
  the build stops with "Invariant: PPR cannot be enabled in export mode", and the static export is required by
  the spec. Every other existing key is kept.
- `gh` is not installed. It is only needed to create a repo when there is no remote; this project already has
  `origin` and `git push` works, so it was not installed.
- The untouched project was built successfully in the setup session; in this session the first build ran after
  the config keys were added.

## Dev server

(not started yet)

## Log

- Step 1 done: tools written from spec section 16, `.gitignore` extended, static export builds.
- Steps 2 and 3 done: 19 images in reference/ (headed Chrome; the headless browser got HTTP 400 from Behance), sliced with sharp from node_modules, SOURCE.md written.
- Decision: HERO_FEATURE = the Progress site view (isometric building, pins, Komatsu card, Cut and Fill). PRODUCT_OBJECT = hard hat with a rugged site tablet.
- Decision: landing ids lp-home, lp-dashboard, lp-progress, lp-timeline, lp-work-areas, lp-mobile, lp-pricing (from the nav and the landing sections).
- Decision: Urbanist is the real brand font and is on Google Fonts, so no substitute is needed.
