'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { pages, idFromPath, pageById, pageIndex, previous, next, href } from '@/lib/pages';
import Icon from './Icon';
import IndexOverlay from './IndexOverlay';

// Presenter dock: previous, next, page number and title, Index. Shift+Left / Shift+Right also step.
export default function Dock() {
  const pathname = usePathname();
  const router = useRouter();
  const id = idFromPath(pathname);
  const page = pageById(id);
  const prev = previous(id);
  const nxt = next(id);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!window.location.search.includes('index=1')) return undefined;
    const t = setTimeout(() => setOpen(true), 0); // opened from the 404 page link
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (!e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
      const tag = (e.target && e.target.tagName) || '';
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || (e.target && e.target.isContentEditable)) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); router.push(href(prev.id)); }
      if (e.key === 'ArrowRight') { e.preventDefault(); router.push(href(nxt.id)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router, prev.id, nxt.id]);

  return (
    <>
      <nav className="site-dock" id="site-dock" aria-label="Presenter">
        <Link href={href(prev.id)} aria-label={`Previous page: ${prev.title}`} title="Previous (Shift + Left)">
          <Icon name="chevron-left" size={20} />
        </Link>
        <p className="site-dock-title" aria-live="polite">
          <b>{String(pageIndex(id) + 1).padStart(2, '0')}/{pages.length}</b>
          <span>{page.title}</span>
        </p>
        <Link href={href(nxt.id)} aria-label={`Next page: ${nxt.title}`} title="Next (Shift + Right)">
          <Icon name="chevron-right" size={20} />
        </Link>
        <button type="button" className="site-dock-index" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
          <Icon name="grid" size={18} />
          Index
        </button>
      </nav>
      <AnimatePresence>{open && <IndexOverlay current={id} onClose={close} />}</AnimatePresence>
    </>
  );
}
