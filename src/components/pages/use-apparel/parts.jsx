// Shared pieces of the apparel mockups: colourways, the artwork that goes on cloth (defined once, reused
// everywhere) and the film that carries a lifted print. Light comes from the upper left on everything.
import { MarkG, WordmarkG, LockupG, LockupStackG } from '@/components/art/Mark';
import { IsoSiteG, TreesG, PatternDefs } from '@/components/art/KeyArt';
import { SHADOW_TONES } from '@/components/art/Mockup';
import { HERO, POSTER } from '@/lib/brand';

// Colourways: palette only (white, Tectra Blue, Signal Yellow, Sky, ink, light grey).
// sc is the seam colour (black on light cloth, white on dark), lining is the overlay that darkens the inside.
export const CW = {
  white: { name: 'White', fill: '#FFFFFF', sc: '#000000', so: 0.2, lining: 0.2 },
  blue: { name: 'Tectra Blue', fill: '#4093EC', sc: '#000000', so: 0.24, lining: 0.26 },
  yellow: { name: 'Signal Yellow', fill: '#FFB83D', sc: '#000000', so: 0.24, lining: 0.26 },
  sky: { name: 'Sky', fill: '#90C0F3', sc: '#000000', so: 0.22, lining: 0.24 },
  ink: { name: 'Ink', fill: '#2F2F2F', sc: '#FFFFFF', so: 0.2, lining: 0.4 },
  grey: { name: 'Light grey', fill: '#E9E9E9', sc: '#000000', so: 0.2, lining: 0.2 },
};

export const BLUE = '#4093EC';
export const WHITE = '#FFFFFF';
export const INK = '#2F2F2F';
export const YELLOW = '#FFB83D';

// The artwork catalogue. Each entry has its own natural box (w x h) and a draw(colour set) function.
// c = { fg, mk, tone, id }: fg is the main colour, mk the mark colour in lockups, tone the line-drawing tone.
const heroLines = HERO.title;
const posterLines = POSTER.title.match(/^(.*?,) (.*?) (with .*)$/).slice(1, 4);

export const PRINTS = {
  mark: { w: 100, h: 100, draw: (c) => <MarkG size={100} fill={c.fg} /> },
  lockup: { w: 400, h: 100, draw: (c) => <LockupG fill={c.fg} markFill={c.mk || c.fg} /> },
  stack: { w: 300, h: 232, draw: (c) => <LockupStackG fill={c.fg} markFill={c.mk || c.fg} /> },
  word: { w: 300, h: 120, draw: (c) => <WordmarkG x={150} y={100} size={104} fill={c.fg} anchor="middle" registered /> },
  iso: { w: 560, h: 400, draw: (c) => <IsoSiteG tone={c.tone || 'paper'} trees /> },
  trees: { w: 560, h: 190, draw: (c) => <TreesG w={560} h={190} count={9} tone={c.tone || 'paper'} seed={5} minSize={60} maxSize={110} /> },
  pattern: {
    w: 300,
    h: 220,
    draw: (c) => (
      <g>
        <PatternDefs idp={`${c.id}-pat`} color={c.fg} />
        <rect width="300" height="220" fill={`url(#${c.id}-pat-pat-fuse)`} />
      </g>
    ),
  },
  hero: {
    w: 560,
    h: 150,
    draw: (c) => (
      <g fill={c.fg} fontSize="72" fontWeight="300" letterSpacing="-0.7">
        <text x="0" y="62">{heroLines[0]}</text>
        <text x="0" y="136">{heroLines[1]}</text>
      </g>
    ),
  },
  poster: {
    w: 560,
    h: 190,
    draw: (c) => (
      <g fill={c.fg} fontSize="62" fontWeight="300" letterSpacing="-0.6">
        {posterLines.map((t, i) => (
          <text key={t} x="0" y={56 + i * 66}>{t}</text>
        ))}
      </g>
    ),
  },
};

