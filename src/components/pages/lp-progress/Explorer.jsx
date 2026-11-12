'use client';

import { useEffect, useRef, useState } from 'react';
import Art from '@/components/art/Art';
import { IsoSiteG, PinG, SITE_PINS, iso } from '@/components/art/KeyArt';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import Reveal from '@/components/site/Reveal';
import { FEATURES, KOMATSU, VOLUME } from '@/lib/brand';
import { SegBar } from './Parts';
import s from './styles';

const WHITE_PINS = ['gate', 'ridge', 'yard', 'wing'];
const MAX = 1000;

// Section 2: drag from the first published volume to the last. The bar fills and the site gains pins.
export default function Explorer() {
  const [v, setV] = useState(500);
  const [play, setPlay] = useState(false);
  const from = useRef(0);
  const t = v / MAX;
  const filled = Math.floor(t * VOLUME.segments);
  const whites = WHITE_PINS.filter((_, i) => t >= 0.2 + i * 0.2);
  const komatsu = t >= 0.5;

  useEffect(() => {
    if (!play) return;
    let frame = 0;
    let last = 0;
    let pos = from.current;
    const tick = (now) => {
      if (!last) last = now;
      pos = Math.min(MAX, pos + (now - last) * 0.22);
      last = now;
      setV(pos);
      if (pos >= MAX) setPlay(false);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play]);

  const [title, text] = FEATURES.rows[0];
  return (
    <section className={s.band} id="lp-progress-explorer" aria-labelledby="lp-progress-explorer-h">
      <div className="wrap-narrow">
        <Reveal className={s.head}>
          <h2 id="lp-progress-explorer-h" className="t-display t-balance t-center">{title}</h2>
          <p className="t-lead muted t-center">{text}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className={`field ${s.site}`}>
            <Art viewBox="0 0 560 400" title="The site: the isometric building gains location pins as the volume grows" exportName="lp-progress-site" className={s.siteArt}>
              <IsoSiteG tone="blue" />
              <g transform="translate(262 118)">
                {whites.map((name) => {
                  const [x, y] = iso(...SITE_PINS[name], 20);
                  return (
                    <g key={name} transform={`translate(${x} ${y})`}>
                      <g className="pop"><PinG /></g>
                    </g>
                  );
                })}
                {komatsu && (() => {
                  const [x, y] = iso(...SITE_PINS.komatsu, 20);
                  return (
                    <g key="komatsu" transform={`translate(${x} ${y})`}>
                      <g className="pop"><PinG tone="yellow" pulse /></g>
                    </g>
                  );
                })()}
              </g>
            </Art>
            {komatsu && (
              <div className={`glass slide-up ${s.komatsu}`}>
                <span className="t-title">{KOMATSU.name}</span>
                <span>{KOMATSU.dates}</span>
                <span className={s.komFig}>{KOMATSU.value}</span>
              </div>
            )}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className={s.control}>
            <SegBar filled={filled} exportName="lp-progress-segments" />
            <input
              id="lp-progress-slider"
              className={s.range}
              type="range"
              min={0}
              max={MAX}
              step={1}
              value={v}
              aria-label="Volume from 15.837 cu yd to 75.484 cu yd"
              aria-valuetext={`${filled} of ${VOLUME.segments} segments`}
              onChange={(e) => { setPlay(false); setV(Number(e.target.value)); }}
            />
            <div className={s.ends}>
              <span>{VOLUME.from}</span>
              <Chip size="sm" tone="blue">{filled} of {VOLUME.segments}</Chip>
              <span>{VOLUME.to}</span>
            </div>
            <div className="row" style={{ justifyContent: 'center' }}>
              <Button variant="dark" size="sm" icon={play ? 'pause' : 'play'} onClick={() => { from.current = v >= MAX ? 0 : v; setPlay(!play); }}>
                {play ? 'Pause' : 'Play'}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
