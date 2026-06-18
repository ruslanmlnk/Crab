'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { DEFAULT_BLOG_LOCALE, withBlogLocale, type BlogLocale } from '@/lib/blog-locale'
import { getSiteMessages } from '@/lib/site-locale'
import { getYouTubeEmbedURL } from '@/lib/youtube'

import { DecorativeLines } from './DecorativeLines'
import { VideoModal } from './VideoModal'

type WhatYouFindProps = {
  ctaLabel?: string
  ctaUrl?: string
  firstColumnText?: string
  headline?: string
  image?: string
  locale?: BlogLocale
  secondColumnText?: string
  sectionTitle?: string
  videoPoster?: string
  withVideo?: boolean
  youtubeUrl?: string
}

const DEFAULT_PROPS = {
  ctaUrl: '/contact',
  firstColumnText:
    'We focus on practical knowledge, firsthand experience and honest insight gained through years of working at sea - from the first contracts to real offshore conditions on Norwegian vessels.',
  headline:
    "For years, we've been documenting real life and work within the Norwegian crab fishing industry",
  image: '/images/backgrounds/find.png',
  secondColumnText:
    'Alongside articles and interviews, we provide education and personal guidance for those who want to enter the industry prepared, avoid common mistakes and understand what this work really requires.',
  sectionTitle: "WHAT YOU'LL FIND HERE",
} satisfies Required<
  Omit<WhatYouFindProps, 'ctaLabel' | 'locale' | 'videoPoster' | 'withVideo' | 'youtubeUrl'>
>

