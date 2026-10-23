// Vercel Edge Middleware (runs before the static files).
//  * /sitemap.xml          → a live sitemap: the main pages + every project from the CRM.
//  * /property.html?id=…   → the same page, with that project's own title, description, photo and link preview
//                            (so WhatsApp / Google show "Sumeet Urban Nest – 3 BHK from ₹1.2 Cr" with its photo).
// If anything fails, the normal page is served as before.
export const config = { matcher: ['/sitemap.xml', '/property.html', '/property-in-raipur', '/flats-in-raipur', '/flats-in-naya-raipur', '/property-in-atal-nagar', '/2-bhk-flats-in-raipur', '/3-bhk-flats-in-raipur', '/4-bhk-flats-in-raipur', '/luxury-flats-in-raipur', '/bungalows-in-raipur', '/plots-in-raipur', '/new-projects-in-raipur', '/ready-to-move-flats-in-raipur', '/commercial-property-in-raipur', '/flats-in-bangalore'] };
//  * /flats-in-raipur and other search pages → built from live CRM projects (see LANDINGS below).

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

// ---------------------------------------------------------------------------------------------
// SEO landing pages: /flats-in-raipur, /3-bhk-flats-in-raipur, /bungalows-in-raipur, …
// Built on the server from the live CRM projects, so Google sees real listings, prices and FAQs.
// ---------------------------------------------------------------------------------------------
const BLR = /bangalore|bengaluru|whitefield|electronic city|devanahalli|sarjapur|hebbal|yelahanka|koramangala|indiranagar|hsr layout|jp nagar|bannerghatta|kanakapura|hennur|marathahalli|bellandur|kr puram|rajajinagar|malleshwaram|jayanagar|banashankari|thanisandra|budigere|hoskote|nelamangala/i;
const ATAL = /atal nagar|naya raipur|nava raipur|new raipur|sector[\s-]*\d+/i;
const isBlr = (p) => BLR.test(p.location || '');
const isRaipur = (p) => !isBlr(p);
const isAtal = (p) => ATAL.test(`${p.location || ''} ${p.name || ''}`);
const kindOf = (p) => {
  const t = `${p.type || ''}`.toLowerCase();
  if (/plot|land/.test(t)) return 'plot';
  if (/villa|bungalow|row ?house|independent|duplex/.test(t)) return 'villa';
  if (/shop|retail|office|commercial|showroom/.test(t)) return 'commercial';
  return 'flat';
};
const bedsOf = (p) => (String(p.configs || '').match(/\d+(\.\d+)?/g) || []).map(Number).filter((n) => n > 0 && n < 10);
const has = (p, n) => bedsOf(p).some((b) => Math.floor(b) === n);
const priceText = (lakh) => { const n = Number(lakh); if (!n) return ''; return n >= 100 ? `₹${(n / 100).toFixed(2).replace(/0+$/, '').replace(/\.$/, '')} crore` : `₹${Math.round(n)} lakh`; };
const isNew = (p) => /pre.?launch|new|under construction|launch/i.test(p.status || '');
const isReady = (p) => /ready/i.test(p.status || '');

const RAIPUR_WHY = 'Every project we show is visited and checked by our team: RERA registration, approvals, the builder’s track record and the full price including parking, PLC, GST and registration. One advisor stays with you from the first site visit to possession, and we help with the home loan.';
const COMMON_FAQ = [
  ['Are these projects RERA registered?', 'We only list projects we have checked. Where a project has a RERA number it is shown on the project page, and you can verify it on the Chhattisgarh RERA website (or Karnataka RERA for Bangalore). Ask your advisor for the RERA certificate before you pay any booking amount.'],
  ['Can I get a home loan?', 'Yes. Most of these projects are approved by major banks. Our team helps you compare loan offers and with the paperwork, so you know your EMI before you book.'],
  ['How do I book a site visit?', 'Open any project and press “Schedule a visit”, or call us. Pick a day that suits you and our advisor will show you the project in person, with pick-up if you need it.'],
];

