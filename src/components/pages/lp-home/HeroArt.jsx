import Art from '@/components/art/Art';
import { IsoSiteG, TreesG, PinG, iso } from '@/components/art/KeyArt';

// The hero drawing: dark-blue line trees behind the isometric building, two white ring pins on the roof.
// One exportable SVG. The drawing fades and rises, the pins drop (CSS keyframes from the shared classes).
// The building is mirrored so its long ridge runs from the lower left up to the upper right, as in the case
// study, and scaled so it fills the right of the hero and runs off the right and bottom edges.
const SC = 2.3; // scale of the 560 x 400 building box
const MX = 1472, MY = 13; // mirror axis and top of the building box in the 1200 x 860 drawing
// Two ring pins on the roofs, as grid points [x, y, z] of the plan: the lower end of the long ridge and the
// ridge of the wing. Both land at the reference spots (below the glass card, left and right).
const PINS = [['left', [15, 5.5, 3.7]], ['right', [10.5, 10, 3.7]]];
const S = 20; // grid unit of IsoSiteG

export default function HeroArt() {
  const pins = PINS.map(([n, g]) => {
    const [px, py] = iso(...g, S);
    return { n, x: Math.round(MX - (262 + px) * SC), y: Math.round(MY + (118 + py) * SC) };
  });
  return (
    <Art viewBox="0 0 1200 860" title="Isometric site building with line-drawn trees and two location pins" exportName="lp-home-hero-art" preserveAspectRatio="xMaxYMax meet">
      <g className="fade-in" style={{ '--i': 1 }}>
        <TreesG x={0} y={0} w={1200} h={860} count={30} tone="blue" seed={11} minSize={80} maxSize={170} opacity={0.75} clear={[-50, 150, 260, 420]} />
      </g>
      <g className="slide-up" style={{ '--i': 3 }}>
        <g transform={`translate(${MX} ${MY}) scale(-1 1)`}>
          <IsoSiteG x={0} y={0} scale={SC} tone="blue" trees={false} />
        </g>
      </g>
      {pins.map((p, i) => (
        <g key={p.n} transform={`translate(${p.x} ${p.y})`}>
          <g className="pop" style={{ '--i': 8 + i * 3 }}>
            <PinG r={15} pulse />
          </g>
        </g>
      ))}
    </Art>
  );
}
