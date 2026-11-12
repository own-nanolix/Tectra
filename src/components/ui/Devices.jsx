// Live device frames: an HTML screen (so the UI inside works, scrolls and is accessible) inside a frame that is
// drawn as SVG. Give `screen` a name: the screen root gets data-screen="<name>" (the artboard for later export).
// Pass exportName="<page id>-<name>" to make the frame itself an exportable SVG.
//   <Phone screen="mobile-a-home" className="...">...screen content...</Phone>
// For devices inside mockup scenes use the SVG groups in components/art/Devices instead.

function Frame({ kind, viewBox, title, exportName, screen, screenStyle, className = '', style, children, art }) {
  return (
    <div className={`device device-${kind} ${className}`} style={style}>
      <div className="device-screen" data-screen={screen} style={screenStyle}>
        {children}
      </div>
      <svg className="device-frame" viewBox={viewBox} data-export={exportName} aria-hidden="true">
        <title>{title}</title>
        {art}
      </svg>
    </div>
  );
}

export function Phone({ children, exportName, screen, className, style, screenStyle }) {
  return (
    <Frame kind="phone" viewBox="-4 0 438 884" title="Phone frame" exportName={exportName} screen={screen} className={className} style={style} screenStyle={screenStyle}
      art={
        <>
          <rect x="-3" y="150" width="6" height="34" rx="2" fill="#B9B29F" />
          <rect x="-3" y="210" width="6" height="62" rx="2" fill="#B9B29F" />
          <rect x="427" y="230" width="6" height="96" rx="2" fill="#B9B29F" />
          <path fillRule="evenodd" fill="#CFC8B4" d="M66 0h298a66 66 0 0 1 66 66v752a66 66 0 0 1-66 66H66a66 66 0 0 1-66-66V66A66 66 0 0 1 66 0ZM68 20a48 48 0 0 0-48 48v748a48 48 0 0 0 48 48h294a48 48 0 0 0 48-48V68a48 48 0 0 0-48-48Z" />
          <path fillRule="evenodd" fill="#111111" d="M66 4h298a62 62 0 0 1 62 62v752a62 62 0 0 1-62 62H66a62 62 0 0 1-62-62V66A62 62 0 0 1 66 4ZM68 20a48 48 0 0 0-48 48v748a48 48 0 0 0 48 48h294a48 48 0 0 0 48-48V68a48 48 0 0 0-48-48Z" />
          <rect x="153" y="34" width="124" height="34" rx="17" fill="#000000" />
          <circle cx="254" cy="51" r="6" fill="#16161E" />
        </>
      }
    >
      {children}
    </Frame>
  );
}

export function Tablet({ children, exportName, screen, className, style, screenStyle }) {
  return (
    <Frame kind="tablet" viewBox="0 0 1260 900" title="Tablet frame" exportName={exportName} screen={screen} className={className} style={style} screenStyle={screenStyle}
      art={
        <>
          <path fillRule="evenodd" fill="#101012" d="M46 0h1168a46 46 0 0 1 46 46v808a46 46 0 0 1-46 46H46a46 46 0 0 1-46-46V46A46 46 0 0 1 46 0ZM54 40a14 14 0 0 0-14 14v792a14 14 0 0 0 14 14h1152a14 14 0 0 0 14-14V54a14 14 0 0 0-14-14Z" />
          <circle cx="630" cy="20" r="5" fill="#26262B" />
        </>
      }
    >
      {children}
    </Frame>
  );
}

export function Laptop({ children, exportName, screen, className, style, screenStyle }) {
  return (
    <Frame kind="laptop" viewBox="0 0 1840 1016" title="Laptop frame" exportName={exportName} screen={screen} className={className} style={style} screenStyle={screenStyle}
      art={
        <>
          <path fillRule="evenodd" fill="#1B1B1F" d="M200 0h1440a30 30 0 0 1 30 30v930H170V30a30 30 0 0 1 30-30ZM200 30v900h1440V30Z" />
          <path d="M830 30h180v16a12 12 0 0 1-12 12H842a12 12 0 0 1-12-12z" fill="#1B1B1F" />
          <path d="M0 960h1840v26a30 30 0 0 1-30 30H30a30 30 0 0 1-30-30z" fill="#2A2A2F" />
          <path d="M0 960h1840v8H0z" fill="#4A4A50" />
          <path d="M780 960h280v10a10 10 0 0 1-10 10H790a10 10 0 0 1-10-10z" fill="#17171A" />
        </>
      }
    >
      {children}
    </Frame>
  );
}

export function Monitor({ children, exportName, screen, className, style, screenStyle }) {
  return (
    <Frame kind="monitor" viewBox="0 0 1640 1340" title="Monitor frame" exportName={exportName} screen={screen} className={className} style={style} screenStyle={screenStyle}
      art={
        <>
          <path d="M700 1040h240v230H700z" fill="#3A3A3A" />
          <path d="M700 1040h240v60H700z" fill="#000000" opacity="0.35" />
          <path d="M540 1270h560l40 30H500z" fill="#2B2B2B" />
          <path fillRule="evenodd" fill="#0C0C0C" d="M18 0h1604a18 18 0 0 1 18 18v1004a18 18 0 0 1-18 18H18a18 18 0 0 1-18-18V18A18 18 0 0 1 18 0ZM20 20v1000h1600V20Z" />
        </>
      }
    >
      {children}
    </Frame>
  );
}

export function Watch({ children, exportName, screen, className, style, screenStyle, band = '#4093EC' }) {
  return (
    <Frame kind="watch" viewBox="0 0 248 490" title="Watch frame" exportName={exportName} screen={screen} className={className} style={style} screenStyle={screenStyle}
      art={
        <>
          <path d="M50 0h140l10 110H40z" fill={band} />
          <path d="M40 380h160l-10 110H50z" fill={band} />
          <rect x="236" y="190" width="12" height="46" rx="5" fill="#8F8F8F" />
          <path fillRule="evenodd" fill="#C9C9C9" d="M70 100h100a70 70 0 0 1 70 70v150a70 70 0 0 1-70 70H70a70 70 0 0 1-70-70V170a70 70 0 0 1 70-70ZM72 133a44 44 0 0 0-44 44v136a44 44 0 0 0 44 44h96a44 44 0 0 0 44-44V177a44 44 0 0 0-44-44Z" />
          <path fillRule="evenodd" fill="#0E0E10" d="M70 108h100a62 62 0 0 1 62 62v150a62 62 0 0 1-62 62H70a62 62 0 0 1-62-62V170a62 62 0 0 1 62-62ZM72 133a44 44 0 0 0-44 44v136a44 44 0 0 0 44 44h96a44 44 0 0 0 44-44V177a44 44 0 0 0-44-44Z" />
        </>
      }
    >
      {children}
    </Frame>
  );
}
