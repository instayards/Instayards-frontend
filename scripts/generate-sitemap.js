/**
 * Generates public/sitemap.xml with all static routes plus every live
 * property and new-launch project fetched from the API. Runs automatically
 * before `npm run build` (see package.json "prebuild" script). If the API
 * is unreachable, it falls back to static routes only so the build never fails.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const SITE_URL = 'https://instayards.com';
const API_URL = process.env.REACT_APP_API_URL || 'https://api.instayards.com';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

const STATIC_ROUTES = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/properties', priority: '0.9', changefreq: 'daily' },
  { loc: '/new-launch', priority: '0.9', changefreq: 'daily' },
  { loc: '/about', priority: '0.6', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.6', changefreq: 'monthly' },
  { loc: '/sell', priority: '0.7', changefreq: 'monthly' },
  { loc: '/careers', priority: '0.4', changefreq: 'monthly' },
  { loc: '/terms', priority: '0.3', changefreq: 'yearly' },
  { loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

const fetchJson = (url) => new Promise((resolve, reject) => {
  const client = url.startsWith('https') ? https : http;
  client.get(url, { timeout: 8000 }, (res) => {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      res.resume();
      return reject(new Error(`Request to ${url} failed with status ${res.statusCode}`));
    }
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => {
      try { resolve(JSON.parse(body)); } catch (err) { reject(err); }
    });
  }).on('error', reject).on('timeout', function () { this.destroy(new Error('timeout')); });
});

const buildUrlEntry = ({ loc, priority, changefreq, lastmod }) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>\n    ` : ''}<changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

async function main() {
  const urlEntries = STATIC_ROUTES.map(buildUrlEntry);

  try {
    const residentialRes = await fetchJson(`${API_URL}/api/residential/properties`);
    const properties = residentialRes?.data?.properties || [];
    properties.forEach((p) => {
      const id = p.residential_id || p.id;
      if (!id) return;
      urlEntries.push(buildUrlEntry({ loc: `/property/${id}`, priority: '0.8', changefreq: 'weekly' }));
    });
    console.log(`sitemap: added ${properties.length} property URLs`);
  } catch (err) {
    console.warn('sitemap: could not fetch residential properties, skipping dynamic property URLs:', err.message);
  }

  try {
    const newLaunchRes = await fetchJson(`${API_URL}/api/newlaunch`);
    const projects = newLaunchRes?.data || [];
    projects.forEach((p) => {
      const id = p.project_id || p.id;
      if (!id) return;
      urlEntries.push(buildUrlEntry({ loc: `/new-launch/${id}`, priority: '0.8', changefreq: 'weekly' }));
    });
    console.log(`sitemap: added ${projects.length} new-launch URLs`);
  } catch (err) {
    console.warn('sitemap: could not fetch new-launch projects, skipping dynamic new-launch URLs:', err.message);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries.join('\n')}\n</urlset>\n`;

  fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');
  console.log(`sitemap: wrote ${urlEntries.length} URLs to ${OUTPUT_PATH}`);
}

main();
