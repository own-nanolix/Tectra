import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { PinG } from '@/components/art/KeyArt';
import { MARK_BODY, MARK, WordmarkG } from '@/components/art/Mark';
import { Plate, Artwork, Lift, Stitch, K, url, rrect, shapePath } from './parts';

/* ---------- Sticker sheet and pin card: top view, lifted off the backing up-right ---------- */

// One outline for stickers and pins. r is the half-extent; the mark shape includes its separate circle.
function Shape({ shape, r, ...p }) {
  if (shape === 'circle') return <path d={shapePath('circle', r)} {...p} />;
  if (shape === 'square') return <path d={shapePath('square', r)} {...p} />;
  if (shape === 'pill') return <path d={rrect(r * 2.3, r * 1.25, r * 0.62)} {...p} />;
  return (
    <g transform={`translate(${-r} ${-r}) scale(${r / 50})`}>
      <path d={MARK_BODY} {...p} />
      <circle cx={MARK.C.cx} cy={MARK.C.cy} r={MARK.C.r} {...p} />
    </g>
  );
}

const STICKERS = [
  { x: 105, y: 262, shape: 'circle', fill: K.blue, art: 'mark', fg: K.white },
  { x: 200, y: 262, shape: 'square', fill: K.yellow, art: 'icon', fg: K.g1 },
  { x: 295, y: 262, shape: 'mark', fill: K.yellow, art: null, fg: K.white },
  { x: 105, y: 380, shape: 'pill', fill: K.white, art: 'lockup', fg: K.blue },
  { x: 200, y: 380, shape: 'circle', fill: K.white, art: 'crane', fg: K.blue },
  { x: 295, y: 380, shape: 'circle', fill: K.sky, art: 'pins', fg: K.white },
];

const PINS = [
  { x: 130, y: 270, shape: 'circle', fill: K.yellow, art: 'mark', fg: K.g1 },
  { x: 232, y: 270, shape: 'circle', fill: K.blue, art: 'pins', fg: K.white },
  { x: 130, y: 376, shape: 'square', fill: K.white, art: 'crane', fg: K.blue },
  { x: 232, y: 376, shape: 'mark', fill: K.blue, art: null, fg: K.white },
];

function Content({ idp, o, size, uid }) {
  if (o.art === 'pins') {
    return (
      <g>
        <PinG x={-size * 0.2} y={size * 0.12} r={size * 0.34} tone="white" />
        <PinG x={size * 0.34} y={-size * 0.26} r={size * 0.22} tone="yellow" />
      </g>
    );
  }
  if (!o.art) return null;
  const wide = o.shape === 'pill';
  return <Artwork kind={o.art} idp={idp} uid={uid} w={wide ? size * 1.9 : size * 1.2} h={wide ? size * 0.7 : size * 1.2} fg={o.fg} alt={K.yellow} />;
}

function StickerSheet({ idp }) {
  const R = 37;
  return (
    <g>
      <ShadowG idp={`${idp}-s`} cx={200} cy={458} rx={170} ry={14} tone="sky" />
      <LayerG i={0}>
        <path d={rrect(310, 270, 9)} transform="translate(200 320)" fill={K.g2} filter={url(idp, 'paper')} />
        <path d={rrect(310, 270, 9)} transform="translate(200 320)" fill={url(idp, 'lit')} />
        {STICKERS.map((o) => (
          <g key={`${o.x}${o.y}`} transform={`translate(${o.x} ${o.y})`}>
            <Shape shape={o.shape} r={R} fill="none" stroke={K.blue} strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
          </g>
        ))}
      </LayerG>
      <LayerG i={1} dx={96} dy={-96}>
        {STICKERS.map((o) => (
          <g key={`${o.x}${o.y}`} transform={`translate(${o.x} ${o.y})`}>
            <Lift idp={idp} dx={6} dy={10} opacity={0.5}>
              <Shape shape={o.shape} r={R} stroke={K.sky} strokeWidth="8" />
            </Lift>
            <Shape shape={o.shape} r={R} fill={K.white} stroke={K.g2} strokeWidth="10" strokeLinejoin="round" />
            <Shape shape={o.shape} r={R} fill={K.white} stroke={K.white} strokeWidth="8" strokeLinejoin="round" />
            <Shape shape={o.shape} r={R} fill={o.fill} />
            <Content idp={idp} o={o} size={R} uid={`k${o.x}${o.y}`} />
            <Shape shape={o.shape} r={R} fill={url(idp, 'lit')} opacity="0.8" />
            <ellipse cx={-R * 0.4} cy={-R * 0.5} rx={R * 0.38} ry={R * 0.15} fill="#FFFFFF" opacity="0.34" transform={`rotate(-35 ${-R * 0.4} ${-R * 0.5})`} />
          </g>
        ))}
      </LayerG>
      <AxisG points={[[200, 320], [296, 224], [372, 148]]} />
    </g>
  );
}

