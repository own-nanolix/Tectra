import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('lp-home');

export default function Page() {
  return (
    <section className="page" id="p-lp-home" aria-label="Landing: Smart Construction" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap">Landing: Smart Construction</h1>
    </section>
  );
}
