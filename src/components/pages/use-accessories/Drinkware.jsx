import { LayerG, AxisG, ShadowG, SheenG } from '@/components/art/Mockup';
import { Plate, Artwork, CylRow, Lift, Stitch, K, url, rrect } from './parts';

/* ---------- Mug: side elevation, handle off along x, wrap unrolled beside ---------- */

function WrapFlat({ kind, idp, w, h, fg }) {
  if (kind === 'site') {
    return (
      <g>
        <Artwork kind="iso" tone="paper" idp={idp} w={w * 0.5} h={h * 0.92} x={-w * 0.14} y={0} />
        <Artwork kind="crane" idp={idp} w={h * 0.5} h={h * 0.8} x={w * 0.28} y={0} />
      </g>
    );
  }
  const cells = [];
  for (let r = 0; r < 2; r += 1) {
    for (let i = 0; i < 6; i += 1) cells.push([-w * 0.4 + (i + (r ? 0.5 : 0)) * (w / 6.6), (r ? 0.26 : -0.26) * h]);
  }
  return (
    <g>
      {cells.map(([x, y], i) => (
        <Artwork key={i} kind="mark" idp={idp} w={h * 0.3} h={h * 0.3} x={x} y={y} fg={fg} />
      ))}
    </g>
  );
}

