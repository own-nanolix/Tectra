'use client';

import Art from '@/components/art/Art';
import { CORE, CORE_NAMES } from '@/components/site/icons';
import { copy } from '@/lib/site';
import { toast } from '@/components/site/Toast';
import s from './icons.module.css';

// Row labels in the left margin: plain groupings of the 32 icons, eight per row.
export const ROW_LABELS = ['Navigation', 'Actions', 'Site and people', 'Records and controls'];

const rows = ROW_LABELS.map((label, r) => ({ label, names: CORE_NAMES.slice(r * 8, r * 8 + 8) }));

export default function IconSheet() {
  const onCopy = async (name) => {
    const ok = await copy(name);
    toast(ok ? `Copied ${name}` : `Could not copy ${name}`);
  };
  return (
    <div className={s.sheetWrap}>
      <div className={s.sheet} id="icons-sheet" role="group" aria-label="The 32 icons, 8 by 4">
        {rows.map((row, r) => (
          <div className={s.row} key={row.label}>
            <div className={s.rowLabel}>{row.label}</div>
            <div className={s.cells}>
              {row.names.map((name, c) => (
                <div className={s.cell} key={name} style={{ '--i': r * 8 + c }}>
                  <Art viewBox="0 0 24 24" title={`${name} icon`} exportName={`icons-${name}`}>
                    <path d={CORE[name]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </Art>
                  <span className={s.cellName}>{name}</span>
                  <button type="button" className={s.cellBtn} onClick={() => onCopy(name)} aria-label={`Copy icon name ${name}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
