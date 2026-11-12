// Three posters (1080 x 1350) rebuilt from the case study, and the poster mockup (print with its metal frame lifted).
import Art from '@/components/art/Art';
import { MarkG, LockupG, MarkWindowG } from '@/components/art/Mark';
import { IsoSiteG, TreesG, CraneG, PatternDefs } from '@/components/art/KeyArt';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG, CalloutG } from '@/components/art/Mockup';
import { HEX, POSTER, HERO, BILLBOARD } from '@/lib/brand';
import { Lines, GroundG, QrG, SZ } from './shared';

// Poster 1 (case study: the poster in the metal frame). Pale ground, blue mark, light headline, grey drawing, blue roofs.
export function PosterBuildG({ idp }) {
  return (
    <g>
      <GroundG idp={idp} w={1080} h={1350} kind="paper" />
      <MarkG x={90} y={96} size={64} fill={HEX.blue} bodyClass="fuse-a" dotClass="fuse-c" />
      <Lines x={90} y={250} lines={['Build Smarter, Build Faster', 'with Tectra']} size={72} lh={80} fill={HEX.ink} cls="slide-up" />
      <Lines
        x={90} y={364} size={21} lh={30} weight={400} fill={HEX.muted} cls="fade-in" i={3}
        lines={['Streamline project tracking, enhance collaboration, and minimize delays — all', 'in one mobile app for construction teams.']}
      />
      <g className="fade-in" style={{ '--i': 2 }}>
        <TreesG x={0} y={470} w={1080} h={520} count={16} tone="paper" seed={5} minSize={80} maxSize={170} clear={[330, 360, 560, 200]} />
      </g>
      <g className="slide-up" style={{ '--i': 4 }}>
        <IsoSiteG x={-10} y={600} scale={1.95} tone="paper" trees={false} />
      </g>
    </g>
  );
}

// Poster 2 (case study: the light-box panel). Blue field, white mark, "Smart Construction", the crane rising.
export function PosterSmartG({ idp }) {
  return (
    <g>
      <GroundG idp={idp} w={1080} h={1350} kind="deep" />
      <PatternDefs idp={idp} color="#FFFFFF" opacity={0.16} />
      <rect width="1080" height="560" fill={`url(#${idp}-pat-dots)`} className="fade-in" />
      <MarkG x={492} y={100} size={96} fill="#FFFFFF" bodyClass="fuse-a" dotClass="fuse-c" />
      <Lines x={540} y={330} lines={['Smart', 'Construction']} size={132} lh={124} anchor="middle" fill="#FFFFFF" cls="slide-up" />
      <Lines
        x={540} y={556} size={24} lh={34} weight={500} anchor="middle" fill={HEX.navy} cls="fade-in" i={3}
        lines={['Smart construction uses technology like AI and IoT to improve', 'efficiency, safety, and sustainability.']}
      />
      <g className="slide-up" style={{ '--i': 4 }}>
        <CraneG x={286} y={560} scale={2.46} />
      </g>
    </g>
  );
}

