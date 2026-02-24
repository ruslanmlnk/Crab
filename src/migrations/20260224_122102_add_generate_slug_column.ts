import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog_posts"
    ADD COLUMN IF NOT EXISTS "generate_slug" boolean DEFAULT true;

    UPDATE "blog_posts"
    SET "generate_slug" = true
    WHERE "generate_slug" IS NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog_posts"
    DROP COLUMN IF EXISTS "generate_slug";
  `)
}

