// Easing and duration tokens. The same values are CSS variables in app/globals.css (--ease-*, --dur-*).
// Use these with framer-motion; never use default easings.
export const ease = {
  out: [0.22, 1, 0.36, 1],        // entrances and fills
  inOut: [0.65, 0, 0.35, 1],      // moves between states
  draw: [0.4, 0, 0.2, 1],         // line drawing and arcs
  snap: [0.3, 1.3, 0.5, 1],       // pins and dots landing
};

export const dur = { d1: 0.14, d2: 0.28, d3: 0.52, d4: 0.9, d5: 1.6 };
export const stagger = 0.06;

// Shared transitions
export const tEnter = { duration: dur.d3, ease: ease.out };
export const tMove = { duration: dur.d2, ease: ease.inOut };
export const tChart = { duration: dur.d4, ease: ease.out };
export const tDraw = { duration: dur.d5, ease: ease.draw };
export const tSnap = { duration: dur.d3, ease: ease.snap };

// Variants for a list that enters one by one: <motion.ul variants={listV} initial="hidden" animate="show">
export const listV = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.08 } } };
export const itemV = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: tEnter } };
export const fadeV = { hidden: { opacity: 0 }, show: { opacity: 1, transition: tEnter } };
