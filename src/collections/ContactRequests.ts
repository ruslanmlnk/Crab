import type { CollectionConfig } from 'payload'

export const ContactRequests: CollectionConfig = {
  slug: 'contact-requests',
  access: {
    create: () => false,
    delete: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    defaultColumns: ['fullName', 'email', 'phoneNumber', 'status', 'createdAt'],
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: false,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'locale',
      type: 'select',
      options: [
        {
          label: 'English',
          value: 'en',
        },
        {
          label: 'Russian',
          value: 'ru',
        },
      ],
      required: true,
    },
    {
      name: 'sourcePath',
      type: 'text',
      required: false,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Progress',
          value: 'in_progress',
        },
        {
          label: 'Resolved',
          value: 'resolved',
        },
      ],
      required: true,
    },
  ],
  timestamps: true,
}
