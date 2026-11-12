// Reads pages.json: the 30 pages in presenter order.
import list from '../../pages.json';

export const pages = list;
export const groups = [...new Set(list.map((p) => p.group))].map((name) => ({
  name,
  pages: list.filter((p) => p.group === name),
}));

export function pageById(id) {
  return list.find((p) => p.id === id);
}

export function pageIndex(id) {
  return list.findIndex((p) => p.id === id);
}

// Metadata for a route: export const metadata = pageMeta('<id>')
export function pageMeta(id) {
  const p = pageById(id);
  return { title: p ? p.title : 'Tectra' };
}

export function previous(id) {
  const i = pageIndex(id);
  return list[(i - 1 + list.length) % list.length];
}

export function next(id) {
  const i = pageIndex(id);
  return list[(i + 1) % list.length];
}

// '/logo/' -> 'logo'; '/' -> 'overview'
export function idFromPath(pathname) {
  const seg = (pathname || '/').split('/').filter(Boolean)[0];
  return seg && pageById(seg) ? seg : 'overview';
}

export const href = (id) => `/${id}/`;
