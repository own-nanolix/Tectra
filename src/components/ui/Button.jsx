import Link from 'next/link';
import Icon from '@/components/site/Icon';

// <Button>Let's try</Button>                    yellow primary (the brand's main action)
// <Button variant="sky">Learn more</Button>     variants: yellow | sky | blue | dark | white | ghost
// <Button href="/lp-pricing/">Plans</Button>    renders a next/link
// <Button icon="briefcase" label="Projects" />  square icon button (label is required for icon-only buttons)
// size="sm", block, iconRight="arrow-right"
export default function Button({ children, variant = 'yellow', size, block, href, icon, iconRight, label, className = '', type = 'button', ...rest }) {
  const iconOnly = !children && (icon || iconRight);
  const cls = ['btn', variant !== 'yellow' && `btn-${variant}`, size === 'sm' && 'btn-sm', block && 'btn-block', iconOnly && 'btn-icon', className].filter(Boolean).join(' ');
  const inner = (
    <>
      {icon && <Icon name={icon} size={size === 'sm' ? 18 : 22} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 16 : 18} />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={label} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} aria-label={label} {...rest}>
      {inner}
    </button>
  );
}
