"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { DecorativeLines } from '../DecorativeLines'

export const StorySection: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden py-[140px] px-6 md:px-[70px]">
      <DecorativeLines color="rgba(7, 26, 38, 1)" opacity={0.05} showCenterLine={false} showMobile={false} />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col gap-[56px] items-center">
          <div className="flex flex-col gap-4 items-start self-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#0C2B3A] text-base font-medium uppercase leading-[145%]"
            >
              Our Story
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#071A26] text-[32px] md:text-[52px] font-semibold leading-[125%] max-w-[800px]"
            >
              A journey through<br className="hidden md:block" /> offshore work
            </motion.h2>
          </div>
        </div>
      </div>
    </section>
  )
}
