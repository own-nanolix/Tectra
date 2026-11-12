import { LayerG, AxisG, ShadowG } from '@/components/art/Mockup';
import { Plate, Artwork, Lift, Stitch, K, url, rrect } from './parts';

// Tote bag, front elevation. Handles, bag body and print are pulled apart along the y axis.
function Tote({ idp, c, strap, film, art, artFg, artAlt, tone, lit }) {
  const body = 'M-105 190H105L111 370Q111 380 101 380H-101Q-111 380 -111 370Z';
  const loop = 'M-62 222V160C-62 96 62 96 62 160V222';
  const foot = (x) => `M${x - 12} 196h24v38h-24z M${x - 12} 196l24 38 M${x + 12} 196l-24 38`;
  return (
    <g className={lit ? 'mock-lit' : undefined}>
      <ShadowG idp={`${idp}-s`} cx={200} cy={488} rx={130} ry={12} tone={tone} />
      <g transform="translate(200 0)">
        <LayerG i={0} dy={-70}>
          <g fill="none" strokeLinecap="butt">
            <path d={loop} transform="translate(7 11)" stroke={K.sky} strokeWidth="14" opacity="0.4" filter={url(idp, 'soft')} />
            <path d={loop} stroke={strap} strokeWidth="15" filter={url(idp, 'fabric')} />
            <path d={loop} transform="translate(2 2)" stroke="#000000" strokeWidth="5" opacity="0.14" />
            <path d={loop} transform="translate(-3 -2)" stroke="#FFFFFF" strokeWidth="4" opacity="0.4" />
            <Stitch d={loop} stroke={K.white} w={1} dash="3 3" opacity={0.7} />
            <path d={foot(-62)} stroke={strap} strokeWidth="1.4" />
            <path d={foot(62)} stroke={strap} strokeWidth="1.4" />
            <path d={foot(-62)} stroke="#000000" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.35" />
            <path d={foot(62)} stroke="#000000" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.35" />
          </g>
        </LayerG>
        <LayerG i={1}>
          <path d={body} transform="translate(8 12)" fill={K.sky} opacity="0.4" filter={url(idp, 'soft')} />
          <g filter={url(idp, 'fabric')}>
            <path d={body} fill={c} />
          </g>
          <path d={body} fill={url(idp, 'shade')} />
          <path d={body} fill="none" stroke={K.g3} strokeWidth="1" />
          <path d={body} fill={url(idp, 'lit')} opacity="0.7" />
          <path d="M-62 206L-54 372" stroke="#FFFFFF" strokeWidth="20" opacity="0.2" filter={url(idp, 'soft')} />
          <path d="M60 204L66 372" stroke="#000000" strokeWidth="16" opacity="0.1" filter={url(idp, 'soft')} />
          <path d="M-105 190H105V210H-105Z" fill="#000000" opacity="0.08" />
          <rect x="-105" y="190" width="210" height="3" fill="#000000" opacity="0.28" />
          <Stitch d="M-100 205H100" stroke={K.white} opacity={0.7} />
          <Stitch d="M-96 212L-102 366M96 212L102 366M-98 371H98" stroke={K.white} w={1} opacity={0.55} />
          <path d="M-111 370Q-111 380 -101 380H101Q111 380 111 370" fill="none" stroke="#000000" strokeWidth="1.2" opacity="0.2" />
        </LayerG>
        <LayerG i={2} dy={150}>
          <g transform="translate(0 285)">
            <Lift idp={idp} dx={5} dy={9}>
              <path d={rrect(76, 76, 4)} />
            </Lift>
            <path d={rrect(76, 76, 4)} fill={film} filter={url(idp, 'paper')} />
            <path d={rrect(76, 76, 4)} fill="none" stroke={K.g3} strokeWidth="1" />
            <Artwork kind={art} idp={idp} w={58} h={58} fg={artFg} alt={artAlt} />
            <path d={rrect(76, 76, 4)} fill={url(idp, 'lit')} opacity="0.6" />
          </g>
        </LayerG>
        <AxisG points={[[152, 95], [152, 285], [152, 435]]} />
      </g>
    </g>
  );
}

const TOTES = [
  { name: 'tote-a', title: 'Tote bag, natural canvas with the stacked lockup, exploded', c: K.g1, strap: K.blue, film: K.white, art: 'stack', artFg: K.blue, artAlt: K.yellow, tone: 'blue', lit: true },
  { name: 'tote-b', title: 'Tote bag, blue with the app icon print, exploded', c: K.blue, strap: K.yellow, film: K.white, art: 'icon', artFg: K.g1, artAlt: K.yellow, tone: 'yellow', lit: false },
];

export const bagPlates = TOTES.map((t) => ({
  id: t.name,
  caption: 'Tote bag',
  node: (
    <Plate name={t.name} title={t.title} w={400}>
      {(idp) => <Tote idp={idp} {...t} />}
    </Plate>
  ),
}));
