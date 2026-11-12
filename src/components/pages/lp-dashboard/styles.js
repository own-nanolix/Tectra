// Class lookup for this page. Classes in lp-dashboard.module.css are written with the "lpd-" prefix; this returns the
// CSS Module class for a short name (s.hero -> the hashed class of .lpd-hero).
import m from "./lp-dashboard.module.css";

const s = new Proxy({}, { get: (_, k) => (typeof k === "string" ? m[`lpd-${k}`] || `lpd-${k}` : undefined) });
export default s;
