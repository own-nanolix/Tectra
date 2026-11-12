import Art from '@/components/art/Art';
import { MonitorG, ScreenAppG } from '@/components/art/Devices';

// The blue tile of the key features: the tilted monitor with the app, cropped by the tile. One SVG.
export default function FeatureMonitor() {
  return (
    <Art viewBox="0 0 800 880" title="Tilted monitor showing the Tectra desktop app" exportName="lp-home-features-monitor" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lp-home-fm-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4C9BF3" />
          <stop offset="1" stopColor="#3C86E6" />
        </linearGradient>
        <clipPath id="lp-home-fm-clip">
          <rect width="800" height="880" rx="12" />
        </clipPath>
        <linearGradient id="lp-home-fm-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0A3D91" stopOpacity="0" />
          <stop offset="1" stopColor="#0A3D91" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g clipPath="url(#lp-home-fm-clip)">
        <rect width="800" height="880" fill="url(#lp-home-fm-bg)" />
        <g className="slide-up" style={{ '--i': 1 }}>
          <g transform="translate(90 110) rotate(10)">
            <MonitorG idp="lp-home-fm" w={1120}>
              <ScreenAppG idp="lp-home-fm-app" />
            </MonitorG>
          </g>
        </g>
        <rect y="560" width="800" height="320" fill="url(#lp-home-fm-shade)" />
      </g>
    </Art>
  );
}
