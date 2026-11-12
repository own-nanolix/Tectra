import Art from '@/components/art/Art';
import { MarkG, LockupG, LOCKUP_H, MARK } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Dim, Plate } from './parts';
import s from './logo.module.css';

// Clear space: one large-circle radius (R) on every side of the lockup. R is 28.4 % of the mark's width.
const K = 1.5; // lockup size 150: mark 150 high
const SIZE = 100 * K;
const RR = r2(MARK.A.r * (SIZE / 100)); // R in drawing units
const LX = 200;
const LY = 150;
const LW = LOCKUP_H.w * K;
const LH = LOCKUP_H.h * K;

const corners = [
  [LX - RR, LY - RR, 'R'],
  [LX + LW, LY - RR, 'R'],
  [LX - RR, LY + LH, 'R'],
  [LX + LW, LY + LH, 'R'],
];

export function ClearSpace() {
  const bi = HEX.blueInk;
  return (
    <Art viewBox="0 0 1000 480" title="Clear space around the lockup" exportName="logo-clear-space">
      <rect width="1000" height="480" fill={HEX.tile} />
      {/* clear zone */}
      <rect x={LX - RR} y={LY - RR} width={LW + 2 * RR} height={LH + 2 * RR} fill={HEX.sky} opacity="0.35" />
      <rect x={LX} y={LY} width={LW} height={LH} fill={HEX.tile} />
      <rect x={LX - RR} y={LY - RR} width={LW + 2 * RR} height={LH + 2 * RR} fill="none" stroke={bi} strokeWidth="1.25" strokeDasharray="6 5" />
      <rect x={LX} y={LY} width={LW} height={LH} fill="none" stroke={bi} strokeWidth="1" />
      <LockupG x={LX} y={LY} size={SIZE} fill={HEX.blue} />
      {/* the R squares in the corners */}
      {corners.map(([x, y, t], i) => (
        <g key={i}>
          <rect x={x} y={y} width={RR} height={RR} fill={HEX.sky} opacity="0.7" />
          <text x={r2(x + RR / 2)} y={r2(y + RR / 2 + 5)} textAnchor="middle" fontSize="15" fontWeight="500" fill={HEX.navy}>{t}</text>
        </g>
      ))}
      {/* the radius as a circle on the mark */}
      <circle cx={r2(LX + MARK.A.cx * K)} cy={r2(LY + MARK.A.cy * K)} r={r2(MARK.A.r * K)} fill="none" stroke={bi} strokeWidth="1" strokeDasharray="3 4" />
      <Dim a={[LX - RR, LY - RR - 24]} b={[LX, LY - RR - 24]} label="R" ly={LY - RR - 32} color={bi} />
      <Dim a={[LX + LW, LY - RR - 24]} b={[LX + LW + RR, LY - RR - 24]} label="R" ly={LY - RR - 32} color={bi} />
      <Dim a={[LX + LW + RR + 28, LY - RR]} b={[LX + LW + RR + 28, LY + LH + RR]} label="lockup height + 2 R" anchor="middle" rotate={90} lx={LX + LW + RR + 14} ly={LY + LH / 2} color={HEX.ink} />
      <text x="500" y="440" textAnchor="middle" fontSize="14" fill={HEX.muted}>Clear space = R, the radius of the large circles, on all four sides</text>
    </Art>
  );
}

// Minimum sizes: the mark at 16, 24, 32 and 48 px, each drawn at true size in a 96 px tile.
export const MIN_SIZES = [16, 24, 32, 48];

export function MinimumSizes() {
  return (
    <div className={s.sizes}>
      {MIN_SIZES.map((px) => (
        <Plate key={px}>
          <Art viewBox="0 0 96 96" title={`Minimum size, mark at ${px} px`} exportName={`logo-min-${px}`}>
            <rect width="96" height="96" fill={HEX.tile} />
            <MarkG x={(96 - px) / 2} y={(96 - px) / 2 - 8} size={px} fill={HEX.blue} />
            <text x="48" y="86" textAnchor="middle" fontSize="12" fill={HEX.muted}>{px} px</text>
          </Art>
        </Plate>
      ))}
    </div>
  );
}
