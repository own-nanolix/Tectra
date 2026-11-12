import { pageMeta } from '@/lib/pages';
import { Timeline, Node } from '@/components/pages/motion/Timeline';
import Easing from '@/components/pages/motion/Easing';
import { Durations, Stagger } from '@/components/pages/motion/Durations';
import { LogoFuse, Storyboard } from '@/components/pages/motion/LogoMotion';
import Transitions from '@/components/pages/motion/Transitions';
import Micro from '@/components/pages/motion/Micro';
import { Loaders, PinLanding } from '@/components/pages/motion/Loaders';
import DoDont from '@/components/pages/motion/DoDont';
import s from '@/components/pages/motion/motion.module.css';

export const metadata = pageMeta('motion');

export default function Page() {
  return (
    <section className="page" id="p-motion" aria-label="Motion">
      <div className="wrap">
        <header className="stack" style={{ marginBottom: 'clamp(56px, 8vw, 112px)', maxWidth: 980 }}>
          <p className="t-caps muted slide-up" style={{ '--i': 0 }}>Motion</p>
          <h1 tabIndex={-1} className="t-h1 slide-up" style={{ '--i': 1 }}>
            Things are <span className="hl">drawn, measured and filled</span>
          </h1>
          <p className="t-lead slide-up" style={{ '--i': 2 }}>
            Calm, measured, instrument-like. Nothing bounces except a pin or dot landing.
          </p>
        </header>

        <Timeline>
          <Node id="motion-h-easing" n="01" title="Easing curves" note="Four curves. ease.out, ease.inOut, ease.draw and ease.snap, drawn on a unit grid with their handles, then run on a ruler.">
            <Easing />
          </Node>

          <Node id="motion-h-durations" n="02" title="Durations and stagger" note="Five durations from 140 to 1600 ms, and one stagger of 60 ms.">
            <Durations />
            <Stagger />
          </Node>

          <Node id="motion-h-logo" n="03" title="Logo animation" note="The two large circles slide together and fuse, then the small circle lands.">
            <div className={s.g2}>
              <LogoFuse />
              <div className={s.plate}>
                <h3 className="t-title">Key frames</h3>
                <Storyboard />
                <p className={s.kicker}>Frame times are approximate. The finished mark is the drawing without animation.</p>
              </div>
            </div>
          </Node>

          <Node id="motion-h-transitions" n="04" title="Page and component transitions" note="Page enter, card reveal, tab change, sheet and counter.">
            <Transitions />
          </Node>

          <Node id="motion-h-micro" n="05" title="Micro-interactions" note="Buttons, toggles, inputs, toasts, a range handle, three loaders and a pin landing.">
            <Micro />
            <Loaders />
            <PinLanding />
          </Node>

          <Node id="motion-h-dodont" n="06" title="Do and don't" note="Four pairs, played side by side.">
            <DoDont />
          </Node>
        </Timeline>
      </div>
    </section>
  );
}
