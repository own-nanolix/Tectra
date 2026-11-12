import Link from 'next/link';
import Icon from '@/components/site/Icon';
import Art from '@/components/art/Art';
import { PinG } from '@/components/art/KeyArt';
import LandingNav from '@/components/ui/LandingNav';
import { HERO, KOMATSU } from '@/lib/brand';
import HeroArt from './HeroArt';
import s from './s';

// Four hard-hat tiles with a status dot each (yellow, red, red, yellow), as in the case study. No people.
const STATUS = ['yellow', 'red', 'red', 'yellow'];

export function HatTiles() {
  return (
    <div className={`avatars ${s.hats}`} role="img" aria-label="Four site workers">
      {STATUS.map((st, i) => (
        <span key={i} className={`avatar ${s.hat}`} data-status={st === 'red' ? 'red' : undefined} style={{ '--i': i }} aria-hidden="true">
          <Icon name="hardhat" size={26} />
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <header className={`field ${s.hero}`}>
      <LandingNav current="lp-home" className={s.heroNav} />
      <div className={s.copy}>
        <h1 tabIndex={-1} className={s.title}>
          {HERO.title.map((t, i) => (
            <span key={t} className={s.line}>
              <span style={{ '--i': i }}>{t}</span>
            </span>
          ))}
        </h1>
        <p className={s.sub}>{HERO.sub}</p>
        <div className={s.ctas}>
          <Link href="/dashboard/" className={`btn ${s.heroBtn}`}>{HERO.cta[0]}</Link>
          <Link href="/lp-progress/" className={`btn btn-sky ${s.heroBtn}`}>{HERO.cta[1]}</Link>
        </div>
        <HatTiles />
      </div>
      <div className={s.stage}>
        <HeroArt />
        <div className={`glass ${s.komatsu}`}>
          <p className={s.kHead}>
            <span>{KOMATSU.name}</span>
            <Icon name="arrow-right" size={18} />
          </p>
          <p className={s.kDates}>{KOMATSU.dates}</p>
          <p className={s.kValue}>{KOMATSU.value}</p>
          <Art viewBox="-18 -18 36 36" title="Active work pin" exportName="lp-home-hero-pin" decorative className={s.kPin}>
            <g className="pop" style={{ '--i': 12 }}>
              <PinG r={13} tone="yellow" pulse />
            </g>
          </Art>
        </div>
      </div>
    </header>
  );
}
