import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { Media } from '@/payload-types'

import type { BlogLocale } from './blog-locale'
import { CACHE_REVALIDATE } from './cache'

const getPayloadClient = cache(async () => getPayload({ config }))

const DEFAULT_ABOUT_CONTENT = {
  hero: {
    headlineAfterImage: 'in Africa',
    headlineBeforeImage: 'From cadet',
    headlineBottom: 'to fisherman in Norway',
    description:
      'A real journey through offshore work, fishing vessels, and life at sea',
    inlineImageUrl:
      'https://api.builder.io/api/v1/image/assets/TEMP/a094fe6bb6a8b0a1bab3cdec28b47b2ede034873',
  },
  reviews: {
    cards: [
      {
        location: 'Kherson, Ukraine',
        name: 'Vladimir',
        review:
          '"This journey became a real test for me. Africa, hard work, and zero comfort - the sea does not forgive weakness, but it rewards discipline. I found my path there and realized I should have started earlier."',
        storyUrl: '/blog',
      },
      {
        location: 'Odesa, Ukraine',
        name: 'Vlad',
        review:
          '"Choosing mechanics was one of the best decisions I have made. The engine room taught me discipline, responsibility, and independence. I would choose this path again without hesitation."',
        storyUrl: '/blog',
      },
      {
        location: '',
        name: 'Bogdan',
        review:
          '"This experience was a real test. No background, tough work, long shifts - the crab boat rewards discipline and stamina. I came with zero experience and proved I could grow from the first trip."',
        storyUrl: '/blog',
      },
      {
        location: 'Chisinau, Moldova',
        name: 'Alex',
        review:
          '"This move changed my life. From Chisinau to a fish factory in Norway, I found stable work at Solmari. Now I have steady income and confidence in tomorrow."',
        storyUrl: '/blog',
      },
      {
        location: 'Odesa, Ukraine',
        name: 'Volodymyr',
        review:
          '"I bought the course in April and now I am heading to my first crab vessel with no prior experience. I prepared my documents and found a job. No regrets - if you are unsure, take the course and go for it."',
        storyUrl: '/blog',
      },
      {
        location: 'Kherson, Ukraine',
        name: 'Vladimir',
        review:
          '"Getting on a Norwegian fishing vessel took persistence and real sea experience. The work is tough, but it pays well and gives stability. If you stay disciplined and focused, you can earn solid money and move forward."',
        storyUrl: '/blog',
      },
    ],
    description:
      'Hear from the fishermen and workers who started their journey with us. Real experiences, real results, and real opportunities at sea',
    title: 'Stories from Our Fishing Community',
  },
  realExperience: {
    cards: [
      {
        description:
          'Built on firsthand experience - from fishing vessel entry level in Africa and Nederland to work on Norwegian fishing and crab boats. More than 6 years of experience.',
        title: 'Real path, not theory',
      },
      {
        description:
          'No abstract advice. Only real information about work conditions and what to expect at sea.',
        title: 'Practical guidance',
      },
      {
        description:
          'Direct guidance from someone who has been through this path and understands its challenges.',
        title: 'Personal involvement',
      },
    ],
  },
  seo: {
    metaDescription:
      'From cadet in Africa to fisherman in Norway. A real journey through offshore work, fishing vessels, and life at sea.',
    metaTitle: 'About | Crab Norway',
    openGraphImage: null as null | string,
  },
  whoWeAre: {
    description:
      'An independent project sharing real experience and knowledge from inside the Norwegian crab fishing industry',
    learnMoreUrl: '/about',
  },
}

const resolveMediaUrl = (media: Media | null | number | string | undefined): null | string => {
  if (!media || typeof media === 'number' || typeof media === 'string') {
    return null
  }

  return media.url ?? null
}

const toAbsoluteUrl = (value: null | string): null | string => {
  if (!value) return null
  if (value.startsWith('http://') || value.startsWith('https://')) return value

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL
  if (!baseUrl) return value

  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const normalizedPath = value.startsWith('/') ? value : `/${value}`

  return `${normalizedBase}${normalizedPath}`
}

export type AboutContent = typeof DEFAULT_ABOUT_CONTENT

const getAboutContentCached = unstable_cache(
  async (locale: BlogLocale): Promise<AboutContent> => {
    const payload = await getPayloadClient()

    const aboutGlobal = await payload.findGlobal({
      slug: 'about',
      depth: 1,
      fallbackLocale: 'en',
      locale,
    })

    const hero = aboutGlobal.hero || {}
    const reviews = aboutGlobal.reviews || {}
    const whoWeAre = aboutGlobal.whoWeAre || {}
    const realExperience = aboutGlobal.realExperience || {}
    const seo = aboutGlobal.seo || {}
    const legacyHero = hero as { inlineImageUrl?: string }
    const realExperienceCards =
      realExperience.cards?.filter((card) => Boolean(card?.title && card?.description)) || []
    const reviewCards =
      reviews.cards
        ?.map((card) => ({
          location: card.location || '',
          name: card.name || '',
          review: card.review || '',
          storyUrl: card.storyUrl || '',
        }))
        .filter((card) => Boolean(card.name && card.review && card.storyUrl)) || []

    return {
      hero: {
        headlineAfterImage:
          hero.headlineAfterImage || DEFAULT_ABOUT_CONTENT.hero.headlineAfterImage,
        headlineBeforeImage:
          hero.headlineBeforeImage || DEFAULT_ABOUT_CONTENT.hero.headlineBeforeImage,
        headlineBottom: hero.headlineBottom || DEFAULT_ABOUT_CONTENT.hero.headlineBottom,
        description: hero.description || DEFAULT_ABOUT_CONTENT.hero.description,
        inlineImageUrl:
          resolveMediaUrl(hero.inlineImage) ||
          legacyHero.inlineImageUrl ||
          DEFAULT_ABOUT_CONTENT.hero.inlineImageUrl,
      },
      reviews: {
        cards: reviewCards.length > 0 ? reviewCards : DEFAULT_ABOUT_CONTENT.reviews.cards,
        description: reviews.description || DEFAULT_ABOUT_CONTENT.reviews.description,
        title: reviews.title || DEFAULT_ABOUT_CONTENT.reviews.title,
      },
      realExperience: {
        cards:
          realExperienceCards.length > 0
            ? realExperienceCards.map((card) => ({
                description: card.description || '',
                title: card.title || '',
              }))
            : DEFAULT_ABOUT_CONTENT.realExperience.cards,
      },
      seo: {
        metaDescription: seo.metaDescription || DEFAULT_ABOUT_CONTENT.seo.metaDescription,
        metaTitle: seo.metaTitle || DEFAULT_ABOUT_CONTENT.seo.metaTitle,
        openGraphImage: toAbsoluteUrl(resolveMediaUrl(seo.openGraphImage)),
      },
      whoWeAre: {
        description: whoWeAre.description || DEFAULT_ABOUT_CONTENT.whoWeAre.description,
        learnMoreUrl: whoWeAre.learnMoreUrl || DEFAULT_ABOUT_CONTENT.whoWeAre.learnMoreUrl,
      },
    }
  },
  ['about-content'],
  {
    revalidate: CACHE_REVALIDATE.about,
    tags: ['about'],
  },
)

export const getAboutContent = cache(
  async (locale: BlogLocale): Promise<AboutContent> => getAboutContentCached(locale),
)
