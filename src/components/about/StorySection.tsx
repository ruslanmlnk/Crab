"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { DecorativeLines } from '../DecorativeLines'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

export const StorySection: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden py-10 md:py-[140px] px-6 md:px-[70px]">
      <DecorativeLines color="rgba(7, 26, 38, 1)" opacity={0.05} showCenterLine={false} showMobile={false} />
      
      <div className="container-custom relative z-10">
        <div className="max-w-[800px] flex flex-col gap-14 ml-0 lg:ml-auto mr-0 lg:mr-[70px]">
          {/* Main Story Content */}
          <div className="flex flex-col gap-10">
            {/* Intro */}
            <motion.div {...fadeInUp} className="flex flex-col gap-8">
              <p className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">
                My name is Vladimir, I&apos;m 32 years old, and I was born and raised in Kherson.
              </p>
              
              <div className="p-6 bg-ice-mist border-l-[3px] border-blue-dark">
                <blockquote className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">
                  My life in three words: &quot;Plenty to remember, nothing to tell the kids.&quot;
                </blockquote>
              </div>
            </motion.div>

            {/* How did your journey begin? */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }} className="flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <h2 className="text-blue-dark text-[28px] font-semibold leading-[125%]">
                  How did your journey begin?
                </h2>
                <p className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">
                  In 2011, I graduated from the Kherson Maritime College of the Fishing Industry with a degree in marine engineering. But honestly, I didn&apos;t work in my profession. I tried business, security jobs, and trade. At some point, I realized that real money wouldn&apos;t come that way, so I decided to restore my maritime documents. I don&apos;t regret this decision. Yes, it was hard, but I never thought about giving up.
                </p>
              </div>

              <div className="p-6 bg-ice-mist border-l-[3px] border-blue-dark">
                <blockquote className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">
                  &quot;Only in such conditions does a man understand that he is truly a man.&quot;
                </blockquote>
              </div>
            </motion.div>

            {/* What made you return to the sea? */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }} className="flex flex-col gap-5">
              <h2 className="text-blue-dark text-[28px] font-semibold leading-[125%]">
                What made you return to the sea?
              </h2>
              <p className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">
                In 2019, a friend of my father suggested I work in my profession to earn starting capital. I ended up in Sierra Leone, Africa, on a vessel called Dzintaryura. It was a real shock — the sea, exotic surroundings, hard labor, and the full realization that no one was coming to save me. The hardest part wasn&apos;t the lack of sleep or the exhausting unloading work, but an old technologist who constantly yelled and insulted everyone. And also the same faces for four months straight, plus an unreal craving for decent food.
              </p>
            </motion.div>

            {/* Which moments stayed with you the most? */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.3 }} className="flex flex-col gap-5">
              <h2 className="text-blue-dark text-[28px] font-semibold leading-[125%]">
                Which moments stayed with you the most?
              </h2>
              <p className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">
                Once in Conakry, we went to a local bar, and 14 days later I realized I had malaria. Those were hellish days. A fever close to 40°C, vomiting, severe dehydration — I thought it was the end. But the agent brought medication, and after some time I was back on watch.
              </p>
            </motion.div>

            {/* How do you feel about life at sea and earnings? */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.4 }} className="flex flex-col gap-5">
              <h2 className="text-blue-dark text-[28px] font-semibold leading-[125%]">
                How do you feel about life at sea and earnings?
              </h2>
              <p className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">
                If you&apos;re looking for a place where both your hands and your brain are valued, the sea is that place. Of course, a lot depends on the company, but even in the worst scenarios you&apos;ll earn around two thousand a month. I spent my first salary on gifts for my parents and son, traveled a bit, and rented a good apartment. While at sea, you don&apos;t really need money — maybe a couple hundred for beer.
              </p>
            </motion.div>

            {/* What is important to remember when working at sea? */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.5 }} className="flex flex-col gap-5">
              <h2 className="text-blue-dark text-[28px] font-semibold leading-[125%]">
                What is important to remember when working at sea?
              </h2>
              <p className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">
                If you&apos;ve got guts, welcome aboard. But there are a few things you must never forget:
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Safety. If you get injured, you'll forget about the sea forever.",
                  "Control yourself. You need to build a reputation as a reliable guy.",
                  "Watch your mouth. Rats are everywhere, and if you think your words about the captain will stay secret, you're deeply mistaken."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-dark flex-shrink-0" />
                    <span className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What do you do during your time off between voyages? */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.6 }} className="flex flex-col gap-5">
              <h2 className="text-blue-dark text-[28px] font-semibold leading-[125%]">
                What do you do during your time off between voyages?
              </h2>
              <p className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">
                In my free time, I work out and occasionally travel to different countries. My next plan is major dental work in Turkey and buying transportation. My family supports me and is happy that I&apos;ve found my path. The sea is a good way to legally earn decent money.
              </p>
            </motion.div>

            {/* What would you change in your career? */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.7 }} className="flex flex-col gap-5">
              <h2 className="text-blue-dark text-[28px] font-semibold leading-[125%]">
                What would you change in your career?
              </h2>
              <p className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">
                On my first day on the vessel, I would tell myself: &quot;Stay sharp, use your head.&quot; And if I could change anything in my career, I would have started working at sea much earlier than in 2019.
              </p>
            </motion.div>
          </div>

          {/* Story Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[737/573] overflow-hidden rounded-[2px]"
          >
            <Image 
              src="https://api.builder.io/api/v1/image/assets/TEMP/78a734f4ed72da6adf60679572794bc3d7a530c4?width=1474"
              alt="Vladimir on a vessel"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Conclusion */}
          <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }} className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <h2 className="text-blue-dark text-[28px] font-semibold leading-[125%]">
                Conclusion
              </h2>
              <p className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">
                After Africa, Vladimir worked for a Dutch company on one of the largest trawlers in the world. He has now moved to Norway, obtained all work permits, and will soon head out on his next voyage. Life at sea is a path full of challenges, but for real men, it is a chance to prove themselves!
              </p>
            </div>

            <div className="p-6 bg-ice-mist border-l-[3px] border-blue-dark">
              <blockquote className="text-blue-dark text-lg md:text-[18px] leading-[145%] font-normal">
                Life at sea is a path full of challenges, but for real men, it is a chance to prove themselves.
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
