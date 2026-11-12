// Five stories (1080 x 1920).
import Art from '@/components/art/Art';
import { MarkG, AppIconG, LockupG } from '@/components/art/Mark';
import { IsoSiteG, PinG, TickBarsG, GaugeG, PatternDefs } from '@/components/art/KeyArt';
import { PhoneG, ScreenHomeG } from '@/components/art/Devices';
import { IconUse } from '@/components/site/Icon';
import { HEX, HERO, KOMATSU, INSIGHTS, RESULTS, QUOTES, HEADINGS } from '@/lib/brand';
import { axisLabels } from '@/lib/charts';
import { Lines, GroundG, PersonG, SZ } from './shared';

// greedy word wrap for a short label
function wrap(text, max) {
  const out = [];
  let cur = '';
  text.split(' ').forEach((w) => {
    if ((cur + ' ' + w).trim().length > max) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  });
  out.push(cur);
  return out;
}

function ChipG({ x, y, label, w = 240 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height="62" rx="4" fill={HEX.chip} />
      <text x={w / 2} y="40" fontSize="22" fontWeight="400" fill={HEX.ink} textAnchor="middle">{label}</text>
    </g>
  );
}

// 1. The hero: app icon, "Smart Construction", the site with pins and the Komatsu card.
export function StorySmart() {
  const id = 'campaign-story-smart';
  return (
    <Art viewBox={SZ.story} title="Story: Smart Construction" exportName="campaign-story-smart">
      <GroundG idp={id} w={1080} h={1920} kind="blue" />
      <AppIconG x={90} y={110} size={92} />
      <Lines x={90} y={440} lines={HERO.title} size={156} lh={146} fill="#FFFFFF" cls="slide-up" />
      <Lines
        x={90} y={640} size={30} lh={44} weight={500} fill={HEX.navy} cls="fade-in" i={3}
        lines={['Smart construction uses technology like AI and IoT', 'to improve efficiency, safety, and sustainability.']}
      />
      <g className="fade-in" style={{ '--i': 2 }}>
        <IsoSiteG x={20} y={740} scale={1.86} tone="blue" pins={['ridge', 'wing']} yellowPin="komatsu" seed={4} />
      </g>
      <g transform="translate(90 1560)"><g className="slide-up" style={{ '--i': 5 }}>
        <rect width="560" height="210" rx="4" fill="#FFFFFF" fillOpacity="0.2" />
        <text x="36" y="72" fontSize="44" fontWeight="500" fill="#FFFFFF">{KOMATSU.name}</text>
        <text x="36" y="122" fontSize="28" fontWeight="500" fill={HEX.navy}>{KOMATSU.dates}</text>
        <text x="36" y="182" fontSize="64" fontWeight="300" fill="#FFFFFF" letterSpacing="-1">{KOMATSU.value}</text>
        <PinG x={510} y={50} r={16} tone="yellow" pulse />
      </g></g>
    </Art>
  );
}

// 2. Three research figures stacked, each with its tick bars.
export function StoryInsights() {
  const id = 'campaign-story-insights';
  const lab = axisLabels(828);
  return (
    <Art viewBox={SZ.story} title="Story: three pain points in numbers" exportName="campaign-story-insights">
      <GroundG idp={id} w={1080} h={1920} kind="paper" />
      <ChipG x={90} y={100} label={HEADINGS.insights.chip} w={252} />
      <MarkG x={926} y={96} size={64} fill={HEX.blue} bodyClass="fuse-a" dotClass="fuse-c" />
      <Lines x={90} y={290} lines={['Identifying Key', [{ h: 'Pain Points' }, ' in'], 'Construction', 'Management for', 'Success']} size={86} lh={96} fill={HEX.ink} cls="slide-up" />
      {INSIGHTS.map((d, k) => {
        const y = 790 + k * 350;
        return (
          <g key={d.value + k} transform={`translate(90 ${y})`}><g className="slide-up" style={{ '--i': k + 2 }}>
            <rect width="900" height="330" rx="4" fill={HEX.chip} />
            <text x="34" y="132" fontSize="124" fontWeight="300" fill={HEX.ink} letterSpacing="-2">{d.value}</text>
            <Lines x={366} y={78} lines={wrap(d.label, 26)} size={34} lh={42} weight={400} fill={HEX.ink} />
            <TickBarsG idp={`${id}-${k}`} x={36} y={172} w={828} h={56} count={52} from={d.from} to={d.to} tone={d.tone} base="#C9C9C9" rise />
            <g transform="translate(36 172)" fill={HEX.muted} fontSize="17" fontWeight="400">
              {lab.map((a, j) => <text key={a.label} x={a.x} y={90} textAnchor={j === 0 ? 'start' : j === lab.length - 1 ? 'end' : 'middle'}>{a.label}</text>)}
            </g>
          </g></g>
        );
      })}
    </Art>
  );
}

