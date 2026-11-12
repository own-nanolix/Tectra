import { pageMeta } from '@/lib/pages';
import Billboard from '@/components/pages/use-world/Billboard';
import Citylight from '@/components/pages/use-world/Citylight';
import Rollups from '@/components/pages/use-world/Rollups';
import Reception from '@/components/pages/use-world/Reception';
import Vehicle from '@/components/pages/use-world/Vehicle';
import Container from '@/components/pages/use-world/Container';
import s from '@/components/pages/use-world/use-world.module.css';

export const metadata = pageMeta('use-world');

export default function Page() {
  return (
    <section className="page" id="p-use-world" aria-label="In the world">
      <div className={`wrap ${s.head}`}>
        <h1 tabIndex={-1} className="t-h1">
          In the world
        </h1>
      </div>

      <section className={s.floor} aria-labelledby="use-world-h-billboard">
        <h2 className={s.name} id="use-world-h-billboard">
          Billboard
        </h2>
        <div className={`mock ${s.plate}`}>
          <Billboard />
        </div>
      </section>

      <section className={s.floor} aria-labelledby="use-world-h-citylight">
        <h2 className={s.name} id="use-world-h-citylight">
          Citylight and roll-up banners
        </h2>
        <div className={s.pair}>
          <div className={`mock ${s.plate}`}>
            <Citylight />
          </div>
          <div className={`mock ${s.plate}`}>
            <Rollups />
          </div>
        </div>
      </section>

      <section className={s.floor} aria-labelledby="use-world-h-reception">
        <h2 className={s.name} id="use-world-h-reception">
          Reception signage
        </h2>
        <div className={`mock ${s.plate}`}>
          <Reception />
        </div>
      </section>

      <section className={s.floor} aria-labelledby="use-world-h-vehicle">
        <h2 className={s.name} id="use-world-h-vehicle">
          Vehicle wrap
        </h2>
        <div className={s.stack}>
          <div className={`mock ${s.plate}`}>
            <Vehicle />
          </div>
          <div className={`mock ${s.plate}`}>
            <Container />
          </div>
        </div>
      </section>
    </section>
  );
}
