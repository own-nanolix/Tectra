'use client';

import { useEffect } from 'react';
import * as Motion from 'framer-motion';

// With ?export=1 in the address every animation is switched off so SVGs can be saved in their finished state.
export default function ExportMode() {
  useEffect(() => {
    if (!window.location.search.includes('export=1')) return;
    document.documentElement.classList.add('exporting');
    if (Motion.MotionGlobalConfig) Motion.MotionGlobalConfig.skipAnimations = true;
  }, []);
  return null;
}
