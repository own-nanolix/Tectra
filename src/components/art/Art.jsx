// The wrapper for every exportable graphic. It guarantees rule 10: a viewBox, <title> as the first child,
// a role (or aria-hidden) and data-export="<page id>-<name>".
//
//   <Art viewBox="0 0 400 300" title="Primary lockup" exportName="logo-primary">...</Art>
//
// decorative: hide from screen readers (still exportable). Geometry belongs in attributes of the children.
export default function Art({ viewBox, title, exportName, decorative = false, className, style, children, ...rest }) {
  const a11y = decorative ? { 'aria-hidden': 'true' } : { role: 'img', 'aria-label': title };
  return (
    <svg viewBox={viewBox} data-export={exportName} className={className} style={style} xmlns="http://www.w3.org/2000/svg" {...a11y} {...rest}>
      <title>{title}</title>
      {children}
    </svg>
  );
}
