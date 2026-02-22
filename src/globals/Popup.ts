import type { GlobalConfig } from 'payload'

import { isYouTubeURL } from '@/lib/youtube'

export const Popup: GlobalConfig = {
  slug: 'popup',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube URL',
      required: true,
      admin: {
        placeholder: 'https://www.youtube.com/watch?v=...',
      },
      validate: (value: unknown) => {
        if (typeof value !== 'string' || value.trim().length === 0) {
          return 'YouTube URL is required.'
        }

        return isYouTubeURL(value) || 'Please enter a valid YouTube URL.'
      },
    },
  ],
}
