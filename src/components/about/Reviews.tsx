"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  DEFAULT_BLOG_LOCALE,
  withBlogLocale,
  type BlogLocale,
} from '@/lib/blog-locale'
import { getSiteMessages } from '@/lib/site-locale'
import { DecorativeLines } from '../DecorativeLines'

export type ReviewCard = {
  location?: string
  name: string
  review: string
  storyUrl: string
}

type ReviewsProps = {
  cards?: ReviewCard[]
  description?: string
  locale?: BlogLocale
  title?: string
}

const DEFAULT_REVIEWS: ReviewCard[] = [
  {
    location: 'Kherson, Ukraine',
    name: 'Vladimir',
    review:
      '"This journey became a real test for me. Africa, hard work, and zero comfort - the sea does not forgive weakness, but it rewards discipline. I found my path there and realized I should have started earlier."',
    storyUrl: '/blog',
  },
  {
    location: 'Odesa, Ukraine',
    name: 'Vlad',
    review:
      '"Choosing mechanics was one of the best decisions I have made. The engine room taught me discipline, responsibility, and independence. I would choose this path again without hesitation."',
    storyUrl: '/blog',
  },
  {
    name: 'Bogdan',
    review:
      '"This experience was a real test. No background, tough work, long shifts - the crab boat rewards discipline and stamina. I came with zero experience and proved I could grow from the first trip."',
    storyUrl: '/blog',
  },
  {
    location: 'Chisinau, Moldova',
    name: 'Alex',
    review:
      '"This move changed my life. From Chisinau to a fish factory in Norway, I found stable work at Solmari. Now I have steady income and confidence in tomorrow."',
    storyUrl: '/blog',
  },
  {
    location: 'Odesa, Ukraine',
    name: 'Volodymyr',
    review:
      '"I bought the course in April and now I am heading to my first crab vessel with no prior experience. I prepared my documents and found a job. No regrets - if you are unsure, take the course and go for it."',
    storyUrl: '/blog',
  },
  {
    location: 'Kherson, Ukraine',
    name: 'Vladimir',
    review:
      '"Getting on a Norwegian fishing vessel took persistence and real sea experience. The work is tough, but it pays well and gives stability. If you stay disciplined and focused, you can earn solid money and move forward."',
    storyUrl: '/blog',
  },
]

const isExternalUrl = (value: string): boolean => {
  return (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:')
  )
}

export const Reviews: React.FC<ReviewsProps> = ({
  cards = DEFAULT_REVIEWS,
  description = 'Hear from the fishermen and workers who started their journey with us. Real experiences, real results, and real opportunities at sea',
  locale = DEFAULT_BLOG_LOCALE,
  title = 'Stories from Our Fishing Community',
}) => {
  const messages = getSiteMessages(locale)
  const reviews = cards.length > 0 ? cards : DEFAULT_REVIEWS

  return (
    <section className="relative w-full bg-white overflow-hidden py-20 md:py-[140px]">
      <DecorativeLines color="rgba(7, 26, 38, 1)" opacity={0.05} showCenterLine={false} showMobile={false} />

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center gap-[56px]">
          <div className="flex flex-col items-center text-center gap-4 max-w-[480px]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#0C2B3A] text-base font-medium uppercase tracking-normal"
            >
              {messages.about.reviewsEyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#071A26] text-[34px] md:text-[52px] font-semibold leading-[125%]"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#0C2B3A] text-base font-normal leading-[145%]"
            >
              {description}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {reviews.map((review, index) => {
              const storyUrl = review.storyUrl || '/blog'
              const isExternal = isExternalUrl(storyUrl)
              const localizedStoryUrl = isExternal ? storyUrl : withBlogLocale(storyUrl, locale)

              return (
                <motion.div
                  key={`${review.name}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-ice-mist p-8 md:p-10 rounded-[2px] flex flex-col justify-between gap-12 group transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-14">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-2">
                        <span className="text-[#071A26] text-base font-bold leading-[145%]">{review.name}</span>
                        {review.location ? (
                          <span className="text-[#0C2B3A] text-base font-normal leading-[145%]">
                            {review.location}
                          </span>
                        ) : null}
                      </div>
                      <div className="w-[52px] h-[52px]">
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.5755 0L11.5971 30.1561H21.1367V52H0V32.8624L11.223 0H20.5755ZM51.4389 0L42.4604 30.1561H52V52H30.8633V32.8624L42.0863 0H51.4389Z" fill="#0C2B3A"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-[#071A26] text-lg font-normal leading-[145%] italic">
                      {review.review}
                    </p>
                  </div>

                  {isExternal ? (
                    <a
                      href={localizedStoryUrl}
                      className="flex items-center gap-2 cursor-pointer"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="flex flex-col">
                        <span className="text-[#071A26] text-base font-semibold lowercase leading-[145%]">
                          {messages.about.viewFullStory}
                        </span>
                        <div className="h-[1px] w-full bg-[#071A26] transition-transform duration-300 origin-left group-hover:scale-x-0" />
                      </div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" fill="#071A26"/>
                      </svg>
                    </a>
                  ) : (
                    <Link href={localizedStoryUrl} className="flex items-center gap-2 cursor-pointer">
                      <div className="flex flex-col">
                        <span className="text-[#071A26] text-base font-semibold lowercase leading-[145%]">
                          {messages.about.viewFullStory}
                        </span>
                        <div className="h-[1px] w-full bg-[#071A26] transition-transform duration-300 origin-left group-hover:scale-x-0" />
                      </div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" fill="#071A26"/>
                      </svg>
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
