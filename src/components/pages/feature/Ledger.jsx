import Reveal from '@/components/site/Reveal';
import { Trend } from '@/components/ui/Chip';
import { CROSS, CUT_FILL, MARKERS, PINS, VOLUME, axisAt } from './data';
import FigureSheet from './FigureSheet';
import s from './feature.module.css';

// The caption ledger under the stage: a row of label and figure for everything the stage shows.
// The row of the selected pin, the live range and the Cut or Fill row of the selected marker are marked.
function Row({ label, detail, figure, on, dot }) {
  return (
    <tr className={s.row} data-on={on ? 'true' : undefined} aria-current={on ? 'true' : undefined}>
      <th scope="row" className={s.rowLabel}>
        {dot && <span className={`dot dot-yellow ${s.rowDot}`} aria-hidden="true" />}
        {label}
      </th>
      <td className={s.rowDetail}>{detail}</td>
      <td className={s.rowFigure}>{figure}</td>
    </tr>
  );
}

function Group({ title, children }) {
  return (
    <tbody>
      <tr>
        <th colSpan={3} scope="colgroup" className={`t-caps ${s.groupHead}`}>{title}</th>
      </tr>
      {children}
    </tbody>
  );
}

export default function Ledger({ sel, range, marker }) {
  const kind = marker ? marker.split('-')[0] : null;
  const m = MARKERS.find((x) => x.id === marker);
  const [cut, fill, net] = CUT_FILL.indicators;
  return (
    <div className={`wrap ${s.ledger}`}>
      <div className={s.ledgerHead}>
        <Reveal>
          <h2 className="t-h2">Caption ledger</h2>
        </Reveal>
      </div>
      <div className={s.ledgerGrid}>
        <Reveal className={s.tableWrap}>
          <table className={s.table}>
            <caption className="sr-only">Every label and figure shown on the site view</caption>
            <thead className="sr-only">
              <tr><th scope="col">Label</th><th scope="col">Detail</th><th scope="col">Figure</th></tr>
            </thead>
            <Group title="Work cards">
              {PINS.map((p) => (
                <Row
                  key={p.id}
                  label={p.name}
                  detail={p.meta || <Trend dir={p.dir}>{p.trend}</Trend>}
                  figure={p.value}
                  on={sel === p.id}
                  dot={sel === p.id}
                />
              ))}
            </Group>
            <Group title={CROSS.title}>
              <Row label={CROSS.legend} detail={`${axisAt(range[0])} - ${axisAt(range[1])}`} figure={CROSS.value} on />
              <Row label={CROSS.title} detail={<Trend dir="up">{CROSS.trend}</Trend>} figure={CROSS.value} />
            </Group>
            <Group title={CUT_FILL.title}>
              <Row label="Date" detail={CUT_FILL.date.replace('Date: ', '')} figure="" />
              <Row label="Levels, top row" detail={CUT_FILL.top.join('   ')} figure={kind === 'fill' ? m.level : ''} on={kind === 'fill'} />
              <Row label="Levels, bottom row" detail={CUT_FILL.bottom.join('   ')} figure={kind === 'cut' ? m.level : ''} on={kind === 'cut'} />
              <Row label={cut[0].replace(':', '')} detail="Indicators" figure={cut[1]} on={kind === 'cut'} />
              <Row label={fill[0].replace(':', '')} detail="Indicators" figure={fill[1]} on={kind === 'fill'} />
              <Row label={net[0].replace(':', '')} detail="Indicators" figure={net[1]} />
            </Group>
            <Group title="Volume">
              <Row label={VOLUME.from} detail={`${VOLUME.filled} of ${VOLUME.segments} segments`} figure={VOLUME.to} />
            </Group>
          </table>
        </Reveal>
        <Reveal delay={120} className={s.sheet}>
          <FigureSheet />
        </Reveal>
      </div>
    </div>
  );
}
