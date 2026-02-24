export const BLOG_LOCALES = ['en', 'ru'] as const

export type BlogLocale = (typeof BLOG_LOCALES)[number]

export const DEFAULT_BLOG_LOCALE: BlogLocale = 'ru'

const BLOG_LOCALE_SET = new Set<BlogLocale>(BLOG_LOCALES)

export const normalizeBlogLocale = (
  value?: null | string | string[],
): BlogLocale => {
  const candidate = Array.isArray(value) ? value[0] : value

  if (candidate && BLOG_LOCALE_SET.has(candidate as BlogLocale)) {
    return candidate as BlogLocale
  }

  return DEFAULT_BLOG_LOCALE
}

export const withBlogLocale = (pathname: string, locale: BlogLocale): string => {
  if (locale === DEFAULT_BLOG_LOCALE) {
    return pathname
  }

  const separator = pathname.includes('?') ? '&' : '?'
  return `${pathname}${separator}locale=${locale}`
}

type BlogMessages = {
  allCategories: string
  articleNotFoundDescription: string
  articleNotFoundTitle: string
  blogDescription: string
  blogTitle: string
  emptyContent: string
  emptyPosts: string
  featuredPosts: string
  heroDescription: string
  heroLine1: string
  heroLine2: string
  readMore: string
  shareDescription: string
  shareTitle: string
}

const BLOG_MESSAGES: Record<BlogLocale, BlogMessages> = {
  en: {
    allCategories: 'all',
    articleNotFoundDescription: 'The requested article could not be found.',
    articleNotFoundTitle: 'Post Not Found',
    blogDescription:
      'News and insights from our dives, courses, and underwater adventures.',
    blogTitle: 'Blog | Crab Fishing Community',
    emptyContent: 'No content has been added to this article yet.',
    emptyPosts: 'No published posts yet.',
    featuredPosts: 'Featured Posts',
    heroDescription:
      'News and insights from our dives, courses, and underwater adventures',
    heroLine1: 'Latest dive',
    heroLine2: 'news',
    readMore: 'learn more',
    shareDescription:
      'Enjoyed reading this article? Don’t keep it to yourself—share it with your friends, fellow diving enthusiasts, and anyone who would love to explore the underwater world!',
    shareTitle: 'Share this article',
  },
  ru: {
    allCategories: 'все',
    articleNotFoundDescription: 'Запрошенная статья не найдена.',
    articleNotFoundTitle: 'Статья не найдена',
    blogDescription:
      'Новости и полезные материалы о рейсах, обучении и работе в море.',
    blogTitle: 'Блог | Crab Fishing Community',
    emptyContent: 'Контент для этой статьи пока не добавлен.',
    emptyPosts: 'Пока нет опубликованных статей.',
    featuredPosts: 'Рекомендуемые статьи',
    heroDescription:
      'Новости и полезные материалы о рейсах, обучении и работе в море',
    heroLine1: 'Последние',
    heroLine2: 'новости',
    readMore: 'читать далее',
    shareDescription:
      'Понравилась статья? Поделитесь ей с друзьями и коллегами.',
    shareTitle: 'Поделиться статьей',
  },
}

export const getBlogMessages = (locale: BlogLocale): BlogMessages => {
  return BLOG_MESSAGES[locale]
}
