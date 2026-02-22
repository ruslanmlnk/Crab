import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
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
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'youtubeUrl',
          type: 'text',
          required: true,
        },
        {
          name: 'instagramUrl',
          type: 'text',
          required: true,
        },
        {
          name: 'telegramUrl',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
