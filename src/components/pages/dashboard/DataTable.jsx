'use client';

// A sortable, filterable table: click a header to sort (aria-sort), filter chips and a search field narrow the rows.
// `ph` quiet placeholder rows (grey bars) follow the real rows while no filter or search is active.
import { useState } from 'react';
import Icon from '@/components/site/Icon';
import Chip from '@/components/ui/Chip';
import s from './dashboard.module.css';

const cmp = (a, b) => (typeof a === 'string' ? a.localeCompare(b) : a - b);

export default function DataTable({ label, rows, cols, chips, ph = 0, onPick, picked }) {
  const [sort, setSort] = useState(null);
  const [chip, setChip] = useState(0);
  const [q, setQ] = useState('');
  const col = sort && cols.find((c) => c.key === sort.key);
  const needle = q.trim().toLowerCase();
  let list = rows.filter((r) => chips[chip].test(r) && r.name.toLowerCase().includes(needle));
  if (col) list = [...list].sort((a, b) => cmp(col.val(a), col.val(b)) * sort.dir);
  const click = (key) => setSort(sort && sort.key === key ? (sort.dir === 1 ? { key, dir: -1 } : null) : { key, dir: 1 });
  const plain = !needle && chip === 0;
  return (
    <div className={s.dt}>
      <div className={s.bar}>
        <label className={s.search}>
          <Icon name="search" size={18} />
          <span className="sr-only">Search {label}</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" />
        </label>
        <div className={s.chips} role="group" aria-label={`Filter ${label}`}>
          {chips.map((c, i) => (<Chip key={c.label} size="sm" pressed={chip === i} onClick={() => setChip(i)}>{c.label}</Chip>))}
        </div>
      </div>
      <table className={s.tbl}>
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c.key} scope="col" className={c.num ? s.num : undefined}
                aria-sort={sort && sort.key === c.key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>
                <button type="button" className={s.sortBtn} onClick={() => click(c.key)}>
                  {c.label}
                  <Icon name={sort && sort.key === c.key ? (sort.dir === 1 ? 'arrow-up' : 'arrow-down') : 'sort'} size={14} />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id} data-picked={picked === r.id ? '' : undefined}>
              {cols.map((c, i) => (
                <td key={c.key} className={c.num ? s.num : undefined}>
                  {i === 0 && onPick ? (<button type="button" className={s.rowBtn} aria-pressed={picked === r.id} onClick={() => onPick(r)}>{c.cell(r)}</button>) : c.cell(r)}
                </td>
              ))}
            </tr>
          ))}
          {plain && Array.from({ length: ph }, (_, i) => (
            <tr key={`ph${i}`} aria-hidden="true" className={s.ph}>
              {cols.map((c, j) => (<td key={c.key}><i style={{ width: `${34 + ((i * 17 + j * 29) % 46)}%` }} /></td>))}
            </tr>
          ))}
          {!list.length && (<tr><td colSpan={cols.length} className={s.none}>No rows</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