const LANDINGS = {
  'property-in-raipur': {
    h1: 'Property for sale in Raipur', short: 'Property in Raipur',
    title: 'Property for Sale in Raipur – Flats, Villas, Plots | The Astittva Estates',
    match: (p) => isRaipur(p),
    intro: [
      'Looking to buy property in Raipur? Here are the homes, villas, plots and commercial spaces The Astittva Estates is selling right now across Raipur and Naya Raipur (Atal Nagar), with real prices and photos updated every day.',
      RAIPUR_WHY,
    ],
    search: 'location=Raipur',
  },
  'flats-in-raipur': {
    h1: 'Flats for sale in Raipur', short: 'Flats in Raipur',
    title: 'Flats for Sale in Raipur – 2, 3 & 4 BHK Apartments | The Astittva Estates',
    match: (p) => isRaipur(p) && kindOf(p) === 'flat',
    intro: [
      'Find 2, 3 and 4 BHK flats for sale in Raipur, from ready-to-move apartments in the heart of the city to new launches in Naya Raipur (Atal Nagar). Compare prices, sizes and possession dates in one place.',
      RAIPUR_WHY,
    ],
    search: 'location=Raipur&type=Apartment',
  },
  'flats-in-naya-raipur': {
    h1: 'Flats for sale in Naya Raipur (Atal Nagar)', short: 'Flats in Naya Raipur',
    title: 'Flats for Sale in Naya Raipur (Atal Nagar) | The Astittva Estates',
    match: (p) => isAtal(p) && kindOf(p) === 'flat',
    intro: [
      'Naya Raipur, now called Atal Nagar, is the planned new capital area of Chhattisgarh, with wide roads, green belts and new residential sectors. These are the apartments we are selling there today.',
      RAIPUR_WHY,
    ],
    search: 'location=Atal%20Nagar%20(Naya%20Raipur)&type=Apartment',
  },
  'property-in-atal-nagar': {
    h1: 'Property in Atal Nagar (Naya Raipur)', short: 'Property in Atal Nagar',
    title: 'Property in Atal Nagar (Naya Raipur) – Flats, Villas, Plots | The Astittva Estates',
    match: (p) => isAtal(p),
    intro: [
      'Flats, villas and plots in Atal Nagar (Naya Raipur), sector by sector. A good choice if you want a newer, planned neighbourhood and are buying for your family or as an investment.',
      RAIPUR_WHY,
    ],
    search: 'location=Atal%20Nagar%20(Naya%20Raipur)',
  },
  '2-bhk-flats-in-raipur': {
    h1: '2 BHK flats for sale in Raipur', short: '2 BHK flats in Raipur',
    title: '2 BHK Flats for Sale in Raipur – Prices & Projects | The Astittva Estates',
    match: (p) => isRaipur(p) && kindOf(p) === 'flat' && has(p, 2),
    intro: ['2 BHK apartments in Raipur and Naya Raipur, ideal for young families and first-time buyers. See sizes, starting prices and possession dates, then visit the ones you like.', RAIPUR_WHY],
    search: 'location=Raipur&beds=2',
  },
  '3-bhk-flats-in-raipur': {
    h1: '3 BHK flats for sale in Raipur', short: '3 BHK flats in Raipur',
    title: '3 BHK Flats for Sale in Raipur – Prices & Projects | The Astittva Estates',
    match: (p) => isRaipur(p) && kindOf(p) === 'flat' && has(p, 3),
    intro: ['Spacious 3 BHK flats in Raipur and Naya Raipur, the most popular choice for families who want an extra bedroom or a home office. Compare projects, sizes and prices below.', RAIPUR_WHY],
    search: 'location=Raipur&beds=3',
  },
  '4-bhk-flats-in-raipur': {
    h1: '4 BHK flats and penthouses in Raipur', short: '4 BHK flats in Raipur',
    title: '4 BHK Flats & Penthouses for Sale in Raipur | The Astittva Estates',
    match: (p) => isRaipur(p) && (kindOf(p) === 'flat' || kindOf(p) === 'villa') && bedsOf(p).some((b) => b >= 4),
    intro: ['Large 4 BHK apartments, penthouses and homes in Raipur for families who want more room, more light and premium amenities.', RAIPUR_WHY],
    search: 'location=Raipur&beds=4',
  },
  'luxury-flats-in-raipur': {
    h1: 'Luxury flats and homes in Raipur', short: 'Luxury homes in Raipur',
    title: 'Luxury Flats & Homes in Raipur – Premium Projects | The Astittva Estates',
    match: (p) => isRaipur(p) && kindOf(p) !== 'plot' && kindOf(p) !== 'commercial' && Number(p.price_from) >= 100,
    intro: ['Premium apartments, penthouses and villas in Raipur from ₹1 crore upwards: larger homes, better specifications, clubhouses and the best locations in the city and Naya Raipur.', RAIPUR_WHY],
    search: 'location=Raipur',
  },
  'bungalows-in-raipur': {
    h1: 'Bungalows and villas for sale in Raipur', short: 'Bungalows & villas in Raipur',
    title: 'Bungalows & Villas for Sale in Raipur | The Astittva Estates',
    match: (p) => isRaipur(p) && kindOf(p) === 'villa',
    intro: ['Independent bungalows, villas and row houses in Raipur and Naya Raipur, for families who want their own garden, privacy and space to grow.', RAIPUR_WHY],
    search: 'location=Raipur&type=Villa',
  },
  'plots-in-raipur': {
    h1: 'Plots for sale in Raipur', short: 'Plots in Raipur',
    title: 'Residential Plots for Sale in Raipur & Naya Raipur | The Astittva Estates',
    match: (p) => isRaipur(p) && kindOf(p) === 'plot',
    intro: ['Residential plots in Raipur and Naya Raipur to build your own home or to invest. We check land titles and approvals before we list a plot.', RAIPUR_WHY],
    search: 'location=Raipur&type=Plot',
  },
  'new-projects-in-raipur': {
    h1: 'New projects in Raipur', short: 'New projects in Raipur',
    title: 'New Residential Projects in Raipur – Launches & Under Construction | The Astittva Estates',
    match: (p) => isRaipur(p) && isNew(p),
    intro: ['New launches and under-construction projects in Raipur and Naya Raipur. Booking early usually means a better choice of floors and views, and launch prices.', RAIPUR_WHY],
    search: 'location=Raipur&mode=new',
  },
  'ready-to-move-flats-in-raipur': {
    h1: 'Ready to move flats in Raipur', short: 'Ready to move in Raipur',
    title: 'Ready to Move Flats in Raipur – Move In Now | The Astittva Estates',
    match: (p) => isRaipur(p) && isReady(p) && kindOf(p) !== 'plot',
    intro: ['Homes in Raipur you can move into now: no waiting for possession, no construction risk, and you can see exactly what you are buying.', RAIPUR_WHY],
    search: 'location=Raipur',
  },
  'commercial-property-in-raipur': {
    h1: 'Commercial property in Raipur', short: 'Commercial property in Raipur',
    title: 'Shops & Offices for Sale or Lease in Raipur | The Astittva Estates',
    match: (p) => isRaipur(p) && kindOf(p) === 'commercial',
    intro: ['Shops, showrooms and office spaces in Raipur to buy or lease, in busy markets and new commercial areas.', 'We check approvals, footfall and the builder’s record, and help you with the lease or sale papers.'],
    search: 'location=Raipur&type=Retail',
  },
  'flats-in-bangalore': {
    h1: 'Flats for sale in Bangalore', short: 'Flats in Bangalore',
    title: 'Flats for Sale in Bangalore – 2 & 3 BHK Apartments | The Astittva Estates',
    match: (p) => isBlr(p) && kindOf(p) === 'flat',
    intro: ['Apartments in Bangalore for families moving to or within the city, picked and checked by the same team that helps you in Raipur.', 'Every project is visited by our team: RERA, approvals, the builder’s record and the full price, explained honestly.'],
    search: 'location=Bangalore',
  },
};
const LANDING_SLUGS = Object.keys(LANDINGS);

