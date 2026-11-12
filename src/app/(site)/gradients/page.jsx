import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Library from '@/components/pages/gradients/Library';
import Grain from '@/components/pages/gradients/Grain';
import KeyPlates from '@/components/pages/gradients/KeyPlates';
import Motion from '@/components/pages/gradients/Motion';
import { FieldAnatomy, FadeAnatomy } from '@/components/pages/gradients/Anatomy';
import s from '@/components/pages/gradients/gradients.module.css';

export const metadata = pageMeta('gradients');

export default function Page() {
  return (
    <section className="page" id="p-gradients" aria-label="Gradients and key art">
      <div className={`wrap ${s.head}`}>
        <Reveal>
          <h1 tabIndex={-1} className="t-display">
            Almost flat, with <span className="hl">six gradients</span>
          </h1>
          <p className="t-lead muted" style={{ maxWidth: 760, marginTop: 20 }}>
            Bars that fade downward, a glass panel, a white area fill and one soft blue field. Everything below is an SVG.
          </p>
        </Reveal>
      </div>

      <div className="wrap">
        <h2 className="t-h2" style={{ marginBottom: 28 }}>Library</h2>
        <Library />
      </div>

      <div className={`wrap ${s.section}`}>
        <div className="edit">
          <p className="edit-note">Left margin: the first stop of each gradient.</p>
          <h2 className="t-h2 edit-main">Anatomy</h2>
          <p className="edit-note-r">Right margin: the last stop, angle and length.</p>
          <div className="edit-wide stack">
            <FieldAnatomyPlate />
            <FadeAnatomyPlate />
          </div>
        </div>
      </div>

      <div className={`wrap ${s.section}`}>
        <h2 className="t-h2" style={{ marginBottom: 28 }}>Grain</h2>
        <Grain />
      </div>

      <div className={`wrap ${s.section}`}>
        <h2 className="t-h2" style={{ marginBottom: 28 }}>Key art</h2>
        <KeyPlates />
      </div>

      <div className={`wrap ${s.section}`}>
        <h2 className="t-h2" style={{ marginBottom: 28 }}>Motion studies</h2>
        <Motion />
      </div>
    </section>
  );
}

function FieldAnatomyPlate() {
  return (
    <figure className={s.plate} style={{ '--span': 12 }}>
      <div className={s.frame}><FieldAnatomy /></div>
      <figcaption className={s.cap}><b>Field</b><span>2 stops, 160 degrees</span></figcaption>
    </figure>
  );
}

function FadeAnatomyPlate() {
  return (
    <figure className={s.plate} style={{ '--span': 12 }}>
      <div className={s.frame}><FadeAnatomy /></div>
      <figcaption className={s.cap}><b>Blue fade</b><span>2 stops, vertical</span></figcaption>
    </figure>
  );
}
