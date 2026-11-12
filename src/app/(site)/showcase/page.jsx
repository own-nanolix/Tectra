import { pageMeta } from '@/lib/pages';
import Plate from '@/components/pages/showcase/Plate';
import SceneLaptop from '@/components/pages/showcase/SceneLaptop';
import SceneLineup from '@/components/pages/showcase/SceneLineup';
import ScenePhone from '@/components/pages/showcase/ScenePhone';
import SceneStage from '@/components/pages/showcase/SceneStage';
import s from '@/components/pages/showcase/showcase.module.css';

export const metadata = pageMeta('showcase');

export default function Page() {
  return (
    <section className="page" id="p-showcase" aria-label="Showcase">
      <div className={`wrap ${s.head}`}>
        <h1 tabIndex={-1} className={`t-h1 ${s.title}`}>Showcase</h1>
      </div>
      <div className={`wrap ${s.stack}`}>
        <Plate n={1} name="Phone with data cards" side="left">
          <ScenePhone />
        </Plate>
        <Plate n={2} name="Line-up of 8 phones" side="right">
          <SceneLineup />
        </Plate>
        <Plate n={3} name="Laptop on a plinth" side="left" width="narrow">
          <SceneLaptop />
        </Plate>
        <Plate n={4} name="Event stage" side="right">
          <SceneStage />
        </Plate>
      </div>
    </section>
  );
}
