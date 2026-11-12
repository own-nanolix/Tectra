import Art from '@/components/art/Art';
import { HEADINGS, HEX, KPI, PROBLEM, QUOTES } from '@/lib/brand';
import { wrapHl } from './typoData';
import s from './typography.module.css';

// The type habits of the case study (SOURCE.md, "Type"), each shown on a line the case study prints.
// Every plate is its own exportable SVG on the same 560 by 360 artboard.
const W = 560;
const H = 360;

function Plate({ id, title, label, children }) {
  return (
    <figure className={s.habit}>
      <Art viewBox={`0 0 ${W} ${H}`} title={title} exportName={`typography-habit-${id}`}>
        <rect width={W} height={H} rx="6" fill={HEX.tile} />
        {children}
      </Art>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

// A small leader note in Blue ink.
function Note({ x, y, ax, ay, text }) {
  return (
    <g className="fade-in" style={{ '--i': 4 }}>
      <path d={`M${ax} ${ay}L${x - 6} ${y - 5}`} stroke={HEX.blueInk} strokeWidth="1" fill="none" />
      <circle cx={ax} cy={ay} r="3.5" fill={HEX.blueInk} />
      <text x={x} y={y} fontSize="15" fontWeight="500" fill={HEX.blueInk}>{text}</text>
    </g>
  );
}

function OnePhrase() {
  const h = HEADINGS.insights;
  const lines = wrapHl(h.text, h.hl, 22);
  return (
    <Plate id="one-phrase" title="Habit: one phrase per heading in Tectra Blue" label="One phrase per heading or quote is set in Tectra Blue.">
      <text fontSize="40" fontWeight="300" fill={HEX.ink} letterSpacing="-0.4" style={{ whiteSpace: 'pre' }} className="slide-up">
        {lines.map((ln, k) => (
          <tspan key={k} x="40" y={92 + k * 50}>
            {ln.map((p, j) => (p.hl ? <tspan key={j} fill={HEX.blue}>{p.t}</tspan> : <tspan key={j}>{p.t}</tspan>))}
          </tspan>
        ))}
      </text>
      <Note x={346} y={40} ax={330} ay={60} text="One phrase only" />
    </Plate>
  );
}

function OpenQuote() {
  const w = QUOTES.live.text.split(' ');
  return (
    <Plate id="open-quote" title="Habit: quotes open with a straight double quote and have no closing quote" label="Quotes open with a straight double quote and do not close.">
      <text x="40" y="150" fontSize="38" fontWeight="300" fill={HEX.ink} className="slide-up">{w.slice(0, 3).join(' ')}</text>
      <text x="40" y="200" fontSize="38" fontWeight="300" fill={HEX.ink} className="slide-up" style={{ '--i': 1 }}>
        {w.slice(3, 5).join(' ')}
      </text>
      <rect x="35" y="114" width="18" height="44" rx="2" fill="none" stroke={HEX.blue} strokeWidth="1.5" strokeDasharray="4 4" className="pop" style={{ '--i': 2 }} />
      <Note x={84} y={74} ax={44} ay={112} text="Straight quote, no closing mark" />
    </Plate>
  );
}

function Figures() {
  const k = KPI.details;
  return (
    <Plate id="figures" title="Habit: numbers are Light and large, percent signs full size" label="Numbers are Light and large; the percent sign is full size.">
      <text x="40" y="210" fontSize="150" fontWeight="300" fill={HEX.ink} letterSpacing="-3" className="slide-up">{k.value}</text>
      <text x="44" y="262" fontSize="20" fontWeight="400" fill={HEX.muted}>{k.label}</text>
      <text x="130" y="262" fontSize="20" fontWeight="400" fill={HEX.ink}>{k.trend}</text>
      <path d="M206 258l7 -11l7 11z" fill={HEX.yellow} />
      <Note x={360} y={120} ax={330} ay={150} text="% at full size" />
    </Plate>
  );
}

function Cases() {
  const rows = [
    { t: HEADINGS.problem.text, size: 20, w: 300, note: 'Title Case: section headings' },
    { t: PROBLEM.split(',').slice(0, 2).join(','), size: 22, w: 300, note: 'Sentence case: body and cards' },
    { t: 'RESOURCES', size: 13, w: 500, note: 'Upper case: footer column heads only', ls: 0.5 },
  ];
  return (
    <Plate id="case" title="Habit: sentence case for body and cards, Title Case for section headings, upper case only for footer heads" label="Sentence case for body and cards, Title Case for headings, upper case only for footer heads.">
      {rows.map((r, i) => (
        <g key={r.note} className="slide-up" style={{ '--i': i }}>
          <text x="40" y={84 + i * 100} fontSize={r.size} fontWeight={r.w} fill={HEX.ink} letterSpacing={r.ls || 0}>{r.t}</text>
          <text x="40" y={114 + i * 100} fontSize="14" fontWeight="500" fill={HEX.blueInk}>{r.note}</text>
          {i < rows.length - 1 && <line x1="40" x2={W - 40} y1={138 + i * 100} y2={138 + i * 100} stroke={HEX.app} />}
        </g>
      ))}
    </Plate>
  );
}

export default function Habits() {
  return (
    <div className={s.habits}>
      <OnePhrase />
      <OpenQuote />
      <Figures />
      <Cases />
    </div>
  );
}
