"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface BlogDetailsHeaderProps {
  category: string
  title: string
  authorName: string
  authorImage: string
}

export const BlogDetailsHeader: React.FC<BlogDetailsHeaderProps> = ({
  category,
  title,
  authorName,
  authorImage,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#071A26] py-[64px] md:py-[88px] lg:py-[100px]">
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-10 hidden h-[900px] w-px -translate-x-1/2 lg:block"
        style={{
          background:
            'linear-gradient(180deg, rgba(133, 167, 183, 0) 5%, rgba(133, 167, 183, 0.4) 85%, rgba(133, 167, 183, 0) 100%)',
        }}
      />

      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-[70px]">
        <div className="mx-auto flex max-w-[1300px] flex-col items-center gap-[30px] text-center md:gap-[36px] lg:gap-[38px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <div className="flex flex-col items-center">
              <span className="text-[18px] font-semibold leading-[145%] text-white md:text-[20px]">
                {category}
              </span>
              <div className="h-px w-full bg-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex min-h-[110px] w-full items-center justify-center text-center text-[40px] font-semibold leading-[125%] text-white sm:min-h-[130px] sm:text-[52px] md:min-h-[160px] md:text-[64px] lg:min-h-[184px] lg:text-[80px]"
            style={{ textWrap: 'balance' }}
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-[15px]"
          >
            <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden border border-white/10">
              <Image
                src={authorImage}
                alt={authorName}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-white text-base font-normal leading-[145%]">
              {authorName}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