export const WhatYouFind: React.FC<WhatYouFindProps> = ({
  ctaLabel,
  ctaUrl = DEFAULT_PROPS.ctaUrl,
  firstColumnText = DEFAULT_PROPS.firstColumnText,
  headline = DEFAULT_PROPS.headline,
  image = DEFAULT_PROPS.image,
  locale = DEFAULT_BLOG_LOCALE,
  secondColumnText = DEFAULT_PROPS.secondColumnText,
  sectionTitle = DEFAULT_PROPS.sectionTitle,
  videoPoster,
  withVideo = false,
  youtubeUrl,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const messages = getSiteMessages(locale)
  const embedUrl = youtubeUrl ? getYouTubeEmbedURL(youtubeUrl) : null
  const normalizedHeadline = headline
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\n')
    .replace(/\r/g, '')
    .trim()
  const headlineLines = normalizedHeadline
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  let headlineLineOne = headlineLines[0] || ''
  let headlineLineTwo = headlineLines.slice(1).join(' ').trim()

  if (!headlineLineTwo && normalizedHeadline) {
    const semanticSplitIndex = normalizedHeadline.toLowerCase().indexOf(' real life')

    if (semanticSplitIndex > 0) {
      headlineLineOne = normalizedHeadline.slice(0, semanticSplitIndex).trim()
      headlineLineTwo = normalizedHeadline.slice(semanticSplitIndex + 1).trim()
    }
  }

  if (!headlineLineTwo && normalizedHeadline.length > 72) {
    const middleIndex = Math.floor(normalizedHeadline.length / 2)
    let splitIndex = normalizedHeadline.lastIndexOf(' ', middleIndex)

    if (splitIndex < 0) {
      splitIndex = normalizedHeadline.indexOf(' ', middleIndex)
    }

    if (splitIndex > 0) {
      headlineLineOne = normalizedHeadline.slice(0, splitIndex).trim()
      headlineLineTwo = normalizedHeadline.slice(splitIndex + 1).trim()
    }
  }

  const isExternalCta =
    ctaUrl.startsWith('http://') ||
    ctaUrl.startsWith('https://') ||
    ctaUrl.startsWith('mailto:') ||
    ctaUrl.startsWith('tel:') ||
    ctaUrl.startsWith('#')
  const localizedCtaUrl = isExternalCta ? ctaUrl : withBlogLocale(ctaUrl, locale)
  const buttonLabel = ctaLabel ?? messages.home.getInTouchButton

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' } as any,
    },
  }

  return (
    <section className="bg-white py-20 md:py-[140px] overflow-hidden relative">
      <DecorativeLines
        color="rgba(7, 26, 38, 1)"
        opacity={0.15}
        fade="none"
        showCenterLine={false}
        showMobile={false}
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container-custom flex flex-col gap-[48px]"
      >
        <div className="flex flex-col gap-[0px]">
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center gap-[154px] w-full"
          >
            <span className="text-label text-blue-midnight shrink-0 tracking-[0] font-medium text-[16px] leading-[145%]">
              {sectionTitle}
            </span>
            <h2 className="text-h2 text-blue-dark flex-1">{headlineLineOne}</h2>
          </motion.div>
          {headlineLineTwo ? (
            <motion.h2 variants={itemVariants} className="text-h2 text-blue-dark">
              {headlineLineTwo}
            </motion.h2>
          ) : null}
        </div>

        <div
          className={`flex flex-col items-stretch lg:flex-row ${
            withVideo ? 'gap-12 lg:gap-12' : 'gap-12 lg:gap-[130px]'
          }`}
        >
          <motion.div
            variants={itemVariants}
            className={
              withVideo
                ? 'relative h-[360px] w-full shrink-0 sm:h-[412px] lg:w-[613px]'
                : 'relative h-[326px] w-full overflow-hidden rounded-sm lg:w-[520px]'
            }
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className={
                withVideo
                  ? 'relative h-[calc(100%_-_53px)] w-[calc(100%_-_93px)] overflow-hidden'
                  : 'relative h-full w-full'
              }
            >
              <Image
                src={image}
                alt="Crab fishing documentation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
              />
            </motion.div>

            {withVideo && videoPoster ? (
              <div className="absolute bottom-0 right-0 h-[46%] min-h-[150px] w-[54%] min-w-[220px]">
                <button
                  type="button"
                  aria-label="Open video"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group relative h-full w-full"
                >
                  <Image
                    src={videoPoster}
                    alt=""
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 54vw, 331px"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ice-mist/25">
                      <span className="flex h-[57px] w-[57px] items-center justify-center rounded-full bg-ice-mist">
                        <svg
                          className="ml-1"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.5 8.7L6 2.65C5.2 2.18 4.2 2.76 4.2 3.68V15.8C4.2 16.72 5.2 17.3 6 16.83L16.5 10.78C17.3 10.32 17.3 9.16 16.5 8.7Z"
                            fill="#071A26"
                          />
                        </svg>
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            ) : null}
          </motion.div>

          <div
            className={`flex flex-1 flex-col py-0 ${
              withVideo ? 'min-h-[412px] justify-between gap-12' : 'justify-start gap-[137px]'
            }`}
          >
            <div
              className={`flex flex-col items-start md:flex-row ${
                withVideo ? 'gap-[46px]' : 'gap-[64px]'
              }`}
            >
              <motion.p
                variants={itemVariants}
                className="text-[16px] leading-[145%] text-blue-midnight font-normal max-w-[292.36px] whitespace-pre-line"
              >
                {firstColumnText}
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-[16px] leading-[145%] text-blue-midnight font-normal max-w-[290.11px] whitespace-pre-line"
              >
                {secondColumnText}
              </motion.p>
            </div>

            {isExternalCta ? (
              <motion.a
                variants={itemVariants}
                whileHover="hover"
                href={localizedCtaUrl}
                className="btn-base btn-dark self-start group w-fit"
              >
                <div className="flex flex-col items-start leading-none">
                  <span className="text-blue-dark font-semibold text-[16px] leading-[145%] transition-colors group-hover:text-white">
                    {buttonLabel}
                  </span>
                  <motion.div
                    variants={{
                      hover: { scaleX: 0 },
                    }}
                    className="h-[1px] w-full bg-blue-dark origin-left transition-colors group-hover:bg-white"
                  />
                </div>
                <motion.div
                  variants={{
                    hover: { x: 5 },
                  }}
                  className="w-6 h-6 flex items-center justify-center transition-transform"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z"
                      className="fill-blue-dark transition-colors group-hover:fill-white"
                    />
                  </svg>
                </motion.div>
              </motion.a>
            ) : (
              <motion.div variants={itemVariants} whileHover="hover">
                <Link href={localizedCtaUrl} className="btn-base btn-dark self-start group w-fit">
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-blue-dark font-semibold text-[16px] leading-[145%] transition-colors group-hover:text-white">
                      {buttonLabel}
                    </span>
                    <motion.div
                      variants={{
                        hover: { scaleX: 0 },
                      }}
                      className="h-[1px] w-full bg-blue-dark origin-left transition-colors group-hover:bg-white"
                    />
                  </div>
                  <motion.div
                    variants={{
                      hover: { x: 5 },
                    }}
                    className="w-6 h-6 flex items-center justify-center transition-transform"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z"
                        className="fill-blue-dark transition-colors group-hover:fill-white"
                      />
                    </svg>
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      <VideoModal
        embedUrl={embedUrl ?? undefined}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        posterUrl={videoPoster}
      />
    </section>
  )
}
