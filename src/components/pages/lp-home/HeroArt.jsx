import Art from '@/components/art/Art';
import { IsoSiteG, TreesG, PinG, iso } from '@/components/art/KeyArt';

// The hero drawing: dark-blue line trees behind the isometric building, two white ring pins on the roof.
// One exportable SVG. The drawing fades and rises, the pins drop (CSS keyframes from the shared classes).
const SC = 2.02; // scale of the 560 x 400 building box
const BX = 40, BY = 36; // where that box sits in the 1200 x 860 drawing
// Two ring pins on the long ridge, as grid points [x, y, z] of the building plan.
const PINS = [['left', [3.5, 5.5, 3.7]], ['right', [12, 5.5, 3.7]]];

export default function HeroArt() {
  const pins = PINS.map(([n, g]) => {
    const [px, py] = iso(...g, 20);
    return { n, x: BX + (262 + px) * SC, y: BY + (118 + py) * SC };
  });
  return (
    <Art viewBox="0 0 1200 860" title="Isometric site building with line-drawn trees and two location pins" exportName="lp-home-hero-art" preserveAspectRatio="xMaxYMax meet">
      <g className="fade-in" style={{ '--i': 1 }}>
        <TreesG x={0} y={0} w={1200} h={860} count={30} tone="blue" seed={11} minSize={80} maxSize={170} opacity={0.75} clear={[-50, 150, 260, 420]} />
      </g>
      <g className="slide-up" style={{ '--i': 3 }}>
        <IsoSiteG x={BX} y={BY} scale={SC} tone="blue" trees={false} />
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
