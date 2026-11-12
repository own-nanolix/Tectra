import { pageMeta } from '@/lib/pages';
import Art from '@/components/art/Art';
import { LockupG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { Block, Plate } from '@/components/pages/logo/parts';
import Construction, { RATIOS } from '@/components/pages/logo/Construction';
import { ClearSpace, MinimumSizes } from '@/components/pages/logo/ClearSpace';
import { ColourVersions, LockupFamily } from '@/components/pages/logo/Versions';
import Misuse from '@/components/pages/logo/Misuse';
import Secondary from '@/components/pages/logo/Secondary';
import DrawOn from '@/components/pages/logo/DrawOn';
import s from '@/components/pages/logo/logo.module.css';

export const metadata = pageMeta('logo');

export default function Page() {
  return (
    <section className="page" id="p-logo" aria-label="Logo">
      <header className={`wrap ${s.head}`}>
        <div className={s.headGrid}>
          <div className={s.headMain}>
            <h1 tabIndex={-1} className="t-display">
              The <span className="hl">mark</span>
            </h1>
            <p className={`t-lead ${s.lead}`}>
              Three circles: two large circles fused into one body, and a small circle on its way.
            </p>
          </div>
          <p className={`${s.headNote} t-small`}>
            Measured from the enlarged mark in the case study. Sizes in px are recommendations.
          </p>
        </div>
      </header>

      <Reveal>
        <Block
          id="logo-h-primary"
          title="Primary lockup"
          note={<p>Mark left, the word Tectra in Urbanist Light right, as on the billboard. Box 400 by 100 at size 100.</p>}
        >
          <Plate>
            <Art viewBox="0 0 640 260" title="Primary lockup" exportName="logo-primary">
              <rect width="640" height="260" rx="6" fill={HEX.tile} />
              <LockupG x={80} y={70} size={120} fill={HEX.blue} />
            </Art>
          </Plate>
        </Block>
      </Reveal>

      <Reveal>
        <Block
          id="logo-h-construction"
          title="Construction"
          wide
          note={(
            <>
              <p>
                Two equal circles A and B of radius R are joined along a 45° diagonal from upper left to lower right.
                The two notches where they meet are rounded by concave fillets of radius 0.27 R. A separate circle C of radius 0.67 R
                sits upper right with an even gap of 0.25 R to both large circles.
              </p>
              <p>On the 100-unit square: A (28.4, 34.2), B (66.3, 71.3), C (81.2, 19.2), R = 28.4.</p>
            </>
          )}
        >
          <Construction />
          <div className={s.ratios}>
            {RATIOS.map(([k, v]) => (
              <div key={k} className={s.ratio}><b>{k}</b><span>{v}</span></div>
            ))}
          </div>
        </Block>
      </Reveal>

      <Reveal>
        <Block
          id="logo-h-clear"
          title="Clear space"
          wide
          note={<p>Recommendation: keep a margin of R, the radius of the large circles (28.4 % of the mark width), free on all four sides.</p>}
        >
          <ClearSpace />
        </Block>
      </Reveal>

      <Reveal>
        <Block
          id="logo-h-min"
          title="Minimum size"
          note={<p>Recommendation, in px on screen: do not set the mark below 16 px. Each tile is drawn at true size.</p>}
        >
          <MinimumSizes />
        </Block>
      </Reveal>

      <Reveal>
        <Block
          id="logo-h-colour"
          title="Colour versions"
          wide
          note={<p>Blue on a light tile. Light grey on the yellow tile, the app icon. White on blue. White on yellow. Grey on white, as on the container.</p>}
        >
          <ColourVersions />
        </Block>
      </Reveal>

      <Reveal>
        <Block
          id="logo-h-family"
          title="Lockup family"
          note={<p>Mark alone, horizontal lockup, stacked lockup, the word-mark with the registered sign as on the hard hat, and the app icon at 6 % and 22 % radius.</p>}
        >
          <LockupFamily />
        </Block>
      </Reveal>

      <Reveal>
        <Block
          id="logo-h-misuse"
          title="Misuse"
          wide
          note={<p>Six changes that break the geometry or the contrast: stretched, rotated, wrong colour, the small circle moved, outlined, and low contrast on a busy field.</p>}
        >
          <Misuse />
        </Block>
      </Reveal>

      <Reveal>
        <Block
          id="logo-h-secondary"
          title="Secondary graphic"
          note={<p>The mark used as a window, as on the billboard: the line drawing sits inside the body and the small circle. The pattern repeats the three circles.</p>}
        >
          <Secondary />
        </Block>
      </Reveal>

      <Reveal>
        <Block
          id="logo-h-draw"
          title="Draw-on"
          note={<p>The finished mark is the base state. The animation plays towards it and ends on it.</p>}
        >
          <DrawOn />
        </Block>
      </Reveal>
    </section>
  );
}
