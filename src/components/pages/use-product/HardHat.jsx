import Art from '@/components/art/Art';
import { BackdropG, ShadowG, MaterialDefs, SheenG, LayerG, AxisG, CalloutG } from '@/components/art/Mockup';
import { HatDefs, perp } from './parts';

// ---------- Three-quarter view, local frame 500 x 370 (measured from reference m13_2) ----------
const DOME = 'M12 222C2 160 30 70 112 28C152 8 200 -2 242 2C322 12 392 78 412 158C419 188 423 212 424 232C384 262 284 276 192 268C112 262 40 246 12 222Z';
const BRIM = 'M2 246C-4 258 16 266 58 272C132 290 196 340 286 358C338 368 404 352 452 332C492 316 508 304 500 296C484 278 450 256 428 236C340 268 150 278 30 232Z';
const GUT = 'M12 222C40 246 112 262 192 268C284 276 384 262 424 232L430 246C392 280 290 292 192 286C110 280 36 262 8 238Z';
const BAND = 'M0 190C60 160 130 148 200 150C280 152 360 140 430 128L430 252C300 292 100 282 0 232Z';
const rib = (o, k = 0) => {
  const p = perp(o);
  return `M${148 + p.x} ${10 + p.y + k}C${220 + p.x} ${22 + p.y + k} ${290 + p.x} ${70 + p.y + k} ${330 + p.x} ${130 + p.y + k}`;
};

export function ShellG({ idp, band = true, sheen = true, text = true }) {
  return (
    <g>
      <clipPath id={`${idp}-domeclip`}>
        <path d={DOME} />
      </clipPath>
      <clipPath id={`${idp}-brimclip`}>
        <path d={BRIM} />
      </clipPath>
      {/* brim: thickness, top face, reflected light, peak sheen */}
      <path d={BRIM} transform="translate(0 7)" fill="#B8B8B8" />
      <path d={BRIM} fill={`url(#${idp}-brim)`} />
      <g clipPath={`url(#${idp}-brimclip)`}>
        <ellipse cx="300" cy="318" rx="86" ry="13" transform="rotate(16 300 318)" fill="#FFFFFF" opacity="0.7" filter={`url(#${idp}-b8)`} />
        <path d="M60 272C132 290 196 340 286 358C338 368 404 352 452 332" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.8" />
        <path d="M430 240C470 262 500 290 500 298" fill="none" stroke="#8E8E8E" strokeWidth="6" opacity="0.4" filter={`url(#${idp}-b2)`} />
      </g>
      <path d="M2 246C-4 258 16 266 58 272" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
      {/* rain gutter ring above the brim */}
      <path d={GUT} fill={`url(#${idp}-brim)`} />
      <path d="M12 236C40 258 112 274 192 280C288 288 388 272 428 242" fill="none" stroke="#9E9E9E" strokeWidth="2" opacity="0.55" />
      <path d="M10 228C40 252 112 268 192 274C286 282 386 266 426 236" fill="none" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.8" />
      {/* dome */}
      <path d={DOME} fill={`url(#${idp}-dome)`} />
      <g clipPath={`url(#${idp}-domeclip)`}>
        {/* raised centre ridge and two side ribs */}
        <path d={rib(0)} fill="none" stroke="#FFFFFF" strokeWidth="30" opacity="0.5" />
        <path d={rib(16)} fill="none" stroke="#9A9A9A" strokeWidth="3" opacity="0.55" />
        <path d={rib(-16)} fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.95" />
        <path d={rib(46, 0)} fill="none" stroke="#A8A8A8" strokeWidth="4" opacity="0.5" />
        <path d={rib(46, -3)} fill="none" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.9" />
        <path d={rib(-46, 0)} fill="none" stroke="#A8A8A8" strokeWidth="4" opacity="0.4" />
        {/* brand band: a printed, slightly darker sleeve around the shell */}
        {band && (
          <g>
            <path d={BAND} fill={`url(#${idp}-band)`} />
            <path d="M0 190C60 160 130 148 200 150C280 152 360 140 430 128" fill="none" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.9" />
            <path d="M0 196C60 166 130 154 200 156C280 158 360 146 430 134" fill="none" stroke="#8C8C8C" strokeWidth="2" opacity="0.35" />
            {text && (
              <g>
                <path id={`${idp}-wmpath`} d="M312 216C338 214 368 204 396 190" fill="none" />
                <text fontSize="27" fontWeight="200" fill="#111111" letterSpacing="-0.3">
                  <textPath href={`#${idp}-wmpath`}>
                    Tectra
                    <tspan fontSize="9" fontWeight="400" dy="-13">®</tspan>
                  </textPath>
                </text>
              </g>
            )}
          </g>
        )}
        {/* core shadow lower right, reflected light along the right rim */}
        <path d={DOME} fill={`url(#${idp}-core)`} />
        <path d={DOME} fill="none" stroke={`url(#${idp}-rimlight)`} strokeWidth="12" opacity="0.6" />
        {/* specular: soft upper-left bloom, window reflection, bright left rim */}
        <ellipse cx="96" cy="92" rx="62" ry="92" transform="rotate(-24 96 92)" fill="#FFFFFF" opacity="0.8" filter={`url(#${idp}-b8)`} />
        <path d="M196 100C222 84 252 92 264 112C270 128 264 148 252 162C240 140 214 122 196 100Z" fill="#FFFFFF" opacity="0.78" filter={`url(#${idp}-b2)`} />
        <path d="M24 196C14 140 40 74 108 34" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.95" filter={`url(#${idp}-b2)`} />
      </g>
      <circle cx="224" cy="6" r="2.6" fill="#B5B5B5" />
      {sheen && <SheenG idp={idp} d={DOME} opacity={0.5} />}
    </g>
  );
}

