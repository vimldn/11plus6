import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Allow page crawling so crawlers can see noindex metadata or a 404.
          '/api/',        // API routes
        ],
      },
    ],
    sitemap: 'https://www.11plusexampapers.com/sitemap.xml',
    host: 'https://www.11plusexampapers.com',
  };
}
