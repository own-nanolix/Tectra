import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('overview');

export default function Page() {
  return (
    <section className="page" id="p-overview" aria-label="Overview" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap">Overview</h1>
    </section>
  );
}
