'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { DEFAULT_BLOG_LOCALE, withBlogLocale, type BlogLocale } from '@/lib/blog-locale'
import { getSiteMessages } from '@/lib/site-locale'

import { DecorativeLines } from './DecorativeLines'

export type PricingPlan = {
  show?: boolean
  badgeLabel: string
  features: string[]
  idealFor: string
  image: string
  price: string
  purchaseUrl: string
}

export type CommunityPricingCard = {
  courseStartsAt: string
  description: string
  focusAreas: string[]
  imageUrl: string
  includes: string[]
  show?: boolean
  signUpUrl: string
}

type PricingProps = {
  communityCard?: CommunityPricingCard
  headline?: string
  locale?: BlogLocale
  plans?: PricingPlan[]
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
    show: true,
    badgeLabel: 'Employer Database',
    features: [
      '1000+ verified employer contacts (Norway, Denmark, UK, Europe)',
      'No middlemen, no fake listings - direct company contacts only',
      'Full database access (apply independently)',
    ],
    idealFor: 'People ready to take action and apply on their own',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/eb4e8008b9a7327b6f3e17a384db1ff4f083c0f3?width=768',
    price: 'EUR 400',
    purchaseUrl: '#',
  },
  {
    show: true,
    badgeLabel: 'Full Support Course',
    features: [
      "Step-by-step guidance from 'I do not know where to start' to sending CVs",
      '1000+ employer contacts + training on how to find new companies yourself',
      'Professional CV tailored for fishing, crab, and offshore jobs',
      'Guidance on how to communicate with employers',
      'Personal support from me (calls + messages)',
      'Private community access (people already working in Norway)',
      '4 group Zoom calls + weekly reviews and strategy adjustments',
    ],
    idealFor: 'Those who want full guidance, feedback, and faster results',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/a2dd0a2b28130c4d6202529111b2d5ab43148127?width=768',
    price: 'EUR 800',
    purchaseUrl: '#',
  },
]

const isExternalUrl = (value: string) =>
  value.startsWith('http://') ||
  value.startsWith('https://') ||
  value.startsWith('mailto:') ||
  value.startsWith('tel:')

const ArrowIcon = () => (
  <svg
    className="h-6 w-6 transition-transform group-hover/btn:translate-x-1"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z"
      className="fill-blue-dark transition-colors group-hover/btn:fill-white"
    />
  </svg>
)

const StopwatchIcon = () => (
  <svg className="h-[50px] w-[50px] shrink-0" viewBox="0 0 50 50" fill="none">
    <path
      d="M40.145 14.884 43.139 11.89l-2.946-2.947-3.202 3.203a20.7 20.7 0 0 0-9.908-3.709V4.167h4.166V0h-12.5v4.167h4.167v4.27a20.7 20.7 0 0 0-9.908 3.709L9.806 8.943 6.86 11.89l2.994 2.994A20.83 20.83 0 1 0 40.145 14.884ZM25 45.833a16.667 16.667 0 1 1 0-33.333 16.667 16.667 0 0 1 0 33.333Z"
      fill="#071A26"
    />
    <path d="M25 16.667v12.5H12.5A12.5 12.5 0 1 0 25 16.667Z" fill="#071A26" />
  </svg>
)

