// Class lookup for this page. Classes in strategy.module.css are written with the "st-" prefix; this returns the
// CSS Module class for a short name (s.hero -> the hashed class of .st-hero).
import m from "./strategy.module.css";

const s = new Proxy({}, { get: (_, k) => (typeof k === "string" ? m[`st-${k}`] || `st-${k}` : undefined) });
export default s;
