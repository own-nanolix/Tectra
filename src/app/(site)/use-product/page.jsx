import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('use-product');

export default function Page() {
  return (
    <section className="page" id="p-use-product" aria-label="Product" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap">Product</h1>
    </section>
  );
}