function landingFaq(def, list) {
  const prices = list.map((p) => Number(p.price_from)).filter((n) => n > 0);
  const areas = [...new Set(list.map((p) => String(p.location || '').split(',')[0].trim()).filter(Boolean))].slice(0, 5);
  const faq = [];
  if (prices.length) faq.push([`What is the starting price of ${lowerFirst(def.short)}?`, `Right now, ${lowerFirst(def.short)} with us start from ${priceText(Math.min(...prices))}${prices.length > 1 ? ` and go up to around ${priceText(Math.max(...prices))}` : ''} (starting prices; the final price depends on the floor, size and view). Prices are updated from our live inventory.`]);
  if (list.length) faq.push([`How many projects do you have for ${lowerFirst(def.short)}?`, `We currently have ${list.length} project${list.length === 1 ? '' : 's'}${areas.length ? ` in ${areas.join(', ')}` : ''}. New projects are added as soon as our team has checked them.`]);
  return [...faq, ...COMMON_FAQ];
}

function landingCard(p) {
  const url = `/property.html?id=${encodeURIComponent(slugOf(p))}`;
  const img = photoUrl((p.photos || [])[0]);
  const beds = String(p.configs || '').trim();
  const bedsText = beds ? (/bhk/i.test(beds) ? beds : `${beds} BHK`) : '';
  const size = p.size_from ? `${Number(p.size_from).toLocaleString('en-IN')}${p.size_to && p.size_to !== p.size_from ? '–' + Number(p.size_to).toLocaleString('en-IN') : ''} sq ft` : '';
  const price = p.deal === 'lease' ? 'For lease' : p.price_from ? `From ${priceText(p.price_from)}` : 'Price on request';
  return `<article class="seo-card"><a href="${url}">${img ? `<img src="${esc(img)}" alt="${esc(`${p.name}${bedsText ? ' – ' + bedsText : ''} in ${String(p.location || 'Raipur').split(',')[0]}`)}" loading="lazy" width="640" height="420">` : '<span class="seo-card-noimg"></span>'}<div class="seo-card-body"><h3>${esc(p.name)}</h3><p class="seo-card-loc">${esc(p.location || '')}</p><p class="seo-card-price">${esc(price)}</p><p class="seo-card-meta">${esc([bedsText, size, p.status, p.possession ? 'Possession ' + p.possession : ''].filter(Boolean).join(' · '))}</p></div></a></article>`;
}

