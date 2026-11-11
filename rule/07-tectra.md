# Tectra brand site: master prompt

Paste this whole file as the first message of a new Claude Code session opened in an empty folder.
One project per session. Nothing needs filling in.

```
BEHANCE_URL = https://www.behance.net/gallery/225852373/Tectra-Construction-SaaS-UX
REPO_NAME   = tectra-brand-site
```

---

## 0. Start here: set this PC up with me

The person pasting this may not be technical. Before any design work, check the PC and help them, one small
step at a time, in plain words.

1. Check the tools: `node -v` (need 18 or newer), `git --version`, and that you have a browser tool that can open
   web pages and run JavaScript in them (the app's built-in browser, or Claude in Chrome).
2. If something is missing, give them **one** command to run themselves and wait until they say it is done:
   - Windows: `winget install OpenJS.NodeJS.LTS` and `winget install Git.Git`
   - Mac: `brew install node git` (if Homebrew is missing, send them to nodejs.org and git-scm.com instead)
   Then ask them to restart the session so the new tools are found, and check again.
3. The session's working folder becomes the repo. If it is not named `REPO_NAME`, create a folder `REPO_NAME`
   inside it and work there. Run `git init` if it is not a repo yet. If `STATE.md` already exists in it, this is a
   resume: read it and continue from the first unticked step.
4. Tell them in three lines what will happen: about how long (hours, not minutes), that they can leave it running,
   and that typing "continue" restarts it if it stops.

Do **not** set up GitHub or Vercel yet. That comes at the end (section 12), when there is something to publish.

## 1. What I want

BEHANCE_URL is a brand / product case study by a designer who is our prospect. We are pitching them two things:
a way to present their work to their own clients as a live website instead of a Behance scroll, and **us as their
partner for motion design, graphic design, UI design and brand thinking**.

Build that website from their case study: 30 pages, from logo to colour to motion to product to landing pages to
the physical brand, with animation, micro-interactions and working interactive modules, as one HTML file that
opens in a browser, plus every graphic and mockup as a standalone SVG.

The designer is the audience. They must recognise their own work on every page, and see on the same pages what a
partner adds. **Reproduce what they made; do not redesign it. Then extend it, generously, in their language.**
The extensions are the pitch: go all out on them.

Quality is judged on these, in this order:
1. Every page and every deliverable in section 7 exists, at or above its minimum count.
2. Consistency: all 30 pages look like one system made by the same designer.
3. Brand thinking: extensions feel like the designer's next step, not like a template.
4. Motion and UI craft: outstanding, deliberate, in the brand's own personality.
5. Everything is drawn in code and every graphic exports as a standalone SVG (rule 10).
6. Minor accessibility fixes, without restyling.

Work in English. After setup, run from start to finish without stopping for approval. Stop and ask only for the
blockers in section 13 and at the publish step in section 12.

## 2. Derive these from the link (do not ask)

| Value | Where it comes from |
|---|---|
| `BRAND` | The brand name in the project title and artwork |
| `DESIGNER` | The project owner(s) on the Behance page, spelled exactly as shown |
| `HERO_FEATURE` | The one thing the case study makes most of (an assistant, a booking flow, a card, a map) |
| `PRODUCT_OBJECT` | The physical thing this brand would really make or hand over (section 7, page 30) |
| `CLEAN_URL` | BEHANCE_URL with any query string removed |

## 2b. Layout direction for this project

We build many of these sites, and they must not look like each other. No layout may repeat inside this site
either. This project has been given its own direction; no other project of ours uses this combination:

- **Mockup staging:** exploded view: each object pulled apart into its layers along one axis.
- **Mockup backdrop:** pure white with coloured contact shadows.
- **Brand pages lean on:** an editorial column with margin notes and pull-out figures (still a different grid on every page).
- **Dashboard option A is:** an icon rail with a bento of widgets; options B to E are four other structures.
- **Landing pages lean on:** data-led sections built around live widgets (still seven different structures).

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

## 3. Repo layout

```
REPO_NAME/
  README.md               what this is, how to preview, how to export, the live link once published
  STATE.md                checklist of the steps in section 4, ticked as they finish, plus decisions made
  SOURCE.md               everything learned from the case study (section 5)
  LAYOUTS.md              one line per page and per mockup: its grid, composition and camera (section 2b)
  BRIEF.md                the builders' brief (section 7)
  REPORT.md               the final report (section 11)
  pages.json              the 30 pages in order: [{ "id", "title", "group", "minExports" }]
  vercel.json             { "framework": null, "buildCommand": "node tools/build.mjs", "outputDirectory": "dist" }
  .gitignore              node_modules/, reference/, .vercel/, *.log
  .claude/launch.json     preview server entry (section 10)
  tools/                  extract.js, build.mjs, serve.mjs, audit.js, export.js (section 14, copy exactly)
  reference/              the case study images: local only, never committed, never used in the site
  src/
    base.css              tokens, type, surfaces, components, device frames, mockup kit, motion utilities
    base.js               router, presenter dock, index, helpers, shared artwork
    shell.html            document shell, SVG sprite, placeholders
    pages/<id>.html       one fragment per page
  dist/index.html         THE SITE: one self-contained file (committed, so it can be sent or deployed)
  export/svg/<name>.svg   every graphic and mockup as a standalone SVG (committed)
```

Write only inside the repo. Commit locally at each milestone with the message `<milestone>: <one line>`.

## 4. Steps (tick each in STATE.md as it finishes)

1. Set up the PC and the repo (section 0). Write the five tool files.
2. Extract the case study (section 5).
3. Study it and write `SOURCE.md` (section 5).
4. Write `LAYOUTS.md` (section 2b), the shared system, `pages.json` and `BRIEF.md` (sections 6 and 7).
5. Run the build team in two waves (section 8). Do not go on until the build reports 30 of 30 pages `ok`.
6. Run the review team (section 9) and apply shared fixes.
7. Verify the built file yourself in the browser and run the SVG export (section 10).
8. Write `REPORT.md` and `README.md`, commit, and report (section 11).
9. Offer to publish to GitHub and Vercel (section 12).

## 5. Extract and study (the lead does this itself, no agents)

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

## 6. Rules that cannot be broken

1. **Do not redesign.** Where the case study shows something, reproduce it exactly: copy verbatim, including every
   figure, plus colours, layout, proportions and component shapes. Measure positions, sizes and angles from the
   reference; do not estimate them.
2. **Extend generously, only in the designer's language.** The case study will not show most of section 7. Create
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
4. **The deliverable list is a checklist, not a design.** Section 7 says what must exist and how many. It says
   nothing about how anything should look, be laid out, be named or be explained. All of that comes from this
   brand's own case study. Do not borrow concepts, compositions, headings or copy from any other brand system you
   know of, and do not reuse one brand's solutions for another.
5. **All assets are code.** Inline SVG and CSS only. The logo is traced as SVG paths; gradients are SVG/CSS
   gradients; charts, icons, illustrations, device frames, products and mockups are drawn in code. No `<img>`, no
   raster, no base64 images, no AI-generated images, no external libraries, no external URLs. Photos in the source
   (people, hands, rooms) are replaced by brand gradients or code-drawn objects, never by drawn people.
   One exception: if the brand font is commercial, `shell.html` may load the closest free match from Google Fonts,
   with the brand font first in the stack and a system fallback last. Say which font was used and why.
6. **One file.** `dist/index.html` holds all 30 pages, styles, scripts and artwork. It must work when
   double-clicked (`file://`) with no server: no `fetch`, no modules, no absolute paths. Hash routing (`#/<id>`), a
   presenter dock to step through pages (previous, next, page number and title, Index; Shift+Left / Shift+Right
   also step), an index overlay listing every page by group, and `<meta name="robots" content="noindex">`.
7. **One system.** Tokens, type classes, buttons, cards, nav, footer, logo, device frames, the mockup kit and
   helpers live in the base files and are used by every page. Pages never redefine them.
8. **Motion is a headline feature.** Every page has a designed entrance, scroll reveals and at least one signature
   animated moment (a logo drawing on, a chart growing, a device assembling, a product turning to the light).
   Every interactive element has hover, focus-visible and active states. Page changes have a transition. Use the
   brand's motion personality and the shared easing and duration tokens; never default easings. Animate only
   `transform` and `opacity` where possible. Animations always land on their final value, including when
   interrupted or when the page is left and re-entered. `prefers-reduced-motion` is honoured.
9. **Minor accessibility fixes only.** Small text (under 24 px) reaches 4.5:1; large display type keeps the
   original colours. Real `<button>` and `<a>`; visible focus states; keyboard support for every interactive
   module (tabs use `role="tablist/tab/tabpanel"` and arrow keys; toggles use `aria-pressed` or `role="switch"`);
   meaningful SVG gets `role="img"` and `aria-label`, decorative SVG gets `aria-hidden="true"`; screen-reader
   labels use real names, never internal token names; no horizontal page scroll from 1920 px down to 390 px.
   Record every accessibility change that altered the look.
10. **Everything graphic exports as SVG.** Every logo variant, swatch sheet, gradient, texture, icon, illustration,
    chart, social post, poster, device frame, product and mockup is its own inline `<svg>` that `tools/export.js`
    can save as a standalone file:
    - It has a `viewBox`, a `<title>`, and `data-export="<page id>-<name>"` (lower-case letters, digits and
      hyphens; unique across the site).
    - Geometry lives in attributes (`d`, `x`, `width`, `transform`, ...), not in CSS. Paint may come from CSS
      classes and tokens; the exporter writes the computed values into the file.
    - The un-animated state is the finished artwork. Animations play *from* a start state towards the base style
      (`animation-fill-mode: backwards` or `both`), so that with `html.exporting` set (all animation and
      transition off, all reveals shown) the SVG is complete and correct.
    - No `<foreignObject>`, no HTML inside the SVG, no CSS `background` or pseudo-element standing in for artwork.
      Gradients, clips, masks, filters and textures are SVG `<defs>`.
    - Text inside artwork is SVG `<text>` with the brand font stack (it is outlined later, in a design tool).
    - A mockup is one SVG: object, materials, shading, shadow and the brand artwork on it, in one `viewBox`.
    Interactive UI (dashboards, mobile screens, landing pages) is built in HTML and CSS so that it works, is
    responsive and is accessible. Inside it, every icon, chart, illustration and device frame still follows this
    rule, and each full screen has a fixed-size artboard root marked `data-screen="<name>"` so it can be converted
    to SVG as a later step.
11. English only in every file. Brand copy stays exactly as the designer wrote it.

## 7. The 30 pages and their minimum deliverables

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

**Mockup kit.** All mockup pages share one light direction, one shadow style and one backdrop family (section
2b), defined once in the base files; the arrangement of objects is different on every page. The kit also holds
material definitions (fabric, paper, card, metal, glass,
ceramic, rubber) as SVG gradients, patterns and filters. Brand artwork (lockups, key art, patterns, slogans that
exist in the case study) is defined once as functions in `base.js` and placed on objects, so the same artwork is
identical everywhere. Text on mockups is only the logo, the brand name, or lines that appear in the case study.

**The lead writes the shared system before any agent starts:**
- `src/base.css`: colour tokens, type classes, surfaces and gradients, buttons, chips, cards, grids, device frames
  (phone, tablet, laptop, monitor, watch), landing nav and footer, the mockup kit, motion tokens and utilities,
  focus styles, the reduced-motion block, dock and index styles, and
  `html.exporting *{animation:none!important;transition:none!important}` with all reveals forced visible.
- `src/base.js`: one global namespace `Site` with: `Site.page(id, initFn)` (runs once, on first view, scoped to that
  page's root), the hash router, the presenter dock, the index overlay, scroll reveal (`data-reveal`,
  `data-delay`), count-up (`data-count`), typewriter (`data-type`), the brand's chart helpers, `Site.icon()`,
  `Site.mark()`, `Site.art.*` (shared artwork), `Site.mock.*` (shared object parts: shadow, backdrop, materials),
  `Site.copy()`, `Site.toast()`, `Site.fmt()`, `Site.uid()`, `Site.scan(root)`, `Site.reduce`.
  The page list is the global `SITE_PAGES`, injected by the build from `pages.json`.
- `src/shell.html`: the document shell with the placeholders `/*__BASE_CSS__*/`, `/*__BASE_JS__*/`,
  `<!--__PAGES__-->`, `<!--__PAGE_SCRIPTS__-->`; the SVG sprite (logo symbol and the 32 icons); a skip link; the
  dock; the index; a toast region; an inline SVG favicon.
- Router: an unknown or empty hash goes to `overview`; a valid hash is never overridden; changing page scrolls to
  top, updates the document title and moves focus to the page's `<h1>`.
- `BRIEF.md`: rules 1 to 11, the fragment format below, the helper and class list with one-line usage each, the
  brand facts and brand idea from `SOURCE.md`, the image index, the page ids, and the hand-back format.

**Page fragment format** (`src/pages/<id>.html`):

```html
<section class="page" id="p-<id>" aria-label="<Page title>">
  <style>/* every selector starts with #p-<id>; keyframes are named <id>-xxx */</style>
  ...markup...
</section>
<script>
Site.page('<id>', function (root) { /* query only inside root */ });
</script>
```

- No `<html>`, `<head>` or `<body>`. No global CSS. Every id, including SVG gradient, filter and clip-path ids,
  starts with `<id>-` and is unique within the page.
- Exactly one `<h1>` per page, then ordered `h2` / `h3`.
- Links to other pages are `href="#/<id>"`. Never use plain `#anchor` links; scroll with JS instead.
- 600 to 1,600 lines per page. Repetitive SVG (bars, dots, rows, grids, colourways, repeated objects) is generated
  with JS loops and small functions, never hand-typed.
- Builders do not edit base files or `shell.html`. Anything missing is built page-scoped and reported.

## 8. Build team

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

Each builder's brief is short and self-contained: read `BRIEF.md`, `base.css` and `base.js` first; your pages are
X; the minimum deliverables for them (paste the row from section 7); open only these reference images (list
them); the exact copy and figures for your pages (paste them, do not make the builder rediscover them); write
each page to disk as soon as it is complete, before starting the next; run `node tools/build.mjs` and confirm
your pages say `ok`; reply in under 150 words with files written, a count of each deliverable against its
minimum, faithful parts, extensions, any wording or value that is your own, and anything not checked.

After each wave, run the build. **For every page reported `MISSING` or `WARN`, or handed back under its minimum
counts, launch one more builder for exactly that page.** Do this once more if needed, then finish any page still
short yourself. Do not start the review until the build prints 30 of 30 `ok`. If a session ends while agents are
running, their pages may be partial: on resume, trust only the build output, not earlier reports.

If subagents are not available in this session, build the pages yourself in the order of the table.

## 9. Review team

Launch 8 reviewers in parallel on **Opus**. Each one reviews *and fixes* its own pages, in the browser, against
the reference images and the minimums in section 7. No two reviewers touch the same file. Reviewers do not edit
base files; they send recommended shared changes to the lead, who applies them once.

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
  `foreignObject`; the un-animated state is complete. Run `await __exportSVG(['<page>'], true)`: zero warnings.
- **Duplicate ids.** SVG gradient and clip ids that collide between pages or within a page.
- **Overflow.** No horizontal page scroll at 390 px (side-entering reveals and fixed-width grids are the usual
  causes; grid columns need `minmax(0, 1fr)`).
- **Contrast.** Small text under 4.5:1, including chips, tags and white text on light gradients.
- **Private colours.** Buttons and accents that use a page's own hex instead of the shared token.
- **Function and motion.** Click every link, tab, toggle, filter, sort, stepper and demo. Interrupt animations
  mid-way. Leave the page and come back: no stale state, counters land on their final value. Motion uses the
  shared tokens and feels like one hand.

Each reviewer rebuilds, runs `audit.js` for its pages, and hands back in under 200 words: what was fixed, what was
tested by clicking, what was checked only by reading, values left as placeholders because the reference is
illegible, and shared changes it recommends.

## 10. Verify, then export

Preview through the local server, not by opening the file in the app's browser pane: that pane can show a
`file://` page as a static snapshot in which hash routing does not run. Put this in `.claude/launch.json` and start
it with the app's preview launcher, or run `node tools/serve.mjs` in the background:

```json
{ "version": "0.0.1", "configurations": [
  { "name": "brand-site", "runtimeExecutable": "node", "runtimeArgs": ["tools/serve.mjs", "4173"], "port": 4173 }
] }
```

Then, yourself:
1. `node tools/build.mjs --strict` exits 0 with 30 of 30 `ok`.
2. Load `http://localhost:4173/`. Load the helpers with
   `await new Promise((r) => { const s = document.createElement('script'); s.src = '/__audit.js'; s.onload = r; document.head.append(s); })`
   (and the same for `/__export.js`).
3. Run `await __audit()` at 1440 px and at 390 px. Target on every page: `ovf` 0, `lowN` 0, `noName` 0, `badHref`
   empty, `svgNoRole` 0, `h1` 1, `exp` at or above `expMin`, and `_dupIds` empty. `gradText` counts small text on
   gradients, which the script cannot measure: check those by eye.
4. Visit all 30 pages with the tab in front (animations do not run in a background tab). Check the console for
   errors. Use the dock, the keyboard shortcuts and the index. Exercise at least one interactive module per page.
5. Compare `lp-home`, `logo` and the rebuilt product screens side by side with their reference images.
6. Run `await __exportSVG()`. It writes every graphic to `export/svg/` and returns the count and warnings. Fix
   every warning and run it again. Open five exported files of different kinds (a logo, a chart, a mockup, a
   social post, the product) directly in the browser and confirm each looks the same as on the page.
7. Close any browser tabs you or the agents opened.

One retry per failure, then stop and report the exact error. Never report a page as working unless you saw it
working. Say plainly what was checked only by reading.

## 11. Final report

Write `REPORT.md` and give the same content in chat, short and in plain words:
- Where the site is (`dist/index.html`), its size, and the page list.
- A table of every row in section 7: minimum, delivered.
- How many SVGs are in `export/svg/`, and any that exported with warnings.
- Which pages and sections are faithful rebuilds, and the list of what we added as partners.
- Any wording or value that did not come from the case study, and illegible values left as placeholders.
- Accessibility changes that altered the look, and contrast problems left in place to preserve the design.
- The font used and why; anything in the source that could not be reproduced in code.
- What was verified in the browser and what was not.
- Which agents ran, on which model, and any that had to be relaunched.

Also write `README.md` for whoever opens the repo next: what it is, `node tools/build.mjs`,
`node tools/serve.mjs`, how to export SVGs, and the live link once there is one.

## 12. Publish (ask first, then help)

When the report is done, ask: "Do you want this on GitHub and Vercel now?" Publishing puts the designer's work at
a web address, so do nothing until they say yes. Then guide them one step at a time and wait at each sign-in.
**They sign in themselves in the browser; never type or ask for a password, token or code.**

1. **GitHub.** Check `gh --version`; if missing, give the one install command (`winget install GitHub.cli` or
   `brew install gh`). Ask them to run `gh auth login` and follow the browser steps. Then create the repo as
   **private** and push: `gh repo create REPO_NAME --private --source . --push`.
   If they prefer the website: they create an empty private repo named `REPO_NAME` on github.com and paste its
   address; you add it as `origin` and push.
2. **Vercel.** Ask them to run `npx vercel login` and follow the browser steps. Then deploy from the repo folder:
   `npx vercel --yes` for a preview, check it loads, then `npx vercel --prod --yes`. `vercel.json` already tells
   Vercel to serve `dist/`. If the command asks questions, read them out and recommend the default.
   If they prefer the website: on vercel.com, Add New, Project, import the GitHub repo, leave every setting as it
   is, Deploy.
3. Open the live address, click through five pages, and confirm it works. Add the address to `README.md` and
   `REPORT.md`, commit and push.
4. Tell them: the link is not listed in search engines but anyone who has it can open it, so share it only with
   the designer; they can delete the Vercel project at any time to take it down.

If a publish step fails twice, stop, show the exact error, and leave the site working locally.

## 13. Ask only if

- BEHANCE_URL does not open, needs a sign-in, or shows a content warning gate.
- Fewer than 5 project images can be extracted after adapting the script once.
- The page is not a brand or product case study (for example a photo series or a single illustration).
- A tool is missing and the person needs to install it (section 0).

Anything else is yours to decide. Decide, note it in `STATE.md`, and keep going.

## 14. Tool files (write these into `tools/` exactly as given)

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

### `tools/build.mjs`

```js
// Bundles src/ into one self-contained file: dist/index.html.   node tools/build.mjs [--strict]
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const strict = process.argv.includes('--strict');
const dir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = (f) => readFileSync(join(dir, 'src', f), 'utf8');
const list = JSON.parse(readFileSync(join(dir, 'pages.json'), 'utf8')); // [{ id, title, group, minExports }]
const pagesDir = join(dir, 'src', 'pages');
const files = existsSync(pagesDir) ? readdirSync(pagesDir) : [];
const FONT_HOSTS = /https?:\/\/fonts\.(googleapis|gstatic)\.com/gi;

let pages = '', scripts = '', bad = 0, okCount = 0;
const exportNames = new Map();
const report = [];
for (const { id } of list) {
  const f = `${id}.html`;
  if (!files.includes(f)) { report.push(`MISSING  ${id}`); bad++; continue; }
  const raw = src('pages/' + f);
  // Each page script is wrapped so top-level names never collide between pages.
  const html = raw.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (_, js) => { scripts += `<script>\n/* page: ${id} */\n(function(){\n${js}\n})();\n</script>\n`; return ''; });
  const problems = [];
  if (!new RegExp(`<section[^>]*id="p-${id}"`).test(html)) problems.push(`no <section id="p-${id}">`);
  if (/<img\b/i.test(raw)) problems.push('contains <img> (assets must be code)');
  if (/data:image\/(png|jpe?g|gif|webp)/i.test(raw)) problems.push('embedded raster image');
  if (/<foreignObject\b/i.test(raw)) problems.push('contains <foreignObject>');
  if (/https?:\/\//i.test(raw.replace(/xmlns(:\w+)?=(["'])[^"']*\2/g, ''))) problems.push('external URL');
  const h1 = (html.match(/<h1\b/gi) || []).length;
  if (h1 !== 1) problems.push(`${h1} <h1> (need exactly 1)`);
  const ids = {}; for (const m of html.matchAll(/\sid="([^"]+)"/g)) ids[m[1]] = (ids[m[1]] || 0) + 1;
  const dup = Object.keys(ids).filter((k) => ids[k] > 1);
  if (dup.length) problems.push('duplicate ids: ' + dup.slice(0, 5).join(', '));
  const loose = Object.keys(ids).filter((k) => k !== `p-${id}` && !k.startsWith(id + '-'));
  if (loose.length) problems.push(`ids without "${id}-" prefix: ` + loose.slice(0, 5).join(', '));
  if (!/data-export/.test(raw)) problems.push('no data-export artwork (rule 10)');
  for (const m of raw.matchAll(/data-export="([A-Za-z0-9_-]+)"/g)) {
    const n = m[1];
    if (!/^[a-z0-9][a-z0-9-]*$/.test(n) || !n.startsWith(id + '-')) problems.push('bad export name: ' + n);
    else if (exportNames.has(n)) problems.push('export name used twice: ' + n);
    else exportNames.set(n, id);
  }
  if (problems.length) bad++; else okCount++;
  report.push(`${problems.length ? 'WARN   ' : 'ok     '}  ${id.padEnd(18)} ${(raw.length / 1024).toFixed(0).padStart(4)} KB  ${problems.join('; ')}`);
  pages += `\n<!-- ===== ${id} ===== -->\n${html}\n`;
}

const shell = src('shell.html');
const out = shell
  .replace('/*__BASE_CSS__*/', () => src('base.css'))
  .replace('/*__BASE_JS__*/', () => `window.SITE_PAGES = ${JSON.stringify(list)};\n` + src('base.js'))
  .replace('<!--__PAGES__-->', () => pages)
  .replace('<!--__PAGE_SCRIPTS__-->', () => scripts);
for (const ph of ['/*__BASE_CSS__*/', '/*__BASE_JS__*/', '<!--__PAGES__-->', '<!--__PAGE_SCRIPTS__-->']) {
  if (!shell.includes(ph)) { report.push(`WARN     shell.html is missing the placeholder ${ph}`); bad++; }
}
const shellUrls = shell.replace(FONT_HOSTS, '').replace(/xmlns(:\w+)?=(["'])[^"']*\2/g, '').match(/https?:\/\/[^\s"')]+/gi) || [];
if (shellUrls.length) { report.push('WARN     shell.html external URL: ' + shellUrls.slice(0, 3).join(', ')); bad++; }

mkdirSync(join(dir, 'dist'), { recursive: true });
writeFileSync(join(dir, 'dist', 'index.html'), out);
console.log(report.join('\n'));
console.log(`\n${okCount} of ${list.length} pages ok   dist/index.html  ${(out.length / 1024).toFixed(0)} KB`);
if (strict && bad) process.exit(1);
```

### `tools/serve.mjs`

```js
// Local preview.   node tools/serve.mjs [port]   ->  http://localhost:4173
// Serves the repo, opens dist/index.html at "/", and receives exported SVGs from tools/export.js
// (written to export/svg/). Listens on this computer only.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve, join, normalize, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const tools = dirname(fileURLToPath(import.meta.url));
const root = resolve(tools, '..');
const port = Number(process.argv[2]) || 4173;
const types = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const helpers = { '/__audit.js': 'audit.js', '/__export.js': 'export.js' };

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  let p = decodeURIComponent(url.pathname);
  try {
    if (req.method === 'POST' && p === '/__export') {
      const name = url.searchParams.get('name') || '';
      if (!/^[a-z0-9][a-z0-9-]{0,100}$/.test(name)) { res.writeHead(400).end('bad name'); return; }
      const chunks = []; for await (const c of req) chunks.push(c);
      await mkdir(join(root, 'export', 'svg'), { recursive: true });
      await writeFile(join(root, 'export', 'svg', name + '.svg'), Buffer.concat(chunks));
      res.writeHead(200).end('ok'); return;
    }
    if (p === '/') p = '/dist/index.html';
    const file = helpers[p] ? join(tools, helpers[p]) : normalize(join(root, p));
    if (!helpers[p] && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' }).end(body);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Preview on http://localhost:${port}`));
