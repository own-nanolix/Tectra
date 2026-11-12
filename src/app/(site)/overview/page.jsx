import { pageMeta } from '@/lib/pages';
import Cover from '@/components/pages/overview/Cover';
import AboutTable from '@/components/pages/overview/AboutTable';
import ContentsNav from '@/components/pages/overview/ContentsNav';
import Principles from '@/components/pages/overview/Principles';
import { ChapterIndex, MockupIndex } from '@/components/pages/overview/Indexes';
import Reveal from '@/components/site/Reveal';
import { OVERVIEW } from '@/lib/brand';
import s from '@/components/pages/overview/styles';

import Idea from '@/components/pages/overview/Idea';

export const metadata = pageMeta('overview');

// The brand idea as written in SOURCE.md (our own reading of the case study).
const IDEA = 'Tectra turns a building site into something you can read like an instrument: one calm blue field, a drawing of the job, and a few measured figures with yellow marking what needs attention. The mark says the same thing in three circles: separate pieces of a project fusing into one body, with the next piece on its way.';

const CONTENTS = [
  ['overview-about', 'About'],
  ['overview-principles', 'Principles'],
  ['overview-chapters', 'All chapters'],
  ['overview-mockups', 'Mockups and products'],
];

export default function Page() {
  return (
    <section className="page" id="p-overview" aria-label="Overview" style={{ paddingTop: 0 }}>
      <Cover />

      <div className={`wrap ${s.intro}`}>
        <div className="edit" id="overview-about" tabIndex={-1} style={{ outline: 'none' }}>
          <aside className="edit-note">
            <ContentsNav items={CONTENTS} />
          </aside>
          <div className="edit-main">
            <h1 tabIndex={-1} className="t-h1">Overview</h1>
            <div className={s.overviewRow}>
              <div className={s.vbar} aria-hidden="true"><i data-on="1" /><i /></div>
              <p className="t-quote">{OVERVIEW}</p>
            </div>
          </div>
          <aside className="edit-note-r">
            <h2 className="t-caps" style={{ color: 'var(--ink)', marginBottom: 14 }}>About</h2>
            <AboutTable />
          </aside>
        </div>

        <div className="edit" style={{ marginTop: 'var(--band)' }}>
          <aside className="edit-note">
            <Idea />
          </aside>
          <div className="edit-main">
            <Reveal>
              <h2 className="t-caps" style={{ color: 'var(--ink)', marginBottom: 14 }}>The idea</h2>
              <p className="t-quote">{IDEA}</p>
            </Reveal>
          </div>
        </div>

        <div className="edit" style={{ marginTop: 'var(--band)' }}>
          <div className="edit-wide">
            <div className={s.sectionHead} id="overview-principles" tabIndex={-1} style={{ outline: 'none' }}>
              <h2 className="t-h2">Principles</h2>
              <p className="t-lead muted" style={{ maxWidth: '52ch' }}>Four ideas the designers state in their own words, each with the figure that backs it.</p>
            </div>
            <div style={{ marginTop: 'clamp(24px, 4vw, 56px)' }}>
              <Principles />
            </div>
          </div>
        </div>

        <div className="edit" style={{ marginTop: 'var(--band)' }}>
          <div className="edit-wide">
            <Reveal className={s.ledgerHead}>
              <h2 className="t-h2" id="overview-chapters" tabIndex={-1} style={{ outline: 'none' }}>All chapters</h2>
              <p className="t-label">30 pages in four groups</p>
            </Reveal>
            <ChapterIndex />
          </div>
        </div>

        <div className="edit" style={{ marginTop: 'var(--band)' }}>
          <div className="edit-wide">
            <Reveal className={s.ledgerHead}>
              <h2 className="t-h2" id="overview-mockups" tabIndex={-1} style={{ outline: 'none' }}>Mockups and products</h2>
              <p className="t-label">Showcase, campaign and the physical brand</p>
            </Reveal>
            <div style={{ marginTop: 28 }}>
              <MockupIndex />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
