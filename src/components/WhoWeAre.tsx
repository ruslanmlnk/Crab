"use client"
import React from 'react'
import { motion, Variants } from 'framer-motion'
import { DecorativeLines } from './DecorativeLines'

type WhoWeAreProps = {
  description?: string
  learnMoreUrl?: string
}

const DEFAULT_DESCRIPTION =
  'An independent project sharing real experience and knowledge from inside the Norwegian crab fishing industry'

export const WhoWeAre: React.FC<WhoWeAreProps> = ({
  description = DEFAULT_DESCRIPTION,
  learnMoreUrl = '/about',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" } as any
    },
  }

  return (
    <section className="bg-ice-mist relative overflow-hidden min-h-[700px] flex items-center">
      <DecorativeLines color="rgba(7, 26, 38, 1)" opacity={0.15} showCenterLine={false} showMobile={false} />
      {/* Background SVG Ornament */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[552px] pointer-events-none"
      >
        <svg width="460" height="552" viewBox="0 0 460 552" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M138.376 432.565C163.682 458.253 190.118 468.865 225.949 470.025L225.773 343.803L225.332 267.43C193.01 275.342 162.273 283.518 131.345 294.336C111.94 301.103 93.3857 308.119 75.0667 316.853C68.2705 320.083 63.5733 326.541 62.443 333.983L57.7165 364.544C56.5863 371.986 57.1 379.605 59.2137 386.812L77.6942 449.416C53.9294 455.523 30.0766 457.695 5.21094 458.899C23.7648 462.48 42.6269 463.449 62.5458 463.64C90.4059 462.422 119.499 453.424 138.39 432.55L138.376 432.565Z" fill="white" />
          <path d="M402.283 364.544L397.556 333.983C396.426 326.541 391.714 320.083 384.933 316.853C366.628 308.119 348.045 301.103 328.655 294.336C297.712 283.518 266.975 275.342 234.667 267.43L234.227 343.803L234.051 470.025C269.881 468.865 296.332 458.238 321.624 432.565C340.515 453.438 369.594 462.436 397.468 463.655C417.387 463.449 436.249 462.495 454.803 458.913C429.952 457.71 406.085 455.523 382.32 449.431L400.8 386.826C402.943 379.605 403.457 371.986 402.298 364.559L402.283 364.544Z" fill="white" />
          <path d="M23.0145 93.2389L36.0492 108.123L81.8466 238.176L75.7843 240.07V312.171L110.397 296.92C130.888 287.893 151.453 281.463 173.295 274.535L173.427 247.115L197.104 245.985L197.368 266.946L214.586 262.939V245.809L229.998 245.838L245.411 245.809V262.939L262.629 266.946L262.893 245.985L286.57 247.115L286.702 274.535C308.559 281.463 329.109 287.893 349.6 296.92L384.212 312.171V240.07L378.15 238.176L423.948 108.123L436.982 93.2389C438.01 92.0352 440.52 90.3472 440.3 89.0555C439.683 85.2684 432.725 79.7932 429.79 83.1546L416.315 98.5966L276.926 103.69L276.677 81.9803L258.284 81.8482L258.152 104.16L236.574 104.13L235.576 63.7935L254.35 60.6963C257.33 60.2119 259.987 58.5826 261.763 56.1752L270.365 44.6085L234.578 44.2562L234.842 1.07154L230.013 0L225.184 1.07154L225.448 44.2562L189.661 44.6085L198.234 56.1752" fill="white" />
        </svg>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="mx-auto max-w-[648px] px-6 relative z-10 flex flex-col items-center"
      >
        <div className="w-full flex flex-col items-center gap-6 text-center">
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
            <span className="text-blue-dark text-[14px] md:text-[16px] font-medium uppercase leading-[145%] tracking-normal">Who We Are</span>
            <h2 className="text-blue-dark text-[34px] md:text-[44px] font-semibold leading-[110%]">
              {description}
            </h2>
          </motion.div>
          
          <motion.a 
            variants={itemVariants}
            whileHover="hover"
            href={learnMoreUrl}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="flex flex-col items-start">
              <span className="text-blue-dark text-[16px] font-semibold lowercase leading-[145%]">learn more</span>
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
              className="w-6 h-6 flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" fill="#071A26"/>
              </svg>
            </motion.div>
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
