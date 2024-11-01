import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/cart/', '/success/', '/error/', '/orders/', '/reset-password/']
    },
    sitemap: 'https://kathrinsbooks.com/sitemap.xml',
  }
}
