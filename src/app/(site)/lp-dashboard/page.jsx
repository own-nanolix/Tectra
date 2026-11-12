import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-dashboard/Hero';
import Features from '@/components/pages/lp-dashboard/Features';
import TickBand from '@/components/pages/lp-dashboard/TickBand';
import GaugesBand from '@/components/pages/lp-dashboard/GaugesBand';
import KpiTable from '@/components/pages/lp-dashboard/KpiTable';
import QuoteBand from '@/components/pages/lp-dashboard/QuoteBand';
import CtaStrip from '@/components/pages/lp-dashboard/CtaStrip';
import s from '@/components/pages/lp-dashboard/styles';

export const metadata = pageMeta('lp-dashboard');

export default function Page() {
  return (
    <section className={`page ${s.root}`} id="p-lp-dashboard" aria-label="Landing: Dashboard">
      <div className={`field ${s.heroField}`}>
        <LandingNav current="lp-dashboard" className={s.nav} />
        <Hero />
      </div>
      <Features />
      <TickBand />
      <GaugesBand />
      <KpiTable />
      <QuoteBand />
      <CtaStrip />
      <LandingFooter />
    </section>
  );
}
