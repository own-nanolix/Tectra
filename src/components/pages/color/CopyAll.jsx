'use client';

import { copy } from '@/lib/site';
import { toast } from '@/components/site/Toast';

// Copies every scale step as CSS custom properties, then confirms with a short toast.
export default function CopyAll({ css, count }) {
  const onClick = async () => {
    const ok = await copy(css);
    toast(ok ? `Copied ${count} colour tokens as CSS` : 'Could not copy the colour tokens');
  };
  return (
    <button type="button" className="btn btn-sky btn-sm" onClick={onClick}>Copy CSS</button>
  );
}
