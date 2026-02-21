import { slugField, type CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  access: {
    create: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    defaultColumns: ['title', 'author', 'category', 'status', 'publishedAt', 'updatedAt'],
    useAsTitle: 'title',
  },
  defaultSort: '-publishedAt',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    slugField({
      localized: true,
      useAsSlug: 'title',
    }),
    {
      name: 'status',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      defaultValue: 'draft',
      index: true,
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      index: true,
      relationTo: 'blog-categories',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      index: true,
      relationTo: 'authors',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data || typeof data !== 'object') {
          return data
        }

        const postData = data as Record<string, unknown>
        const isPublished = postData.status === 'published'

        if (isPublished && !postData.publishedAt) {
          postData.publishedAt = new Date().toISOString()
        }

        return postData
      },
    ],
  },
  timestamps: true,
}
