'use client';

import s from '@/components/pages/overview/styles';

// Contents list as margin notes. Real buttons that scroll with JS (no #anchors).
export default function ContentsNav({ items }) {
  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    el.focus({ preventScroll: true });
  };
  return (
    <nav aria-label="Contents">
      <p className="t-caps muted" style={{ marginBottom: 8 }}>Contents</p>
      <ol className={s.contents}>
        {items.map(([id, label], i) => (
          <li key={id}>
            <button type="button" className={s.contentsBtn} onClick={() => go(id)}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
