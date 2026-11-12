'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { PhoneG, ScreenHomeG } from '@/components/art/Devices';
import Reveal from '@/components/site/Reveal';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { Hl } from '@/components/ui/Card';
import { PALM, MOBILE_SCREENS, KPI } from '@/lib/brand';
import { MiniCardG, ScreenCardsG, ScreenCutFillG, StepBarG } from './screens';
import s from './lp-mobile.module.css';

const SCREENS = [ScreenHomeG, ScreenCardsG, ScreenCutFillG];

// "In the Palm of Your Hand": one live phone; buttons or the arrow keys step through the three screens.
export default function Palm() {
  const [step, setStep] = useState(0);
  const go = (n) => setStep(Math.max(0, Math.min(2, n)));
  const Screen = SCREENS[step];
  const m = MOBILE_SCREENS[step];
  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      go(step + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      go(step - 1);
    }
  };

  return (
    <section className={s.palm} aria-labelledby="lp-mobile-palm-h">
      <div className={`wrap ${s.palmGrid}`}>
        <Reveal className={s.palmCopy}>
          <h2 id="lp-mobile-palm-h" className="t-display t-balance">
            <Hl text={PALM.heading} hl="Palm of Your Hand" />
          </h2>
          <p className="t-lead muted">{PALM.sub}</p>
          <div className={s.stepper} role="group" aria-label="Phone screens, use the arrow keys to step" tabIndex={0} onKeyDown={onKey}>
            <div className={s.stepChips}>
              {MOBILE_SCREENS.map((sc, i) => (
                <Chip key={sc.title} pressed={step === i} onClick={() => go(i)} className={s.stepChip}>
                  {`${i + 1}  ${sc.title}`}
                </Chip>
              ))}
            </div>
            <div className={s.stepBtns}>
              <Button variant="dark" icon="arrow-left" label="Previous screen" onClick={() => go(step - 1)} disabled={step === 0} />
              <Button variant="dark" icon="arrow-right" label="Next screen" onClick={() => go(step + 1)} disabled={step === 2} />
            </div>
            <div className={s.stepText} aria-live="polite">
              <h3 className="t-h3">{m.title}</h3>
              <p className="t-body muted">{m.text}</p>
            </div>
          </div>
          <div className="row">
            <Button href="/lp-pricing/">Let&apos;s try</Button>
            <Button variant="sky" href="/lp-progress/">Learn more</Button>
          </div>
        </Reveal>
        <Reveal delay={120} from="scale" className={s.palmStage}>
          <Art viewBox="0 0 900 920" title="Phone with the three screens and floating cards" exportName="lp-mobile-palm" className={s.palmArt}>
            <g className={s.floatA}>
              <MiniCardG idp="lp-mobile-palmcard" id="notes" x={10} y={190} w={210} h={170} k={KPI.notes} />
            </g>
            <g className={s.floatB}>
              <MiniCardG idp="lp-mobile-palmcard" id="material" x={20} y={470} w={210} h={170} k={KPI.material} />
            </g>
            <g className={s.floatB}>
              <MiniCardG idp="lp-mobile-palmcard" id="details" x={680} y={300} w={210} h={170} k={KPI.details} />
            </g>
            <PhoneG idp="lp-mobile-palm" x={235} y={0} w={430}>
              <g key={step} className="fade-in">
                <Screen idp="lp-mobile-palm" />
              </g>
            </PhoneG>
            <StepBarG x={235} y={904} w={430} on={step + 1} animate={false} />
          </Art>
        </Reveal>
      </div>
    </section>
  );
}
