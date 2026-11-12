import Art from '@/components/art/Art';
import { IsoSiteG, TreesG, TreeG, CraneG, PinG, PatternDefs } from '@/components/art/KeyArt';
import { r2, ruler } from '@/lib/charts';
import s from './icons.module.css';

const W = 1.1; // drawing stroke, in the 1 to 1.2 px range of the case study

// Paint per field. 'light' is the page tile, 'blue' the field blue, 'ink' the dark ink.
const THEMES = {
  light: { bg: '#F5F5F5', line: '#8F8F8F', tone: 'paper', cut: '#FFB83D', fill: '#4093EC', fillOp: 0.45, text: '#5E5E5E', marker: '#4093EC', pat: '#8F8F8F' },
  blue: { bg: '#53A2F7', line: '#0A3D91', tone: 'blue', cut: '#FFB83D', fill: '#006BEE', fillOp: 0.6, text: '#0A2E63', marker: '#FFFFFF', pat: '#0A3D91' },
  ink: { bg: '#2F2F2F', line: '#C9C9C9', tone: 'paper', cut: '#FFB83D', fill: '#4093EC', fillOp: 0.55, text: '#DDDDDD', marker: '#4093EC', pat: '#8F8F8F' },
};

// ---- Own line-drawn objects, same stroke and no fills ----
// A stack of boards on a pallet. x, y is the bottom-left corner.
function StackG({ x, y, line, w = 76 }) {
  const rows = 4, h = 9;
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={line} strokeWidth={W} strokeLinejoin="round" strokeLinecap="round">
      <path d={`M4 0v-5h${w - 8}v5M${w / 2 - 3} 0v-5`} />
      {Array.from({ length: rows }, (_, i) => (
        <g key={i}>
          <rect x="0" y={-5 - (i + 1) * h} width={w} height={h} />
          <path d={Array.from({ length: 5 }, (__, k) => `M${r2(((k + 1) * w) / 6 + (i % 2) * 5)} ${-5 - (i + 1) * h}v${h}`).join('')} strokeWidth="0.6" opacity="0.6" />
        </g>
      ))}
    </g>
  );
}

// A site fence: posts, two rails and a diagonal brace per bay. x, y is the bottom-left.
function FenceG({ x, y, line, w = 150, bays = 5 }) {
  const bw = w / bays;
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={line} strokeWidth={W} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M0 -22H${w}M0 -8H${w}`} />
      {Array.from({ length: bays + 1 }, (_, i) => (
        <path key={i} d={`M${r2(i * bw)} 0V-30`} />
      ))}
      {Array.from({ length: bays }, (_, i) => (
        <path key={i} d={`M${r2(i * bw)} -8L${r2((i + 1) * bw)} -22`} strokeWidth="0.7" opacity="0.7" />
      ))}
    </g>
  );
}

// A survey tripod with its instrument. x, y is where the legs meet the ground (centre).
function TripodG({ x, y, line }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={line} strokeWidth={W} strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 -46L-18 0M0 -46L2 0M0 -46L20 -2M-9 -22H11" />
      <rect x="-7" y="-60" width="14" height="10" rx="1.5" />
      <path d="M-4 -60v-5h8v5" />
      <circle cx="0" cy="-55" r="2.2" />
    </g>
  );
}

function Frame({ theme, children, ...rest }) {
  return (
    <Art viewBox="0 0 560 400" {...rest}>
      <rect width="560" height="400" fill={theme.bg} />
      {children}
    </Art>
  );
}

// ---- 1. Site view ----
function SiteView({ mode }) {
  const t = THEMES[mode];
  return (
    <Frame theme={t} title={`Site view on ${mode === 'light' ? 'light' : 'blue'}: cut-away building with pins`} exportName={`icons-site-view-${mode === 'light' ? 'light' : 'dark'}`}>
      <IsoSiteG tone={t.tone} pins={['ridge', 'wing']} yellowPin="komatsu" seed={7} />
      <FenceG x={20} y={382} line={t.line} w={130} bays={4} />
      <TripodG x={58} y={326} line={t.line} />
      <StackG x={448} y={376} line={t.line} />
      <path d="M0 382H560" stroke={t.line} strokeWidth="0.6" opacity="0.5" />
    </Frame>
  );
}

// ---- 2. Cut and fill ----
const GX0 = 40, GX1 = 520, DESIGN = 236, N = 96;
const ground = (x) => r2(DESIGN - 44 * Math.sin(((x - GX0) / (GX1 - GX0)) * Math.PI * 3 + 0.9) - 6);
const SAMPLES = Array.from({ length: N + 1 }, (_, i) => {
  const x = r2(GX0 + (i / N) * (GX1 - GX0));
  return [x, ground(x)];
});

function CutFill({ mode }) {
  const t = THEMES[mode];
  const idp = `icons-cutfill-${mode === 'light' ? 'light' : 'dark'}`;
  const line = SAMPLES.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('');
  const cutTop = SAMPLES.map(([x, y]) => [x, Math.min(y, DESIGN)]);
  const fillBot = SAMPLES.map(([x, y]) => [x, Math.max(y, DESIGN)]);
  const area = (pts) => `M${pts.map((q) => q.join(' ')).join('L')}L${GX1} ${DESIGN}L${GX0} ${DESIGN}Z`;
  const bestCut = SAMPLES.reduce((a, b) => (DESIGN - b[1] > DESIGN - a[1] ? b : a));
  const bestFill = SAMPLES.reduce((a, b) => (b[1] - DESIGN > a[1] - DESIGN ? b : a));
  const markerXs = [bestCut[0], bestFill[0], 150, 440];
  const markers = markerXs.map((mx) => {
    const my = ground(mx);
    return { x: mx, y: my, cut: my < DESIGN };
  });
  return (
    <Frame theme={t} title={`Cut and fill on ${mode === 'light' ? 'light' : 'blue'}: terrain section with cut and fill markers`} exportName={`icons-cut-fill-${mode === 'light' ? 'light' : 'dark'}`}>
      <PatternDefs idp={idp} color={t.pat} opacity={0.5} />
      <TreeG x={64} y={ground(64) + 2} size={62} kind="fir" seed={3} stroke={t.line} strokeWidth={W} />
      <TreeG x={498} y={ground(498) + 2} size={72} kind="round" seed={5} stroke={t.line} strokeWidth={W} />
      <path d={`${line}V330H${GX0}Z`} fill={`url(#${idp}-pat-boards)`} />
      <path d={area(cutTop)} fill={t.cut} fillOpacity="0.55" />
      <path d={area(fillBot)} fill={t.fill} fillOpacity={t.fillOp} />
      <path d={line} fill="none" stroke={t.line} strokeWidth={W} strokeLinejoin="round" strokeDasharray="5 3" />
      <path d={`M${GX0} ${DESIGN}H${GX1}`} stroke={t.line} strokeWidth="1.2" />
      <path d={`M${GX0} 330H${GX1}`} stroke={t.line} strokeWidth={W} />
      {markers.map((m) => (
        <g key={m.x} stroke={m.cut ? t.cut : t.marker} strokeWidth="1.6" strokeLinecap="round">
          <path d={`M${m.x - 8} ${m.y}H${m.x + 8}M${m.x} ${m.y}V${DESIGN}`} />
        </g>
      ))}
      <path d={ruler(48, GX1 - GX0).map((tx) => `M${r2(tx + GX0)} 346v${Math.round(tx) % 50 === 0 ? 10 : 7}`).join('')} stroke={t.line} strokeWidth="0.8" />
      <g fontSize="12" fill={t.text}>
        <text x={bestCut[0]} y={bestCut[1] - 12} textAnchor="middle">Cut</text>
        <text x={bestFill[0]} y={bestFill[1] + 22} textAnchor="middle">Fill</text>
        <text x={GX0} y="380">Existing ground, dashed. Design level, solid.</text>
      </g>
      <PinG x={bestCut[0]} y={r2(bestCut[1] - 40)} r={7} tone="yellow" />
    </Frame>
  );
}

