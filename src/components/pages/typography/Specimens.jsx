import Art from '@/components/art/Art';
import { CHARSET, FONT_NAME, HEX, KPI, WEIGHTS } from '@/lib/brand';

const OUT = { fill: 'none', stroke: HEX.blue, strokeWidth: 2, strokeLinejoin: 'round' };

// The specimen of the case study (m11): Font, Urbanist, the character set, the giant AaBbCc and the weight labels.
export function SpecimenSvg() {
  return (
    <Art viewBox="0 200 1600 930" title="Urbanist specimen: character set, the giant AaBbCc and the weights Light, Regular and Medium" exportName="typography-specimen">
      <rect width="1600" height="1150" fill={HEX.paper} />
      <g className="fade-in">
        <text x="504" y="272" fontSize="24" fontWeight="300" fill={HEX.muted}>Font</text>
        <text x="504" y="342" fontSize="52" fontWeight="300" fill={HEX.black}>{FONT_NAME}</text>
        {CHARSET.map((line, i) => (
          <text key={line} x="504" y={410 + i * 52} fontSize="34" fontWeight="300" fill={HEX.muted}>{line}</text>
        ))}
      </g>
      <g className="slide-up" style={{ '--i': 2 }}>
        <text x="100" y="955" fontSize="404" textLength="1385" lengthAdjust="spacing">
          <tspan fontWeight="300" {...OUT}>Aa</tspan>
          <tspan fontWeight="500" fill={HEX.blue}>Bb</tspan>
          <tspan fontWeight="500" fill={HEX.blue}>Cc</tspan>
        </text>
      </g>
      <g className="fade-in" style={{ '--i': 5 }}>
        {WEIGHTS.map(([name, w], i) => (
          <text key={name} x={[1098, 1246, 1424][i]} y="1080" fontSize="25" fontWeight={w} fill={i === 2 ? HEX.ink : HEX.muted}>{name}</text>
        ))}
      </g>
    </Art>
  );
}

// The sticky giant glyph: "Aa" as the blue Light outline of the specimen.
export function GlyphSvg() {
  return (
    <Art viewBox="0 0 520 640" title="Giant Aa in Urbanist Light, blue outline" exportName="typography-glyph">
      <rect width="520" height="640" rx="6" fill={HEX.tile} />
      <text x="260" y="420" textAnchor="middle" fontSize="400" fontWeight="300" fill="none" stroke={HEX.blue} strokeWidth="2" strokeLinejoin="round">Aa</text>
      <text x="36" y="70" fontSize="15" fontWeight="500" fill={HEX.muted}>Font</text>
      <text x="36" y="110" fontSize="36" fontWeight="300" fill={HEX.ink}>{FONT_NAME}</text>
      <text x="36" y="596" fontSize="15" fontWeight="400" fill={HEX.muted}>Light 300</text>
    </Art>
  );
}

// The three weights, each set in its own weight.
export function WeightsSvg() {
  return (
    <Art viewBox="0 0 1200 600" title="Urbanist weights: Light 300, Regular 400 and Medium 500" exportName="typography-weights">
      <rect width="1200" height="600" rx="6" fill={HEX.tile} />
      {WEIGHTS.map(([name, w], i) => {
        const y = 40 + i * 180;
        return (
          <g key={name} className="slide-up" style={{ '--i': i }}>
            <text x="40" y={y + 40} fontSize="14" fontWeight="500" fill={HEX.muted}>{`${name} ${w}`}</text>
            <text x="40" y={y + 130} fontSize="104" fontWeight={w} fill={i === 0 ? 'none' : HEX.blue} stroke={i === 0 ? HEX.blue : 'none'} strokeWidth="1.6">Aa</text>
            <text x="400" y={y + 88} fontSize="52" fontWeight={w} fill={HEX.ink}>Smart Construction</text>
            <text x="400" y={y + 128} fontSize="24" fontWeight={w} fill={HEX.muted}>0123456789  +2.4%  -1.9%</text>
          </g>
        );
      })}
    </Art>
  );
}

// The secondary voice: the case study shows only Urbanist. Medium is the label and card-title voice of the same family.
export function VoiceSvg() {
  // Card titles and figures as the app prints them (KPI in brand.js), "Progres" spelled as in the source.
  const cards = [KPI.details, KPI.notes, KPI.material, KPI.progress];
  return (
    <Art viewBox="0 0 1200 520" title="The label voice: Urbanist Medium, the same family as the primary typeface, set as card titles" exportName="typography-voice">
      <rect width="1200" height="520" rx="6" fill={HEX.tile} />
      <text x="40" y="52" fontSize="14" fontWeight="500" fill={HEX.muted}>Label voice</text>
      <text x="40" y="96" fontSize="30" fontWeight="500" fill={HEX.ink}>Urbanist Medium 500</text>
      <text x="40" y="128" fontSize="15" fontWeight="400" fill={HEX.muted}>Same family as the primary typeface, set heavier for labels and card titles</text>
      <text x="40" y="410" fontSize="270" fontWeight="500" fill={HEX.blue}>Mm</text>
      {cards.map((c, i) => {
        const x = 520 + (i % 2) * 330;
        const y = 168 + Math.floor(i / 2) * 170;
        return (
          <g key={c.label} className="slide-up" style={{ '--i': i }}>
            <rect x={x} y={y} width="310" height="150" rx="4" fill={HEX.card} />
            <text x={x + 20} y={y + 40} fontSize="20" fontWeight="500" fill={HEX.ink}>{c.label}</text>
            <text x={x + 20} y={y + 112} fontSize="44" fontWeight="300" fill={HEX.ink}>{c.value}</text>
            <text x={x + 290} y={y + 40} textAnchor="end" fontSize="13" fontWeight="400" fill={HEX.muted}>{c.trend}</text>
          </g>
        );
      })}
    </Art>
  );
}

// The character set as printed (with the designer's G for J) plus every glyph once, in three weights.
export function CharsetSvg() {
  const glyphs = [...new Set(CHARSET.join('').split(''))];
  const cols = 13;
  return (
    <Art viewBox="0 0 1200 820" title="Urbanist character set as printed in the case study, in Light, Regular and Medium" exportName="typography-charset">
      <rect width="1200" height="820" rx="6" fill={HEX.paper} stroke={HEX.app} />
      {WEIGHTS.map(([name, w], i) => (
        <g key={name} className="fade-in" style={{ '--i': i }}>
          <text x="40" y={50 + i * 92} fontSize="12" fontWeight="500" fill={HEX.muted}>{`${name} ${w}`}</text>
          {CHARSET.map((line, k) => (
            <text key={line} x="40" y={78 + i * 92 + k * 34} fontSize="28" fontWeight={w} fill={HEX.ink}>{line}</text>
          ))}
        </g>
      ))}
      {glyphs.map((g, i) => {
        const x = 40 + (i % cols) * 87;
        const y = 330 + Math.floor(i / cols) * 90;
        return (
          <g key={g} className="fade-in" style={{ '--i': i % 13 }}>
            <rect x={x} y={y} width="79" height="80" rx="4" fill={HEX.tile} />
            <text x={x + 39.5} y={y + 56} textAnchor="middle" fontSize="44" fontWeight="300" fill={i % 7 === 0 ? HEX.blue : HEX.ink}>{g}</text>
          </g>
        );
      })}
    </Art>
  );
}
