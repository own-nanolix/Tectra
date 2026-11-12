import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { EMPOWER } from '@/lib/brand';
import s from './s';

// Three centred lines of large Light type with three avatar tiles and a dark "+" tile set inline.
const TONES = ['yellow', 'sky', 'yellow'];

export default function Empower() {
  return (
    <section className={`wrap ${s.empower}`} aria-label="What Tectra does">
      <Reveal as="p" className={s.empowerText}>
        <span className={s.eLine}>{EMPOWER[0]}</span>
        <span className={s.eLine}>
          {EMPOWER[1]}{' '}
          <span className={s.inline} aria-hidden="true">
            {TONES.map((t, i) => (
              <span key={i} className={`${s.mini} ${s[`mini-${t}`]}`} data-dot={i === 0 ? 'yellow' : 'red'} style={{ '--i': i }}>
                <Icon name="hardhat" size={22} />
              </span>
            ))}
            <span className={`${s.mini} ${s.miniPlus}`} data-dot="yellow">
              <Icon name="plus" size={20} />
            </span>
          </span>{' '}
          {EMPOWER[2]}
        </span>
        <span className={s.eLine}>{EMPOWER[3]}</span>
      </Reveal>
    </section>
  );
}
