import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { MonitorG, ScreenAppG } from '@/components/art/Devices';
import { TreesG, IsoSiteG } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import s from '@/components/pages/overview/styles';

// The cover of the case study (m01): Field Blue, a dark-blue line drawing of trees and the pitched-roof building,
// and the monitor set across it showing the desktop app. One SVG.
//
// Camera, measured on m01 at 1600 x 1000: the monitor's horizontal edges climb about 14 degrees to the right
// (top edge from (175, 75) to (1450, 395)), while its vertical edges stay almost upright, leaning about 3 degrees
// (left edge from (175, 75) down to (130, 890)). That is a skew, not a rotation: matrix(1 0.25 -0.055 1).
// The monitor's top-left corner sits at about (150, 60) and its right edge leaves the frame at about x 1460.
// Top right: the studio's "R" and the mark, joined by "x".
const MONITOR = { x: 150, y: 60, w: 1330 };

export default function Cover() {
  return (
    <div className={s.coverWrap}>
      <Art
        viewBox="0 0 1600 1000"
        title="Tectra cover: the monitor showing the desktop app, set at an angle over a line drawing of trees and the site building"
        exportName="overview-cover"
        className={s.cover}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="overview-cover-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5BA8F8" />
            <stop offset="1" stopColor="#4C9BF3" />
          </linearGradient>
        </defs>
        <rect width="1600" height="1000" fill={HEX.field} />
        <rect width="1600" height="1000" fill="url(#overview-cover-sky)" />

        {/* the line drawing behind the monitor: the site building upper right, trees all round */}
        <g className="fade-in" style={{ '--i': 0 }} opacity="0.9">
          <IsoSiteG x={820} y={-60} scale={1.6} tone="blue" trees={false} seed={4} />
        </g>
        <g className="fade-in" style={{ '--i': 2 }}>
          <TreesG x={0} y={-120} w={1600} h={1200} count={16} tone="blue" seed={11} minSize={210} maxSize={440} opacity={0.95} />
        </g>

        {/* the monitor, skewed as in m01; the slow turn to the light plays on an inner group */}
        <g transform={`matrix(1 0.25 -0.055 1 ${MONITOR.x} ${MONITOR.y})`}>
          <g className="mock-lit">
            <MonitorG idp="overview-mon" w={MONITOR.w} stand={false}>
              <ScreenAppG idp="overview-app" />
            </MonitorG>
          </g>
        </g>

        {/* R x mark, top right */}
        <g className="fade-in" style={{ '--i': 14 }} fill="#FFFFFF">
          <text x="1488" y="76" textAnchor="end" fontSize="30" fontWeight="500">R</text>
          <text x="1508" y="74" textAnchor="middle" fontSize="16" fontWeight="400">x</text>
          <MarkG x={1522} y={50} size={32} fill="#FFFFFF" />
        </g>
      </Art>
    </div>
  );
}
