import { pageMeta } from '@/lib/pages';
import { OVERVIEW } from '@/lib/brand';
import Shell from '@/components/pages/dashboard/Shell';
import Sheet, { Gallery } from '@/components/pages/dashboard/Sheet';
import s from '@/components/pages/dashboard/dashboard.module.css';

export const metadata = pageMeta('dashboard');

export default function Page() {
  return (
    <section className="page" id="p-dashboard" aria-label="Dashboard">
      <div className="wrap stack-lg">
        <header className="stack">
          <h1 tabIndex={-1} className="t-h1">Tectra <span className="hl">Dashboard</span></h1>
          <p className="t-lead muted">{OVERVIEW}</p>
        </header>
        <section className="stack" aria-labelledby="dashboard-h-screens">
          <h2 id="dashboard-h-screens" className="t-h2">Screens</h2>
          <Shell />
        </section>
        <section className="stack" aria-labelledby="dashboard-h-charts">
          <h2 id="dashboard-h-charts" className="t-h2">Charts and illustrations</h2>
          <Gallery />
        </section>
        <section className={`stack ${s.sheetSec}`} aria-labelledby="dashboard-h-comp">
          <h2 id="dashboard-h-comp" className="t-h2">Components</h2>
          <Sheet />
        </section>
      </div>
    </section>
  );
}