// 3. Results: the quote, then two corner-gauge cards.
export function StoryResults() {
  const id = 'campaign-story-results';
  const q = QUOTES.result;
  const cards = [RESULTS[0], RESULTS[2]];
  return (
    <Art viewBox={SZ.story} title="Story: results, 32% and 25%" exportName="campaign-story-results">
      <GroundG idp={id} w={1080} h={1920} kind="tile" />
      <ChipG x={90} y={100} label={HEADINGS.result.chip} w={170} />
      <Lines
        x={90} y={290} size={58} lh={70} fill={HEX.ink} cls="slide-up"
        lines={[
          ['"Tectra ', { h: 'helped us streamline' }],
          [{ h: 'project tracking and improve' }],
          [{ h: 'communication.' }, ' Teams now'],
          'complete tasks faster and',
          'with higher accuracy',
        ]}
      />
      <PersonG idp={id} x={90} y={652} size={72} initials={q.initials} name={q.name} role={q.role} fs={26} />
      {cards.map((c, k) => {
        const y = 830 + k * 540;
        return (
          <g key={k} transform={`translate(90 ${y})`}><g className="slide-up" style={{ '--i': k + 3 }}>
            <clipPath id={`${id}-c${k}`}><rect width="900" height="510" rx="4" /></clipPath>
            <rect width="900" height="510" rx="4" fill="#FFFFFF" />
            <g clipPath={`url(#${id}-c${k})`}>
              <GaugeG x={0} y={0} w={900} h={510} r={310} value={parseInt(c.value, 10) / 100} tone={c.tone} draw />
            </g>
            <text x="40" y="80" fontSize="36" fontWeight="500" fill={HEX.ink}>{c.label}</text>
            <IconUse name="arrow-up" x={826} y={42} size={44} color={HEX.ink} />
            <text x="34" y="400" fontSize="220" fontWeight="300" fill={HEX.ink} letterSpacing="-4">{c.value}</text>
          </g></g>
        );
      })}
    </Art>
  );
}

// 4. The live-data quote on blue.
export function StoryQuote() {
  const id = 'campaign-story-quote';
  const q = QUOTES.live;
  return (
    <Art viewBox={SZ.story} title="Story: quote about live data" exportName="campaign-story-quote">
      <GroundG idp={id} w={1080} h={1920} kind="deep" />
      <PatternDefs idp={id} color="#FFFFFF" opacity={0.16} />
      <rect width="1080" height="1920" fill={`url(#${id}-pat-fuse)`} className="fade-in" />
      <g className="fade-in" style={{ '--i': 2 }}>
        <MarkG x={330} y={1020} size={900} fill="#FFFFFF" fillOpacity="0.2" bodyClass="fuse-a" dotClass="fuse-c" />
      </g>
      <rect x="90" y="110" width="96" height="96" rx="4" fill="#FFFFFF" />
      <text x="138" y="174" fontSize="50" fontWeight="300" fill={HEX.navy} textAnchor="middle">{'//'}</text>
      <Lines
        x={90} y={430} size={92} lh={112} fill="#FFFFFF" hl={HEX.yellow} cls="slide-up" i={1}
        lines={['"Real-time updates', 'were missing. We', [{ h: 'integrated live data' }], 'for immediate access', 'to relevant', 'information.']}
      />
      <PersonG idp={id} x={90} y={1560} initials={q.initials} name={q.name} role={q.role} nameFill="#FFFFFF" roleFill={HEX.navy} fs={32} />
      <g transform="translate(90 1736)">
        {[0, 1, 2].map((k) => <rect key={k} x={k * 106} width="96" height="8" rx="2" fill={k < q.steps ? '#FFFFFF' : HEX.navy} opacity={k < q.steps ? 1 : 0.35} className="grow-x" style={{ '--i': k }} />)}
      </g>
      <LockupG x={700} y={1730} size={52} fill="#FFFFFF" />
    </Art>
  );
}

// 5. The palm of your hand: the blue home screen rises from the bottom edge.
export function StoryPalm() {
  const id = 'campaign-story-palm';
  return (
    <Art viewBox={SZ.story} title="Story: Construction Management in the Palm of Your Hand" exportName="campaign-story-palm">
      <GroundG idp={id} w={1080} h={1920} kind="paper" />
      <ChipG x={90} y={100} label={HEADINGS.mobile.chip} w={206} />
      <Lines x={90} y={330} lines={['Construction', 'Management in the', 'Palm of Your Hand']} size={102} lh={114} fill={HEX.ink} cls="slide-up" />
      <Lines
        x={90} y={700} size={28} lh={40} weight={400} fill={HEX.muted} cls="fade-in" i={3}
        lines={["Access your project's data, track tasks, and collaborate", 'in real-time with our fully optimized mobile app,', 'available anywhere, anytime']}
      />
      <g className="slide-up" style={{ '--i': 4 }}>
        <PhoneG idp={`${id}-ph`} x={260} y={900} w={560}>
          <ScreenHomeG idp={`${id}-scr`} />
        </PhoneG>
      </g>
    </Art>
  );
}

