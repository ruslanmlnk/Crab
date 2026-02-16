"use client"
import { motion, Variants } from 'framer-motion'

export const FromTheFleet: React.FC = () => {
  const articles = [
    {
      id: 1,
      tag: 'articles',
      title: 'Complete Guide to Crab Fishing Equipment',
      description: 'Proper equipment is essential for safe and efficient crab fishing. This guide covers the key tools used on professional crab vessels',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/7987feb7c14792a960f07fa1547bfa3bb8cc269e?width=808'
    },
    {
      id: 2,
      tag: 'cases',
      title: 'Vladimir’s Path: From Kherson to the Norwegian Coast',
      description: 'A firsthand story of working at sea — from early training and offshore challenges to building a career on Norwegian vessels',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/a05d44a9e6c1ea169d120f86763cbcc1957ecc7f?width=808'
    },
    {
      id: 3,
      tag: 'video',
      title: 'Barents Sea King Crab: Fishing Techniques',
      description: 'An overview of king crab fishing techniques in the Barents Sea, covering equipment, handling and real conditions on Norwegian vessels',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/5144d49e3f3b84e2d3548880f1410f242973fbf1?width=808'
    }
  ]

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
    <section className="bg-blue-dark section-padding relative overflow-hidden">
      {/* Background Large Text */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: -150, opacity: 0.04 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-[293px] text-[#E6F1F6] text-[240px] font-semibold leading-none tracking-[-14.3px] whitespace-nowrap pointer-events-none z-0"
      >
        FROM THE NORWEGIAN CRAB FLEET
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container-custom relative z-10 flex flex-col items-center gap-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {articles.map((article) => (
            <motion.div 
              key={article.id} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="article-card flex-1"
            >
              <div 
                className="h-[250px] w-full bg-cover bg-center p-3.5 relative"
                style={{ backgroundImage: `url('${article.image}')` }}
              >
                <div className="bg-[#D9EEFF] text-blue-dark text-[14px] font-bold px-4 py-1 rounded-full w-fit uppercase">
                  {article.tag}
                </div>
              </div>

              <div className="px-2 flex flex-col justify-between h-full py-4 gap-12">
                <div className="flex flex-col gap-2.5">
                  <h4 className="text-[18px] font-bold text-blue-dark leading-[145%]">{article.title}</h4>
                  <p className="text-sm text-blue-midnight leading-[145%] line-clamp-3">{article.description}</p>
                </div>

                <motion.button 
                  whileHover="hover"
                  className="flex items-center gap-2 group cursor-pointer w-fit"
                >
                  <div className="flex flex-col items-start border-0">
                    <span className="text-blue-dark font-semibold lowercase leading-[145%] text-sm">learn more</span>
                    <motion.div 
                      variants={{
                        hover: { scaleX: 0 }
                      }}
                      className="h-[1px] w-full bg-blue-dark origin-left" 
                    />
                  </div>
                  <motion.div 
                    variants={{
                      hover: { x: 5 }
                    }}
                    className="w-5 h-5 flex items-center justify-center"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <path d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" fill="#071A26"/>
                    </svg>
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-base btn-white mt-8 group"
        >
          <div className="flex flex-col items-start">
            <span className="text-white font-semibold lowercase">Read stories</span>
            <div className="h-[1px] w-full bg-white transition-transform origin-left group-hover:scale-x-0" />
          </div>
          <div className="w-6 h-6 flex items-center justify-center transition-transform group-hover:translate-x-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" fill="white"/>
            </svg>
          </div>
        </motion.button>
      </motion.div>
    </section>
  )
}
