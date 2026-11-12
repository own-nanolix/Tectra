import { pageMeta } from '@/lib/pages';
import LandingFooter from '@/components/ui/LandingFooter';
import { BillingProvider } from '@/components/pages/lp-pricing/Billing';
import Hero from '@/components/pages/lp-pricing/Hero';
import Matrix from '@/components/pages/lp-pricing/Matrix';
import Usage from '@/components/pages/lp-pricing/Usage';
import Proof from '@/components/pages/lp-pricing/Proof';
import Empower from '@/components/pages/lp-pricing/Empower';
import Faq from '@/components/pages/lp-pricing/Faq';
import Final from '@/components/pages/lp-pricing/Final';
import s from '@/components/pages/lp-pricing/lp-pricing.module.css';

export const metadata = pageMeta('lp-pricing');

export default function Page() {
  return (
    <section className={`page ${s.page}`} id="p-lp-pricing" aria-label="Landing: Plans">
      <BillingProvider>
        <Hero />
        <Matrix />
        <Usage />
        <Proof />
        <Empower />
        <Faq />
        <Final />
      </BillingProvider>
      <LandingFooter />
    </section>
  );
}
