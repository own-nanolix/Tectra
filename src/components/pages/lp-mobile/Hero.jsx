import Art from '@/components/art/Art';
import { PhoneG, ScreenHomeG } from '@/components/art/Devices';
import LandingNav from '@/components/ui/LandingNav';
import Chip from '@/components/ui/Chip';
import { Hl } from '@/components/ui/Card';
import { HEADINGS } from '@/lib/brand';
import { ScreenCardsG, ScreenCutFillG, StepBarG } from './screens';
import s from './lp-mobile.module.css';

const PH = 300;
const PHONES = [
  { x: 90, y: 170, name: 'home', Screen: ScreenHomeG },
  { x: 450, y: 85, name: 'cards', Screen: ScreenCardsG },
  { x: 810, y: 0, name: 'cutfill', Screen: ScreenCutFillG },
];

// Hero: the headline above, then three phones in a stepped row, each higher than the last, with step bars.
export default function Hero() {
  const h = HEADINGS.mobile;
  return (
    <header className={s.hero}>
      <LandingNav current="lp-mobile" tone="light" />
      <div className={`wrap ${s.heroHead}`}>
        <Chip>{h.chip}</Chip>
        <h1 tabIndex={-1} className={`t-display t-center t-balance ${s.h1}`}>
          <Hl text={h.text} hl={h.hl} />
        </h1>
      </div>
      <div className={`wrap ${s.heroStage}`}>
        <div className={s.scroll}>
          <Art viewBox="0 0 1200 850" title="Three phones in a stepped row: dashboard, task monitoring and Cut and Fill" exportName="lp-mobile-phones" className={s.heroArt}>
            {PHONES.map((p, i) => (
              <g key={p.name}>
                <g className={s.rise} style={{ '--i': i }}>
                  <PhoneG idp={`lp-mobile-hero-${p.name}`} x={p.x} y={p.y} w={PH}>
                    <p.Screen idp={`lp-mobile-hero-${p.name}`} />
                  </PhoneG>
                </g>
                <StepBarG x={p.x} y={p.y + 646} w={PH} on={i + 1} delay={4 + i * 2} />
              </g>
            ))}
          </Art>
        </div>
      </div>
    </header>
  );
}
