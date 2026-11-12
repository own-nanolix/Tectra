// <Chip>Strategic plan</Chip>                 the section chip from the case study
// <Chip tone="blue" size="sm">Normal</Chip>    tone: blue | yellow | ink; size: sm
// <Chip pressed={on} onClick={...}>Filter</Chip>  becomes a toggle button (use inside a client component)
export default function Chip({ children, tone, size, pressed, onClick, as: Tag = 'span', className = '', ...rest }) {
  const cls = ['chip', tone && `chip-${tone}`, size === 'sm' && 'chip-sm', className].filter(Boolean).join(' ');
  if (onClick || pressed !== undefined) {
    return (
      <button type="button" className={cls} aria-pressed={pressed} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}

// "+2.4%" with the brand's triangle: yellow up, red down.  <Trend dir="up">+2.4%</Trend>
export function Trend({ dir = 'up', children, className = '' }) {
  return (
    <span className={`trend trend-${dir} ${className}`}>
      {children}
      <span className="sr-only">{dir === 'up' ? ' up' : ' down'}</span>
    </span>
  );
}
