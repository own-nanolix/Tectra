import Art from '@/components/art/Art';
import { TabletG, ScreenAppG } from '@/components/art/Devices';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG, CalloutG } from '@/components/art/Mockup';
import { r2 } from '@/lib/charts';

// The tablet lies in the plane of a matrix: x runs right and slightly down, y runs down and to the left.
// All the tablet drawing is in its own 1260 x 900 frame (bumper from -26 to 1286 and -26 to 926).
const mat = (f) => `matrix(${r2(0.4 * f)} ${r2(0.1 * f)} ${r2(-0.24 * f)} ${r2(0.36 * f)} 0 0)`;
const RING = 'M-26 20a70 70 0 0 1 70-70H1190a70 70 0 0 1 70 70V880a70 70 0 0 1-70 70H44a70 70 0 0 1-70-70ZM0 46a46 46 0 0 1 46-46H1214a46 46 0 0 1 46 46V854a46 46 0 0 1-46 46H46a46 46 0 0 1-46-46Z';
const BODY = 'M0 46a46 46 0 0 1 46-46H1214a46 46 0 0 1 46 46V854a46 46 0 0 1-46 46H46a46 46 0 0 1-46-46Z';

// Corner bumpers, stylus slot and the shading that make the rugged ring read as matte rubber.
function Bumper({ idp }) {
  const corners = [[-26, -26, 1], [1096, -26, -1], [-26, 756, 1], [1096, 756, -1]];
  return (
    <g>
      <clipPath id={`${idp}-ringclip`}>
        <path d={RING} clipRule="evenodd" />
      </clipPath>
      <path d={RING} fillRule="evenodd" fill={`url(#${idp}-rubber)`} />
      <g clipPath={`url(#${idp}-ringclip)`}>
        {corners.map(([x, y, d], i) => (
          <g key={i}>
            <rect x={x} y={y} width="190" height="190" rx="70" fill="#3A3A3A" />
            <rect x={x + (d > 0 ? 28 : 108)} y={y + 28} width="54" height="6" rx="3" fill="#1B1B1B" opacity="0.6" />
            <rect x={x + (d > 0 ? 28 : 108)} y={y + 44} width="54" height="6" rx="3" fill="#1B1B1B" opacity="0.6" />
          </g>
        ))}
        {/* stylus slot with the stylus seated in it */}
        <rect x="760" y="-21" width="400" height="16" rx="8" fill="#0C0C0D" />
        <rect x="790" y="-19" width="330" height="11" rx="5.5" fill="#E9E9E9" />
        <rect x="790" y="-19" width="330" height="4" rx="2" fill="#FFFFFF" />
        <rect x="1090" y="-19" width="30" height="11" rx="5.5" fill="#4093EC" />
        <path d="M-26 20Q-26 -26 44 -26H1190" fill="none" stroke="#FFFFFF" strokeWidth="5" opacity="0.28" />
        <path d="M1286 880Q1286 926 1216 926H44" fill="none" stroke="#000000" strokeWidth="14" opacity="0.28" />
      </g>
    </g>
  );
}

// Hand strap on the right edge: webbing with a yellow stitch line and a small ink buckle.
function Strap({ idp }) {
  const d = 'M1270 230C1470 250 1470 690 1270 710';
  return (
    <g>
      <g filter={`url(#${idp}-fabric)`}>
        <rect x="1200" y="200" width="320" height="540" fill="none" />
        <path d={d} fill="none" stroke="#2F2F2F" strokeWidth="64" strokeLinecap="butt" />
      </g>
      <path d={d} fill="none" stroke="#FFB83D" strokeWidth="3" strokeDasharray="10 12" opacity="0.9" />
      <path d="M1270 214C1462 232 1462 676 1270 696" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.2" />
      <rect x="1388" y="420" width="70" height="110" rx="14" fill={`url(#${idp}-metal-dark)`} />
      <rect x="1402" y="436" width="42" height="78" rx="8" fill="#0C0C0D" />
    </g>
  );
}

