"use client"
import Image from 'next/image'
import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { DecorativeLines } from './DecorativeLines'

export const RealExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const experiences = [
    {
      id: '01.',
      label: 'Real path, not theory',
      title: 'Built on firsthand \nexperience — from fishing vessle entry level in Africa, Nederland to work on norwegian fishing/crab boat. More that 6 years experience',
    },
    {
      id: '02.',
      label: 'Practical guidance',
      title: 'No abstract advice. Only real information about work conditions and what to expect at sea',
    },
    {
      id: '03.',
      label: 'Personal involvement',
      title: 'Direct guidance from someone who has been through this path and understands its challenges',
    }
  ]

  // Main background image
  const backgroundImage = 'https://api.builder.io/api/v1/image/assets/TEMP/0d446201a3dad7bfb8c419afbb32531a9a882784?width=2880'

  return (
    <section ref={containerRef} className="relative w-full">
      {/* Sticky Background Layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src={backgroundImage}
            alt="Real Experience Background"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-blue-dark/50" />
        </motion.div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <DecorativeLines color="rgba(255, 255, 255, 1)" opacity={0.2} fade="none" showCenterLine={false} showMobile={false} />
      </div>

      {/* Scrolling Content Blocks */}
      <div className="relative z-10 -mt-[100vh] flex flex-col gap-[70px] pt-[140.1px] pb-[140px] overflow-x-hidden">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="w-full">
            <div className="mx-auto max-w-[1348px] px-6 w-full">
              <motion.div 
                initial={{ opacity: 0, y: 50, x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : (index % 2 === 0 ? -50 : 50) }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ margin: "-20%", once: false }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full max-w-[612.7px] p-6 md:p-12 glass-card backdrop-blur-[6px] flex items-start gap-[16px] md:gap-[32px] ${index % 2 === 1 ? 'md:ml-auto' : ''}`}
              >
                <span className="text-[20px] leading-[145%] text-white shrink-0">{exp.id}</span>
                <div className="flex w-full flex-col gap-[8px]">
                  <span className="text-[16px] font-medium leading-[145%] text-ice-mist uppercase">
                    {exp.label}
                  </span>
                  <h3 className="max-w-[459px] text-[24px] md:text-[32px] font-semibold leading-[46px] text-white whitespace-pre-line">{exp.title}</h3>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
