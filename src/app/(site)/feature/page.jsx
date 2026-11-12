import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('feature');

export default function Page() {
  return (
    <section className="page" id="p-feature" aria-label="Site view" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap">Site view</h1>
    </section>
  );
}
