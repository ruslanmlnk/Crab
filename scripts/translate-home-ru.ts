import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

type TranslateTarget = {
  to: 'ru'
}

const TRANSLATE_ENDPOINT = 'https://translate.googleapis.com/translate_a/single'

const translationCache = new Map<string, string>()

const translateText = async (text: string, target: TranslateTarget): Promise<string> => {
  const normalized = text.trim()

  if (!normalized) {
    return text
  }

  const cacheKey = `${target.to}:${normalized}`
  const cached = translationCache.get(cacheKey)

  if (cached) {
    return cached
  }

  const url = `${TRANSLATE_ENDPOINT}?client=gtx&sl=en&tl=${target.to}&dt=t&q=${encodeURIComponent(
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

const run = async () => {
  const payload = await getPayload({ config })

  const homeEn = await payload.findGlobal({
    slug: 'home',
    depth: 1,
    fallbackLocale: false,
    locale: 'en',
  })

  const hero = homeEn.hero || {}
  const seo = homeEn.seo || {}
  const whoWeAre = homeEn.whoWeAre || {}
  const realExperience = homeEn.realExperience || {}
  const whatYouFind = homeEn.whatYouFind || {}
  const pricing = homeEn.pricing || {}
  const fromTheFleet = homeEn.fromTheFleet || {}

  const realExperienceCards = await Promise.all(
    (realExperience.cards || []).map(async (card) => ({
      description: await translateText(card.description || '', { to: 'ru' }),
      title: await translateText(card.title || '', { to: 'ru' }),
    })),
  )

  const pricingPlans = await Promise.all(
    (pricing.plans || []).map(async (plan) => ({
      badgeLabel: await translateText(plan.badgeLabel || '', { to: 'ru' }),
      features: await Promise.all(
        (plan.features || []).map(async (feature) => ({
          text: await translateText(feature.text || '', { to: 'ru' }),
        })),
      ),
      idealFor: await translateText(plan.idealFor || '', { to: 'ru' }),
      image: plan.image,
      price: plan.price,
    })),
  )

  const data = {
    fromTheFleet: {
      firstArticle: fromTheFleet.firstArticle,
      secondArticle: fromTheFleet.secondArticle,
      thirdArticle: fromTheFleet.thirdArticle,
    },
    hero: {
      eyebrow: await translateText(hero.eyebrow || '', { to: 'ru' }),
      headline: await translateText(hero.headline || '', { to: 'ru' }),
      supportingText: await translateText(hero.supportingText || '', { to: 'ru' }),
    },
    pricing: {
      headline: await translateText(pricing.headline || '', { to: 'ru' }),
      plans: pricingPlans,
    },
    realExperience: {
      cards: realExperienceCards,
    },
    seo: {
      metaDescription: await translateText(seo.metaDescription || '', { to: 'ru' }),
      metaTitle: await translateText(seo.metaTitle || '', { to: 'ru' }),
      openGraphImage: seo.openGraphImage,
    },
    whatYouFind: {
      ctaUrl: whatYouFind.ctaUrl,
      firstColumnText: await translateText(whatYouFind.firstColumnText || '', {
        to: 'ru',
      }),
      headline: await translateText(whatYouFind.headline || '', { to: 'ru' }),
      secondColumnText: await translateText(whatYouFind.secondColumnText || '', {
        to: 'ru',
      }),
      sectionTitle: await translateText(whatYouFind.sectionTitle || '', { to: 'ru' }),
    },
    whoWeAre: {
      description: await translateText(whoWeAre.description || '', { to: 'ru' }),
      learnMoreUrl: whoWeAre.learnMoreUrl,
    },
  }

  await payload.updateGlobal({
    slug: 'home',
    data,
    depth: 0,
    locale: 'ru',
  })

  console.log('Home global translated from EN to RU successfully.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
