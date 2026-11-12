import Art from '@/components/art/Art';
import { PhoneG, ScreenHomeG } from '@/components/art/Devices';
import { IsoSiteG, TreesG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { MOBILE_SCREENS } from '@/lib/brand';
import { ScreenCardsG, ScreenCutFillG, StepBarG } from './screens';
import s from './lp-mobile.module.css';

const ROWS = [
  { key: 'dashboard', Screen: ScreenHomeG, art: 'iso' },
  { key: 'tasks', Screen: ScreenCardsG, art: 'trees' },
  { key: 'cutfill', Screen: ScreenCutFillG, art: 'iso2' },
];

function Drawing({ kind, i }) {
  return (
    <g>
      <rect y="22" width="560" height="320" rx="4" fill="#F5F5F5" />
      {kind === 'iso' && <IsoSiteG x={30} y={14} scale={0.95} tone="ghost" seed={21} pins={['ridge']} />}
      {kind === 'iso2' && <IsoSiteG x={20} y={36} scale={0.95} tone="ghost" seed={5} />}
      {kind === 'trees' && <TreesG x={20} y={40} w={520} h={290} count={11} tone="ghost" seed={9 + i} minSize={90} maxSize={170} />}
    </g>
  );
}

// Three rows, phone left / notes right, then right / left, then left / right.
export default function Zigzag() {
  return (
    <div className={s.zig}>
      {ROWS.map((r, i) => {
        const m = MOBILE_SCREENS[i];
        const flip = i === 1;
        return (
          <section key={r.key} className={`${s.zigRow} ${flip ? s.flip : ''}`} aria-labelledby={`lp-mobile-zig-${r.key}`}>
            <Reveal from={flip ? undefined : 'left'} className={s.zigPhone}>
              <Art viewBox="0 0 430 884" title={`Phone screen ${i + 1}: ${m.title}`} exportName={`lp-mobile-screen-${r.key}`}>
                <PhoneG idp={`lp-mobile-zig-${r.key}`} w={430}>
                  <r.Screen idp={`lp-mobile-zig-${r.key}`} />
                </PhoneG>
              </Art>
            </Reveal>
            {/* As in m09: the step bar, then one pale card holding the drawing, the title and the text. */}
            <Reveal delay={140} className={s.zigNotes}>
              <svg viewBox="0 0 560 5" className={s.zigStep} aria-hidden="true">
                <StepBarG x={0} y={0} w={560} on={i + 1} />
              </svg>
              <div className={s.zigCard}>
                <Art viewBox="0 22 560 320" title={`Step ${i + 1} of 3, line drawing`} exportName={`lp-mobile-note-${r.key}`}>
                  <Drawing kind={r.art} i={i} />
                </Art>
                <div className={s.zigText}>
                  <h2 id={`lp-mobile-zig-${r.key}`} className={s.zigTitle}>{m.title}</h2>
                  <p className={s.zigBody}>{m.text}</p>
                </div>
              </div>
            </Reveal>
          </section>
        );
      })}
    </div>
  );
}
