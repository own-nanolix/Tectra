import Art from '@/components/art/Art';
import { ScreenHomeG } from '@/components/art/Devices';
import { AxisG, BackdropG, LayerG, MaterialDefs, SheenG } from '@/components/art/Mockup';
import { r2 } from '@/lib/charts';
import { GreyScreenG } from './parts';

// Scene 2: eight phones lying in a fanned row, seen three-quarter from above. The whole group is skewed onto the
// table plane; each phone's screen layer is lifted straight up (the y axis) by an increasing amount.
// Yellow contact shadow under the first phone, sky under the others.
const ID = 'showcase-s2';
const N = 8;
const S = 1.85; // plane units to px
const PHI = (-17 * Math.PI) / 180; // yaw of the table
const K = 0.62; // foreshortening (camera above the table)
const A = r2(S * Math.cos(PHI)), B = r2(S * Math.sin(PHI) * K), C = r2(-S * Math.sin(PHI)), D = r2(S * Math.cos(PHI) * K);
const RP = 560; // fan radius in plane units
const STEP_DEG = 11.5;
const PW = 100, PH = 206; // phone footprint in plane units
const LIFT0 = 22, LIFT_STEP = 21; // px

const BODY = `M${-PW / 2 + 15} ${-PH / 2}H${PW / 2 - 15}a15 15 0 0 1 15 15V${PH / 2 - 15}a15 15 0 0 1-15 15H${-PW / 2 + 15}a15 15 0 0 1-15-15V${-PH / 2 + 15}a15 15 0 0 1 15-15Z`;
const BEZEL = `M${-PW / 2 + 17} ${-PH / 2 + 3}H${PW / 2 - 17}a14 14 0 0 1 14 14V${PH / 2 - 17}a14 14 0 0 1-14 14H${-PW / 2 + 17}a14 14 0 0 1-14-14V${-PH / 2 + 17}a14 14 0 0 1 14-14Z`;
const GLASS = `M${-PW / 2 + 19} ${-PH / 2 + 5}H${PW / 2 - 19}a12 12 0 0 1 12 12V${PH / 2 - 19}a12 12 0 0 1-12 12H${-PW / 2 + 19}a12 12 0 0 1-12-12V${-PH / 2 + 17}a12 12 0 0 1 12-12Z`;
const SW = PW - 12, SH = PH - 10; // screen area
const SK = SW / 390; // screen artwork scale

const raw = Array.from({ length: N }, (_, i) => {
  const deg = (i - (N - 1) / 2) * STEP_DEG;
  const th = (deg * Math.PI) / 180;
  const pu = RP * Math.sin(th), pv = -RP * Math.cos(th);
  return { i, deg, pu: r2(pu), pv: r2(pv), x0: A * pu + C * pv, y0: B * pu + D * pv, lift: LIFT0 + i * LIFT_STEP };
});
// Centre the fan on the plate
const OX = r2(1050 - raw.reduce((a, p) => a + p.x0, 0) / N);
const OY = r2(560 - raw.reduce((a, p) => a + p.y0, 0) / N);
const phones = raw.map((p) => ({ ...p, cx: r2(OX + p.x0), cy: r2(OY + p.y0) })).sort((a, b) => a.cy - b.cy); // back to front

const proj = (p) => `translate(${OX} ${OY}) matrix(${A} ${B} ${C} ${D} 0 0) translate(${p.pu} ${p.pv}) rotate(${r2(p.deg)})`;

export default function SceneLineup() {
  return (
    <Art viewBox="0 0 2100 900" title="Line-up of eight phones, screens lifted along the vertical axis" exportName="showcase-phone-lineup">
      <BackdropG w={2100} h={900} />
      <MaterialDefs idp={ID} />
      <defs>
        <filter id={`${ID}-blur`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <linearGradient id={`${ID}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2ECD9" />
          <stop offset="0.5" stopColor="#CFC8B4" />
          <stop offset="1" stopColor="#A29B86" />
        </linearGradient>
        <linearGradient id={`${ID}-well`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2A2A2E" />
          <stop offset="1" stopColor="#0C0C0E" />
        </linearGradient>
      </defs>

      {phones.map((p) => {
        const first = p.i === 0;
        const lift = p.lift;
        const clip = `${ID}-clip-${p.i}`;
        const home = p.i % 2 === 0;
        return (
          <g key={p.i}>
            {/* contact shadow on the table: yellow under the first phone, sky under the rest */}
            <g transform={`translate(15 20) ${proj(p)}`} opacity={first ? 0.5 : 0.3} filter={`url(#${ID}-blur)`}>
              <path d={BODY} fill={first ? '#FFB83D' : '#90C0F3'} />
            </g>
            {/* thickness */}
            <g transform={`translate(0 8) ${proj(p)}`}>
              <path d={BODY} fill="#8F8873" />
            </g>
            {/* body: frame with the recess the screen layer lifts out of */}
            <g transform={proj(p)}>
              <path d={BODY} fill={`url(#${ID}-body)`} />
              <path d={BEZEL} fill={`url(#${ID}-well)`} />
              <path d={BODY} fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="0.8" />
            </g>
            {/* the y axis of this phone */}
            <AxisG points={[[p.cx, r2(p.cy)], [p.cx, r2(p.cy - lift)]]} />
            {/* screen layer, lifted */}
            <LayerG i={p.i} dx={0} dy={-lift}>
              <g transform={proj(p)}>
                <clipPath id={clip}>
                  <path d={GLASS} />
                </clipPath>
                <path d={BEZEL} fill="#101012" />
                <g clipPath={`url(#${clip})`}>
                  <g transform={`translate(${-SW / 2} ${-SH / 2}) scale(${r2(SK)} ${r2(SH / 844)})`}>
                    {home ? <ScreenHomeG idp={`${ID}-home-${p.i}`} /> : <GreyScreenG idp={`${ID}-grey-${p.i}`} />}
                  </g>
                </g>
                <SheenG idp={ID} d={GLASS} opacity={0.5} />
                <path d={BEZEL} fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="0.8" />
              </g>
            </LayerG>
          </g>
        );
      })}
    </Art>
  );
}
