"use client"
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

import type { ContactSocialLinks } from '@/lib/contact'

import { DecorativeLines } from './DecorativeLines'
import { SocialLinks } from './SocialLinks'

type HeroProps = {
  eyebrow: string
  headline: string
  socialLinks: ContactSocialLinks
  supportingText: string
}

export const Hero: React.FC<HeroProps> = ({
  eyebrow,
  headline,
  socialLinks,
  supportingText,
}) => {
  const normalizedSupportingText = supportingText
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\n')
    .replace(/\r/g, '')
    .trim()
  const supportingLines = normalizedSupportingText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  let supportingLineOne = supportingLines[0] || ''
  let supportingLineTwo = supportingLines.slice(1).join(' ').trim()

  if (!supportingLineTwo && normalizedSupportingText) {
    const semanticSplitIndex = normalizedSupportingText
      .toLowerCase()
      .indexOf(' fishing industry')

    if (semanticSplitIndex > 0) {
      supportingLineOne = normalizedSupportingText
        .slice(0, semanticSplitIndex)
        .trim()
      supportingLineTwo = normalizedSupportingText
        .slice(semanticSplitIndex + 1)
        .trim()
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' } as any,
      y: 0,
    },
  }

  const titleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: 'easeOut' } as any,
    },
  }

  return (
    <section className="w-full min-h-[600px] md:h-[700px] flex justify-center items-center relative border-b border-white/10 overflow-hidden">
      <Image
        src="/images/backgrounds/hero.png"
        alt="Crab Norway Hero"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-blue-dark/30 z-[1]" />
      <DecorativeLines
        color="rgba(255, 255, 255, 1)"
        opacity={0.15}
        fade="top"
        showCenterLine={false}
        showMobile={false}
      />
      <motion.div
        className="mx-auto max-w-[1208px] px-6 flex flex-col justify-center items-start gap-[18px] py-20 md:py-0 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="w-full text-tagline text-white text-center md:w-auto md:text-left md:pl-[10px]"
        >
          {eyebrow}
        </motion.div>

        <motion.h1
          variants={titleVariants}
          className="w-full text-h1 tracking-normal text-center text-white"
        >
          {headline}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0"
        >
          <SocialLinks
            links={socialLinks}
            itemClassName="w-12 h-12 md:w-10 md:h-10"
            wrapperClassName="flex items-center gap-[10px] md:pl-[10px]"
          />

          <div className="text-tagline text-white text-center md:text-right">
            {supportingLineTwo ? (
              <>
                {supportingLineOne}
                <br className="hidden md:block" />
                <span className="md:hidden"> </span>
                {supportingLineTwo}
              </>
            ) : (
              supportingLineOne
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
