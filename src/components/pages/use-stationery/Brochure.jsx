// Tri-fold brochure: three panels unfolded and spaced along the x axis, with a gradient across every fold.
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { IsoSiteG, TreesG, GaugeG } from '@/components/art/KeyArt';
import { BackdropG, ShadowG, MaterialDefs, LayerG, AxisG } from '@/components/art/Mockup';
import { POSTER, FEATURES, EFFICIENCY } from '@/lib/brand';
import { C, Sheet, wrap, wrapRuns, RunLines, quoteRuns } from './parts';

const PW = 440, PH = 780, PY = 80, X0 = 130;

// Fold edges: 'v' valley (dark towards the crease), 'm' mountain (a soft ridge of light).
function Fold({ idp, x, side, kind }) {
  const w = 34;
  const gx = side === 'r' ? x - w : x;
  const flip = side === 'r';
  const id = `${idp}-fold-${kind}${flip ? 'r' : 'l'}`;
  return <rect x={gx} y={PY} width={w} height={PH} fill={`url(#${id})`} />;
}

function Panel({ idp, i, fill, children, edgeL, edgeR }) {
  const x = X0 + i * PW;
  return (
    <LayerG i={i} dx={(i - 1) * 70}>
      <Sheet idp={idp} x={x} y={PY} w={PW} h={PH} r={2} depth={4} lift={1.5} fill={fill}>
        <clipPath id={`${idp}-clip${i}`}>
          <rect x={x} y={PY} width={PW} height={PH} />
        </clipPath>
        <g clipPath={`url(#${idp}-clip${i})`}>{children(x)}</g>
        {edgeL && <Fold idp={idp} x={x} side="l" kind={edgeL} />}
        {edgeR && <Fold idp={idp} x={x + PW} side="r" kind={edgeR} />}
        <rect x={x} y={PY} width={PW} height={PH} fill={`url(#${idp}-shade)`} opacity="0.22" />
      </Sheet>
    </LayerG>
  );
}

export function Brochure() {
  const idp = 'use-stationery-brochure';
  const titleLines = ['Build Smarter,', 'Build Faster', 'with Tectra'];
  const sub = wrap(POSTER.sub, 34);
  const head = wrapRuns(quoteRuns(FEATURES.heading, FEATURES.hl), 24);
  const gradient = (id, stops) => (
    <linearGradient id={`${idp}-fold-${id}`} x1="0" y1="0" x2="1" y2="0">
      {stops.map(([o, c, a]) => <stop key={o} offset={o} stopColor={c} stopOpacity={a} />)}
    </linearGradient>
  );
  return (
    <Art viewBox="0 0 1580 940" title="Tri-fold brochure: three panels unfolded along the x axis" exportName="use-stationery-brochure">
      <BackdropG w={1580} h={940} />
      <MaterialDefs idp={idp} />
      <defs>
        {gradient('vl', [[0, '#000', 0.2], [0.35, '#000', 0.06], [1, '#000', 0]])}
        {gradient('vr', [[0, '#000', 0], [0.55, '#000', 0.07], [1, '#000', 0.22]])}
        {gradient('ml', [[0, '#fff', 0.7], [0.18, '#fff', 0.25], [0.6, '#000', 0.05], [1, '#000', 0]])}
        {gradient('mr', [[0, '#000', 0], [0.4, '#000', 0.05], [0.82, '#fff', 0.3], [1, '#fff', 0.7]])}
        <linearGradient id={`${idp}-field`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5BA8F8" />
          <stop offset="1" stopColor="#4C9BF3" />
        </linearGradient>
      </defs>
      <ShadowG idp={`${idp}-s`} cx={790} cy={896} rx={720} tone="blue" />
      <AxisG points={[[280, 46], [790, 46], [1300, 46]]} />
      <Panel idp={idp} i={0} fill={`url(#${idp}-field)`} edgeR="v">
        {(x) => (
          <g>
            <TreesG x={x} y={PY + 520} w={PW} h={260} count={7} tone="blue" seed={11} minSize={50} maxSize={100} />
            <MarkG x={x + 40} y={PY + 44} size={66} fill="#fff" />
            <g fontSize="46" fontWeight="300" fill="#fff">
              {titleLines.map((l, k) => <text key={l} x={x + 40} y={PY + 200 + k * 56}>{l}</text>)}
            </g>
            <g fontSize="22" fontWeight="400" fill={C.navy}>
              {sub.map((l, k) => <text key={k} x={x + 40} y={PY + 400 + k * 31}>{l}</text>)}
            </g>
          </g>
        )}
      </Panel>
      <Panel idp={idp} i={1} edgeL="v" edgeR="m">
        {(x) => (
          <g>
            <RunLines lines={head} x={x + 40} y={PY + 90} lh={46} size={36} fill={C.ink} />
            {FEATURES.rows.map(([t, d], k) => {
              const y = PY + 300 + k * 150;
              return (
                <g key={t}>
                  <path d={`M${x + 40} ${y - 36}H${x + PW - 40}`} stroke={C.hair} strokeWidth="1.5" />
                  <text x={x + 40} y={y + 20} fontSize="52" fontWeight="300" fill={C.blue}>{k + 1}</text>
                  <text x={x + 108} y={y + 4} fontSize="24" fontWeight="500" fill={C.ink}>{t}</text>
                  {wrap(d, 28).map((l, j) => <text key={j} x={x + 108} y={y + 36 + j * 26} fontSize="20" fontWeight="400" fill={C.muted}>{l}</text>)}
                </g>
              );
            })}
          </g>
        )}
      </Panel>
      <Panel idp={idp} i={2} fill={C.tile} edgeL="m">
        {(x) => (
          <g>
            <IsoSiteG tone="paper" x={x - 40} y={PY + 40} scale={0.84} />
            <g transform={`translate(${x + 40} ${PY + 470})`}>
              <clipPath id={`${idp}-effcard`}>
                <rect width={PW - 80} height="250" rx="6" />
              </clipPath>
              <rect width={PW - 80} height="250" rx="6" fill={C.yellow} />
              <g clipPath={`url(#${idp}-effcard)`}>
                <GaugeG w={PW - 80} h={250} r={96} value={0.4} tone="blue" track="#FFD58A" />
              </g>
              <text x="28" y="116" fontSize="104" fontWeight="300" fill={C.ink}>{EFFICIENCY.value}</text>
              {wrap(EFFICIENCY.label, 24).map((l, k) => <text key={k} x="28" y={156 + k * 26} fontSize="20" fontWeight="400" fill={C.ink}>{l}</text>)}
            </g>
          </g>
        )}
      </Panel>
    </Art>
  );
}
