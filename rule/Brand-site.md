# Brand site on Next.js: master spec

Use this file together with `PROJECT.md` in the same folder. `PROJECT.md` gives this project's Behance link, site
name and layout direction. This file gives everything else. Both stay in the project root; do not edit them.

This folder is an **existing Next.js project (JavaScript, App Router)**. Build the brand site inside it, on its own
technology. Do not start a new project, do not change the framework, and do not break what is there.

---

## 0. Start here: check the project and the PC

The person running this may not be technical. Talk to them in short, plain words, one small step at a time.

1. Read `PROJECT.md`. Then read `package.json`, `next.config.*`, `jsconfig.json`, and `AGENTS.md` / `CLAUDE.md` if
   they exist. If `AGENTS.md` says this Next.js version differs from what you know and points to docs inside
   `node_modules/next/dist/docs/`, read the pages you need (App Router, metadata, fonts, static exports) before
   writing code. Write into `STATE.md`: Next.js and React versions, whether the app lives in `src/app` or `app`,
   the Tailwind version and how it is set up, the import alias, the framer-motion version. In this file, `app/`,
   `components/` and `lib/` mean the same folders inside `src/` when the project uses `src/`.
2. Check the tools: `node -v` (the version this Next.js needs), `git --version`, `gh auth status`, and a browser tool
   that can open web pages and run JavaScript in them (Claude in Chrome, or the playwright-cli skill). If something
   is missing, give the person **one** command to run and wait until they say it is done.
3. If `STATE.md` already lists ticked steps, this is a resume: read it and continue from the first unticked step.
   On resume, trust `npm run build` and `node tools/check.mjs` over anything written earlier.
4. Git and GitHub: confirm this is a git repo with a remote `origin`. If there is no remote, create a private repo
   with the folder's name: `gh repo create <folder name> --private --source . --remote origin`. Commit what is
   there now as `start: project before brand site` and push.
5. Packages: if `framer-motion` is not in `package.json`, run `npm i framer-motion`. Add the dev tool for the
   checks: `npm i -D playwright`, then `npx playwright install chromium`. Install nothing else.
6. Run `npm run build` once before changing anything. If it fails on the untouched project, stop and show the
   error (section 15).
7. Tell the person in three lines: this takes hours, not minutes; they can leave it running; every finished step
   is pushed to GitHub; if it stops, typing "continue" picks it up again.

## 1. Protect the existing project

- **Same technology.** Next.js App Router, JavaScript only (`.js` / `.jsx`, no TypeScript), the styling the project
  already uses (Tailwind plus plain CSS and CSS Modules), framer-motion for motion. Do not upgrade, downgrade, swap
  or remove any package. Do not add libraries: no chart, icon, UI-kit, animation, font or utility packages. The only
  additions allowed are framer-motion (if missing) and playwright as a dev dependency.
- **Extend, do not replace.** `next.config.*` gets only the keys in section 5, keeping its existing ones.
  `app/layout.jsx` and `app/globals.css` keep their structure and the Tailwind import line; the starter fonts,
  starter colours and dark-mode demo variables may be swapped for the brand's. The starter home page, starter
  README text and starter images in `public/` may be replaced.
- Work only inside this folder.
- **Keep it building.** `npm run build` must pass before every commit. If a change breaks the build and two fixes do
  not repair it, undo that change with git and note it in `STATE.md`.
- **Push as you go.** At every milestone: `git add -A`, `git commit -m "<milestone>: <one line>"`, `git push`. If a
  push fails, note it in `STATE.md`, keep working, and push again at the next milestone. Never force-push, never
  rewrite history, never delete branches.
- `.gitignore` must contain `node_modules/`, `.next/`, `out/`, `reference/`, `.vercel/`, `*.log`, `audit.json`.
  Add the missing lines; keep the existing ones.
- Do not publish to Vercel until section 14.

## 2. What I want

BEHANCE_URL (in `PROJECT.md`) is a brand / product case study by a designer who is our prospect. We are pitching
them two things: a way to present their work to their own clients as a live website instead of a Behance scroll,
and **us as their partner for motion design, graphic design, UI design and brand thinking**.

Build that website from their case study: 30 pages, from logo to colour to motion to product to landing pages to
the physical brand, with animation, micro-interactions and working interactive modules, as a Next.js site in this
project (one route per page, exported as a static site), plus every graphic and mockup as a standalone SVG.

The designer is the audience. They must recognise their own work on every page, and see on the same pages what a
partner adds. **Reproduce what they made; do not redesign it. Then extend it, generously, in their language.**
The extensions are the pitch: go all out on them.

Quality is judged on these, in this order:
1. Every page and every deliverable in section 9 exists, at or above its minimum count.
2. Consistency: all 30 pages look like one system made by the same designer.
3. Brand thinking: extensions feel like the designer's next step, not like a template.
4. Motion and UI craft: outstanding, deliberate, in the brand's own personality.
5. Everything is drawn in code and every graphic exports as a standalone SVG (rule 10).
6. Minor accessibility fixes, without restyling.

Work in English. After setup, run from start to finish without stopping for approval. Stop and ask only for the
blockers in section 15 and at the publish step in section 14.

## 3. Derive these from the link (do not ask)

| Value | Where it comes from |
|---|---|
| `BRAND` | The brand name in the project title and artwork |
| `DESIGNER` | The project owner(s) on the Behance page, spelled exactly as shown |
| `HERO_FEATURE` | The one thing the case study makes most of (an assistant, a booking flow, a card, a map) |
| `PRODUCT_OBJECT` | The physical thing this brand would really make or hand over (section 9, page 30) |
| `CLEAN_URL` | BEHANCE_URL with any query string removed |

## 4. Layout direction

`PROJECT.md` gives this project its own direction: mockup staging, mockup backdrop, what the brand pages lean on,
what dashboard option A is, and what the landing pages lean on. We build many of these sites, and they must not
look like each other. No layout may repeat inside this site either.

How to use it:
- It sets staging and structure only. Colour, type, shapes, artwork and copy still come from the case study.
- Where the case study itself shows a layout (rule 1), the case study wins.
- **Inside the site nothing repeats.** Each of the seven mockup pages arranges its objects differently within
  this staging. The 7 landing pages have 7 different hero structures and section orders. The 5 dashboard options
  have 5 different structures. No two brand pages share a grid. No two charts, cards or tiles that carry different
  content are the same component with the text swapped: vary structure, not just labels.
- Before the build team starts, write `LAYOUTS.md`: one line per page naming its grid and composition, and one
  line per mockup naming its arrangement and camera. No two lines may be the same. Builders follow it; reviewers
  check against it.

## 5. Project layout

