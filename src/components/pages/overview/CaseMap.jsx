import Link from 'next/link';
import Reveal from '@/components/site/Reveal';
import { HEADINGS } from '@/lib/brand';
import { pageById, href } from '@/lib/pages';
import s from '@/components/pages/overview/styles';

// The case study in its own order, image by image, and the page of this site that rebuilds each part.
// Section names are the case study's chips where it prints one; the others are plain labels of what is shown.
const PARTS = [
  ['Cover', 'dashboard'],
  ['Overview and About', 'strategy'],
  [HEADINGS.strategic.chip, 'strategy'],
  ['Material card', 'mobile-a'],
  [HEADINGS.insights.chip, 'strategy'],
  ['Desktop monitor', 'showcase'],
  [HEADINGS.problem.chip, 'strategy'],
  [HEADINGS.mobile.chip, 'mobile-a'],
  ['Poster and badges', 'campaign'],
  ['Font and colour', 'typography'],
  [HEADINGS.landing.chip, 'lp-home'],
  ['Container, mark, hard hat', 'use-product'],
  [HEADINGS.web.chip, 'dashboard'],
  [HEADINGS.result.chip, 'strategy'],
  ['Light box and billboard', 'use-world'],
  [HEADINGS.next.chip, 'strategy'],
];

export default function CaseMap() {
  return (
    <ol className={s.caseMap}>
      {PARTS.map(([name, id], i) => (
        <Reveal as="li" key={`${name}-${i}`} delay={(i % 8) * 40}>
          <Link href={href(id)} className={s.caseTile}>
            <span className={s.caseNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={s.caseName}>{name}</span>
            <span className={s.caseTo}>{pageById(id).title}</span>
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}
