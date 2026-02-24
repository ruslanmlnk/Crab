import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog_posts"
    ADD COLUMN IF NOT EXISTS "slug" varchar;

    ALTER TABLE "blog_posts"
    ADD COLUMN IF NOT EXISTS "generate_slug" boolean DEFAULT true;

    UPDATE "blog_posts"
    SET "generate_slug" = true
    WHERE "generate_slug" IS NULL;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'blog_posts_locales'
          AND column_name = 'slug'
      ) THEN
        UPDATE "blog_posts" bp
        SET "slug" = source."slug"
        FROM (
          SELECT DISTINCT ON ("_parent_id")
            "_parent_id",
            "slug"
          FROM "blog_posts_locales"
          WHERE "slug" IS NOT NULL
            AND btrim("slug") <> ''
          ORDER BY
            "_parent_id",
            CASE "_locale"::text
              WHEN 'ru' THEN 0
              WHEN 'en' THEN 1
              ELSE 2
            END
        ) source
        WHERE bp."id" = source."_parent_id"
          AND (bp."slug" IS NULL OR btrim(bp."slug") = '');
      END IF;
    END
    $$;

    UPDATE "blog_posts"
    SET "slug" = 'post-' || "id"::text
    WHERE "slug" IS NULL
      OR btrim("slug") = '';

    WITH ranked AS (
      SELECT
        "id",
        row_number() OVER (PARTITION BY "slug" ORDER BY "id") AS row_num
      FROM "blog_posts"
    )
    UPDATE "blog_posts" bp
    SET "slug" = bp."slug" || '-' || bp."id"::text
    FROM ranked
    WHERE bp."id" = ranked."id"
      AND ranked.row_num > 1;

    ALTER TABLE "blog_posts"
    ALTER COLUMN "slug" SET NOT NULL;

    DROP INDEX IF EXISTS "blog_posts_slug_idx";
    CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");

    ALTER TABLE "blog_posts_locales"
    DROP COLUMN IF EXISTS "slug" CASCADE;

    ALTER TABLE "blog_posts_locales"
    DROP COLUMN IF EXISTS "generate_slug" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog_posts_locales"
    ADD COLUMN IF NOT EXISTS "slug" varchar;

    ALTER TABLE "blog_posts_locales"
    ADD COLUMN IF NOT EXISTS "generate_slug" boolean DEFAULT true;

    UPDATE "blog_posts_locales" locales
    SET "slug" = posts."slug"
    FROM "blog_posts" posts
    WHERE locales."_parent_id" = posts."id"
      AND (locales."slug" IS NULL OR btrim(locales."slug") = '');

    DROP INDEX IF EXISTS "blog_posts_slug_idx";

    ALTER TABLE "blog_posts"
    DROP COLUMN IF EXISTS "slug" CASCADE;

    ALTER TABLE "blog_posts"
    DROP COLUMN IF EXISTS "generate_slug";
  `)
}