// ---- 3. Crane and delivery ----
function CraneDelivery({ mode }) {
  const t = mode === 'light' ? THEMES.light : THEMES.ink;
  const kind = mode === 'light' ? 'light' : 'dark';
  const g = 372;
  return (
    <Frame theme={t} title={`Crane and delivery on ${mode === 'light' ? 'light' : 'ink'}: tower crane lifting a container`} exportName={`icons-crane-delivery-${kind}`}>
      <TreesG x={300} y={150} w={250} h={230} count={4} tone="paper" seed={11} minSize={50} maxSize={84} clear={[300, 330, 10, 10]} />
      <CraneG x={40} y={30} />
      <g fill="none" stroke={t.line} strokeWidth={W} strokeLinecap="round" strokeLinejoin="round">
        <path d="M223 284L192 334M223 284L254 334" />
        <rect x="186" y="334" width="74" height="34" />
        <path d={Array.from({ length: 8 }, (_, i) => `M${r2(186 + ((i + 1) * 74) / 9)} 334v34`).join('')} strokeWidth="0.6" opacity="0.6" />
        <path d={`M0 ${g}H560`} strokeWidth="0.6" opacity="0.5" />
      </g>
      <StackG x={330} y={g} line={t.line} />
      <FenceG x={430} y={g} line={t.line} w={110} bays={3} />
      <TripodG x={300} y={g} line={t.line} />
      <PinG x={394} y={318} r={7} tone="yellow" />
    </Frame>
  );
}

const SETS = [
  { id: 'site', title: 'Site view', Comp: SiteView, modes: ['light', 'blue'], caps: ['Light, grey outline with blue roofs', 'Field blue, dark blue outline'] },
  { id: 'cutfill', title: 'Cut and fill', Comp: CutFill, modes: ['light', 'blue'], caps: ['Light, yellow cut and blue fill', 'Field blue, dark blue outline'] },
  { id: 'crane', title: 'Crane and delivery', Comp: CraneDelivery, modes: ['light', 'ink'], caps: ['Light', 'Ink'] },
];

export default function Illustrations() {
  return (
    <div className={s.diptychs}>
      {SETS.map(({ id, title, Comp, modes, caps }, n) => (
        <section className={s.diptych} key={id} aria-labelledby={`icons-ill-${id}`}>
          <h3 className="t-h3" id={`icons-ill-${id}`}>{`${n + 1}  ${title}`}</h3>
          <div className={s.pair}>
            {modes.map((m, i) => (
              <figure className={s.pairItem} key={m} style={{ margin: 0 }}>
                <Comp mode={m} />
                <small>{caps[i]}</small>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
