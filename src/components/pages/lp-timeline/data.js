import { ROADMAP, POSTER, HERO, MOBILE_SCREENS, FEATURES, QUOTES } from '@/lib/brand';

// Stage boundaries of the roadmap, in the roadmap artwork's own 1600 x 740 space (measured from the case study).
export const B = [20, 261, 496, 738, 990, 1295, 1580];
export const TOP = [463, 334, 203, 403]; // height of each finished stage's range handle
export const BAR = { y: 613, h: 37 };

export const STAGES = [
  ...ROADMAP.done.map((name, i) => ({ name, id: ['branding', 'desktop', 'mobile', 'landing'][i], kind: ['poster', 'desktop', 'mobile', 'landing'][i], done: true })),
  ...ROADMAP.next.map((name, i) => ({ name, id: ['responsive', 'localiztion'][i], kind: ['responsive', 'localiztion'][i], done: false })),
];

// Card copy: every line is printed in the case study (or is a quiet placeholder, null).
export const STAGE_COPY = {
  branding: { title: POSTER.title, text: POSTER.sub },
  desktop: { title: HERO.title.join(' '), text: HERO.sub },
  mobile: { title: MOBILE_SCREENS[0].title, text: MOBILE_SCREENS[0].text },
  landing: { title: FEATURES.heading, text: FEATURES.sub },
  responsive: { title: null, text: QUOTES.next.text.replace('"', '') },
  localiztion: { title: null, text: null },
};
