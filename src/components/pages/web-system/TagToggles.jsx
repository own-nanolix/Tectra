'use client';

import { useState } from 'react';
import Chip from '@/components/ui/Chip';
import Toggle, { Segmented } from '@/components/ui/Toggle';
import { SCOPE_CHIPS, PLANS } from '@/lib/brand';
import s from './web-system.module.css';

// Live toggle chips (aria-pressed), the switch and the Monthly / Annually pair.
export default function TagToggles() {
  const [on, setOn] = useState({ Research: true, 'UI design': true });
  const [yearly, setYearly] = useState(false);
  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <div className="row" style={{ gap: 12 }} role="group" aria-label="Scope filters">
        {SCOPE_CHIPS.map((c) => (
          <Chip key={c} pressed={!!on[c]} onClick={() => setOn((o) => ({ ...o, [c]: !o[c] }))}>{c}</Chip>
        ))}
      </div>
      <div className="cells">
        <Segmented id="web-system-billing" label="Billing period" options={PLANS.toggle} />
        <Toggle label={PLANS.toggle[1]} checked={yearly} onChange={setYearly} />
      </div>
      <p className="t-small" aria-live="polite">
        <span className={s.statusRow}>Pressed: {SCOPE_CHIPS.filter((c) => on[c]).join(', ') || 'none'}</span>
      </p>
    </div>
  );
}
