import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { Plate } from '@/components/pages/use-stationery/parts';
import { Letterhead, Envelope } from '@/components/pages/use-stationery/Letter';
import { Cards, CARD_PLATES } from '@/components/pages/use-stationery/Cards';
import { NotebookBlue, NotebookYellow, Pen } from '@/components/pages/use-stationery/Notebooks';
import { Brochure } from '@/components/pages/use-stationery/Brochure';
import { Report } from '@/components/pages/use-stationery/Report';
import { Slide, Deck, SLIDES } from '@/components/pages/use-stationery/Slides';
import s from '@/components/pages/use-stationery/use-stationery.module.css';

export const metadata = pageMeta('use-stationery');

function Band({ title, note, children }) {
  return (
    <section className={s.band} aria-label={title}>
      <div className={s.bandHead}>
        <h2 className="t-h3">{title}</h2>
        {note && <p className="t-small muted">{note}</p>}
      </div>
      {children}
    </section>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-use-stationery" aria-label="Stationery">
      <div className="wrap">
        <header className={s.head}>
          <h1 tabIndex={-1} className="t-h1">
            Stationery
          </h1>
          <p className="t-lead muted">
            Paper that carries the same idea as the screen: one blue field, a line drawing and a few measured figures.
          </p>
        </header>

        <Band title="Letterhead and envelope" note="Pulled apart along the y axis">
          <div className={s.pair}>
            <Reveal><Plate name="Letterhead" note="Sheet and print layer"><Letterhead /></Plate></Reveal>
            <Reveal delay={90}><Plate name="Envelope" note="Flap, letter and pocket"><Envelope /></Plate></Reveal>
          </div>
        </Band>

        <Band title="Business cards" note="Fanned round one corner, foil lifted off the top card">
          <div className={s.trio}>
            {CARD_PLATES.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <Plate name={p.name.replace('Business cards, ', '')}><Cards plate={p} /></Plate>
              </Reveal>
            ))}
          </div>
        </Band>

        <Band title="Notebooks and pen" note="Offset along the x axis; the cap along the pen">
          <div className={s.tall}>
            <div className={s.stackCol}>
              <Reveal><Plate name="Notebook, blue" note="Cover, elastic band, pages"><NotebookBlue /></Plate></Reveal>
              <Reveal><Plate name="Notebook, spiral" note="Cover, coil, pages"><NotebookYellow /></Plate></Reveal>
            </div>
            <Reveal delay={90}><Plate name="Pen" note="Barrel and cap"><Pen /></Plate></Reveal>
          </div>
        </Band>

        <Band title="Tri-fold brochure" note="Three panels unfolded along the x axis">
          <Reveal><Plate name="Brochure, inside spread"><Brochure /></Plate></Reveal>
        </Band>

        <Band title="Report cover and slide deck" note="Spine, pages and cover along the depth diagonal">
          <div className={s.report}>
            <Reveal><Plate name="Report cover" note="Spine, pages, cover"><Report /></Plate></Reveal>
            <div className={s.stackCol}>
              <Reveal delay={90}>
                <div className={s.strip} role="region" aria-label="Five slides, scroll sideways" tabIndex={0}>
                  {SLIDES.map((sl, i) => (
                    <div key={sl.key} className={s.slide}>
                      <Plate name={sl.name}><Slide n={i} /></Plate>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={140}><Plate name="Slide deck" note="Stepped back along the diagonal"><Deck /></Plate></Reveal>
            </div>
          </div>
        </Band>
      </div>
    </section>
  );
}
