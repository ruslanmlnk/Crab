import type { MetadataRoute } from 'next'

const resolveSiteBaseUrl = (): URL => {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL

  if (!configuredUrl) {
    return new URL('http://localhost:3000')
  }

  try {
    return new URL(configuredUrl)
  } catch {
    return new URL(`https://${configuredUrl}`)
  }
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = resolveSiteBaseUrl()
  const sitemapUrl = new URL('/sitemap.xml', baseUrl).toString()

  return {
    host: baseUrl.origin,
    rules: [
      {
        allow: '/',
        disallow: ['/admin', '/api'],
        userAgent: '*',
      },
    ],
    sitemap: sitemapUrl,
  }
}
