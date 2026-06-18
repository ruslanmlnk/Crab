import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "home_blocks_community_course_card_locales"
    SET
      "description" = 'Вы выбираете направление и сразу получаете наставника - профессионала, который сам прошел этот путь. Наша цель не просто поделиться знаниями, а помочь вам получить первый контракт. Именно поэтому мы поддерживаем вас на каждом этапе: помогаем с документами, даем актуальные вакансии и практические советы о том, куда действительно можно устроиться.',
      "sign_up_label" = 'записаться на курс'
    WHERE "_locale" = 'ru';

    UPDATE "home_blocks_community_course_card_focus_areas_locales" locales
    SET "text" = CASE area."_order"
      WHEN 1 THEN 'Крабовый промысел / рыболовные суда / рыбоперерабатывающие заводы (Норвегия, Великобритания, Дания)'
      WHEN 2 THEN 'Откачка трюмных вод'
      WHEN 3 THEN 'Яхтинг'
      WHEN 4 THEN 'Торговый флот'
      ELSE locales."text"
    END
    FROM "home_blocks_community_course_card_focus_areas" area
    WHERE locales."_parent_id" = area."id"
      AND locales."_locale" = 'ru';

    UPDATE "home_blocks_community_course_card_includes_locales" locales
    SET "text" = CASE item."_order"
      WHEN 1 THEN 'Оценка вашей ситуации: куда вам реально стоит подаваться'
      WHEN 2 THEN 'Помощь с документами и пониманием требований'
      WHEN 3 THEN 'Актуальные вакансии и проверенные контакты'
      WHEN 4 THEN 'Доступ к закрытым чатам и сообществам, где появляются предложения от работодателей и судовладельцев'
      WHEN 5 THEN 'Прямые вакансии, на которые можно податься без посредников'
      WHEN 6 THEN 'Понимание, каким компаниям можно доверять, а каких лучше избегать'
      WHEN 7 THEN 'Поддержка на каждом этапе - от первого шага до выхода в море'
      ELSE locales."text"
    END
    FROM "home_blocks_community_course_card_includes" item
    WHERE locales."_parent_id" = item."id"
      AND locales."_locale" = 'ru';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    SELECT 1;
  `)
}
