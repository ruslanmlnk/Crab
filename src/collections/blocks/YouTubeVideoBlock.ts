import type { Block } from 'payload'

import { isYouTubeURL } from '@/lib/youtube'

export const YouTubeVideoBlock: Block = {
  slug: 'youtubeVideo',
  labels: {
    plural: 'YouTube videos',
    singular: 'YouTube video',
  },
  fields: [
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
