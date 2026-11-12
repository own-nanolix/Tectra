'use client';

import { MotionConfig } from 'framer-motion';
import { tEnter } from '@/lib/motion';

// Root client wrapper: honours the visitor's reduced-motion setting and sets the shared default transition.
export default function Providers({ children }) {
  return (
    <MotionConfig reducedMotion="user" transition={tEnter}>
      {children}
    </MotionConfig>
  );
}
