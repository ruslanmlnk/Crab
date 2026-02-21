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
  authorImage
}) => {
  return (
    <section className="relative w-full bg-[#071A26] overflow-hidden pt-[160px] pb-[100px]">
      {/* Decorative Gradient Line (Vertical) */}
      <div 
        className="absolute left-1/2 top-0 w-px h-[900px] -translate-x-1/2 hidden lg:block z-10"
        style={{ 
          background: "linear-gradient(180deg, rgba(133, 167, 183, 0.00) 5%, rgba(133, 167, 183, 0.40) 85%, rgba(133, 167, 183, 0.00) 100%)",
        }}
      />

      <div className="container-custom relative z-20 px-6 lg:px-[70px]">
        <div className="flex flex-col items-center gap-[38px] text-center">
          {/* Category Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-white text-[20px] font-semibold leading-[145%]">
              {category}
            </span>
            <div className="h-px w-full bg-white opacity-100" />
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white text-[40px] md:text-[80px] font-semibold leading-[125%] max-w-[1000px] text-center"
          >
            {title}
          </motion.h1>

          {/* Author Info */}
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
