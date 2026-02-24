"use client"

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { normalizeBlogLocale } from '@/lib/blog-locale'
import { getYouTubeEmbedURL } from '@/lib/youtube'

const INITIAL_OPEN_DELAY_MS = 2000
const REOPEN_DELAY_MS = 40000

interface FloatingHiringPopupProps {
  posterUrl: string | null
  youtubeUrl: string | null
}

export const FloatingHiringPopup: React.FC<FloatingHiringPopupProps> = ({
  posterUrl,
  youtubeUrl,
}) => {
  const searchParams = useSearchParams()
  const locale = normalizeBlogLocale(searchParams.get('locale'))
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const reopenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearReopenTimeout = useCallback(() => {
    if (reopenTimeoutRef.current) {
      clearTimeout(reopenTimeoutRef.current)
      reopenTimeoutRef.current = null
    }
  }, [])

  const scheduleOpen = useCallback((delayMs: number) => {
    clearReopenTimeout()
    reopenTimeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delayMs)
  }, [clearReopenTimeout])

  useEffect(() => {
    scheduleOpen(INITIAL_OPEN_DELAY_MS)

    return () => {
      clearReopenTimeout()
    }
  }, [clearReopenTimeout, scheduleOpen])

  const handleCloseTeaser = () => {
    setIsVisible(false)
    scheduleOpen(REOPEN_DELAY_MS)
  }

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsVisible(false)
    setIsModalOpen(true)
    clearReopenTimeout()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsPlaying(false)
    scheduleOpen(REOPEN_DELAY_MS)
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const embedUrl = youtubeUrl ? getYouTubeEmbedURL(youtubeUrl) : null
  const teaserTitle =
    locale === 'ru'
      ? '\u0421\u043c\u043e\u0442\u0440\u0438, \u043a\u0430\u043a \u0443\u0441\u0442\u0440\u043e\u0438\u0442\u044c\u0441\u044f \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0443 \u0432 \u0440\u044b\u0431\u043e\u043b\u043e\u0432\u0441\u0442\u0432\u0435'
      : 'Watch how to get hired in fishing'

  return (
    <>
      {/* Small Teaser Popup (Original Styling) */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed left-[10px] bottom-[10px] z-[120] w-[295px] max-w-[calc(100vw-20px)] border-2 border-white/20 bg-blue-dark p-[24px] pt-[42px] shadow-2xl"
          >
            <button
              onClick={handleCloseTeaser}
              type="button"
              aria-label="Close popup"
              className="absolute right-4 top-4 text-ice-mist/90 hover:text-ice-mist transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.06055 6L11.7803 1.28033C12.0732 0.987393 12.0732 0.51237 11.7803 0.21943C11.4874 -0.0735099 11.0124 -0.0735099 10.7194 0.21943L5.99998 4.93934L1.28055 0.21943C0.98758 -0.0735099 0.512623 -0.0734864 0.219678 0.21943C-0.0732839 0.512346 -0.0732839 0.987393 0.219678 1.28033L4.93941 6L0.219678 10.7197C-0.0732839 11.0127 -0.0733074 11.4877 0.219678 11.7806C0.512646 12.0735 0.987603 12.0735 1.28055 11.7806L5.99998 7.06066L10.7194 11.7806C11.0124 12.0735 11.4874 12.0735 11.7803 11.7806C12.0733 11.4877 12.0733 11.0127 11.7803 10.7197L7.06055 6Z" fill="currentColor" />
              </svg>
            </button>

            <div className="flex flex-col gap-4">
              <p className="text-white text-[16px] font-medium leading-[145%]">
                {teaserTitle}
              </p>

              <button
                onClick={handleOpenModal}
                className="relative block h-[150px] w-full overflow-hidden border-2 border-white/10"
                aria-label="Open hiring story"
              >
                {posterUrl && (
                  <Image
                    src={posterUrl}
                    alt={teaserTitle}
                    fill
                    className="object-cover"
                    sizes="295px"
                  />
                )}
                <div className="absolute inset-0 bg-blue-midnight/65" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ice-mist/25">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ice-mist">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2429 6.92061L3.59601 2.50592C3.50071 2.45089 3.38888 2.42188 3.27474 2.42188C3.1606 2.42188 3.04877 2.45089 2.95347 2.50591C2.85817 2.56092 2.78281 2.63727 2.72779 2.73258C2.67278 2.82789 2.64377 2.93972 2.64376 3.05386V11.8831C2.64371 11.9985 2.67405 12.1119 2.73169 12.2118C2.78932 12.3118 2.8722 12.395 2.97194 12.453C3.07167 12.511 3.18493 12.5416 3.30028 12.5419C3.41563 12.5422 3.52903 12.512 3.6291 12.4546L11.2429 8.04052C11.3382 7.9855 11.4135 7.90915 11.4685 7.81385C11.5236 7.71855 11.5526 7.60673 11.5526 7.49259C11.5526 7.37845 11.5236 7.26663 11.4685 7.17133C11.4135 7.07603 11.3382 6.99968 11.2429 6.94466V6.92061Z" fill="#071A26" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0B1F31]/90 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[928px] aspect-video border-2 border-white/40 bg-[#0B1F31] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute right-4 top-4 z-10 text-white/70 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {!isPlaying ? (
                <div className="relative w-full h-full group cursor-pointer" onClick={handlePlay}>
                  {posterUrl && (
                    <Image
                      src={posterUrl}
                      alt="Video Poster"
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-[#0B1F31]/40 transition-colors group-hover:bg-[#0B1F31]/20" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-[150px] h-[150px] rounded-full bg-[#E6F1F6] opacity-25 scale-100 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute w-[106px] h-[106px] rounded-full bg-[#E6F1F6]" />
                      <svg className="relative left-1" width="36" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.5 15.6699C32.1667 16.6321 32.1667 19.3679 30.5 20.3301L4.25 35.4856C2.58333 36.4478 0.5 35.2459 0.5 33.1554L0.5 2.84457C0.5 0.754066 2.58334 -0.44781 4.25 0.514441L30.5 15.6699Z" fill="#071A26"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                embedUrl && (
                  <iframe
                    src={`${embedUrl}?autoplay=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
