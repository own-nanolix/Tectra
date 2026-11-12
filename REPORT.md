# REPORT: Tectra brand site

A 30-page brand site built from the Behance case study "Tectra - Construction SaaS & UX UI Design" by Stan D.,
Rondesignlab and team (https://www.behance.net/gallery/225852373/Tectra-Construction-SaaS-UX).

## Where the site is

- **Routes:** `/` shows the overview. Every page is `/<id>/`: overview, logo, color, gradients, typography, icons,
  dataviz, motion, strategy, web-system, lp-home, lp-dashboard, lp-progress, lp-timeline, lp-work-areas,
  lp-mobile, lp-pricing, dashboard, mobile-a, mobile-b, feature, showcase, campaign, use-apparel,
  use-accessories, use-stationery, use-packaging, use-event, use-world, use-product.
- **Static export:** `npm run build` writes the site to `out/` (about 28 MB). It needs no server features.
- **GitHub:** https://github.com/own-nanolix/Tectra (branch `main`, every milestone pushed).
- **Live link:** https://tectra-phi.vercel.app/ . Vercel is connected to the GitHub repo, so every push to `main`
  goes live. The link is not listed in search engines, but anyone who has it can open it.

## Deliverables: minimum and delivered

Exportable SVGs per page, as counted by `node tools/check.mjs` on the built site (30 of 30 pages `ok`).

| # | Page | Minimum | Delivered |
|---|---|---|---|
| 1 | overview | 2 | 3 |
| 2 | logo | 18 | 29 |
| 3 | color | 5 | 12 |
| 4 | gradients | 20 | 25 |
| 5 | typography | 6 | 12 |
| 6 | icons | 40 | 46 |
| 7 | dataviz | 20 | 28 |
| 8 | motion | 6 | 10 |
| 9 | strategy | 3 | 11 |
| 10 | web-system | 3 | 6 |
| 11 | lp-home | 2 | 11 |
| 12 | lp-dashboard | 2 | 14 |
| 13 | lp-progress | 2 | 9 |
| 14 | lp-timeline | 2 | 12 |
| 15 | lp-work-areas | 2 | 6 |
| 16 | lp-mobile | 2 | 11 |
| 17 | lp-pricing | 2 | 9 |
| 18 | dashboard | 8 | 14 |
| 19 | mobile-a | 2 | 10 |
| 20 | mobile-b | 2 | 13 |
| 21 | feature | 2 | 4 |
| 22 | showcase | 4 | 4 |
| 23 | campaign | 7 | 14 |
| 24 | use-apparel | 12 | 14 |
| 25 | use-accessories | 20 | 22 |
| 26 | use-stationery | 14 | 16 |
| 27 | use-packaging | 12 | 14 |
| 28 | use-event | 19 | 19 |
| 29 | use-world | 6 | 6 |
| 30 | use-product | 12 | 16 |

Content counts reported by the builders and checked by the reviewers: logo (1 primary lockup, construction,
clear space, 4 minimum sizes, 5 colour versions, 5 lockups, 6 misuse examples, 3 secondary graphics, draw-on);
icons (32 icons, 2 constructions with 4 sizes, 4 in-use examples, 3 illustrations on light and dark); dataviz
(17 chart types, 4 stat cards, 3 KPI tiles, a 6-row table, sparklines, 2 counters, states, 6 rules); landing
pages (lp-home 8 sections; the other six 7 or 8 each); dashboard (8 screens: overview, options A to E, two
inner screens; 10 components); mobile (18 screens, 10 component specimens, 7 interaction patterns); showcase
(4 scenes); campaign (4 posts, 3 posters, 5 stories, a 9-tile profile grid, 1 poster mockup); use-event (2
lanyards, 2 ID cards in one holder scene, 4 fabric and 3 silicone wristbands, 3 tickets, a VIP pass, a booth,
3 flags, a banner); use-world (billboard, light box, 2 roll-ups, reception with wayfinding and plaque, vehicle
wrap, plus the shipping container).

## SVG export

`node tools/export-svg.mjs` wrote **420 SVGs** to `export/svg/` with **0 warnings**. Six exported files were
opened directly in a browser (primary lockup, the place chart, a mug mockup, a social post, the exploded hard
hat, the reception sign): each matched the page. Text in exported files is live SVG text in the brand font
stack, so a computer without Urbanist shows a system font until the text is outlined in a design tool.

## Faithful rebuilds, and what we added

Faithful to the case study:
- **lp-home:** the landing page, all eight sections in order, copy verbatim.
- **overview:** the cover composition and the Overview / About block.
- **strategy:** the brief quote, strategic plan chart and quotes, the three research cards, the problem and
  solution ruler and cards, the result quote and cards, the roadmap.
- **dashboard option A**, **mobile screens 1 to 3**, and the hero of **lp-mobile:** the product as shown.
- **color:** the five colour rings and the palette statement. **typography:** the Urbanist specimen and weights.
- **logo:** the mark, the colour versions and lockups shown. **icons:** the app's rail, tab bar and top buttons.
- **campaign:** the poster, the light-box panel and the billboard artwork.
- **use-event:** the lanyard and badges. **use-world:** billboard, light box, shipping container.
- **use-product:** the hard hat with "Tectra®" and the app icon.

Added by us, in the designer's language: logo construction, clear space, sizes, misuse and draw-on; colour
scales, pairings and semantic tokens; the gradient library, grain, six key-art plates and four motion studies;
the type scale and metrics study; the rest of the 32 icons and three illustrations; eight further chart types;
the whole motion system; the web component bench and mega menu; six further landing pages; dashboard options B
to E and two inner screens; mobile screens 4 to 18, the component set and interaction patterns; the working
site-view demo; four showcase scenes; social posts, stories and profile grid; apparel, accessories, stationery,
packaging, the rest of the event kit, roll-ups, reception signage, the vehicle wrap; the site tablet, the access
card, the device trio and the icon size ladder.

## Wording and values that did not come from the case study

- **Page headings and plain labels** that name deliverables ("The mark", "Clear space", "Charts", "Stationery"
  and similar), control labels ("Play", "Replay", "Sort", "Search", "Sign in", "Email", "Password", "Settings",
  "Files", "Support", "Level", "Volume", "Tasks per month") and the word "VIP" on the pass.
- **Names we gave things:** the six gradients (Field, Blue fade, Signal fade, Idle fade, Glass, Area), key-art
  plate names, the colour names Tectra Blue, Signal Yellow, Sky, Field Blue, Structure Blue, and scale token
  names such as `blue-100`.
- **Recommendations:** minimum logo sizes (16, 24, 32, 48 px), clear space equal to the large circle's radius,
  the six chart rules, the motion do / don't pairs, and the print-spec dimensions for apparel (for example a
  280 x 180 mm chest print, 90 mm below the collar).
