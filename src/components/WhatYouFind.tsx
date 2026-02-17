"use client"
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { DecorativeLines } from './DecorativeLines'

export const WhatYouFind: React.FC = () => {
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
      transition: { duration: 0.8, ease: "easeOut" } as any
    },
  }

  return (
    <section className="bg-white py-20 md:py-[140px] overflow-hidden relative">
      <DecorativeLines color="rgba(7, 26, 38, 1)" opacity={0.15} fade="none" showCenterLine={false} />
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container-custom flex flex-col gap-[48px]"
      >
        <div className="flex flex-col gap-[0px]">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-[154px] w-full">
            <span className="text-label text-blue-midnight shrink-0 tracking-[0] font-medium text-[16px] leading-[145%]">WHAT YOU’LL FIND HERE</span>
            <h2 className="text-h2 text-blue-dark flex-1">For years, we’ve been documenting</h2>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-h2 text-blue-dark">real life and work within the Norwegian crab fishing industry</motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[130px] items-stretch">
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-[520px] h-[326px] overflow-hidden rounded-sm relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full relative"
            >
              <Image 
                src="https://api.builder.io/api/v1/image/assets/TEMP/4baa9141500c2b4a45eeb5c8233e91dc856e3b41?width=1040" 
                alt="Crab fishing documentation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
              />
            </motion.div>
          </motion.div>
          
          <div className="flex flex-col justify-start py-0 gap-[137px] flex-1">
            <div className="flex flex-col md:flex-row gap-[64px] items-start">
              <motion.p variants={itemVariants} className="text-[16px] leading-[145%] text-blue-midnight font-normal max-w-[292.36px]">
                We focus on practical knowledge, firsthand experience and honest insight gained through years of working at sea — from the first contracts to real offshore conditions on Norwegian vessels.
              </motion.p>
              <motion.p variants={itemVariants} className="text-[16px] leading-[145%] text-blue-midnight font-normal max-w-[290.11px]">
                Alongside articles and interviews, we provide education and personal guidance for those who want to enter the industry prepared, avoid common mistakes and understand what this work really requires.
              </motion.p>
            </div>
            
            <motion.button 
              variants={itemVariants}
              whileHover="hover"
              className="btn-base btn-dark self-start group px-6 py-3 border border-blue-dark rounded-[40px] flex items-center gap-2"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="text-blue-dark font-semibold text-[16px] leading-[145%]">Get in touch</span>
                <motion.div 
                  variants={{
                    hover: { scaleX: 0 }
                  }}
                  className="h-[1px] w-full bg-blue-dark origin-left" 
                />
              </div>
              <motion.div 
                variants={{
                  hover: { x: 5 }
                }}
                className="w-6 h-6 flex items-center justify-center transition-transform"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" fill="#071A26"/>
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
