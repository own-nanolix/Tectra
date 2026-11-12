import { pageMeta } from '@/lib/pages';
import { HEADINGS } from '@/lib/brand';
import { Hl } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import Stage from '@/components/pages/mobile-a/Stage';
import Parts from '@/components/pages/mobile-a/Parts';

export const metadata = pageMeta('mobile-a');

export default function Page() {
  const h = HEADINGS.mobile;
  return (
    <section className="page" id="p-mobile-a" aria-label="Mobile app, screens 1 to 9">
      <div className="wrap stack-lg">
        <header className="stack t-center">
          <span className="chip">{h.chip}</span>
          <h1 tabIndex={-1} className="t-display t-balance"><Hl text={h.text} hl={h.hl} /></h1>
        </header>
      </div>
      <div style={{ marginTop: 'calc(var(--gap) * 2)' }}>
        <Reveal><Stage /></Reveal>
      </div>
      <div className="wrap stack" style={{ marginTop: 'calc(var(--band) / 2)' }}>
        <h2 className="t-h2">Parts of the app</h2>
        <Reveal><Parts /></Reveal>
      </div>
    </section>
  );
}
