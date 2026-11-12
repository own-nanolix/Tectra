import Art from '@/components/art/Art';
import { MARK, MARK_BODY } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Dim, Cross } from './parts';

// Construction diagram: the three circles of the mark on a 100-unit square, drawn at 5x with the measurements.
const S = 5;
const X0 = 330;
const Y0 = 70;
const P = (x, y) => [r2(X0 + S * x), r2(Y0 + S * y)];
const { A, B, C, F1, F2, fillet } = MARK;
const R = A.r;

// Unit vector from one centre to another, and a point at a distance along it.
const unit = (p, q) => {
  const d = Math.hypot(q.cx - p.cx, q.cy - p.cy);
  return [(q.cx - p.cx) / d, (q.cy - p.cy) / d, d];
};
const along = (p, u, t) => [p.cx + u[0] * t, p.cy + u[1] * t];

const AB = unit(A, B);
const CA = unit(C, A);
const CB = unit(C, B);
const gapCA = [along(C, CA, C.r), along(C, CA, CA[2] - A.r)];
const gapCB = [along(C, CB, C.r), along(C, CB, CB[2] - B.r)];
const off = 40;
const dimA = [A.cx - AB[1] * off, A.cy + AB[0] * off];
const dimB = [B.cx - AB[1] * off, B.cy + AB[0] * off];
const ext = 22;
const diagA = along(A, AB, -ext);
const diagB = along(B, AB, ext);

const RATIOS = [
  ['R', 'Radius of the two large circles, 28.4 on the 100-unit square'],
  ['0.67 R', 'Radius of the small circle, 19.0'],
  ['0.27 R', 'Radius of the two fillets, 7.7'],
  ['1.86 R', 'Distance between the centres of the large circles'],
  ['0.25 R', 'Gap from the small circle to each large circle'],
];