export function HatHero() {
  const idp = 'use-product-hat';
  return (
    <Art viewBox="0 0 1000 660" title="Hard hat, three-quarter" exportName="use-product-hard-hat">
      <MaterialDefs idp={idp} />
      <HatDefs idp={idp} />
      <BackdropG w={1000} h={660} />
      <ShadowG idp={idp} cx={520} cy={598} rx={340} ry={40} tone="blue" opacity={0.3} blur={14} />
      <g transform="translate(125 38) scale(1.5)">
        <g className="mock-lit">
          <ShellG idp={idp} />
        </g>
      </g>
    </Art>
  );
}

// ---------- Front view ----------
const DOME_F = 'M64 210C54 110 112 18 220 16C328 18 386 110 376 210Z';
const BRIM_F = 'M30 212C30 196 410 196 410 212C410 244 330 262 220 262C110 262 30 244 30 212Z';
const GUT_F = 'M56 200H384a8 8 0 0 1 8 8V216a8 8 0 0 1-8 8H56a8 8 0 0 1-8-8V208a8 8 0 0 1 8-8Z';

function HatFront({ idp }) {
  return (
    <g>
      <clipPath id={`${idp}-domeclip`}>
        <path d={DOME_F} />
      </clipPath>
      <path d={BRIM_F} transform="translate(0 6)" fill="#B8B8B8" />
      <path d={BRIM_F} fill={`url(#${idp}-brim)`} />
      <ellipse cx="170" cy="240" rx="110" ry="9" fill="#FFFFFF" opacity="0.65" filter={`url(#${idp}-b8)`} />
      <path d="M60 224C120 250 320 250 380 224" fill="none" stroke="#9E9E9E" strokeWidth="2" opacity="0.5" />
      <path d="M34 218C40 238 120 258 220 258" fill="none" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.8" />
      <path d={GUT_F} fill={`url(#${idp}-brim)`} />
      <path d="M52 218H388" stroke="#9E9E9E" strokeWidth="2" opacity="0.5" />
      <path d="M54 205H386" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.85" />
      <path d={DOME_F} fill={`url(#${idp}-dome)`} />
      <g clipPath={`url(#${idp}-domeclip)`}>
        <rect x="204" y="10" width="32" height="130" fill="#FFFFFF" opacity="0.5" />
        <path d="M236 10C238 50 238 100 238 140" stroke="#9A9A9A" strokeWidth="3" opacity="0.55" fill="none" />
        <path d="M203 10C202 50 202 100 202 140" stroke="#FFFFFF" strokeWidth="3" opacity="0.95" fill="none" />
        {[-1, 1].map((d) => (
          <g key={d}>
            <path d={`M${220 + d * 62} 22C${220 + d * 70} 60 ${220 + d * 74} 100 ${220 + d * 76} 140`} stroke="#A8A8A8" strokeWidth="4" fill="none" opacity="0.5" />
            <path d={`M${220 + d * 62 - 3} 22C${220 + d * 70 - 3} 60 ${220 + d * 74 - 3} 100 ${220 + d * 76 - 3} 140`} stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.9" />
          </g>
        ))}
        <path d="M40 130C140 144 300 144 400 130L400 224L40 224Z" fill={`url(#${idp}-band)`} />
        <path d="M40 130C140 144 300 144 400 130" fill="none" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.9" />
        <path d={DOME_F} fill={`url(#${idp}-core)`} />
        <path d={DOME_F} fill="none" stroke={`url(#${idp}-rimlight)`} strokeWidth="12" opacity="0.6" />
        <ellipse cx="126" cy="84" rx="40" ry="76" transform="rotate(-14 126 84)" fill="#FFFFFF" opacity="0.8" filter={`url(#${idp}-b8)`} />
        <path d="M70 196C58 130 84 60 150 30" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.95" filter={`url(#${idp}-b2)`} />
      </g>
      <SheenG idp={idp} d={DOME_F} opacity={0.4} />
    </g>
  );
}

