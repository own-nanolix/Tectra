import Art from '@/components/art/Art';
import { GaugeG, TickBarsG } from '@/components/art/KeyArt';
import { IconUse } from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import Chip from '@/components/ui/Chip';
import { Hl, Who } from '@/components/ui/Card';
import { EFFICIENCY, HEADINGS, QUOTES, RESULTS } from '@/lib/brand';
import s from './lp-pricing.module.css';

const CARD_H = 136;
const CARD_GAP = 16;
const INK = '#2F2F2F';

function EfficiencyArt() {
  const lines = ['By using Tectra, teams increased', 'task efficiency and reduced', 'delays significantly'];
  return (
    <Art viewBox="0 0 640 440" title="40% task efficiency" exportName="lp-pricing-efficiency" className={s.proofArt}>
      <rect width="640" height="440" rx="4" fill="#FFB83D" />
      <TickBarsG idp="lp-pricing-eff" x={36} y={36} w={568} h={70} count={48} from={0} to={0.4} tone="white" base="#2F2F2F" rise />
      <text x="34" y="262" fontSize="150" fontWeight="300" fill={INK} letterSpacing="-3">{EFFICIENCY.value}</text>
      <text fontSize="19" fontWeight="400" fill={INK}>
        {lines.map((l, i) => (
          <tspan key={l} x="36" y={324 + i * 28}>{l}</tspan>
        ))}
      </text>
    </Art>
  );
}

function ResultsArt() {
  return (
    <Art viewBox="0 0 640 440" title="Results: task completion rates and deadlines" exportName="lp-pricing-results" className={s.proofArt}>
      {RESULTS.map((r, i) => {
        const y = i * (CARD_H + CARD_GAP);
        const id = `lp-pricing-res-${i}`;
        return (
          <g key={id} transform={`translate(0 ${y})`}>
            <clipPath id={id}>
              <rect width="640" height={CARD_H} rx="4" />
            </clipPath>
            <rect width="640" height={CARD_H} rx="4" fill="#E9E9E9" />
            <text x="24" y="40" fontSize="18" fontWeight="500" fill={INK}>{r.label}</text>
            <IconUse name="arrow-up-right" x={596} y={22} size={22} color={INK} />
            <text x="24" y="104" fontSize="52" fontWeight="300" fill={INK}>{r.value}</text>
            <path d="M126 88l9-12 9 12z" fill="#FFB83D" />
            <g clipPath={`url(#${id})`}>
              <GaugeG w={640} h={CARD_H} r={120} value={parseInt(r.value, 10) / 100} tone={r.tone} draw />
            </g>
          </g>
        );
      })}
    </Art>
  );
}

// Result: the case study's quote, the yellow 40% card and the results gauge row.
export default function Proof() {
  const q = QUOTES.result;
  return (
    <section className={`wrap ${s.proof}`} aria-labelledby="lp-pricing-proof-h">
      <Reveal className={s.proofHead}>
        <Chip>{HEADINGS.result.chip}</Chip>
        <h2 id="lp-pricing-proof-h" className={`t-quote t-balance ${s.quote}`} style={{ fontSize: 'clamp(24px, 2.2vw, 34px)' }}>
          <Hl text={q.text} hl={q.hl} />
        </h2>
        <Who name={q.name} role={q.role} initials={q.initials} />
      </Reveal>
      <div className={s.proofGrid}>
        <Reveal from="left"><EfficiencyArt /></Reveal>
        <Reveal delay={140}><ResultsArt /></Reveal>
      </div>
    </section>
  );
}
