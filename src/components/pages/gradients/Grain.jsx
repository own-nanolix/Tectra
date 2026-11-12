// Grain and texture: the hero field with and without grain, four strengths, and the board-line / tick pattern.
import Art from '@/components/art/Art';
import { PatternDefs } from '@/components/art/KeyArt';
import { Linear, GrainDefs, Plate, gradById } from './kit';
import s from './gradients.module.css';

export const LEVELS = [0.3, 0.6, 0.9, 1.2];

function Field({ idp, w, h, grain, exportName, title }) {
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={exportName}>
      <defs>
        <Linear id={`${idp}-g`} w={w} h={h} deg={160} stops={gradById('field').stops} />
        {grain != null && <GrainDefs id={`${idp}-grain`} amount={grain} />}
      </defs>
      <rect width={w} height={h} fill={`url(#${idp}-g)`} />
      {grain != null && <rect width={w} height={h} fill="#000000" filter={`url(#${idp}-grain)`} />}
    </Art>
  );
}

function BoardTicks() {
  const idp = 'gradients-tex';
  return (
    <Art viewBox="0 0 1200 300" title="Board lines and ticks over the Field gradient" exportName="gradients-texture-lines">
      <PatternDefs idp={idp} color="#0A3D91" opacity={0.5} />
      <defs><Linear id={`${idp}-g`} w={1200} h={300} deg={160} stops={gradById('field').stops} /></defs>
      <rect width="1200" height="300" fill={`url(#${idp}-g)`} />
      <rect width="1200" height="150" fill={`url(#${idp}-pat-boards)`} />
      <rect y="150" width="1200" height="150" fill={`url(#${idp}-pat-ticks)`} />
      <path d="M0 150H1200" stroke="#0A3D91" strokeOpacity="0.5" />
    </Art>
  );
}

export default function Grain() {
  return (
    <div className={s.wall}>
      <Plate span={6} name="Without grain" spec="Field, flat">
        <Field idp="gradients-gn-off" w={640} h={420} exportName="gradients-grain-without" title="Field gradient without grain" />
      </Plate>
      <Plate span={6} name="With grain" spec="feTurbulence 0.9, 2 octaves, amount 0.6">
        <Field idp="gradients-gn-on" w={640} h={420} grain={0.6} exportName="gradients-grain-with" title="Field gradient with paper grain" />
      </Plate>
      {LEVELS.map((a, i) => (
        <Plate key={a} span={3} name={`Grain ${i + 1} of 4`} spec={`amount ${a}`}>
          <Field idp={`gradients-gn-l${i + 1}`} w={400} h={300} grain={a} exportName={`gradients-grain-level-${i + 1}`} title={`Field gradient with grain, level ${i + 1} of 4`} />
        </Plate>
      ))}
      <Plate span={12} name="Board lines and ticks" spec="pattern fills at 0.5 opacity, #0A3D91">
        <BoardTicks />
      </Plate>
    </div>
  );
}
