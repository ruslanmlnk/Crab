import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_pricing_plans"
      ADD COLUMN IF NOT EXISTS "show" boolean DEFAULT true;

    ALTER TABLE "home"
      ADD COLUMN IF NOT EXISTS "pricing_community_card_show" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "pricing_community_card_image_url" varchar,
      ADD COLUMN IF NOT EXISTS "pricing_community_card_course_starts_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "pricing_community_card_sign_up_url" varchar;

    ALTER TABLE "home_locales"
      ADD COLUMN IF NOT EXISTS "pricing_community_card_description" varchar;

    CREATE TABLE IF NOT EXISTS "home_pricing_community_card_focus_areas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      CONSTRAINT "home_pricing_community_card_focus_areas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id")
        ON DELETE cascade ON UPDATE no action
    );

    CREATE TABLE IF NOT EXISTS "home_pricing_community_card_focus_areas_locales" (
      "text" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL,
      CONSTRAINT "home_pricing_community_card_focus_areas_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."home_pricing_community_card_focus_areas"("id")
        ON DELETE cascade ON UPDATE no action
    );

    CREATE TABLE IF NOT EXISTS "home_pricing_community_card_includes" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      CONSTRAINT "home_pricing_community_card_includes_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id")
        ON DELETE cascade ON UPDATE no action
    );

    CREATE TABLE IF NOT EXISTS "home_pricing_community_card_includes_locales" (
      "text" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL,
      CONSTRAINT "home_pricing_community_card_includes_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."home_pricing_community_card_includes"("id")
        ON DELETE cascade ON UPDATE no action
    );

    CREATE INDEX IF NOT EXISTS "home_pricing_community_card_focus_areas_order_idx"
      ON "home_pricing_community_card_focus_areas" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "home_pricing_community_card_focus_areas_parent_id_idx"
      ON "home_pricing_community_card_focus_areas" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "home_pricing_community_card_focus_areas_locales_locale_parent_unique"
      ON "home_pricing_community_card_focus_areas_locales" USING btree ("_locale", "_parent_id");

    CREATE INDEX IF NOT EXISTS "home_pricing_community_card_includes_order_idx"
      ON "home_pricing_community_card_includes" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "home_pricing_community_card_includes_parent_id_idx"
      ON "home_pricing_community_card_includes" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "home_pricing_community_card_includes_locales_locale_parent_unique"
      ON "home_pricing_community_card_includes_locales" USING btree ("_locale", "_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "home_pricing_community_card_focus_areas_locales" CASCADE;
    DROP TABLE IF EXISTS "home_pricing_community_card_focus_areas" CASCADE;
    DROP TABLE IF EXISTS "home_pricing_community_card_includes_locales" CASCADE;
    DROP TABLE IF EXISTS "home_pricing_community_card_includes" CASCADE;

    ALTER TABLE "home_locales"
      DROP COLUMN IF EXISTS "pricing_community_card_description";

    ALTER TABLE "home"
      DROP COLUMN IF EXISTS "pricing_community_card_show",
      DROP COLUMN IF EXISTS "pricing_community_card_image_url",
      DROP COLUMN IF EXISTS "pricing_community_card_course_starts_at",
      DROP COLUMN IF EXISTS "pricing_community_card_sign_up_url";

    ALTER TABLE "home_pricing_plans"
      DROP COLUMN IF EXISTS "show";
  `)
}
