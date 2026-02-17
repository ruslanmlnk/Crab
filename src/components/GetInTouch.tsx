"use client"
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

export const GetInTouch: React.FC = () => {
  return (
    <section className="relative w-full py-25 md:py-0 h-auto md:h-[700px] overflow-hidden flex items-center">
      {/* Background with Gradient Overlay as per Figma */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://api.builder.io/api/v1/image/assets/TEMP/66a516e90f1558e5509588831f967ef5aab6d6fa?width=2880"
          alt="Get in Touch Background"
          fill
          className="object-cover"
          priority
        />
        {/* Uniform 30% overlay as per Figma: rgba(11, 31, 49, 0.30) */}
        <div className="absolute inset-0 bg-[#0B1F31]/30" />
      </div>

      {/* Content Layout - Exactly 50% split as per 720px padding on 1440px width */}
      <div className="relative z-10 w-full h-full flex justify-center items-center">
        <div className="w-full max-w-[1350px] px-6 h-full grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block h-full" />
          <div className="flex flex-col justify-center h-full">
            <GetInTouchContent />
          </div>
        </div>
      </div>
    </section>
  )
}

const GetInTouchContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="w-full max-w-[650px] bg-white/10 backdrop-blur-[12px] p-8 md:p-[48px] border border-white/10 rounded-sm shadow-2xl"
  >
    <div className="flex flex-col gap-12 md:gap-[56px]">
      {/* Header Container */}
      <div className="flex justify-between items-start gap-4">
        <div className="text-[#E6F1F6] font-medium text-sm md:text-base uppercase tracking-[0.05em] opacity-90 -rotate-[0.2deg]">
          get in touch
        </div>
        <div className="relative w-[140px] h-[70px] md:w-[200px] md:h-[100px] overflow-hidden rounded-[2px] flex-shrink-0">
          <Image
            src="https://api.builder.io/api/v1/image/assets/TEMP/d91eeb7960bbb03f6efe4a901239777e93203b1a?width=400"
            alt="Underwater"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-12 md:gap-[56px]">
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-3xl md:text-[44px] font-bold leading-[110%] tracking-tight m-0">
            Get clear guidance before working at sea
          </h2>
          <p className="text-white/70 text-sm md:text-base font-normal leading-[145%] max-w-[471px]">
            Based on real offshore experience, we help you understand what to expect, 
            how to prepare, and how to take your first steps on fishing vessels
          </p>
        </div>

        {/* Contact Link */}
        <div className="flex items-center gap-2 group cursor-pointer w-fit transition-opacity hover:opacity-80">
          <div className="flex flex-col">
            <span className="text-white text-base md:text-[16px] font-semibold lowercase leading-[145%]">
              contact us
            </span>
            <div className="h-[1px] bg-white w-full" />
          </div>
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" 
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

