import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Scene from '@/components/pages/use-apparel/Scene';
import { ShirtView, SHIRTS } from '@/components/pages/use-apparel/Shirts';
import { HoodieView, HOODIES } from '@/components/pages/use-apparel/Hoodies';
import { CapView, CAPS } from '@/components/pages/use-apparel/Caps';
import Spec, { SPEC_ROWS } from '@/components/pages/use-apparel/Spec';
import { CW } from '@/components/pages/use-apparel/parts';
import s from '@/components/pages/use-apparel/use-apparel.module.css';

export const metadata = pageMeta('use-apparel');

const Plate = ({ children, cap }) => (
  <figure style={{ margin: 0 }}>
    <div className={`mock ${s.plate}`}>{children}</div>
    <figcaption className="mock-cap">
      <span>{cap}</span>
    </figcaption>
  </figure>
);

export default function Page() {
  return (
    <section className="page" id="p-use-apparel" aria-label="Apparel">
      <div className="wrap">
        <header className={s.head}>
          <h1 tabIndex={-1} className="t-h1">Apparel</h1>
        </header>

        <Reveal>
          <Plate cap="Collection"><Scene /></Plate>
        </Reveal>

        <section className={s.section} aria-labelledby="use-apparel-h-shirts">
          <div className={s.sectionHead}><h2 id="use-apparel-h-shirts" className="t-h3">T-shirts</h2></div>
          <div className={s.pairs}>
            {SHIRTS.map((it, i) => (
              <Reveal key={it.id} delay={i * 80} className={i === 0 ? s.pair : i === 1 ? s.pairB : s.pairC}>
                <div className={s.pairDuo}>
                  <Plate cap={`${it.name.replace(/, .*/, '')}, front`}><ShirtView item={it} view="front" /></Plate>
                  <Plate cap={`${it.name.replace(/, .*/, '')}, back`}><ShirtView item={it} view="back" /></Plate>
                </div>
              </Reveal>
            ))}
            <Reveal className={s.swatches}>
              <h3 className="t-title">Colourways</h3>
              {Object.values(CW).map((c) => (
                <div key={c.name} className={s.swatchRow}>
                  <span className={s.swatchDot} style={{ background: c.fill }} />
                  <span className="t-body">{c.name}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className={s.section} aria-labelledby="use-apparel-h-hoodies">
          <div className={s.sectionHead}><h2 id="use-apparel-h-hoodies" className="t-h3">Hoodies</h2></div>
          <div className={s.hoods}>
            <Reveal className={s.hoodBig}>
              <Plate cap="Hoodie"><HoodieView item={HOODIES[0]} /></Plate>
            </Reveal>
            <div className={s.hoodSide}>
              {HOODIES.slice(1).map((it, i) => (
                <Reveal key={it.id} delay={(i + 1) * 100}>
                  <Plate cap="Hoodie"><HoodieView item={it} /></Plate>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={s.section} aria-labelledby="use-apparel-h-caps">
          <div className={s.sectionHead}><h2 id="use-apparel-h-caps" className="t-h3">Caps</h2></div>
          <div className={s.caps}>
            {CAPS.map((it, i) => (
              <Reveal key={it.id} delay={i * 80}>
                <Plate cap="Cap"><CapView item={it} /></Plate>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={s.section} aria-labelledby="use-apparel-h-spec">
          <div className={s.sectionHead}><h2 id="use-apparel-h-spec" className="t-h3">Print specification</h2></div>
          <div className={s.specWrap}>
            <Reveal>
              <Plate cap="Print specification"><Spec /></Plate>
            </Reveal>
            <Reveal delay={120}>
              <dl className={s.ledger}>
                {SPEC_ROWS.map((r) => (
                  <div key={r.place} className={s.ledgerRow}>
                    <dt>{r.place}</dt>
                    <dd className={s.figure}>{r.size[0]} x {r.size[1]} mm</dd>
                    <dd className="t-small">{r.from}</dd>
                    <dd className="t-small">{r.art}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>
      </div>
    </section>
  );
}
