// The profile grid: nine square tiles, 3 x 3, one SVG.
import Art from '@/components/art/Art';
import { MarkG, LockupG } from '@/components/art/Mark';
import { IsoSiteG, CraneG, GaugeG, TickBarsG, PatternDefs } from '@/components/art/KeyArt';
import { HEX, INSIGHTS, RESULTS } from '@/lib/brand';
import { Lines, SZ } from './shared';

const T = 356, GAP = 6;

function Tile({ idp, i, fill, children }) {
  const x = (i % 3) * (T + GAP), y = Math.floor(i / 3) * (T + GAP);
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={`${idp}-t${i}`}><rect width={T} height={T} /></clipPath>
      <g clipPath={`url(#${idp}-t${i})`} className="fade-in" style={{ '--i': i }}>
        <rect width={T} height={T} fill={fill} />
        {children}
      </g>
    </g>
  );
}

export default function ProfileGrid() {
  const id = 'campaign-grid';
  const [a, b] = [INSIGHTS[0], INSIGHTS[1]];
  return (
    <Art viewBox={SZ.post} title="Profile grid of nine tiles" exportName="campaign-grid">
      <PatternDefs idp={id} color={HEX.blue} opacity={0.28} />
      <rect width="1080" height="1080" fill="#FFFFFF" />
      <Tile idp={id} i={0} fill={HEX.field}>
        <MarkG x={78} y={78} size={200} fill="#FFFFFF" bodyClass="fuse-a" dotClass="fuse-c" />
      </Tile>
      <Tile idp={id} i={1} fill={HEX.paper}>
        <MarkG x={30} y={30} size={40} fill={HEX.blue} />
        <Lines x={30} y={196} lines={['Build Smarter,', 'Build Faster', 'with Tectra']} size={42} lh={48} fill={HEX.ink} />
      </Tile>
      <Tile idp={id} i={2} fill={HEX.yellow}>
        <MarkG x={78} y={78} size={200} fill={HEX.tile} />
      </Tile>
      <Tile idp={id} i={3} fill={HEX.paper}>
        <IsoSiteG x={4} y={52} scale={0.62} tone="paper" seed={3} />
      </Tile>
      <Tile idp={id} i={4} fill={HEX.field}>
        <text x="26" y="190" fontSize="160" fontWeight="300" fill="#FFFFFF" letterSpacing="-3">{a.value}</text>
        <Lines x={32} y={250} lines={['teams struggle with', 'fragmented data']} size={24} lh={30} weight={500} fill={HEX.navy} />
      </Tile>
      <Tile idp={id} i={5} fill={HEX.chip}>
        <text x="28" y="140" fontSize="116" fontWeight="300" fill={HEX.ink} letterSpacing="-2">{b.value}</text>
        <Lines x={32} y={186} lines={['Teams struggle with', 'real-time updates']} size={22} lh={28} weight={400} fill={HEX.ink} />
        <TickBarsG idp={`${id}-b`} x={30} y={230} w={296} h={56} count={34} from={b.from} to={b.to} base="#C9C9C9" rise />
      </Tile>
      <Tile idp={id} i={6} fill={HEX.blue}>
        <CraneG x={78} y={18} scale={1} />
      </Tile>
      <Tile idp={id} i={7} fill={HEX.yellow}>
        <GaugeG x={0} y={0} w={T} h={T} r={190} value={0.32} tone="blue" track="#FFE0A6" draw />
        <text x="30" y="60" fontSize="26" fontWeight="500" fill={HEX.ink}>{RESULTS[0].label}</text>
        <text x="26" y="200" fontSize="130" fontWeight="300" fill={HEX.ink} letterSpacing="-3">{RESULTS[0].value}</text>
      </Tile>
      <Tile idp={id} i={8} fill={HEX.paper}>
        <rect width={T} height={T} fill={`url(#${id}-pat-marks)`} />
        <rect x="48" y="128" width="260" height="100" fill={HEX.paper} />
        <LockupG x={78} y={150} size={56} fill={HEX.blue} />
      </Tile>
    </Art>
  );
}
