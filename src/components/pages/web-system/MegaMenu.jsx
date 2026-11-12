'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/site/Icon';
import { KPI, KOMATSU, ROADMAP, CUT_FILL, NAV_LINKS } from '@/lib/brand';
import { MegaTileArt } from './Arts';
import s from './web-system.module.css';

// Four columns, one per nav item. Names and figures come from the case study.
const COLUMNS = [
  { id: 'lp-dashboard', items: [['note', 'Details', KPI.details.value], ['note', 'Notes', KPI.notes.value], ['cube', 'Material', KPI.material.value]] },
  { id: 'lp-progress', items: [['ruler', KPI.cross.label, KPI.cross.value], ['chart', CUT_FILL.title, ''], ['check', KPI.overall.label, KPI.overall.value]] },
  { id: 'lp-timeline', items: ROADMAP.done.slice(0, 3).map((n, i) => [['layers', 'grid', 'home'][i], n, '']) },
  { id: 'lp-work-areas', items: [['crane', KOMATSU.name, KOMATSU.value], ['hardhat', 'Overall', '']] },
];

export default function MegaMenu() {
  const [open, setOpen] = useState(true);
  const toggle = useRef(null);
  const onKeyDown = (e) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
      if (toggle.current) toggle.current.focus();
    }
  };
  return (
    <div className={s.mega} onKeyDown={onKeyDown} data-screen="web-system-mega-menu">
      <div className={s.megaNav}>
        <div className="lp-nav">
          <span className="lp-logo" aria-hidden="true">
            <svg viewBox="0 0 100 100" width="26" height="26"><use href="#site-mark" /></svg>
          </span>
          <div className="lp-pill">
            {NAV_LINKS.map((l) => (
              <Link key={l.id} href={`/${l.id}/`} aria-current={l.id === 'lp-progress' ? 'page' : undefined}>{l.label}</Link>
            ))}
          </div>
          <div className="lp-actions">
            <button
              ref={toggle}
              type="button"
              className={`btn btn-sky ${s.megaToggle}`}
              aria-expanded={open}
              aria-controls="web-system-mega-panel"
              onClick={() => setOpen((v) => !v)}
            >
              Menu
              <Icon name="chevron-down" size={18} className={s.megaChev} />
            </button>
          </div>
        </div>
      </div>
      <div id="web-system-mega-panel" className={s.megaPanel} hidden={!open} role="region" aria-label="Mega menu">
        {COLUMNS.map((c) => {
          const link = NAV_LINKS.find((l) => l.id === c.id);
          return (
            <div key={c.id} className={s.megaCol}>
              <Link href={`/${c.id}/`} className={s.megaHead}>{link.label}</Link>
              {c.items.map(([icon, name, meta]) => (
                <Link key={name} href={`/${c.id}/`} className={s.megaItem}>
                  <span className={s.megaIcon}><Icon name={icon} size={20} /></span>
                  <span>{name}</span>
                  <span className={s.megaMeta}>{meta}</span>
                </Link>
              ))}
            </div>
          );
        })}
        <div className={s.megaTile}>
          <MegaTileArt />
        </div>
      </div>
    </div>
  );
}
