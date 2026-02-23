import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { Popup, Media } from '@/payload-types'
import { CACHE_REVALIDATE } from './cache'

const getPayloadClient = cache(async () => getPayload({ config }))

export type PopupData = {
  posterUrl: string | null
  youtubeUrl: string | null
}

const resolveMediaUrl = (media: Media | null | number | string | undefined): string | null => {
  if (!media || typeof media === 'number' || typeof media === 'string') {
    return null
  }
  return media.url ?? null
}

const getPopupDataCached = unstable_cache(
  async (): Promise<PopupData> => {
    const payload = await getPayloadClient()

    try {
      const popupGlobal = await payload.findGlobal({
        slug: 'popup',
        depth: 1,
      })

      return {
        posterUrl: resolveMediaUrl(popupGlobal.poster as Media),
        youtubeUrl: popupGlobal.youtubeUrl || null,
      }
    } catch (error) {
      console.error('Error fetching popup global:', error)
      return {
        posterUrl: null,
        youtubeUrl: null,
      }
    }
  },
  ['popup-data'],
  {
    revalidate: CACHE_REVALIDATE.popup,
    tags: ['popup'],
  },
)

export const getPopupData = cache(async (): Promise<PopupData> => getPopupDataCached())
