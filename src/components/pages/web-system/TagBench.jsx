import Chip, { Trend } from '@/components/ui/Chip';
import { HEADINGS, SCOPE_CHIPS, STRATEGY_CHIPS, KPI } from '@/lib/brand';
import Shelf, { Line, Fig } from './Shelf';
import TagToggles from './TagToggles';
import { ChipSheet } from './Arts';
import s from './web-system.module.css';

const SECTION = Object.values(HEADINGS).map((h) => h.chip);
const TONES = [[undefined, 'Default'], ['blue', 'Sky'], ['yellow', 'Yellow'], ['ink', 'Ink']];

function Status({ tone, children }) {
  return (
    <Chip size="sm">
      <span className={`dot ${tone ? `dot-${tone}` : ''}`} aria-hidden="true" />
      {children}
    </Chip>
  );
}

export default function TagBench() {
  return (
    <Shelf id="tag" title="Tag" note="Chips are flat #F0F0F0 blocks with a 4 px radius: padding 14 / 24 and 16 px type, or 8 / 12 and 13 px when small. Trend labels carry the triangle: yellow up, red down.">
      <Line label="Section chip">
        <div className="row" style={{ gap: 12 }}>
          {SECTION.map((c) => <Chip key={c}>{c}</Chip>)}
        </div>
      </Line>
      <Line label="Scope chips and figure chips">
        <div className="row" style={{ gap: 12 }}>
          {SCOPE_CHIPS.map((c, i) => <Chip key={c} tone={['blue', 'yellow', 'ink', undefined][i]}>{c}</Chip>)}
        </div>
        <div className="row" style={{ gap: 12 }}>
          {STRATEGY_CHIPS.map((c) => <Chip key={c}>{c}</Chip>)}
        </div>
      </Line>
      <Line label="Status chips with dots">
        <div className="row" style={{ gap: 12 }}>
          <Status>{KPI.material.legend}</Status>
          <Status tone="yellow">Cut</Status>
          <Status tone="red">{KPI.notes.label}</Status>
        </div>
      </Line>
      <Line label="Trend labels">
        <div className="row" style={{ gap: 24 }}>
          <Trend dir="up">{KPI.details.trend}</Trend>
          <Trend dir="up">{KPI.material.trend}</Trend>
          <Trend dir="down">{KPI.notes.trend}</Trend>
        </div>
      </Line>
      <Line label="Toggle chips (pressed), switch and billing pair">
        <TagToggles />
      </Line>
      <Line label="Chip states, forced for reading">
        <div className={s.cells}>
          {TONES.map(([t, n]) => (
            <div key={n} className={s.cell}>
              <Chip tone={t} size="sm">{n}</Chip>
              <span className="t-small">{t ? `chip-${t}` : 'chip'}</span>
            </div>
          ))}
          <div className={s.cell}><Chip size="sm">Default</Chip><span className="t-small">Default</span></div>
          <div className={s.cell}><Chip size="sm" className={s.forcedHover}>Hover</Chip><span className="t-small">Hover</span></div>
          <div className={s.cell}><Chip size="sm" className={s.forcedActive}>Active</Chip><span className="t-small">Active</span></div>
          <div className={s.cell}><Chip size="sm" className={s.forcedPressed}>Pressed</Chip><span className="t-small">Pressed</span></div>
          <div className={s.cell}><Chip size="sm" className={s.dim}>Disabled</Chip><span className="t-small">Disabled</span></div>
        </div>
      </Line>
      <Fig caption="The chip family as one sheet.">
        <ChipSheet />
      </Fig>
    </Shelf>
  );
}