export function HatFrontArt() {
  const idp = 'use-product-hatf';
  return (
    <Art viewBox="0 0 640 520" title="Hard hat, front" exportName="use-product-hard-hat-front">
      <MaterialDefs idp={idp} />
      <HatDefs idp={idp} />
      <BackdropG w={640} h={520} />
      <ShadowG idp={idp} cx={322} cy={372} rx={236} ry={16} tone="yellow" opacity={0.42} blur={9} />
      <g transform="translate(80 70) scale(1.1)">
        <HatFront idp={idp} />
      </g>
    </Art>
  );
}

// ---------- Side view ----------
const DOME_S = 'M36 204C28 106 96 16 208 14C318 14 384 104 384 204Z';
const BRIM_S = 'M10 216L396 216C420 220 448 232 468 252C470 258 462 260 454 260C420 258 390 246 360 242L16 242C6 238 4 224 10 216Z';
const GUT_S = 'M26 196H394a6 6 0 0 1 6 6V212a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6V202a6 6 0 0 1 6-6Z';

function HatSide({ idp }) {
  return (
    <g>
      <clipPath id={`${idp}-domeclip`}>
        <path d={DOME_S} />
      </clipPath>
      <path d={BRIM_S} transform="translate(0 6)" fill="#B8B8B8" />
      <path d={BRIM_S} fill={`url(#${idp}-brim)`} />
      <ellipse cx="400" cy="244" rx="60" ry="6" transform="rotate(14 400 244)" fill="#FFFFFF" opacity="0.7" filter={`url(#${idp}-b2)`} />
      <path d="M16 240L360 240" stroke="#9E9E9E" strokeWidth="2" opacity="0.5" />
      <path d={GUT_S} fill={`url(#${idp}-brim)`} />
      <path d="M24 214H396" stroke="#9E9E9E" strokeWidth="2" opacity="0.5" />
      <path d="M24 201H396" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.85" />
      <path d={DOME_S} fill={`url(#${idp}-dome)`} />
      <g clipPath={`url(#${idp}-domeclip)`}>
        <path d="M50 134C66 54 138 26 210 26C286 26 350 56 368 134" fill="none" stroke="#FFFFFF" strokeWidth="26" opacity="0.5" />
        <path d="M50 148C66 68 138 40 210 40C286 40 350 70 368 148" fill="none" stroke="#9A9A9A" strokeWidth="3" opacity="0.5" />
        <path d="M50 118C66 40 138 12 210 12C286 12 350 42 368 118" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.95" />
        <path d="M0 140C100 126 320 126 420 140L420 212L0 212Z" fill={`url(#${idp}-band)`} />
        <path d="M0 140C100 126 320 126 420 140" fill="none" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.9" />
        <path id={`${idp}-wmpath`} d="M130 178C170 184 250 184 290 178" fill="none" />
        <text fontSize="30" fontWeight="200" fill="#111111" textAnchor="middle" letterSpacing="-0.3">
          <textPath href={`#${idp}-wmpath`} startOffset="50%">
            Tectra
            <tspan fontSize="10" fontWeight="400" dy="-14">®</tspan>
          </textPath>
        </text>
        <path d={DOME_S} fill={`url(#${idp}-core)`} />
        <path d={DOME_S} fill="none" stroke={`url(#${idp}-rimlight)`} strokeWidth="12" opacity="0.6" />
        <ellipse cx="112" cy="84" rx="48" ry="80" transform="rotate(-26 112 84)" fill="#FFFFFF" opacity="0.8" filter={`url(#${idp}-b8)`} />
        <path d="M44 190C34 120 66 50 140 24" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.95" filter={`url(#${idp}-b2)`} />
      </g>
      <SheenG idp={idp} d={DOME_S} opacity={0.4} />
    </g>
  );
}

