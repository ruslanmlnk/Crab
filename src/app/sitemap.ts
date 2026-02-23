import type { MetadataRoute } from 'next'
import { unstable_noStore as noStore } from 'next/cache'
import { getPayload } from 'payload'

import config from '@payload-config'
import { BLOG_LOCALES, DEFAULT_BLOG_LOCALE, type BlogLocale } from '@/lib/blog-locale'

export const dynamic = 'force-dynamic'

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

const normalizePathname = (pathname: string): string => {
  if (pathname === '/') {
    return pathname
  }

  if (!pathname.startsWith('/')) {
    return `/${pathname}`
  }

  return pathname
}

const withLocaleSearch = (pathname: string, locale: BlogLocale): string => {
  if (locale === DEFAULT_BLOG_LOCALE) {
    return pathname
  }

  const separator = pathname.includes('?') ? '&' : '?'
  return `${pathname}${separator}locale=${locale}`
}

const toAbsoluteUrl = (baseUrl: URL, pathname: string, locale: BlogLocale): string => {
  const normalizedPath = normalizePathname(pathname)
  const localizedPath = withLocaleSearch(normalizedPath, locale)

  return new URL(localizedPath, baseUrl).toString()
}

const staticRoutes = ['/', '/about', '/faq', '/blog', '/contact'] as const

const hasPayloadRuntimeConfig = (): boolean => {
  return Boolean(process.env.PAYLOAD_SECRET && process.env.DATABASE_URL)
}

const getStaticEntries = (baseUrl: URL): MetadataRoute.Sitemap => {
  const now = new Date()

  return staticRoutes.flatMap((route): MetadataRoute.Sitemap => {
    return BLOG_LOCALES.map((locale) => ({
      changeFrequency: route === '/' ? 'daily' : 'weekly',
      lastModified: now,
      priority: route === '/' ? 1 : 0.8,
      url: toAbsoluteUrl(baseUrl, route, locale),
    }))
  })
}

const getBlogEntries = async (baseUrl: URL): Promise<MetadataRoute.Sitemap> => {
  if (!hasPayloadRuntimeConfig()) {
    return []
  }

  const entries: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload({ config })

    for (const locale of BLOG_LOCALES) {
      const posts = await payload.find({
        collection: 'blog-posts',
        depth: 0,
        fallbackLocale: 'en',
        limit: 1000,
        locale,
        where: {
          status: {
            equals: 'published',
          },
        },
      })

      for (const post of posts.docs) {
        const slug = typeof post.slug === 'string' ? post.slug : null

        if (!slug) {
          continue
        }

        const lastModified =
          typeof post.updatedAt === 'string' ? new Date(post.updatedAt) : new Date()

        entries.push({
          changeFrequency: 'weekly',
          lastModified,
          priority: 0.7,
          url: toAbsoluteUrl(baseUrl, `/blog/${encodeURIComponent(slug)}`, locale),
        })
      }
    }
  } catch (error) {
    console.warn('[sitemap] Post fetch failed, returning static routes only.', error)
    return []
  }

  return entries
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  noStore()

  const baseUrl = resolveSiteBaseUrl()
  const [staticEntries, blogEntries] = await Promise.all([
    Promise.resolve(getStaticEntries(baseUrl)),
    getBlogEntries(baseUrl),
  ])

  return [...staticEntries, ...blogEntries]
}
