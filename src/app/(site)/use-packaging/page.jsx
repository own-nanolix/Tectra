import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { TapeRoll, TapeStrips, ROLL_CFG } from '@/components/pages/use-packaging/Tape';
import { ShipBox, BOX_CFG } from '@/components/pages/use-packaging/Boxes';
import { ProductBox, PRODUCT_CFG } from '@/components/pages/use-packaging/ProductBoxes';
import { Bag, BAG_CFG } from '@/components/pages/use-packaging/Bags';
import { Tissue, Seals, Label, LABEL_CFG } from '@/components/pages/use-packaging/Paper';
import s from '@/components/pages/use-packaging/use-packaging.module.css';

export const metadata = pageMeta('use-packaging');

const rollName = Object.fromEntries(ROLL_CFG.map((c) => [c.key, c.name]));
const labelName = { white: 'Shipping label', yellow: 'Shipping label, yellow edge' };
const bagName = { white: 'Shopping bag, white', blue: 'Shopping bag, blue', yellow: 'Shopping bag, yellow' };
const productName = { hardhat: 'Product box, hard hat', tablet: 'Product box, site tablet' };

// Every plate: [column class, caption, node]
const STAGES = [
  {
    name: 'Tape',
    plates: [
      ...ROLL_CFG.map((cfg) => [s.c4, rollName[cfg.key], <TapeRoll key={cfg.key} idp={`use-packaging-roll-${cfg.key}`} cfg={cfg} />]),
      [s.c4, 'Tape strips', <TapeStrips key="strips" />],
    ],
  },
  {
    name: 'Shipping boxes',
    plates: BOX_CFG.map((cfg, i) => [s.c6, cfg.name, <ShipBox key={cfg.key} idp={`use-packaging-box-${cfg.key}`} cfg={cfg} lit={i === 0} />]),
  },
  {
    name: 'Product boxes',
    plates: PRODUCT_CFG.map((cfg) => [s.c6, productName[cfg.key], <ProductBox key={cfg.key} idp={`use-packaging-product-box-${cfg.key}`} cfg={cfg} />]),
  },
  {
    name: 'Shopping bags',
    plates: BAG_CFG.map((cfg, i) => [`${s.c4} ${i === 1 ? s.offset : ''}`, bagName[cfg.key], <Bag key={cfg.key} idp={`use-packaging-bag-${cfg.key}`} cfg={cfg} />]),
  },
  {
    name: 'Tissue, seal and label',
    plates: [
      [s.c7, 'Tissue paper and seal', <Tissue key="tissue" />],
      [`${s.c5} ${s.offset}`, 'Seal stickers', <Seals key="seals" />],
      [s.c5, labelName.white, <Label key="lw" cfg={LABEL_CFG[0]} />],
      [`${s.c7}`, labelName.yellow, <Label key="ly" cfg={LABEL_CFG[1]} />],
    ],
  },
];

export default function Page() {
  return (
    <section className="page" id="p-use-packaging" aria-label="Packaging">
      <div className="wrap">
        <header className={s.head}>
          <Reveal><h1 tabIndex={-1} className="t-h1">Packaging</h1></Reveal>
          <Reveal delay={90}><p className={`t-lead ${s.lead}`}>Build Smarter, Build Faster with Tectra</p></Reveal>
        </header>

        <ol className={s.rail} aria-label="Shipping line">
          {STAGES.map((st, i) => (
            <li key={st.name}>
              <span className={s.railName}>{st.name}</span>
              {i < STAGES.length - 1 && <span className={s.arrow} aria-hidden="true" style={{ animationDelay: `${i * 140 + 200}ms` }} />}
            </li>
          ))}
        </ol>

        <ol className={s.flow}>
          {STAGES.map((st) => (
            <li key={st.name} className={s.stage}>
              <Reveal><h2 className="t-h3">{st.name}</h2></Reveal>
              <div className={s.row}>
                {st.plates.map(([col, cap, node], i) => (
                  <Reveal key={cap} delay={i * 80} className={`${col} ${s.plate}`}>
                    <figure className={`mock ${s.fig}`}>
                      {node}
                      <figcaption className="mock-cap"><span>{cap}</span></figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
