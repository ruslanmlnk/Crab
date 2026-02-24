"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  DEFAULT_BLOG_LOCALE,
  withBlogLocale,
  type BlogLocale,
} from '@/lib/blog-locale'

interface BlogCardProps {
  title: string
  description: string
  category: string
  image: string
  slug: string
  locale?: BlogLocale
  index?: number
  showBorder?: boolean
  imageHeight?: string
  readMoreLabel?: string
  variants?: any
}

export const BlogCard: React.FC<BlogCardProps> = ({ 
  title, 
  description, 
  category, 
  image, 
  slug,
  locale = DEFAULT_BLOG_LOCALE,
  index = 0,
  showBorder = true,
  imageHeight = "h-[200px]",
  readMoreLabel = 'learn more',
  variants
}) => {
  const postHref = withBlogLocale(`/blog/${slug}`, locale)

  return (
    <motion.div
      variants={variants}
      initial={variants ? undefined : { opacity: 0, y: 20 }}
      whileInView={variants ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={variants ? undefined : { duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`flex flex-col p-2 pb-6 bg-white gap-6 flex-1 self-stretch h-full group ${showBorder ? 'border border-[#E6F1F6]' : ''}`}
    >
      {/* Image Container */}
      <div className={`${imageHeight} w-full relative overflow-hidden flex-shrink-0`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute top-[14px] left-[14px] bg-[#D9EEFF] px-4 py-1 rounded-full z-10">
          <span className="text-blue-dark text-[14px] font-semibold leading-[145%] uppercase block">
            {category}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col px-2 gap-[45px] self-stretch justify-between h-full">
        <div className="flex flex-col gap-[9px] self-stretch">
          <h4 className="text-[18px] font-bold text-blue-dark leading-[145%] line-clamp-1">
            {title}
          </h4>
          <p className="text-[16px] font-normal text-blue-midnight leading-[145%] line-clamp-3">
            {description}
          </p>
        </div>

        {/* Link Container */}
        <Link href={postHref} className="flex items-center gap-2 group/link cursor-pointer w-fit">
          <div className="flex flex-col items-start relative">
            <span className="text-blue-dark font-semibold leading-[145%] text-[16px]">
              {readMoreLabel}
            </span>
            <div className="h-[1px] w-full bg-blue-dark transition-all duration-300" />
          </div>
          <div className="w-6 h-6 flex items-center justify-center transition-transform duration-300 group-hover/link:translate-x-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" fill="currentColor" className="fill-blue-dark"/>
            </svg>
          </div>
        </Link>
      </div>
    </motion.div>
  )
}
