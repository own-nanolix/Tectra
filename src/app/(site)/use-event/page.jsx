import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('use-event');

export default function Page() {
  return (
    <section className="page" id="p-use-event" aria-label="Event" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap">Event</h1>
    </section>
  );
}
