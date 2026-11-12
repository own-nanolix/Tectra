import Art from '@/components/art/Art';
import { TabletG, PhoneG, WatchG, ScreenHomeG, ScreenWatchG } from '@/components/art/Devices';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG } from '@/components/art/Mockup';
import { r2 } from '@/lib/charts';
import { TabletScreen } from './Tablet';

// One screen layer, lifted off its frame along y. (x, y) is where the screen sits in the assembled frame.
function Lifted({ idp, id, x, y, w, h, rx, k, lift, i, children }) {
  return (
    <g>
      {/* the footprint the screen left behind, and guides up to the lifted corners */}
      <rect x={x} y={y} width={w} height={h} rx={rx} fill="#006BEE" opacity="0.14" filter={`url(#${idp}-lb)`} />
      {[x, x + w].map((cx) => (
        <path key={cx} d={`M${r2(cx)} ${r2(y + h)}V${r2(y + h - lift)}`} className="mock-guide" />
      ))}
      <LayerG i={i} dy={-lift}>
        <g transform={`translate(${r2(x)} ${r2(y)})`}>
          <clipPath id={`${idp}-${id}-clip`}>
            <rect width={w} height={h} rx={rx} />
          </clipPath>
          <rect x="-3" y="-3" width={w + 6} height={h + 6} rx={rx + 3} fill="#FFFFFF" opacity="0.55" />
          <g clipPath={`url(#${idp}-${id}-clip)`}>
            <g transform={`scale(${k})`}>{children}</g>
            <rect width={w} height={h} fill={`url(#${idp}-glass)`} />
          </g>
          <rect width={w} height={h} rx={rx} fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
          <rect width={w} height={h} rx={rx} fill="none" stroke="#006BEE" strokeWidth="1" opacity="0.35" />
        </g>
      </LayerG>
    </g>
  );
}

export function TrioArt() {
  const idp = 'use-product-trio';
  const base = 640;
  const tk = 560 / 1260;
  const pk = 190 / 430;
  const wk = 118 / 240;
  const tX = 70;
  const tY = base - 900 * tk;
  const pX = 700;
  const pY = base - 884 * pk;
  const wX = 1040;
  const wY = base - 490 * wk;
  return (
    <Art viewBox="0 0 1200 760" title="Tablet, phone and watch, screens lifted" exportName="use-product-devices">
      <MaterialDefs idp={idp} />
      <defs>
        <filter id={`${idp}-lb`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <BackdropG w={1200} h={760} />
      <ShadowG idp={`${idp}-t`} cx={tX + 280} cy={base + 4} rx={290} ry={22} tone="blue" opacity={0.34} blur={12} />
      <ShadowG idp={`${idp}-p`} cx={pX + 95} cy={base + 4} rx={120} ry={16} tone="yellow" opacity={0.4} blur={10} />
      <ShadowG idp={`${idp}-w`} cx={wX + 59} cy={base + 4} rx={90} ry={14} tone="sky" opacity={0.5} blur={9} />
      <path d={`M40 ${base + 1}H1160`} className="mock-guide" />

      <TabletG idp={`${idp}-t`} x={tX} y={tY} w={560} screenFill="#0B0B0D" />
      <PhoneG idp={`${idp}-p`} x={pX} y={pY} w={190} screenFill="#0B0B0D" />
      <WatchG idp={`${idp}-w`} x={wX} y={wY} w={118} />

      <AxisG points={[[tX + 280, tY + 40 * tk + 410 * tk], [tX + 280, tY + 40 * tk + 410 * tk - 70]]} />
      <AxisG points={[[pX + 95, pY + 20 * pk + 422 * pk], [pX + 95, pY + 20 * pk + 422 * pk - 96]]} />
      <AxisG points={[[wX + 59, wY + 133 * wk + 112 * wk], [wX + 59, wY + 133 * wk + 112 * wk - 80]]} />

      <Lifted idp={idp} id="t" x={tX + 40 * tk} y={tY + 40 * tk} w={1180 * tk} h={820 * tk} rx={14 * tk} k={tk} lift={70} i={0}>
        <TabletScreen idp={`${idp}-ta`} />
      </Lifted>
      <Lifted idp={idp} id="p" x={pX + 20 * pk} y={pY + 20 * pk} w={390 * pk} h={844 * pk} rx={48 * pk} k={pk} lift={96} i={1}>
        <ScreenHomeG idp={`${idp}-ph`} />
      </Lifted>
      <Lifted idp={idp} id="w" x={wX + 28 * wk} y={wY + 133 * wk} w={184 * wk} h={224 * wk} rx={44 * wk} k={wk} lift={80} i={2}>
        <ScreenWatchG />
      </Lifted>
    </Art>
  );
}
