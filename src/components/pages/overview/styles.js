// Class lookup for this page. Classes in overview.module.css are written with the "ov-" prefix; this returns the
// CSS Module class for a short name (s.hero -> the hashed class of .ov-hero).
import m from "./overview.module.css";

const s = new Proxy({}, { get: (_, k) => (typeof k === "string" ? m[`ov-${k}`] || `ov-${k}` : undefined) });
export default s;
