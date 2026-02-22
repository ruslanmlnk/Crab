import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { Author, BlogCategory, BlogPost, Media } from '@/payload-types'

import type { BlogLocale } from './blog-locale'
import { CACHE_REVALIDATE } from './cache'

const FALLBACK_IMAGE =
  'https://api.builder.io/api/v1/image/assets/TEMP/76ae9b75a902932af3b137ff435b94350ef3dc78?width=588'

const getPayloadClient = cache(async () => getPayload({ config }))

const getMediaURL = (
  media: Media | null | number | string | undefined,
  fallbackImage?: null | string,
): null | string => {
  if (!media || typeof media === 'number' || typeof media === 'string') {
    return fallbackImage ?? null
  }

  const mediaDoc = media as Media
  return mediaDoc.url ?? fallbackImage ?? null
}

const getAuthorFromPopulatedDoc = (
  author: BlogPost['author'],
): { avatar: null | string; name: string } => {
  if (!author || typeof author === 'number' || typeof author === 'string') {
    return {
      avatar: null,
      name: '',
    }
  }

  const authorDoc = author as Author

  return {
    avatar: getMediaURL(authorDoc.avatar),
    name: authorDoc.authorName || '',
  }
}

const getAuthorFromPost = async (
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  author: BlogPost['author'],
): Promise<{ avatar: null | string; name: string }> => {
  if (!author) {
    return {
      avatar: null,
      name: '',
    }
  }

  if (typeof author !== 'number' && typeof author !== 'string') {
    return getAuthorFromPopulatedDoc(author)
  }

  try {
    const authorDoc = await payload.findByID({
      collection: 'authors',
      depth: 1,
      fallbackLocale: 'en',
      id: author,
    })

    return {
      avatar: getMediaURL(authorDoc.avatar),
      name: authorDoc.authorName || '',
    }
  } catch {
    return {
      avatar: null,
      name: '',
    }
  }
}

const getCategoryFromPost = (
  category: BlogPost['category'],
  locale: BlogLocale,
): { label: string; slug: string } => {
  if (!category || typeof category === 'number' || typeof category === 'string') {
    return {
      label: locale === 'ru' ? 'Без категории' : 'Uncategorized',
      slug: 'uncategorized',
    }
  }

  const categoryDoc = category as BlogCategory

  return {
    label:
      typeof categoryDoc.name === 'string'
        ? categoryDoc.name
        : locale === 'ru'
          ? 'Без категории'
          : 'Uncategorized',
    slug: categoryDoc.slug || 'uncategorized',
  }
}

const mapPostToCard = (
  post: BlogPost,
  locale: BlogLocale,
): {
  category: string
  categorySlug: string
  description: string
  id: number | string
  image: string
  slug: string
  title: string
} => {
  const category = getCategoryFromPost(post.category, locale)

  return {
    category: category.label,
    categorySlug: category.slug,
    description: post.excerpt || '',
    id: post.id,
    image: getMediaURL(post.featuredImage, FALLBACK_IMAGE) ?? FALLBACK_IMAGE,
    slug: post.slug || '',
    title: post.title || '',
  }
}

const getBlogPageDataCached = unstable_cache(
  async (locale: BlogLocale) => {
    const payload = await getPayloadClient()

    const [postsResult, categoriesResult] = await Promise.all([
      payload.find({
        collection: 'blog-posts',
        depth: 2,
        fallbackLocale: 'en',
        limit: 100,
        locale,
        sort: '-publishedAt',
        where: {
          status: {
            equals: 'published',
          },
        },
      }),
      payload.find({
        collection: 'blog-categories',
        fallbackLocale: 'en',
        limit: 100,
        locale,
        sort: 'slug',
      }),
    ])

    const posts = postsResult.docs
      .map((post) => mapPostToCard(post, locale))
      .filter((post) => Boolean(post.slug && post.title))

    const categories = categoriesResult.docs
      .map((category) => ({
        label: category.name || '',
        slug: category.slug || '',
      }))
      .filter((category) => Boolean(category.label && category.slug))

    return {
      categories,
      posts,
    }
  },
  ['blog-page-data'],
  {
    revalidate: CACHE_REVALIDATE.blogList,
    tags: ['blog-posts', 'blog-categories'],
  },
)

