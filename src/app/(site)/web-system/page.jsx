import { pageMeta } from '@/lib/pages';
import Shelf from '@/components/pages/web-system/Shelf';
import ButtonBench from '@/components/pages/web-system/ButtonBench';
import NavBench from '@/components/pages/web-system/NavBench';
import MegaMenu from '@/components/pages/web-system/MegaMenu';
import LinkBench from '@/components/pages/web-system/LinkBench';
import TagBench from '@/components/pages/web-system/TagBench';
import CardBench from '@/components/pages/web-system/CardBench';
import ContentBench from '@/components/pages/web-system/ContentBench';
import ListBench from '@/components/pages/web-system/ListBench';
import s from '@/components/pages/web-system/web-system.module.css';

export const metadata = pageMeta('web-system');

export default function Page() {
  return (
    <section className="page" id="p-web-system" aria-label="Web system">
      <div className="wrap">
        <header className={s.head}>
          <h1 tabIndex={-1} className={`t-h1 t-balance ${s.enter}`}>
            Web <span className="hl">system</span>
          </h1>
          <p className={`t-lead muted ${s.enter}`} style={{ '--i': 1 }}>
            Every component of the landing page and the app on one bench, each with its states.
          </p>
        </header>
        <div className={s.bench}>
          <ButtonBench />
          <NavBench />
          <Shelf id="mega" wide title="Mega menu" note="Open under the nav: one column for each nav item, an icon tile for each entry and the site drawn on Field Blue. The Menu button toggles it, Escape closes it and returns focus to the button.">
            <MegaMenu />
          </Shelf>
          <LinkBench />
          <TagBench />
          <CardBench />
          <ContentBench />
          <ListBench />
        </div>
      </div>
    </section>
  );
}
