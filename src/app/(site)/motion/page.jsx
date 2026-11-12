import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('motion');

export default function Page() {
  return (
    <section className="page" id="p-motion" aria-label="Motion" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap">Motion</h1>
    </section>
  );
}