export const getBlogPageData = cache(async (locale: BlogLocale) => getBlogPageDataCached(locale))

const getBlogPostBySlugCached = unstable_cache(
  async (locale: BlogLocale, slug: string) => {
    const payload = await getPayloadClient()

    const postResult = await payload.find({
      collection: 'blog-posts',
      depth: 2,
      fallbackLocale: 'en',
      limit: 1,
      locale,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            status: {
              equals: 'published',
            },
          },
        ],
      },
    })

    const post = postResult.docs[0]

    if (!post) {
      return null
    }

    const category = getCategoryFromPost(post.category, locale)
    const author = await getAuthorFromPost(payload, post.author)

    return {
      authorImage: author.avatar,
      authorName: author.name,
      category: category.label,
      categorySlug: category.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      featuredImage: getMediaURL(post.featuredImage, FALLBACK_IMAGE) ?? FALLBACK_IMAGE,
      id: post.id,
      publishedAt: post.publishedAt,
      slug: post.slug || '',
      title: post.title || '',
    }
  },
  ['blog-post-by-slug'],
  {
    revalidate: CACHE_REVALIDATE.blogPost,
    tags: ['blog-posts'],
  },
)

export const getBlogPostBySlug = cache(async (locale: BlogLocale, slug: string) =>
  getBlogPostBySlugCached(locale, slug),
)

const getFeaturedBlogPostsCached = unstable_cache(
  async (locale: BlogLocale, postId: number | string) => {
    const payload = await getPayloadClient()

    const featuredPostsResult = await payload.find({
      collection: 'blog-posts',
      depth: 2,
      fallbackLocale: 'en',
      limit: 2,
      locale,
      sort: '-publishedAt',
      where: {
        and: [
          {
            id: {
              not_equals: postId,
            },
          },
          {
            status: {
              equals: 'published',
            },
          },
        ],
      },
    })

    return featuredPostsResult.docs
      .map((post) => ({
        id: post.id,
        image: getMediaURL(post.featuredImage, FALLBACK_IMAGE) ?? FALLBACK_IMAGE,
        slug: post.slug || '',
        title: post.title || '',
      }))
      .filter((post) => Boolean(post.slug && post.title))
  },
  ['featured-blog-posts'],
  {
    revalidate: CACHE_REVALIDATE.featuredPosts,
    tags: ['blog-posts'],
  },
)

export const getFeaturedBlogPosts = cache(async (locale: BlogLocale, postId: number | string) =>
  getFeaturedBlogPostsCached(locale, postId),
)

const getHomeFleetArticlesCached = unstable_cache(
  async (locale: BlogLocale, articleIds?: Array<number | string>) => {
    const payload = await getPayloadClient()

    if (articleIds && articleIds.length > 0) {
      const selectedPosts = await Promise.all(
        articleIds.map(async (articleId) => {
          try {
            const post = await payload.findByID({
              collection: 'blog-posts',
              depth: 2,
              fallbackLocale: 'en',
              id: articleId,
              locale,
            })

            if (post.status !== 'published') {
              return null
            }

            return post
          } catch {
            return null
          }
        }),
      )

      return selectedPosts
        .filter((post): post is BlogPost => Boolean(post))
        .map((post) => mapPostToCard(post, locale))
        .filter((post) => Boolean(post.slug && post.title))
    }

    const postsResult = await payload.find({
      collection: 'blog-posts',
      depth: 2,
      fallbackLocale: 'en',
      limit: 3,
      locale,
      sort: '-publishedAt',
      where: {
        status: {
          equals: 'published',
        },
      },
    })

    return postsResult.docs
      .map((post) => mapPostToCard(post, locale))
      .filter((post) => Boolean(post.slug && post.title))
  },
  ['home-fleet-articles'],
  {
    revalidate: CACHE_REVALIDATE.homeFleet,
    tags: ['blog-posts', 'home'],
  },
)

export const getHomeFleetArticles = cache(
  async (locale: BlogLocale, articleIds?: Array<number | string>) =>
    getHomeFleetArticlesCached(locale, articleIds),
)
