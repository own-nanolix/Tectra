import { MarkG } from '@/components/art/Mark';
import { IsoSiteG, TickBarsG } from '@/components/art/KeyArt';
import { MonitorG, PhoneG, TabletG, ScreenAppG, ScreenHomeG } from '@/components/art/Devices';
import { HERO, POSTER } from '@/lib/brand';

// The poster title (verbatim) broken over three lines.
const POSTER_LINES = POSTER.title.split(/(?<=,) |(?= with)/).map((l) => l.trim());

// A light "landing page" screen: 1600 x 1000. Blue field, nav pill, headline, two buttons, the site.
export function LandingScreenG({ idp }) {
  return (
    <g>
      <linearGradient id={`${idp}-ls-bg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5BA8F8" />
        <stop offset="1" stopColor="#4C9BF3" />
      </linearGradient>
      <rect width="1600" height="1000" fill={`url(#${idp}-ls-bg)`} />
      <rect x="60" y="50" width="70" height="70" rx="6" fill="#FFB83D" />
      <MarkG x={78} y={68} size={34} fill="#F5F5F5" />
      <rect x="500" y="50" width="600" height="70" rx="6" fill="#90C0F3" fillOpacity="0.85" />
      {['Dashboard', 'Progress', 'Timeline', 'Work areas'].map((t, i) => (
        <text key={t} x={540 + i * 140} y="92" fontSize="22" fontWeight="500" fill="#0A2E63">{t}</text>
      ))}
      <rect x="1360" y="50" width="70" height="70" rx="6" fill="#90C0F3" fillOpacity="0.85" />
      <rect x="1450" y="50" width="100" height="70" rx="6" fill="#FFB83D" />
      <text x="1500" y="92" fontSize="22" fontWeight="500" fill="#2F2F2F" textAnchor="middle">{HERO.login}</text>
      <text x="90" y="400" fontSize="130" fontWeight="300" fill="#FFFFFF" letterSpacing="-2">{HERO.title[0]}</text>
      <text x="90" y="530" fontSize="130" fontWeight="300" fill="#FFFFFF" letterSpacing="-2">{HERO.title[1]}</text>
      <rect x="90" y="620" width="170" height="60" rx="6" fill="#FFB83D" />
      <rect x="276" y="620" width="170" height="60" rx="6" fill="#90C0F3" />
      <IsoSiteG x={720} y={150} scale={1.9} tone="blue" seed={9} pins={['ridge', 'wing']} />
    </g>
  );
}

// The thumbnail tiles of the roadmap: a 100 x 100 tile, drawn at (0, 0).
export function ThumbG({ kind, idp }) {
  return (
    <g>
      <rect width="100" height="100" rx="4" fill="#F0F0F0" />
      {kind === 'poster' && (
        <g>
          <rect x="30" y="12" width="42" height="64" fill="#FFFFFF" stroke="#8F8F8F" strokeWidth="1" />
          <MarkG x={34} y={16} size={8} fill="#4093EC" />
          <path d="M35 30h22M35 34h16" stroke="#8F8F8F" strokeWidth="1" />
          <IsoSiteG x={32} y={46} scale={0.07} tone="paper" trees={false} />
        </g>
      )}
      {kind === 'desktop' && (
        <MonitorG idp={`${idp}-m`} x={13} y={16} w={74}>
          <ScreenAppG idp={`${idp}-a`} />
        </MonitorG>
      )}
      {kind === 'mobile' && (
        <PhoneG idp={`${idp}-p`} x={33} y={8} w={36}>
          <ScreenHomeG idp={`${idp}-h`} />
        </PhoneG>
      )}
      {kind === 'landing' && (
        <MonitorG idp={`${idp}-m`} x={13} y={16} w={74}>
          <LandingScreenG idp={`${idp}-l`} />
        </MonitorG>
      )}
    </g>
  );
}

// The rich scene on a stage card: 400 x 300.
export function StageSceneG({ kind, idp }) {
  return (
    <g>
      <rect width="400" height="300" fill="#F0F0F0" />
      {kind === 'poster' && (
        <g>
          <rect x="118" y="18" width="164" height="236" fill="#FFFFFF" stroke="#8F8F8F" strokeWidth="2" />
          <rect x="126" y="26" width="148" height="220" fill="none" stroke="#DFDFDF" strokeWidth="1" />
          <MarkG x={140} y={40} size={26} fill="#4093EC" />
          {POSTER_LINES.map((l, i) => (
            <text key={l} x="140" y={92 + i * 20} fontSize="16" fontWeight="300" fill="#2F2F2F">{l}</text>
          ))}
          <path d="M140 124h100M140 134h84M140 144h92" stroke="#DFDFDF" strokeWidth="3" />
          <IsoSiteG x={122} y={140} scale={0.28} tone="paper" trees={false} />
        </g>
      )}
      {kind === 'desktop' && (
        <MonitorG idp={`${idp}-m`} x={50} y={18} w={300}>
          <ScreenAppG idp={`${idp}-a`} />
        </MonitorG>
      )}
      {kind === 'mobile' && (
        <PhoneG idp={`${idp}-p`} x={137} y={16} w={126}>
          <ScreenHomeG idp={`${idp}-h`} />
        </PhoneG>
      )}
      {kind === 'landing' && (
        <MonitorG idp={`${idp}-m`} x={50} y={18} w={300}>
          <LandingScreenG idp={`${idp}-l`} />
        </MonitorG>
      )}
      {kind === 'responsive' && (
        <g>
          <TabletG idp={`${idp}-t`} x={96} y={60} w={208} screenFill="#FAFAFA">
            <IsoSiteG x={300} y={120} scale={1.2} tone="ghost" trees={false} />
            <rect x="60" y="80" width="360" height="40" fill="#DFDFDF" />
            <rect x="60" y="150" width="240" height="24" fill="#E9E9E9" />
          </TabletG>
        </g>
      )}
      {kind === 'localiztion' && (
        <TickBarsG idp={`${idp}-tb`} x={50} y={90} w={300} h={90} count={40} from={0} to={0} base="#C9C9C9" handle={false} />
      )}
    </g>
  );
}
