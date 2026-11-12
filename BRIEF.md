# BRIEF: how to build a page of the Tectra brand site

You are building pages of a 30-page brand site for **Tectra**, a construction SaaS, from a Behance case study by
**Stan D., Rondesignlab and team**. The designer is the audience: they must recognise their own work on every
page and see what a partner adds. **Reproduce what they made; do not redesign it. Then extend it generously, in
their language.**

Read first, in this order: this file, `SOURCE.md` (all copy, figures, palette, shapes), your lines in
`LAYOUTS.md`, then `src/app/globals.css`, `src/lib/*.js` and the files in `src/components/site`,
`src/components/ui`, `src/components/art`. Do not read `out/`, `.next/` or `node_modules/`.

The project is Next.js 16 (App Router), React 19, **JavaScript only** (`.jsx`, no TypeScript), Tailwind v4 plus
plain CSS and CSS Modules, framer-motion 14. The app lives in `src/`. Import alias: `@/` = `src/`.

## The brand in one paragraph

Tectra turns a building site into something you can read like an instrument: one calm blue field, a line drawing
of the job, and a few measured figures with yellow marking what needs attention. The mark says the same in three
circles: separate pieces of a project fusing into one body, with the next piece on its way. Every extension must
be explainable from this.

Look and feel: almost flat. Light paper page (`#FAFAFA`), pale tiles, small radii (4 to 6 px), no borders, no
drop shadows on UI. Urbanist Light for everything large; one phrase per heading in blue. Charts are thin,
measured and angular: tick bars that fade downward, quarter-arc gauges cut by the card corner, range handles,
rulers, ring markers. The texture of the brand is line drawing (trees, an isometric cut-away building) in dark
blue on blue, or grey on white with blue roofs. Motion is calm and instrument-like: things are drawn, measured
and filled; nothing bounces except a pin or dot landing.

## Rules that cannot be broken

1. **Do not redesign.** Where the case study shows something, reproduce it exactly: copy verbatim, including
   every figure, plus colours, layout, proportions and component shapes. Measure from the reference images.
2. **Extend generously, only in the designer's language.** Same palette, type, radii, stroke weights, spacing.
   Mark nothing as "new" in the interface.
3. **Invent no facts.** No invented prices, statistics, taglines, phone numbers, addresses, testimonials, people,
   job titles, card numbers or dates. Reuse lines and figures from `SOURCE.md` / `src/lib/brand.js`. Where a
   deliverable needs facts the case study does not publish, use a neutral call to action or a quiet placeholder
   line (a grey bar). Plain labels that only name a deliverable ("Colour versions", "Clear space", "Front",
   "Back", "Minimum size") are allowed. Report every word or value that is your own.
4. **The deliverable list is a checklist, not a design.** How things look and are named comes from this brand's
   case study only. Do not borrow concepts, compositions, headings or copy from other brand systems.
5. **All assets are code.** Inline SVG (JSX) and CSS only. No `<img>`, no `next/image`, no raster files, no
   base64, no external URLs, no icon or chart libraries, no new packages. Photos in the source (people, hands,
   rooms) are replaced by brand gradients or code-drawn objects, **never by drawn people**. Portraits become
   initials on a gradient tile (`Who`), worker avatars become hard-hat icon tiles.
6. **One site, 30 routes.** Your page is `/<id>/`. Links to other pages are `<Link href="/<id>/">` from
   `next/link` (always with the trailing slash). Never use plain `#anchor` links; scroll with JS instead. No
   server features.
7. **One system.** Use the shared tokens, classes and components listed below. Never redefine or edit them.
   Anything missing is built inside your own folder and reported.
8. **Motion is a headline feature.** framer-motion and CSS with the shared tokens from `@/lib/motion` (JS) or
   `--ease-*` / `--dur-*` (CSS). Never default easings. Every page has a designed entrance, scroll reveals (the
   shared `Reveal`: opacity and transform only) and at least one signature animated moment. Every interactive
   element has hover, focus-visible and active states. Animate `transform` and `opacity` where possible.
   Animations always land on their final value, also when interrupted or when the page is left and re-entered.
   `prefers-reduced-motion` is honoured (the shared CSS already shortens CSS animations; in JS use `still()`).
