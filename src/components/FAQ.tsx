"use client"
import React, { useState } from 'react'

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Who can apply for this job?',
      answer: 'Anyone who completes a mandatory safety course and passes a medical examination.'
    },
    {
      question: 'Who is this work suitable for?',
      answer: 'People with high physical endurance, mental resilience, and the ability to work in extreme weather conditions.'
    },
    {
      question: 'What are the salaries on a crab vessel in Norway?',
      answer: 'Salaries can vary significantly but often range from €4,000 to €8,000 per month depending on the catch and position.'
    },
    {
      question: 'What are the salaries on fishing vessels?',
      answer: 'Similar to crab vessels, fishing vessel salaries are performance-based and can be very rewarding during peak seasons.'
    },
    {
      question: 'What are the salaries at factories?',
      answer: 'Factory work typically offers a stable hourly wage or a fixed salary, often starting around €3,000 - €4,500 per month.'
    },
    {
      question: 'Is experience important?',
      answer: 'While experience is helpful, many vessels offer entry-level positions for those willing to work hard and learn fast.'
    },
    {
      question: 'Do you need a maritime education?',
      answer: 'A formal maritime education is not always required for entry-level deckhand roles, but specific safety certifications are mandatory.'
    },
    {
      question: 'What are the watch schedules and contract duration?',
      answer: 'Watch schedules are usually 6 hours on and 6 hours off. Contract durations vary from 4 to 8 weeks at sea.'
    }
  ]

  return (
    <section className="bg-white">
      {/* FAQ Header Section */}
      <div 
        className="w-full h-[500px] bg-cover bg-center flex flex-col justify-end pb-12 overflow-hidden"
        style={{ backgroundImage: `url('https://api.builder.io/api/v1/image/assets/TEMP/ec6b349f618e995449db6570acf6b8ff6a12f26b?width=2880')` }}
      >
        <div className="container-custom flex flex-col md:flex-row items-end justify-between gap-6">
          <h2 className="text-h2-faq text-blue-dark max-w-[800px]">
            Frequently asked questions
          </h2>
          <p className="text-blue-midnight text-lg max-w-[258px] pb-4">
            Everything you need to know about crab fishing in Norway
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="container-custom py-20 md:py-[140px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0 items-start">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`p-8 bg-white transition-all cursor-pointer border-b border-ice-mist ${activeIndex === index ? 'md:row-span-2' : ''}`}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center gap-4">
                <h4 className="text-[18px] font-bold text-blue-dark leading-[145%]">{faq.question}</h4>
                <div className={`transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 9L12 15L6 9" stroke="#071A26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              {activeIndex === index && (
                <div className="mt-6 pt-6 border-t border-ice-mist animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-[18px] font-medium text-blue-midnight leading-[145%]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
