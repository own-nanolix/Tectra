import { pageMeta } from '@/lib/pages';
import { Plate } from '@/components/pages/use-product/parts';
import { HatHero, HatFrontArt, HatSideArt, HatExplodedArt } from '@/components/pages/use-product/HardHat';
import { TabletArt, TabletExplodedArt } from '@/components/pages/use-product/Tablet';
import { CardArt, WAYS } from '@/components/pages/use-product/Cards';
import { CaseArt } from '@/components/pages/use-product/Case';
import { TrioArt } from '@/components/pages/use-product/DeviceTrio';
import { IconArt, IconLadderArt, SIZES } from '@/components/pages/use-product/Icons';
import s from '@/components/pages/use-product/use-product.module.css';

export const metadata = pageMeta('use-product');

export default function Page() {
  return (
    <section className="page" id="p-use-product" aria-label="Product">
      <div className="wrap">
        <header className={s.head}>
          <h1 tabIndex={-1} className="t-h1">Product</h1>
        </header>

        <div className={s.sec} style={{ marginTop: 0 }}>
          <h2 className="t-h3">Hard hat</h2>
          <Plate caption="Hard hat, three-quarter">
            <HatHero />
          </Plate>
          <div className={s.hatRow}>
            <Plate caption="Hard hat, exploded" note="Shell, brand band, suspension harness">
              <HatExplodedArt />
            </Plate>
            <div className={s.stack}>
              <Plate caption="Front" delay={80}>
                <HatFrontArt />
              </Plate>
              <Plate caption="Side" delay={160}>
                <HatSideArt />
              </Plate>
            </div>
          </div>
        </div>

        <div className={s.sec}>
          <h2 className="t-h3">Site tablet and access card</h2>
          <div className={s.benchRow}>
            <div className={s.stack}>
              <Plate caption="Site tablet">
                <TabletArt />
              </Plate>
              <Plate caption="Site tablet, exploded" delay={80}>
                <TabletExplodedArt />
              </Plate>
            </div>
            <div className={s.cards}>
              {Object.keys(WAYS).map((k, i) => (
                <Plate key={k} caption={`Access card, ${WAYS[k].name.toLowerCase()}`} note="Front, back" delay={i * 90}>
                  <CardArt k={k} />
                </Plate>
              ))}
            </div>
          </div>
          <Plate caption="Site tablet in its case, with charging cable" note="Base, tablet and cable, lid">
            <CaseArt />
          </Plate>
        </div>

        <div className={s.sec}>
          <h2 className="t-h3">Tablet, phone and watch</h2>
          <Plate caption="Tablet, phone and watch">
            <TrioArt />
          </Plate>
        </div>

        <div className={s.sec}>
          <h2 className="t-h3">App icon</h2>
          <div className={s.iconRow}>
            <Plate caption="App icon, 16 to 256 px">
              <IconLadderArt />
            </Plate>
            <div className={s.sizes}>
              {SIZES.map((sz) => (
                <div key={sz} className={s.size}>
                  <IconArt size={sz} />
                  <span className={s.sizeCap}>{sz} px</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
