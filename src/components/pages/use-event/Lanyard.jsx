import { MarkG } from '@/components/art/Mark';
import { LayerG, AxisG, ShadowG, SheenG } from '@/components/art/Mockup';
import { BADGES } from '@/lib/brand';
import { Scene, CardFace, PAL, u } from './parts';

// Holder: translucent white plastic, two slots in the tab, rails each side, open at the foot.
export const HOLDER_OUT = 'M-110 60Q-110 34 -84 34H-62L-48 8Q-46 0 -38 0H38Q46 0 48 8L62 34H84Q110 34 110 60V318Q110 340 88 340H-88Q-110 340 -110 318Z';
const HOLDER_WIN = 'M-97 44H97V326H60V340H-60V326H-97Z';

export function HolderBack({ idp, edge = false }) {
  return (
    <g>
      {edge && <rect x="-117" y="42" width="8" height="296" rx="4" fill="#EDEDED" stroke="#D2D2D2" />}
      <path d={HOLDER_OUT} fill="#FFFFFF" fillOpacity="0.55" />
      <path d={HOLDER_OUT} fill={u(idp, 'plastic')} opacity="0.35" />
    </g>
  );
}

export function HolderFront({ idp, ring = false }) {
  return (
    <g>
      <path d={`${HOLDER_OUT}${HOLDER_WIN}`} fillRule="evenodd" fill={u(idp, 'plastic')} fillOpacity="0.88" stroke="#CFCFCF" strokeWidth="1" />
      {[-30, 30].map((x) => <ellipse key={x} cx={x} cy="16" rx="12" ry="5.5" fill="#FFFFFF" stroke="#BDBDBD" strokeWidth="1.2" />)}
      <path d="M-104 70V300" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <path d="M104 70V300" stroke="#000000" strokeWidth="2" opacity="0.1" />
      <path d={HOLDER_WIN} fill="none" stroke="#000000" strokeOpacity="0.12" strokeWidth="1.2" />
      {ring && <ellipse cx="0" cy="15" rx="32" ry="9" fill="none" stroke={u(idp, 'metal')} strokeWidth="3.5" />}
      <SheenG idp={idp} d={HOLDER_OUT} opacity={0.5} />
    </g>
  );
}

// Flat woven strap: weave filter, two rows of stitching, edge light on the left, shade on the right.
function Strap({ idp, color, y0, y1, marks = false, tack = false }) {
  const h = y1 - y0;
  return (
    <g>
      <rect x="-22" y={y0} width="44" height={h} fill={color} filter={u(idp, 'fabric')} />
      {marks && Array.from({ length: Math.floor(h / 70) }, (_, i) => <MarkG key={i} x={-9} y={y0 + 22 + i * 70} size={18} fill="#FFFFFF" opacity="0.9" />)}
      <path d={`M-17 ${y0}V${y1}M17 ${y0}V${y1}`} stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 3" />
      <rect x="-22" y={y0} width="44" height={h} fill={u(idp, 'shade')} />
      {tack && (
        <g stroke="#FFFFFF" strokeOpacity="0.65" strokeWidth="1" fill="none">
          <rect x="-17" y={y1 - 30} width="34" height="20" />
          <path d={`M-17 ${y1 - 30}L17 ${y1 - 10}M17 ${y1 - 30}L-17 ${y1 - 10}`} />
        </g>
      )}
    </g>
  );
}

// White plastic side-release buckle: waisted housing, strap slits, prongs, release window.
function Buckle({ idp, y0 }) {
  const d = 'M-26 6Q-26 0 -20 0H20Q26 0 26 6V34Q26 42 20 46Q16 56 20 66Q26 70 26 78V106Q26 112 20 112H-20Q-26 112 -26 106V78Q-26 70 -20 66Q-16 56 -20 46Q-26 42 -26 34Z';
  return (
    <g transform={`translate(0 ${y0})`}>
      <path d={d} transform="translate(3 4)" fill={PAL.sky} opacity="0.5" filter={u(idp, 'soft')} />
      <path d={d} fill={u(idp, 'plastic')} stroke="#CFCFCF" strokeWidth="1" />
      <rect x="-22" y="3" width="44" height="5" rx="2.5" fill="#A8A8A8" />
      <rect x="-22" y="104" width="44" height="5" rx="2.5" fill="#A8A8A8" />
      <path d="M-14 14V42H-9V14zM9 14V42H14V14z" fill="#F3F3F3" stroke="#BDBDBD" strokeWidth="0.8" />
      <rect x="-9" y="22" width="18" height="14" rx="3" fill="#D6D6D6" stroke="#BDBDBD" strokeWidth="0.8" />
      <rect x="-9" y="76" width="18" height="12" rx="5" fill="#EFEFEF" stroke="#BDBDBD" strokeWidth="0.8" />
      <path d="M-5 80H5M-5 84H5" stroke="#B5B5B5" strokeWidth="0.8" />
      <path d="M-24 8V32M-18 50Q-21 56 -18 64" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.95" />
      <path d="M24 12V32M24 80V102" stroke="#000000" strokeWidth="2" opacity="0.1" fill="none" />
      <path d={d} fill={u(idp, 'shade')} />
    </g>
  );
}

// Strap, buckle, holder and card pulled apart along the vertical axis. Front elevation, as the badges of m10.
export function Lanyard({ tone, index }) {
  const b = BADGES[index];
  const col = PAL[tone];
  return (
    <Scene name={`lanyard-${tone}`} title={`Lanyard with speaker badge, ${b.name}`} w={520} h={1130}>
      {(idp) => (
        <>
          <ShadowG idp={idp} cx={268} cy={1090} rx={170} ry={22} tone={tone} />
          <g transform="translate(260 0)">
            <AxisG points={[[0, 40], [0, 306], [0, 485], [0, 790], [0, 910]]} />
            <LayerG i={0}><Strap idp={idp} color={col} y0={0} y1={210} /></LayerG>
            <LayerG i={1} dy={60}><Buckle idp={idp} y0={190} /></LayerG>
            <LayerG i={2} dy={120}><Strap idp={idp} color={col} y0={280} y1={450} marks tack /></LayerG>
            <g className="mock-lit">
              <LayerG i={3} dy={190}><g transform="translate(0 420)"><HolderBack idp={idp} /></g></LayerG>
              <LayerG i={4} dy={300}>
                <g transform="translate(-95 464)"><CardFace idp={idp} id={`${idp}-card`} tone={tone} name={b.name} role={b.role} seed={index + 3} /></g>
              </LayerG>
              <LayerG i={3} dy={190}><g transform="translate(0 420)"><HolderFront idp={idp} /></g></LayerG>
            </g>
          </g>
        </>
      )}
    </Scene>
  );
}