9. **Minor accessibility fixes only.** Small text (under 24 px) must reach 4.5:1. The tokens already solve
   this: on light surfaces small blue text is `var(--blue-ink)`, small grey text is `var(--muted)`; on blue
   fields small text is `var(--navy)` (never white under 24 px, never small text on Tectra Blue `#4093EC`); on
   yellow use `var(--ink)`; white small text only on `--ink`, `--navy`, `--blue-ink` or `--blue-deep`. Large
   display type (24 px and up) keeps the original colours (white on blue, Tectra Blue highlights). Real
   `<button>` and `<a>`; keyboard support for every interactive module (use the shared `Tabs`, `Toggle`,
   `Segmented`); meaningful SVG gets `role="img"` and `aria-label`, decorative SVG gets `aria-hidden="true"`
   (the `Art` wrapper does this); screen-reader labels use real names, never token names. No horizontal page
   scroll from 1920 px down to 390 px: grid columns are `minmax(0, 1fr)`, wide SVGs scale with `width: 100%`,
   wide tables sit in an `overflow-x: auto` wrapper.
10. **Everything graphic exports as SVG.** Every logo variant, swatch sheet, gradient, texture, icon,
    illustration, chart, social post, poster, device frame, product and mockup is its own inline `<svg>`:
    - Use `<Art viewBox title exportName>`: it adds `viewBox`, `<title>` first, the role and `data-export`.
      `exportName` is `<page id>-<name>`: lower-case letters, digits and hyphens, unique across the site.
    - Geometry lives in attributes (`d`, `x`, `width`, `transform`, ...), never in CSS. Paint may come from CSS
      classes and tokens. In JSX use camelCase SVG attributes (`strokeWidth`, `stopColor`) and `href`.
    - The markup is the finished artwork. Inside an exportable SVG animate with **CSS keyframes only**, playing
      *from* a start state *towards* the base style (`animation-fill-mode: both` or `backwards`), so that with
      animation switched off the SVG is complete and correct. The shared classes `draw`, `rise`, `grow-x`,
      `pop`, `fade-in`, `slide-up`, `ring`, `mock-layer`, `mock-lit` are built this way. framer-motion may move
      a wrapper *around* an SVG, never the artwork inside it.
    - No `<foreignObject>`, no HTML inside the SVG, no CSS `background` or pseudo-element standing in for
      artwork. Gradients, clips, masks, filters and textures are SVG `<defs>`.
    - Text inside artwork is SVG `<text>` (it inherits the brand font).
    - A mockup is one SVG: backdrop, shadow, object, materials, shading and the brand artwork, in one `viewBox`.
    - Interactive UI (dashboards, mobile screens, landing pages) is built as React components. Inside it every
      icon, chart, illustration and device frame still follows this rule, and each full screen has a fixed-size
      artboard root marked `data-screen="<name>"`.
    - An exportable SVG must not be nested inside another SVG, and must not be inside a `<button>` or `<a>`.
11. **English only** in every file. Brand copy stays exactly as the designer wrote it, including "Progres" and
    "Localiztion" in faithful rebuilds and the axis order `0 10 20 60 70 80 90 100 30 40 50`.

## Page format

You own `src/app/(site)/<id>/` and `src/components/pages/<id>/` for your page ids, and nothing else.