function Mug({ idp, c, handle, inner, kind, fg, tone, lit }) {
  const body = 'M140 140V360A90 24 0 0 0 320 360V140Z';
  const hp = 'M314 182C402 176 402 322 314 318';
  const clip = `${idp}-body-clip`;
  const wrapClip = `${idp}-wrap-clip`;
  return (
    <g className={lit ? 'mock-lit' : undefined}>
      <defs>
        <clipPath id={clip}>
          <path d={body} />
        </clipPath>
        <clipPath id={wrapClip}>
          <path d={rrect(330, 132, 4)} />
        </clipPath>
        <linearGradient id={`${idp}-edge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={c} stopOpacity="0.85" />
          <stop offset="0.18" stopColor={c} stopOpacity="0" />
          <stop offset="0.8" stopColor={c} stopOpacity="0" />
          <stop offset="1" stopColor={c} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <ShadowG idp={`${idp}-s1`} cx={232} cy={388} rx={118} ry={14} tone={tone} />
      <ShadowG idp={`${idp}-s2`} cx={605} cy={372} rx={170} ry={9} tone="sky" opacity={0.22} />
      <LayerG i={0}>
        <path d={body} fill={c} />
        <g clipPath={`url(#${clip})`}>
          {kind === 'marks' ? (
            <g>
              <CylRow cx={230} y={216} R={90} size={36} fill={fg} />
              <CylRow cx={230} y={292} R={90} size={36} fill={fg} />
            </g>
          ) : (
            <g transform="translate(230 250) scale(0.82 1)">
              <Artwork kind="iso" tone="paper" idp={idp} w={210} h={170} />
            </g>
          )}
          <rect x="140" y="110" width="180" height="270" fill={url(idp, 'edge')} />
          <rect x="140" y="110" width="180" height="270" fill={url(idp, 'ceramic')} />
          <rect x="140" y="110" width="180" height="270" fill={url(idp, 'shade')} />
          <rect x="140" y="150" width="180" height="220" fill={url(idp, 'shade-v')} />
          <rect x="162" y="150" width="13" height="196" rx="6" fill="#FFFFFF" opacity="0.6" filter={url(idp, 'soft')} />
          <ellipse cx="230" cy="352" rx="90" ry="24" fill="none" stroke="#000000" strokeWidth="6" opacity="0.08" />
        </g>
        <ellipse cx="230" cy="140" rx="90" ry="24" fill={c} />
        <ellipse cx="230" cy="140" rx="90" ry="24" fill="#FFFFFF" opacity="0.4" />
        <ellipse cx="230" cy="143" rx="81" ry="19" fill={inner} />
        <ellipse cx="230" cy="143" rx="81" ry="19" fill="#000000" opacity="0.3" />
        <ellipse cx="236" cy="150" rx="68" ry="11" fill={inner} />
        <ellipse cx="236" cy="150" rx="68" ry="11" fill={url(idp, 'shade-v')} />
        <path d="M143 136A90 24 0 0 1 226 116" fill="none" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
        <SheenG idp={idp} d="M150 150H190V350H150Z" opacity={0.35} />
      </LayerG>
      <LayerG i={1} dx={72}>
        <path d={hp} transform="translate(6 10)" fill="none" stroke={K.sky} strokeWidth="24" opacity="0.4" filter={url(idp, 'soft')} />
        <path d={hp} fill="none" stroke={handle} strokeWidth="24" />
        <path d={hp} fill="none" stroke={url(idp, 'shade')} strokeWidth="24" />
        <path d={hp} transform="translate(-2 -3)" fill="none" stroke="#FFFFFF" strokeWidth="7" opacity="0.5" />
        <path d={hp} transform="translate(5 5)" fill="none" stroke="#000000" strokeWidth="6" opacity="0.14" />
        <ellipse cx="314" cy="182" rx="4" ry="12" fill={handle} />
        <ellipse cx="314" cy="318" rx="4" ry="12" fill={handle} />
        <ellipse cx="314" cy="182" rx="4" ry="12" fill="#000000" opacity="0.2" />
      </LayerG>
      <LayerG i={2} dx={375}>
        <g transform="translate(230 250)">
          <Lift idp={idp} dx={7} dy={12}>
            <path d={rrect(330, 132, 4)} />
          </Lift>
          <path d={rrect(330, 132, 4)} fill={c} filter={url(idp, 'paper')} />
          <g clipPath={`url(#${wrapClip})`}>
            <WrapFlat kind={kind} idp={idp} w={330} h={132} fg={fg} />
            <rect x="-165" y="-66" width="330" height="132" fill={url(idp, 'lit')} opacity="0.7" />
          </g>
          <path d={rrect(318, 120, 3)} fill="none" stroke={fg === K.white ? K.white : K.blue} strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
        </g>
      </LayerG>
      <AxisG points={[[230, 440], [430, 440], [605, 440]]} />
    </g>
  );
}

const MUGS = [
  { name: 'mug-a', title: 'Mug, blue with the mark wrapped round it, handle off and wrap unrolled', c: K.blue, handle: K.blue, inner: K.white, kind: 'marks', fg: K.white, tone: 'blue', lit: false },
  { name: 'mug-b', title: 'Mug, white with the line drawing wrapped round it, yellow handle and inside', c: K.white, handle: K.yellow, inner: K.yellow, kind: 'site', fg: K.blue, tone: 'yellow', lit: false },
];

/* ---------- Bottle: side elevation, stacked apart on the vertical axis ---------- */

function Bottle({ idp, c, sleeve, W, flip, dark, tone }) {
  const body = `M-21 118V148C-21 172 -${W} 174 -${W} 206V352Q-${W} 372 -${W - 20} 372H${W - 20}Q${W} 372 ${W} 352V206C${W} 174 21 172 21 148V118Z`;
  const clip = `${idp}-b-clip`;
  const capFill = url(idp, dark ? 'metal-dark' : 'metal');
  const sl = `M${-W - 4} -44V40A${W + 4} 8 0 0 0 ${W + 4} 40V-44A${W + 4} 8 0 0 1 ${-W - 4} -44Z`;
  return (
    <g transform="translate(200 0)">
      <defs>
        <clipPath id={clip}>
          <path d={body} />
        </clipPath>
        <linearGradient id={`${idp}-edge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={sleeve} stopOpacity="0.8" />
          <stop offset="0.2" stopColor={sleeve} stopOpacity="0" />
          <stop offset="0.8" stopColor={sleeve} stopOpacity="0" />
          <stop offset="1" stopColor={sleeve} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <ShadowG idp={`${idp}-s`} cx={-4} cy={484} rx={100} ry={11} tone={tone} />
      <LayerG i={0} dy={-62}>
        <rect x="-27" y="92" width="54" height="31" rx="5" fill={capFill} />
        {[-21, -15, -9, -3, 3, 9, 15, 21].map((x) => (
          <path key={x} d={`M${x} 95V120`} stroke={dark ? '#FFFFFF' : '#000000'} strokeWidth="1" opacity="0.16" />
        ))}
        <rect x="-27" y="92" width="54" height="31" rx="5" fill={url(idp, 'shade')} />
        <ellipse cx="0" cy="93" rx="27" ry="5" fill={capFill} />
        <ellipse cx="0" cy="93" rx="27" ry="5" fill="#FFFFFF" opacity="0.4" />
        {flip && <path d="M-13 88C-13 66 13 66 13 88" fill="none" stroke={capFill} strokeWidth="5" />}
        <rect x="-21" y="96" width="5" height="22" rx="2.5" fill="#FFFFFF" opacity={dark ? 0.3 : 0.7} />
      </LayerG>
      <LayerG i={1} dy={-30}>
        <ellipse cx="0" cy="136" rx="26" ry="5" fill="#000000" opacity="0.18" />
        <path d="M-25 124H25V134Q25 140 0 140T-25 134Z" fill={url(idp, 'metal')} />
        <ellipse cx="0" cy="124" rx="25" ry="4.5" fill={url(idp, 'metal')} />
        <ellipse cx="0" cy="124" rx="19" ry="3" fill="#000000" opacity="0.28" />
        <path d="M-25 124H25V140H-25Z" fill={url(idp, 'shade')} />
      </LayerG>
      <LayerG i={2}>
        <path d={body} fill={c} />
        <g clipPath={`url(#${clip})`}>
          {[126, 131, 136, 141].map((y) => (
            <path key={y} d={`M-22 ${y}H22`} stroke="#000000" strokeWidth="1" opacity="0.14" />
          ))}
          <rect x="-60" y="110" width="120" height="270" fill={url(idp, 'shade')} />
          <rect x="-60" y="110" width="120" height="270" fill={url(idp, 'shade-v')} />
          <rect x={-W + 11} y="196" width="11" height="150" rx="5.5" fill="#FFFFFF" opacity="0.55" filter={url(idp, 'soft')} />
          <g transform="translate(0 228) scale(0.94 1)">
            <Artwork kind="mark" idp={idp} w={32} h={32} fg={sleeve === K.white ? K.blue : K.white} />
          </g>
          <ellipse cx="0" cy="372" rx={W - 4} ry="6" fill="#000000" opacity="0.16" />
        </g>
        <ellipse cx="0" cy="118" rx="21" ry="4" fill="#000000" opacity="0.3" />
        <SheenG idp={idp} d={`M${-W + 6} 214H${-W + 24}V346H${-W + 6}Z`} opacity={0.3} />
      </LayerG>
      <LayerG i={3} dy={125}>
        <g transform="translate(0 297)">
          <ellipse cx="0" cy="-44" rx={W + 4} ry="8" fill={sleeve} />
          <ellipse cx="0" cy="-43" rx={W} ry="6" fill="#000000" opacity="0.45" />
          <path d={sl} fill={sleeve} />
          {[-30, -18, -6, 6, 18, 30].map((y) => (
            <g key={y}>
              <path d={`M${-W - 4} ${y}A${W + 4} 6 0 0 0 ${W + 4} ${y}`} fill="none" stroke="#000000" strokeWidth="1.4" opacity="0.14" />
              <path d={`M${-W - 4} ${y + 1.6}A${W + 4} 6 0 0 0 ${W + 4} ${y + 1.6}`} fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.28" />
            </g>
          ))}
          <g transform="scale(0.9 1)">
            <Artwork kind="reg" idp={idp} w={74} h={26} y={-2} fg={sleeve === K.white ? K.blue : K.white} />
          </g>
          <path d={sl} fill={url(idp, 'edge')} />
          <path d={sl} fill={url(idp, 'shade')} />
          <path d={sl} fill={url(idp, 'shade-v')} />
          <rect x={-W} y="-40" width="9" height="80" rx="4.5" fill="#FFFFFF" opacity="0.5" filter={url(idp, 'soft')} />
        </g>
      </LayerG>
      <AxisG points={[[92, 60], [92, 128], [92, 262], [92, 422]]} />
    </g>
  );
}

const BOTTLES = [
  { name: 'bottle-a', title: 'Bottle, blue with a yellow sleeve, cap, neck ring, body and sleeve stacked apart', c: K.blue, sleeve: K.yellow, W: 56, flip: false, dark: false, tone: 'blue' },
  { name: 'bottle-b', title: 'Bottle, light grey with a blue sleeve and a dark flip cap, stacked apart', c: K.g2, sleeve: K.blue, W: 50, flip: true, dark: true, tone: 'sky' },
];

/* ---------- Cup, sleeve, lid and coaster: side elevation, apart on the vertical axis ---------- */

function CupStack({ idp, c, sleeve, mark, tone }) {
  const half = (y) => 78 - ((y - 170) / 160) * 22;
  const cup = 'M-78 170L-56 330A56 10 0 0 0 56 330L78 170Z';
  const ring = (y) => `M${-half(y)} ${y}A${half(y)} ${half(y) * 0.17} 0 0 0 ${half(y)} ${y}`;
  const sl = `M${-half(235)} 235L${-half(305)} 305A${half(305)} ${half(305) * 0.17} 0 0 0 ${half(305)} 305L${half(235)} 235A${half(235)} ${half(235) * 0.17} 0 0 1 ${-half(235)} 235Z`;
  const clip = `${idp}-cup-clip`;
  return (
    <g transform="translate(200 0)">
      <defs>
        <clipPath id={clip}>
          <path d={cup} />
        </clipPath>
      </defs>
      <ShadowG idp={`${idp}-s`} cx={0} cy={470} rx={96} ry={11} tone={tone} />
      <LayerG i={0} dy={-95}>
        <path d="M-86 168V176A86 15 0 0 0 86 176V168Z" fill={url(idp, 'plastic')} />
        <path d="M-86 168V176A86 15 0 0 0 86 176V168Z" fill={url(idp, 'shade')} />
        <ellipse cx="0" cy="168" rx="86" ry="15" fill={url(idp, 'plastic')} />
        <path d="M-70 166C-68 140 -52 134 -36 134H36C52 134 68 140 70 166Z" fill={url(idp, 'plastic')} />
        <path d="M-70 166C-68 140 -52 134 -36 134H36C52 134 68 140 70 166Z" fill={url(idp, 'shade')} />
        <ellipse cx="0" cy="134" rx="38" ry="5" fill="#FFFFFF" />
        <ellipse cx="26" cy="141" rx="13" ry="3.4" fill="#000000" opacity="0.5" />
        <path d="M-72 166A72 12 0 0 0 72 166" fill="none" stroke="#000000" strokeWidth="1" opacity="0.14" />
        <SheenG idp={idp} d="M-60 160C-58 144 -46 139 -36 138H-10L-30 160Z" opacity={0.5} />
      </LayerG>
      <LayerG i={1} dy={-45}>
        <path d={cup} fill={c} filter={url(idp, 'paper')} />
        <g clipPath={`url(#${clip})`}>
          <g transform="translate(0 246) scale(0.94 1)">
            <Artwork kind="lockup" idp={idp} w={92} h={26} fg={mark} />
          </g>
          <rect x="-80" y="160" width="160" height="190" fill={url(idp, 'shade')} />
          <rect x="-80" y="160" width="160" height="190" fill={url(idp, 'shade-v')} />
          <rect x="-58" y="190" width="11" height="130" rx="5.5" fill="#FFFFFF" opacity="0.5" filter={url(idp, 'soft')} />
          <path d="M60 184L44 326" stroke="#000000" strokeWidth="1" opacity="0.12" />
        </g>
        <ellipse cx="0" cy="170" rx="78" ry="14" fill={c} />
        <ellipse cx="0" cy="170" rx="78" ry="14" fill="#FFFFFF" opacity="0.45" />
        <ellipse cx="0" cy="172" rx="70" ry="11" fill={K.g2} />
        <ellipse cx="0" cy="172" rx="70" ry="11" fill="#000000" opacity="0.26" />
        <ellipse cx="6" cy="177" rx="58" ry="6" fill={K.g1} />
        <path d="M-76 166A78 14 0 0 1 -20 157" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" strokeLinecap="round" />
      </LayerG>
      <LayerG i={2} dy={85}>
        <path d={sl} fill={sleeve} filter={url(idp, 'paper')} />
        {[247, 259, 271, 283, 295].map((y) => (
          <g key={y}>
            <path d={ring(y)} fill="none" stroke="#000000" strokeWidth="1.4" opacity="0.14" />
            <path d={ring(y + 1.8)} fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
          </g>
        ))}
        <g transform="translate(0 276) scale(0.92 1)">
          <Artwork kind="reg" idp={idp} w={64} h={22} fg={K.ink} />
        </g>
        <path d={sl} fill={url(idp, 'shade')} />
        <path d={sl} fill={url(idp, 'shade-v')} />
        <rect x="-62" y="244" width="9" height="56" rx="4.5" fill="#FFFFFF" opacity="0.45" filter={url(idp, 'soft')} />
      </LayerG>
      <LayerG i={3} dy={115}>
        <path d="M-72 336V344A72 12 0 0 0 72 344V336Z" fill={K.g3} />
        <path d="M-72 336V344A72 12 0 0 0 72 344V336Z" fill={url(idp, 'shade')} />
        <ellipse cx="0" cy="336" rx="72" ry="12" fill={url(idp, 'card')} />
        <g transform="translate(0 336) scale(1 0.17)">
          <Artwork kind="mark" idp={idp} w={46} h={46} fg={K.blue} />
        </g>
        <ellipse cx="0" cy="336" rx="72" ry="12" fill={url(idp, 'lit')} opacity="0.6" />
      </LayerG>
      <AxisG points={[[130, 64], [130, 205], [130, 355], [130, 451]]} />
    </g>
  );
}

const CUPS = [{ name: 'cup-sleeve', title: 'Cup with sleeve, lid and coaster separated on the vertical axis', c: K.white, sleeve: K.yellow, mark: K.blue, tone: 'yellow' }];

/* ---------- Coasters: three stacks, each pulled apart on the vertical axis ---------- */

function Disc({ idp, cx, cy, rx, ry, t, face, edge, children }) {
  const side = `M${cx - rx} ${cy}V${cy + t}A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + t}V${cy}Z`;
  return (
    <g>
      <path d={side} fill={edge} />
      <path d={side} fill={url(idp, 'shade')} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={face} />
      {children}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={url(idp, 'lit')} opacity="0.7" />
      <path d={`M${cx - rx + 5} ${cy}A${rx - 5} ${ry - 2} 0 0 1 ${cx - 14} ${cy - ry + 2}`} fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
    </g>
  );
}

const COASTERS = [
  { face: K.blue, art: 'mark', fg: K.white, tone: 'blue' },
  { face: K.yellow, art: 'crane', fg: K.g1, tone: 'yellow' },
  { face: K.white, art: 'stack', fg: K.blue, tone: 'sky' },
];

function CoasterStacks({ idp }) {
  const rx = 100;
  const ry = 32;
  return (
    <g transform="translate(0 -32)">
      {COASTERS.map((o, n) => {
        const cx = 150 + n * 250;
        const clip = `${idp}-c${n}-clip`;
        return (
          <g key={n}>
            <defs>
              <clipPath id={clip}>
                <ellipse cx={cx} cy={360} rx={rx - 2} ry={ry - 1} />
              </clipPath>
            </defs>
            <ShadowG idp={`${idp}-s${n}`} cx={cx} cy={406} rx={rx + 12} ry={16} tone={o.tone} />
            <LayerG i={n * 3}>
              <Disc idp={idp} cx={cx} cy={380} rx={rx} ry={ry} t={12} face={url(idp, 'rubber')} edge={K.ink} />
            </LayerG>
            <LayerG i={n * 3 + 1} dy={-72}>
              <Disc idp={idp} cx={cx} cy={370} rx={rx} ry={ry} t={9} face={K.g2} edge={K.g3}>
                <ellipse cx={cx} cy={370} rx={rx - 8} ry={ry - 3} fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="3 4" opacity="0.2" />
              </Disc>
            </LayerG>
            <LayerG i={n * 3 + 2} dy={-144}>
              <Disc idp={idp} cx={cx} cy={360} rx={rx} ry={ry} t={9} face={o.face} edge={o.face === K.white ? K.g3 : o.face}>
                <g clipPath={`url(#${clip})`}>
                  <g transform={`translate(${cx} 360) scale(1 ${r3(ry / rx)})`}>
                    <Artwork kind={o.art} idp={idp} uid={`c${n}`} w={o.art === 'stack' ? 110 : 96} h={o.art === 'stack' ? 100 : 96} fg={o.fg} />
                  </g>
                </g>
                <Stitch d={`M${cx - rx + 9} 360A${rx - 9} ${ry - 4} 0 1 0 ${cx + rx - 9} 360A${rx - 9} ${ry - 4} 0 1 0 ${cx - rx + 9} 360`} stroke={o.face === K.white ? K.blue : K.white} w={1} opacity={0.6} />
              </Disc>
            </LayerG>
            <AxisG points={[[cx + 122, 380], [cx + 122, 298], [cx + 122, 216]]} />
          </g>
        );
      })}
    </g>
  );
}

const r3 = (n) => Math.round(n * 1000) / 1000;

export const drinkPlates = [
  ...MUGS.map((m) => ({ id: m.name, caption: 'Mug', node: <Plate name={m.name} title={m.title} w={800}>{(idp) => <Mug idp={idp} {...m} />}</Plate> })),
  ...BOTTLES.map((b) => ({ id: b.name, caption: 'Bottle', node: <Plate name={b.name} title={b.title} w={400}>{(idp) => <Bottle idp={idp} {...b} />}</Plate> })),
];

export const cupPlates = [
  { id: 'cup-sleeve', caption: 'Cup and sleeve', node: <Plate name={CUPS[0].name} title={CUPS[0].title} w={400}>{(idp) => <CupStack idp={idp} {...CUPS[0]} />}</Plate> },
  { id: 'coasters', caption: 'Coasters', node: <Plate name="coasters" title="Coasters, three stacks each pulled apart into base, felt and printed top" w={800}>{(idp) => <CoasterStacks idp={idp} />}</Plate> },
];
