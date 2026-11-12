import Button from '@/components/ui/Button';
import { HERO, PLANS, FEATURES } from '@/lib/brand';
import Shelf, { Line, Fig } from './Shelf';
import { ButtonAnatomy } from './Arts';
import s from './web-system.module.css';

// The seven buttons of the case study. `icon` ones are the square icon buttons.
const SET = [
  { key: 'yellow', name: 'Yellow primary', text: HERO.cta[0] },
  { key: 'sky', variant: 'sky', name: 'Sky secondary', text: HERO.cta[1] },
  { key: 'blue', variant: 'blue', name: 'Blue', text: PLANS.list[0].cta },
  { key: 'dark', variant: 'dark', name: 'Dark, full width', text: PLANS.list[1].cta, block: true },
  { key: 'white', variant: 'white', name: 'White', text: FEATURES.demo },
  { key: 'ghost', variant: 'ghost', name: 'Ghost', text: PLANS.toggle[1] },
  { key: 'i1', variant: 'sky', name: 'Icon square: briefcase', icon: 'briefcase', label: 'Briefcase' },
  { key: 'i2', variant: 'sky', name: 'Icon square: bell', icon: 'bell', label: 'Notifications' },
  { key: 'i3', variant: 'white', name: 'Icon square: arrow', icon: 'chevron-right', label: 'Next' },
];

// The look of each state, mirroring the shared rules in globals.css (.btn:hover, :active, :focus-visible, [disabled]).
const STATES = [
  ['Default', {}],
  ['Hover', { filter: 'brightness(1.06)', transform: 'translateY(-1px)' }],
  ['Focus-visible', { outline: '2px solid var(--blue-ink)', outlineOffset: 3, borderRadius: 2 }],
  ['Active', { transform: 'translateY(1px) scale(0.985)', filter: 'brightness(0.96)' }],
];

function Specimen({ b, style, disabled, ...rest }) {
  const st = b.variant === 'ghost' && style && style.filter ? { ...style, background: 'var(--chip)' } : style;
  return (
    <Button variant={b.variant} icon={b.icon} label={b.label} block={b.block} style={st} disabled={disabled} tabIndex={-1} {...rest}>
      {b.text}
    </Button>
  );
}

export default function ButtonBench() {
  return (
    <Shelf id="button" title="Button" note="Six variants and the icon square. 50 px high, 4 px radius, 26 px side padding, 15 px Medium. Hover lifts 1 px, active presses, disabled drops to 45%.">
      <Line label="Live">
        <div className="row" style={{ gap: 12 }}>
          {SET.filter((b) => !b.block).map((b) => (
            <Button key={b.key} variant={b.variant} icon={b.icon} label={b.label}>{b.text}</Button>
          ))}
        </div>
        <div style={{ maxWidth: 360 }}>
          <Button variant="dark" block>{PLANS.list[1].cta}</Button>
        </div>
        <div className="row" style={{ gap: 12 }}>
          <Button variant="sky" size="sm">{HERO.cta[1]}</Button>
          <Button iconRight="arrow-right">{HERO.cta[0]}</Button>
          <Button variant="white" icon="briefcase">{FEATURES.demo}</Button>
        </div>
      </Line>
      <Line label="States, forced for reading (the shared classes are not redefined)">
        <div className={s.scroll} role="group" aria-label="Button states">
          <div className={s.states}>
            {STATES.map(([n]) => (
              <span key={n} className={s.statesHead}>{n}</span>
            ))}
            {SET.map((b) => (
              <div key={b.key} className={s.statesRow}>
                <span className={`t-small ${s.stateName}`}>{b.name}</span>
                {STATES.map(([n, style]) => (
                  <div key={n} className={s.stateCell}>
                    <div className={b.block ? s.block : undefined}>
                      <Specimen b={b} style={n === 'Default' ? undefined : style} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Line>
      <Line label="Disabled">
        <div className="row" style={{ gap: 12 }}>
          {SET.map((b) => (
            <div key={b.key} className={b.block ? s.blockFixed : undefined}>
              <Specimen b={b} disabled />
            </div>
          ))}
        </div>
      </Line>
      <Fig caption="Anatomy of the primary button, drawn at three times its size.">
        <ButtonAnatomy />
      </Fig>
    </Shelf>
  );
}