export function HatSideArt() {
  const idp = 'use-product-hats';
  return (
    <Art viewBox="0 0 640 520" title="Hard hat, side" exportName="use-product-hard-hat-side">
      <MaterialDefs idp={idp} />
      <HatDefs idp={idp} />
      <BackdropG w={640} h={520} />
      <ShadowG idp={idp} cx={318} cy={386} rx={260} ry={15} tone="sky" opacity={0.5} blur={9} />
      <g transform="translate(46 90) scale(1.16)">
        <HatSide idp={idp} />
      </g>
    </Art>
  );
}

// ---------- Exploded view: shell, brand band, suspension harness along the vertical axis ----------
function BandRing({ idp }) {
  return (
    <g>
      <path d="M10 124A205 70 0 0 1 420 124L420 200A205 70 0 0 0 10 200Z" fill="#B9B9B9" />
      <path d="M10 124A205 70 0 0 1 420 124" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
      <path d="M10 200A205 70 0 0 0 420 200L420 124A205 70 0 0 1 10 124Z" fill={`url(#${idp}-band)`} />
      <path d="M10 200A205 70 0 0 0 420 200L420 124A205 70 0 0 1 10 124Z" fill={`url(#${idp}-shade)`} />
      <path d="M10 124A205 70 0 0 0 420 124" fill="none" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.9" />
      <path d="M10 200A205 70 0 0 0 420 200" fill="none" stroke="#7C7C7C" strokeWidth="2" opacity="0.5" />
      <path id={`${idp}-ringpath`} d="M10 170A205 70 0 0 0 420 170" fill="none" />
      <text fontSize="30" fontWeight="200" fill="#111111" textAnchor="middle" letterSpacing="-0.3">
        <textPath href={`#${idp}-ringpath`} startOffset="66%">
          Tectra
          <tspan fontSize="10" fontWeight="400" dy="-14">®</tspan>
        </textPath>
      </text>
      <ellipse cx="90" cy="150" rx="50" ry="28" fill="#FFFFFF" opacity="0.55" filter={`url(#${idp}-b8)`} />
    </g>
  );
}

