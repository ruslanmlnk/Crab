"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import type { FAQItem } from '@/lib/faq'

import { DecorativeLines } from './DecorativeLines'

type FAQProps = {
  items: FAQItem[]
}

export const FAQ: React.FC<FAQProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    items.length > 0 ? 0 : null,
  )

  return (
    <section className="bg-white relative">
      {/* FAQ Header Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full relative py-20 md:pt-[140px] md:pb-[48px] overflow-hidden"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/images/backgrounds/faq-cloud-blur.webp"
              alt="Cloud Blur"
              width={1075}
              height={504}
              className="absolute top-0 left-[50%] ml-[50px] rotate-[18deg] max-w-none pointer-events-none select-none"
              priority
            />
            <Image
              src="/images/backgrounds/faq-cloud-mask.webp"
              alt="Cloud Mask"
              width={1123}
              height={726}
              className="absolute top-[56px] left-[50%] ml-[-150px] rotate-[15deg] max-w-none pointer-events-none select-none"
              priority
            />
          </div>
        </div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col items-start w-full">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-h2-faq text-blue-dark"
            >
              Frequently asked
            </motion.h2>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-x-6 w-full">
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="text-h2-faq text-blue-dark"
              >
                questions
              </motion.h2>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                className="text-blue-midnight text-base md:pt-4 max-w-[258px] leading-[145%]"
              >
                Everything you need to know about crab fishing in Norway
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ Accordion Section */}
      <div className="container-custom pb-20 md:pb-[137px] relative">
        <DecorativeLines
          color="rgba(7, 26, 38, 1)"
          opacity={0.15}
          showCenterLine={false}
          showMobile={false}
        />
        <div className="flex flex-col md:flex-row gap-4 items-start w-full relative z-10">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="flex-1 flex flex-col gap-4 w-full"
          >
            {items.filter((_, i) => i % 2 === 0).map((faq, index) => {
              const actualIndex = index * 2
              const isActive = activeIndex === actualIndex

              return (
                <motion.div
                  key={faq.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="p-8 bg-white transition-all cursor-pointer flex flex-col gap-6"
                  onClick={() => setActiveIndex(isActive ? null : actualIndex)}
                >
                  <div
                    className={`flex justify-between items-center gap-4 ${!isActive ? 'pb-4 border-b border-ice-mist' : ''}`}
                  >
                    <h4 className="text-[18px] font-bold text-blue-dark leading-[26px]">
                      {faq.question}
                    </h4>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 9L12 15L6 9"
                          stroke="#071A26"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-ice-mist">
                          <p className="text-[18px] font-medium text-blue-midnight leading-[26px]">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
            className="flex-1 flex flex-col gap-4 w-full"
          >
            {items.filter((_, i) => i % 2 !== 0).map((faq, index) => {
              const actualIndex = index * 2 + 1
              const isActive = activeIndex === actualIndex

              return (
                <motion.div
                  key={faq.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="p-8 bg-white transition-all cursor-pointer flex flex-col gap-6"
                  onClick={() => setActiveIndex(isActive ? null : actualIndex)}
                >
                  <div
                    className={`flex justify-between items-center gap-4 ${!isActive ? 'pb-4 border-b border-ice-mist' : ''}`}
                  >
                    <h4 className="text-[18px] font-bold text-blue-dark leading-[26px]">
                      {faq.question}
                    </h4>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 9L12 15L6 9"
                          stroke="#071A26"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-ice-mist">
                          <p className="text-[18px] font-medium text-blue-midnight leading-[26px]">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
