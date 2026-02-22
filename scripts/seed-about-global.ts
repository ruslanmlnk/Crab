import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const TRANSLATE_ENDPOINT = 'https://translate.googleapis.com/translate_a/single'

const translationCache = new Map<string, string>()

const ABOUT_SOURCE_EN = {
  hero: {
    description:
      'A real journey through offshore work, fishing vessels, and life at sea',
    headlineAfterImage: 'in Africa',
    headlineBeforeImage: 'From cadet',
    headlineBottom: 'to fisherman in Norway',
    inlineImageSourceUrl:
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
  },
  whoWeAre: {
    description:
      'An independent project sharing real experience and knowledge from inside the Norwegian crab fishing industry',
    learnMoreUrl: '/about',
  },
}

const toRelationId = (value: unknown): null | number => {
  if (typeof value === 'number') return value
  if (!value || typeof value !== 'object') return null

  const relation = value as { id?: unknown }
  return typeof relation.id === 'number' ? relation.id : null
}

const translateText = async (text: string): Promise<string> => {
  const normalized = text.trim()

  if (!normalized) {
    return text
  }

  const cacheKey = `ru:${normalized}`
  const cached = translationCache.get(cacheKey)
  if (cached) {
    return cached
  }

  const url = `${TRANSLATE_ENDPOINT}?client=gtx&sl=en&tl=ru&dt=t&q=${encodeURIComponent(
    normalized,
  )}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Translation request failed with status ${response.status}`)
  }

  const payload = (await response.json()) as unknown
  const segments = Array.isArray(payload) && Array.isArray(payload[0]) ? payload[0] : []
  const translated = segments
    .map((segment) => (Array.isArray(segment) ? String(segment[0] || '') : ''))
    .join('')
    .trim()

  const result = translated || normalized
  translationCache.set(cacheKey, result)
  return result
}

const resolveOpenGraphImageId = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<number> => {
  const homeEn = await payload.findGlobal({
    slug: 'home',
    depth: 0,
    fallbackLocale: false,
    locale: 'en',
  })

  const relationFromHome = toRelationId(homeEn.seo?.openGraphImage)
  if (relationFromHome) {
    return relationFromHome
  }

  const media = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1,
    sort: '-createdAt',
  })

  const firstMedia = media.docs[0]
  if (firstMedia?.id) {
    return firstMedia.id
  }

  throw new Error('Unable to resolve openGraphImage. Add media and try again.')
}

const resolveHeroInlineImageId = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  sourceUrl: string,
  fallbackId: number,
): Promise<number> => {
  const sourceFileName = sourceUrl.split('/').pop() || ''

  const candidates = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 50,
    sort: '-createdAt',
  })

  const exactByUrl = candidates.docs.find((mediaDoc) => mediaDoc.url === sourceUrl)
  if (exactByUrl?.id) {
    return exactByUrl.id
  }

  const byName = candidates.docs.find((mediaDoc) => {
    const filename = mediaDoc.filename || ''
    return Boolean(sourceFileName && filename && sourceFileName.includes(filename))
  })
  if (byName?.id) {
    return byName.id
  }

  return fallbackId
}

const run = async () => {
  const payload = await getPayload({ config })
  const openGraphImageId = await resolveOpenGraphImageId(payload)
  const heroInlineImageId = await resolveHeroInlineImageId(
    payload,
    ABOUT_SOURCE_EN.hero.inlineImageSourceUrl,
    openGraphImageId,
  )

  const aboutEnData = {
    hero: {
      description: ABOUT_SOURCE_EN.hero.description,
      headlineAfterImage: ABOUT_SOURCE_EN.hero.headlineAfterImage,
      headlineBeforeImage: ABOUT_SOURCE_EN.hero.headlineBeforeImage,
      headlineBottom: ABOUT_SOURCE_EN.hero.headlineBottom,
      inlineImage: heroInlineImageId,
    },
    realExperience: ABOUT_SOURCE_EN.realExperience,
    reviews: ABOUT_SOURCE_EN.reviews,
    seo: {
      metaDescription: ABOUT_SOURCE_EN.seo.metaDescription,
      metaTitle: ABOUT_SOURCE_EN.seo.metaTitle,
      openGraphImage: openGraphImageId,
    },
    whoWeAre: ABOUT_SOURCE_EN.whoWeAre,
  }

  await payload.updateGlobal({
    slug: 'about',
    data: aboutEnData,
    depth: 0,
    locale: 'en',
  })

  const aboutRuData = {
    hero: {
      description: await translateText(ABOUT_SOURCE_EN.hero.description),
      headlineAfterImage: await translateText(ABOUT_SOURCE_EN.hero.headlineAfterImage),
      headlineBeforeImage: await translateText(ABOUT_SOURCE_EN.hero.headlineBeforeImage),
      headlineBottom: await translateText(ABOUT_SOURCE_EN.hero.headlineBottom),
      inlineImage: heroInlineImageId,
    },
    realExperience: {
      cards: await Promise.all(
        ABOUT_SOURCE_EN.realExperience.cards.map(async (card) => ({
          description: await translateText(card.description),
          title: await translateText(card.title),
        })),
      ),
    },
    reviews: {
      cards: await Promise.all(
        ABOUT_SOURCE_EN.reviews.cards.map(async (card) => ({
          location: card.location ? await translateText(card.location) : '',
          name: card.name,
          review: await translateText(card.review),
          storyUrl: card.storyUrl,
        })),
      ),
      description: await translateText(ABOUT_SOURCE_EN.reviews.description),
      title: await translateText(ABOUT_SOURCE_EN.reviews.title),
    },
    seo: {
      metaDescription: await translateText(ABOUT_SOURCE_EN.seo.metaDescription),
      metaTitle: await translateText(ABOUT_SOURCE_EN.seo.metaTitle),
      openGraphImage: openGraphImageId,
    },
    whoWeAre: {
      description: await translateText(ABOUT_SOURCE_EN.whoWeAre.description),
      learnMoreUrl: ABOUT_SOURCE_EN.whoWeAre.learnMoreUrl,
    },
  }

  await payload.updateGlobal({
    slug: 'about',
    data: aboutRuData,
    depth: 0,
    locale: 'ru',
  })

  console.log('About global seeded for EN and translated to RU successfully.')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