function PinCard({ idp }) {
  const R = 35;
  return (
    <g>
      <ShadowG idp={`${idp}-s`} cx={215} cy={470} rx={190} ry={13} tone="blue" />
      <LayerG i={0}>
        <path d={rrect(250, 360, 8)} transform="translate(180 305)" fill={K.field} filter={url(idp, 'paper')} />
        <path d={rrect(250, 360, 8)} transform="translate(180 305)" fill={url(idp, 'lit')} />
        <circle cx="180" cy="156" r="10" fill={K.white} />
        <circle cx="180" cy="156" r="10" fill="none" stroke="#000000" strokeWidth="2" opacity="0.18" />
        <path d="M172 154A8 8 0 0 1 188 154" fill="none" stroke="#000000" strokeWidth="2" opacity="0.25" />
        <WordmarkG x={180} y={462} size={36} fill={K.white} anchor="middle" registered />
        {PINS.map((o) => (
          <g key={`${o.x}${o.y}`} transform={`translate(${o.x} ${o.y})`}>
            <Shape shape={o.shape} r={R} fill="none" stroke={K.white} strokeWidth="1.2" strokeDasharray="3 4" opacity="0.8" />
          </g>
        ))}
      </LayerG>
      <LayerG i={1} dx={108} dy={-84}>
        {PINS.map((o) => (
          <g key={`${o.x}${o.y}`} transform={`translate(${o.x} ${o.y})`}>
            <Lift idp={idp} dx={7} dy={11} tone={K.blue} opacity={0.4}>
              <Shape shape={o.shape} r={R} />
            </Lift>
            <Shape shape={o.shape} r={R} fill={o.fill} stroke={url(idp, 'metal')} strokeWidth="5" strokeLinejoin="round" />
            <Content idp={idp} o={o} size={R} uid={`p${o.x}${o.y}`} />
            <Shape shape={o.shape} r={R} fill={url(idp, 'lit')} opacity="0.8" />
            <ellipse cx={-R * 0.4} cy={-R * 0.55} rx={R * 0.4} ry={R * 0.16} fill="#FFFFFF" opacity="0.34" transform={`rotate(-35 ${-R * 0.4} ${-R * 0.55})`} />
          </g>
        ))}
      </LayerG>
      <AxisG points={[[180, 330], [288, 246], [372, 180]]} />
    </g>
  );
}

/* ---------- Patches: top view, backing, fill and stitched border fanned along x ---------- */

const FLAT_ART = ['mark', 'lockup', 'stack'];

