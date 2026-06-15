import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home"
      ALTER COLUMN "pricing_community_card_image_url" DROP NOT NULL,
      ALTER COLUMN "pricing_community_card_course_starts_at" DROP NOT NULL,
      ALTER COLUMN "pricing_community_card_sign_up_url" DROP NOT NULL;

    ALTER TABLE "home_locales"
      ALTER COLUMN "pricing_community_card_description" DROP NOT NULL;

    ALTER TABLE "home_blocks_community_course_card"
      ALTER COLUMN "image_url" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "home"
    SET
      "pricing_community_card_image_url" = COALESCE("pricing_community_card_image_url", ''),
      "pricing_community_card_course_starts_at" = COALESCE("pricing_community_card_course_starts_at", now()),
      "pricing_community_card_sign_up_url" = COALESCE("pricing_community_card_sign_up_url", '#');

    UPDATE "home_locales"
    SET "pricing_community_card_description" = COALESCE("pricing_community_card_description", '');

    UPDATE "home_blocks_community_course_card"
    SET "image_url" = COALESCE("image_url", '');

    ALTER TABLE "home"
      ALTER COLUMN "pricing_community_card_image_url" SET NOT NULL,
      ALTER COLUMN "pricing_community_card_course_starts_at" SET NOT NULL,
      ALTER COLUMN "pricing_community_card_sign_up_url" SET NOT NULL;

    ALTER TABLE "home_locales"
      ALTER COLUMN "pricing_community_card_description" SET NOT NULL;

    ALTER TABLE "home_blocks_community_course_card"
      ALTER COLUMN "image_url" SET NOT NULL;
  `)
}
