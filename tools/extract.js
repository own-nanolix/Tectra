(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  // 1. Scroll the whole project so lazy images load.
  for (let y = 0, i = 0; y < document.documentElement.scrollHeight && i < 600; y += 800, i++) { scrollTo(0, y); await sleep(220); }
  scrollTo(0, 0); await sleep(300);
  // 2. Collect project images in page order, one entry per file.
  const sizes = ['max_3840', 'source', 'fs', '1400'];
  const seen = new Set(), images = [];
  for (const img of document.querySelectorAll('img')) {
    const set = (img.srcset || img.dataset.srcset || '').split(',').map((s) => s.trim().split(' ')[0]);
    const url = [img.currentSrc, img.src, img.dataset.src, ...set].filter(Boolean).find((u) => /\/project_modules\//.test(u));
    if (!url) continue;
    const file = url.split('?')[0].split('/').pop();
    if (seen.has(file)) continue; seen.add(file);
    const candidates = sizes.map((s) => url.replace(/\/project_modules\/[^/]+\//, '/project_modules/' + s + '/'));
    if (!candidates.includes(url)) candidates.push(url);
    images.push({ n: images.length + 1, file, found: url, candidates, w: img.naturalWidth, h: img.naturalHeight, alt: img.alt || '' });
  }
  // 3. Page facts and text.
  const meta = (q) => (document.querySelector(q) || {}).content || '';
  const embeds = [...document.querySelectorAll('iframe, video')].map((e) => e.src || e.currentSrc || e.tagName).filter(Boolean);
  return JSON.stringify({
    url: location.origin + location.pathname,
    title: document.title,
    ogTitle: meta('meta[property="og:title"]'),
    description: meta('meta[property="og:description"]') || meta('meta[name="description"]'),
    imageCount: images.length, images, embeds,
    text: (document.querySelector('main') || document.body).innerText.slice(0, 30000),
  });
})()
