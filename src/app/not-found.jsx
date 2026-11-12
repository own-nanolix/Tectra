import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main id="site-main" className="page wrap-narrow" style={{ display: 'grid', alignContent: 'center', gap: 24 }}>
      <p className="chip" style={{ justifySelf: 'start' }}>404</p>
      <h1 className="t-h1">
        This page is <span className="hl">off the plan</span>
      </h1>
      <p className="t-lead muted">The address does not match any page of the Tectra brand system.</p>
      <p className="row">
        <Link className="btn" href="/overview/">Go to the overview</Link>
        <Link className="btn btn-ghost" href="/overview/?index=1">Open the index</Link>
      </p>
    </main>
  );
}
