// Class lookup for lp-home. CSS classes in lp-home.module.css are written as `lp-home-<name>`; this returns the
// module's class when CSS Modules are active and falls back to the literal name otherwise, so styling works either way.
import m from './lp-home.module.css';

const s = new Proxy({}, {
  get: (_, k) => (typeof k === 'string' ? (m && m[`lp-home-${k}`]) || `lp-home-${k}` : undefined),
});

export default s;
