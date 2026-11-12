// Page-only styles for /typography (CSS Modules do not export class names in this project's Turbopack setup),
// scoped to #p-typography.
const names = ['book', 'stick', 'glyph', 'flow', 'block', 'scroll', 'sheet', 'ledger', 'sample', 'wide', 'metrics', 'metricsSvg', 'notes', 'tester', 'preview', 'wtRow'];
export const s = Object.fromEntries(names.map((n) => [n, `typography-${n}`]));

const P = '#p-typography .typography-';
export const css = `
${P}book { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: calc(var(--gap) * 2); align-items: start; }
${P}stick { position: sticky; top: 24px; align-self: start; }
${P}glyph { width: 100%; height: auto; }
${P}flow { display: grid; grid-template-columns: minmax(0, 1fr); gap: calc(var(--gap) * 3); min-width: 0; }
${P}block { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--gap); min-width: 0; }
${P}block h2 { max-width: 18em; }
${P}scroll { overflow-x: auto; max-width: 100%; }
${P}scroll:focus-visible { outline: 2px solid var(--blue-ink); }
${P}sheet { overflow-x: auto; min-width: 0; }
${P}sheet svg { min-width: 560px; width: 100%; height: auto; }
${P}ledger { width: 100%; min-width: 780px; border-collapse: collapse; font-size: 14px; font-weight: 400; text-align: left; }
${P}ledger th { font-size: 11px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; color: var(--muted); padding: 10px 14px 10px 0; white-space: nowrap; }
${P}ledger td { padding: 14px 14px 14px 0; border-top: 1px solid var(--line); vertical-align: baseline; color: var(--ink); }
${P}ledger td:last-child { min-width: 320px; }
${P}sample { margin: 0; }
${P}wide { margin-top: calc(var(--gap) * 3); display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--gap); }
${P}metrics { display: grid; grid-template-columns: minmax(0, 9fr) minmax(0, 3fr); gap: var(--gap); align-items: start; }
${P}metricsSvg { overflow-x: auto; min-width: 0; }
${P}metricsSvg svg { min-width: 560px; width: 100%; height: auto; }
${P}notes { display: grid; gap: 18px; }
${P}notes p { font-size: 13px; font-weight: 400; line-height: 1.45; color: var(--muted); padding-top: 6px; border-top: 1px solid var(--line); margin: 0; }
${P}notes b { display: block; color: var(--ink); font-weight: 500; }
${P}tester { display: grid; grid-template-columns: minmax(0, 1fr); gap: 14px; background: var(--tile); border-radius: var(--r-2); padding: clamp(18px, 2.4vw, 32px); }
${P}preview { min-height: 1.4em; font-size: clamp(32px, 5vw, 64px); line-height: 1.1; letter-spacing: -0.01em; word-break: break-word; transition: font-weight var(--dur-2) var(--ease-out); }
@media (max-width: 900px) {
  ${P}book, ${P}metrics { grid-template-columns: minmax(0, 1fr); }
  ${P}stick { position: static; }
}
`;
