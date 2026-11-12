import { pageMeta } from '@/lib/pages';
import SiteDemo from '@/components/pages/feature/SiteDemo';

export const metadata = pageMeta('feature');

export default function Page() {
  return (
    <section className="page" id="p-feature" aria-label="Site view">
      <SiteDemo />
    </section>
  );
}
