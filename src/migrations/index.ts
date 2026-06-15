import * as migration_20260224_122102_add_generate_slug_column from './20260224_122102_add_generate_slug_column'
import * as migration_20260224_123200_fix_blog_posts_slug_schema from './20260224_123200_fix_blog_posts_slug_schema'
import * as migration_20260614_233956_community_pricing_card from './20260614_233956_community_pricing_card'
import * as migration_20260615_020500_community_course_card_block from './20260615_020500_community_course_card_block'
import * as migration_20260615_024500_community_course_card_upload from './20260615_024500_community_course_card_upload'

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
  {
    up: migration_20260614_233956_community_pricing_card.up,
    down: migration_20260614_233956_community_pricing_card.down,
    name: '20260614_233956_community_pricing_card',
  },
  {
    up: migration_20260615_020500_community_course_card_block.up,
    down: migration_20260615_020500_community_course_card_block.down,
    name: '20260615_020500_community_course_card_block',
  },
  {
    up: migration_20260615_024500_community_course_card_upload.up,
    down: migration_20260615_024500_community_course_card_upload.down,
    name: '20260615_024500_community_course_card_upload',
  },
]