```
(project root)
  PROJECT.md, BRAND-SITE.md   these instructions (keep, do not edit)
  README.md                   what this is, how to run, check, preview and export; the live link once published
  STATE.md                    checklist of the steps in section 6, ticked as they finish, plus decisions made
  SOURCE.md                   everything learned from the case study (section 7)
  LAYOUTS.md                  one line per page and per mockup: its grid, composition and camera (section 4)
  BRIEF.md                    the builders' brief (section 9)
  REPORT.md                   the final report (section 13)
  pages.json                  the 30 pages in order: [{ "id", "title", "group", "minExports" }]
  next.config.*               existing keys kept, plus: output: 'export', trailingSlash: true,
                              images: { unoptimized: true }
  tools/                      extract.js, check.mjs, serve-out.mjs, audit.mjs, export-svg.mjs (section 16, copy exactly)
  reference/                  the case study images: local only, never committed, never used in the site
  app/
    layout.jsx                root: brand fonts via next/font/google, globals.css, metadata, Providers, ExportMode
    globals.css               tokens, type, surfaces, components, mockup kit, motion utilities, focus, reduced motion
    icon.svg                  inline SVG favicon drawn from the mark
    not-found.jsx             a quiet 404 with a link to the overview and the index
    (site)/layout.jsx         skip link, SVG sprite, <main>, presenter dock, index overlay, toast region
    (site)/template.jsx       page-enter transition; moves focus to the page's <h1> after each navigation
    (site)/page.jsx           "/" : renders the overview page
    (site)/<id>/page.jsx      one route per page id, 30 in all
  components/
    site/                     Dock, IndexOverlay, Toast, Sprite, Icon, Reveal, CountUp, Typewriter, CopyValue,
                              ExportMode, Providers (lead only)
    ui/                       Button, Chip, Card, Tabs, Toggle, Field, LandingNav, LandingFooter,
                              Phone, Tablet, Laptop, Monitor, Watch (lead only)
    art/                      Mark and lockups, key art and patterns, mockup kit parts and materials (lead only)
    pages/<id>/               everything only that page uses (its builder only)
  lib/
    pages.js                  reads pages.json: pageMeta(id), groups, previous / next
    motion.js                 easing and duration tokens (mirrored as CSS variables)
    charts.js                 the brand's chart helpers: scales, paths, ticks
    site.js                   copy(), fmt(), uid()
  export/svg/<name>.svg       every graphic and mockup as a standalone SVG (committed)
```

The starter `app/page.jsx` (and its CSS module, if any) is removed: `/` now lives in `app/(site)/page.jsx`.

## 6. Steps (tick each in STATE.md as it finishes; commit and push after each)

1. Check the project and the PC (section 0), apply section 1, write the five tool files (section 16), add the
   `next.config` keys and the `.gitignore` lines.
2. Extract the case study (section 7).
3. Study it and write `SOURCE.md` (section 7).
4. Write `LAYOUTS.md` (section 4), `pages.json`, the shared system, the 30 stub routes and `BRIEF.md`
   (sections 8 and 9). `npm run build` passes and `node tools/check.mjs` lists all 30 pages as stubs. Then start
   the shared dev server (`npm run dev` in the background) and write its address in `STATE.md`.
5. Run the build team in two waves (section 10). Do not go on until check reports 30 of 30 pages `ok`.
6. Run the review team (section 11) and apply shared fixes.
7. Verify the built site yourself in the browser and run the SVG export (section 12).
8. Write `REPORT.md` and `README.md` (section 13).
9. Offer to publish to Vercel (section 14).

## 7. Extract and study (the lead does this itself, no agents)

**Extract.** Open CLEAN_URL in the browser. Run `tools/extract.js` in the page to scroll the whole project (images
lazy-load) and collect every project image in order. I give permission to download those images from Behance's
image CDN into `reference/` for reference only. For each image try the candidate sizes in the order the script
lists them and keep the first that downloads. Name them `m01`, `m02`, ... in page order, with the real extension.
If Behance's markup has changed and the script finds nothing, adapt the script; screenshot the page only if
adapting fails.

**Slice.** Any image taller than about 1400 px must be cut into overlapping slices (`m12_1`, `m12_2`, ...) so it
can be read at full resolution. Never judge detail from a downscaled tall image.

**Read everything.** Open every image and slice. Zoom into the logo and save an enlarged crop as `logo_zoom.png`.

**Write `SOURCE.md`** with:
- CLEAN_URL, project title, DESIGNER, date, the tools and tags listed on the page.
- An image index: one line per image saying what it shows and every line of copy and every figure on it.
- Palette with names and hex values exactly as published (sample from the image only where none are published,
  and mark those as sampled).
- Typeface and weights, type scale, letter-spacing habits, case habits.
- Component shapes: buttons, cards, radii, chips, inputs, nav, footer, charts, icons, device frames.
- Gradients, textures and background treatments, described precisely enough to redraw in SVG/CSS.
- The logo's geometry: the shapes, ratios and angles it is built from. Extensions grow from these.
- The motion personality the brand implies, as concrete durations and easing curves.
- **The brand idea in two sentences, in your own words, from this case study only.** Every extension must be
  explainable from it.
- A map of the 30 pages: which parts are faithful rebuilds and which are extensions.
- **Illegible list:** any value that cannot be read even when zoomed. These are never guessed silently (rule 3).

## 8. Rules that cannot be broken

1. **Do not redesign.** Where the case study shows something, reproduce it exactly: copy verbatim, including every
   figure, plus colours, layout, proportions and component shapes. Measure positions, sizes and angles from the
   reference; do not estimate them.
2. **Extend generously, only in the designer's language.** The case study will not show most of section 9. Create
   it. New graphic elements are wanted: more icons in the same grid and stroke, patterns and key art built from
   the logo's geometry, illustrations in the brand's shapes and palette, chart styles, loaders, transitions,
   social templates, physical products. Each must look as if the same designer drew it: same palette, type,
   radii, stroke weights and spacing. Mark nothing as "new" in the interface; the report lists what we added.
3. **Invent no facts.** No invented prices, statistics, taglines, phone numbers, addresses, testimonials, people,
   job titles, card numbers or dates. Reuse lines and figures that appear in the case study. Where a deliverable
   needs facts the case study does not publish (pricing, contact details), use a neutral call to action or leave
   the field as a quiet placeholder line. Illegible values: use a legible value from elsewhere in the case study
   or leave it out, and list it in the report. Section labels that only name a deliverable ("Colour versions",
   "Clear space") are allowed and are written plainly.
4. **The deliverable list is a checklist, not a design.** Section 9 says what must exist and how many. It says
   nothing about how anything should look, be laid out, be named or be explained. All of that comes from this
   brand's own case study. Do not borrow concepts, compositions, headings or copy from any other brand system you
   know of, and do not reuse one brand's solutions for another.
5. **All assets are code.** Inline SVG (in JSX) and CSS only. The logo is traced as SVG paths; gradients are SVG/CSS
   gradients; charts, icons, illustrations, device frames, products and mockups are drawn in code. No `<img>`, no
   `next/image`, no raster files, no base64 images, no AI-generated images, no external URLs, and no icon or chart
   libraries. Photos in the source (people, hands, rooms) are replaced by brand gradients or code-drawn objects,
   never by drawn people. Fonts load through `next/font/google` (self-hosted at build time). If the brand font is
   commercial, use the closest free Google font, with the brand font's real name first in the CSS font stack and a
   system fallback last. Say which font was used and why.
6. **One site, 30 routes.** Each page id is a route `/<id>/`; `/` shows the overview. The site builds as a static
   export (`out/`) with no server features (no API routes, server actions, cookies or headers). A presenter dock
   to step through pages (previous, next, page number and title, Index; Shift+Left / Shift+Right also step) and an
   index overlay listing every page by group live in `app/(site)/layout.jsx`. Navigation uses `next/link` and
   `useRouter`. Metadata sets `robots: { index: false, follow: false }`; each page sets its own title.
7. **One system.** Tokens, type classes, buttons, cards, nav, footer, logo, device frames, the mockup kit and
   helpers live in `app/globals.css`, `components/site`, `components/ui`, `components/art` and `lib/`, and are
   used by every page. Pages import them and never redefine or edit them.
8. **Motion is a headline feature.** framer-motion and CSS, using the shared easing and duration tokens from
   `lib/motion.js`; never default easings. The root wraps the app in `MotionConfig reducedMotion="user"`. Page
   changes have an enter transition in `app/(site)/template.jsx` (no exit animations across routes). Every page has
   a designed entrance, scroll reveals (the shared `Reveal`, opacity and transform only, never `visibility` or
   `display`) and at least one signature animated moment (a logo drawing on, a chart growing, a device assembling,
   a product turning to the light). Every interactive element has hover, focus-visible and active states. Animate
   only `transform` and `opacity` where possible. Animations always land on their final value, including when
   interrupted or when the page is left and re-entered. `prefers-reduced-motion` is honoured.
