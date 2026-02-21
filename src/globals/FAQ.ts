import type { GlobalConfig } from 'payload'

export const FAQ: GlobalConfig = {
  slug: 'faq',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'question',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
