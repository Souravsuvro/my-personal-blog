const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');
const path = require('path');

// Define your routes here
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/blog', changefreq: 'weekly', priority: 0.7 },
  { url: '/projects', changefreq: 'monthly', priority: 0.6 },
];

async function generateSitemap() {
  const stream = new SitemapStream({ 
    hostname: 'https://yourdomain.com' 
  });

  const data = await streamToPromise(
    Readable.from(links).pipe(stream)
  );

  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, data.toString());

  console.log('Sitemap generated successfully');
}

generateSitemap().catch(console.error);
