// Page-only styles for /color. CSS Modules do not export class names in this project's Turbopack setup
// (the *.css loader rule swallows them), so the page carries its own prefixed classes, scoped to #p-color.
const names = ['head', 'quote', 'quoteText', 'ringsRow', 'ringsPull', 'note', 'section', 'scroll', 'sheet', 'ledger', 'chipSw', 'cell', 'css', 'pass', 'low', 'ext', 'bleed', 'pair'];
export const s = Object.fromEntries(names.map((n) => [n, `color-${n}`]));

const P = '#p-color .color-';
export const css = `
${P}head { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: var(--gap); align-items: end; }
${P}quote { max-width: 34em; }
${P}quoteText { font-size: clamp(24px, 2.2vw, 34px); }
${P}ringsRow { display: grid; grid-template-columns: minmax(0, 9fr) minmax(0, 3fr); gap: var(--gap); align-items: start; }
${P}ringsPull { margin-left: calc(var(--pad) * -0.6); }
${P}ringsPull svg { width: 100%; height: auto; }
${P}note { font-size: 13px; font-weight: 400; line-height: 1.45; color: var(--muted); padding-top: 6px; border-top: 1px solid var(--line); }
${P}note + ${P}note { margin-top: 18px; }
${P}section { display: grid; grid-template-columns: minmax(0, 1fr); gap: calc(var(--gap) * 1.2); }
${P}section h2 { max-width: 20em; }
${P}scroll { overflow-x: auto; max-width: 100%; border-radius: var(--r-1); }
${P}sheet { overflow-x: auto; min-width: 0; }
${P}sheet svg { min-width: 720px; width: 100%; height: auto; }
${P}ledger { width: 100%; min-width: 860px; border-collapse: collapse; font-size: 14px; font-weight: 400; text-align: left; }
${P}ledger th { font-size: 11px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; color: var(--muted); padding: 10px 14px 10px 0; white-space: nowrap; }
${P}ledger td, ${P}ledger tbody th { padding: 10px 14px 10px 0; border-top: 1px solid var(--line); vertical-align: middle; color: var(--ink); text-transform: none; letter-spacing: 0; font-size: 14px; font-weight: 400; }
${P}ledger td small { color: var(--muted); font-size: 12px; margin-left: 6px; }
${P}ledger td:first-child { width: 88px; }
${P}chipSw { display: block; width: 64px; height: 36px; border-radius: var(--r-1); box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08); transition: transform var(--dur-2) var(--ease-out); }
${P}ledger tr:hover ${P}chipSw { transform: scaleX(1.12); transform-origin: left; }
${P}cell { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
${P}cell ${P}chipSw { width: 28px; height: 28px; }
${P}ledger ${P}css { display: block; margin: 2px 0 0; }
${P}pass { color: var(--ink); }
${P}low { color: var(--muted); }
${P}ext { color: var(--blue-ink); }
${P}bleed { width: 100%; overflow-x: auto; }
${P}bleed svg { width: 100%; min-width: 760px; height: auto; }
${P}pair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--gap); }
@media (max-width: 900px) {
  ${P}head, ${P}ringsRow, ${P}pair { grid-template-columns: minmax(0, 1fr); }
  ${P}ringsPull { margin-left: 0; }
}
`;
