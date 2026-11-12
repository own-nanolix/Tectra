import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import IconSheet from '@/components/pages/icons/IconSheet';
import Construction from '@/components/pages/icons/Construction';
import InUse from '@/components/pages/icons/InUse';
import Illustrations from '@/components/pages/icons/Illustrations';
import s from '@/components/pages/icons/icons.module.css';

export const metadata = pageMeta('icons');

const SPEC = ['24 px grid', '1.5 px stroke', 'Round caps and joins', '2 px margin'];

export default function Page() {
  return (
    <section className="page" id="p-icons" aria-label="Icons and illustration">
      <header className={`wrap ${s.head}`}>
        <div className={s.headIn}>
          <h1 tabIndex={-1} className="t-h1">Icons and illustration</h1>
          <p className="t-lead muted" style={{ marginTop: 16, maxWidth: 720 }}>
            32 icons drawn on one grid and one stroke, how two of them are built, four places they sit in the app, and three illustrations in the same line.
          </p>
          <div className={s.spec} style={{ marginTop: 20 }}>
            {SPEC.map((t) => (
              <span className="chip chip-sm" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </header>

      <div className={`wrap ${s.section}`} style={{ paddingTop: 0 }}>
        <div className={s.sectionHead}>
          <h2 className="t-h2">Icon set</h2>
          <p className="t-small">Click an icon to copy its name.</p>
        </div>
        <Reveal><IconSheet /></Reveal>
      </div>

      <div className={`wrap ${s.section}`}>
        <div className={s.sectionHead}>
          <h2 className="t-h2">Construction</h2>
          <p className="t-small">Pin and hardhat on the 24 px grid, shown at 16, 24, 32 and 48 px.</p>
        </div>
        <Reveal><Construction /></Reveal>
      </div>

      <div className={`wrap ${s.section}`}>
        <div className={s.sectionHead}>
          <h2 className="t-h2">In use</h2>
          <p className="t-small">Rebuilt from the app screens.</p>
        </div>
        <Reveal><InUse /></Reveal>
      </div>

      <div className={`wrap ${s.section}`}>
        <div className={s.sectionHead}>
          <h2 className="t-h2">Illustration</h2>
          <p className="t-small">Thin outlines, 1 to 1.2 px, on light and on dark.</p>
        </div>
        <Reveal><Illustrations /></Reveal>
      </div>
    </section>
  );
}