- **Computed values:** colour scale steps are mixed in code from the published colours; contrast ratios are
  calculated. Sampled colours (Field Blue, Structure Blue, the neutrals, red) were read from the images.
- **FAQ answers:** the case study prints only the first answer. The other four reuse lines printed elsewhere in
  the case study.
- **Drawn shapes without published data:** the area curve, the mountain polyline, sparklines and gauge sweeps
  follow the shapes in the source; only published values are labelled.
- **QR tiles and barcodes** are generic patterns that encode nothing.
- **Placeholders (quiet grey bars):** annual prices, names, addresses, phone numbers, dates, seat and card
  numbers on stationery, tickets, labels and cards; note text on the mobile Notes screen.
- **Source oddities kept as printed:** "Progres", "Localiztion", the axis order `0 10 20 60 70 80 90 100 30 40
  50`, and the cut-off sentence on the second mobile text card.
- **Source text replaced:** the footer on `lp-home` was another company's leftover text in the source (address,
  copyright line and link columns with that company's product names). All of it is replaced with neutral
  placeholders: "Street address / Suite / City, postcode / Country", "© Tectra", and plain column entries such as
  "Overview", "Features", "Platform", "Guides", "Help centre". The four column headings and the layout are kept.
- **Illegible or wrong in the source:** the black colour ring is labelled "#FFB83D"; it is shown as `#000000`.
  The badge contact lines are too small to rely on and are placeholder bars.