// Poster 3 (case study: the billboard). Photos become the line drawing inside the mark's own shape.
export function PosterEmpowerG({ idp }) {
  return (
    <g>
      <GroundG idp={idp} w={1080} h={1350} kind="deep" />
      <defs>
        <linearGradient id={`${idp}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E3EFFC" />
        </linearGradient>
      </defs>
      <g className="fade-in">
        <MarkWindowG idp={idp} x={40} y={150} size={700}>
          <rect x="-5" y="-5" width="110" height="110" fill={`url(#${idp}-sky)`} />
          <g transform="scale(0.2)">
            <TreesG x={-60} y={-20} w={640} h={560} count={13} tone="paper" seed={9} minSize={70} maxSize={150} clear={[120, 190, 360, 220]} />
            <IsoSiteG x={-80} y={70} scale={1.2} tone="paper" trees={false} />
          </g>
        </MarkWindowG>
      </g>
      <LockupG x={720} y={70} size={60} fill="#FFFFFF" />
      <Lines x={90} y={936} lines={['Empowering Construction', 'Teams with Real-Time', 'Data and Collaboration']} size={68} lh={76} fill="#FFFFFF" cls="slide-up" i={2} />
      <QrG x={90} y={1126} size={150} seed={17} />
      <Lines
        x={286} y={1172} size={22} lh={32} weight={500} fill={HEX.navy} cls="fade-in" i={4}
        lines={['Streamline your project management, enhance team efficiency,', 'and reduce delays with Tectra — the mobile-first solution for', 'modern construction.']}
      />
    </g>
  );
}

export function PosterBuild() {
  return (
    <Art viewBox={SZ.poster} title={`Poster: ${POSTER.title}`} exportName="campaign-poster-build">
      <PosterBuildG idp="campaign-poster-build" />
    </Art>
  );
}
export function PosterSmart() {
  return (
    <Art viewBox={SZ.poster} title={`Poster: ${HERO.title.join(' ')}`} exportName="campaign-poster-smart">
      <PosterSmartG idp="campaign-poster-smart" />
    </Art>
  );
}
export function PosterEmpower() {
  return (
    <Art viewBox={SZ.poster} title={`Poster: ${BILLBOARD.title}`} exportName="campaign-poster-empower">
      <PosterEmpowerG idp="campaign-poster-empower" />
    </Art>
  );
}

// The poster as an object: print and metal frame pulled apart along the diagonal. Light from the upper left.
const FRAME = 'M400 170h520v640h-520zM420 190v600h480v-600z';
export function PosterMock() {
  const id = 'campaign-mock';
  return (
    <Art viewBox="0 0 1200 900" title="Poster mockup: print and metal frame, exploded" exportName="campaign-poster-mock">
      <MaterialDefs idp={id} />
      <clipPath id={`${id}-print`}><rect x="420" y="190" width="480" height="600" /></clipPath>
      <BackdropG w={1200} h={900} />
      <g transform="translate(10 30)">
        <ShadowG idp={`${id}-s`} cx={670} cy={846} rx={340} tone="blue" opacity={0.3} />
        <AxisG points={[[980, 810], [660, 490], [550, 380], [330, 160]]} />
        <LayerG i={0}>
          <rect x="900" y="196" width="5" height="600" fill="#D2D2D2" />
          <rect x="424" y="790" width="480" height="5" fill="#BEBEBE" />
          <g clipPath={`url(#${id}-print)`}>
            <g transform="translate(420 190) scale(0.4444)"><PosterBuildG idp={`${id}-art`} /></g>
            <path d={FRAME} fillRule="evenodd" transform="translate(-70 -70)" fill="#2F2F2F" opacity="0.13" filter={`url(#${id}-soft)`} />
            <rect x="420" y="190" width="480" height="600" fill={`url(#${id}-glass)`} opacity="0.35" className="mock-sheen" />
          </g>
        </LayerG>
        <LayerG i={1} dx={-110} dy={-110}>
          <path d="M400 170L418 152H938L920 170Z" fill="#E6E6E6" />
          <path d="M920 170L938 152V792L920 810Z" fill="#9C9C9C" />
          <path d={FRAME} fillRule="evenodd" fill={`url(#${id}-metal)`} />
          <path d={FRAME} fillRule="evenodd" fill={`url(#${id}-shade)`} />
          <path d="M401 171H919M401 171V809" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" fill="none" />
          <path d="M421 789H899V191" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" fill="none" />
          <path d="M419 191H899V789" stroke="#7E7E7E" strokeWidth="1.5" opacity="0.5" fill="none" />
        </LayerG>
        <CalloutG x={800} y={90} tx={860} ty={50} label="Frame" />
        <CalloutG x={900} y={730} tx={960} ty={760} label="Print" />
      </g>
    </Art>
  );
}
