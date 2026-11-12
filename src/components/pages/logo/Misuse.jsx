import Art from '@/components/art/Art';
import { MarkG, MARK_BODY, MARK } from '@/components/art/Mark';
import { PatternDefs } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { Plate } from './parts';
import s from './logo.module.css';

// Six things not to do. Each tile is its own SVG, crossed with a thin red line.
const WRONG_PURPLE = '#9B51E0';

function Cross() {
  return <path d="M14 14L226 226" stroke={HEX.red} strokeWidth="1.5" strokeLinecap="round" fill="none" />;
}

function Tile({ id, name, bg = HEX.tile, defs, children }) {
  return (
    <Plate>
      <Art viewBox="0 0 240 270" title={`Misuse: ${name}`} exportName={`logo-misuse-${id}`}>
        {defs}
        <rect width="240" height="240" rx="6" fill={bg} />
        {children}
        <Cross />
        <text x="120" y="262" textAnchor="middle" fontSize="14" fill={HEX.ink}>{name}</text>
      </Art>
    </Plate>
  );
}

export default function Misuse() {
  return (
    <div className={s.strip6}>
      <Tile id="stretched" name="Stretched">
        <g transform="translate(120 120) scale(1.55 0.8) translate(-60 -60)">
          <MarkG x={10} y={10} size={100} fill={HEX.blue} />
        </g>
      </Tile>
      <Tile id="rotated" name="Rotated">
        <g transform="rotate(-28 120 120)">
          <MarkG x={50} y={50} size={140} fill={HEX.blue} />
        </g>
      </Tile>
      <Tile id="wrong-colour" name="Wrong colour">
        <MarkG x={50} y={50} size={140} fill={WRONG_PURPLE} />
      </Tile>
      <Tile id="moved-circle" name="Small circle moved">
        <g transform="translate(50 50) scale(1.4)" fill={HEX.blue}>
          <path d={MARK_BODY} />
          <circle cx="14" cy="88" r={MARK.C.r} />
        </g>
      </Tile>
      <Tile id="outlined" name="Outlined">
        <MarkG x={50} y={50} size={140} fill="none" stroke={HEX.blue} strokeWidth={2.2} />
      </Tile>
      <Tile
        id="busy-field" name="Low contrast on a busy field" bg={HEX.field}
        defs={<PatternDefs idp="logo-misuse-busy" color={HEX.deep} opacity={0.9} />}
      >
        <rect width="240" height="240" rx="6" fill="url(#logo-misuse-busy-pat-fuse)" />
        <rect width="240" height="240" rx="6" fill="url(#logo-misuse-busy-pat-boards)" />
        <MarkG x={50} y={50} size={140} fill={HEX.sky} />
      </Tile>
    </div>
  );
}