```jsx
// src/app/(site)/<id>/page.jsx  (server component: no 'use client' here, so it can export metadata)
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

- The page root is that `<section>`. **Remove `data-stub`.** Keep `id="p-<id>"` and the `aria-label`.
- Page-only styles live in `src/components/pages/<id>/<id>.module.css` (keyframes named `<id>-xxx`) or in
  Tailwind classes that use the shared tokens (`bg-blue`, `text-ink`, `bg-tile`, `text-muted`, ...). No global
  CSS from pages. In CSS Modules never write a bare element or `:root` selector; start from a class.
- **Every id**, including SVG gradient, filter, clip-path, mask and pattern ids, starts with `<id>-` and is
  unique within the page. Shared art that takes `idp` gets a different `idp` each time, starting with `<id>-`.
  The shared `Tabs`, `Field` and `Segmented` take an `id` prop: it must start with `<id>-` too.
- Exactly one `<h1>` per page, then ordered `h2` / `h3`.
- Repetitive SVG (bars, dots, rows, grids, colourways, repeated objects) is generated with `.map()` and small
  functions, never hand-typed.
- Server and browser must render the same markup: no `Math.random()` or `Date.now()` in render. Use
  `seeded(n)` from `@/lib/charts` for scatter. Round computed coordinates (`r2()`).
- 600 to 1,600 lines per page in total across its files. Split big pages into several component files.
- Do not edit anything outside your folders. Never run `npm run build` / `next build`. Never start a server.
- Check with `npx eslint "src/app/(site)/<id>" "src/components/pages/<id>"` and fix every error.
  The lint rules are strict (React Compiler): do not call `setState` synchronously inside `useEffect` (set it in
  an event handler, a timer, an observer callback or `requestAnimationFrame`); do not read or write `ref.current`
  during render; do not wrap callbacks in `useCallback` / `useMemo` by hand; write `{'//'}` for a literal `//` in JSX
  text and `&apos;` or `{"…"}` for apostrophes and quotes in JSX text.
- You may look at your page on the shared dev server (address in `STATE.md`), for example with
  `node tools/audit.mjs --base=<address> <id>`.

## Tokens (CSS variables in `globals.css`; the same names work as Tailwind colours: `bg-blue`, `text-navy`)

| Token | Value | Use |
|---|---|---|
| `--blue` | `#4093EC` | Tectra Blue: mark, highlights in large type, chart lines, progress |
| `--yellow` | `#FFB83D` | Signal Yellow: primary button, pins, active tab, attention |
| `--sky` | `#90C0F3` | Sky: secondary button, pale fills, inactive steps |
| `--blue-field` | `#53A2F7` | Field Blue: hero and cover background (class `field`) |
| `--blue-deep` | `#006BEE` | Structure Blue: roofs and walls of the drawing |
| `--ink` | `#2F2F2F` | Text, dark buttons |
| `--paper` `--tile` `--chip` `--card` `--app` `--track` | `#FAFAFA` `#F5F5F5` `#F0F0F0` `#E9E9E9` `#DDDDDD` `#DFDFDF` | Page, tiles, chips, app cards, app background, gauge tracks |
| `--red` | `#E2383B` | Down-trend triangle, status dots |
| `--blue-ink` `--navy` `--muted` `--red-ink` `--yellow-ink` | `#145CB8` `#0A2E63` `#5E5E5E` `#B81F24` `#7A5000` | Small-text inks (rule 9) |
| `--line` | `#E2E2E2` | Hairlines |
| `--r-1` `--r-2` | 4 px, 6 px | Radii |
| `--ease-out` `--ease-in-out` `--ease-draw` `--ease-snap` | see `globals.css` | Entrances and fills; moves; line drawing; pins landing |
| `--dur-1` … `--dur-5` | 140, 280, 520, 900, 1600 ms | Hover; toggles; cards and reveals; charts; drawing |

Hex values for use inside SVG attributes are in `HEX` from `@/lib/brand`.

## Classes (`globals.css`)

- Type: `t-display` (88 px Light quotes and section headings), `t-h1`, `t-h2`, `t-h3`, `t-quote`, `t-lead`,
  `t-body`, `t-title` (Medium 20), `t-label`, `t-small`, `t-caps`, `t-figure`, `t-figure-xl`, `t-center`,
  `t-balance`, `hl` (blue phrase in large type), `hl-ink` (blue phrase in small type), `muted`, `on-blue`.
- Layout: `page`, `wrap` (max 1600 with the 90 px side padding of the case study), `wrap-narrow`, `band`,
  `stack`, `stack-lg`, `row`, `grid` with `cols-2|3|4|6|12`, `rule`, `sr-only`.
