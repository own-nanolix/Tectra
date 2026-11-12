import Link from 'next/link';
import Reveal from '@/components/site/Reveal';
import Icon from '@/components/site/Icon';
import { groups, pages, href } from '@/lib/pages';
import { ROADMAP } from '@/lib/brand';
import s from '@/components/pages/overview/styles';

// Index of the 30 chapters, grouped, as numbered ledger rows of links. Each group opens with the brand's
// segmented bar, one segment per chapter; this page's segment and row are marked in yellow, "You're here".
const HERE = 'overview';

export function ChapterIndex() {
  return (
    <div className={s.ledgerGrid}>
      {groups.map((g) => (
        <Reveal key={g.name} className={s.group}>
          <div className={s.groupHead}>
            <h3>{g.name}</h3>
            <span className={s.groupCount}>{g.pages.length}</span>
          </div>
          <div className={s.segs} aria-hidden="true">
            {g.pages.map((p, i) => (
              <i key={p.id} data-here={p.id === HERE ? '1' : undefined} style={{ '--i': i }} />
            ))}
          </div>
          <ol className={s.ledger}>
            {g.pages.map((p) => {
              const n = pages.findIndex((x) => x.id === p.id) + 1;
              const here = p.id === HERE;
              return (
                <li key={p.id}>
                  <Link href={href(p.id)} className={`${s.row} ${s.rowChapter}`} aria-current={here ? 'page' : undefined}>
                    <span className={s.num}>{String(n).padStart(2, '0')}</span>
                    <span className={s.name}>{p.title}</span>
                    <span className={s.here}>{here ? ROADMAP.here : ''}</span>
                    <span className={s.go}><Icon name="arrow-right" size={18} /></span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </Reveal>
      ))}
    </div>
  );
}

// What each mockup page holds. Plain labels that name the objects, taken from the page list.
const MOCKUPS = [
  ['showcase', 'Phone with data cards, a line-up of phones, a laptop on a plinth, the event stage'],
  ['campaign', 'Posts, posters and stories on one pin-board'],
  ['use-apparel', 'Garment collection, T-shirts, hoodies, caps and the print-spec sheet'],
  ['use-accessories', 'Tote bags, mugs, bottles, stickers, patches, cups, desk mats, umbrella, socks, gift card'],
  ['use-stationery', 'Letterhead and envelope, business cards, notebooks and pen, brochure, report cover, slide deck'],
  ['use-packaging', 'Tape, shipping boxes, product boxes, shopping bags, tissue and labels'],
  ['use-event', 'Lanyard and badge, staff ID cards, wristbands, flags, banner and booth'],
  ['use-world', 'Four full-bleed scenes of the brand in the street'],
  ['use-product', 'The hard hat, site tablet, card colourways, phone, watch and the icon size ladder'],
];

export function MockupIndex() {
  return (
    <ol className={s.ledger}>
      {MOCKUPS.map(([id, what], i) => {
        const p = pages.find((x) => x.id === id);
        return (
          <Reveal as="li" key={id} delay={i * 30}>
            <Link href={href(id)} className={s.row}>
              <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
              <span className={s.name}>{p.title}</span>
              <span className={s.what}>{what}</span>
              <span className={s.go}><Icon name="arrow-right" size={18} /></span>
            </Link>
          </Reveal>
        );
      })}
    </ol>
  );
}
