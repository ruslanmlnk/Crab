"use client"
import { motion, Variants } from 'framer-motion'

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
    <section className="bg-white py-20 md:py-[140px] overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container-custom flex flex-col gap-12 md:gap-[48px]"
      >
        <div className="flex flex-col gap-4">
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-baseline gap-4 md:gap-[154px]">
            <span className="text-label text-blue-midnight shrink-0">WHAT YOU’LL FIND HERE</span>
            <h2 className="text-h2 text-blue-dark">For years, we’ve been documenting</h2>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-h2 text-blue-dark">real life and work within the Norwegian crab fishing industry</motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[130px] items-stretch">
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-[520px] overflow-hidden rounded-sm"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              src="https://api.builder.io/api/v1/image/assets/TEMP/4baa9141500c2b4a45eeb5c8233e91dc856e3b41?width=1040" 
              alt="Crab fishing documentation"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="flex flex-col justify-between py-2 gap-12 lg:gap-0">
            <div className="flex flex-col md:flex-row gap-8 md:gap-[64px]">
              <motion.p variants={itemVariants} className="flex-1 text-label font-normal text-blue-midnight leading-[145%]">
                We focus on practical knowledge, firsthand experience and honest insight gained through years of working at sea — from the first contracts to real offshore conditions on Norwegian vessels.
              </motion.p>
              <motion.p variants={itemVariants} className="flex-1 text-label font-normal text-blue-midnight leading-[145%]">
                Alongside articles and interviews, we provide education and personal guidance for those who want to enter the industry prepared, avoid common mistakes and understand what this work really requires.
              </motion.p>
            </div>
            
            <motion.button 
              variants={itemVariants}
              whileHover="hover"
              className="btn-base btn-dark self-start flex flex-col items-start px-0 border-0 group"
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-start">
                  <span className="text-blue-dark font-semibold leading-[145%]">Get in touch</span>
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
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
