import { pageMeta } from '@/lib/pages';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-mobile/Hero';
import Zigzag from '@/components/pages/lp-mobile/Zigzag';
import Ledger from '@/components/pages/lp-mobile/Ledger';
import Palm from '@/components/pages/lp-mobile/Palm';
import Faq from '@/components/pages/lp-mobile/Faq';
import Cta from '@/components/pages/lp-mobile/Cta';
import s from '@/components/pages/lp-mobile/lp-mobile.module.css';

export const metadata = pageMeta('lp-mobile');

export default function Page() {
  return (
    <section className={`page ${s.page}`} id="p-lp-mobile" aria-label="Landing: Mobile app">
      <Hero />
      <Zigzag />
      <Ledger />
      <Palm />
      <Faq />
      <Cta />
      <LandingFooter className={s.footer} />
    </section>
  );
}
