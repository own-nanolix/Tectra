// Four looping motion studies. The markup is the finished frame; the keyframes (gradients.module.css)
// only move parts away from it and back.
import Art from '@/components/art/Art';
import { IsoSiteG, PinG } from '@/components/art/KeyArt';
import { MARK, MARK_BODY } from '@/components/art/Mark';
import { axisLabels, ruler, tickBars } from '@/lib/charts';
import { Linear, Plate, gradById } from './kit';
import s from './gradients.module.css';

const FIELD = gradById('field').stops;

function Wave() {
  const bars = tickBars(40, 400, 0.3, 0.62, 0.5);
  return (
    <Art viewBox="0 0 400 300" title="Tick bars breathing in a wave" exportName="gradients-motion-wave">
      <defs>
        <linearGradient id="gradients-m1-on" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4093EC" /><stop offset="1" stopColor="#4093EC" stopOpacity="0" /></linearGradient>
        <linearGradient id="gradients-m1-off" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#DFDFDF" /><stop offset="1" stopColor="#DFDFDF" stopOpacity="0" /></linearGradient>
      </defs>
      <rect width="400" height="300" fill="#F5F5F5" />
      <g transform="translate(0 60)">
        {bars.map((b, i) => (
          <rect key={i} className={s.wave} style={{ '--i': i }} x={b.x} y="0" width={b.w} height="170" fill={`url(#gradients-m1-${b.on ? 'on' : 'off'})`} />
        ))}
      </g>
      <path d={ruler(80, 400).map((x) => `M${x} 246v12`).join('')} stroke="#DFDFDF" />
    </Art>
  );
}

function Fuse() {
  return (
    <Art viewBox="0 0 400 300" title="The mark parting into its circles and fusing again" exportName="gradients-motion-fuse">
      <defs><Linear id="gradients-m2-g" w={400} h={300} deg={160} stops={FIELD} /></defs>
      <rect width="400" height="300" fill="url(#gradients-m2-g)" />
      <g transform="translate(70 30) scale(2.4)" fill="#FFFFFF">
        <circle className={s.slideA} cx={MARK.A.cx} cy={MARK.A.cy} r={MARK.A.r} />
        <circle className={s.slideB} cx={MARK.B.cx} cy={MARK.B.cy} r={MARK.B.r} />
        <path className={s.body} d={MARK_BODY} />
        <circle className={s.land} cx={MARK.C.cx} cy={MARK.C.cy} r={MARK.C.r} />
      </g>
    </Art>
  );
}

function Pin() {
  return (
    <Art viewBox="0 0 400 300" title="A pin ringing over the site" exportName="gradients-motion-pin">
      <defs><Linear id="gradients-m3-g" w={400} h={300} deg={160} stops={FIELD} /></defs>
      <rect width="400" height="300" fill="url(#gradients-m3-g)" />
      <IsoSiteG x={-4} y={-10} scale={0.72} tone="blue" trees={false} />
      <g transform="translate(200 128)">
        <circle r="10" fill="none" stroke="#FFB83D" strokeWidth="2" className="ring" style={{ animationDelay: '1.2s' }} />
        <PinG r={10} tone="yellow" pulse />
      </g>
    </Art>
  );
}

function Handle() {
  const w = 360, ticks = ruler(36, w), labels = axisLabels(w).filter((_, i) => i % 2 === 0);
  return (
    <Art viewBox="0 0 400 300" title="A range handle travelling along a ruler" exportName="gradients-motion-handle">
      <rect width="400" height="300" fill="#F5F5F5" />
      <g transform="translate(20 100)">
        <path d={ticks.map((x, i) => `M${x} 40v${i % 5 === 0 ? 22 : 12}`).join('')} stroke="#8F8F8F" strokeWidth="1" />
        <path d={`M0 40H${w}`} stroke="#DFDFDF" />
        {labels.map((l) => <text key={l.label} x={l.x} y="88" fontSize="11" fill="#5E5E5E" textAnchor="middle">{l.label}</text>)}
        <g className={s.travel}>
          <rect x="0" y="0" width="100" height="40" fill="#FFB83D" opacity="0.18" />
          <path d="M0 40H100" stroke="#FFB83D" strokeWidth="2" />
          <rect x="-4" y="30" width="10" height="20" rx="1" fill="#FFB83D" />
          <rect x="94" y="30" width="10" height="20" rx="1" fill="#FFB83D" />
        </g>
      </g>
    </Art>
  );
}

export default function Motion() {
  return (
    <div className={s.strip}>
      <Plate span={3} dark name="Wave" spec="40 bars, 3.2 s loop"><Wave /></Plate>
      <Plate span={3} dark name="Fuse" spec="the mark parting and fusing, 5 s loop"><Fuse /></Plate>
      <Plate span={3} dark name="Pin" spec="ring, 2.4 s loop"><Pin /></Plate>
      <Plate span={3} dark name="Handle" spec="range along a ruler, 5 s loop"><Handle /></Plate>
    </div>
  );
}