- Editorial column (the direction for brand pages): `edit` (3 / 7 / 2 grid), `edit-main`, `edit-note` (left
  margin note), `edit-note-r` (right margin note), `edit-wide`, `pull` (pull-out figure; put the caption in a
  `<small>` inside it).
- Surfaces: `tile`, `card`, `card-app`, `card-head`, `surface-app`, `field` (blue), `field-deep`,
  `field-yellow`, `field-ink`, `glass`.
- Chips and status: `chip`, `chip-sm`, `chip-blue`, `chip-yellow`, `chip-ink`, `trend trend-up|trend-down`,
  `dot dot-yellow|dot-red`.
- Buttons: `btn` (yellow), `btn-sky`, `btn-blue`, `btn-dark`, `btn-white`, `btn-ghost`, `btn-block`, `btn-sm`,
  `btn-icon`; links: `link`, `link-arrow`.
- Controls: `tabs` / `tab` / `tabpanel`, `toggle`, `fieldset`, `input`.
- People: `who` (quote chip), `avatars` / `avatar` (`data-status="red"` for a red dot).
- Devices (HTML): `device device-phone|tablet|laptop|monitor|watch`, `device-screen`, `screen-fit`.
- Landing: `lp-nav`, `lp-logo`, `lp-pill`, `lp-actions`, `lp-footer`.
- Mockups: `mock` (white plate), `mock-cap`, `mock-guide`, `mock-label`, `mock-lit` (slow turn to the light),
  `mock-sheen`, `mock-layer`.
- Motion: `draw` (set `--len` to the path length, `--i` for order), `rise` (bars, `--i`), `grow-x`, `pop`,
  `fade-in`, `slide-up`, `ring` (pin pulse), `fuse-a` / `fuse-b` / `fuse-c` (the mark assembling),
  `tick-cursor`, `skeleton`. Set order with `style={{ '--i': n }}`.

## Components

`@/components/site`
- `Icon` : `<Icon name="bell" size={24} />`; add `label="..."` when it carries meaning. `IconUse` (named
  export) places an icon inside a larger SVG: `<IconUse name="pin" x={10} y={10} size={24} color="#2F2F2F" />`.
- `icons.js` : `CORE` (the brand's 32 icons: layers, link, headset, gear, folder, logout, briefcase, bell,
  share, arrow-right, arrow-up-right, arrow-up, chevron-down, more, pin, crane, hardhat, ruler, cube, truck,
  user, users, note, chart, calendar, clock, search, filter, check, plus, close, home), `UTIL` (chevron-left,
  chevron-right, arrow-left, arrow-down, menu, copy, play, pause, grid, download, alert, sort, x, linkedin,
  youtube), `ICONS`, `CORE_NAMES`. Each value is one path string on a 24 px grid, 1.5 px stroke, round caps.
- `Reveal` : `<Reveal delay={120} from="left">…</Reveal>` scroll reveal (`from`: `left` | `scale`; `as` for the tag).
- `CountUp` : `<CountUp value="250,395 cu yd" />` counts the first number up; lands on the exact text.
- `Typewriter` : `<Typewriter text="…" speed={28} onDone={fn} />`.
- `CopyValue` : `<CopyValue value="#4093EC" label="Tectra Blue hex" />` click to copy, then a toast.
- `toast` : `import { toast } from '@/components/site/Toast'` then `toast('Saved')` (client only).

`@/components/ui`
- `Button` : `<Button variant="sky" href="/lp-pricing/" icon="briefcase" iconRight="arrow-right" size="sm" block>`.
  Variants: yellow (default), sky, blue, dark, white, ghost. Icon-only buttons need `label`.
- `Chip` (default) and `Trend` : `<Chip>Strategic plan</Chip>`, `<Chip tone="blue" size="sm">`,
  `<Chip pressed={on} onClick={fn}>` (toggle button); `<Trend dir="up">+2.4%</Trend>`.
- `Card` (default), `Who`, `Hl` : `<Card title="Problem" arrow variant="page|app" level="h3">`;
  `<Who name="Vitalii B." role="UX Architect" initials="VB" />`;
  `<Hl text={HEADINGS.problem.text} hl={HEADINGS.problem.hl} />` renders the blue phrase.
