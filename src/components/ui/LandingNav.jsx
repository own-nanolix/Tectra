import Link from 'next/link';
import Icon from '@/components/site/Icon';
import { NAV_LINKS, HERO } from '@/lib/brand';

// The landing navigation from the case study: logo tile, one pale pill with four links, icon button and "Log in".
// <LandingNav current="lp-progress" />   tone="blue" (on the blue field, default) | "light" (on paper)
export default function LandingNav({ current, tone = 'blue', className = '' }) {
  return (
    <nav className={`lp-nav ${tone === 'light' ? 'lp-nav-light' : ''} ${className}`} aria-label="Tectra">
      <Link href="/lp-home/" className="lp-logo" aria-label="Tectra home" aria-current={current === 'lp-home' ? 'page' : undefined}>
        <svg viewBox="0 0 100 100" width="26" height="26" aria-hidden="true">
          <use href="#site-mark" />
        </svg>
      </Link>
      <div className="lp-pill">
        {NAV_LINKS.map((l) => (
          <Link key={l.id} href={`/${l.id}/`} aria-current={current === l.id ? 'page' : undefined}>
            {l.label}
          </Link>
        ))}
      </div>
      <div className="lp-actions">
        <Link href="/lp-pricing/" className={`btn btn-icon ${tone === 'light' ? 'btn-ghost' : 'btn-sky'}`} aria-label="Plans" aria-current={current === 'lp-pricing' ? 'page' : undefined}>
          <Icon name="briefcase" size={22} />
        </Link>
        <Link href="/dashboard/" className="btn">
          {HERO.login}
        </Link>
      </div>
    </nav>
  );
}
