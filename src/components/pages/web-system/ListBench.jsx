import Icon from '@/components/site/Icon';
import LandingFooter from '@/components/ui/LandingFooter';
import { ABOUT, PLANS } from '@/lib/brand';
import Shelf, { Line } from './Shelf';
import Faq from './Faq';
import s from './web-system.module.css';

export default function ListBench() {
  return (
    <>
      <Shelf id="list" title="List row" note="Rows are separated by a 1 px hairline, never by boxes. FAQ rows open on click and their arrow turns a quarter. About rows pair a label with its value across a thin arrow.">
        <Line label="FAQ rows (accordion)">
          <Faq />
        </Line>
        <div className={s.listGrid}>
          <Line label="Plan bullet rows">
            <div>
              {PLANS.list[2].bullets.map((b) => (
                <div key={b} className={s.bulletRow}>
                  <Icon name="check" size={18} />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Line>
          <Line label="About rows">
            <div>
              {ABOUT.map(([k, v]) => (
                <div key={k} className={s.aboutRow}>
                  <span>{k}</span>
                  <Icon name="arrow-right" size={22} />
                  <span style={{ color: 'var(--ink)', fontSize: 18, fontWeight: 300 }}>{v}</span>
                </div>
              ))}
            </div>
          </Line>
        </div>
      </Shelf>
      <Shelf id="footer" title="Footer" note="Mark top left, social icons, four link columns with upper-case heads, a hairline and the legal row.">
        <LandingFooter className={s.footerReset} />
      </Shelf>
    </>
  );
}
