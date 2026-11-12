import { MarkG, LockupG } from '@/components/art/Mark';
import { TreesG, CraneG, IsoSiteG } from '@/components/art/KeyArt';
import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { Scene, Bar, Barcode, PAL, u } from './parts';

// Top view. Each ticket is a body and a stub; the stub is torn away along the x axis at the perforation,
// which leaves a row of half-holes on both edges.
const R = 4.5;

function holes(x0, y0, h, n) {
  return Array.from({ length: n }, (_, i) => y0 + (h * (i + 0.5)) / n);
}

function bodyPath(x0, y0, w, h, n) {
  const x = x0 + w;
  let d = `M${x0 + 6} ${y0}H${x - 12}A12 12 0 0 0 ${x} ${y0 + 12}`;
  holes(x0, y0 + 12, h - 24, n).forEach((y) => { d += `L${x} ${y - R}A${R} ${R} 0 0 0 ${x} ${y + R}`; });
  d += `L${x} ${y0 + h - 12}A12 12 0 0 0 ${x - 12} ${y0 + h}H${x0 + 6}A6 6 0 0 1 ${x0} ${y0 + h - 6}V${y0 + 6}A6 6 0 0 1 ${x0 + 6} ${y0}Z`;
  return d;
}

function stubPath(xs, y0, w, h, n) {
  let d = `M${xs} ${y0 + 12}A12 12 0 0 0 ${xs + 12} ${y0}H${xs + w - 6}A6 6 0 0 1 ${xs + w} ${y0 + 6}V${y0 + h - 6}A6 6 0 0 1 ${xs + w - 6} ${y0 + h}H${xs + 12}A12 12 0 0 0 ${xs} ${y0 + h - 12}`;
  holes(xs, y0 + 12, h - 24, n).reverse().forEach((y) => { d += `L${xs} ${y + R}A${R} ${R} 0 0 0 ${xs} ${y - R}`; });
  return `${d}Z`;
}

// One paper piece: soft coloured shadow, stock with grain, clipped artwork, shade, hairline.
function Piece({ idp, id, d, fill, hair = 0.1, children }) {
  return (
    <g>
      <path d={d} transform="translate(5 8)" fill={PAL.sky} opacity="0.45" filter={u(idp, 'soft')} />
      <path d={d} fill={fill} filter={u(idp, 'paper')} />
      <clipPath id={`${id}-clip`}><path d={d} /></clipPath>
      <g clipPath={`url(#${id}-clip)`}>{children}</g>
      <path d={d} fill={u(idp, 'shade')} />
      <path d={d} fill="none" stroke="#000000" strokeOpacity={hair} />
    </g>
  );
}

const X0 = 50;
const Y0 = 50;
const W = 420;
const H = 220;
const SW = 120;
const N = 8;

// Ticket artwork (body, stub) by colourway. Text: the lockup and case-study lines only.
const TICKETS = [
  {
    id: 'ticket-blue', title: 'Ticket, blue', field: PAL.blue, stub: PAL.yellow, shadow: 'blue',
    body: (idp) => (
      <>
        <TreesG x={X0 + 190} y={Y0} w={230} h={H} count={5} tone="blue" seed={21} minSize={54} maxSize={110} />
        <LockupG x={X0 + 26} y={Y0 + 28} size={34} fill="#FFFFFF" />
        <text x={X0 + 26} y={Y0 + 150} fontSize="34" fontWeight="300" fill="#FFFFFF">Smart Construction</text>
        <Bar x={X0 + 26} y={Y0 + 178} w={96} h={5} o={0.6} />
        <Bar x={X0 + 130} y={Y0 + 178} w={56} h={5} o={0.6} />
        <Bar x={X0 + 26} y={Y0 + 192} w={64} h={5} o={0.4} />
      </>
    ),
    stubArt: () => <MarkG x={X0 + W + 42} y={Y0 + 28} size={38} fill={PAL.ink} />,
    code: PAL.ink,
  },
  {
    id: 'ticket-yellow', title: 'Ticket, yellow', field: PAL.yellow, stub: PAL.blue, shadow: 'yellow',
    body: () => (
      <>
        <CraneG x={X0 + 320} y={Y0 + 30} scale={0.55} color="#FFFFFF" dark={PAL.ink} />
        <LockupG x={X0 + 26} y={Y0 + 28} size={34} fill={PAL.ink} />
        <text x={X0 + 26} y={Y0 + 130} fontSize="24" fontWeight="300" fill={PAL.ink}>Build Smarter,</text>
        <text x={X0 + 26} y={Y0 + 160} fontSize="24" fontWeight="300" fill={PAL.ink}>Build Faster with Tectra</text>
        <Bar x={X0 + 26} y={Y0 + 188} w={96} h={5} fill={PAL.ink} o={0.35} />
        <Bar x={X0 + 130} y={Y0 + 188} w={56} h={5} fill={PAL.ink} o={0.35} />
      </>
    ),
    stubArt: () => <MarkG x={X0 + W + 42} y={Y0 + 28} size={38} fill="#FFFFFF" />,
    code: '#FFFFFF',
  },
  {
    id: 'ticket-white', title: 'Ticket, white', field: '#FFFFFF', stub: PAL.sky, shadow: 'sky', hair: 0.16,
    body: () => (
      <>
        <IsoSiteG x={X0 + 270} y={Y0 + 16} scale={0.28} tone="paper" trees={false} />
        <LockupG x={X0 + 26} y={Y0 + 28} size={34} fill={PAL.ink} markFill={PAL.blue} />
        <text x={X0 + 26} y={Y0 + 150} fontSize="34" fontWeight="300" fill={PAL.ink}>Smart Construction</text>
        <Bar x={X0 + 26} y={Y0 + 178} w={96} h={5} fill={PAL.ink} o={0.18} />
        <Bar x={X0 + 130} y={Y0 + 178} w={56} h={5} fill={PAL.ink} o={0.18} />
        <Bar x={X0 + 26} y={Y0 + 192} w={64} h={5} fill={PAL.blue} o={0.5} />
      </>
    ),
    stubArt: () => <MarkG x={X0 + W + 42} y={Y0 + 28} size={38} fill={PAL.ink} />,
    code: PAL.ink,
  },
];

