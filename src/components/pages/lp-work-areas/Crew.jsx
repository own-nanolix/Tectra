'use client';

import { useState } from 'react';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { EMPOWER } from '@/lib/brand';
import s from './lp-work-areas.module.css';

// Status dots of the four worker tiles, as printed: yellow, red, red, yellow.
const STATUS = ['yellow', 'red', 'red', 'yellow'];

function Tile({ k, on, onPick, small }) {
  return (
    <button type="button" className={`${s.tile} ${small ? s.tileSm : ''} ${on ? s.tileOn : ''}`} aria-pressed={on} aria-label={`Hard hat ${k + 1}, ${STATUS[k]} status`} onClick={() => onPick(k)}>
      <Icon name="hardhat" size={small ? 22 : 30} />
      <span className={`${s.status} ${s[`st_${STATUS[k]}`]}`} aria-hidden="true" />
    </button>
  );
}

// The "We empower construction teams" line with its avatar tiles inline, then the crew strip.
export default function Crew() {
  const [pick, setPick] = useState(null);
  const toggle = (k) => setPick((p) => (p === k ? null : k));
  return (
    <section className={`wrap ${s.band}`} aria-labelledby="lp-work-areas-crew-h">
      <Reveal>
        <h2 id="lp-work-areas-crew-h" className={`t-display t-center t-balance ${s.empower}`}>
          {EMPOWER[0]} {EMPOWER[1]}{' '}
          <span className={s.inline} aria-hidden="true">
            {[0, 1, 2].map((k) => (
              <span key={k} className={s.inlineTile}>
                <Icon name="hardhat" size={26} />
              </span>
            ))}
            <span className={`${s.inlineTile} ${s.inlinePlus}`}>
              <Icon name="plus" size={26} />
            </span>
          </span>{' '}
          {EMPOWER[2]} <span className="hl">{EMPOWER[3]}</span>
        </h2>
      </Reveal>
      <Reveal delay={90}>
        <div className={s.crew} role="group" aria-label="Crew">
          {STATUS.map((_, k) => (
            <Tile key={k} k={k} on={pick === k} onPick={toggle} />
          ))}
          <span className={`${s.tile} ${s.tilePlus}`} aria-hidden="true">
            <Icon name="plus" size={30} />
          </span>
        </div>
      </Reveal>
    </section>
  );
}