export default function Construction() {
  const ink = HEX.ink;
  const bi = HEX.blueInk;
  return (
    <>
      <Art viewBox="0 0 1200 650" title="Construction diagram of the mark" exportName="logo-construction">
        <rect width="1200" height="650" fill={HEX.tile} />
        {/* the mark, pale */}
        <g transform={`translate(${X0} ${Y0}) scale(${S})`} fill={HEX.sky} opacity="0.55">
          <path d={MARK_BODY} />
          <circle cx={C.cx} cy={C.cy} r={C.r} />
        </g>
        {/* the three circles */}
        <g fill="none" stroke={bi} strokeWidth="1.5">
          {[A, B, C].map((c) => (
            <circle key={c.cx} cx={P(c.cx, c.cy)[0]} cy={P(c.cx, c.cy)[1]} r={r2(c.r * S)} />
          ))}
        </g>
        {/* the two fillets */}
        <g fill="none" stroke={HEX.yellow} strokeWidth="2.5">
          {[F1, F2].map((f) => (
            <circle key={f.cx} cx={P(f.cx, f.cy)[0]} cy={P(f.cx, f.cy)[1]} r={r2(fillet * S)} />
          ))}
        </g>
        {/* the 45 degree diagonal from A to B */}
        <path
          d={`M${P(...diagA).join(' ')}L${P(...diagB).join(' ')}`}
          stroke={ink} strokeWidth="1.25" strokeDasharray="8 5" fill="none"
        />
        {/* 45 degree angle at A */}
        <path d={`M${P(A.cx - 30, A.cy).join(' ')}L${P(A.cx + 24, A.cy).join(' ')}`} stroke={ink} strokeWidth="1" strokeDasharray="2 4" fill="none" />
        <path
          d={`M${P(A.cx + 18, A.cy).join(' ')}A${S * 18} ${S * 18} 0 0 1 ${P(A.cx + 18 * 0.7071, A.cy + 18 * 0.7071).join(' ')}`}
          stroke={ink} strokeWidth="1.25" fill="none"
        />
        <text x={P(A.cx + 21, A.cy + 6.5)[0]} y={P(A.cx + 21, A.cy + 6.5)[1]} fontSize="14" fill={ink}>45°</text>
        {/* centres */}
        {[A, B, C, F1, F2].map((c) => (
          <Cross key={`x${c.cx}`} at={P(c.cx, c.cy)} size={c === F1 || c === F2 ? 4 : 7} color={c === F1 || c === F2 ? HEX.yellowInk : bi} />
        ))}
        {[['A', A, 10, -10], ['B', B, -22, 22], ['C', C, 8, 22]].map(([t, c, dx, dy]) => (
          <text key={t} x={P(c.cx, c.cy)[0] + dx} y={P(c.cx, c.cy)[1] + dy} fontSize="16" fontWeight="500" fill={bi}>{t}</text>
        ))}

        {/* radii */}
        <Dim a={P(0, A.cy)} b={P(A.cx, A.cy)} label="R" lx={P(14, A.cy)[0]} ly={P(14, A.cy)[1] - 8} color={ink} />
        <Dim a={P(B.cx, B.cy)} b={P(B.cx + R, B.cy)} label="R" lx={P(B.cx + 14, B.cy)[0]} ly={P(B.cx + 14, B.cy)[1] - 8} color={ink} />
        <Dim a={P(C.cx, C.cy)} b={P(C.cx + C.r, C.cy)} label="0.67 R" anchor="start" lx={P(C.cx + C.r + 2, C.cy)[0]} ly={P(C.cx + C.r + 2, C.cy)[1] + 5} color={ink} />
        {/* fillets */}
        <Dim a={P(F1.cx - fillet, F1.cy)} b={P(F1.cx, F1.cy)} label="0.27 R" lx={P(46, F1.cy)[0]} ly={P(46, F1.cy)[1] - 8} tick={4} color={HEX.yellowInk} />
        <Dim a={P(F2.cx, F2.cy)} b={P(F2.cx + fillet, F2.cy)} label="0.27 R" lx={P(F2.cx + 18, F2.cy)[0]} ly={P(F2.cx + 18, F2.cy)[1] + 5} tick={4} color={HEX.yellowInk} />

        {/* centre distance, parallel to the diagonal */}
        <path d={`M${P(A.cx, A.cy).join(' ')}L${P(...dimA).join(' ')}M${P(B.cx, B.cy).join(' ')}L${P(...dimB).join(' ')}`} stroke={ink} strokeWidth="1" strokeDasharray="2 3" fill="none" />
        <Dim
          a={P(...dimA)} b={P(...dimB)} label="1.86 R" rotate={44.4}
          lx={(P(...dimA)[0] + P(...dimB)[0]) / 2 - 11} ly={(P(...dimA)[1] + P(...dimB)[1]) / 2 + 11}
        />

        {/* gaps */}
        <Dim a={P(...gapCA[0])} b={P(...gapCA[1])} tick={5} color={HEX.redInk} />
        <path d={`M${P((gapCA[0][0] + gapCA[1][0]) / 2, (gapCA[0][1] + gapCA[1][1]) / 2).join(' ')}V${P(0, -3)[1]}`} stroke={HEX.redInk} strokeWidth="1" fill="none" />
        <text x={P((gapCA[0][0] + gapCA[1][0]) / 2, 0)[0]} y={P(0, -4)[1]} fontSize="14" textAnchor="middle" fill={HEX.redInk}>0.25 R</text>
        <Dim a={P(...gapCB[0])} b={P(...gapCB[1])} tick={5} color={HEX.redInk} />
        <path d={`M${P((gapCB[0][0] + gapCB[1][0]) / 2, (gapCB[0][1] + gapCB[1][1]) / 2).join(' ')}H${P(104, 0)[0]}`} stroke={HEX.redInk} strokeWidth="1" fill="none" />
        <text x={P(105, 0)[0]} y={P(0, (gapCB[0][1] + gapCB[1][1]) / 2)[1] + 5} fontSize="14" fill={HEX.redInk}>0.25 R</text>

        {/* square frame of 100 units */}
        <rect x={X0} y={Y0} width={S * 100} height={S * 100} fill="none" stroke={HEX.app} strokeWidth="1" strokeDasharray="3 5" />

        {/* ratios, left column */}
        <text x="60" y="110" fontSize="13" fontWeight="500" fill={HEX.muted} letterSpacing="0.5">RATIOS TO R</text>
        {RATIOS.map(([k, v], i) => (
          <g key={k} transform={`translate(60 ${150 + i * 66})`}>
            <text fontSize="26" fontWeight="300" fill={ink}>{k}</text>
            <text y="20" fontSize="12.5" fill={HEX.muted}>{v.length > 34 ? `${v.slice(0, v.lastIndexOf(' ', 34))}` : v}</text>
            {v.length > 34 && <text y="35" fontSize="12.5" fill={HEX.muted}>{v.slice(v.lastIndexOf(' ', 34) + 1)}</text>}
          </g>
        ))}
        <text x="900" y="620" fontSize="13" fill={HEX.muted}>Mark on a 100-unit square, drawn at 5 times</text>
      </Art>
    </>
  );
}

export { RATIOS };
