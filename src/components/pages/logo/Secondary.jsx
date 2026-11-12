import Art from '@/components/art/Art';
import { MarkWindowG, LockupG } from '@/components/art/Mark';
import { IsoSiteG, TreesG, PatternDefs } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { Plate } from './parts';
import s from './logo.module.css';

// The mark as a window (the billboard device): the line drawing sits inside the shape of the mark, on a blue field.
export default function Secondary() {
  return (
    <>
      <Plate caption="The mark as a window, holding the isometric line drawing">
        <Art viewBox="0 0 960 520" title="Mark window with the site drawing on a blue field" exportName="logo-window-site">
          <rect width="960" height="520" rx="6" fill={HEX.field} />
          <MarkWindowG idp="logo-win-site" x={70} y={50} size={420}>
            <rect width="100" height="100" fill={HEX.tile} />
            <IsoSiteG x={-8} y={4} scale={0.2} tone="paper" pins={['ridge', 'wing']} yellowPin="komatsu" />
          </MarkWindowG>
          <LockupG x={560} y={70} size={70} fill={HEX.white} />
          <rect x="560" y="400" width="190" height="6" fill={HEX.white} opacity="0.9" />
          <rect x="560" y="424" width="300" height="6" fill={HEX.white} opacity="0.6" />
          <rect x="560" y="448" width="240" height="6" fill={HEX.white} opacity="0.6" />
        </Art>
      </Plate>
      <div className={`${s.pair} ${s.stripGap}`}>
        <Plate caption="The mark as a window, holding trees">
          <Art viewBox="0 0 480 480" title="Mark window with trees on a blue field" exportName="logo-window-trees">
            <rect width="480" height="480" rx="6" fill={HEX.field} />
            <MarkWindowG idp="logo-win-trees" x={50} y={50} size={380}>
              <rect width="100" height="100" fill={HEX.deep} />
              <TreesG x={-4} y={-4} w={112} h={112} count={9} tone="blue" seed={5} minSize={14} maxSize={30} />
            </MarkWindowG>
          </Art>
        </Plate>
        <Plate caption="Pattern of the three circles">
          <Art viewBox="0 0 480 480" title="Pattern built from the mark" exportName="logo-pattern-marks">
            <PatternDefs idp="logo-pat" color={HEX.white} opacity={0.5} />
            <rect width="480" height="480" rx="6" fill={HEX.field} />
            <rect width="480" height="480" rx="6" fill="url(#logo-pat-pat-marks)" />
          </Art>
        </Plate>
      </div>
    </>
  );
}