9. **Minor accessibility fixes only.** Small text (under 24 px) reaches 4.5:1; large display type keeps the
   original colours. Real `<button>` and `<a>`; visible focus states; keyboard support for every interactive
   module (tabs use `role="tablist/tab/tabpanel"` and arrow keys; toggles use `aria-pressed` or `role="switch"`);
   meaningful SVG gets `role="img"` and `aria-label`, decorative SVG gets `aria-hidden="true"`; screen-reader
   labels use real names, never internal token names; no horizontal page scroll from 1920 px down to 390 px.
   Record every accessibility change that altered the look.
10. **Everything graphic exports as SVG.** Every logo variant, swatch sheet, gradient, texture, icon, illustration,
    chart, social post, poster, device frame, product and mockup is its own inline `<svg>` that
    `tools/export-svg.mjs` can save as a standalone file:
    - It has a `viewBox`, a `<title>` as its first child, and `data-export="<page id>-<name>"` (lower-case letters,
      digits and hyphens; unique across the site).
    - Geometry lives in attributes (`d`, `x`, `width`, `transform`, ...), not in CSS. Paint may come from CSS
      classes and tokens; the exporter writes the computed values into the file. In JSX use camelCase SVG
      attributes (`strokeWidth`) and `href`, not `xlinkHref`.
    - The SVG's markup is the finished artwork. Inside an exportable SVG animate with CSS keyframes only, playing
      *from* a start state towards the base style (`animation-fill-mode: backwards` or `both`), so that with
      `html.exporting` set (all animation and transition off, all reveals shown) the SVG is complete and correct.
      framer-motion may move the wrapper around an SVG, never the artwork inside it.
    - No `<foreignObject>`, no HTML inside the SVG, no CSS `background` or pseudo-element standing in for artwork.
      Gradients, clips, masks, filters and textures are SVG `<defs>`.
    - Text inside artwork is SVG `<text>` with the brand font stack (it is outlined later, in a design tool).
    - A mockup is one SVG: object, materials, shading, shadow and the brand artwork on it, in one `viewBox`.
    Interactive UI (dashboards, mobile screens, landing pages) is built as React components (client components
    where interactive) so that it works, is responsive and is accessible. Inside it, every icon, chart,
    illustration and device frame still follows this rule, and each full screen has a fixed-size artboard root
    marked `data-screen="<name>"` so it can be converted to SVG as a later step.
11. English only in every file. Brand copy stays exactly as the designer wrote it.

## 9. The 30 pages and their minimum deliverables

`pages.json` lists these ids in this order, each with its `minExports` (the least number of exportable SVGs on
that page). Counts are minimums: more is welcome, fewer is a failed page. Rename the landing-page ids and titles to
fit the brand; keep the other ids.

### Brand foundations

| # | id | Must contain, at minimum | minExports |
|---|---|---|---|
| 1 | `overview` | Cover; about this brand with a contents list; the brand's principles as 4 cards; an index of every chapter; a second index of every mockup and product | 2 |
| 2 | `logo` | Primary lockup; construction diagram with measurements; clear space diagram and 4 minimum sizes; 4 colour versions; a family of 4 lockups; 6 misuse examples; the secondary graphic built from the mark; an animated draw-on | 18 |
| 3 | `color` | Primary colour scale as a spec table (token, hex, RGB, contrast on light and on dark); neutral scale as the same table; proportion bar; 6 accessible pairings; semantic tokens for dark and light mode. Click any value to copy it | 5 |
| 4 | `gradients` | A library of 6 named gradients; anatomy of 2 of them (stops, angles, positions); grain or texture with a comparison and 4 intensity levels; 6 full-size key-art pieces built from the brand's own geometry; 4 looping motion studies | 20 |
| 5 | `typography` | Primary typeface with its weights; secondary typeface with its weights; the full type scale; character set; hierarchy in use on a real layout; a construction or metrics study of the type | 6 |
| 6 | `icons` | 32 icons on one grid and stroke; construction of 2 icons on the pixel grid with 4 sizes; 4 examples of icons in use; 3 illustrations, each shown on light and on dark | 40 |
| 7 | `dataviz` | 16 chart types for this brand's own data (trend, comparison, share, distribution, time, flow, place, ranking); stat cards (4), KPI tiles (3), a data table (6 rows), sparklines, 2 live counters; legend, tooltip and tab components; loading, empty and error states; chart rules (6). Charts animate and have tooltips | 20 |
| 8 | `motion` | The motion system: easing curves and durations as live demos; logo animation; page and component transitions; a micro-interaction library (buttons, toggles, inputs, loaders, toasts); a motion do / don't | 6 |
| 9 | `strategy` | The case study's own story: problem, research figures, solution and impact, with its charts and diagrams animated | 3 |

### Web

| # | id | Must contain, at minimum | minExports |
|---|---|---|---|
| 10 | `web-system` | Web components: button set (6 variants with states), navigation bar, links, tags, feature cards, a code or content block, list rows, footer; an open mega menu | 3 |
| 11 | `lp-home` | The case study's landing page rebuilt section by section, 8 sections or more. The most fidelity-critical page | 2 |
| 12–17 | `lp-...` | 6 more landing pages for the brand's main features, audiences, offers and moments (for example product, audience, editorial, live data, launch event, pricing), 7 sections or more each, each with a different structure, sharing the nav and footer | 2 each |

### Product

| # | id | Must contain, at minimum | minExports |
|---|---|---|---|
| 18 | `dashboard` | 5 dashboard home options (A to E) on the same data with 5 different structures, an options overview that compares them, and 2 inner screens: 7 screens in one working shell. Dashboard components: sidebar item, rail item, KPI tile, table header and row, filter chip, status row, search field, date range, account chip. Charts have tooltips, tables sort and filter | 8 |
| 19 | `mobile-a` | Mobile screens 1 to 9 in a live phone that steps through them, plus the row of all nine | 2 |
| 20 | `mobile-b` | Mobile screens 10 to 18, the same way, plus the mobile component set (status bar, nav, tab bar, list row, menu row, card, stat card, input, accordion, sheet) and 7 interaction patterns | 2 |
| 21 | `feature` | HERO_FEATURE as a working demo (for an assistant: typed prompts and scripted answers that use only case-study figures) | 2 |

### Campaign and the physical brand

Every item below is a code-drawn mockup and is compulsory for every brand. Where an item truly cannot belong to
this brand, replace it with another physical item of the same kind; never drop below the count.

| # | id | Must contain, at minimum | minExports |
|---|---|---|---|
| 22 | `showcase` | 4 hero scenes: phone with data cards; a line-up of 8 phones; a laptop on a plinth; an event stage with the brand on screen | 4 |
| 23 | `campaign` | 4 social posts (1080 × 1080), 3 posters (1080 × 1350), stories and a profile grid, from the brand's own lines and visuals. Posts animate in | 7 |
| 24 | `use-apparel` | A full collection scene; 3 t-shirts (front and back); 3 hoodies; 3 caps; a print-spec sheet with placements and dimensions | 12 |
| 25 | `use-accessories` | 2 tote bags; 2 mugs; 2 bottles; sticker sheet; pin card; 4 patches and a keychain; cup with sleeve and coasters; desk mat and mouse pad; umbrella and socks; gift card (front, back) with carrier | 20 |
| 26 | `use-stationery` | Letterhead; envelope; business cards (2 fronts, 1 back); pen; 2 notebooks; tri-fold brochure; report cover with spine; a slide deck of 5 slides | 14 |
| 27 | `use-packaging` | Tape (2 rolls and strips); 2 shipping boxes; 2 product boxes; 3 shopping bags; tissue paper, seal sticker and label | 12 |
| 28 | `use-event` | Lanyard with speaker badge; 2 staff ID cards in a holder; wristbands (4 fabric, 3 silicone); 3 tickets and a VIP pass; exhibition booth; 3 feather flags and a hanging banner | 19 |
| 29 | `use-world` | Billboard; citylight and roll-up banners; reception signage with wayfinding and a room plaque; vehicle wrap | 6 |
| 30 | `use-product` | **The brand's physical products.** PRODUCT_OBJECT drawn as a real object, front and side, with its cable, case or packaging as fits; a card in 3 colourways, front and back (payment, membership, access or loyalty, whichever this brand would issue); tablet, phone and watch showing the product; the app icon at 5 sizes | 12 |

