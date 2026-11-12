'use client';

import { motion } from 'framer-motion';
import Art from '@/components/art/Art';
import { PhoneG, ScreenHomeG } from '@/components/art/Devices';
import { GaugeG } from '@/components/art/KeyArt';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { Trend } from '@/components/ui/Chip';
import { Segmented } from '@/components/ui/Toggle';
import { KPI, PALM, PLANS } from '@/lib/brand';
import { ease } from '@/lib/motion';
import s from './s';

// The three app cards around the phone, at the reference positions (percent of the stage).
const CARDS = [
  { key: 'notes', k: KPI.notes, cls: 'cardNotes', arrow: true },
  { key: 'material', k: KPI.material, cls: 'cardMaterial', arrow: true },
  { key: 'details', k: KPI.details, cls: 'cardDetails', arrow: true },
];

function AppCard({ k, name, arrow }) {
  return (
    <div className={`card-app ${s.appCard}`}>
      <div className="card-head">
        <p className={`t-title ${s.cardTitle}`}>{k.label}</p>
        {arrow && <Icon name="arrow-up-right" size={16} />}
      </div>
      <Trend dir={k.dir} className={s.cardTrend}>{k.trend}</Trend>
      <p className={s.cardFigure}>{k.value}</p>
      <Art viewBox="0 0 340 236" title={`${k.label} gauge at ${k.value}`} exportName={`lp-home-palm-gauge-${name}`} decorative className={s.gauge} preserveAspectRatio="xMaxYMax slice">
        <GaugeG w={340} h={236} r={150} value={parseInt(k.value, 10) / 100} tone={k.tone} draw />
      </Art>
    </div>
  );
}

export default function Palm() {
  return (
    <section className={`wrap ${s.section}`} aria-labelledby="lp-home-palm-h">
      <Reveal className={s.center}>
        <h2 id="lp-home-palm-h" className={`${s.h2} ${s.h2Palm}`}>{PALM.heading}</h2>
        <p className={s.subline}>{PALM.sub}</p>
        <Segmented id="lp-home-billing-2" label="Billing period" options={PLANS.toggle} className={`${s.seg} ${s.segRow}`} />
      </Reveal>
      <div className={s.palm}>
        {CARDS.map((c, i) => (
          <motion.div
            key={c.key}
            className={`${s.floater} ${s[c.cls]}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.9, ease: ease.out, delay: 0.25 + i * 0.18 }}
          >
            <div className={s.drift} style={{ '--d': `${i * 1.1}s` }}>
              <AppCard k={c.k} name={c.key} arrow={c.arrow} />
            </div>
          </motion.div>
        ))}
        <motion.div
          className={s.phone}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.9, ease: ease.out }}
        >
          <Art viewBox="-4 0 438 884" title="Tectra mobile app: the blue home screen" exportName="lp-home-palm-phone">
            <PhoneG idp="lp-home-ph" w={430}>
              <ScreenHomeG idp="lp-home-ph-home" />
            </PhoneG>
          </Art>
        </motion.div>
      </div>
    </section>
  );
}
