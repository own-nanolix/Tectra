'use client';

import { useState } from 'react';

// A switch.  <Toggle label="Annually" checked={yearly} onChange={setYearly} />
// Uncontrolled when `checked` is not given (use defaultChecked).
export default function Toggle({ label, checked, defaultChecked = false, onChange, className = '', hideLabel = false, ...rest }) {
  const [inner, setInner] = useState(defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const flip = () => {
    if (checked === undefined) setInner(!on);
    if (onChange) onChange(!on);
  };
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={hideLabel ? label : undefined} className={`toggle ${className}`} onClick={flip} {...rest}>
      <span className="toggle-track" aria-hidden="true">
        <span className="toggle-thumb" />
      </span>
      {!hideLabel && <span>{label}</span>}
    </button>
  );
}

// The landing page's two-option switch ("Monthly" / "Annually"): two buttons, one pressed.
// <Segmented id="lp-home-billing" label="Billing period" options={['Monthly', 'Annually']} value={v} onChange={setV} />
export function Segmented({ id, label, options, value, onChange, className = '' }) {
  const [inner, setInner] = useState(options[0]);
  const active = value !== undefined ? value : inner;
  const pick = (o) => {
    if (value === undefined) setInner(o);
    if (onChange) onChange(o);
  };
  return (
    <div className={`row ${className}`} role="group" aria-label={label} id={id} style={{ gap: 4 }}>
      {options.map((o) => (
        <button key={o} type="button" className={`btn btn-sm ${o === active ? 'btn-blue' : 'btn-ghost'}`} style={o === active ? undefined : { boxShadow: 'none' }} aria-pressed={o === active} onClick={() => pick(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}
