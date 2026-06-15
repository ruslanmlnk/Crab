import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "home_blocks_community_course_card" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "show" boolean DEFAULT true,
      "image_url" varchar NOT NULL,
      "course_starts_at" timestamp(3) with time zone NOT NULL,
      "sign_up_url" varchar NOT NULL,
      "block_name" varchar,
      CONSTRAINT "home_blocks_community_course_card_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id")
        ON DELETE cascade ON UPDATE no action
    );

    CREATE TABLE IF NOT EXISTS "home_blocks_community_course_card_locales" (
      "description" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL,
      CONSTRAINT "home_blocks_community_course_card_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_community_course_card"("id")
        ON DELETE cascade ON UPDATE no action
    );

    CREATE TABLE IF NOT EXISTS "home_blocks_community_course_card_focus_areas" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      CONSTRAINT "home_blocks_community_course_card_focus_areas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_community_course_card"("id")
        ON DELETE cascade ON UPDATE no action
    );

    CREATE TABLE IF NOT EXISTS "home_blocks_community_course_card_focus_areas_locales" (
      "text" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL,
      CONSTRAINT "home_blocks_community_course_card_focus_areas_locales_par_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_community_course_card_focus_areas"("id")
        ON DELETE cascade ON UPDATE no action
    );

    CREATE TABLE IF NOT EXISTS "home_blocks_community_course_card_includes" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      CONSTRAINT "home_blocks_community_course_card_includes_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_community_course_card"("id")
        ON DELETE cascade ON UPDATE no action
    );

    CREATE TABLE IF NOT EXISTS "home_blocks_community_course_card_includes_locales" (
      "text" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL,
      CONSTRAINT "home_blocks_community_course_card_includes_locales_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_community_course_card_includes"("id")
        ON DELETE cascade ON UPDATE no action
    );

    CREATE INDEX IF NOT EXISTS "home_blocks_community_course_card_order_idx"
      ON "home_blocks_community_course_card" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "home_blocks_community_course_card_parent_id_idx"
      ON "home_blocks_community_course_card" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "home_blocks_community_course_card_path_idx"
      ON "home_blocks_community_course_card" USING btree ("_path");
    CREATE UNIQUE INDEX IF NOT EXISTS "home_blocks_community_course_card_locales_locale_parent_id_u"
      ON "home_blocks_community_course_card_locales" USING btree ("_locale", "_parent_id");
    CREATE INDEX IF NOT EXISTS "home_blocks_community_course_card_focus_areas_order_idx"
      ON "home_blocks_community_course_card_focus_areas" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "home_blocks_community_course_card_focus_areas_parent_id_idx"
      ON "home_blocks_community_course_card_focus_areas" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "home_blocks_community_course_card_focus_areas_locales_locale"
      ON "home_blocks_community_course_card_focus_areas_locales" USING btree ("_locale", "_parent_id");
    CREATE INDEX IF NOT EXISTS "home_blocks_community_course_card_includes_order_idx"
      ON "home_blocks_community_course_card_includes" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "home_blocks_community_course_card_includes_parent_id_idx"
      ON "home_blocks_community_course_card_includes" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "home_blocks_community_course_card_includes_locales_locale_pa"
      ON "home_blocks_community_course_card_includes_locales" USING btree ("_locale", "_parent_id");

    INSERT INTO "home_blocks_community_course_card" (
      "_order",
      "_parent_id",
      "_path",
      "id",
      "show",
      "image_url",
      "course_starts_at",
      "sign_up_url"
    )
    SELECT
      1,
      "id",
      'pricing.components',
      'community-course-card-' || "id",
      COALESCE("pricing_community_card_show", true),
      "pricing_community_card_image_url",
      "pricing_community_card_course_starts_at",
      "pricing_community_card_sign_up_url"
    FROM "home"
    WHERE "pricing_community_card_image_url" IS NOT NULL
      AND "pricing_community_card_course_starts_at" IS NOT NULL
      AND "pricing_community_card_sign_up_url" IS NOT NULL
    ON CONFLICT ("id") DO UPDATE SET
      "show" = EXCLUDED."show",
      "image_url" = EXCLUDED."image_url",
      "course_starts_at" = EXCLUDED."course_starts_at",
      "sign_up_url" = EXCLUDED."sign_up_url";

    INSERT INTO "home_blocks_community_course_card_locales" (
      "description",
      "_locale",
      "_parent_id"
    )
    SELECT
      locales."pricing_community_card_description",
      locales."_locale",
      'community-course-card-' || locales."_parent_id"
    FROM "home_locales" locales
    INNER JOIN "home_blocks_community_course_card" block
      ON block."_parent_id" = locales."_parent_id"
    WHERE locales."pricing_community_card_description" IS NOT NULL
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
      "description" = EXCLUDED."description";

    INSERT INTO "home_blocks_community_course_card_focus_areas" ("_order", "_parent_id", "id")
    SELECT
      area."_order",
      'community-course-card-' || area."_parent_id",
      area."id"
    FROM "home_pricing_community_card_focus_areas" area
    INNER JOIN "home_blocks_community_course_card" block
      ON block."_parent_id" = area."_parent_id"
    ON CONFLICT ("id") DO UPDATE SET
      "_order" = EXCLUDED."_order",
      "_parent_id" = EXCLUDED."_parent_id";

    INSERT INTO "home_blocks_community_course_card_focus_areas_locales" (
      "text",
      "_locale",
      "_parent_id"
    )
    SELECT locale."text", locale."_locale", locale."_parent_id"
    FROM "home_pricing_community_card_focus_areas_locales" locale
    INNER JOIN "home_blocks_community_course_card_focus_areas" area
      ON area."id" = locale."_parent_id"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
      "text" = EXCLUDED."text";

    INSERT INTO "home_blocks_community_course_card_includes" ("_order", "_parent_id", "id")
    SELECT
      item."_order",
      'community-course-card-' || item."_parent_id",
      item."id"
    FROM "home_pricing_community_card_includes" item
    INNER JOIN "home_blocks_community_course_card" block
      ON block."_parent_id" = item."_parent_id"
    ON CONFLICT ("id") DO UPDATE SET
      "_order" = EXCLUDED."_order",
      "_parent_id" = EXCLUDED."_parent_id";

    INSERT INTO "home_blocks_community_course_card_includes_locales" (
      "text",
      "_locale",
      "_parent_id"
    )
    SELECT locale."text", locale."_locale", locale."_parent_id"
    FROM "home_pricing_community_card_includes_locales" locale
    INNER JOIN "home_blocks_community_course_card_includes" item
      ON item."id" = locale."_parent_id"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
      "text" = EXCLUDED."text";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "home_blocks_community_course_card_focus_areas_locales" CASCADE;
    DROP TABLE IF EXISTS "home_blocks_community_course_card_focus_areas" CASCADE;
    DROP TABLE IF EXISTS "home_blocks_community_course_card_includes_locales" CASCADE;
    DROP TABLE IF EXISTS "home_blocks_community_course_card_includes" CASCADE;
    DROP TABLE IF EXISTS "home_blocks_community_course_card_locales" CASCADE;
    DROP TABLE IF EXISTS "home_blocks_community_course_card" CASCADE;
  `)
}
