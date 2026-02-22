import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import config from '@payload-config'
import { CACHE_REVALIDATE } from './cache'
import type { BlogLocale } from './blog-locale'

const getPayloadClient = cache(async () => getPayload({ config }))

export type FAQItem = {
  answer: string
  id: number | string
  question: string
}

const getFAQItemsCached = unstable_cache(
  async (locale: BlogLocale): Promise<FAQItem[]> => {
    const payload = await getPayloadClient()

    const faqGlobal = await payload.findGlobal({
      slug: 'faq',
      depth: 0,
      fallbackLocale: 'en',
      locale,
    })

    return (faqGlobal.items || [])
      .map((item, index) => ({
        answer: item.answer || '',
        id: item.id || `faq-item-${index}`,
        question: item.question || '',
      }))
      .filter((item) => Boolean(item.question && item.answer))
  },
  ['faq-items'],
  {
    revalidate: CACHE_REVALIDATE.faq,
    tags: ['faq'],
  },
)

export const getFAQItems = cache(
  async (locale: BlogLocale): Promise<FAQItem[]> => getFAQItemsCached(locale),
)