**Choosing PRODUCT_OBJECT.** Every brand gets one, including pure software brands. Pick the object this brand
would most believably ship or hand to a customer: a payment card and card reader for finance; a welcome kit and
document folder for immigration or services; a site tablet, hard hat and site signage for construction; a lab kit
and sample packaging for science; a hardware key, sensor or hub for technology. Draw it with real materials
(metal, matte plastic, glass, paper, fabric), one light direction and a contact shadow, and give it a slow
turn-to-the-light animation.

**Mockup kit.** All mockup pages share one light direction, one shadow style and one backdrop family (from
`PROJECT.md`), defined once in `components/art`; the arrangement of objects is different on every page. The kit
also holds material definitions (fabric, paper, card, metal, glass, ceramic, rubber) as SVG gradients, patterns and
filters. Brand artwork (lockups, key art, patterns, slogans that exist in the case study) is defined once as
components in `components/art` and placed on objects, so the same artwork is identical everywhere. Text on mockups
is only the logo, the brand name, or lines that appear in the case study.

**The lead writes the shared system before any agent starts:**
- `app/globals.css`: colour tokens as CSS variables (also exposed to Tailwind the way this Tailwind version
  expects), type classes, surfaces and gradients, buttons, chips, cards, grids, device frames, landing nav and
  footer, the mockup kit classes, motion tokens (`--ease-*`, `--dur-*`) and utilities, focus styles, the
  reduced-motion block, dock and index styles, and
  `html.exporting *{animation:none!important;transition:none!important}` plus
  `html.exporting [data-reveal]{opacity:1!important;transform:none!important}`.
- `app/layout.jsx`: brand fonts through `next/font/google` as CSS variables (real brand font name first in the
  stack), `globals.css`, metadata (title template `%s · <BRAND>`, robots noindex), `Providers` (a client component
  with `MotionConfig reducedMotion="user"` and the shared transition) and `ExportMode`.
- `components/site/ExportMode`: a client component; on mount, if `window.location.search` contains `export=1`, it
  adds `exporting` to `<html>` and, if this framer-motion version exports `MotionGlobalConfig`, sets
  `MotionGlobalConfig.skipAnimations = true`. Do not use `useSearchParams` for this.
- `app/(site)/layout.jsx`: skip link to `#site-main`, the SVG sprite (logo symbol and the 32 icons as `<symbol>`,
  ids `site-...`), `<main id="site-main">`, the presenter dock, the index overlay, a toast region. Every id in the
  shared shell starts with `site-`. No `<h1>` outside pages.
- `app/(site)/template.jsx`: page-enter transition with the shared tokens; after each navigation, focus moves to
  the page's `<h1>` (give it `tabIndex={-1}`).
- `app/(site)/page.jsx`: imports the overview route component and renders it, with the overview's metadata.
- `app/not-found.jsx`: a quiet 404 with a link to `/overview/` and the index.
- `components/site`: `Dock`, `IndexOverlay`, `Toast` with `toast()`, `Sprite`, `Icon` (`<use href="#site-icon-x">`),
  `Reveal` (`data-reveal`, `delay`), `CountUp`, `Typewriter`, `CopyValue` (click to copy, then a toast). Reveal,
  CountUp and Typewriter show their final state at once under reduced motion or `html.exporting`.
- `components/ui`: `Button`, `Chip`, `Card`, `Tabs` (tablist/tab/tabpanel with arrow keys), `Toggle`
  (`role="switch"`), `Field`, `LandingNav`, `LandingFooter`, and device frames `Phone`, `Tablet`, `Laptop`,
  `Monitor`, `Watch`.
