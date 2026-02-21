"use client"
import { motion, Variants } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { DecorativeLines } from './DecorativeLines'
import { BlogCard } from './BlogCard'
import { normalizeBlogLocale } from '@/lib/blog-locale'

const articles = [
  {
    id: 1,
    tag: 'articles',
    title: 'Complete Guide to Crab Fishing Equipment',
    description: 'Proper equipment is essential for safe and efficient crab fishing. This guide covers the key tools used on professional crab vessels',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/ab705b5f9ac0b32db2130db4ff43352c2fff96df?width=808',
    slug: 'crab-fishing-equipment-guide'
  },
  {
    id: 2,
    tag: 'cases',
    title: 'Vladimir’s Path: From Kherson to the Norwegian Coast',
    description: 'A firsthand story of working at sea — from early training and offshore challenges to building a career on Norwegian vessels',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/5d3be1f4242085bff3eb942b98f7c621ba8aa629?width=808',
    slug: 'vladimirs-path-offshore-career'
  },
  {
    id: 3,
    tag: 'video',
    title: 'Barents Sea King Crab: Fishing Techniques',
    description: 'An overview of king crab fishing techniques in the Barents Sea, covering equipment, handling and real conditions on Norwegian vessels',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/8e2e052f8fcc845d02a2367b317a28b95048b7af?width=808',
    slug: 'barents-sea-king-crab-techniques'
  }
]

export const FromTheFleet: React.FC = () => {
  const searchParams = useSearchParams()
  const locale = normalizeBlogLocale(searchParams.get('locale'))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="bg-blue-dark py-20 md:py-[140px] flex flex-col justify-center items-center gap-12 overflow-hidden relative">
      <DecorativeLines color="rgba(255, 255, 255, 1)" opacity={0.15} fade="top" showCenterLine={false} showMobile={false} />
      
      {/* Background Large Text */}
      <motion.div 
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: -100, opacity: 0.15 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-[239px] left-0 text-[#E6F1F6] text-[180px] md:text-[240px] font-semibold leading-[145%] pointer-events-none z-0 select-none uppercase whitespace-nowrap"
      >
        FROM THE NORWEGIAN CRAB FLEET
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container-custom relative z-10 flex flex-col items-center gap-[47px] w-full px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
          {articles.map((article) => (
            <BlogCard 
              key={article.id} 
              title={article.title}
              description={article.description}
              category={article.tag}
              image={article.image}
              locale={locale}
              slug={article.slug}
              showBorder={false}
              imageHeight="h-[221px]"
              variants={itemVariants}
            />
          ))}
        </div>

        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-[23.2px] py-[11.2px] rounded-[40px] border border-white group"
        >
          <div className="flex flex-col items-start relative">
            <span className="text-white text-[16px] font-semibold leading-[23px] lowercase">Read stories</span>
            <div className="h-[1px] w-full bg-white transition-all duration-300" />
          </div>
          <div className="w-6 h-6 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" fill="white"/>
            </svg>
          </div>
        </motion.button>
      </motion.div>
    </section>
  )
}
