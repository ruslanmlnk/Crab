import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_blocks_community_course_card"
      ADD COLUMN IF NOT EXISTS "image_id" integer;

    DO $$ BEGIN
      ALTER TABLE "home_blocks_community_course_card"
        ADD CONSTRAINT "home_blocks_community_course_card_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "home_blocks_community_course_card_image_idx"
      ON "home_blocks_community_course_card" USING btree ("image_id");

  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_blocks_community_course_card"
      DROP CONSTRAINT IF EXISTS "home_blocks_community_course_card_image_id_media_id_fk";

    DROP INDEX IF EXISTS "home_blocks_community_course_card_image_idx";

    ALTER TABLE "home_blocks_community_course_card"
      DROP COLUMN IF EXISTS "image_id";
  `)
}
