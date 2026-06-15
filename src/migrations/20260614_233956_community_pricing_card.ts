import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home"
      DROP COLUMN IF EXISTS "pricing_show";

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

    UPDATE "home_pricing_plans" SET "show" = false;

    UPDATE "home"
    SET
      "pricing_community_card_show" = true,
      "pricing_community_card_image_url" = 'https://api.builder.io/api/v1/image/assets/TEMP/d23190661b06c1f8779411e42e9e4b18f717042f?width=1616',
      "pricing_community_card_course_starts_at" = '2026-06-25T19:40:45.175Z',
      "pricing_community_card_sign_up_url" = 'https://secure.wayforpay.com/button/bed2828b8d6e7';

    UPDATE "home_locales"
    SET "pricing_community_card_description" = CASE
      WHEN "_locale" = 'en' THEN 'You choose a field and are immediately matched with a mentor - a professional who has walked this path themselves. Our goal is not just to share knowledge, but to help you land your first contract, which is why we support you every step of the way: we assist with paperwork, provide up-to-date job listings, and offer practical advice on where you can actually get hired.'
      ELSE 'Ви обираєте напрям і одразу отримуєте наставника - професіонала, який сам пройшов цей шлях. Наша мета не просто поділитися знаннями, а допомогти вам отримати перший контракт. Саме тому ми підтримуємо вас на кожному етапі: допомагаємо з документами, надаємо актуальні вакансії та практичні поради щодо того, куди справді можна влаштуватися.'
    END;

    DELETE FROM "home_pricing_community_card_focus_areas";
    DELETE FROM "home_pricing_community_card_includes";

    INSERT INTO "home_pricing_community_card_focus_areas" ("_order", "_parent_id", "id")
    SELECT 1, "id", 'community-focus-1' FROM "home"
    UNION ALL SELECT 2, "id", 'community-focus-2' FROM "home"
    UNION ALL SELECT 3, "id", 'community-focus-3' FROM "home"
    UNION ALL SELECT 4, "id", 'community-focus-4' FROM "home"
    ON CONFLICT ("id") DO NOTHING;

    INSERT INTO "home_pricing_community_card_focus_areas_locales" ("text", "_locale", "_parent_id")
    VALUES
      ('Crab fishing / fishing vessels / fish processing plants (Norway, the UK, Denmark)', 'en', 'community-focus-1'),
      ('Краболовний промисел / риболовні судна / рибопереробні заводи (Норвегія, Велика Британія, Данія)', 'ru', 'community-focus-1'),
      ('Bilge pumping', 'en', 'community-focus-2'),
      ('Відкачування трюмних вод', 'ru', 'community-focus-2'),
      ('Yachting', 'en', 'community-focus-3'),
      ('Яхтинг', 'ru', 'community-focus-3'),
      ('Merchant marine', 'en', 'community-focus-4'),
      ('Торговельний флот', 'ru', 'community-focus-4')
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "text" = EXCLUDED."text";

    INSERT INTO "home_pricing_community_card_includes" ("_order", "_parent_id", "id")
    SELECT 1, "id", 'community-include-1' FROM "home"
    UNION ALL SELECT 2, "id", 'community-include-2' FROM "home"
    UNION ALL SELECT 3, "id", 'community-include-3' FROM "home"
    UNION ALL SELECT 4, "id", 'community-include-4' FROM "home"
    UNION ALL SELECT 5, "id", 'community-include-5' FROM "home"
    UNION ALL SELECT 6, "id", 'community-include-6' FROM "home"
    UNION ALL SELECT 7, "id", 'community-include-7' FROM "home"
    ON CONFLICT ("id") DO NOTHING;

    INSERT INTO "home_pricing_community_card_includes_locales" ("text", "_locale", "_parent_id")
    VALUES
      ('An assessment of your situation: where you should realistically apply', 'en', 'community-include-1'),
      ('Оцінка вашої ситуації: куди вам реально варто подаватися', 'ru', 'community-include-1'),
      ('Help with paperwork and understanding the requirements', 'en', 'community-include-2'),
      ('Допомога з документами та розумінням вимог', 'ru', 'community-include-2'),
      ('Current job openings and verified contacts', 'en', 'community-include-3'),
      ('Актуальні вакансії та перевірені контакти', 'ru', 'community-include-3'),
      ('Access to private chats and communities where offers from employers and shipowners appear', 'en', 'community-include-4'),
      ('Доступ до закритих чатів і спільнот, де з’являються пропозиції від роботодавців і судновласників', 'ru', 'community-include-4'),
      ('Direct job openings you can apply to without intermediaries', 'en', 'community-include-5'),
      ('Прямі вакансії, на які можна податися без посередників', 'ru', 'community-include-5'),
      ('Understanding which companies are reputable and which ones to avoid', 'en', 'community-include-6'),
      ('Розуміння, яким компаніям можна довіряти, а яких краще уникати', 'ru', 'community-include-6'),
      ('Support at every stage - from your first step to setting sail', 'en', 'community-include-7'),
      ('Підтримка на кожному етапі - від першого кроку до виходу в море', 'ru', 'community-include-7')
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "text" = EXCLUDED."text";

    ALTER TABLE "home"
      ALTER COLUMN "pricing_community_card_image_url" SET NOT NULL,
      ALTER COLUMN "pricing_community_card_course_starts_at" SET NOT NULL,
      ALTER COLUMN "pricing_community_card_sign_up_url" SET NOT NULL;

    ALTER TABLE "home_locales"
      ALTER COLUMN "pricing_community_card_description" SET NOT NULL;
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

    ALTER TABLE "home"
      ADD COLUMN IF NOT EXISTS "pricing_show" boolean;
  `)
}
