'use client';

import Tabs from '@/components/ui/Tabs';
import CopyValue from '@/components/site/CopyValue';
import Icon from '@/components/site/Icon';
import s from './web-system.module.css';

// Real tokens, copied from globals.css.
const GROUPS = [
  {
    id: 'palette',
    label: 'Palette',
    rows: [
      ['--blue', '#4093ec'], ['--yellow', '#ffb83d'], ['--sky', '#90c0f3'], ['--blue-field', '#53a2f7'], ['--blue-deep', '#006bee'],
      ['--ink', '#2f2f2f'], ['--paper', '#fafafa'], ['--tile', '#f5f5f5'], ['--chip', '#f0f0f0'], ['--card', '#e9e9e9'], ['--app', '#dddddd'], ['--red', '#e2383b'],
    ],
  },
  {
    id: 'motion',
    label: 'Motion',
    rows: [
      ['--ease-out', 'cubic-bezier(0.22, 1, 0.36, 1)'], ['--ease-in-out', 'cubic-bezier(0.65, 0, 0.35, 1)'],
      ['--ease-draw', 'cubic-bezier(0.4, 0, 0.2, 1)'], ['--ease-snap', 'cubic-bezier(0.3, 1.3, 0.5, 1)'],
      ['--dur-1', '140ms'], ['--dur-2', '280ms'], ['--dur-3', '520ms'], ['--dur-4', '900ms'], ['--dur-5', '1600ms'], ['--stagger', '60ms'],
    ],
  },
  {
    id: 'shape',
    label: 'Shape and type',
    rows: [
      ['--r-1', '4px'], ['--r-2', '6px'], ['--r-3', '12px'], ['--w-light', '300'], ['--w-regular', '400'], ['--w-medium', '500'],
    ],
  },
];

const textOf = (g) => `:root {\n${g.rows.map(([n, v]) => `  ${n}: ${v};`).join('\n')}\n}`;

function Block({ g }) {
  const pad = Math.max(...g.rows.map(([n]) => n.length)) + 1;
  return (
    <div>
      <pre className={s.code} role="region" tabIndex={0} aria-label={`${g.label} tokens`}>
        <code>
          {':root {\n'}
          {g.rows.map(([n, v]) => (
            <span key={n}>
              {'  ' + (n + ':').padEnd(pad + 1)}
              <CopyValue value={v} label={`${n} value`} className={s.codeVal}>{v}</CopyValue>
              {';\n'}
            </span>
          ))}
          {'}'}
        </code>
      </pre>
      <div className={s.codeBar}>
        <span className="t-small">Click a value to copy it.</span>
        <CopyValue value={textOf(g)} label={`all ${g.label} tokens`} className={s.copyAll}>
          <Icon name="copy" size={16} />
          Copy block
        </CopyValue>
      </div>
    </div>
  );
}

export default function TokenBlock() {
  return (
    <Tabs
      id="web-system-tokens"
      label="Token groups"
      tone="blue"
      tabs={GROUPS.map((g) => ({ id: g.id, label: g.label, content: <div style={{ marginTop: 14 }}><Block g={g} /></div> }))}
    />
  );
}
