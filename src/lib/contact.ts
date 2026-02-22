import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import config from '@payload-config'

import type { BlogLocale } from './blog-locale'
import { CACHE_REVALIDATE } from './cache'

const getPayloadClient = cache(async () => getPayload({ config }))

export type ContactSocialLinks = {
  instagramUrl: string
  telegramUrl: string
  youtubeUrl: string
}

export type ContactContent = {
  description: string
  socialLinks: ContactSocialLinks
  title: string
}

const DEFAULT_CONTACT_CONTENT: Record<BlogLocale, ContactContent> = {
  en: {
    description:
      'Have a question or ready to plan your dive? Get in touch and we will be happy to help',
    socialLinks: {
      instagramUrl: '#',
      telegramUrl: '#',
      youtubeUrl: '#',
    },
    title: 'Contact us',
  },
  ru: {
    description:
      'Есть вопрос или готовы спланировать свой путь? Напишите нам, и мы с радостью поможем.',
    socialLinks: {
      instagramUrl: '#',
      telegramUrl: '#',
      youtubeUrl: '#',
    },
    title: 'Свяжитесь с нами',
  },
}

const getContactContentCached = unstable_cache(
  async (locale: BlogLocale): Promise<ContactContent> => {
    const payload = await getPayloadClient()
    const defaults = DEFAULT_CONTACT_CONTENT[locale]

    const contactGlobal = await payload.findGlobal({
      depth: 0,
      fallbackLocale: false,
      locale,
      slug: 'contact',
    })

    const socialLinks = contactGlobal.socialLinks || {}

    return {
      description: contactGlobal.description || defaults.description,
      socialLinks: {
        instagramUrl: socialLinks.instagramUrl || defaults.socialLinks.instagramUrl,
        telegramUrl: socialLinks.telegramUrl || defaults.socialLinks.telegramUrl,
        youtubeUrl: socialLinks.youtubeUrl || defaults.socialLinks.youtubeUrl,
      },
      title: contactGlobal.title || defaults.title,
    }
  },
  ['contact-content'],
  {
    revalidate: CACHE_REVALIDATE.contact,
    tags: ['contact'],
  },
)

export const getContactContent = cache(
  async (locale: BlogLocale): Promise<ContactContent> => getContactContentCached(locale),
)