- `Tabs` : `<Tabs id="<id>-x" label="…" tabs={[{ id, label, content }]} tone="blue" />` (client component).
- `Toggle` (default) and `Segmented` : `<Toggle label="Annually" checked={v} onChange={setV} />`;
  `<Segmented id="<id>-billing" label="Billing period" options={['Monthly', 'Annually']} />`.
- `Field` : `<Field id="<id>-email" label="Work email" type="email" />`.
- `LandingNav` : `<LandingNav current="lp-progress" tone="blue|light" />`. `LandingFooter` :
  `<LandingFooter />` (shared) or `<LandingFooter full />` (lp-home only).
- `Devices` (named exports `Phone`, `Tablet`, `Laptop`, `Monitor`, `Watch`): live HTML screens in SVG-drawn
  frames. `<Phone screen="<id>-home" exportName="<id>-phone-frame">…</Phone>`. The children fill the screen;
  use `<div className="screen-fit">` for a scrolling screen. Screen sizes to design for: phone 390 x 844,
  monitor 1600 x 1000, laptop 1440 x 900, tablet 1180 x 820, watch 184 x 224 (they scale with the frame, so
  size inner content with container-relative units or scale a fixed artboard with CSS `transform`).

`@/components/art` (all return SVG groups; wrap in `Art`)
- `Art` : `<Art viewBox="0 0 800 600" title="Primary lockup" exportName="<id>-primary">…</Art>`;
  `decorative` hides it from screen readers.
- `Mark.jsx` : `MarkG` (`x y size fill bodyClass dotClass`), `WordmarkG` (`x y size fill anchor registered`),
  `LockupG` (horizontal, box 400 x 100 at size 100; `fill`, `markFill`), `LockupStackG` (box 300 x 232;
  `scale`), `AppIconG` (`size radius tile fill`; radius 6 web, 22 dock), `MarkWindowG` (`idp x y size`; children
  are clipped to the mark in its 100-unit space), constants `MARK` (circles A, B, C and fillets), `MARK_BODY`,
  `MARK_DOT`, `LOCKUP_H`, `LOCKUP_V`.
- `KeyArt.jsx` : `IsoSiteG` (`x y scale tone pins yellowPin trees seed`; box 560 x 400; tone `blue` | `paper` |
  `ghost`; pins from `SITE_PINS`: ridge, wing, yard, gate, komatsu), `PinG` (`x y r tone pulse`), `TreeG`
  (`x y size kind stroke seed`; kind `round` | `fir`), `TreesG` (`x y w h count tone seed clear`), `CraneG`
  (`x y scale`; box 200 x 320), `TickBarsG` (`idp x y w h count from to tone base handle rise`), `GaugeG`
  (`x y w h r value tone draw`; the corner arc, clip it to the card), `PatternDefs` (`idp color opacity`; then
  `fill="url(#<idp>-pat-marks|-pat-ticks|-pat-boards|-pat-dots|-pat-fuse)"`), helpers `iso()`, `TONES`,
  `ISO_BOX`.
- `Mockup.jsx` : `BackdropG` (`w h`), `ShadowG` (`idp cx cy rx ry tone opacity blur`; tone blue | yellow | sky |
  ink | deep), `MaterialDefs` (`idp`; then `url(#<idp>-metal|-metal-dark|-plastic|-glass|-ceramic|-rubber|-card|
  -shade|-shade-v)` as fills and `url(#<idp>-fabric|-paper|-soft)` as filters), `LayerG` (`i dx dy`; one layer
  of an exploded object, slides out on load), `AxisG` (`points`; the dashed explode axis), `CalloutG`
  (`x y tx ty label anchor`), `SheenG` (`idp d`), constant `LIGHT`.
