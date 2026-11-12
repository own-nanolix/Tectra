import Icon from '@/components/site/Icon';
import { FOOTER } from '@/lib/brand';

// The landing footer from the case study: mark, four link columns, a hairline and the legal row.
// <LandingFooter />        shared version: no address and no copyright line
// <LandingFooter full />   the footer laid out as in the case study, with a neutral placeholder address and
//                          copyright line in place of the source's leftover text (used on lp-home only)
// Column entries are plain text, as in the source: they name no real destinations.
export default function LandingFooter({ full = false, className = '' }) {
  return (
    <footer className={`lp-footer wrap ${className}`}>
      <div className="lp-footer-grid">
        <div className="lp-footer-brand">
          <svg viewBox="0 0 100 100" width="34" height="34" role="img" aria-label="Tectra" style={{ color: 'var(--blue)' }}>
            <use href="#site-mark" />
          </svg>
          {full && (
            <address style={{ marginTop: 28 }}>
              {FOOTER.address.map((l) => (
                <span key={l} style={{ display: 'block' }}>{l}</span>
              ))}
            </address>
          )}
          <p className="lp-social" aria-hidden="true">
            <Icon name="x" size={18} />
            <Icon name="linkedin" size={18} />
            <Icon name="youtube" size={18} />
          </p>
        </div>
        {FOOTER.columns.map(([head, items]) => (
          <div key={head}>
            <p className="lp-foot-head">{head}</p>
            <ul>
              {items.map((it, i) => (
                <li key={it + i}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="lp-footer-base">
        <span>{full ? FOOTER.copyright : 'Tectra'}</span>
        <span className="row" style={{ gap: 18 }}>
          {FOOTER.legal.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </span>
      </div>
    </footer>
  );
}
