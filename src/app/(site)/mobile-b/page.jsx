import { pageMeta } from '@/lib/pages';
import { HEADINGS } from '@/lib/brand';
import { Hl } from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import Reveal from '@/components/site/Reveal';
import Workbench from '@/components/pages/mobile-b/Workbench';
import Patterns from '@/components/pages/mobile-b/Patterns';
import s from '@/components/pages/mobile-b/mobile-b.module.css';

export const metadata = pageMeta('mobile-b');

export default function Page() {
  return (
    <section className="page" id="p-mobile-b" aria-label="Mobile app, screens 10 to 18">
      <div className="wrap">
        <header className={s.intro}>
          <Chip>{HEADINGS.mobile.chip}</Chip>
          <h1 tabIndex={-1} className="t-h1"><Hl text="Screens 10 to 18 in the same language" hl="the same language" /></h1>
          <p className="t-lead">Nine more screens in the case study&apos;s mobile language: grey screen, #E9E9E9 cards, yellow tile, corner arcs and a floating tab bar. Step through them in the phone, or pick one from the sheet.</p>
        </header>
        <Workbench />
        <Reveal>
          <h2 className="t-h2" style={{ margin: 'clamp(56px, 8vw, 112px) 0 24px' }}>Seven interaction patterns</h2>
          <Patterns />
        </Reveal>
      </div>
    </section>
  );
}
