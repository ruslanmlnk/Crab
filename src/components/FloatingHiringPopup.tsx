"use client"

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { normalizeBlogLocale, withBlogLocale } from '@/lib/blog-locale'

const REOPEN_DELAY_MS = 40000

export const FloatingHiringPopup: React.FC = () => {
  const searchParams = useSearchParams()
  const currentLocale = normalizeBlogLocale(searchParams.get('locale'))
  const storyHref = withBlogLocale('/blog', currentLocale)

  const [isVisible, setIsVisible] = useState(false)
  const reopenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearReopenTimeout = useCallback(() => {
    if (reopenTimeoutRef.current) {
      clearTimeout(reopenTimeoutRef.current)
      reopenTimeoutRef.current = null
    }
  }, [])

  const scheduleOpen = useCallback(() => {
    clearReopenTimeout()
    reopenTimeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, REOPEN_DELAY_MS)
  }, [clearReopenTimeout])

  useEffect(() => {
    scheduleOpen()

    return () => {
      clearReopenTimeout()
    }
  }, [clearReopenTimeout, scheduleOpen])

  const handleClose = () => {
    setIsVisible(false)
    scheduleOpen()
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed left-[10px] bottom-[10px] z-[120] w-[295px] max-w-[calc(100vw-20px)] border-2 border-white/20 bg-blue-dark p-[24px] pt-[42px] shadow-2xl"
        >
          <button
            onClick={handleClose}
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
              Watch how to get hired in fishing
            </p>

            <Link
              href={storyHref}
              className="relative block h-[150px] w-full overflow-hidden border-2 border-white/10"
              aria-label="Open hiring story"
            >
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/ba9b4648defc921ce98da2583fe7fdb8e6b4b158?width=492"
                alt="Watch how to get hired in fishing"
                fill
                className="object-cover"
                sizes="295px"
              />
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
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
