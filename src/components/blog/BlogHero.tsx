"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getBlogMessages, type BlogLocale } from '@/lib/blog-locale'

interface BlogHeroProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  categories: Array<{
    label: string
    slug: string
  }>
  locale: BlogLocale
}

const heroBackgroundImage =
  "url('https://api.builder.io/api/v1/image/assets/TEMP/b0ab1ee8a36a96cac183b51ffa220972bea7af71?width=2880')"

export const BlogHero: React.FC<BlogHeroProps> = ({ 
  activeCategory, 
  onCategoryChange, 
  categories,
  locale,
}) => {
  const messages = getBlogMessages(locale)

  return (
    <section className="relative w-full overflow-hidden bg-white pt-[120px] pb-[48px] md:pt-[140px]">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: heroBackgroundImage,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: heroBackgroundImage,
            backgroundPosition: '-243.73px -429.483px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '147.802% 340.208%',
          }}
        />
      </div>
      
      <div 
        className="absolute left-1/2 top-0 w-px h-[900px] -translate-x-1/2 hidden lg:block z-10"
        style={{ 
          background: "linear-gradient(180deg, rgba(133, 167, 183, 0.00) 5%, rgba(133, 167, 183, 0.40) 85%, rgba(133, 167, 183, 0.00) 100%)",
        }}
      />

      <div className="container-custom relative z-20 px-6 lg:px-[70px]">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-start">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#071A26] text-[44px] sm:text-[56px] md:text-[80px] font-semibold leading-[125%] whitespace-nowrap"
            >
              {messages.heroLine1}
            </motion.h1>
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.1 }}
                 className="text-[#071A26] text-[44px] sm:text-[56px] md:text-[80px] font-semibold leading-[125%]"
               >
                 {messages.heroLine2}
               </motion.h1>
               <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="text-[#0C2B3A] text-base font-normal leading-[145%] max-w-[320px] md:pt-4"
               >
                 {messages.heroDescription}
               </motion.p>
            </div>
          </div>

          <div className="flex flex-wrap items-start gap-x-8 gap-y-3">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.05) }}
                onClick={() => onCategoryChange(cat.slug)}
                className="flex flex-col items-start gap-1 transition-colors duration-300"
                type="button"
              >
                <span
                  className={`text-base font-semibold leading-[145%] ${
                    activeCategory === cat.slug
                      ? 'text-[#071A26]'
                      : 'text-[#0B1F31]/30 hover:text-[#071A26]'
                  }`}
                >
                  {cat.label}
                </span>
                <AnimatePresence>
                  {activeCategory === cat.slug && (
                    <motion.div
                      layoutId="categoryUnderline"
                      className="h-px w-full bg-[#071A26]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
