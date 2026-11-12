'use client';

import { useRef, useState } from 'react';

// Accessible tabs (tablist / tab / tabpanel, arrow keys, Home, End).
//   <Tabs id="dataviz-kinds" label="Chart kinds" tabs={[{ id: 'trend', label: 'Trend', content: <Trend /> }, ...]} />
// id must start with the page id. tone="blue" uses the blue active state. onChange(id) is optional.
// Pass `value` and `onChange` to control it from outside.
export default function Tabs({ id, label, tabs, tone, value, onChange, className = '', panelClassName = '' }) {
  const [inner, setInner] = useState(tabs[0].id);
  const active = value !== undefined ? value : inner;
  const refs = useRef({});
  const select = (tid, focus) => {
    if (value === undefined) setInner(tid);
    if (onChange) onChange(tid);
    if (focus && refs.current[tid]) refs.current[tid].focus();
  };
  const onKey = (e) => {
    const i = tabs.findIndex((t) => t.id === active);
    let n = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = tabs.length - 1;
    if (n < 0) return;
    e.preventDefault();
    select(tabs[n].id, true);
  };
  const current = tabs.find((t) => t.id === active) || tabs[0];
  return (
    <div className={className}>
      <div className={`tabs ${tone === 'blue' ? 'tabs-blue' : ''}`} role="tablist" aria-label={label} onKeyDown={onKey}>
        {tabs.map((t) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[t.id] = el; }}
            type="button"
            role="tab"
            id={`${id}-tab-${t.id}`}
            className="tab"
            aria-selected={t.id === current.id}
            aria-controls={`${id}-panel`}
            tabIndex={t.id === current.id ? 0 : -1}
            onClick={() => select(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${current.id}`} tabIndex={0} className={`tabpanel ${panelClassName}`} key={current.id}>
        {current.content}
      </div>
    </div>
  );
}
