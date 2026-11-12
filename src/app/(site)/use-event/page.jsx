import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { Lanyard } from '@/components/pages/use-event/Lanyard';
import Ids from '@/components/pages/use-event/Ids';
import { FabricScene, SiliconeScene, FABRIC, SILICONE } from '@/components/pages/use-event/Wristbands';
import { TicketScene, TICKETS, VipPass } from '@/components/pages/use-event/Tickets';
import Booth from '@/components/pages/use-event/Booth';
import { FlagScene, FLAGS, Banner } from '@/components/pages/use-event/Flags';
import s from '@/components/pages/use-event/use-event.module.css';

export const metadata = pageMeta('use-event');

function Plate({ name, children, delay = 0, className = '' }) {
  return (
    <Reveal as="figure" delay={delay} className={`${s.plate} ${className}`}>
      <div className="mock">{children}</div>
      <figcaption className="mock-cap"><span>{name}</span></figcaption>
    </Reveal>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-use-event" aria-label="Event">
      <div className="wrap">
        <header className={s.head}>
          <h1 tabIndex={-1} className="t-h1">Event</h1>
        </header>
        <div className={s.venue}>
          <div className={s.col}>
            <h2 className="t-h3">Lanyard, flags and banner</h2>
            <div className={s.pair}>
              <Plate name="Lanyard with speaker badge, blue"><Lanyard tone="blue" index={0} /></Plate>
              <Plate name="Lanyard with speaker badge, yellow" delay={90}><Lanyard tone="yellow" index={1} /></Plate>
            </div>
            <div className={s.trio}>
              {FLAGS.map((f, i) => (
                <Plate key={f.id} name={f.title} delay={i * 80}><FlagScene f={f} /></Plate>
              ))}
            </div>
            <Plate name="Hanging banner" className={s.banner}><Banner /></Plate>
          </div>
          <div className={s.col}>
            <h2 className="t-h3">Cards, wristbands, tickets and booth</h2>
            <Plate name="Staff ID cards in a holder"><Ids /></Plate>
            <div className={s.ladder}>
              {FABRIC.map((f) => (
                <Plate key={f.id} name={f.title}><FabricScene f={f} /></Plate>
              ))}
              {SILICONE.map((f) => (
                <Plate key={f.id} name={f.title}><SiliconeScene f={f} /></Plate>
              ))}
            </div>
            <div className={s.ladder}>
              {TICKETS.map((t, i) => (
                <Plate key={t.id} name={t.title}><TicketScene t={t} index={i} /></Plate>
              ))}
              <Plate name="VIP pass"><VipPass /></Plate>
            </div>
            <Plate name="Exhibition booth"><Booth /></Plate>
          </div>
        </div>
      </div>
    </section>
  );
}
