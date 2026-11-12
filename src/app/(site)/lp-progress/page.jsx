import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-progress/Hero';
import Explorer from '@/components/pages/lp-progress/Explorer';
import CutFill from '@/components/pages/lp-progress/CutFill';
import Obstacles from '@/components/pages/lp-progress/Obstacles';
import Results from '@/components/pages/lp-progress/Results';
import Faq from '@/components/pages/lp-progress/Faq';
import Cta from '@/components/pages/lp-progress/Cta';
import s from '@/components/pages/lp-progress/styles';

export const metadata = pageMeta('lp-progress');

export default function Page() {
  return (
    <section className={`page ${s.root}`} id="p-lp-progress" aria-label="Landing: Progress">
      <div className={`field ${s.heroField}`}>
        <LandingNav current="lp-progress" className={s.nav} />
        <Hero />
      </div>
      <Explorer />
      <CutFill />
      <Obstacles />
      <Results />
      <Faq />
      <Cta />
      <LandingFooter />
    </section>
  );
}
