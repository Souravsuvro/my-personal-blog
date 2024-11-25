const fs = require('fs');
const path = require('path');

// Import your blog posts data
const { blogPosts } = require('../src/data/blogPosts');

const BASE_URL = 'https://souravsuvra.com';

// Static pages
const staticPages = [
  '',
  '/about',
  '/blog',
  '/contact',
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (path) => `
    <url>
      <loc>${BASE_URL}${path}</loc>
      <changefreq>monthly</changefreq>
      <priority>${path === '' ? '1.0' : '0.8'}</priority>
    </url>`
    )
    .join('')}
  ${blogPosts
    .map(
      (post) => `
    <url>
      <loc>${BASE_URL}/blog/${post.id}</loc>
      <lastmod>${new Date(post.date).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap();
