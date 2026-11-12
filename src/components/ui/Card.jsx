import Icon from '@/components/site/Icon';

// The flat card. <Card title="Problem" arrow>text</Card>
// variant: 'page' (#F5F5F5 on the page) | 'app' (#E9E9E9 inside the product). as: any tag.
// The title is rendered with the heading tag given in `level` (default h3).
export default function Card({ title, arrow = false, variant = 'page', level = 'h3', as: Tag = 'div', className = '', children, ...rest }) {
  const H = level;
  return (
    <Tag className={`${variant === 'app' ? 'card-app' : 'card'} ${className}`} {...rest}>
      {(title || arrow) && (
        <div className="card-head">
          {title && <H className={variant === 'app' ? 't-title' : 't-h3'}>{title}</H>}
          {arrow && <Icon name="arrow-up-right" size={18} />}
        </div>
      )}
      {children}
    </Tag>
  );
}

// The quote chip from the case study: "//" tile, a gradient tile with initials (portraits are not reproduced),
// then name and role.  <Who name="Vitalii B." role="UX Architect" initials="VB" />
export function Who({ name, role, initials, className = '' }) {
  return (
    <p className={`who ${className}`}>
      <span className="who-tile" aria-hidden="true">
        <span className="who-mark">{'//'}</span>
        <span className="who-face">{initials}</span>
      </span>
      <span>
        <span className="who-name" style={{ display: 'block' }}>{name}</span>
        <span className="who-role" style={{ display: 'block' }}>{role}</span>
      </span>
    </p>
  );
}

// Renders a line with one phrase highlighted in blue, the brand's habit.
// <Hl text="Overcoming Key Obstacles in Project Management" hl="Key Obstacles" />
export function Hl({ text, hl, className = 'hl' }) {
  const i = hl ? text.indexOf(hl) : -1;
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className={className}>{hl}</span>
      {text.slice(i + hl.length)}
    </>
  );
}