async function landingPage(req, slug) {
  const def = LANDINGS[slug];
  const url = new URL(req.url);
  const [tpl, all] = await Promise.all([fetch(new URL('/seo-template.html', url)).then((r) => (r.ok ? r.text() : null)), projects().catch(() => [])]);
  if (!tpl) return undefined;
  const list = all.filter(def.match).sort((a, b) => (Number(a.price_from) || 9e9) - (Number(b.price_from) || 9e9));
  const canon = `${SITE}/${slug}`;
  const prices = list.map((p) => Number(p.price_from)).filter((n) => n > 0);
  const lead = list.length
    ? `${list.length} project${list.length === 1 ? '' : 's'}${prices.length ? ` · from ${priceText(Math.min(...prices))}` : ''} · updated ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })}`
    : 'New options are being added. Tell us what you are looking for and we will call you with the best matches.';
  let desc = `${def.h1}: ${list.length ? `${list.length} checked project${list.length === 1 ? '' : 's'}${prices.length ? ` from ${priceText(Math.min(...prices))}` : ''}` : 'checked projects'} with photos, prices and floor plans. Book a site visit with The Astittva Estates.`;
  if (desc.length > 160) desc = desc.slice(0, 157).replace(/\s+\S*$/, '') + '…';
  const faq = landingFaq(def, list);
  const related = LANDING_SLUGS.filter((s) => s !== slug).map((s) => `<a href="/${s}">${esc(LANDINGS[s].short)}</a>`).join('');
  const crumbs = slug === 'property-in-raipur'
    ? [['Home', '/'], [def.short, `/${slug}`]]
    : [['Home', '/'], ...(isBlrSlug(slug) ? [] : [['Property in Raipur', '/property-in-raipur']]), [def.short, `/${slug}`]];

  const main = `
    <nav class="seo-crumbs" aria-label="Breadcrumb">${crumbs.map(([n, u], i) => (i < crumbs.length - 1 ? `<a href="${u}">${esc(n)}</a><span>›</span>` : `<span aria-current="page">${esc(n)}</span>`)).join('')}</nav>
    <header class="seo-head"><h1>${esc(def.h1)}</h1><p class="seo-lead">${esc(lead)}</p></header>
    <div class="seo-intro">${def.intro.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
    ${list.length ? `<div class="seo-grid">${list.map(landingCard).join('')}</div>` : ''}
    <div class="seo-cta"><div><h2>Not sure which one is right?</h2><p>Tell us your budget and area. An advisor will shortlist the best options and call you, free.</p></div><div class="seo-cta-actions"><a class="gold-button" href="#contact" data-contact-open="1">TALK TO AN ADVISOR <span>→</span></a><a class="button-outline" href="/search.html?${def.search}">SEE ALL HOMES</a></div></div>
    <section class="seo-faq"><h2>Questions buyers ask</h2>${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</section>
    <section class="seo-related"><h2>Popular searches</h2><div class="seo-related-links">${related}</div></section>`;

  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + (u === '/' ? '/' : u) })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ...(list.length ? [{ '@context': 'https://schema.org', '@type': 'ItemList', name: def.h1, itemListElement: list.slice(0, 20).map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/property.html?id=${encodeURIComponent(slugOf(p))}`, name: p.name })) }] : []),
  ];
  const image = photoUrl((list[0]?.photos || [])[0]) || `${SITE}/assets/og-image.jpg`;
  let html = tpl.replace('<!--SEO_MAIN-->', main);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(def.title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(desc)}" />`);
  html = html.replace('<meta name="robots" content="noindex, follow" />', `<meta name="robots" content="${list.length ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`);
  html = html.replace('<!-- /SEO -->', [
    `<link rel="canonical" href="${canon}" />`,
    '<meta property="og:type" content="website" />', '<meta property="og:site_name" content="The Astittva Estates" />', '<meta property="og:locale" content="en_IN" />',
    `<meta property="og:title" content="${esc(def.title)}" />`, `<meta property="og:description" content="${esc(desc)}" />`, `<meta property="og:url" content="${canon}" />`, `<meta property="og:image" content="${esc(image)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />', `<meta name="twitter:title" content="${esc(def.title)}" />`, `<meta name="twitter:description" content="${esc(desc)}" />`, `<meta name="twitter:image" content="${esc(image)}" />`,
    ...ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x).replace(/</g, '\\u003c')}</script>`),
    '<!-- /SEO -->',
  ].join('\n  '));
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, s-maxage=600, stale-while-revalidate=86400' } });
}
const isBlrSlug = (s) => /bangalore/.test(s);
const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);

