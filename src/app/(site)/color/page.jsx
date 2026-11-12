import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('color');

export default function Page() {
  return (
    <section className="page" id="p-color" aria-label="Colour" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap">Colour</h1>
    </section>
  );
}
