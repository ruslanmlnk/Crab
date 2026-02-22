import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
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
          name: 'headlineBeforeImage',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'inlineImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'headlineAfterImage',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'headlineBottom',
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
      name: 'reviews',
      type: 'group',
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
        {
          name: 'cards',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'location',
              type: 'text',
              localized: true,
              required: false,
            },
            {
              name: 'review',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'storyUrl',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