function Thickness({ f, n = 12, shape, dy = 1.2 }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(0 ${r2((n - i) * dy)})`}>
          <g transform={mat(f)}>
            <path d={shape} fill={i < n - 3 ? '#171717' : '#262626'} />
          </g>
        </g>
      ))}
    </g>
  );
}

export function TabletScreen({ idp }) {
  return (
    <g>
      <rect width="1180" height="820" fill="#DDDDDD" />
      <g transform="scale(0.7375)">
        <ScreenAppG idp={idp} />
      </g>
    </g>
  );
}

const GLOSS = 'M40 40H640L40 520Z';

export function TabletArt() {
  const idp = 'use-product-tab';
  const f = 1.15;
  return (
    <Art viewBox="0 0 940 680" title="Site tablet, three-quarter" exportName="use-product-site-tablet">
      <MaterialDefs idp={idp} />
      <BackdropG w={940} h={680} />
      <ShadowG idp={idp} cx={420} cy={600} rx={380} ry={34} tone="blue" opacity={0.3} blur={14} />
      <g transform="translate(300 70)">
        <g className="mock-lit">
          <Thickness f={f} shape={RING} n={14} />
          <g transform={mat(f)}>
            <Strap idp={idp} />
            <TabletG idp={idp} x={0} y={0} w={1260} rugged>
              <TabletScreen idp={`${idp}-app`} />
            </TabletG>
            <Bumper idp={idp} />
            <rect x="40" y="40" width="1180" height="820" rx="14" fill={`url(#${idp}-glass)`} opacity="0.7" />
            <path d={GLOSS} fill="#FFFFFF" opacity="0.1" />
            <path d="M46 46H1214" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />
          </g>
        </g>
      </g>
    </Art>
  );
}

// Exploded along the depth diagonal: bumper, body, glass, UI layer.
export function TabletExplodedArt() {
  const idp = 'use-product-tabx';
  const f = 1.05;
  const step = [74, -60];
  const c = [630 * 0.4 * f - 450 * 0.24 * f + 300, 630 * 0.1 * f + 450 * 0.36 * f + 250];
  const pts = [-0.6, 0, 1, 2, 3, 3.7].map((i) => [r2(c[0] + step[0] * i), r2(c[1] + step[1] * i)]);
  return (
    <Art viewBox="0 0 1160 760" title="Site tablet, exploded: bumper, body, glass, screen" exportName="use-product-site-tablet-exploded">
      <MaterialDefs idp={idp} />
      <BackdropG w={1160} h={760} />
      <ShadowG idp={idp} cx={430} cy={640} rx={340} ry={30} tone="sky" opacity={0.42} blur={14} />
      <AxisG points={pts} />
      <g transform="translate(300 250)">
        <LayerG i={0} dx={0} dy={0}>
          <Thickness f={f} shape={RING} n={8} />
          <g transform={mat(f)}>
            <Strap idp={idp} />
            <Bumper idp={idp} />
          </g>
        </LayerG>
        <LayerG i={1} dx={step[0]} dy={step[1]}>
          <Thickness f={f} shape={BODY} n={5} />
          <g transform={mat(f)}>
            <path d={BODY} fill="#101012" />
            <rect x="40" y="40" width="1180" height="820" rx="14" fill="#0A0A0B" />
            <circle cx="630" cy="20" r="6" fill="#26262B" />
            <path d="M46 2H1214" stroke="#FFFFFF" strokeWidth="2" opacity="0.25" />
            <rect x="1255" y="250" width="8" height="110" rx="3" fill="#5A5A5A" />
          </g>
        </LayerG>
        <LayerG i={2} dx={step[0] * 2} dy={step[1] * 2}>
          <g transform={mat(f)}>
            <rect x="40" y="40" width="1180" height="820" rx="14" fill="#CFE3FA" opacity="0.2" />
            <rect x="40" y="40" width="1180" height="820" rx="14" fill={`url(#${idp}-glass)`} />
            <rect x="40" y="40" width="1180" height="820" rx="14" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.8" />
            <path d={GLOSS} fill="#FFFFFF" opacity="0.14" />
          </g>
        </LayerG>
        <LayerG i={3} dx={step[0] * 3} dy={step[1] * 3}>
          <g transform={mat(f)}>
            <clipPath id={`${idp}-ui`}>
              <rect x="40" y="40" width="1180" height="820" rx="14" />
            </clipPath>
            <g clipPath={`url(#${idp}-ui)`}>
              <g transform="translate(40 40)">
                <TabletScreen idp={`${idp}-app`} />
              </g>
            </g>
          </g>
        </LayerG>
      </g>
      <CalloutG x={150} y={590} tx={60} ty={690} label="Rugged bumper" />
      <CalloutG x={244} y={333} tx={150} ty={300} label="Tablet body" anchor="end" />
      <CalloutG x={733} y={582} tx={790} ty={640} label="Glass" />
      <CalloutG x={985} y={226} tx={1020} ty={170} label="Screen layer" />
    </Art>
  );
}