const CommunityCard: React.FC<{
  card: CommunityPricingCard
  locale: BlogLocale
}> = ({ card, locale }) => {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0 })
  const isUkrainian = locale === 'ru'

  useEffect(() => {
    const updateRemaining = () => {
      const difference = Math.max(0, new Date(card.courseStartsAt).getTime() - Date.now())

      setRemaining({
        days: Math.floor(difference / 86_400_000),
        hours: Math.floor((difference / 3_600_000) % 24),
        minutes: Math.floor((difference / 60_000) % 60),
      })
    }

    updateRemaining()
    const interval = window.setInterval(updateRemaining, 60_000)

    return () => window.clearInterval(interval)
  }, [card.courseStartsAt])

  const labels = isUkrainian
    ? {
        days: 'днів',
        focus: 'Спільнота має чотири основні напрями:',
        hours: 'годин',
        includes: 'Включає:',
        minutes: 'хвилин',
        signUp: 'записатися на курс',
        starts: 'Наступний курс починається через:',
      }
    : {
        days: 'days',
        focus: 'The community has four main areas of focus:',
        hours: 'hours',
        includes: 'Includes:',
        minutes: 'minutes',
        signUp: 'sign up for the course',
        starts: 'The next course starts in:',
      }

  const buttonClasses =
    'group/btn flex w-full items-center justify-center gap-2 rounded-full border border-blue-dark px-6 py-[11px] transition-colors hover:bg-blue-dark'
  const buttonContent = (
    <>
      <span className="flex flex-col items-start">
        <span className="text-base font-semibold lowercase leading-[145%] text-blue-dark transition-colors group-hover/btn:text-white">
          {labels.signUp}
        </span>
        <span className="h-px w-full bg-blue-dark transition-colors group-hover/btn:bg-white" />
      </span>
      <ArrowIcon />
    </>
  )

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.8, ease: 'easeOut' } as any,
        },
      }}
      className="flex w-full max-w-[824px] flex-col gap-6 border border-ice-mist bg-white p-2 pb-6"
    >
      {card.imageUrl ? (
        <div className="relative h-[220px] w-full overflow-hidden sm:h-[277px]">
          <Image
            src={card.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 900px) 100vw, 824px"
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-8 px-2">
        <p className="rounded-[40px] bg-[#D9EEFF] px-4 py-2 text-center text-base leading-[145%] text-blue-dark">
          {card.description}
        </p>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium uppercase leading-[145%] tracking-[3px] text-[#1C4D74]">
              {labels.focus}
            </h3>
            <ul className="flex flex-col text-base leading-[145%] text-blue-dark">
              {card.focusAreas.map((item, index) => (
                <li key={`community-focus-${index}`}>- {item}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium uppercase leading-[145%] tracking-[3px] text-[#1C4D74]">
              {labels.includes}
            </h3>
            <ul className="flex flex-col text-base leading-[145%] text-blue-dark">
              {card.includes.map((item, index) => (
                <li key={`community-includes-${index}`}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[40px] bg-[#D9EEFF] px-5 py-3 sm:flex-row sm:items-center">
          <StopwatchIcon />
          <div className="flex flex-col gap-1">
            <span className="text-base leading-[145%] text-blue-dark">{labels.starts}</span>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                [remaining.days, labels.days],
                [remaining.hours, labels.hours],
                [remaining.minutes, labels.minutes],
              ].map(([value, unit]) => (
                <span key={unit} className="flex items-end gap-2">
                  <strong className="text-[35px] font-semibold leading-none tracking-[1px] text-blue-dark">
                    {value}
                  </strong>
                  <span className="text-base leading-[160%] tracking-[1px] text-blue-dark">
                    {unit}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {isExternalUrl(card.signUpUrl) ? (
          <a
            href={card.signUpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses}
          >
            {buttonContent}
          </a>
        ) : (
          <Link href={withBlogLocale(card.signUpUrl || '#', locale)} className={buttonClasses}>
            {buttonContent}
          </Link>
        )}
      </div>
    </motion.article>
  )
}

export const Pricing: React.FC<PricingProps> = ({
  communityCard,
  headline = 'Pricing for every dive adventure',
  locale = DEFAULT_BLOG_LOCALE,
  plans = DEFAULT_PLANS,
}) => {
  const messages = getSiteMessages(locale)
  const visiblePlans = plans.filter((plan) => plan.show !== false)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' } as any,
    },
  }

  return (
    <section className="bg-ice-mist py-20 md:py-[140px] relative overflow-hidden">
      <DecorativeLines
        color="rgba(7, 26, 38, 1)"
        opacity={0.1}
        fade="bottom"
        fadeAmount={25}
        showCenterLine={false}
        showMobile={false}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container-custom relative z-10 flex flex-col items-center gap-[48px]"
      >
        <div className="flex flex-col items-center gap-4 text-center max-w-[568px]">
          <motion.span
            variants={cardVariants}
            className="text-base font-medium uppercase tracking-wider text-blue-midnight leading-[145%]"
          >
            {messages.home.pricingLabel}
          </motion.span>
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-[52px] font-semibold text-blue-dark leading-[125%] whitespace-pre-line"
          >
            {headline}
          </motion.h2>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-5 lg:flex-row lg:items-start">
          {visiblePlans.map((plan, index) => (
            <motion.div
              key={`${plan.badgeLabel}-${index}`}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group flex flex-col w-full lg:w-[400px] h-auto lg:h-[920px] bg-white p-2 pb-[24px] gap-[24px]"
            >
              <div className="h-[230px] w-full relative overflow-hidden flex-shrink-0">
                <Image
                  src={plan.image}
                  alt={plan.badgeLabel}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute top-[14.15px] left-3.5 bg-[#D9EEFF] px-4 py-1 rounded-full z-10">
                  <span className="text-[14px] font-semibold uppercase text-[#0B1F31] leading-[20px] block">
                    {plan.badgeLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-[32px] px-2 flex-grow">
                <div className="flex items-end leading-none">
                  <span className="text-[35px] font-semibold tracking-[1px] text-[#0B1F31]">
                    {plan.price}
                  </span>
                  <span className="text-base font-normal text-[#0B1F31] leading-[1.6] tracking-[1px] ml-0.5">
                    {messages.home.accessSuffix}
                  </span>
                </div>

                {isExternalUrl(plan.purchaseUrl) ? (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={plan.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-[11.2px] rounded-full border border-blue-dark group/btn transition-colors hover:bg-blue-dark"
                  >
                    <div className="flex flex-col items-start relative">
                      <span className="text-base font-semibold leading-[23px] lowercase text-blue-dark group-hover/btn:text-white transition-colors">
                        {messages.home.purchaseNow}
                      </span>
                      <div className="h-[1px] w-full bg-blue-dark group-hover/btn:bg-white transition-colors" />
                    </div>
                    <ArrowIcon />
                  </motion.a>
                ) : (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={withBlogLocale(plan.purchaseUrl || '#', locale)}
                      className="flex items-center justify-center gap-2 px-6 py-[11.2px] rounded-full border border-blue-dark group/btn transition-colors hover:bg-blue-dark"
                    >
                      <div className="flex flex-col items-start relative">
                        <span className="text-base font-semibold leading-[23px] lowercase text-blue-dark group-hover/btn:text-white transition-colors">
                          {messages.home.purchaseNow}
                        </span>
                        <div className="h-[1px] w-full bg-blue-dark group-hover/btn:bg-white transition-colors" />
                      </div>
                      <ArrowIcon />
                    </Link>
                  </motion.div>
                )}

                <div className="flex flex-col gap-2 h-auto lg:h-[390px]">
                  <span className="text-base font-medium tracking-[3px] uppercase text-[#1C4D74] leading-[145%]">
                    {messages.home.includesLabel}
                  </span>
                  <ul className="flex flex-col list-none p-0 m-0">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={`${plan.badgeLabel}-feature-${featureIndex}`}
                        className="text-base font-normal text-[#0B1F31] leading-[145%]"
                      >
                        - {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4">
                  <p className="text-base leading-[145%] text-[#0B1F31]">
                    <span className="font-bold">{messages.home.idealForLabel}</span>{' '}
                    <span className="font-normal">{plan.idealFor}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {communityCard?.show ? <CommunityCard card={communityCard} locale={locale} /> : null}
        </div>
      </motion.div>
    </section>
  )
}
