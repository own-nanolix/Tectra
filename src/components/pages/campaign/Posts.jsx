// Four square social posts (1080 x 1080). Each uses a different layout.
import Art from '@/components/art/Art';
import { MarkG, LockupG } from '@/components/art/Mark';
import { TickBarsG, GaugeG, PatternDefs, PinG } from '@/components/art/KeyArt';
import { HEX, QUOTES, INSIGHTS, EFFICIENCY } from '@/lib/brand';
import { axisLabels, segments } from '@/lib/charts';
import { Lines, GroundG, PersonG, FuseMark, SZ } from './shared';

// 1. Blue field, the mark as a huge crop, the headline below it.
export function PostBuild() {
  const id = 'campaign-post-build';
  return (
    <Art viewBox={SZ.post} title="Post: Build Smarter, Build Faster with Tectra" exportName="campaign-post-build">
      <GroundG idp={id} w={1080} h={1080} kind="blue" />
      <PatternDefs idp={id} color="#FFFFFF" opacity={0.18} />
      <rect x="560" y="0" width="520" height="520" fill={`url(#${id}-pat-dots)`} className="fade-in" />
      <g className="fade-in" style={{ '--i': 2 }}>
        <MarkG x={380} y={150} size={940} fill="#FFFFFF" fillOpacity="0.16" bodyClass="fuse-a" dotClass="fuse-c" />
      </g>
      <LockupG x={90} y={86} size={56} fill="#FFFFFF" />
      <Lines x={90} y={760} lines={['Build Smarter,', 'Build Faster', 'with Tectra']} size={124} lh={128} fill="#FFFFFF" cls="slide-up" i={2} />
      <PinG x={960} y={960} r={16} tone="yellow" pulse />
    </Art>
  );
}

// 2. A measured figure on a pale tile: the tick bars carry the layout.
export function PostInsight() {
  const id = 'campaign-post-insight';
  const d = INSIGHTS[0];
  const lab = axisLabels(900);
  return (
    <Art viewBox={SZ.post} title="Post: 72% teams struggle with fragmented data" exportName="campaign-post-insight">
      <GroundG idp={id} w={1080} h={1080} kind="tile" />
      <MarkG x={90} y={90} size={64} fill={HEX.blue} bodyClass="fuse-a" dotClass="fuse-c" />
      <text x="86" y="530" fontSize="340" fontWeight="300" fill={HEX.ink} letterSpacing="-5" className="slide-up">{d.value}</text>
      <Lines x={90} y={620} lines={['teams struggle with', 'fragmented data']} size={58} lh={68} fill={HEX.ink} cls="slide-up" i={2} />
      <TickBarsG idp={id} x={90} y={780} w={900} h={100} count={60} from={d.from} to={d.to} rise />
      <g transform="translate(90 780)" fill={HEX.muted} fontSize="20" fontWeight="400">
        {lab.map((a, k) => (
          <text key={a.label} x={a.x} y={160} textAnchor={k === 0 ? 'start' : k === lab.length - 1 ? 'end' : 'middle'}>{a.label}</text>
        ))}
      </g>
    </Art>
  );
}

// 3. The quote chip layout on paper.
export function PostQuote() {
  const id = 'campaign-post-quote';
  const q = QUOTES.fragmented;
  const segs = segments(3, 300, q.steps, 8);
  return (
    <Art viewBox={SZ.post} title="Post: quote about fragmented data" exportName="campaign-post-quote">
      <GroundG idp={id} w={1080} h={1080} kind="paper" />
      <rect x="90" y="90" width="96" height="96" rx="4" fill={HEX.chip} />
      <text x="138" y="152" fontSize="48" fontWeight="300" fill={HEX.ink} textAnchor="middle">{'//'}</text>
      <Lines
        x={90} y={330} size={68} lh={82} fill={HEX.ink} cls="slide-up" i={1}
        lines={[
          ['"Teams ', { h: 'struggled with' }],
          [{ h: 'fragmented data.' }, ' We created'],
          'an intuitive app to simplify',
          'tracking and enhance',
          'collaboration.',
        ]}
      />
      <PersonG idp={id} x={90} y={830} initials={q.initials} name={q.name} role={q.role} />
      <g transform="translate(690 902)">
        {segs.map((s, k) => (
          <rect key={k} x={s.x} width={s.w} height="8" rx="2" fill={s.on ? HEX.blue : HEX.chip} className="grow-x" style={{ '--i': k }} />
        ))}
      </g>
    </Art>
  );
}

// 4. Yellow field, one large figure and the corner gauge.
export function PostEfficiency() {
  const id = 'campaign-post-efficiency';
  return (
    <Art viewBox={SZ.post} title="Post: 40% task efficiency" exportName="campaign-post-efficiency">
      <GroundG idp={id} w={1080} h={1080} kind="yellow" />
      <clipPath id={`${id}-clip`}><rect width="1080" height="1080" /></clipPath>
      <g clipPath={`url(#${id}-clip)`}>
        <GaugeG x={0} y={0} w={1080} h={1080} r={300} value={0.4} tone="blue" track="#FFE0A6" draw />
      </g>
      <MarkG x={90} y={90} size={72} fill="#FFFFFF" bodyClass="fuse-a" dotClass="fuse-c" />
      <text x="80" y="610" fontSize="400" fontWeight="300" fill={HEX.ink} letterSpacing="-8" className="slide-up">{EFFICIENCY.value}</text>
      <Lines x={90} y={760} lines={['By using Tectra, teams increased', 'task efficiency and reduced', 'delays significantly']} size={40} lh={52} weight={400} fill={HEX.ink} cls="fade-in" i={4} />
    </Art>
  );
}
