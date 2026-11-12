// The five-slide deck (16:9, 1600 x 900 each) and the overview with the slides stepped back along the diagonal.
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { IsoSiteG, TreesG, TickBarsG, GaugeG } from '@/components/art/KeyArt';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG } from '@/components/art/Mockup';
import { ruler } from '@/lib/charts';
import { HERO, QUOTES, INSIGHTS, HEADINGS, PROBLEM, SOLUTION, RESULTS, SCOPE_CHIPS } from '@/lib/brand';
import { C, wrap, wrapRuns, RunLines, quoteRuns } from './parts';

const SW = 1600, SH = 900;

function Field({ idp }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${idp}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5BA8F8" />
          <stop offset="1" stopColor="#4C9BF3" />
        </linearGradient>
      </defs>
      <rect width={SW} height={SH} fill={`url(#${idp}-bg)`} />
    </g>
  );
}

const Paper = () => <rect width={SW} height={SH} fill={C.paper} />;

function Chip({ x, y, label, size = 26 }) {
  const w = label.length * size * 0.52 + 64;
  return (
    <g>
      <rect x={x} y={y} width={w} height={size * 2.2} rx="4" fill={C.chip} />
      <text x={x + 32} y={y + size * 1.5} fontSize={size} fontWeight="400" fill={C.ink}>{label}</text>
    </g>
  );
}

function Heading({ h, x, y, size = 58, max = 44 }) {
  return <RunLines lines={wrapRuns(quoteRuns(h.text, h.hl), max)} x={x} y={y} lh={size * 1.2} size={size} fill={C.ink} />;
}

function Arrow({ x, y, s = 22, color = C.ink }) {
  return <path d={`M${x} ${y + s}L${x + s} ${y}M${x + s * 0.2} ${y}H${x + s}V${y + s * 0.8}`} stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
}

// 1. Title slide: blue field, white mark, the hero line, line trees and the isometric drawing.
function SlideTitle({ idp }) {
  const sub = wrap(HERO.sub, 36);
  return (
    <g>
      <Field idp={idp} />
      <TreesG x={0} y={0} w={SW} h={SH} count={13} tone="blue" seed={21} clear={[60, 250, 800, 440]} minSize={70} maxSize={150} />
      <IsoSiteG tone="blue" x={840} y={230} scale={1.28} pins={['ridge', 'wing']} yellowPin="workcard" trees={false} />
      <MarkG x={84} y={78} size={92} fill="#fff" />
      <g fontSize="132" fontWeight="300" fill="#fff" letterSpacing="-1.3">
        <text x="80" y="400">{HERO.title[0]}</text>
        <text x="80" y="532">{HERO.title[1]}</text>
      </g>
      <g fontSize="34" fontWeight="400" fill={C.navy}>
        {sub.map((l, k) => <text key={k} x="84" y={612 + k * 46}>{l}</text>)}
      </g>
    </g>
  );
}

