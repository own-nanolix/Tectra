import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('use-accessories');

export default function Page() {
  return (
    <section className="page" id="p-use-accessories" aria-label="Accessories" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap">Accessories</h1>
    </section>
  );
}