```

### `tools/audit.js`

In the preview: `await __audit()` or `await __audit(['dashboard', 'mobile-a'])`.

```js
// QA helper, not part of the deliverable. Visits each page and measures overflow, contrast, names and ids.
window.__audit = async function (only) {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const lum = (c) => { const a = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]; };
  const parse = (s) => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[, /]+/).map(Number); return [p[0], p[1], p[2], p[3] === undefined || isNaN(p[3]) ? 1 : p[3]]; };
  const bgOf = (el) => { let e = el; while (e && e !== document.documentElement) { const cs = getComputedStyle(e); if (cs.backgroundImage && cs.backgroundImage !== 'none') return 'grad'; const c = parse(cs.backgroundColor); if (c && c[3] > 0.9) return c; e = e.parentElement; } return [255, 255, 255, 1]; };
  const res = {};
  for (const p of window.SITE_PAGES) {
    if (only && !only.includes(p.id)) continue;
    location.hash = '#/' + p.id; await wait(500);
    const s = document.querySelector('#p-' + p.id); if (!s) { res[p.id] = 'MISSING'; continue; }
    for (let y = 0; y < s.scrollHeight; y += 700) { scrollTo(0, y); await wait(40); } scrollTo(0, 0);
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
    const badHref = [...s.querySelectorAll('a[href]')].filter((a) => !/^#\//.test(a.getAttribute('href'))).map((a) => a.getAttribute('href')).slice(0, 4);
    const svgNoRole = [...s.querySelectorAll('svg')].filter((v) => !v.parentElement.closest('svg') && !v.getAttribute('aria-hidden') && !v.getAttribute('role') && !v.closest('[aria-hidden=true]') && !v.closest('button,a')).length;
    res[p.id] = { h: s.scrollHeight, ovf, wide: wide.slice(0, 5), lowN, low, gradText, noName, badHref, svgNoRole, h1: s.querySelectorAll('h1').length, exp: s.querySelectorAll('svg[data-export]').length, expMin: p.minExports || 0 };
  }
  const ids = {}; document.querySelectorAll('[id]').forEach((e) => (ids[e.id] = (ids[e.id] || 0) + 1));
  res._dupIds = Object.entries(ids).filter(([, v]) => v > 1).map(([k, v]) => k + '×' + v).slice(0, 20);
  res._vw = innerWidth; return res;
};
```

### `tools/export.js`

In the preview: `await __exportSVG()` writes every graphic to `export/svg/`; `await __exportSVG(['logo'])` does
some pages; `await __exportSVG(null, true)` only counts and checks.

```js
// Saves every <svg data-export="name"> as a standalone file in brands/<slug>/export/svg/name.svg.
// In the preview:  await __exportSVG()            all pages, write files
//                  await __exportSVG(['logo'])    some pages
//                  await __exportSVG(null, true)  dry run: count and check only
window.__exportSVG = async function (only, dry) {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const NS = 'http://www.w3.org/2000/svg';
  const PAINT = ['color', 'fill', 'fill-opacity', 'fill-rule', 'clip-rule', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-dasharray', 'stroke-dashoffset', 'opacity', 'mix-blend-mode', 'paint-order', 'vector-effect', 'stop-color', 'stop-opacity', 'flood-color', 'flood-opacity', 'clip-path', 'mask', 'filter', 'display', 'visibility'];
  const TEXT = ['font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'word-spacing', 'text-anchor', 'dominant-baseline', 'text-decoration-line', 'text-transform'];
  const SKIP = { 'fill-opacity': '1', 'stroke-opacity': '1', 'stop-opacity': '1', 'flood-opacity': '1', opacity: '1', 'fill-rule': 'nonzero', 'clip-rule': 'nonzero', 'stroke-dasharray': 'none', 'stroke-dashoffset': '0px', 'stroke-miterlimit': '4', 'mix-blend-mode': 'normal', 'paint-order': 'normal', 'vector-effect': 'none', 'clip-path': 'none', mask: 'none', filter: 'none', display: 'inline', visibility: 'visible', 'letter-spacing': 'normal', 'word-spacing': '0px', 'font-style': 'normal', 'text-decoration-line': 'none', 'text-transform': 'none', 'dominant-baseline': 'auto', 'text-anchor': 'start', 'stroke-linecap': 'butt', 'stroke-linejoin': 'miter' };
  const isText = (el) => /^(text|tspan|textPath)$/.test(el.localName);
  // Write the computed paint of every live element onto its clone, so the file needs no stylesheet.
  const inline = (live, copy) => {
    const A = [live, ...live.querySelectorAll('*')], B = [copy, ...copy.querySelectorAll('*')];
    A.forEach((el, i) => {
      if (/^(title|desc|metadata|style|script)$/.test(el.localName)) return;
      const cs = getComputedStyle(el); let st = '';
      for (const k of isText(el) ? PAINT.concat(TEXT) : PAINT) {
        const v = cs.getPropertyValue(k).trim();
        if (!v || SKIP[k] === v) continue;
        if (k === 'display' && v !== 'none') continue;
        if ((k === 'stop-color' || k === 'stop-opacity') && el.localName !== 'stop') continue;
        if ((k === 'flood-color' || k === 'flood-opacity') && !/^fe/.test(el.localName)) continue;
        st += k + ':' + v.replace(/url\("([^"]+)"\)/g, 'url($1)').replace(/"/g, "'") + ';';
      }
      if (st) B[i].setAttribute('style', st); else B[i].removeAttribute('style');
      B[i].removeAttribute('class');
      for (const at of [...B[i].attributes]) if (/^data-(?!export)/.test(at.name)) B[i].removeAttribute(at.name);
    });
  };
  const refs = (root) => {
    const ids = new Set();
    for (const el of [root, ...root.querySelectorAll('*')]) for (const at of el.attributes) {
      if ((at.name === 'href' || at.name === 'xlink:href') && at.value[0] === '#') ids.add(at.value.slice(1));
      for (const m of at.value.matchAll(/url\(["']?#([^"')]+)["']?\)/g)) ids.add(m[1]);
    }
    return ids;
  };

  const html = document.documentElement; html.classList.add('exporting');
  const pages = {}, warn = new Set(), seen = new Set(); let written = 0;
  try {
    for (const p of window.SITE_PAGES) {
      if (only && !only.includes(p.id)) continue;
      location.hash = '#/' + p.id; await wait(600);
      const s = document.querySelector('#p-' + p.id); if (!s) { warn.add(p.id + ': page missing'); continue; }
      for (let y = 0; y < s.scrollHeight; y += 700) { scrollTo(0, y); await wait(40); } scrollTo(0, 0); await wait(250);
      const list = [...s.querySelectorAll('svg[data-export]')];
      pages[p.id] = list.length;
      if (p.minExports && list.length < p.minExports) warn.add(p.id + ': ' + list.length + ' exportable SVGs, minimum is ' + p.minExports);
      for (const svg of list) {
        const name = svg.getAttribute('data-export');
        if (!/^[a-z0-9][a-z0-9-]{0,100}$/.test(name) || !name.startsWith(p.id + '-')) { warn.add('bad name: ' + name); continue; }
        if (seen.has(name)) { warn.add('duplicate name: ' + name); continue; } seen.add(name);
        const vb = svg.viewBox && svg.viewBox.baseVal;
        if (!vb || !vb.width || !vb.height) { warn.add(name + ': no viewBox'); continue; }
        if (svg.querySelector('foreignObject')) warn.add(name + ': contains foreignObject');
        if (!svg.querySelector(':scope > title')) warn.add(name + ': no <title>');
        const copy = svg.cloneNode(true); inline(svg, copy);
        // Pull in symbols, gradients, clips, masks and filters that live elsewhere in the document.
        let defs = copy.querySelector(':scope > defs');
        if (!defs) { defs = document.createElementNS(NS, 'defs'); copy.insertBefore(defs, copy.firstChild); }
        for (let pass = 0; pass < 6; pass++) {
          let added = 0;
          for (const id of refs(copy)) {
            if (copy.querySelector('#' + CSS.escape(id))) continue;
            const src = document.getElementById(id);
            if (!src) { warn.add(name + ': missing #' + id); continue; }
            const c = src.cloneNode(true);
            if (src.localName !== 'symbol') inline(src, c);   // symbols keep currentColor so they take the colour of each use
            defs.appendChild(c); added++;
          }
          if (!added) break;
        }
        if (!defs.childNodes.length) defs.remove();
        copy.setAttribute('xmlns', NS); copy.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        copy.setAttribute('width', vb.width); copy.setAttribute('height', vb.height);
        const text = '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(copy);
        if (/var\(--/.test(text)) warn.add(name + ': unresolved CSS variable');
        if (/<image\b/.test(text)) warn.add(name + ': contains <image>');
        if (!dry) {
          const r = await fetch('/__export?name=' + name, { method: 'POST', headers: { 'content-type': 'image/svg+xml' }, body: text });
          if (r.ok) written++; else warn.add(name + ': save failed ' + r.status);
        }
      }
    }
  } finally { html.classList.remove('exporting'); }
  return { total: seen.size, written, pages, warnings: [...warn] };
};
```

## 15. Spend tokens where they show

- The lead reads the reference images once and puts the facts in `SOURCE.md` and `BRIEF.md`. Agents never re-derive
  them and never read the whole case study.
- Each agent opens only the reference images for its own pages, and never reads `dist/index.html` (it is large;
  read page fragments instead).
- Shared artwork, materials and object parts are written once in the base files and reused; builders generate
  colourways and repeated objects with loops.
- Sonnet builds, Opus reviews, the lead decides. No agent runs on a larger model than its job needs.
- Agents hand back short reports. The lead does not paste agent reports back in full.
- Two build waves, one relaunch for short pages, one review-and-fix round, one final check. No open-ended loops.