- `components/art`: `Mark` and the lockups (traced logo paths), key art and pattern generators built from the logo's
  geometry, the mockup kit (`Shadow`, `Backdrop` in this project's direction, material `<defs>` generators). Every
  art component takes an `idp` prop (id prefix) and an optional `exportName`, so it can appear many times on a
  page without id clashes.
- `lib/pages.js`, `lib/motion.js`, `lib/charts.js`, `lib/site.js` as in section 5.
- **30 stub routes**: each `app/(site)/<id>/page.jsx` renders
  `<section className="page" id="p-<id>" aria-label="<title>" data-stub=""><h1 tabIndex={-1}><title></h1></section>`
  and exports `metadata = pageMeta('<id>')`, so the build passes before any builder starts.
- `BRIEF.md`: rules 1 to 11, the page format below, every shared component, class and helper with one-line usage,
  the brand facts and brand idea from `SOURCE.md`, the image index, the page ids, and the hand-back format.

**Page format** (each builder owns `app/(site)/<id>/` and `components/pages/<id>/` for its own ids):

```jsx
// app/(site)/<id>/page.jsx  (server component: no 'use client' here, so it can export metadata)
import { pageMeta } from '@/lib/pages';
import Demo from '@/components/pages/<id>/Demo'; // interactive parts are client components
import s from '@/components/pages/<id>/<id>.module.css';

export const metadata = pageMeta('<id>');

export default function Page() {
  return (
    <section className="page" id="p-<id>" aria-label="<Page title>">
      <h1 tabIndex={-1}>…</h1>
      …
    </section>
  );
}
```

- The page's root is that `<section>`. Remove `data-stub`.
- Page-only styles live in `components/pages/<id>/<id>.module.css` (keyframes named `<id>-xxx`) or in Tailwind
  classes that use the shared tokens. No global CSS from pages.
- Every id, including SVG gradient, filter, clip-path and mask ids, starts with `<id>-` and is unique within the
  page. Shared art used more than once gets a different `idp` each time.
- Exactly one `<h1>` per page, then ordered `h2` / `h3`.
- Links to other pages are `<Link href="/<id>/">`. Never use plain `#anchor` links; scroll with JS instead.
- Repetitive SVG (bars, dots, rows, grids, colourways, repeated objects) is generated with `.map()` and small
  functions, never hand-typed.
- 600 to 1,600 lines per page in total across its files.
- Builders do not edit anything outside their own folders. Anything missing from the shared system is built
  page-scoped and reported.
- Builders never run `npm run build` or `next build` and never start a server.

## 10. Build team

Use subagents. Builders run on **Sonnet**. Run them in **two waves of 12**, each wave launched in one message, so
the PC is not overloaded. Each builder owns the pages below and nothing else.

| Wave | Builder | Pages |
|---|---|---|
| 1 | B1 | `overview`, `strategy` |
| 1 | B2 | `logo` |
| 1 | B3 | `color`, `typography` |
| 1 | B4 | `gradients` |
| 1 | B5 | `icons` |
| 1 | B6 | `dataviz` |
| 1 | B7 | `motion` |
| 1 | B8 | `web-system` |
| 1 | B9 | `lp-home` |
| 1 | B10 | landing pages 2, 3 |
| 1 | B11 | landing pages 4, 5 |
| 1 | B12 | landing pages 6, 7 |
| 2 | B13 | `dashboard` |
| 2 | B14 | `mobile-a` |
| 2 | B15 | `mobile-b` |
| 2 | B16 | `feature`, `showcase` |
| 2 | B17 | `campaign` |
| 2 | B18 | `use-apparel` |
| 2 | B19 | `use-accessories` |
| 2 | B20 | `use-stationery` |
| 2 | B21 | `use-packaging` |
| 2 | B22 | `use-event` |
| 2 | B23 | `use-world` |
| 2 | B24 | `use-product` |

Each builder's brief is short and self-contained: read `BRIEF.md`, `app/globals.css` and the files in
`components/site`, `components/ui`, `components/art` and `lib/` first; your pages are X; the minimum deliverables
for them (paste the row from section 9); open only these reference images (list them); the exact copy and figures
for your pages (paste them, do not make the builder rediscover them); write each page to disk as soon as it is
complete, before starting the next; check with `npx eslint "app/(site)/<id>" "components/pages/<id>"` and fix every
error; never run the production build or start a server; you may look at your page on the shared dev server (its
address is in `STATE.md`); reply in under 150 words with files written, a count of each deliverable against its
minimum, faithful parts, extensions, any wording or value that is your own, and anything not checked.

After each wave: stop the dev server, run `npm run build`, then `node tools/check.mjs`. If the build fails, find
the page that breaks it: fix a small error yourself, otherwise put that page back to its stub and relaunch its
builder. **For every page reported `MISSING` or `WARN`, or handed back under its minimum counts, launch one more
builder for exactly that page.** Do this once more if needed, then finish any page still short yourself. Restart
the dev server, commit and push. Do not start the review until check prints 30 of 30 `ok`. If a session ends while
agents are running, their pages may be partial: on resume, trust only the build and check output, not earlier
reports.

If subagents are not available in this session, build the pages yourself in the order of the table, running the
build and check after every few pages.

## 11. Review team

Launch 8 reviewers in parallel on **Opus**. Each one reviews *and fixes* its own pages, in the browser on the shared
dev server, against the reference images and the minimums in section 9. No two reviewers touch the same file.
Reviewers do not edit shared files (`app/globals.css`, layouts, `components/site`, `components/ui`,
`components/art`, `lib/`); they send recommended shared changes to the lead, who applies them once. Reviewers never
run the production build.

| Reviewer | Pages |
|---|---|
| R1 | `overview`, `strategy`, `logo`, `color`, `typography` |
| R2 | `gradients`, `icons`, `motion` |
| R3 | `dataviz`, `dashboard` |
| R4 | `mobile-a`, `mobile-b`, `feature` |
| R5 | `web-system`, `lp-home`, landing pages 2, 3 |
| R6 | landing pages 4, 5, 6, 7 |
| R7 | `showcase`, `campaign`, `use-apparel`, `use-accessories` |
| R8 | `use-stationery`, `use-packaging`, `use-event`, `use-world`, `use-product` |

Every reviewer checks all of these, because each one has gone wrong before:
- **Counts.** Every deliverable in the page's row exists at or above its minimum. Count them.
- **Invented copy.** Compare every heading, label, caption and figure with the reference. Remove or replace
  anything the builder made up (helper labels, status text, tag names, tooltip values).
- **Swapped or misread figures.** Re-read charts, legends and percentages from an enlarged crop, not from memory or
  from the brief. The same figure reads the same on every page it appears on.
- **Guessed geometry.** Re-measure hero layouts, tilt angles, marker positions and crop edges from the reference.
- **Borrowed ideas.** Anything that reads like a generic brand-guideline template rather than this brand.
- **Repeated layouts.** Compare the pages with `LAYOUTS.md` and with each other. Two pages on the same grid, two
  mockups in the same arrangement, or the same component reused with only the text changed, must be redesigned.
- **Mockup realism.** One light direction, contact shadows, believable materials and proportions; artwork follows
  the object's surface; nothing looks like a flat sticker on a flat shape.
- **Export readiness.** Each graphic is its own SVG with `viewBox`, `<title>` and a unique `data-export` name; no
  `foreignObject`; the un-animated state is complete. Run
  `node tools/export-svg.mjs --dry --base=<dev server address> <page ids>`: zero warnings.
- **Duplicate ids.** SVG gradient and clip ids that collide within a page or with the shared shell.
- **Overflow.** No horizontal page scroll at 390 px (side-entering reveals and fixed-width grids are the usual
  causes; grid columns need `minmax(0, 1fr)`). Run `node tools/audit.mjs --base=<dev server address> <page ids>`.
- **Contrast.** Small text under 4.5:1, including chips, tags and white text on light gradients.
- **Private colours.** Buttons and accents that use a page's own hex instead of the shared token.
- **Function and motion.** Click every link, tab, toggle, filter, sort, stepper and demo. Interrupt animations
  mid-way. Leave the page and come back: no stale state, counters land on their final value. Motion uses the
  shared tokens and feels like one hand.

Each reviewer runs eslint on its folders and `audit.mjs` for its pages, and hands back in under 200 words: what was
fixed, what was tested by clicking, what was checked only by reading, values left as placeholders because the
reference is illegible, and shared changes it recommends. Then the lead applies the shared changes, builds,
checks, commits and pushes.

## 12. Verify, then export

Yourself:
1. Stop the dev server. `npm run build` passes and `node tools/check.mjs --strict` exits 0 with 30 of 30 `ok`.
2. Start `node tools/serve-out.mjs` in the background. The built site is at `http://localhost:4173/`.
3. Run `node tools/audit.mjs`. Target on every page at 1440 px and 390 px: no overflow, no low contrast, no unnamed
   controls, no bad links, every SVG has a role or `aria-hidden`, one `<h1>`, exportable SVGs at or above the
   minimum, no duplicate ids, no console errors. Small text on gradients is listed for checking by eye.
4. Visit all 30 pages in the browser with the tab in front (animations do not run in a background tab). Check the
   console for errors. Use the dock, the keyboard shortcuts and the index. Exercise at least one interactive module
   per page.
5. Compare `lp-home`, `logo` and the rebuilt product screens side by side with their reference images.
6. Run `node tools/export-svg.mjs`. It writes every graphic to `export/svg/` and lists warnings. Fix every warning,
   rebuild, and run it again. Open five exported files of different kinds (a logo, a chart, a mockup, a social post,
   the product) directly in the browser and confirm each looks the same as on the page.
7. Close any browser tabs you or the agents opened, stop the preview server, commit and push.

One retry per failure, then stop and report the exact error. Never report a page as working unless you saw it
working. Say plainly what was checked only by reading.

## 13. Final report

Write `REPORT.md` and give the same content in chat, short and in plain words:
- Where the site is: the routes, `out/` after a build, the GitHub repo, and the live link once there is one.
- A table of every row in section 9: minimum, delivered.
- How many SVGs are in `export/svg/`, and any that exported with warnings.
- Which pages and sections are faithful rebuilds, and the list of what we added as partners.
- Any wording or value that did not come from the case study, and illegible values left as placeholders.
- Accessibility changes that altered the look, and contrast problems left in place to preserve the design.
- The font used and why; anything in the source that could not be reproduced in code.
- What was verified in the browser and what was not.
- Which agents ran, on which model, and any that had to be relaunched.

Also write `README.md` for whoever opens the project next: what it is, `npm run dev`, `npm run build`,
`node tools/check.mjs`, `node tools/serve-out.mjs`, `node tools/audit.mjs`, `node tools/export-svg.mjs`, and the
live link once there is one. Commit and push.

## 14. Publish to Vercel (ask first, then help)

GitHub is already up to date, because every milestone was pushed; confirm `git status` is clean and pushed.

When the report is done, ask: "Do you want this live on Vercel now?" Publishing puts the designer's work at a web
address, so do nothing until they say yes. Then guide them one step at a time and wait at each sign-in.
**They sign in themselves in the browser; never type or ask for a password, token or code.**

1. Ask them to run `npx vercel login` and follow the browser steps. Then deploy from the project folder:
   `npx vercel --yes` for a preview (Vercel detects Next.js and the static export), check it loads, then
   `npx vercel --prod --yes`. Use `SITE_NAME` from `PROJECT.md` as the project name if asked. If the command asks
   questions, read them out and recommend the default.
   If they prefer the website: on vercel.com, Add New, Project, import this GitHub repo, leave every setting as it
   is, Deploy. Connected this way, every later push to GitHub redeploys the site by itself.
2. Open the live address, click through five pages, and confirm it works. Add the address to `README.md` and
   `REPORT.md`, commit and push.
3. Tell them: the link is not listed in search engines but anyone who has it can open it, so share it only with
   the designer; they can delete the Vercel project at any time to take it down.

If a publish step fails twice, stop, show the exact error, and leave the site working locally.

## 15. Ask only if

- BEHANCE_URL does not open, needs a sign-in, or shows a content warning gate.
- Fewer than 5 project images can be extracted after adapting the script once.
- The page is not a brand or product case study (for example a photo series or a single illustration).
- A tool is missing and the person needs to install it (section 0).
- This folder is not a Next.js project, or `npm run build` fails before you changed anything.

Anything else is yours to decide. Decide, note it in `STATE.md`, and keep going.

## 16. Tool files (write these into `tools/` exactly as given)

### `tools/extract.js`

Run it in the Behance page with the browser's JavaScript tool. It returns JSON.

```js
(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  // 1. Scroll the whole project so lazy images load.
  for (let y = 0, i = 0; y < document.documentElement.scrollHeight && i < 600; y += 800, i++) { scrollTo(0, y); await sleep(220); }
  scrollTo(0, 0); await sleep(300);
  // 2. Collect project images in page order, one entry per file.
  const sizes = ['max_3840', 'source', 'fs', '1400'];
  const seen = new Set(), images = [];
  for (const img of document.querySelectorAll('img')) {
    const set = (img.srcset || img.dataset.srcset || '').split(',').map((s) => s.trim().split(' ')[0]);
    const url = [img.currentSrc, img.src, img.dataset.src, ...set].filter(Boolean).find((u) => /\/project_modules\//.test(u));
    if (!url) continue;
    const file = url.split('?')[0].split('/').pop();
    if (seen.has(file)) continue; seen.add(file);
    const candidates = sizes.map((s) => url.replace(/\/project_modules\/[^/]+\//, '/project_modules/' + s + '/'));
    if (!candidates.includes(url)) candidates.push(url);
    images.push({ n: images.length + 1, file, found: url, candidates, w: img.naturalWidth, h: img.naturalHeight, alt: img.alt || '' });
  }
  // 3. Page facts and text.
  const meta = (q) => (document.querySelector(q) || {}).content || '';
  const embeds = [...document.querySelectorAll('iframe, video')].map((e) => e.src || e.currentSrc || e.tagName).filter(Boolean);
  return JSON.stringify({
    url: location.origin + location.pathname,
    title: document.title,
    ogTitle: meta('meta[property="og:title"]'),
    description: meta('meta[property="og:description"]') || meta('meta[name="description"]'),
    imageCount: images.length, images, embeds,
    text: (document.querySelector('main') || document.body).innerText.slice(0, 30000),
  });
})()
```

Download with `curl -L -f -o <file> <candidate>` and move to the next candidate when one fails. The last
candidate (the URL found in the page) can be WebP data under a `.png` name; the others are true PNG/JPEG. Read
the owner name(s) from the page text. Embedded videos and prototypes are listed under `embeds`: note them in
`SOURCE.md` and do not download them.

### `tools/check.mjs`

```js
// Checks the static export in out/ against pages.json.   npm run build, then: node tools/check.mjs [--strict]
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const strict = process.argv.includes('--strict');
const dir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const list = JSON.parse(readFileSync(join(dir, 'pages.json'), 'utf8')); // [{ id, title, group, minExports }]
const out = join(dir, 'out');
if (!existsSync(out)) { console.error('out/ not found: run npm run build first (next.config needs output: "export").'); process.exit(1); }

// Returns the <section> starting at `start`, with nested sections balanced.
const sectionAt = (html, start) => {
  const re = /<(\/?)section\b[^>]*>/gi; re.lastIndex = start; let depth = 0, m;
  while ((m = re.exec(html))) { depth += m[1] ? -1 : 1; if (depth === 0) return html.slice(start, re.lastIndex); }
  return html.slice(start);
};

let bad = 0, okCount = 0;
const report = [], exportNames = new Map();
for (const { id, minExports = 0 } of list) {
  const file = [join(out, id, 'index.html'), join(out, id + '.html')].find((f) => existsSync(f));
  if (!file) { report.push(`MISSING  ${id}`); bad++; continue; }
  // Markup only: drop scripts (the React payload) and styles.
  const html = readFileSync(file, 'utf8').replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
  const start = html.search(new RegExp(`<section\\b[^>]*\\sid="p-${id}"`));
  if (start < 0) { report.push(`WARN     ${id.padEnd(18)} no <section id="p-${id}">`); bad++; continue; }
  const sec = sectionAt(html, start);
  const problems = [];
  if (/\sdata-stub\b/.test(sec)) problems.push('still a stub');
  if (/<img\b/i.test(sec)) problems.push('contains <img> (assets must be code)');
  if (/data:image\/(png|jpe?g|gif|webp)/i.test(sec)) problems.push('embedded raster image');
  if (/<foreignObject\b/i.test(sec)) problems.push('contains <foreignObject>');
  if (/https?:\/\//i.test(sec.replace(/xmlns(:\w+)?="[^"]*"/g, ''))) problems.push('external URL');
  const h1 = (html.match(/<h1\b/gi) || []).length;
  if (h1 !== 1) problems.push(`${h1} <h1> on the page (need exactly 1)`);
  const ids = {}; for (const m of sec.matchAll(/\sid="([^"]+)"/g)) ids[m[1]] = (ids[m[1]] || 0) + 1;
  const dup = Object.keys(ids).filter((k) => ids[k] > 1);
  if (dup.length) problems.push('duplicate ids: ' + dup.slice(0, 5).join(', '));
  const loose = Object.keys(ids).filter((k) => k !== `p-${id}` && !k.startsWith(id + '-'));
  if (loose.length) problems.push(`ids without "${id}-" prefix: ` + loose.slice(0, 5).join(', '));
  let exp = 0;
  for (const m of sec.matchAll(/\sdata-export="([^"]*)"/g)) {
    const n = m[1]; exp++;
    if (!/^[a-z0-9][a-z0-9-]*$/.test(n) || !n.startsWith(id + '-')) problems.push('bad export name: ' + n);
    else if (exportNames.has(n)) problems.push('export name used twice: ' + n + ' (also on ' + exportNames.get(n) + ')');
    else exportNames.set(n, id);
  }
  if (exp < minExports) problems.push(`${exp} exportable SVGs, minimum is ${minExports}`);
  if (problems.length) bad++; else okCount++;
  report.push(`${problems.length ? 'WARN   ' : 'ok     '}  ${id.padEnd(18)} exp ${String(exp).padStart(3)}/${String(minExports).padEnd(3)} ${problems.join('; ')}`);
}
if (!existsSync(join(out, 'index.html'))) { report.push('WARN     "/" (out/index.html) is missing'); bad++; }
console.log(report.join('\n'));
console.log(`\n${okCount} of ${list.length} pages ok`);
if (strict && bad) process.exit(1);
```

### `tools/serve-out.mjs`

```js
// Serves the static export (out/) on this computer only.   node tools/serve-out.mjs [port]  ->  http://localhost:4173
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve, join, normalize, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'out');
const port = Number(process.argv[2]) || 4173;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon', '.png': 'image/png' };

createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = normalize(join(root, p));
  if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
  try {
    const s = await stat(file).catch(() => null);
    if (s && s.isDirectory()) file = join(file, 'index.html');
    else if (!s && !extname(file)) file = file + '.html';
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' }).end(body);
  } catch {
    const nf = await readFile(join(root, '404.html')).catch(() => 'Not found');
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' }).end(nf);
  }
}).listen(port, '127.0.0.1', () => console.log(`Preview on http://localhost:${port}`));
```

### `tools/audit.mjs`

```js
// Measures every page in a real browser at 1440 and 390 px: overflow, contrast, names, links, ids, exports, errors.
// Built site:  npm run build, node tools/serve-out.mjs (keep it running), then node tools/audit.mjs
// Dev server:  node tools/audit.mjs --base=http://localhost:3000 logo color
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const base = (args.find((a) => a.startsWith('--base=')) || '--base=http://localhost:4173').slice(7).replace(/\/+$/, '');
const only = args.filter((a) => !a.startsWith('--'));
const pages = JSON.parse(readFileSync(join(dir, 'pages.json'), 'utf8')).filter((p) => !only.length || only.includes(p.id));

async function auditPage({ id, minExports }) {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const lum = (c) => { const a = c.slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]; };
  const parse = (s) => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[, /]+/).map(Number); return [p[0], p[1], p[2], p[3] === undefined || isNaN(p[3]) ? 1 : p[3]]; };
  const bgOf = (el) => { let e = el; while (e && e !== document.documentElement) { const cs = getComputedStyle(e); if (cs.backgroundImage && cs.backgroundImage !== 'none') return 'grad'; const c = parse(cs.backgroundColor); if (c && c[3] > 0.9) return c; e = e.parentElement; } return [255, 255, 255, 1]; };
  const s = document.querySelector('#p-' + id);
  if (!s) return { missing: true };
  for (let y = 0; y < s.scrollHeight; y += 700) { scrollTo(0, y); await wait(60); }
  scrollTo(0, 0); await wait(300);
  const vw = document.documentElement.clientWidth, ovf = document.documentElement.scrollWidth - vw;
  const wide = [];
  if (ovf > 0) for (const el of s.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > vw + 2 && r.left < vw) {
      let clipped = false, e = el.parentElement;
      while (e && e !== s) { if (getComputedStyle(e).overflowX !== 'visible') { clipped = true; break; } e = e.parentElement; }
      if (!clipped) wide.push(((el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || el.tagName).toString().slice(0, 40) + ':' + Math.round(r.right - vw));
    }
  }
  const low = []; let lowN = 0, gradText = 0;
  for (const el of s.querySelectorAll('*')) {
    if (el.closest('svg') || !el.childNodes.length) continue;
    const t = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim().length > 1).map((n) => n.textContent.trim()).join(' ');
    if (!t) continue; const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
    const r = el.getBoundingClientRect(); if (!r.width) continue;
    const fs = parseFloat(cs.fontSize); if (fs >= 24) continue;
    const fg = parse(cs.color), bg = bgOf(el); if (!fg) continue;
    if (bg === 'grad') { gradText++; continue; }
    const L1 = lum(fg), L2 = lum(bg), cr = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    if (cr < 4.5) { lowN++; if (low.length < 6) low.push(t.slice(0, 28) + '|' + fs + 'px|' + cr.toFixed(1)); }
  }
  const noName = [...s.querySelectorAll('button,a,[role=button],[role=tab],[role=switch],input,select')].filter((b) => !(b.textContent.trim() || b.getAttribute('aria-label') || b.getAttribute('aria-labelledby') || b.title || (b.id && s.querySelector('label[for="' + b.id + '"]')) || b.closest('label'))).length;
  const badHref = [...s.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((h) => !(h.startsWith('/') && !h.startsWith('//'))).slice(0, 4);
  const svgNoRole = [...s.querySelectorAll('svg')].filter((v) => !v.parentElement.closest('svg') && !v.getAttribute('aria-hidden') && !v.getAttribute('role') && !v.closest('[aria-hidden=true]') && !v.closest('button,a')).length;
  const ids = {}; document.querySelectorAll('[id]').forEach((e) => (ids[e.id] = (ids[e.id] || 0) + 1));
  const dupIds = Object.entries(ids).filter(([, v]) => v > 1).map(([k, v]) => k + 'x' + v).slice(0, 10);
  return { ovf, wide: wide.slice(0, 5), lowN, low, gradText, noName, badHref, svgNoRole, h1: document.querySelectorAll('h1').length, exp: s.querySelectorAll('svg[data-export]').length, expMin: minExports, dupIds };
}

