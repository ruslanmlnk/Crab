"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { DecorativeLines } from '../DecorativeLines'

interface Review {
  name: string
  location?: string
  quote: string
}

const reviews: Review[] = [
  {
    name: 'Vladimir',
    location: 'Kherson, Ukraine',
    quote: '“This journey became a real test for me. Africa, hard work, and zero comfort — the sea doesn’t forgive weakness, but it rewards discipline. I found my path there and realized I should have started earlier.”',
  },
  {
    name: 'Vlad',
    location: 'Odesa, Ukraine',
    quote: '“Choosing mechanics was one of the best decisions I’ve made. The engine room taught me discipline, responsibility, and independence. I’d choose this path again without hesitation.”',
  },
  {
    name: 'Bogdan',
    quote: '“This experience was a real test. No background, tough work, long shifts — the crab boat rewards discipline and stamina. I came with zero experience and proved I could grow from the first trip.”',
  },
  {
    name: 'Alex',
    location: 'Chisinau, Moldova',
    quote: '“This move changed my life. From Chisinau to a fish factory in Norway, I found stable work at Solmari. Now I have steady income and confidence in tomorrow.”',
  },
  {
    name: 'Volodymyr',
    location: 'Odesa, Ukraine',
    quote: '“I bought the course in April and now I’m heading to my first crab vessel with no prior experience. I prepared my documents and found a job. No regrets — if you’re unsure, take the course and go for it.”',
  },
  {
    name: 'Vladimir',
    location: 'Kherson, Ukraine',
    quote: '“Getting on a Norwegian fishing vessel took persistence and real sea experience. The work is tough, but it pays well and gives stability. If you stay disciplined and focused, you can earn solid money and move forward.”',
  },
]

export const Reviews: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden py-20 md:py-[140px]">
      <DecorativeLines color="rgba(7, 26, 38, 1)" opacity={0.05} showCenterLine={false} showMobile={false} />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center gap-[56px]">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4 max-w-[480px]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#0C2B3A] text-base font-medium uppercase tracking-normal"
            >
              reviews
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#071A26] text-[34px] md:text-[52px] font-semibold leading-[125%]"
            >
              Stories from Our Fishing Community
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#0C2B3A] text-base font-normal leading-[145%]"
            >
              Hear from the fishermen and workers who started their journey with us. Real experiences, real results, and real opportunities at sea
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
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
                      {review.location && (
                        <span className="text-[#0C2B3A] text-base font-normal leading-[145%]">{review.location}</span>
                      )}
                    </div>
                    {/* Quote Icon */}
                    <div className="w-[52px] h-[52px]">
                      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.5755 0L11.5971 30.1561H21.1367V52H0V32.8624L11.223 0H20.5755ZM51.4389 0L42.4604 30.1561H52V52H30.8633V32.8624L42.0863 0H51.4389Z" fill="#0C2B3A"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-[#071A26] text-lg font-normal leading-[145%] italic">
                    {review.quote}
                  </p>
                </div>

                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-[#071A26] text-base font-semibold lowercase leading-[145%]">View full story</span>
                    <div className="h-[1px] w-full bg-[#071A26] transition-transform duration-300 origin-left group-hover:scale-x-0" />
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" fill="#071A26"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
