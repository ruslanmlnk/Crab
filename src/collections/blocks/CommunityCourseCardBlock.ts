import type { Block } from 'payload'

export const CommunityCourseCardBlock: Block = {
  slug: 'communityCourseCard',
  labels: {
    plural: 'Community course cards',
    singular: 'Community course card',
  },
  fields: [
    {
      name: 'show',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'focusAreas',
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
      name: 'includes',
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
      name: 'courseStartsAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'signUpUrl',
      type: 'text',
      required: true,
    },
  ],
}
