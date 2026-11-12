import { pageMeta } from '@/lib/pages';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-home/Hero';
import Features from '@/components/pages/lp-home/Features';
import Plans from '@/components/pages/lp-home/Plans';
import Empower from '@/components/pages/lp-home/Empower';
import Palm from '@/components/pages/lp-home/Palm';
import Faq from '@/components/pages/lp-home/Faq';
import PlanCall from '@/components/pages/lp-home/PlanCall';
import s from '@/components/pages/lp-home/s';

export const metadata = pageMeta('lp-home');

export default function Page() {
  return (
    <section className={`page ${s.root}`} id="p-lp-home" aria-label="Landing: Smart Construction">
      <Hero />
      <Features />
      <Plans />
      <Empower />
      <Palm />
      <Faq />
      <PlanCall />
      <LandingFooter full />
    </section>
  );
}
