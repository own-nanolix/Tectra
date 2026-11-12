// The app's own parts as standalone, exportable SVG artwork (the same drawing the screens use).
import Art from '@/components/art/Art';
import { IconUse } from '@/components/site/Icon';
import { TickBarsG } from '@/components/art/KeyArt';
import { CutFillG } from '@/components/art/Devices';
import { KPI, CUT_FILL, VOLUME } from '@/lib/brand';
import { GaugeCardG, AxisRow, SiteG, VolumeG, TimelineG } from './shared';
import s from './mobile-a.module.css';

const INK = '#2F2F2F';
const TAB_ICONS = ['layers', 'link', 'headset', 'gear', 'folder'];

function Part({ title, cap, wide, children }) {
  return (
    <figure className={`${s.part} ${wide ? s.partWide : ''}`} style={{ margin: 0 }}>
      {children}
      <figcaption className={s.partCap}>{cap || title}</figcaption>
    </figure>
  );
}

export default function Parts() {
  const k = KPI;
  const gauges = [
    ['details', k.details, 'up', 'blue', 125, undefined],
    ['notes', k.notes, 'down', 'yellow', 125, undefined],
    ['material', k.material, 'up', 'blue', 135, k.material.legend],
  ];
  return (
    <div className={s.parts}>
      {gauges.map(([name, v, dir, tone, r, legend]) => (
        <Part key={name} title={v.label}>
          <Art viewBox="0 0 340 190" title={`${v.label} card, ${v.value}`} exportName={`mobile-a-card-${name}`}>
            <GaugeCardG idp={`mobile-a-pt-${name}`} w={340} h={190} r={r} title={v.label} value={v.value} trend={v.trend} dir={dir} tone={tone} legend={legend} />
          </Art>
        </Part>
      ))}

      <Part title={k.cross.label} wide>
        <Art viewBox="0 0 700 230" title="2D Cross Section Z (ft) tick-bar chart" exportName="mobile-a-tick-chart">
          <rect width="700" height="230" rx="4" fill="#E9E9E9" />
          <text x="24" y="40" fontSize="20" fontWeight="500" fill={INK}>{k.cross.label}</text>
          <text x="24" y="86" fontSize="36" fontWeight="300" fill={INK}>{k.cross.value}</text>
          <text x="104" y="84" fontSize="14" fill={INK}>{k.cross.trend}</text>
          <path d="M156 78l5-7 5 7z" fill="#FFB83D" />
          <g transform="translate(24 100)">
            <TickBarsG idp="mobile-a-pt-tick" w={652} h={70} count={64} from={0.33} to={0.6} tone="yellow" base="#C9C9C9" rise />
            <AxisRow w={652} y={104} />
          </g>
        </Art>
      </Part>

      <Part title={CUT_FILL.title}>
        <Art viewBox="0 0 360 250" title="Cut and Fill instrument with indicators" exportName="mobile-a-cut-fill">
          <rect width="360" height="250" rx="4" fill="#E9E9E9" />
          <text x="20" y="36" fontSize="18" fontWeight="500" fill={INK}>{CUT_FILL.title}</text>
          <text x="20" y="58" fontSize="13" fill="#5E5E5E">{CUT_FILL.date}</text>
          <CutFillG x={20} y={80} w={320} h={90} top={CUT_FILL.top} bottom={CUT_FILL.bottom} />
          <text x="20" y="206" fontSize="14" fontWeight="500" fill={INK}>Indicators</text>
          {CUT_FILL.indicators.map(([a, b], i) => (
            <text key={a} x={20 + (i % 2) * 170} y={i < 2 ? 226 : 244} fontSize="13" fill={INK}>{`${a} ${b}`}</text>
          ))}
        </Art>
      </Part>

      <Part title="Floating tab bar">
        <Art viewBox="0 0 300 76" title="Floating tab bar, five icons, link active" exportName="mobile-a-tab-bar">
          <rect x="8" y="10" width="284" height="56" rx="4" fill="#C4C4C4" />
          <rect x="62" y="14" width="52" height="48" rx="3" fill="#FFB83D" />
          {TAB_ICONS.map((n, i) => <IconUse key={n} name={n} x={20 + i * 54 + 4} y={26} size={24} color={INK} stroke={INK} />)}
        </Art>
      </Part>

      <Part title="Work areas" wide>
        <Art viewBox="0 0 560 400" title="Site drawing with location pins" exportName="mobile-a-site-pins">
          <rect width="560" height="400" rx="4" fill="#F5F5F5" />
          <SiteG tone="paper" seed={5} />
        </Art>
      </Part>

      <Part title="Timeline">
        <Art viewBox="0 0 340 450" title="Timeline: roadmap stages as a vertical stepped list" exportName="mobile-a-timeline">
          <rect width="340" height="450" rx="4" fill="#E9E9E9" />
          <text x="20" y="36" fontSize="18" fontWeight="500" fill={INK}>Timeline</text>
          <g transform="translate(14 56)"><TimelineG /></g>
        </Art>
      </Part>

      <Part title="Volume bar">
        <Art viewBox="0 0 310 96" title={`${VOLUME.from} to ${VOLUME.to}, 4 of 8 segments`} exportName="mobile-a-volume-bar">
          <VolumeG from={VOLUME.from} to={VOLUME.to} />
        </Art>
      </Part>
    </div>
  );
}
