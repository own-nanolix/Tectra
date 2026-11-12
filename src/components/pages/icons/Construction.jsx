import Art from '@/components/art/Art';
import { CORE } from '@/components/site/icons';
import { r2 } from '@/lib/charts';
import s from './icons.module.css';

const G = 16; // plate units per grid pixel
const O = 48; // plate offset
const p = (u) => r2(O + u * G);
const INK = '#2F2F2F';
const BLUE = '#4093EC';
const YELLOW = '#FFB83D';
const MUTED = '#5E5E5E';
const LINE = '#E2E2E2';
const IDX = Array.from({ length: 25 }, (_, i) => i);
const SIZES = [16, 24, 32, 48];

// Which keylines belong to which icon (grid pixels): circles are [cx, cy, r].
const PLATES = [
  { name: 'pin', title: 'Pin', circles: [[12, 11, 6], [12, 11, 2]], note: 'Head circle 12 px, inner circle 4 px' },
  { name: 'hardhat', title: 'Hardhat', circles: [[12, 16, 8]], note: 'Dome radius 8 px, brim 19 x 2.5 px' },
];

function Plate({ name, title, circles }) {
  const id = `icons-construction-${name}`;
  return (
    <Art viewBox="0 0 480 480" title={`${title} icon constructed on the 24 px grid`} exportName={id} className={s.plateSvg}>
      <rect x={p(0)} y={p(0)} width={24 * G} height={24 * G} fill="#F5F5F5" />
      <rect x={p(2)} y={p(2)} width={20 * G} height={20 * G} fill="#FFFFFF" />
      <g stroke={LINE} strokeWidth="0.6" fill="none">
        {IDX.map((i) => (
          <path key={i} d={`M${p(i)} ${p(0)}V${p(24)}M${p(0)} ${p(i)}H${p(24)}`} />
        ))}
      </g>
      <g fill="none" strokeWidth="0.9">
        <rect x={p(2)} y={p(2)} width={20 * G} height={20 * G} stroke={BLUE} strokeDasharray="5 4" />
        <circle cx={p(12)} cy={p(12)} r={10 * G} stroke={BLUE} />
        <path d={`M${p(12)} ${p(0)}V${p(24)}M${p(0)} ${p(12)}H${p(24)}M${p(2)} ${p(2)}L${p(22)} ${p(22)}M${p(22)} ${p(2)}L${p(2)} ${p(22)}`} stroke={YELLOW} />
        {circles.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}-${r}`} cx={p(cx)} cy={p(cy)} r={r * G} stroke={BLUE} strokeDasharray="2 3" />
        ))}
      </g>
      <g transform={`translate(${O} ${O}) scale(${G})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={CORE[name]} stroke={INK} strokeWidth="1.5" pathLength="1" className={s.plateIcon} />
        <path d={CORE[name]} stroke="#FFFFFF" strokeWidth="0.08" />
      </g>
      <g fontSize="11" fill={MUTED} textAnchor="middle">
        <text x={p(12)} y="30">24 px</text>
        <text x={p(1)} y={p(24) + 20}>2 px</text>
        <text x={p(12)} y={p(24) + 20}>1.5 px stroke</text>
        <text x={p(23)} y={p(24) + 20}>2 px</text>
      </g>
      <path d={`M${p(0)} 38H${p(24)}M${p(0)} 34v8M${p(24)} 34v8`} stroke={MUTED} strokeWidth="0.8" fill="none" />
      <path d={`M${p(0)} ${p(24) + 8}H${p(2)}M${p(22)} ${p(24) + 8}H${p(24)}`} stroke={MUTED} strokeWidth="0.8" fill="none" />
    </Art>
  );
}

function Sizes({ name }) {
  const items = SIZES.map((sz, i) => ({ sz, x: 8 + SIZES.slice(0, i).reduce((a, b) => a + b + 20, 0) }));
  return (
    <Art viewBox="0 0 208 88" title={`${name} icon at 16, 24, 32 and 48 px`} exportName={`icons-sizes-${name}`} className={s.sizesSvg}>
      <rect width="208" height="88" fill="#FFFFFF" />
      {items.map(({ sz, x: ix }) => (
        <g key={sz}>
          <g transform={`translate(${ix} ${12 + 48 - sz}) scale(${r2(sz / 24)})`} fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={CORE[name]} />
          </g>
          <text x={ix + sz / 2} y="80" fontSize="10" fill={MUTED} textAnchor="middle">{sz}</text>
        </g>
      ))}
    </Art>
  );
}

const RULES = [
  ['Grid', '24 x 24 px'],
  ['Safe margin', '2 px on every side, live area 20 x 20 px'],
  ['Stroke', '1.5 px, no fills'],
  ['Caps and joins', 'Round'],
  ['Sizes shown', '16, 24, 32 and 48 px'],
];

export default function Construction() {
  return (
    <>
      <dl className={s.rules}>
        {RULES.map(([k, v]) => (
          <div key={k} className={s.rule}>
            <dt className="t-label">{k}</dt>
            <dd className="t-body" style={{ margin: 0 }}>{v}</dd>
          </div>
        ))}
      </dl>
      <Plates />
    </>
  );
}

function Plates() {
  return (
    <div className={s.plates}>
      {PLATES.map((pl) => (
        <figure className={s.plate} key={pl.name} style={{ margin: 0 }}>
          <Plate {...pl} />
          <Sizes name={pl.name} />
          <figcaption className={s.plateCap}>
            <span className="t-title">{pl.title}</span>
            <span className="t-small">{pl.note}</span>
          </figcaption>
          <div className={s.legend}>
            <span style={{ color: 'var(--blue-ink)' }}><i className={s.sw} /> Safe margin and key circles</span>
            <span style={{ color: 'var(--yellow-ink)' }}><i className={s.sw} /> Centre lines and diagonals</span>
            <span style={{ color: INK }}><i className={s.sw} /> 1.5 px stroke</span>
          </div>
        </figure>
      ))}
    </div>
  );
}
