import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('dashboard');

export default function Page() {
  return (
    <section className="page" id="p-dashboard" aria-label="Dashboard" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap">Dashboard</h1>
    </section>
  );
}
