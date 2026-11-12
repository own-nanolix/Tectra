import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('showcase');

export default function Page() {
  return (
    <section className="page" id="p-showcase" aria-label="Showcase" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap">Showcase</h1>
    </section>
  );
}