- `Devices.jsx` : SVG frames `PhoneG`, `MonitorG`, `LaptopG`, `TabletG` (`rugged`), `WatchG` (`band`), each
  `idp x y w` with children drawn in the screen's own space (see `SCREEN`); screens `ScreenHomeG` (`idp`; the
  blue phone home, 390 x 844), `ScreenAppG` (`idp`; the desktop app, 1600 x 1000), `ScreenWatchG` (184 x 224),
  and `CutFillG` (`x y w h labels`; the Cut and Fill instrument).

`@/lib`
- `pages.js` : `pageMeta(id)`, `pages`, `groups`, `pageById`, `previous`, `next`, `href(id)`.
- `motion.js` : `ease` (`out`, `inOut`, `draw`, `snap`), `dur` (`d1`…`d5`, seconds), `stagger`, transitions
  `tEnter`, `tMove`, `tChart`, `tDraw`, `tSnap`, variants `listV`, `itemV`, `fadeV`.
- `charts.js` : `AXIS`, `scale`, `r2`, `linePath`, `curvePath`, `areaPath`, `polar`, `arcPath`, `arcLength`,
  `cornerGauge`, `tickBars`, `ruler`, `axisLabels`, `ticks`, `shares`, `segments`, `seeded`.
- `site.js` : `copy()`, `fmt()`, `uid()`, `clamp`, `lerp`, `range`, `hexToRgb`, `contrast`, `still()`.
- `brand.js` : all copy and figures of the case study as constants: `HERO`, `POSTER`, `BILLBOARD`, `OVERVIEW`,
  `ABOUT`, `KOMATSU`, `KPI`, `VOLUME`, `CUT_FILL`, `INSIGHTS`, `RESULTS`, `EFFICIENCY`, `PROBLEM`, `SOLUTION`,
  `QUOTES`, `HEADINGS`, `STRATEGY_CHIPS`, `SCOPE_CHIPS`, `ROADMAP`, `MOBILE_SCREENS`, `FEATURES`, `PLANS`,
  `EMPOWER`, `PALM`, `FAQ`, `FOOTER`, `CHARSET`, `WEIGHTS`, `BADGES`, `NAV`, `NAV_LINKS`, `HEX`. Import from
  here instead of retyping text.

## Mockups: this project's direction

- **Staging: exploded view.** Each object is pulled apart into its layers along **one** axis (`LayerG` + `AxisG`),
  for example a mug into handle, body and wrap; a badge into strap, buckle, holder and card. The axis and the
  view are given per mockup in `LAYOUTS.md` and differ every time.
- **Backdrop: pure white** (`BackdropG`, inside a `mock` plate) with **coloured contact shadows** (`ShadowG`,
  blue, yellow or sky).
- **One light, from the upper left.** Highlights upper-left, shade lower-right, on every object. Use the
  material gradients and filters from `MaterialDefs`; add your own shading shapes on top.
- Believable proportions and materials; artwork follows the surface (clip it to the object, skew or scale it
  with the face it sits on); nothing may look like a flat sticker on a flat shape.
- Text on mockups is only the logo, the brand name, or lines that appear in the case study (`HERO`, `POSTER`,
  `BILLBOARD`, quotes, figures).
- Signature motion: layers slide apart on load (`mock-layer` via `LayerG`); the hero object turns slowly to the
  light (`mock-lit`, `SheenG`).

## Reference images

`reference/mNN_k.png` are readable slices of the 19 case-study images (index in `SOURCE.md`). Open **only** the
ones listed in your task. They are for reading and measuring; they are never used in the site.
Extra crops: `m12_L1..L3` and `m12_R1..R3` (the two landing artboards at full size), `m12_hero`, `logo_zoom`.

## Page ids

overview, logo, color, gradients, typography, icons, dataviz, motion, strategy, web-system, lp-home,
lp-dashboard, lp-progress, lp-timeline, lp-work-areas, lp-mobile, lp-pricing, dashboard, mobile-a, mobile-b,
feature, showcase, campaign, use-apparel, use-accessories, use-stationery, use-packaging, use-event, use-world,
use-product.

## Hand-back (under 150 words)

Files written; a count of each deliverable against its minimum and the number of `data-export` SVGs against
`minExports`; which parts are faithful rebuilds; which are extensions; every word or value that is your own;
anything you did not check.
