'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/site/Icon';
import { MarkG } from '@/components/art/Mark';
import { GaugeG } from '@/components/art/KeyArt';
import { Trend } from '@/components/ui/Chip';
import { tMove } from '@/lib/motion';
import s from './mobile-b.module.css';

// Mobile component set, built as HTML so the screens work. The specimens in Spec.jsx draw the same parts as SVG.

export function StatusBar({ tone = 'ink' }) {
  const c = tone === 'navy' ? 'var(--navy)' : 'var(--ink)';
  return (
    <div className={s.status} style={{ color: c }}>
      <span>9:41</span>
      <svg width="66" height="14" viewBox="0 0 66 14" fill="currentColor" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => <rect key={i} x={i * 5} y={10 - i * 3} width="3" height={4 + i * 3} rx="1" />)}
        <path d="M26 5.5a8 8 0 0 1 11 0M28.5 8.2a4.6 4.6 0 0 1 6 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="31.5" cy="11" r="1.3" />
        <rect x="43" y="2" width="21" height="10" rx="3" />
      </svg>
    </div>
  );
}

export function LogoTile({ size = 48 }) {
  return (
    <span className={s.logo} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 100 100" width={size * 0.62} height={size * 0.62}><MarkG fill="#F5F5F5" size={100} /></svg>
    </span>
  );
}

export function IconBtn({ icon, label, dot, on, onClick }) {
  return (
    <button type="button" className={s.ibtn} aria-label={label} data-on={on ? 'true' : undefined} onClick={onClick}>
      <Icon name={icon} size={22} />
      {dot && <i />}
    </button>
  );
}

// Top bar: logo tile (or back arrow) left, icon buttons right.
export function NavBar({ back, onBack, right = [] }) {
  return (
    <div className={s.nav}>
      {back ? <IconBtn icon="arrow-left" label="Back" onClick={onBack} /> : <LogoTile />}
      <div className={s.navR}>{right.map((r) => <IconBtn key={r.icon} {...r} />)}</div>
    </div>
  );
}

export const TAB_ICONS = [['layers', 'Layers'], ['link', 'Link'], ['headset', 'Support'], ['gear', 'Settings'], ['folder', 'Files']];

// Floating tab bar of five icons. The yellow tile slides to the active one. Arrow keys move it.
export function TabBar({ active = 0, flow, label = 'Tab bar', onChange }) {
  const [cur, setCur] = useState(active);
  const refs = useRef([]);
  const pick = (i, focus) => {
    setCur(i);
    if (onChange) onChange(i);
    if (focus) refs.current[i]?.focus();
  };
  const onKey = (e) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    pick((Math.max(cur, 0) + d + 5) % 5, true);
  };
  return (
    <div className={`${s.tabbar} ${flow ? s.tabbarFlow : ''}`} role="group" aria-label={label} onKeyDown={onKey}>
      <motion.span className={s.tabTile} aria-hidden="true" initial={false} animate={{ x: `${Math.max(cur, 0) * 100}%`, opacity: cur < 0 ? 0 : 1 }} transition={tMove} />
      {TAB_ICONS.map(([icon, name], i) => (
        <button key={icon} ref={(el) => { refs.current[i] = el; }} type="button" className={s.tabBtn} aria-label={name} aria-pressed={cur === i} onClick={() => pick(i)}>
          <Icon name={icon} size={22} />
        </button>
      ))}
    </div>
  );
}

export function MCard({ title, sub, arrow = true, open, children, className = '' }) {
  return (
    <div className={`${s.card} ${className}`}>
      <div className={s.cardHead}>
        <div>
          <div className={s.cardTitle}>{title}</div>
          {sub && <div className={s.small}>{sub}</div>}
        </div>
        {arrow && <Icon name="arrow-up-right" size={16} className={s.arrowRot} style={open ? { transform: 'rotate(45deg)' } : undefined} />}
      </div>
      {children}
    </div>
  );
}

// Card with the trend line, the large figure and the corner arc gauge. `k` is an entry of KPI.
export function StatCard({ k, tone }) {
  const t = tone || k.tone || 'blue';
  return (
    <div className={`${s.card} ${s.stat}`}>
      <div className={s.cardHead}>
        <span className={s.cardTitle}>{k.label}</span>
        <Icon name="arrow-up-right" size={16} />
      </div>
      <svg className={s.statArc} viewBox="0 0 165 155" aria-hidden="true">
        <GaugeG w={165} h={155} r={78} value={parseInt(k.value, 10) / 100} tone={t} />
      </svg>
      <div className={s.statFoot}>
        <Trend dir={k.dir}>{k.trend}</Trend>
        <span className={s.fig}>{k.value}</span>
      </div>
    </div>
  );
}

// List row (icon tile, title, meta, trailing mark). Pass onClick to make it a button.
export function Row({ icon, title, meta, trailing = 'arrow-up-right', on, onClick }) {
  return (
    <button type="button" className={s.row} aria-pressed={on === undefined ? undefined : on} onClick={onClick}>
      <span className={s.rowIcon}><Icon name={icon} size={22} /></span>
      <span className={s.rowText}>{title}{meta && <small>{meta}</small>}</span>
      {on ? <span className={s.sel} /> : null}
      {trailing && <Icon name={trailing} size={16} />}
    </button>
  );
}

// Scale a 390 x 844 artboard to the width of its frame.
export function Scaled({ children }) {
  const ref = useRef(null);
  const [k, setK] = useState(0.8);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / 390));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={s.scaled}>
      <div className={s.scaledIn} style={{ transform: `scale(${k})` }}>{children}</div>
    </div>
  );
}
