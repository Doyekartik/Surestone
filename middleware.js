// Vercel Edge Middleware (runs before the static files).
//  * /sitemap.xml          → a live sitemap: the main pages + every project from the CRM.
//  * /property.html?id=…   → the same page, with that project's own title, description, photo and link preview
//                            (so WhatsApp / Google show "Sumeet Urban Nest – 3 BHK from ₹1.2 Cr" with its photo).
// If anything fails, the normal page is served as before.
export const config = { matcher: ['/sitemap.xml', '/property.html'] };

const SITE = 'https://www.theastittva.com';
const CRM = 'https://realty-crm-navy.vercel.app';
const ORG = '86287afd-1743-4b44-8432-cce30a0c0f32';
const PAGES = ['/', '/search.html', '/neighbourhoods.html', '/about.html', '/testimonials.html', '/sell.html'];

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const slugOf = (p) => String(p.name || 'project').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) + '-' + String(p.id).slice(0, 8);
const money = (lakh) => { const n = Number(lakh) * 100000; if (!n) return ''; return n >= 1e7 ? `₹${(n / 1e7).toFixed(2).replace(/0+$/, '').replace(/\.$/, '')} Cr` : `₹${Math.round(n / 1e5)} L`; };
const photoUrl = (u) => (typeof u === 'string' && /^https:\/\//.test(u) ? u : typeof u === 'string' && u.startsWith('/') && !u.startsWith('//') ? CRM + u : '');

async function projects() {
  const r = await fetch(`${CRM}/api/site/projects?org=${ORG}`, { headers: { accept: 'application/json' } });
  if (!r.ok) return [];
  const j = await r.json();
  return Array.isArray(j.projects) ? j.projects : [];
}

async function sitemap() {
  let list = [];
  try { list = await projects(); } catch { /* main pages only */ }
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...PAGES.map((p) => `<url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod><changefreq>${p === '/' || p === '/search.html' ? 'daily' : 'weekly'}</changefreq><priority>${p === '/' ? '1.0' : '0.8'}</priority></url>`),
    ...list.map((p) => {
      const img = photoUrl((p.photos || [])[0]);
      return `<url><loc>${SITE}/property.html?id=${encodeURIComponent(slugOf(p))}</loc>${p.updated_at ? `<lastmod>${String(p.updated_at).slice(0, 10)}</lastmod>` : ''}<changefreq>weekly</changefreq><priority>0.9</priority>${img ? `<image:image><image:loc>${esc(img)}</image:loc><image:title>${esc(p.name)}</image:title></image:image>` : ''}</url>`;
    }),
  ];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`, {
    headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  });
}

async function propertyPage(req, id) {
  const url = new URL(req.url);
  const [page, list] = await Promise.all([
    fetch(new URL('/property.html', url), { headers: { 'x-ss-plain': '1' } }).then((r) => (r.ok ? r.text() : null)),
    projects(),
  ]);
  if (!page) return undefined;
  const key = id.toLowerCase();
  const p = list.find((x) => slugOf(x) === key) || list.find((x) => key.endsWith('-' + String(x.id).slice(0, 8)));
  if (!p) return undefined;

  const loc = String(p.location || '').trim();
  const price = money(p.price_from);
  const lease = p.deal === 'lease';
  const config = String(p.configs || '').trim();
  const size = p.size_from ? `${Number(p.size_from).toLocaleString('en-IN')}${p.size_to && p.size_to !== p.size_from ? '–' + Number(p.size_to).toLocaleString('en-IN') : ''} sq ft` : '';
<<<<<<< HEAD
  const title = `${p.name}${config ? ` – ${/bhk/i.test(config) ? config : config + ' BHK'}` : ''}${loc ? ` in ${loc.split(',')[0]}` : ''} | Sure Stone Properties`;
  const bits = [lease ? 'For lease' : price ? `From ${price}` : '', config && (/bhk/i.test(config) ? config : config + ' BHK'), size, loc, p.developer ? `by ${p.developer}` : '', p.status].filter(Boolean);
  let desc = `${p.name}: ${bits.join(' · ')}.${p.highlights ? ' ' + String(p.highlights).trim() : ''} Photos, floor plans and site visits with Sure Stone.`;
=======
  const title = `${p.name}${config ? ` – ${/bhk/i.test(config) ? config : config + ' BHK'}` : ''}${loc ? ` in ${loc.split(',')[0]}` : ''} | The Astittva Estates`;
  const bits = [lease ? 'For lease' : price ? `From ${price}` : '', config && (/bhk/i.test(config) ? config : config + ' BHK'), size, loc, p.developer ? `by ${p.developer}` : '', p.status].filter(Boolean);
  let desc = `${p.name}: ${bits.join(' · ')}.${p.highlights ? ' ' + String(p.highlights).trim() : ''} Photos, floor plans and site visits with The Astittva Estates.`;
>>>>>>> 6747e75 (Update The Astittva Estates website)
  if (desc.length > 160) desc = desc.slice(0, 157).replace(/\s+\S*$/, '') + '…';
  const canon = `${SITE}/property.html?id=${encodeURIComponent(slugOf(p))}`;
  const image = photoUrl((p.photos || [])[0]) || `${SITE}/assets/og-image.jpg`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'RealEstateListing', name: p.name, url: canon, description: desc, image: (p.photos || []).map(photoUrl).filter(Boolean).slice(0, 6),
    provider: { '@id': `${SITE}/#organization` },
    ...(price && !lease ? { offers: { '@type': 'Offer', priceCurrency: 'INR', price: Math.round(Number(p.price_from) * 100000), availability: 'https://schema.org/InStock' } } : {}),
    ...(p.lat != null && p.lng != null ? { contentLocation: { '@type': 'Place', name: loc || p.name, geo: { '@type': 'GeoCoordinates', latitude: p.lat, longitude: p.lng } } } : {}),
  };

  let html = page.replace(/\s*<meta (?:property="og:[^"]*"|name="twitter:[^"]*") content="[^"]*" \/>/g, '');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(desc)}" />`);
  html = html.replace('<!-- /SEO -->', [
    `<link rel="canonical" href="${esc(canon)}" />`,
<<<<<<< HEAD
    '<meta property="og:type" content="website" />', '<meta property="og:site_name" content="Sure Stone Properties" />', '<meta property="og:locale" content="en_IN" />',
=======
    '<meta property="og:type" content="website" />', '<meta property="og:site_name" content="The Astittva Estates" />', '<meta property="og:locale" content="en_IN" />',
>>>>>>> 6747e75 (Update The Astittva Estates website)
    `<meta property="og:title" content="${esc(title)}" />`, `<meta property="og:description" content="${esc(desc)}" />`, `<meta property="og:url" content="${esc(canon)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`, `<meta property="og:image:alt" content="${esc(p.name)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />', `<meta name="twitter:title" content="${esc(title)}" />`, `<meta name="twitter:description" content="${esc(desc)}" />`, `<meta name="twitter:image" content="${esc(image)}" />`,
    `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`,
    '<!-- /SEO -->',
  ].join('\n  '));
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, s-maxage=300, stale-while-revalidate=86400' } });
}

export default async function middleware(req) {
  const url = new URL(req.url);
  try {
    if (url.pathname === '/sitemap.xml') return await sitemap();
    const id = url.searchParams.get('id');
    if (url.pathname === '/property.html' && id && !req.headers.get('x-ss-plain') && /^[a-z0-9-]{3,80}$/i.test(id)) return await propertyPage(req, id);
  } catch { /* fall through to the normal page */ }
  return undefined;
}
