"use client"
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

import { DecorativeLines } from './DecorativeLines'

export type PricingPlan = {
  badgeLabel: string
  features: string[]
  idealFor: string
  image: string
  price: string
}

type PricingProps = {
  headline?: string
  plans?: PricingPlan[]
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
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
  },
  {
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
  },
]

export const Pricing: React.FC<PricingProps> = ({
  headline = 'Pricing for every dive adventure',
  plans = DEFAULT_PLANS,
}) => {
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
            Pricing
          </motion.span>
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-[52px] font-semibold text-blue-dark leading-[125%] whitespace-pre-line"
          >
            {headline}
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-5 w-full">
          {plans.map((plan, index) => (
            <motion.div
              key={`${plan.badgeLabel}-${index}`}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group flex flex-col w-full lg:w-[400px] h-auto lg:h-[842px] bg-white p-2 pb-[24px] gap-[24px]"
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
                    /access
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-6 py-[11.2px] rounded-full border border-blue-dark group/btn transition-colors hover:bg-blue-dark"
                >
                  <div className="flex flex-col items-start relative">
                    <span className="text-base font-semibold leading-[23px] lowercase text-blue-dark group-hover/btn:text-white transition-colors">
                      Purchase now
                    </span>
                    <div className="h-[1px] w-full bg-blue-dark group-hover/btn:bg-white transition-colors" />
                  </div>
                  <svg
                    className="w-6 h-6 transition-transform group-hover/btn:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z"
                      className="fill-blue-dark group-hover/btn:fill-white transition-colors"
                    />
                  </svg>
                </motion.button>

                <div className="flex flex-col gap-2 h-auto lg:h-[331px]">
                  <span className="text-base font-medium tracking-[3px] uppercase text-[#1C4D74] leading-[145%]">
                    Includes:
                  </span>
                  <ul className="flex flex-col list-none p-0 m-0">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={`${plan.badgeLabel}-feature-${featureIndex}`}
                        className="text-base font-normal text-[#0B1F31] leading-[145%]"
                      >
                        — {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4">
                  <p className="text-base leading-[145%] text-[#0B1F31]">
                    <span className="font-bold">Ideal for:</span>{' '}
                    <span className="font-normal">{plan.idealFor}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
