import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { Media } from '@/payload-types'

import type { BlogLocale } from './blog-locale'
import { CACHE_REVALIDATE } from './cache'

const getPayloadClient = cache(async () => getPayload({ config }))

const DEFAULT_HOME_CONTENT = {
  hero: {
    eyebrow: 'Inside the industry',
    headline: 'crab norway',
    supportingText: 'log of the Norwegian crab fishing industry',
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
  pricing: {
    headline: 'Pricing for every dive adventure',
    plans: [
      {
        badgeLabel: 'Employer Database',
        features: [
          '1000+ verified employer contacts (Norway, Denmark, UK, Europe)',
          'No middlemen, no fake listings - direct company contacts only',
          'Full database access (apply independently)',
        ],
        idealFor: 'People ready to take action and apply on their own',
        purchaseUrl: '#',
        image:
          'https://api.builder.io/api/v1/image/assets/TEMP/eb4e8008b9a7327b6f3e17a384db1ff4f083c0f3?width=768',
        price: '€400',
      },
      {
        badgeLabel: 'Full Support Course',
        features: [
          "Step-by-step guidance from 'I do not know where to start' to sending CVs",
          '1000+ employer contacts + training on how to find new companies yourself',
          'Professional CV tailored for fishing, crab, and offshore jobs',
          'Guidance on how to communicate with employers',
          'Personal support from me (calls + messages)',
          'Private community access (people already working in Norway)',
          '4 group Zoom calls + weekly reviews and strategy adjustments',
        ],
        idealFor: 'Those who want full guidance, feedback, and faster results',
        purchaseUrl: '#',
        image:
          'https://api.builder.io/api/v1/image/assets/TEMP/a2dd0a2b28130c4d6202529111b2d5ab43148127?width=768',
        price: '€800',
      },
    ],
  },
  fromTheFleet: {
    articleIds: [] as number[],
  },
  whatYouFind: {
    ctaUrl: '/contact',
    firstColumnText:
      'We focus on practical knowledge, firsthand experience and honest insight gained through years of working at sea - from the first contracts to real offshore conditions on Norwegian vessels.',
    headline:
      "For years, we've been documenting\nreal life and work within the Norwegian crab fishing industry",
    secondColumnText:
      'Alongside articles and interviews, we provide education and personal guidance for those who want to enter the industry prepared, avoid common mistakes and understand what this work really requires.',
    sectionTitle: "WHAT YOU'LL FIND HERE",
  },
  whoWeAre: {
    description:
      'An independent project sharing real experience and knowledge from inside the Norwegian crab fishing industry',
    learnMoreUrl: '/about',
  },
  seo: {
    metaDescription: 'Crab Norway - Inside the industry log of the Norwegian crab fishing industry',
    metaTitle: 'Crab Norway',
    openGraphImage: null as null | string,
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

export type HomeContent = typeof DEFAULT_HOME_CONTENT

const getHomeContentCached = unstable_cache(
  async (locale: BlogLocale): Promise<HomeContent> => {
    const payload = await getPayloadClient()

    const homeGlobal = await payload.findGlobal({
      slug: 'home',
      depth: 1,
      fallbackLocale: 'en',
      locale,
    })

    const seo = homeGlobal.seo || {}
    const hero = homeGlobal.hero || {}
    const whoWeAre = homeGlobal.whoWeAre || {}
    const realExperience = homeGlobal.realExperience || {}
    const pricing = homeGlobal.pricing || {}
    const fromTheFleet = homeGlobal.fromTheFleet || {}
    const whatYouFind = homeGlobal.whatYouFind || {}
    const realExperienceCards =
      realExperience.cards?.filter((card) => Boolean(card?.title && card?.description)) || []
    const pricingPlans =
      pricing.plans
        ?.map((plan, index) => {
          const features = plan.features?.map((feature) => feature.text || '').filter(Boolean) || []

          return {
            badgeLabel: plan.badgeLabel || '',
            features,
            idealFor: plan.idealFor || '',
            image:
              resolveMediaUrl(plan.image) ||
              DEFAULT_HOME_CONTENT.pricing.plans[index]?.image ||
              DEFAULT_HOME_CONTENT.pricing.plans[0].image,
            price: plan.price || '',
            purchaseUrl:
              plan.purchaseUrl ||
              DEFAULT_HOME_CONTENT.pricing.plans[index]?.purchaseUrl ||
              '#',
          }
        })
        .filter((plan) =>
          Boolean(
            plan.badgeLabel &&
            plan.price &&
            plan.purchaseUrl &&
            plan.idealFor &&
            plan.image &&
            plan.features.length > 0,
          ),
        ) || []
    const fleetArticleIds = [
      fromTheFleet.firstArticle,
      fromTheFleet.secondArticle,
      fromTheFleet.thirdArticle,
    ]
      .map((relation) => {
        if (!relation) return null
        if (typeof relation === 'number') return relation
        return typeof relation.id === 'number' ? relation.id : null
      })
      .filter((id): id is number => id !== null)

    return {
      hero: {
        eyebrow: hero.eyebrow || DEFAULT_HOME_CONTENT.hero.eyebrow,
        headline: hero.headline || DEFAULT_HOME_CONTENT.hero.headline,
        supportingText: hero.supportingText || DEFAULT_HOME_CONTENT.hero.supportingText,
      },
      realExperience: {
        cards:
          realExperienceCards.length > 0
            ? realExperienceCards.map((card) => ({
                description: card.description || '',
                title: card.title || '',
              }))
            : DEFAULT_HOME_CONTENT.realExperience.cards,
      },
      pricing: {
        headline: pricing.headline || DEFAULT_HOME_CONTENT.pricing.headline,
        plans: pricingPlans.length === 2 ? pricingPlans : DEFAULT_HOME_CONTENT.pricing.plans,
      },
      fromTheFleet: {
        articleIds:
          fleetArticleIds.length === 3
            ? fleetArticleIds
            : DEFAULT_HOME_CONTENT.fromTheFleet.articleIds,
      },
      whatYouFind: {
        ctaUrl: whatYouFind.ctaUrl || DEFAULT_HOME_CONTENT.whatYouFind.ctaUrl,
        firstColumnText:
          whatYouFind.firstColumnText || DEFAULT_HOME_CONTENT.whatYouFind.firstColumnText,
        headline: whatYouFind.headline || DEFAULT_HOME_CONTENT.whatYouFind.headline,
        secondColumnText:
          whatYouFind.secondColumnText || DEFAULT_HOME_CONTENT.whatYouFind.secondColumnText,
        sectionTitle: whatYouFind.sectionTitle || DEFAULT_HOME_CONTENT.whatYouFind.sectionTitle,
      },
      whoWeAre: {
        description: whoWeAre.description || DEFAULT_HOME_CONTENT.whoWeAre.description,
        learnMoreUrl: whoWeAre.learnMoreUrl || DEFAULT_HOME_CONTENT.whoWeAre.learnMoreUrl,
      },
      seo: {
        metaDescription: seo.metaDescription || DEFAULT_HOME_CONTENT.seo.metaDescription,
        metaTitle: seo.metaTitle || DEFAULT_HOME_CONTENT.seo.metaTitle,
        openGraphImage: toAbsoluteUrl(resolveMediaUrl(seo.openGraphImage)),
      },
    }
  },
  ['home-content'],
  {
    revalidate: CACHE_REVALIDATE.home,
    tags: ['home'],
  },
)

export const getHomeContent = cache(
  async (locale: BlogLocale): Promise<HomeContent> => getHomeContentCached(locale),
)


