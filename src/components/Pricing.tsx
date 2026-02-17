"use client"
import { motion, Variants } from 'framer-motion'
import { DecorativeLines } from './DecorativeLines'

export const Pricing: React.FC = () => {
  const plans = [
    {
      id: 1,
      title: 'Employer Database',
      price: '€400',
      tag: 'Employer Database',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/eb4e8008b9a7327b6f3e17a384db1ff4f083c0f3?width=768',
      features: [
        '1000+ verified employer contacts (Norway, Denmark, UK, Europe)',
        'No middlemen, no fake listings — direct company contacts only',
        'Full database access (apply independently)'
      ],
      ideal: 'People ready to take action and apply on their own'
    },
    {
      id: 2,
      title: 'Full Support Course',
      price: '€800',
      tag: 'Full Support Course',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/a2dd0a2b28130c4d6202529111b2d5ab43148127?width=768',
      features: [
        'Step-by-step guidance from “I don’t know where to start” to sending CVs',
        'Professional CV tailored for fishing, crab, and offshore jobs',
        'Guidance on how to communicate with employers',
        'Personal support from me (calls + messages)',
        'Private community access',
        '4 group Zoom calls + weekly reviews'
      ],
      ideal: 'Those who want full guidance, feedback, and faster results'
    }
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } as any
    },
  }

  return (
    <section className="bg-ice-mist section-padding relative">
      <DecorativeLines color="rgba(7, 26, 38, 1)" opacity={0.15} fade="bottom" fadeAmount={25} showCenterLine={false} />
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container-custom flex flex-col items-center gap-14 md:gap-[48px]"
      >
        <motion.div variants={cardVariants} className="w-full flex flex-col items-center gap-4 text-center">
          <span className="text-label text-blue-midnight">Pricing</span>
          <h2 className="text-h2 text-blue-dark">Pricing for Every Adventure</h2>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center gap-5 w-full">
          {plans.map((plan) => (
            <motion.div 
              key={plan.id} 
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="price-card w-full md:w-[400px]"
            >
              <div 
                className="h-[230px] w-full bg-cover bg-center p-3.5 relative"
                style={{ backgroundImage: `url('${plan.image}')` }}
              >
                <div className="bg-[#D9EEFF] text-blue-dark text-[14px] font-bold px-4 py-1 rounded-full w-fit uppercase">
                  {plan.tag}
                </div>
              </div>

              <div className="flex flex-col gap-8 w-full">
                <div className="flex items-baseline gap-1">
                  <span className="text-[35px] font-bold tracking-tight text-blue-dark">{plan.price}</span>
                  <span className="text-base text-blue-dark tracking-wide">/access</span>
                </div>

                <motion.div 
                  whileHover="hover"
                  className="btn-base btn-dark w-full justify-center group cursor-pointer"
                >
                  <div className="flex flex-col items-start font-bold">
                    <span>Purchase now</span>
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
                </motion.div>

                <div className="flex flex-col gap-2 min-h-[160px]">
                  <span className="text-sm font-bold tracking-[3px] uppercase text-[#1C4D74]">Includes:</span>
                  <ul className="text-sm text-blue-dark flex flex-col gap-1 list-none p-0">
                    {plan.features.map((feature, i) => (
                      <li key={i}>— {feature}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm text-blue-dark pt-4 border-t border-ice-mist">
                  <span className="font-bold">Ideal for:</span> {plan.ideal}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
