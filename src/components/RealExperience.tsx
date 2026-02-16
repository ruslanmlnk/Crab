"use client"
import React, { useRef } from 'react'
import { motion } from 'framer-motion'

export const RealExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const experiences = [
    {
      id: '01.',
      label: 'Real path, not theory',
      title: 'Built on firsthand experience — from fishing vessel entry level in Africa, Nederland to work on norwegian fishing/crab boat. More that 6 years experience',
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
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(0deg, rgba(11, 31, 49, 0.50) 0%, rgba(11, 31, 49, 0.50) 100%), url('${backgroundImage}')`
          }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      {/* Scrolling Content Blocks */}
      <div className="relative z-10 -mt-[100vh]">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="w-full h-screen flex items-center">
            <div className="container-custom w-full">
              <motion.div 
                initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ margin: "-20%", once: false }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`max-w-[632px] p-8 md:p-12 glass-card flex gap-8 ${index % 2 === 1 ? 'ml-auto' : ''}`}
              >
                <span className="text-[20px] font-bold leading-[145%] text-white shrink-0">{exp.id}</span>
                <div className="flex flex-col gap-4">
                  <span className="text-label text-ice-mist uppercase tracking-wider">{exp.label}</span>
                  <h3 className="text-h3 text-white leading-[145%]">{exp.title}</h3>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