export { TICKETS };

export function TicketScene({ t, index }) {
  const stubD = stubPath(X0 + W, Y0, SW, H, N);
  return (
    <Scene name={t.id} title={`${t.title}, stub torn away at the perforation`} w={760} h={330}>
      {(idp) => (
        <>
          <ShadowG idp={idp} cx={380} cy={298} rx={300} ry={12} tone={t.shadow} opacity={0.32} />
          <AxisG points={[[X0 + 210, Y0 + 110], [X0 + W + 130, Y0 + 110], [X0 + W + 200, Y0 + 110]]} />
          <LayerG i={0}>
            <Piece idp={idp} id={`${idp}-body`} d={bodyPath(X0, Y0, W, H, N)} fill={t.field} hair={t.hair}>
              {t.body(idp)}
            </Piece>
          </LayerG>
          <LayerG i={1} dx={70}>
            <g transform={`rotate(2.5 ${X0 + W + SW} ${Y0})`}>
              <Piece idp={idp} id={`${idp}-stub`} d={stubD} fill={t.stub} hair={0.1}>
                {t.stubArt()}
                <Barcode x={X0 + W + 24} y={Y0 + 120} w={78} h={50} fill={t.code} seed={index + 4} o={0.9} />
                <Bar x={X0 + W + 24} y={Y0 + 184} w={50} h={4} fill={t.code} o={0.5} />
              </Piece>
            </g>
          </LayerG>
        </>
      )}
    </Scene>
  );
}

// VIP pass on a short lanyard, stub torn away at the perforation.
const PX = 150;
const PY = 150;
const PW = 280;
const PH = 380;

export function VipPass() {
  return (
    <Scene name="vip-pass" title="VIP pass on a short lanyard, stub torn away" w={760} h={590}>
      {(idp) => {
        const body = bodyPath(PX, PY, PW, PH, 11);
        return (
          <>
            <ShadowG idp={idp} cx={380} cy={560} rx={300} ry={14} tone="blue" opacity={0.32} />
            <AxisG points={[[PX + 140, PY + 190], [PX + PW + 120, PY + 190], [PX + PW + 200, PY + 190]]} />
            <LayerG i={0}>
              {['M196 0H230L304 118L284 130Z', 'M384 0H350L276 118L296 130Z'].map((d, i) => (
                <g key={i}>
                  <path d={d} fill={PAL.blue} filter={u(idp, 'fabric')} />
                  <path d={d} fill={u(idp, 'shade')} />
                </g>
              ))}
              <Piece idp={idp} id={`${idp}-body`} d={body} fill={PAL.ink} hair={0.2}>
                <LockupG x={PX + 30} y={PY + 70} size={34} fill="#FFFFFF" />
                <text x={PX + 24} y={PY + 250} fontSize="112" fontWeight="300" fill={PAL.yellow} letterSpacing="-3">VIP</text>
                <Bar x={PX + 30} y={PY + 300} w={110} h={5} o={0.45} />
                <Bar x={PX + 30} y={PY + 316} w={70} h={5} o={0.3} />
                <rect x={PX + PW / 2 - 28} y={PY + 16} width="56" height="12" rx="6" fill="#FFFFFF" />
              </Piece>
              <rect x="272" y="124" width="36" height="28" rx="5" fill={u(idp, 'metal')} stroke="#8C8C8C" />
              <circle cx="290" cy="130" r="5" fill="#FFFFFF" stroke="#8C8C8C" />
            </LayerG>
            <LayerG i={1} dx={90}>
              <g transform={`rotate(3 ${PX + PW} ${PY})`}>
                <Piece idp={idp} id={`${idp}-stub`} d={stubPath(PX + PW, PY, 76, PH, 11)} fill={PAL.yellow}>
                  <MarkG x={PX + PW + 22} y={PY + 24} size={34} fill={PAL.ink} />
                  <Barcode x={PX + PW + 14} y={PY + 280} w={52} h={64} fill={PAL.ink} seed={11} />
                  <Bar x={PX + PW + 14} y={PY + 354} w={38} h={4} fill={PAL.ink} o={0.5} />
                </Piece>
              </g>
            </LayerG>
          </>
        );
      }}
    </Scene>
  );
}