// 2. The brief as a quote, with the initials tile (no portrait).
function SlideQuote({ idp }) {
  const q = QUOTES.brief;
  const lines = wrapRuns(quoteRuns(q.text, q.hl), 40);
  return (
    <g>
      <Paper />
      <MarkG x={1090} y={470} size={400} fill={C.sky} opacity="0.35" />
      <RunLines lines={lines} x={100} y={200} lh={84} size={66} fill={C.ink} />
      <g transform="translate(100 620)">
        <rect width="700" height="168" rx="5" fill={C.chip} />
        <text x="34" y="104" fontSize="64" fontWeight="300" fill={C.blue}>{'//'}</text>
        <defs>
          <linearGradient id={`${idp}-who`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={C.blue} />
            <stop offset="1" stopColor={C.sky} />
          </linearGradient>
        </defs>
        <rect x="150" y="26" width="116" height="116" rx="5" fill={`url(#${idp}-who)`} />
        <text x="208" y="100" fontSize="44" fontWeight="500" fill="#fff" textAnchor="middle">{q.initials}</text>
        <circle cx="208" cy="142" r="9" fill={C.yellow} />
        <text x="300" y="82" fontSize="38" fontWeight="400" fill={C.ink}>{q.name}</text>
        <text x="300" y="124" fontSize="30" fontWeight="400" fill={C.muted}>{q.role}</text>
      </g>
      <MarkG x={1480} y={60} size={48} fill={C.blue} />
    </g>
  );
}

// 3. Research: the three insight figures with tick-bar charts.
function SlideResearch({ idp }) {
  return (
    <g>
      <Paper />
      <Chip x={80} y={64} label={HEADINGS.insights.chip} />
      <Heading h={HEADINGS.insights} x={80} y={210} size={56} max={46} />
      {INSIGHTS.map((it, i) => {
        const x = 80 + i * 500;
        return (
          <g key={it.value} transform={`translate(${x} 340)`}>
            <rect width="460" height="500" rx="5" fill={C.tile} />
            <text x="36" y="150" fontSize="128" fontWeight="300" fill={C.ink}>{it.value}</text>
            {wrap(it.label, 24).map((l, k) => <text key={k} x="36" y={206 + k * 40} fontSize="32" fontWeight="400" fill={C.ink}>{l}</text>)}
            <TickBarsG idp={`${idp}-c${i}`} x={36} y={316} w={388} h={96} count={36} from={it.from} to={it.to} tone={it.tone} />
          </g>
        );
      })}
      <MarkG x={1480} y={60} size={48} fill={C.blue} />
    </g>
  );
}

// 4. Problem and solution: two cards with corner arcs, the case study's ruler above.
function SlideProblem({ idp }) {
  const cards = [
    { title: 'Problem', text: PROBLEM, tone: 'yellow', x: 80, v: 0.55 },
    { title: 'Solution', text: SOLUTION, tone: 'blue', x: 820, v: 0.8 },
  ];
  const tick = ruler(72, 1440);
  return (
    <g>
      <Paper />
      <Chip x={80} y={64} label={HEADINGS.problem.chip} />
      <Heading h={HEADINGS.problem} x={80} y={210} size={58} max={60} />
      <path d={tick.map((t) => `M${80 + t} 262v22`).join('')} stroke="#DDDDDD" strokeWidth="1.4" />
      <path d="M300 273H1100" stroke={C.yellow} strokeWidth="2" />
      <rect x="292" y="266" width="14" height="14" rx="2" fill={C.yellow} />
      <rect x="1094" y="266" width="14" height="14" rx="2" fill={C.yellow} />
      {cards.map((c, i) => (
        <g key={c.title} transform={`translate(${c.x} 340)`}>
          <clipPath id={`${idp}-clip${i}`}>
            <rect width="700" height="500" rx="5" />
          </clipPath>
          <rect width="700" height="500" rx="5" fill={C.tile} />
          <g clipPath={`url(#${idp}-clip${i})`}>
            <GaugeG w={700} h={500} r={260} value={c.v} tone={c.tone} />
          </g>
          <text x="44" y="94" fontSize="42" fontWeight="500" fill={C.ink}>{c.title}</text>
          <Arrow x={620} y={60} s={30} />
          {wrap(c.text, 32).map((l, k) => <text key={k} x="44" y={168 + k * 48} fontSize="36" fontWeight="400" fill={C.ink}>{l}</text>)}
        </g>
      ))}
    </g>
  );
}

// 5. Results: the three result cards with gauges, the scope chips on the left.
function SlideResults({ idp }) {
  return (
    <g>
      <Paper />
      <text x="80" y="230" fontSize="150" fontWeight="300" fill={C.ink}>{HEADINGS.result.chip}</text>
      <path d="M84 270H340" stroke={C.blue} strokeWidth="4" />
      {SCOPE_CHIPS.map((c, i) => <Chip key={c} x={80} y={340 + i * 100} label={c} size={30} />)}
      {RESULTS.map((r, i) => (
        <g key={i} transform={`translate(660 ${60 + i * 270})`}>
          <clipPath id={`${idp}-clip${i}`}>
            <rect width="860" height="240" rx="5" />
          </clipPath>
          <rect width="860" height="240" rx="5" fill={C.tile} />
          <g clipPath={`url(#${idp}-clip${i})`}>
            <GaugeG w={860} h={240} r={140} value={parseInt(r.value, 10) / 40} tone={r.tone} />
          </g>
          <text x="44" y="150" fontSize="112" fontWeight="300" fill={C.ink}>{r.value}</text>
          {wrap(r.label, 20).map((l, k) => <text key={k} x="330" y={104 + k * 44} fontSize="34" fontWeight="400" fill={C.ink}>{l}</text>)}
        </g>
      ))}
    </g>
  );
}

export const SLIDES = [
  { key: 'title', name: 'Slide 1, title', C: SlideTitle },
  { key: 'brief', name: 'Slide 2, brief', C: SlideQuote },
  { key: 'research', name: 'Slide 3, research', C: SlideResearch },
  { key: 'problem', name: 'Slide 4, problem and solution', C: SlideProblem },
  { key: 'results', name: 'Slide 5, results', C: SlideResults },
];

export function Slide({ n }) {
  const sl = SLIDES[n];
  const idp = `use-stationery-slide-${n + 1}`;
  const Body = sl.C;
  return (
    <Art viewBox={`0 0 ${SW} ${SH}`} title={`${sl.name}: 16:9 slide`} exportName={`use-stationery-slide-${n + 1}-${sl.key}`}>
      <Body idp={idp} />
    </Art>
  );
}

// The five slides stepped back along the up-right diagonal, like cards in a file.
export function Deck() {
  const idp = 'use-stationery-deck';
  const K = 0.4, X = 60, Y = 540, DX = 200, DY = 120;
  return (
    <Art viewBox="0 0 1560 960" title="Slide deck: five slides stepped back along the diagonal" exportName="use-stationery-deck">
      <BackdropG w={1560} h={960} />
      <MaterialDefs idp={idp} />
      <defs>
        <clipPath id={`${idp}-clip`}>
          <rect width={SW} height={SH} rx="10" />
        </clipPath>
      </defs>
      <ShadowG idp={`${idp}-s`} cx={800} cy={920} rx={720} tone="blue" />
      <AxisG points={[0, 1, 2, 3, 4].map((i) => [X + 320 + i * DX, Y + 180 - i * DY])} />
      {SLIDES.map((sl, i) => ({ sl, i })).reverse().map(({ sl, i }) => {
        const Body = sl.C;
        return (
          <LayerG key={sl.key} i={4 - i} dx={i * DX} dy={-i * DY}>
            <g transform={`translate(${X} ${Y})`}>
              <rect x="8" y="12" width={SW * K} height={SH * K} rx="4" fill={C.ink} opacity="0.2" filter={`url(#${idp}-soft)`} />
              <rect x="2.4" y="3.6" width={SW * K} height={SH * K} rx="4" fill={C.edge} />
              <g transform={`scale(${K})`}>
                <g clipPath={`url(#${idp}-clip)`}>
                  <Body idp={`${idp}-s${i + 1}`} />
                </g>
              </g>
              <rect width={SW * K} height={SH * K} rx="4" fill={`url(#${idp}-shade)`} opacity="0.35" />
              <path d={`M0 ${SH * K}V0H${SW * K}`} stroke="#fff" strokeOpacity="0.8" fill="none" />
            </g>
          </LayerG>
        );
      })}
    </Art>
  );
}