function Patch({ idp, shape, fill, border, art, fg, tone }) {
  const h = 72;
  const d = shapePath(shape, h);
  const dIn = shapePath(shape, h - 7);
  const dOut = shapePath(shape, h + 6.5);
  const wide = shape === 'square';
  const aw = wide ? 104 : 84;
  const ah = wide ? 46 : 72;
  const rot = (a, children) => <g transform={`translate(200 250) rotate(${a})`}>{children}</g>;
  return (
    <g>
      <ShadowG idp={`${idp}-s`} cx={206} cy={362} rx={186} ry={16} tone={tone} opacity={0.22} />
      <LayerG i={0} dx={104}>
        {rot(
          7,
          <g>
            <Lift idp={idp} dx={6} dy={10}>
              <path d={d} />
            </Lift>
            <path d={d} fill={K.g2} filter={url(idp, 'paper')} />
            <path d={d} fill={url(idp, 'pb-pat-dots')} opacity="0.5" />
            <Stitch d={dIn} stroke={K.blue} w={1} dash="3 3" opacity={0.45} />
            <path d={d} fill={url(idp, 'lit')} opacity="0.8" />
          </g>,
        )}
      </LayerG>
      <LayerG i={1}>
        {rot(
          0,
          <g>
            <Lift idp={idp} dx={6} dy={10}>
              <path d={d} />
            </Lift>
            <g filter={url(idp, 'fabric')}>
              <path d={dIn} fill={fill} />
            </g>
            <path d={dIn} fill={url(idp, 'sat')} />
            {FLAT_ART.includes(art) && (
              <g transform="translate(1.4 1.6)" opacity="0.28">
                <Artwork kind={art} idp={idp} uid="sh" w={aw} h={ah} fg="#000000" />
              </g>
            )}
            <Artwork kind={art} idp={idp} uid="fg" w={aw} h={ah} fg={fg} />
            <Stitch d={shapePath(shape, h - 12)} stroke={fg === K.blue ? K.blue : fg} w={0.9} dash="2 2.5" opacity={0.5} />
            <path d={dIn} fill={url(idp, 'lit')} />
          </g>,
        )}
      </LayerG>
      <LayerG i={2} dx={-104}>
        {rot(
          -7,
          <g>
            <Lift idp={idp} dx={6} dy={10}>
              <path d={d} fill="none" stroke={K.sky} strokeWidth="14" />
            </Lift>
            <g filter={url(idp, 'fabric')}>
              <path d={d} fill="none" stroke={border} strokeWidth="14" strokeLinejoin="round" />
            </g>
            <path d={d} fill="none" stroke="#FFFFFF" strokeWidth="10" strokeDasharray="1.5 2.2" opacity="0.28" strokeLinejoin="round" />
            <path d={dOut} fill="none" stroke="#000000" strokeWidth="0.9" opacity="0.2" />
            <path d={dIn} fill="none" stroke="#000000" strokeWidth="0.9" opacity="0.2" />
            <path d={d} fill="none" stroke={url(idp, 'lit')} strokeWidth="14" strokeLinejoin="round" />
          </g>,
        )}
      </LayerG>
      <AxisG points={[[96, 420], [200, 420], [304, 420]]} />
    </g>
  );
}

const PATCHES = [
  { name: 'patch-a', shape: 'circle', fill: K.blue, border: K.yellow, art: 'mark', fg: K.white, tone: 'blue', title: 'Round patch, mark on blue with a yellow border' },
  { name: 'patch-b', shape: 'square', fill: K.yellow, border: K.blue, art: 'lockup', fg: K.g1, tone: 'yellow', title: 'Square patch, lockup on yellow with a blue border' },
  { name: 'patch-c', shape: 'hex', fill: K.white, border: K.sky, art: 'iso', fg: K.blue, tone: 'sky', title: 'Hexagon patch, line drawing on white with a sky border' },
  { name: 'patch-d', shape: 'shield', fill: K.deep, border: K.ink, art: 'crane', fg: K.yellow, tone: 'blue', title: 'Shield patch, crane on structure blue with a dark border' },
];

/* ---------- Keychain: backing with ring, fill and stitched border fanned along x ---------- */

const tag = (w, h) => `${rrect(w, h, 24)}M0 ${-h / 2 + 30}m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0Z`;

