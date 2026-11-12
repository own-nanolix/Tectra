import Art from '@/components/art/Art';
import { IconUse } from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { EMPOWER } from '@/lib/brand';
import s from './lp-pricing.module.css';

const DOTS = ['#FFB83D', '#E2383B', '#E2383B'];

function Crew() {
  return (
    <Art viewBox="0 0 224 56" title="Three crew members and a plus tile" exportName="lp-pricing-crew" className={s.crew}>
      {DOTS.map((c, i) => (
        <g key={i} transform={`translate(${i * 56} 0)`}>
          <rect width="52" height="52" rx="4" fill={['#FFB83D', '#90C0F3', '#FFB83D'][i]} />
          <IconUse name="hardhat" x={14} y={13} size={24} color="#0A2E63" />
          <circle cx="26" cy="52" r="4.5" fill={c} className="pop" style={{ '--i': i }} />
        </g>
      ))}
      <rect x="168" width="52" height="52" rx="4" fill="#2F2F2F" />
      <IconUse name="plus" x={182} y={14} size={24} color="#FFFFFF" />
      <circle cx="194" cy="52" r="4.5" fill="#FFB83D" className="pop" style={{ '--i': 3 }} />
    </Art>
  );
}

// The statement line: "We empower construction teams with tools that improve [crew] efficiency, enhance collaboration".
export default function Empower() {
  return (
    <section className={`wrap ${s.empower}`} aria-label="Statement">
      <Reveal>
        <h2 className={`t-display t-center ${s.eHead}`}>
          <span className={s.eLine}>{EMPOWER[0]}</span>
          <span className={s.eLine}>
            {EMPOWER[1]} <Crew /> {EMPOWER[2]}
          </span>
          <span className={s.eLine}>{EMPOWER[3]}</span>
        </h2>
      </Reveal>
    </section>
  );
}
