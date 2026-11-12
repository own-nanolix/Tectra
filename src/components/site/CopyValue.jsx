'use client';

import { copy } from '@/lib/site';
import { toast } from './Toast';

// <CopyValue value="#4093EC" /> shows the value; a click copies it and confirms with a toast.
// label names the value for screen readers, for example label="Tectra Blue hex".
export default function CopyValue({ value, children, label, className = '' }) {
  const onClick = async () => {
    const ok = await copy(value);
    toast(ok ? `Copied ${value}` : `Could not copy ${value}`);
  };
  return (
    <button type="button" className={`copy ${className}`} onClick={onClick} aria-label={`Copy ${label || value}`}>
      {children || value}
    </button>
  );
}
