import Art from '@/components/art/Art';
import { MarkG, WordmarkG, LockupG, LockupStackG, AppIconG } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { Plate } from './parts';
import s from './logo.module.css';

// Colour versions shown in the case study: blue on light tile, light grey on yellow (app icon), white on blue,
// white on yellow, grey on white (container).
const GREY = '#8F8F8F';
const VERSIONS = [
  { id: 'blue-on-tile', name: 'Blue on light tile', bg: HEX.tile, fg: HEX.blue },
  { id: 'grey-on-yellow', name: 'Light grey on yellow, app icon', bg: HEX.yellow, fg: HEX.tile },
  { id: 'white-on-blue', name: 'White on blue', bg: HEX.field, fg: HEX.white },
  { id: 'white-on-yellow', name: 'White on yellow', bg: HEX.yellow, fg: HEX.white },
  { id: 'grey-on-white', name: 'Grey on white', bg: HEX.white, fg: GREY },
];

export function ColourVersions() {
  return (
    <>
      <div className={s.strip4}>
        {VERSIONS.slice(0, 4).map((v) => (
          <Plate key={v.id} caption={v.name}>
            <Art viewBox="0 0 240 240" title={v.name} exportName={`logo-colour-${v.id}`}>
              {v.id === 'grey-on-yellow' ? (
                <AppIconG size={240} radius={6} tile={v.bg} fill={v.fg} />
              ) : (
                <>
                  <rect width="240" height="240" rx="6" fill={v.bg} />
                  <MarkG x={60} y={60} size={120} fill={v.fg} />
                </>
              )}
            </Art>
          </Plate>
        ))}
      </div>
      <div className={`${s.strip4} ${s.stripGap}`}>
        {VERSIONS.slice(4).map((v) => (
          <Plate key={v.id} caption={v.name}>
            <Art viewBox="0 0 240 240" title={v.name} exportName={`logo-colour-${v.id}`}>
              <rect width="240" height="240" rx="6" fill={v.bg} />
              <MarkG x={60} y={60} size={120} fill={v.fg} />
            </Art>
          </Plate>
        ))}
      </div>
    </>
  );
}

export function LockupFamily() {
  return (
    <>
      <div className={s.pair}>
        <Plate caption="Mark alone">
          <Art viewBox="0 0 400 260" title="Mark alone" exportName="logo-family-mark">
            <rect width="400" height="260" rx="6" fill={HEX.tile} />
            <MarkG x={120} y={50} size={160} fill={HEX.blue} />
          </Art>
        </Plate>
        <Plate caption="Word-mark alone, with the registered sign">
          <Art viewBox="0 0 400 260" title="Word-mark with registered sign" exportName="logo-family-wordmark">
            <rect width="400" height="260" rx="6" fill={HEX.tile} />
            <WordmarkG x={188} y={152} size={110} fill={HEX.ink} anchor="middle" registered />
          </Art>
        </Plate>
      </div>
      <div className={`${s.pair} ${s.stripGap}`}>
        <Plate caption="Horizontal lockup">
          <Art viewBox="0 0 520 260" title="Horizontal lockup" exportName="logo-family-horizontal">
            <rect width="520" height="260" rx="6" fill={HEX.tile} />
            <LockupG x={60} y={80} size={100} fill={HEX.blue} />
          </Art>
        </Plate>
        <Plate caption="Stacked lockup">
          <Art viewBox="0 0 520 260" title="Stacked lockup" exportName="logo-family-stacked">
            <rect width="520" height="260" rx="6" fill={HEX.tile} />
            <LockupStackG x={114} y={17} scale={0.97} fill={HEX.blue} />
          </Art>
        </Plate>
      </div>
      <div className={`${s.strip3} ${s.stripGap}`}>
        <Plate caption="App icon, web tile (6 % radius)">
          <Art viewBox="0 0 240 240" title="App icon, web tile" exportName="logo-family-app-icon">
            <rect width="240" height="240" rx="6" fill={HEX.tile} />
            <AppIconG x={50} y={50} size={140} radius={6} />
          </Art>
        </Plate>
        <Plate caption="App icon, dock tile (22 % radius)">
          <Art viewBox="0 0 240 240" title="App icon, dock tile" exportName="logo-family-app-icon-dock">
            <rect width="240" height="240" rx="6" fill={HEX.tile} />
            <AppIconG x={50} y={50} size={140} radius={22} />
          </Art>
        </Plate>
        <Plate caption="White lockup on blue">
          <Art viewBox="0 0 240 240" title="White lockup on blue" exportName="logo-family-lockup-white">
            <rect width="240" height="240" rx="6" fill={HEX.field} />
            <LockupG x={20} y={96} size={52} fill={HEX.white} />
          </Art>
        </Plate>
      </div>
    </>
  );
}
