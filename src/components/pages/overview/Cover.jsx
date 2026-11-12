import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { MonitorG, ScreenAppG } from '@/components/art/Devices';
import { TreesG } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import s from '@/components/pages/overview/styles';

// The cover of the case study (m01): Field Blue, a dark-blue line drawing of trees, and the monitor tilted
// across it showing the desktop app. One SVG. The tilt is an SVG transform; the slow turn plays on an inner group.
export default function Cover() {
  return (
    <div className={s.coverWrap}>
      <Art
        viewBox="0 0 1600 1000"
        title="Tectra cover: a tilted monitor showing the desktop app over a line drawing of trees"
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
        <g className="fade-in" style={{ '--i': 0 }}>
          <TreesG x={0} y={-120} w={1600} h={1200} count={16} tone="blue" seed={11} minSize={210} maxSize={440} opacity={0.95} />
        </g>
        <g transform="translate(120 70) rotate(9) skewX(-3)">
          <g className="mock-lit">
            <MonitorG idp="overview-mon" w={1480} stand={false}>
              <ScreenAppG idp="overview-app" />
            </MonitorG>
          </g>
        </g>
        <g className="fade-in" style={{ '--i': 14 }}>
          <MarkG x={1512} y={50} size={34} fill="#FFFFFF" />
        </g>
      </Art>
    </div>
  );
}