// A print centred on the origin, width w. Natural box is scaled; nothing is a bitmap.
export function Print({ kind, w, fg, mk, tone, id, filter, ...rest }) {
  const p = PRINTS[kind];
  const k = w / p.w;
  return (
    <g {...rest}>
      <g transform={`scale(${k}) translate(${-p.w / 2} ${-p.h / 2})`} filter={filter}>
        {p.draw({ fg, mk, tone, id })}
      </g>
    </g>
  );
}
export const printH = (kind, w) => (PRINTS[kind].h * w) / PRINTS[kind].w;

// Soft fold shapes. kind: l = light (upper left), d = shade (lower right). stroke paths are creases.
export function Folds({ m, list }) {
  return (
    <g filter={`url(#${m}-soft)`}>
      {list.map((f, i) =>
        f.line ? (
          <path key={i} d={f.d} fill="none" stroke={f.k === 'l' ? '#FFFFFF' : '#000000'} strokeWidth={f.w || 7} strokeLinecap="round" opacity={f.o} />
        ) : (
          <path key={i} d={f.d} fill={f.k === 'l' ? '#FFFFFF' : '#000000'} opacity={f.o} />
        ),
      )}
    </g>
  );
}

// A garment's silhouette shadow: the shape pushed to the lower right, in a brand colour.
export function CastShadow({ d, m, tone = 'blue', dx = 9, dy = 14, o = 0.2, ...rest }) {
  return <path d={d} transform={`translate(${dx} ${dy})`} fill={SHADOW_TONES[tone]} opacity={o} filter={`url(#${m}-soft)`} {...rest} />;
}

// The lifted print layer: a clear carrier film with registration ticks, the artwork, and the same
// overall light falloff as the cloth. Centred on the origin.
export function PrintFilm({ print, uid, m, tone = 'blue', pad = 14, backing = '#90C0F3' }) {
  const w = print.w;
  const h = printH(print.kind, w);
  const fw = w + pad * 2;
  const fh = h + pad * 2;
  const cid = `${uid}-film`;
  return (
    <g>
      <defs>
        <clipPath id={cid}>
          <rect x={-fw / 2} y={-fh / 2} width={fw} height={fh} rx="5" />
        </clipPath>
      </defs>
      <rect x={-fw / 2 + 7} y={-fh / 2 + 12} width={fw} height={fh} rx="5" fill={SHADOW_TONES[tone]} opacity="0.22" filter={`url(#${m}-soft)`} />
      <rect x={-fw / 2} y={-fh / 2} width={fw} height={fh} rx="5" fill={backing} fillOpacity={backing === '#90C0F3' ? 0.16 : 1} stroke="#90C0F3" strokeWidth="1" filter={`url(#${m}-fabric)`} />
      <g clipPath={`url(#${cid})`}>
        <Print kind={print.kind} w={w} fg={print.fg} mk={print.mk} tone={print.tone} id={uid} filter={`url(#${m}-fabric)`} />
        <rect x={-fw / 2} y={-fh / 2} width={fw} height={fh} fill={`url(#${m}-shade)`} />
        <path d={`M${-fw / 2} ${-fh / 2}L${-fw / 2 + fw * 0.55} ${-fh / 2}L${-fw / 2} ${-fh / 2 + fh * 0.5}Z`} fill="#FFFFFF" opacity="0.35" />
      </g>
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => (
        <path key={`${sx}${sy}`} d={`M${sx * (fw / 2 + 6)} ${sy * (fh / 2 - 8)}V${sy * (fh / 2 + 6)}H${sx * (fw / 2 - 8)}`} fill="none" stroke="#4093EC" strokeWidth="1" />
      ))}
    </g>
  );
}

// Dashed placement guide drawn on the cloth where a lifted print belongs.
export function Guide({ print, cx, cy }) {
  const h = printH(print.kind, print.w);
  return <rect x={cx - print.w / 2 - 6} y={cy - h / 2 - 6} width={print.w + 12} height={h + 12} rx="4" fill="none" stroke="#4093EC" strokeWidth="1" strokeDasharray="4 5" opacity="0.75" />;
}
