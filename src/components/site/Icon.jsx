// <Icon name="bell" /> draws a sprite icon. Pass label="..." when the icon carries meaning on its own.
// Inside a larger SVG use <IconUse name x y size /> instead.
export default function Icon({ name, size = 24, label, className, style }) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} {...a11y}>
      <use href={`#site-icon-${name}`} />
    </svg>
  );
}

export function IconUse({ name, x = 0, y = 0, size = 24, ...rest }) {
  return <use href={`#site-icon-${name}`} x={x} y={y} width={size} height={size} {...rest} />;
}
