// Simplified sitemap generation without external library
const generateSitemap = () => {
  const baseUrl = 'https://yourdomain.com';
  const routes = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/projects', priority: 0.8, changefreq: 'weekly' },
    { path: '/blog', priority: 0.7, changefreq: 'weekly' },
    { path: '/about', priority: 0.6, changefreq: 'monthly' },
    { path: '/contact', priority: 0.5, changefreq: 'monthly' }
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
    <url>
      <loc>${baseUrl}${route.path}</loc>
      <priority>${route.priority}</priority>
      <changefreq>${route.changefreq}</changefreq>
    </url>
  `).join('')}
</urlset>`;

  // In a real-world scenario, you'd write this to a file
  console.log(sitemapXml);
  return sitemapXml;
};

export default generateSitemap;
