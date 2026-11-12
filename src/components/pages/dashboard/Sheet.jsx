// Below the shell: the exportable charts and illustrations, then the dashboard components sheet.
// Each component is shown with its states; data-s forces a state so it can be seen without hovering.
import Icon from '@/components/site/Icon';
import Chip, { Trend } from '@/components/ui/Chip';
import { NAV, KPI, KOMATSU } from '@/lib/brand';
import { TickChart, ProgressBar, AreaChart, VolumeBar, GaugeArt, CutFillChart, Site } from './charts';
import s from './dashboard.module.css';

export function Gallery() {
  const cell = (label, node, wide) => (
    <figure className={`${s.gcell} ${wide ? s.wide : ''}`}>
      <div className={s.gbox}>{node}</div>
      <figcaption className="t-small">{label}</figcaption>
    </figure>
  );
  return (
    <div className={s.gal}>
      {cell('Tick-bar chart', <TickChart idp="dashboard-gal-tb" name="dashboard-tick-chart" />, true)}
      {cell('Progress bar', <ProgressBar idp="dashboard-gal-pb" name="dashboard-progress-bar" />, true)}
      {cell('Area chart', <AreaChart idp="dashboard-gal-ar" name="dashboard-area-chart" />)}
      {cell('Volume bar', <VolumeBar name="dashboard-volume-bar" />)}
      {cell('Details gauge', <GaugeArt idp="dashboard-gal-g1" k="details" name="dashboard-gauge-details" />)}
      {cell('Notes gauge', <GaugeArt idp="dashboard-gal-g2" k="notes" name="dashboard-gauge-notes" />)}
      {cell('Material gauge', <GaugeArt idp="dashboard-gal-g3" k="material" name="dashboard-gauge-material" />)}
      {cell('Cut and Fill instrument', <CutFillChart name="dashboard-cut-fill" />, true)}
      {cell('Site illustration', <Site idp="dashboard-gal-site" name="dashboard-site" />, true)}
    </div>
  );
}

function Spec({ title, states, render, wide }) {
  return (
    <section className={`${s.spec} ${wide ? s.wide : ''}`}>
      <h3 className="t-title">{title}</h3>
      <div className={s.states}>
        {states.map((st) => (
          <figure key={st} className={s.fig}>
            <div className={s.figBox}>{render(st)}</div>
            <figcaption className="t-small">{st}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const std = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];
const lo = (t) => t.toLowerCase();
const ICONS = ['layers', 'chart', 'calendar', 'folder'];
const Mini = ({ k, st }) => (
  <button type="button" className={s.tileKpi} data-s={lo(st)} aria-pressed={st === 'Selected' ? true : undefined}>
    <span className="t-small">{KPI[k].label}</span>
    <span className={s.tv}>{KPI[k].value}</span>
    <Trend dir={KPI[k].dir}>{KPI[k].trend}</Trend>
  </button>
);
const Th = ({ st }) => (
  <table className={s.mini}>
    <thead><tr>
      <th scope="col" aria-sort={st === 'Ascending' ? 'ascending' : st === 'Descending' ? 'descending' : 'none'}>
        <button type="button" className={s.sortBtn} data-s={st === 'Hover' || st === 'Focus' ? lo(st) : undefined}>
          Name<Icon name={st === 'Ascending' ? 'arrow-up' : st === 'Descending' ? 'arrow-down' : 'sort'} size={14} />
        </button>
      </th>
    </tr></thead>
  </table>
);
const Tr = ({ st }) => (
  <table className={s.mini}>
    <tbody>
      {st === 'Placeholder' ? (
        <tr className={s.ph} aria-hidden="true"><td><i style={{ width: '60%' }} /></td><td><i style={{ width: '40%' }} /></td></tr>
      ) : (
        <tr data-s={lo(st)} data-picked={st === 'Selected' ? '' : undefined}><td>{KPI.details.label}</td><td className={s.num}>{KPI.details.value}</td></tr>
      )}
    </tbody>
  </table>
);

export default function Sheet() {
  return (
    <div className={s.sheet}>
      <Spec title="Sidebar item" states={std} render={(st) => (
        <button type="button" className={`${s.ctl} ${s.sb}`} data-s={lo(st)} aria-current={st === 'Active' ? 'page' : undefined} disabled={st === 'Disabled'}>
          <Icon name={ICONS[0]} size={20} />{NAV[1]}
        </button>
      )} />
      <Spec title="Rail item" states={std} render={(st) => (
        <button type="button" className={s.ibtn} data-s={lo(st)} aria-current={st === 'Active' ? 'true' : undefined} disabled={st === 'Disabled'} aria-label={`Link, ${lo(st)}`}>
          <Icon name="link" size={24} />
        </button>
      )} />
      <Spec title="KPI tile" states={['Default', 'Hover', 'Selected', 'Focus']} render={(st) => <Mini k="details" st={st} />} />
      <Spec title="KPI tile, down trend" states={['Default', 'Hover', 'Selected', 'Focus']} render={(st) => <Mini k="notes" st={st} />} />
      <Spec title="Table header" states={['Default', 'Hover', 'Focus', 'Ascending', 'Descending']} render={(st) => <Th st={st} />} />
      <Spec title="Table row" states={['Default', 'Hover', 'Selected', 'Placeholder']} render={(st) => <Tr st={st} />} />
      <Spec title="Filter chip" states={std} render={(st) => (
        <Chip size="sm" className={s.chipx} data-s={lo(st)} pressed={st === 'Active'} disabled={st === 'Disabled'}>Up</Chip>
      )} />
      <Spec title="Status row" states={['Attention', 'Alert', 'Normal', 'Hover']} render={(st) => (
        <div className={s.status} data-s={st === 'Hover' ? 'hover' : undefined}>
          <i className={`dot ${st === 'Attention' ? 'dot-yellow' : st === 'Alert' ? 'dot-red' : ''}`} />
          <span>{st === 'Attention' ? KOMATSU.name : st === 'Alert' ? KPI.notes.label : KPI.material.legend}</span>
          <b>{st === 'Attention' ? KOMATSU.value : st === 'Alert' ? KPI.notes.trend : KPI.material.trend}</b>
        </div>
      )} />
      <Spec title="Search field" states={['Empty', 'Focus', 'Filled', 'Disabled']} render={(st) => (
        <label className={s.search} data-s={lo(st)}>
          <Icon name="search" size={18} />
          <span className="sr-only">Search, {lo(st)}</span>
          <input type="search" placeholder="Search" defaultValue={st === 'Filled' ? KOMATSU.name : ''} disabled={st === 'Disabled'} tabIndex={-1} />
        </label>
      )} />
      <Spec title="Date range" states={['Default', 'Hover', 'Open', 'Focus', 'Disabled']} render={(st) => (
        <button type="button" className={`${s.ctl} ${s.date2}`} data-s={lo(st)} aria-expanded={st === 'Open'} disabled={st === 'Disabled'}>
          <Icon name="calendar" size={18} />{KOMATSU.dates}<Icon name="chevron-down" size={16} />
        </button>
      )} />
      <Spec title="Account chip" states={['Default', 'Hover', 'Open', 'Focus']} render={(st) => (
        <button type="button" className={`${s.ctl} ${s.acct}`} data-s={lo(st)} aria-expanded={st === 'Open'} aria-label={`Account, ${lo(st)}`}>
          <span className={s.user2}><Icon name="user" size={20} /></span>
          <Icon name="chevron-down" size={16} />
        </button>
      )} />
    </div>
  );
}
