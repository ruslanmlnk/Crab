import type { BlogLocale } from './blog-locale'

type SiteMessages = {
  about: {
    reviewsEyebrow: string
    viewFullStory: string
  }
  footer: {
    contactUs: string
    description: string
  }
  getInTouch: {
    contactUs: string
    description: string
    eyebrow: string
    title: string
  }
  header: {
    about: string
    blog: string
    contact: string
    faq: string
    language: string
  }
  home: {
    accessSuffix: string
    faqDescription: string
    faqTitleLine1: string
    faqTitleLine2: string
    fleetBackdrop: string
    getInTouchButton: string
    idealForLabel: string
    includesLabel: string
    learnMore: string
    pricingLabel: string
    purchaseNow: string
    readStories: string
    whoWeAreLabel: string
  }
}

const SITE_MESSAGES: Record<BlogLocale, SiteMessages> = {
  en: {
    about: {
      reviewsEyebrow: 'reviews',
      viewFullStory: 'View full story',
    },
    footer: {
      contactUs: 'contact us',
      description:
        'We share real offshore experience and practical knowledge about crab fishing, helping people understand life and work on Norwegian vessels',
    },
    getInTouch: {
      contactUs: 'contact us',
      description:
        'Based on real offshore experience, we help you understand what to expect, how to prepare, and how to take your first steps on fishing vessels',
      eyebrow: 'get in touch',
      title: 'Get clear guidance before working at sea',
    },
    header: {
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      faq: 'FAQ',
      language: 'Language',
    },
    home: {
      accessSuffix: '/access',
      faqDescription: 'Everything you need to know about crab fishing in Norway',
      faqTitleLine1: 'Frequently asked',
      faqTitleLine2: 'questions',
      fleetBackdrop: 'FROM THE NORWEGIAN CRAB FLEET',
      getInTouchButton: 'Get in touch',
      idealForLabel: 'Ideal for:',
      includesLabel: 'Includes:',
      learnMore: 'learn more',
      pricingLabel: 'Pricing',
      purchaseNow: 'Purchase now',
      readStories: 'Read stories',
      whoWeAreLabel: 'Who We Are',
    },
  },
  ru: {
    about: {
      reviewsEyebrow: 'отзывы',
      viewFullStory: 'Смотреть историю',
    },
    footer: {
      contactUs: 'связаться',
      description:
        'Мы делимся реальным офшорным опытом и практическими знаниями о крабовом промысле, помогая понять жизнь и работу на норвежских судах',
    },
    getInTouch: {
      contactUs: 'связаться',
      description:
        'На основе реального офшорного опыта мы помогаем понять, чего ожидать, как подготовиться и как сделать первые шаги на рыболовных судах',
      eyebrow: 'на связи',
      title: 'Получите четкий план перед работой в море',
    },
    header: {
      about: 'О нас',
      blog: 'Блог',
      contact: 'Контакты',
      faq: 'FAQ',
      language: 'Язык',
    },
    home: {
      accessSuffix: '/доступ',
      faqDescription: 'Все, что нужно знать о крабовом промысле в Норвегии',
      faqTitleLine1: 'Часто задаваемые',
      faqTitleLine2: 'вопросы',
      fleetBackdrop: 'ИЗ НОРВЕЖСКОГО КРАБОВОГО ФЛОТА',
      getInTouchButton: 'Связаться',
      idealForLabel: 'Идеально для:',
      includesLabel: 'Включает:',
      learnMore: 'узнать больше',
      pricingLabel: 'Тарифы',
      purchaseNow: 'Купить',
      readStories: 'Читать истории',
      whoWeAreLabel: 'Кто мы',
    },
  },
}

export const getSiteMessages = (locale: BlogLocale): SiteMessages => {
  return SITE_MESSAGES[locale]
}
