import { env } from '../config/env.js';
import { Blog } from '../models/Blog.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const staticPaths = [
  '/',
  '/services',
  '/ai-solutions',
  '/industries',
  '/portfolio',
  '/pricing',
  '/about',
  '/careers',
  '/blog',
  '/contact',
  '/free-consultation',
  '/privacy-policy',
  '/terms-and-conditions'
];

export const sitemap = asyncHandler(async (req, res) => {
  const siteUrl = env.clientUrl.includes('localhost') ? 'https://ideaclapindia.com' : env.clientUrl;
  const blogs = await Blog.find({ status: 'published' }).select('slug updatedAt').lean();

  const urls = [
    ...staticPaths.map((path) => ({ loc: `${siteUrl}${path}`, lastmod: new Date().toISOString() })),
    ...blogs.map((blog) => ({ loc: `${siteUrl}/blog/${blog.slug}`, lastmod: blog.updatedAt.toISOString() }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml').send(xml);
});

export function robots(req, res) {
  res.type('text/plain').send(`User-agent: *
Allow: /
Sitemap: https://ideaclapindia.com/api/sitemap.xml
`);
}

