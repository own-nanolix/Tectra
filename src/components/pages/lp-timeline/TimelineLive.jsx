'use client';

import { useRef, useState } from 'react';
import Art from '@/components/art/Art';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { Hl } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import { HEADINGS, FEATURES, ROADMAP } from '@/lib/brand';
import { still, clamp } from '@/lib/site';
import { B, STAGES, STAGE_COPY } from './data';
import RoadmapArt from './RoadmapArt';
import { StageSceneG } from './StageArt';
import { useTween } from './useTween';
import s from './lp-timeline.module.css';

const LAST = STAGES.length - 1;

// Hero (the live roadmap) and the horizontal track of stage cards share one state: the stage the marker is on.
export default function TimelineLive() {
  const [i, setI] = useState(3);
  const x = useTween(B[i + 1]);
  const track = useRef(null);
  const cards = useRef({});

  const go = (k) => {
    const n = clamp(k, 0, LAST);
    setI(n);
    const box = track.current;
    const card = cards.current[n];
    if (box && card) {
      box.scrollTo({ left: Math.max(0, card.offsetLeft - (box.clientWidth - card.offsetWidth) / 2), behavior: still() ? 'auto' : 'smooth' });
    }
  };
  const onKey = (e) => {
    const map = { ArrowRight: i + 1, ArrowUp: i + 1, ArrowLeft: i - 1, ArrowDown: i - 1, Home: 0, End: LAST };
    if (!(e.key in map)) return;
    e.preventDefault();
    go(map[e.key]);
  };
  const scrollTrack = (dir) => {
    const box = track.current;
    if (box) box.scrollBy({ left: dir * Math.min(360, box.clientWidth * 0.8), behavior: still() ? 'auto' : 'smooth' });
  };

  return (
    <>
      <section className={s.hero} aria-labelledby="lp-timeline-h1">
        <div className={s.stage}>
          <h1 id="lp-timeline-h1" tabIndex={-1} className={`t-h1 ${s.headline}`}>
            <Hl text={HEADINGS.strategic.text} hl={HEADINGS.strategic.hl} />
          </h1>
          <div className={s.scroll}>
            <div
              className={s.canvas}
              role="slider"
              tabIndex={0}
              aria-label="Roadmap stage. Use the arrow keys to move the marker."
              aria-orientation="horizontal"
              aria-valuemin={1}
              aria-valuemax={STAGES.length}
              aria-valuenow={i + 1}
              aria-valuetext={`${ROADMAP.here}: ${STAGES[i].name}`}
              onKeyDown={onKey}
            >
              <RoadmapArt i={i} x={x} />
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className={s.controls}>
            <Button variant="sky" size="sm" icon="chevron-left" label="Previous stage" onClick={() => go(i - 1)} disabled={i === 0} />
            <Button variant="sky" size="sm" icon="chevron-right" label="Next stage" onClick={() => go(i + 1)} disabled={i === LAST} />
            <div className={s.chips} role="group" aria-label="Roadmap stages">
              {STAGES.map((st, k) => (
                <Chip key={st.id} size="sm" pressed={i === k} onClick={() => go(k)}>
                  {st.name}
                </Chip>
              ))}
            </div>
            <p className={s.readout} aria-live="polite">
              <span className="t-label">{ROADMAP.here}</span>
              <b className={s.readoutName}>{STAGES[i].name}</b>
              <span className="t-label">{i + 1} / {STAGES.length}</span>
            </p>
          </div>
        </div>
      </section>

      <section className={`wrap ${s.trackSec}`} aria-labelledby="lp-timeline-track-h">
        <Reveal className={s.trackHead}>
          <div>
            <Chip>{HEADINGS.next.chip}</Chip>
            <h2 id="lp-timeline-track-h" className="t-h2 t-balance" style={{ marginTop: 20 }}>
              <Hl text={FEATURES.heading} hl={FEATURES.hl} />
            </h2>
          </div>
          <div className={s.arrows}>
            <Button variant="sky" icon="arrow-left" label="Scroll stages left" onClick={() => scrollTrack(-1)} />
            <Button variant="sky" icon="arrow-right" label="Scroll stages right" onClick={() => scrollTrack(1)} />
          </div>
        </Reveal>
        <div className={s.track} ref={track} tabIndex={0} role="region" aria-label="Stage cards, scrolls sideways">
          <ul className={s.cards}>
            {STAGES.map((st, k) => {
              const c = STAGE_COPY[st.id];
              const active = i === k;
              return (
                <li key={st.id} ref={(el) => { cards.current[k] = el; }} className={`${s.card} ${active ? s.cardOn : ''}`}>
                  <div className={s.scene}>
                    <Art viewBox="0 0 400 300" title={`${st.name}: stage drawing`} exportName={`lp-timeline-stage-${st.id}`}>
                      <StageSceneG kind={st.kind} idp={`lp-timeline-sc-${st.id}`} />
                    </Art>
                  </div>
                  <div className={s.cardBody}>
                    <p className="t-caps muted">{String(k + 1).padStart(2, '0')}</p>
                    <h3 className="t-title">{st.name}</h3>
                    {c.title ? <p className="t-body" style={{ fontWeight: 400 }}>{c.title}</p> : <span className={s.bar} aria-hidden="true" />}
                    {c.text ? <p className={`t-small ${s.clamp}`}>{c.text}</p> : <span className={`${s.bar} ${s.barShort}`} aria-hidden="true" />}
                    <Button variant={active ? 'yellow' : 'sky'} size="sm" onClick={() => go(k)} aria-pressed={active} aria-label={`Move the marker to ${st.name}`}>
                      {ROADMAP.here}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
