import Art from '@/components/art/Art';
import { segments } from '@/lib/charts';
import { VOLUME } from '@/lib/brand';

// The 8-segment progress bar of the site view. tone 'white' sits on the blue field, 'blue' on a tile.
export function SegBar({ filled, exportName, tone = 'blue', title }) {
  const on = tone === 'white' ? '#FFFFFF' : '#4093EC';
  const off = tone === 'white' ? 'rgba(255,255,255,0.35)' : '#DFDFDF';
  return (
    <Art viewBox="0 0 800 12" title={title || `Progress: ${filled} of ${VOLUME.segments} segments filled`} exportName={exportName} decorative={!exportName} preserveAspectRatio="none">
      {segments(VOLUME.segments, 800, filled, 8).map((g, i) => (
        <rect key={i} x={g.x} y="1" width={g.w} height="10" rx="1" fill={g.on ? on : off} />
      ))}
    </Art>
  );
}