const web = '#4093EC';
function Harness({ idp }) {
  const strap = (d, i) => (
    <g key={i}>
      <path d={d} fill="none" stroke={web} strokeWidth="17" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeDasharray="4 6" opacity="0.7" />
    </g>
  );
  return (
    <g>
      <g filter={`url(#${idp}-fabric)`}>
        <rect x="0" y="60" width="430" height="260" fill="none" />
        <path d="M37 222A178 66 0 0 1 393 222" fill="none" stroke={web} strokeWidth="24" />
        <path d="M37 222A178 66 0 0 1 393 222" fill="none" stroke="#0A2E63" strokeWidth="24" opacity="0.22" />
        {[
          'M37 222C40 170 120 124 190 114',
          'M393 222C390 170 310 124 240 114',
          'M215 156C214 140 214 128 215 116',
          'M215 288C170 250 150 180 200 122',
        ].map((d, i) => strap(d, i))}
      </g>
      <ellipse cx="215" cy="112" rx="42" ry="15" fill="#E9E9E9" />
      <ellipse cx="215" cy="110" rx="42" ry="15" fill={`url(#${idp}-plastic)`} />
      <circle cx="215" cy="110" r="5" fill="#2F2F2F" />
      <g filter={`url(#${idp}-fabric)`}>
        <rect x="0" y="60" width="430" height="260" fill="none" />
        <path d="M37 222A178 66 0 0 0 393 222" fill="none" stroke={web} strokeWidth="24" />
      </g>
      <path d="M37 222A178 66 0 0 0 393 222" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeDasharray="4 6" opacity="0.7" />
      <path d="M37 214A178 66 0 0 0 393 214" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
      <path d="M37 230A178 66 0 0 0 393 230" fill="none" stroke="#0A2E63" strokeWidth="3" opacity="0.25" />
      {/* sweat pad */}
      <path d="M96 262A178 66 0 0 0 334 262" fill="none" stroke="#FFB83D" strokeWidth="9" strokeLinecap="round" opacity="0.95" />
      {/* ratchet housing and knob at the back */}
      <g transform="translate(126 162) rotate(-18)">
        <rect x="-26" y="-17" width="52" height="34" rx="9" fill={`url(#${idp}-metal-dark)`} />
        <circle r="13" fill="#E9E9E9" />
        <circle r="13" fill={`url(#${idp}-metal)`} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path key={i} d="M0 -13V-8" stroke="#5E5E5E" strokeWidth="2" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="4" fill="#2F2F2F" />
      </g>
    </g>
  );
}

export function HatExplodedArt() {
  const idp = 'use-product-hatx';
  return (
    <Art viewBox="0 0 900 900" title="Hard hat, exploded: shell, brand band, suspension harness" exportName="use-product-hard-hat-exploded">
      <MaterialDefs idp={idp} />
      <HatDefs idp={idp} />
      <BackdropG w={900} h={900} />
      <ShadowG idp={idp} cx={450} cy={852} rx={230} ry={24} tone="blue" opacity={0.32} blur={12} />
      <AxisG points={[[450, 40], [450, 222], [450, 500], [450, 760], [450, 880]]} />
      <LayerG i={2} dy={200}>
        <g transform="translate(256 362) scale(0.9)">
          <Harness idp={idp} />
        </g>
      </LayerG>
      <LayerG i={1} dy={-40}>
        <g transform="translate(247 365) scale(0.9)">
          <BandRing idp={idp} />
        </g>
      </LayerG>
      <LayerG i={0} dy={-300}>
        <g transform="translate(225 360) scale(0.9)">
          <ShellG idp={idp} band={false} />
        </g>
      </LayerG>
      <CalloutG x={596} y={236} tx={735} ty={236} label="Shell" />
      <CalloutG x={618} y={500} tx={735} ty={500} label="Brand band" />
      <CalloutG x={610} y={760} tx={735} ty={760} label="Suspension harness" />
    </Art>
  );
}
