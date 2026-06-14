'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'

type VideoModalProps = {
  embedUrl?: string
  isOpen: boolean
  onClose: () => void
  posterUrl?: string
}

export const VideoModal: React.FC<VideoModalProps> = ({ embedUrl, isOpen, onClose, posterUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleCloseModal = () => {
    setIsPlaying(false)
    onClose()
  }

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
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
            className="relative aspect-video w-full max-w-[928px] overflow-hidden border-2 border-white/40 bg-[#0B1F31]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute right-4 top-4 z-10 text-white/70 transition-colors hover:text-white"
              aria-label="Close video"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {!isPlaying ? (
              <button
                type="button"
                disabled={!embedUrl}
                className="group relative h-full w-full disabled:cursor-default"
                onClick={() => setIsPlaying(true)}
                aria-label="Play video"
              >
                {posterUrl && (
                  <Image
                    src={posterUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 960px) 100vw, 928px"
                  />
                )}
                <span className="absolute inset-0 bg-[#0B1F31]/40 transition-colors group-hover:bg-[#0B1F31]/20" />

                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="relative flex items-center justify-center">
                    <span className="absolute h-[150px] w-[150px] rounded-full bg-[#E6F1F6] opacity-25 transition-transform duration-300 group-hover:scale-110" />
                    <span className="absolute h-[106px] w-[106px] rounded-full bg-[#E6F1F6]" />
                    <svg
                      className="relative left-1"
                      width="36"
                      height="36"
                      viewBox="0 0 32 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30.5 15.6699C32.1667 16.6321 32.1667 19.3679 30.5 20.3301L4.25 35.4856C2.58333 36.4478 0.5 35.2459 0.5 33.1554L0.5 2.84457C0.5 0.754066 2.58334 -0.44781 4.25 0.514441L30.5 15.6699Z"
                        fill="#071A26"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            ) : embedUrl ? (
              <iframe
                src={`${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1`}
                title="Video"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
