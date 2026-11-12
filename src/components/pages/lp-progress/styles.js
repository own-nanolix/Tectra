// Class lookup for this page. Classes in lp-progress.module.css are written with the "lpp-" prefix; this returns the
// CSS Module class for a short name (s.hero -> the hashed class of .lpp-hero).
import m from "./lp-progress.module.css";

const s = new Proxy({}, { get: (_, k) => (typeof k === "string" ? m[`lpp-${k}`] || `lpp-${k}` : undefined) });
export default s;
