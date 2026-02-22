"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { DecorativeLines } from '../DecorativeLines'

type AboutHeroProps = {
  description?: string
  headlineAfterImage?: string
  headlineBeforeImage?: string
  headlineBottom?: string
  inlineImageUrl?: string
  nextSectionId?: string
}

const DEFAULT_ABOUT_HERO = {
  description: 'A real journey through offshore work, fishing vessels, and life at sea',
  headlineAfterImage: 'in Africa',
  headlineBeforeImage: 'From cadet',
  headlineBottom: 'to fisherman in Norway',
  inlineImageUrl:
    'https://api.builder.io/api/v1/image/assets/TEMP/a094fe6bb6a8b0a1bab3cdec28b47b2ede034873',
}

export const AboutHero: React.FC<AboutHeroProps> = ({
  description = DEFAULT_ABOUT_HERO.description,
  headlineAfterImage = DEFAULT_ABOUT_HERO.headlineAfterImage,
  headlineBeforeImage = DEFAULT_ABOUT_HERO.headlineBeforeImage,
  headlineBottom = DEFAULT_ABOUT_HERO.headlineBottom,
  inlineImageUrl = DEFAULT_ABOUT_HERO.inlineImageUrl,
  nextSectionId = 'about-next-section',
}) => {
  const handleScrollToNextSection = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const targetSection = document.getElementById(nextSectionId)

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    const currentSection = event.currentTarget.closest('section')
    const nextSiblingSection = currentSection?.nextElementSibling as HTMLElement | null

    if (nextSiblingSection) {
      nextSiblingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative w-full bg-blue-dark overflow-hidden min-h-[600px] flex items-center pt-[140px] pb-[100px] md:py-[140px]">
      <DecorativeLines color="rgba(255, 255, 255, 1)" opacity={0.1} showCenterLine={false} showMobile={false} />

      <div className="container-custom relative z-10">
        <div className="flex flex-col gap-6 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-4 md:gap-6"
          >
            <h1 className="text-white text-5xl md:text-[88px] font-semibold leading-[110%] tracking-tight">
              {headlineBeforeImage}
            </h1>
            <div className="relative w-[150px] h-[80px] md:w-[200px] md:h-[110px] rounded-[2px] overflow-hidden flex-shrink-0">
              <Image
                src={inlineImageUrl}
                alt="About Hero Image"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 150px, 200px"
              />
            </div>
            <h1 className="text-white text-5xl md:text-[88px] font-semibold leading-[110%] tracking-tight">
              {headlineAfterImage}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-4"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-[33px]">
              <h1 className="text-white text-5xl md:text-[88px] font-semibold leading-[110%] tracking-tight">
                {headlineBottom}
              </h1>
              <div className="md:pt-6 max-w-[175px]">
                <p className="text-ice-mist text-base font-normal leading-[145%]">
                  {description}
                </p>
              </div>
            </div>

            <motion.button
              onClick={handleScrollToNextSection}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-colors hover:bg-ice-mist"
              type="button"
              aria-label="Scroll to next section"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 9L12 15L6 9" stroke="#071A26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
