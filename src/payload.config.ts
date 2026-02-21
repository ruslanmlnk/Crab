import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Authors } from './collections/Authors'
import { BlogCategories } from './collections/BlogCategories'
import { BlogPosts } from './collections/BlogPosts'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { FAQ } from './globals/FAQ'
import { Home } from './globals/Home'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Authors, BlogCategories, BlogPosts],
  globals: [FAQ, Home],
  editor: lexicalEditor(),
  localization: {
    defaultLocale: 'en',
    fallback: true,
    locales: [
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'ru',
        label: 'Русский',
      },
    ],
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
