import type { GlobalConfig } from 'payload'

import { CommunityCourseCardBlock } from '@/collections/blocks/CommunityCourseCardBlock'
import { isYouTubeURL } from '@/lib/youtube'

export const Home: GlobalConfig = {
  slug: 'home',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'openGraphImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'headline',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'supportingText',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'whoWeAre',
      type: 'group',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'learnMoreUrl',
          type: 'text',
          defaultValue: '/about',
          required: true,
        },
      ],
    },
    {
      name: 'amore',
      type: 'group',
      label: 'AMORE section',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          localized: true,
          defaultValue: 'AMORE',
          required: true,
        },
        {
          name: 'headline',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'videoPoster',
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
        {
          name: 'firstColumnText',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'secondColumnText',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'ctaUrl',
          type: 'text',
          defaultValue: '/contact',
          required: true,
        },
      ],
    },
    {
      name: 'realExperience',
      type: 'group',
      fields: [
        {
          name: 'cards',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'whatYouFind',
      type: 'group',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'headline',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'firstColumnText',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'secondColumnText',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'ctaUrl',
          type: 'text',
          defaultValue: '/contact',
          required: true,
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'plans',
          type: 'array',
          maxRows: 2,
          minRows: 2,
          required: true,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'show',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'badgeLabel',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'price',
              type: 'text',
              required: true,
            },
            {
              name: 'purchaseUrl',
              type: 'text',
              defaultValue: '#',
              required: true,
            },
            {
              name: 'features',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  localized: true,
                  required: true,
                },
              ],
            },
            {
              name: 'idealFor',
              type: 'textarea',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'components',
          type: 'blocks',
          blocks: [CommunityCourseCardBlock],
          maxRows: 1,
        },
      ],
    },
    {
      name: 'fromTheFleet',
      type: 'group',
      fields: [
        {
          name: 'firstArticle',
          type: 'relationship',
          relationTo: 'blog-posts',
          required: true,
          filterOptions: {
            status: {
              equals: 'published',
            },
          },
        },
        {
          name: 'secondArticle',
          type: 'relationship',
          relationTo: 'blog-posts',
          required: true,
          filterOptions: {
            status: {
              equals: 'published',
            },
          },
        },
        {
          name: 'thirdArticle',
          type: 'relationship',
          relationTo: 'blog-posts',
          required: true,
          filterOptions: {
            status: {
              equals: 'published',
            },
          },
        },
      ],
    },
  ],
}
