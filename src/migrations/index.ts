import * as migration_20260224_122102_add_generate_slug_column from './20260224_122102_add_generate_slug_column'
import * as migration_20260224_123200_fix_blog_posts_slug_schema from './20260224_123200_fix_blog_posts_slug_schema'

export const migrations = [
  {
    up: migration_20260224_122102_add_generate_slug_column.up,
    down: migration_20260224_122102_add_generate_slug_column.down,
    name: '20260224_122102_add_generate_slug_column',
  },
  {
    up: migration_20260224_123200_fix_blog_posts_slug_schema.up,
    down: migration_20260224_123200_fix_blog_posts_slug_schema.down,
    name: '20260224_123200_fix_blog_posts_slug_schema',
  },
]