## Accessibility changes that altered the look

- Buttons use dark text on yellow and navy text on sky. The source uses white, which fails 4.5:1.
- Small text on the blue field is navy instead of white or pale blue. Large type stays white.
- Small blue text on light surfaces uses a deeper blue (`#145CB8`); small grey text uses `#5E5E5E`.
- The "Monthly" and "Register now" buttons use the deeper blue so their white labels pass.
- Left as designed: large headings in Tectra Blue on paper (about 3:1), which is allowed for large type.

## Font, and what could not be reproduced in code

- **Font:** Urbanist (Light, Regular, Medium), named in the case study and open source, loaded through
  `next/font/google`. No substitute was needed.
- **Not reproduced:** photographs. Portraits became initials on a gradient tile; worker avatars became hard-hat
  icon tiles; the billboard and badge photos became the line drawing or a plain backdrop. The detailed
  hand-drawn illustration of the building, trees and figures is redrawn as a simpler isometric drawing with
  line trees and no people. Mockups are drawn objects, not photographic renders.

## What was verified in the browser, and what was not

Verified by the lead on the built site (`out/`, served locally):
- `npm run build` passes; `node tools/check.mjs --strict` reports 30 of 30 `ok`.
- `node tools/audit.mjs`: 30 of 30 pages clean at 1440 and 390 px (no overflow, low contrast, unnamed controls,
  bad links, missing SVG roles, duplicate ids or console errors).
- All 30 pages were loaded and scrolled end to end at 1440 px with no console errors, and viewed as full-page
  screenshots. The dock's next link, Shift+Left / Shift+Right, the index overlay (30 links) and Escape work.
- Six exported SVG files were opened on their own.

Verified by the reviewers on the dev server: every interactive module on their pages by mouse and keyboard
(tabs, toggles, sliders, sorting, filters, steppers, pins, accordions, the mega menu, copy values, replays),
interrupted animations, leaving and returning to a page, and reduced motion on the motion, mobile and feature
pages.

Not verified:
- The lead's side-by-side comparison of `lp-home`, `logo` and the product screens with the reference images was
  done on reduced-size screenshots; the close measurements were done by the reviewers.
- Phone-width layouts were audited on all pages but looked at by eye only on some.
- Real touch input, Safari and Firefox were not tested.
- Small text on gradients (flagged on 13 pages by the audit) was checked by eye by the reviewers, not measured.

## Agents

- **Builders:** 24, on Sonnet, in two waves of 12. None had to be relaunched; every page met its minimum.
- **Reviewers:** 8, on Opus. Each fixed its own pages; the lead applied three shared fixes (footer padding,
  callout label size, scroll reveals).
- **Problems found along the way:** the starter config sent CSS Modules through the Tailwind loader, so page
  styles were missing during the first wave (fixed in `next.config.mjs`); the static export's prefetch files
  gave 404s on a plain static host (fixed by `scripts/flatten-prefetch.mjs`); `cacheComponents` and
  `partialPrefetching` had to be removed because they cannot be combined with a static export.

## Decisions made under the standing orders

- The two rule files disagree on technology: `rule/07-tectra.md` describes a single HTML file, `rule/Brand-site.md`
  describes this Next.js site and says it gives "everything else" beyond the link, site name and layout
  direction. `Brand-site.md` is followed; from `07-tectra.md` only the Behance link, the site name and section
  2b (layout direction) apply.
- No other company's name, address, product names or copyright appears on any page; the `lp-home` footer uses
  neutral placeholders (this overrides "copy verbatim" for that footer).
- Pushes: one push per round of work, after the final review, because every push to `main` goes live.
