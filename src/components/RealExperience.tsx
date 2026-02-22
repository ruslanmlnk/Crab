"use client"
import Image from 'next/image'
import React, { useRef } from 'react'
import { motion } from 'framer-motion'

import { DecorativeLines } from './DecorativeLines'

export type RealExperienceCard = {
  description: string
  title: string
}

const DEFAULT_EXPERIENCE_CARDS: RealExperienceCard[] = [
  {
    description:
      'Built on firsthand experience - from fishing vessel entry level in Africa and Nederland to work on Norwegian fishing and crab boats. More than 6 years of experience.',
    title: 'Real path, not theory',
  },
  {
    description:
      'No abstract advice. Only real information about work conditions and what to expect at sea.',
    title: 'Practical guidance',
  },
  {
    description:
      'Direct guidance from someone who has been through this path and understands its challenges.',
    title: 'Personal involvement',
  },
]

type RealExperienceProps = {
  backgroundImage?: string
  cards?: RealExperienceCard[]
  isRight?: boolean
}

export const RealExperience: React.FC<RealExperienceProps> = ({
  backgroundImage = '/images/backgrounds/experience.png',
  cards = DEFAULT_EXPERIENCE_CARDS,
  isRight = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <Image
            src={backgroundImage}
            alt="Real Experience Background"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-blue-dark/50" />
        </motion.div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <DecorativeLines
          color="rgba(255, 255, 255, 1)"
          opacity={0.2}
          fade="none"
          showCenterLine={false}
          showMobile={false}
        />
      </div>

      <div className="relative z-10 -mt-[100vh] flex flex-col gap-[70px] pt-[140.1px] pb-[140px] overflow-x-hidden">
        {cards.map((card, index) => (
          <div key={`${card.title}-${index}`} className="w-full">
            <div className="mx-auto max-w-[1348px] px-6 w-full">
              <motion.div
                initial={{
                  opacity: 0,
                  x:
                    typeof window !== 'undefined' && window.innerWidth < 768
                      ? 0
                      : index % 2 === 0 || isRight
                        ? -50
                        : 50,
                  y: 50,
                }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ margin: '-20%', once: false }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full max-w-[612.7px] p-6 md:p-12 glass-card backdrop-blur-[6px] flex items-start gap-[16px] md:gap-[32px] ${index % 2 === 1 || isRight ? 'md:ml-auto' : ''}`}
              >
                <span className="text-[20px] leading-[145%] text-white shrink-0">
                  {`${String(index + 1).padStart(2, '0')}.`}
                </span>
                <div className="flex w-full flex-col gap-[8px]">
                  <span className="text-[16px] font-medium leading-[145%] text-ice-mist uppercase">
                    {card.title}
                  </span>
                  <h3 className="max-w-[459px] text-[24px] md:text-[32px] font-semibold leading-[46px] text-white whitespace-pre-line">
                    {card.description}
                  </h3>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
