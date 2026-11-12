import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('logo');

export default function Page() {
  return (
    <section className="page" id="p-logo" aria-label="Logo" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap">Logo</h1>
    </section>
  );
}
