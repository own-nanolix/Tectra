'use client';

import { useState } from 'react';
import Field from '@/components/ui/Field';
import { Segmented } from '@/components/ui/Toggle';
import { WEIGHTS } from '@/lib/brand';
import { s } from './typoStyles';

// A live specimen: type a line, pick a weight.
export default function Tester() {
  const [text, setText] = useState('Smart Construction');
  const [weight, setWeight] = useState('Light');
  const w = WEIGHTS.find(([n]) => n === weight)[1];
  return (
    <div className={s.tester}>
      <Field id="typography-line" label="Your line" value={text} onChange={(e) => setText(e.target.value)} maxLength={60} />
      <Segmented id="typography-weight" label="Weight" options={WEIGHTS.map(([n]) => n)} value={weight} onChange={setWeight} />
      <p className={s.preview} style={{ fontWeight: w }} aria-live="polite">{text || ' '}</p>
    </div>
  );
}