function Keychain({ idp }) {
  return (
    <g>
      <ShadowG idp={`${idp}-s`} cx={270} cy={440} rx={210} ry={15} tone="yellow" opacity={0.26} />
      <LayerG i={0} dx={150}>
        <g transform="translate(270 260) rotate(5)">
          <Lift idp={idp} dx={7} dy={11}>
            <path d={tag(116, 196)} fillRule="evenodd" />
          </Lift>
          <path d={tag(116, 196)} fillRule="evenodd" fill={K.g2} filter={url(idp, 'paper')} />
          <path d={tag(116, 196)} fillRule="evenodd" fill={url(idp, 'lit')} />
          <Stitch d={rrect(98, 178, 16)} stroke={K.blue} w={1} dash="3 3" opacity={0.4} />
          <g transform="translate(0 -68)">
            <ellipse cx="0" cy="-14" rx="15" ry="22" fill="none" stroke={url(idp, 'metal')} strokeWidth="4" />
            <ellipse cx="0" cy="-14" rx="15" ry="22" fill="none" stroke="#000000" strokeWidth="1" opacity="0.25" transform="translate(1.5 1.5)" />
            <ellipse cx="-7" cy="-22" rx="3" ry="9" fill="#FFFFFF" opacity="0.6" />
          </g>
        </g>
      </LayerG>
      <LayerG i={1}>
        <g transform="translate(270 260)">
          <Lift idp={idp} dx={7} dy={11}>
            <path d={tag(116, 196)} fillRule="evenodd" />
          </Lift>
          <g filter={url(idp, 'fabric')}>
            <path d={tag(104, 184)} fillRule="evenodd" fill={K.blue} />
          </g>
          <path d={tag(104, 184)} fillRule="evenodd" fill={url(idp, 'sat')} />
          <g transform="translate(1.4 1.6)" opacity="0.28">
            <Artwork kind="stack" idp={idp} uid="sh" w={64} h={78} y={20} fg="#000000" />
          </g>
          <Artwork kind="stack" idp={idp} uid="fg" w={64} h={78} y={20} fg={K.white} />
          <Stitch d={rrect(84, 164, 14)} stroke={K.white} w={0.9} dash="2 2.5" opacity={0.55} />
          <path d={tag(104, 184)} fillRule="evenodd" fill={url(idp, 'lit')} />
        </g>
      </LayerG>
      <LayerG i={2} dx={-150}>
        <g transform="translate(270 260) rotate(-5)">
          <Lift idp={idp} dx={7} dy={11}>
            <path d={rrect(116, 196, 24)} fill="none" stroke={K.sky} strokeWidth="14" />
          </Lift>
          <g filter={url(idp, 'fabric')}>
            <path d={rrect(116, 196, 24)} fill="none" stroke={K.yellow} strokeWidth="14" />
          </g>
          <path d={rrect(116, 196, 24)} fill="none" stroke="#FFFFFF" strokeWidth="10" strokeDasharray="1.5 2.2" opacity="0.3" />
          <path d={rrect(116, 196, 24)} fill="none" stroke={url(idp, 'lit')} strokeWidth="14" />
          <circle cx="0" cy="-68" r="13" fill="none" stroke={url(idp, 'metal')} strokeWidth="5" />
        </g>
      </LayerG>
      <AxisG points={[[120, 410], [270, 410], [420, 410]]} />
    </g>
  );
}

export const smallPlates = [
  { id: 'stickers', caption: 'Sticker sheet', node: <Plate name="stickers" title="Sticker sheet, six stickers lifted off the backing" w={533}>{(idp) => <StickerSheet idp={idp} />}</Plate> },
  { id: 'pins', caption: 'Pin card', node: <Plate name="pin-card" title="Pin card, four enamel pins lifted off the card" w={533}>{(idp) => <PinCard idp={idp} />}</Plate> },
];

export const patchPlates = PATCHES.map((p) => ({
  id: p.name,
  caption: 'Patch',
  node: <Plate name={p.name} title={p.title} w={400}>{(idp) => <Patch idp={idp} {...p} />}</Plate>,
}));

export const keychainPlates = [
  { id: 'keychain', caption: 'Keychain', node: <Plate name="keychain" title="Keychain, border, fill and backing with ring fanned along x" w={533}>{(idp) => <Keychain idp={idp} />}</Plate> },
];