const browser = await chromium.launch();
const results = {};
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  let errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  for (const p of pages) {
    errors = [];
    try {
      await page.goto(`${base}/${p.id}/`, { waitUntil: 'networkidle', timeout: 60000 });
      const r = await page.evaluate(auditPage, { id: p.id, minExports: p.minExports || 0 });
      r.errors = errors.slice(0, 3);
      (results[p.id] ||= {})[width] = r;
    } catch (e) { (results[p.id] ||= {})[width] = { failed: String(e.message).slice(0, 200) }; }
  }
  await page.close();
}
await browser.close();
writeFileSync(join(dir, 'audit.json'), JSON.stringify(results, null, 2));

let clean = 0; const lines = [];
for (const p of pages) {
  const issues = new Set(), notes = new Set();
  for (const [w, r] of Object.entries(results[p.id] || {})) {
    if (r.failed) { issues.add(`${w}px did not load: ${r.failed}`); continue; }
    if (r.missing) { issues.add(`no <section id="p-${p.id}">`); continue; }
    if (r.ovf > 0) issues.add(`${w}px overflow ${r.ovf}px: ${r.wide.join(', ')}`);
    if (r.lowN) issues.add(`${w}px low contrast x${r.lowN}: ${r.low.join(' / ')}`);
    if (r.noName) issues.add(`unnamed controls x${r.noName}`);
    if (r.badHref.length) issues.add(`bad links: ${r.badHref.join(', ')}`);
    if (r.svgNoRole) issues.add(`svg without role or aria-hidden x${r.svgNoRole}`);
    if (r.h1 !== 1) issues.add(`${r.h1} <h1>`);
    if (r.exp < r.expMin) issues.add(`exportable SVGs ${r.exp} of ${r.expMin}`);
    if (r.dupIds.length) issues.add(`duplicate ids: ${r.dupIds.join(', ')}`);
    if (r.errors.length) issues.add(`console errors: ${r.errors.join(' | ')}`);
    if (r.gradText) notes.add(`${r.gradText} small texts on gradients (check by eye)`);
  }
  if (!issues.size) clean++;
  lines.push(`${issues.size ? 'FIX ' : 'ok  '} ${p.id.padEnd(18)} ${[...issues, ...notes].join('; ')}`);
}
console.log(lines.join('\n'));
console.log(`\n${clean} of ${pages.length} pages clean at 1440 and 390 px. Full results in audit.json`);
```

### `tools/export-svg.mjs`

```js
// Saves every <svg data-export="name"> as a standalone file in export/svg/<name>.svg.
// Built site:  npm run build, node tools/serve-out.mjs (keep it running), then node tools/export-svg.mjs
// Options:     --dry (count and check only)   --base=http://localhost:3000   page ids to do only some pages
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const base = (args.find((a) => a.startsWith('--base=')) || '--base=http://localhost:4173').slice(7).replace(/\/+$/, '');
const only = args.filter((a) => !a.startsWith('--'));
const pages = JSON.parse(readFileSync(join(dir, 'pages.json'), 'utf8')).filter((p) => !only.length || only.includes(p.id));

