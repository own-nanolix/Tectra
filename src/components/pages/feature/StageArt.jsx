import Art from '@/components/art/Art';
import { IsoSiteG, PinG, TreesG } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { PINS, STAGE, pinPoint } from './data';
import s from './feature.module.css';

// The Progress site view as one exportable SVG: blue field, line-drawn trees, the isometric cut-away building and
// the five location pins. The selected pin is yellow and rings; the buttons that make the pins operable sit over
// the pins in HTML (see SiteDemo).
export default function StageArt({ sel }) {
  return (
    <Art viewBox={`0 0 ${STAGE.w} ${STAGE.h}`} title="Isometric site view with five location pins" exportName="feature-site" className={s.artSvg}>
      <rect width={STAGE.w} height={STAGE.h} fill={HEX.field} />
      <TreesG x={0} y={0} w={STAGE.w} h={STAGE.h} count={22} tone="blue" seed={21} minSize={70} maxSize={150} clear={[300, 230, 560, 330]} opacity={0.9} />
      <IsoSiteG x={STAGE.x} y={STAGE.y} scale={STAGE.k} tone="blue" trees={false} />
      {PINS.map((p, i) => {
        const [x, y] = pinPoint(p.id);
        const on = p.id === sel;
        return (
          <g key={p.id} className="pop" style={{ '--i': i + 2 }}>
            <PinG x={x} y={y} r={on ? 12 : 10} tone={on ? 'yellow' : 'white'} pulse={on} />
          </g>
        );
      })}
    </Art>
  );
}
