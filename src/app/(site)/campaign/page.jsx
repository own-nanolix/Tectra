import { pageMeta } from '@/lib/pages';
import Board from '@/components/pages/campaign/Board';

export const metadata = pageMeta('campaign');

export default function Page() {
  return (
    <section className="page" id="p-campaign" aria-label="Campaign">
      <div className="wrap">
        <h1 tabIndex={-1} className="t-h1">Campaign</h1>
        <Board />
      </div>
    </section>
  );
}
