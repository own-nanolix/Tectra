import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { bagPlates } from '@/components/pages/use-accessories/Bags';
import { drinkPlates, cupPlates } from '@/components/pages/use-accessories/Drinkware';
import { smallPlates, patchPlates, keychainPlates } from '@/components/pages/use-accessories/Small';
import { deskPlates } from '@/components/pages/use-accessories/Desk';
import { outdoorPlates } from '@/components/pages/use-accessories/Outdoor';
import { giftPlates } from '@/components/pages/use-accessories/Gift';
import s from '@/components/pages/use-accessories/use-accessories.module.css';

export const metadata = pageMeta('use-accessories');

const ALL = [...bagPlates, ...drinkPlates, ...cupPlates, ...smallPlates, ...patchPlates, ...keychainPlates, ...deskPlates, ...outdoorPlates, ...giftPlates];
const BY_ID = Object.fromEntries(ALL.map((p) => [p.id, p]));

// Rows of the catalogue: [id, columns of 12]. No two rows are built the same way.
const ROWS = [
  [['tote-a', 3], ['tote-b', 3], ['mug-a', 6]],
  [['mug-b', 6], ['bottle-a', 3], ['bottle-b', 3]],
  [['stickers', 4], ['pins', 4], ['keychain', 4]],
  [['patch-a', 3], ['patch-b', 3], ['patch-c', 3], ['patch-d', 3]],
  [['desk-mat', 8], ['mouse-pad', 4]],
  [['cup-sleeve', 3], ['coasters', 6], ['socks', 3]],
  [['umbrella', 4], ['gift-carrier', 8]],
  [['gift-front', 6], ['gift-back', 6]],
];

export default function Page() {
  return (
    <section className="page" id="p-use-accessories" aria-label="Accessories">
      <div className="wrap">
        <header className={s.head}>
          <h1 tabIndex={-1} className="t-h1">Accessories</h1>
          <p className="t-lead muted">Each object is pulled apart along one axis.</p>
        </header>
        <h2 className="sr-only">Catalogue</h2>
        <div className={s.grid}>
          {ROWS.flat().map(([id, span], n) => {
            const p = BY_ID[id];
            return (
              <Reveal as="figure" key={id} delay={(n % 4) * 60} className={`${s.cell} ${s['c' + span]}`}>
                <div className={`mock ${s.plate}`}>{p.node}</div>
                <figcaption className="mock-cap">
                  <span>{p.caption}</span>
                </figcaption>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