async function sitemap() {
  let list = [];
  try { list = await projects(); } catch { /* main pages only */ }
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...PAGES.map((p) => `<url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod><changefreq>${p === '/' || p === '/search.html' ? 'daily' : 'weekly'}</changefreq><priority>${p === '/' ? '1.0' : '0.8'}</priority></url>`),
    ...LANDING_SLUGS.filter((s) => list.some(LANDINGS[s].match)).map((s) => `<url><loc>${SITE}/${s}</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>${s === 'property-in-raipur' || s === 'flats-in-raipur' ? '0.95' : '0.85'}</priority></url>`),
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
  const title = `${p.name}${config ? ` – ${/bhk/i.test(config) ? config : config + ' BHK'}` : ''}${loc ? ` in ${loc.split(',')[0]}` : ''} | The Astittva Estates`;
  const bits = [lease ? 'For lease' : price ? `From ${price}` : '', config && (/bhk/i.test(config) ? config : config + ' BHK'), size, loc, p.developer ? `by ${p.developer}` : '', p.status].filter(Boolean);
  let desc = `${p.name}: ${bits.join(' · ')}.${p.highlights ? ' ' + String(p.highlights).trim() : ''} Photos, floor plans and site visits with The Astittva Estates.`;
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
    '<meta property="og:type" content="website" />', '<meta property="og:site_name" content="The Astittva Estates" />', '<meta property="og:locale" content="en_IN" />',
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
    const slug = url.pathname.replace(/^\/|\/$/g, '');
    if (LANDINGS[slug]) return await landingPage(req, slug);
    const id = url.searchParams.get('id');
    if (url.pathname === '/property.html' && id && !req.headers.get('x-ss-plain') && /^[a-z0-9-]{3,80}$/i.test(id)) return await propertyPage(req, id);
  } catch { /* fall through to the normal page */ }
  return undefined;
}
