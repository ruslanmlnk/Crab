import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

type TranslateTarget = {
  to: 'ru'
}

const TRANSLATE_ENDPOINT = 'https://translate.googleapis.com/translate_a/single'

const translationCache = new Map<string, string>()

const fetchWithTimeout = async (url: string, timeoutMs = 20000): Promise<Response> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

const getLocalizedValue = (value: unknown): string => {
  if (typeof value === 'string') {
    return value
  }

  if (value && typeof value === 'object') {
    const localized = value as Record<string, unknown>
    const fromEn = localized.en
    const fromRu = localized.ru

    if (typeof fromEn === 'string' && fromEn.trim()) {
      return fromEn
    }

    if (typeof fromRu === 'string' && fromRu.trim()) {
      return fromRu
    }

    const firstString = Object.values(localized).find(
      (entry) => typeof entry === 'string' && entry.trim(),
    )

    if (typeof firstString === 'string') {
      return firstString
    }
  }

  return ''
}

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

  let response: Response | null = null
  let lastError: unknown

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      response = await fetchWithTimeout(url)
      break
    } catch (error) {
      lastError = error
    }
  }

  if (!response) {
    throw lastError instanceof Error ? lastError : new Error('Translation request failed')
  }

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

  const homeAll = await payload.findGlobal({
    slug: 'home',
    depth: 1,
    fallbackLocale: false,
    locale: 'all',
  })

  const hero = homeAll.hero || {}
  const seo = homeAll.seo || {}
  const whoWeAre = homeAll.whoWeAre || {}
  const realExperience = homeAll.realExperience || {}
  const whatYouFind = homeAll.whatYouFind || {}
  const pricing = homeAll.pricing || {}
  const fromTheFleet = homeAll.fromTheFleet || {}

  const realExperienceCards = await Promise.all(
    (realExperience.cards || []).map(async (card) => ({
      description: await translateText(getLocalizedValue(card.description), { to: 'ru' }),
      title: await translateText(getLocalizedValue(card.title), { to: 'ru' }),
    })),
  )

  const pricingPlans = await Promise.all(
    (pricing.plans || []).map(async (plan) => ({
      badgeLabel: await translateText(getLocalizedValue(plan.badgeLabel), { to: 'ru' }),
      features: await Promise.all(
        (plan.features || []).map(async (feature) => ({
          text: await translateText(getLocalizedValue(feature.text), { to: 'ru' }),
        })),
      ),
      idealFor: await translateText(getLocalizedValue(plan.idealFor), { to: 'ru' }),
      image: plan.image,
      price: plan.price,
      purchaseUrl: plan.purchaseUrl,
    })),
  )

  const data = {
    fromTheFleet: {
      firstArticle: fromTheFleet.firstArticle,
      secondArticle: fromTheFleet.secondArticle,
      thirdArticle: fromTheFleet.thirdArticle,
    },
    hero: {
      eyebrow: await translateText(getLocalizedValue(hero.eyebrow), { to: 'ru' }),
      headline: await translateText(getLocalizedValue(hero.headline), { to: 'ru' }),
      supportingText: await translateText(getLocalizedValue(hero.supportingText), { to: 'ru' }),
    },
    pricing: {
      headline: await translateText(getLocalizedValue(pricing.headline), { to: 'ru' }),
      plans: pricingPlans,
    },
    realExperience: {
      cards: realExperienceCards,
    },
    seo: {
      metaDescription: await translateText(getLocalizedValue(seo.metaDescription), { to: 'ru' }),
      metaTitle: await translateText(getLocalizedValue(seo.metaTitle), { to: 'ru' }),
      openGraphImage: seo.openGraphImage,
    },
    whatYouFind: {
      ctaUrl: whatYouFind.ctaUrl,
      firstColumnText: await translateText(getLocalizedValue(whatYouFind.firstColumnText), {
        to: 'ru',
      }),
      headline: await translateText(getLocalizedValue(whatYouFind.headline), { to: 'ru' }),
      secondColumnText: await translateText(getLocalizedValue(whatYouFind.secondColumnText), {
        to: 'ru',
      }),
      sectionTitle: await translateText(getLocalizedValue(whatYouFind.sectionTitle), { to: 'ru' }),
    },
    whoWeAre: {
      description: await translateText(getLocalizedValue(whoWeAre.description), { to: 'ru' }),
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
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
