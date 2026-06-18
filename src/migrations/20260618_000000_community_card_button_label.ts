import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_blocks_community_course_card_locales"
      ADD COLUMN IF NOT EXISTS "sign_up_label" varchar;

    UPDATE "home_blocks_community_course_card_locales"
    SET "sign_up_label" = CASE
      WHEN "_locale" = 'en' THEN 'sign up for the course'
      ELSE 'записатися на курс'
    END
    WHERE "sign_up_label" IS NULL;

    ALTER TABLE "home_blocks_community_course_card_locales"
      ALTER COLUMN "sign_up_label" SET NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_blocks_community_course_card_locales"
      DROP COLUMN IF EXISTS "sign_up_label";
  `)
}