async function exportPage({ id, minExports }) {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const NS = 'http://www.w3.org/2000/svg';
  const PAINT = ['color', 'fill', 'fill-opacity', 'fill-rule', 'clip-rule', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-dasharray', 'stroke-dashoffset', 'opacity', 'mix-blend-mode', 'paint-order', 'vector-effect', 'stop-color', 'stop-opacity', 'flood-color', 'flood-opacity', 'clip-path', 'mask', 'filter', 'display', 'visibility'];
  const TEXT = ['font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'word-spacing', 'text-anchor', 'dominant-baseline', 'text-decoration-line', 'text-transform'];
  const SKIP = { 'fill-opacity': '1', 'stroke-opacity': '1', 'stop-opacity': '1', 'flood-opacity': '1', opacity: '1', 'fill-rule': 'nonzero', 'clip-rule': 'nonzero', 'stroke-dasharray': 'none', 'stroke-dashoffset': '0px', 'stroke-miterlimit': '4', 'mix-blend-mode': 'normal', 'paint-order': 'normal', 'vector-effect': 'none', 'clip-path': 'none', mask: 'none', filter: 'none', display: 'inline', visibility: 'visible', 'letter-spacing': 'normal', 'word-spacing': '0px', 'font-style': 'normal', 'text-decoration-line': 'none', 'text-transform': 'none', 'dominant-baseline': 'auto', 'text-anchor': 'start', 'stroke-linecap': 'butt', 'stroke-linejoin': 'miter' };
  const isText = (el) => /^(text|tspan|textPath)$/.test(el.localName);
  // next/font gives fonts hashed names such as __Inter_1a2b3c: write the real family names instead.
  const cleanFont = (v) => [...new Set(v.split(',').map((f) => f.trim().replace(/^['"]|['"]$/g, ''))
    .filter((f) => f && !/fallback/i.test(f))
    .map((f) => (f.startsWith('__') ? f.slice(2).replace(/_[0-9a-f]{5,}$/i, '').replace(/_/g, ' ') : f)))]
    .map((f) => (/[\s\d]/.test(f) ? "'" + f + "'" : f)).join(', ');
  // Write the computed paint of every live element onto its clone, so the file needs no stylesheet.
  const inline = (live, copy) => {
    const A = [live, ...live.querySelectorAll('*')], B = [copy, ...copy.querySelectorAll('*')];
    A.forEach((el, i) => {
      if (/^(title|desc|metadata|style|script)$/.test(el.localName)) return;
      const cs = getComputedStyle(el); let st = '';
      for (const k of isText(el) ? PAINT.concat(TEXT) : PAINT) {
        let v = cs.getPropertyValue(k).trim();
        if (!v || SKIP[k] === v) continue;
        if (k === 'display' && v !== 'none') continue;
        if ((k === 'stop-color' || k === 'stop-opacity') && el.localName !== 'stop') continue;
        if ((k === 'flood-color' || k === 'flood-opacity') && !/^fe/.test(el.localName)) continue;
        if (k === 'font-family') v = cleanFont(v);
        st += k + ':' + v.replace(/url\("([^"]+)"\)/g, 'url($1)').replace(/"/g, "'") + ';';
      }
      if (st) B[i].setAttribute('style', st); else B[i].removeAttribute('style');
      B[i].removeAttribute('class');
      for (const at of [...B[i].attributes]) if (/^data-(?!export)/.test(at.name)) B[i].removeAttribute(at.name);
    });
  };
  const refs = (root) => {
    const found = new Set();
    for (const el of [root, ...root.querySelectorAll('*')]) for (const at of el.attributes) {
      if ((at.name === 'href' || at.name === 'xlink:href') && at.value[0] === '#') found.add(at.value.slice(1));
      for (const m of at.value.matchAll(/url\(["']?#([^"')]+)["']?\)/g)) found.add(m[1]);
    }
    return found;
  };

  document.documentElement.classList.add('exporting');
  const s = document.querySelector('#p-' + id);
  if (!s) return { files: [], warnings: [id + ': page missing'] };
  for (let y = 0; y < s.scrollHeight; y += 700) { scrollTo(0, y); await wait(60); }
  scrollTo(0, 0); await wait(400);
  const files = [], warn = [], seen = new Set();
  const list = [...s.querySelectorAll('svg[data-export]')];
  if (minExports && list.length < minExports) warn.push(id + ': ' + list.length + ' exportable SVGs, minimum is ' + minExports);
  for (const svg of list) {
    const name = svg.getAttribute('data-export');
    if (!/^[a-z0-9][a-z0-9-]{0,100}$/.test(name) || !name.startsWith(id + '-')) { warn.push('bad name: ' + name); continue; }
    if (seen.has(name)) { warn.push('duplicate name: ' + name); continue; } seen.add(name);
    const vb = svg.viewBox && svg.viewBox.baseVal;
    if (!vb || !vb.width || !vb.height) { warn.push(name + ': no viewBox'); continue; }
    if (svg.querySelector('foreignObject')) warn.push(name + ': contains foreignObject');
    if (!svg.querySelector(':scope > title')) warn.push(name + ': no <title>');
    const copy = svg.cloneNode(true); inline(svg, copy);
    // Pull in symbols, gradients, clips, masks and filters that live elsewhere in the document.
    let defs = copy.querySelector(':scope > defs');
    if (!defs) { defs = document.createElementNS(NS, 'defs'); copy.insertBefore(defs, copy.firstChild); }
    for (let pass = 0; pass < 6; pass++) {
      let added = 0;
      for (const rid of refs(copy)) {
        if (copy.querySelector('#' + CSS.escape(rid))) continue;
        const src = document.getElementById(rid);
        if (!src) { warn.push(name + ': missing #' + rid); continue; }
        const c = src.cloneNode(true);
        if (src.localName !== 'symbol') inline(src, c); // symbols keep currentColor so they take the colour of each use
        defs.appendChild(c); added++;
      }
      if (!added) break;
    }
    if (!defs.childNodes.length) defs.remove();
    copy.setAttribute('xmlns', NS); copy.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    copy.setAttribute('width', vb.width); copy.setAttribute('height', vb.height);
    const text = '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(copy);
    if (/var\(--/.test(text)) warn.push(name + ': unresolved CSS variable');
    if (/<image\b/.test(text)) warn.push(name + ': contains <image>');
    files.push({ name, text });
  }
  return { files, warnings: warn };
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const all = new Map(), warnings = [], counts = {};
for (const p of pages) {
  try {
    await page.goto(`${base}/${p.id}/?export=1`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(500);
    const r = await page.evaluate(exportPage, { id: p.id, minExports: p.minExports || 0 });
    counts[p.id] = r.files.length; warnings.push(...r.warnings);
    for (const f of r.files) { if (all.has(f.name)) warnings.push('name used on two pages: ' + f.name); else all.set(f.name, f.text); }
  } catch (e) { warnings.push(p.id + ': did not load (' + String(e.message).slice(0, 160) + ')'); }
}
await browser.close();
if (!dry) {
  const target = join(dir, 'export', 'svg');
  if (!only.length) rmSync(target, { recursive: true, force: true }); // full run: start clean so renamed files do not linger
  mkdirSync(target, { recursive: true });
  for (const [n, t] of all) writeFileSync(join(target, n + '.svg'), t, 'utf8');
}
console.log(Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join('\n'));
console.log(`\n${all.size} SVGs ${dry ? 'checked (dry run)' : 'written to export/svg/'}`);
if (warnings.length) { console.log(`\n${warnings.length} warnings:\n` + warnings.join('\n')); process.exitCode = 1; }
```

## 17. Spend tokens where they show

- The lead reads the reference images once and puts the facts in `SOURCE.md` and `BRIEF.md`. Agents never re-derive
  them and never read the whole case study.
- Each agent opens only the reference images for its own pages. Nobody reads `out/`, `.next/` or `node_modules/`
  (except the Next.js docs that `AGENTS.md` points to); read source files instead.
- Shared artwork, materials and object parts are written once in `components/art` and reused; builders generate
  colourways and repeated objects with loops.
- Sonnet builds, Opus reviews, the lead decides. No agent runs on a larger model than its job needs.
- Agents hand back short reports. The lead does not paste agent reports back in full.
- Two build waves, one relaunch for short pages, one review-and-fix round, one final check. No open-ended loops.