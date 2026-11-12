// The library: six named gradients, one SVG plate each.
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { TreesG } from '@/components/art/KeyArt';
import { areaPath, curvePath, tickBars, r2 } from '@/lib/charts';
import { GRADS, Linear, Plate, gradById } from './kit';
import s from './gradients.module.css';

const V = { field: [640, 440], fade: [560, 440], glass: [600, 380], area: [1200, 360] };

function FieldPlate() {
  const [w, h] = V.field, g = gradById('field');
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={`${g.name} gradient, ${g.spec}`} exportName="gradients-field">
      <defs><Linear id="gradients-lib-field" w={w} h={h} deg={160} stops={g.stops} /></defs>
      <rect width={w} height={h} fill="url(#gradients-lib-field)" />
      <MarkG x={w - 120} y={h - 120} size={72} fill="#FFFFFF" />
    </Art>
  );
}

// A fading bar plate: n bars on a pale tile, each filled with the gradient.
function FadePlate({ gid, exportName, bars = 28 }) {
  const [w, h] = V.fade, g = gradById(gid), n = bars;
  const list = tickBars(n, w - 80, 0, 1, 0.5);
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={`${g.name} gradient, ${g.spec}`} exportName={exportName}>
      <defs>
        <linearGradient id={`gradients-lib-${gid}`} x1="0" y1="0" x2="0" y2="1">
          {g.stops.map(([c, o, p], i) => <stop key={i} offset={`${p}%`} stopColor={c} stopOpacity={o} />)}
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="#F5F5F5" />
      <g transform="translate(40 40)">
        {list.map((b, i) => <rect key={i} x={b.x} y="0" width={b.w} height={h - 80} fill={`url(#gradients-lib-${gid})`} />)}
      </g>
    </Art>
  );
}

function GlassPlate() {
  const [w, h] = V.glass, g = gradById('glass');
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={`${g.name} gradient, ${g.spec}`} exportName="gradients-glass">
      <defs>
        <Linear id="gradients-lib-glass-bg" w={w} h={h} deg={160} stops={gradById('field').stops} />
        <Linear id="gradients-lib-glass" x={90} y={70} w={420} h={240} deg={180} stops={g.stops} />
      </defs>
      <rect width={w} height={h} fill="url(#gradients-lib-glass-bg)" />
      <TreesG x={0} y={0} w={w} h={h} count={9} tone="blue" seed={21} minSize={70} maxSize={130} />
      <rect x="90" y="70" width="420" height="240" rx="4" fill="url(#gradients-lib-glass)" />
      <rect x="90.5" y="70.5" width="419" height="239" rx="3.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.3" />
      <rect x="120" y="106" width="150" height="10" rx="2" fill="#FFFFFF" fillOpacity="0.85" />
      <rect x="120" y="132" width="90" height="8" rx="2" fill="#FFFFFF" fillOpacity="0.5" />
      <rect x="120" y="244" width="360" height="6" rx="2" fill="#FFFFFF" fillOpacity="0.35" />
      <rect x="120" y="244" width="150" height="6" rx="2" fill="#FFFFFF" />
    </Art>
  );
}

function AreaPlate() {
  const [w, h] = V.area, g = gradById('area');
  const pts = [0, 0.5, 0.28, 0.55, 0.38, 0.7, 0.52, 0.64, 0.8, 0.9, 1].map((v, i, a) => [40 + (i / (a.length - 1)) * (w - 80), 330 - (0.2 + v * 0.62) * 230]);
  const top = curvePath(pts);
  const mark = pts[7];
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={`${g.name} gradient, ${g.spec}`} exportName="gradients-area">
      <defs>
        <Linear id="gradients-lib-area-bg" w={w} h={h} deg={160} stops={gradById('field').stops} />
        <linearGradient id="gradients-lib-area" x1="0" y1="0" x2="0" y2="1">
          {g.stops.map(([c, o, p], i) => <stop key={i} offset={`${p}%`} stopColor={c} stopOpacity={o} />)}
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="url(#gradients-lib-area-bg)" />
      <path d={areaPath(pts, 330, true)} fill="url(#gradients-lib-area)" />
      <path d={top} fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <path d={`M${r2(mark[0])} ${r2(mark[1])}V330`} stroke="#FFFFFF" strokeOpacity="0.5" strokeDasharray="3 5" />
      <circle cx={r2(mark[0])} cy={r2(mark[1])} r="9" fill="#FFFFFF" fillOpacity="0.35" />
      <circle cx={r2(mark[0])} cy={r2(mark[1])} r="4" fill="#FFFFFF" />
    </Art>
  );
}

export default function Library() {
  return (
    <div className={s.wall}>
      <Plate span={7} name={GRADS[0].name} spec={GRADS[0].spec}><FieldPlate /></Plate>
      <Plate span={5} name={GRADS[1].name} spec={GRADS[1].spec}><FadePlate gid="blue-fade" exportName="gradients-blue-fade" /></Plate>
      <Plate span={4} name={GRADS[2].name} spec={GRADS[2].spec}><FadePlate gid="signal-fade" exportName="gradients-signal-fade" bars={20} /></Plate>
      <Plate span={4} name={GRADS[3].name} spec={GRADS[3].spec}><FadePlate gid="idle-fade" exportName="gradients-idle-fade" bars={36} /></Plate>
      <Plate span={4} name={GRADS[4].name} spec={GRADS[4].spec}><GlassPlate /></Plate>
      <Plate span={12} name={GRADS[5].name} spec={GRADS[5].spec}><AreaPlate /></Plate>
    </div>
  );
}
