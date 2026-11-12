// Business cards: three cards fanned round their lower-left corner; the foil layer of the top card lifts off along the diagonal.
import Art from '@/components/art/Art';
import { MarkG, LockupG, WordmarkG, MARK_BODY } from '@/components/art/Mark';
import { IsoSiteG, TickBarsG, PatternDefs } from '@/components/art/KeyArt';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG, SheenG } from '@/components/art/Mockup';
import { C, Sheet, Ph } from './parts';

const CW = 460, CH = 264;
// The foil layer: the brand artwork in foil gradients. It is drawn flat on the card, or lifted off the top card.
function CardFoil({ idp, kind }) {
  if (kind === 'blue') {
    return (
      <g>
        <MarkG x={182} y={84} size={96} fill={`url(#${idp}-foil-white)`} />
        <g transform="translate(182 84) scale(0.96)">
          <SheenG idp={idp} d={MARK_BODY} />
        </g>
      </g>
    );
  }
  if (kind === 'white') return <LockupG x={36} y={34} size={46} fill={`url(#${idp}-foil-blue)`} />;
  return <WordmarkG x={36} y={152} size={68} fill={`url(#${idp}-foil-ink)`} />;
}

// Card stock with its printed parts. When `lifted`, the foil is left out and only its impression stays.
function CardBase({ idp, kind, rot, lifted }) {
  const bk = `${idp}-bk`;
  return (
    <g>
      <Sheet idp={idp} w={CW} h={CH} r={9} depth={3} rot={rot} lift={0.7} fill={kind === 'blue' ? `url(#${idp}-field)` : kind === 'back' ? C.yellow : undefined}>
        {kind === 'blue' && (
          <g clipPath={`url(#${idp}-clip)`}>
            <IsoSiteG tone="blue" trees={false} scale={0.46} x={248} y={112} opacity="0.55" />
          </g>
        )}
        {kind === 'white' && (
          <g>
            <TickBarsG idp={`${idp}-tb`} x={316} y={30} w={112} h={64} count={14} from={0.4} to={0.7} handle={false} />
            <Ph x={36} y={156} w={152} h={9} fill={C.greyD} />
            <Ph x={36} y={174} w={108} h={6} />
            <Ph x={36} y={206} w={96} h={5} />
            <Ph x={36} y={220} w={128} h={5} />
            <Ph x={36} y={234} w={104} h={5} />
          </g>
        )}
        {kind === 'back' && (
          <g>
            <rect width={CW} height={CH} rx="9" fill={`url(#${bk}-pat-marks)`} />
            <Ph x={36} y={206} w={96} h={5} fill={C.ink} opacity="0.28" />
            <Ph x={36} y={220} w={128} h={5} fill={C.ink} opacity="0.28" />
            <Ph x={36} y={234} w={104} h={5} fill={C.ink} opacity="0.28" />
            <MarkG x={376} y={196} size={48} fill={C.ink} opacity="0.85" />
          </g>
        )}
        {lifted ? (
          <g opacity="0.16" transform="translate(1 1.5)">
            <CardFoil idp={idp} kind={kind} />
          </g>
        ) : (
          <CardFoil idp={idp} kind={kind} />
        )}
        <rect width={CW} height={CH} rx="9" fill={`url(#${idp}-shade)`} opacity="0.45" />
      </Sheet>
    </g>
  );
}

const FAN = [
  { rot: -38, dx: -16, dy: -10 },
  { rot: -19, dx: -8, dy: -5 },
  { rot: 0, dx: 0, dy: 0 },
];

// order: kinds from the bottom of the fan to the top. The last one carries the lifted foil.
function CardFan({ idp, order, title, exportName }) {
  const P = [310, 650];
  const top = order[order.length - 1];
  const cx = P[0] + CW / 2, cy = P[1] - CH / 2;
  return (
    <Art viewBox="100 110 780 640" title={title} exportName={exportName}>
      <BackdropG w={1000} h={760} />
      <MaterialDefs idp={idp} />
      <PatternDefs idp={`${idp}-bk`} color={C.ink} opacity={0.14} />
      <defs>
        <linearGradient id={`${idp}-field`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5BA8F8" />
          <stop offset="1" stopColor="#4C9BF3" />
        </linearGradient>
        <clipPath id={`${idp}-clip`}>
          <rect width={CW} height={CH} rx="9" />
        </clipPath>
        <linearGradient id={`${idp}-foil-white`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.45" stopColor="#E3EFFC" />
          <stop offset="0.6" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D5E6FA" />
        </linearGradient>
        <linearGradient id={`${idp}-foil-blue`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6DB0F8" />
          <stop offset="0.5" stopColor="#4093EC" />
          <stop offset="0.7" stopColor="#7DB6F5" />
          <stop offset="1" stopColor="#145CB8" />
        </linearGradient>
        <linearGradient id={`${idp}-foil-ink`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5A5A5A" />
          <stop offset="0.5" stopColor="#2F2F2F" />
          <stop offset="0.7" stopColor="#5E5E5E" />
          <stop offset="1" stopColor="#1C1C1C" />
        </linearGradient>
      </defs>
      <ShadowG idp={`${idp}-s`} cx={470} cy={690} rx={340} tone={top === 'back' ? 'yellow' : 'blue'} />
      <AxisG points={[[cx + 84, cy + 84], [cx, cy], [cx - 34, cy - 34], [cx - 96, cy - 96]]} />
      {order.map((kind, i) => {
        const f = FAN[i];
        const isTop = i === order.length - 1;
        return (
          <LayerG key={kind} i={i} dx={f.dx} dy={f.dy}>
            <g transform={`translate(${P[0]} ${P[1]}) rotate(${f.rot}) translate(0 ${-CH})`}>
              <CardBase idp={idp} kind={kind} rot={f.rot} lifted={isTop} />
              {isTop && (
                <LayerG i={4} dx={-34} dy={-34}>
                  <g transform="translate(10 14)" opacity="0.22" filter={`url(#${idp}-soft)`}>
                    <CardFoil idp={idp} kind={kind} />
                  </g>
                  <CardFoil idp={idp} kind={kind} />
                </LayerG>
              )}
            </g>
          </LayerG>
        );
      })}
    </Art>
  );
}

export const CARD_PLATES = [
  { id: 'a', order: ['back', 'white', 'blue'], name: 'Business cards, front, blue' },
  { id: 'b', order: ['back', 'blue', 'white'], name: 'Business cards, front, white' },
  { id: 'c', order: ['white', 'blue', 'back'], name: 'Business cards, back' },
];

export function Cards({ plate }) {
  return (
    <CardFan
      idp={`use-stationery-cards-${plate.id}`}
      order={plate.order}
      title={`${plate.name}: three cards fanned round one corner, foil layer lifted off`}
      exportName={`use-stationery-cards-${plate.id === 'a' ? 'front-blue' : plate.id === 'b' ? 'front-white' : 'back'}`}
    />
  );
}
