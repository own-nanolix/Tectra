import Link from 'next/link';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { Hl } from '@/components/ui/Card';
import { FEATURES, EFFICIENCY } from '@/lib/brand';
import FeatureMonitor from './FeatureMonitor';
import s from './s';

export default function Features() {
  return (
    <section className={`wrap ${s.section} ${s.featSec}`} aria-labelledby="lp-home-features-h">
      <Reveal>
        <h2 id="lp-home-features-h" className={`${s.h2} ${s.h2Feat}`}>
          <Hl text={FEATURES.heading} hl={FEATURES.hl} />
        </h2>
        <p className={s.subline}>{FEATURES.sub}</p>
      </Reveal>
      <div className={s.featGrid}>
        <Reveal className={s.featTile} from="left">
          <FeatureMonitor />
          <div className={s.featBtns}>
            <Link href="/dashboard/" className={`btn btn-white ${s.demoBtn}`}>{FEATURES.demo}</Link>
            <Link href="/dashboard/" className={`btn btn-white btn-icon ${s.demoBtn} ${s.demoNext}`} aria-label="Open the dashboard">
              <Icon name="chevron-right" size={22} />
            </Link>
          </div>
        </Reveal>
        <div className={s.featSide}>
          <ol className={s.rows}>
            {FEATURES.rows.map(([title, text], i) => (
              <Reveal as="li" key={title} delay={i * 80} className={s.row}>
                <span className={s.rowNum}>{i + 1}</span>
                <h3 className={s.rowTitle}>{title}</h3>
                <p className={s.rowText}>{text}</p>
              </Reveal>
            ))}
          </ol>
          <div className={s.featFoot}>
            <Reveal as="p" className={s.note}>{FEATURES.note}</Reveal>
            <Reveal delay={120} from="scale" className={`field-yellow ${s.eff}`}>
              <p className={s.effValue}>{EFFICIENCY.value}</p>
              <p className={s.effLabel}>{EFFICIENCY.label}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
