import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.BASE_URL?.replace(/\/+$/g, '') ?? '';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: baseUrl || undefined,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
