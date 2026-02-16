"use client"
import React, { useState } from 'react'

export const Header: React.FC = () => {
  const [isLangOpen, setIsLangOpen] = useState(false)

  return (
    <header className="w-full bg-blue-dark py-6 flex justify-center border-b border-white/5 relative z-50"    >
      <div className="max-w-[1440px] w-full px-10 md:px-20 flex justify-between items-center whitespace-nowrap">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/4a174e2def7f3e046be120f5486bb4104398fc1a?width=354"
            alt="Crab Norway Logo"
            className="w-[177px] h-[64px] object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-[68px]">
          <div className="flex items-center gap-12">
            <a href="#" className="text-[18px] font-bold uppercase transition-opacity hover:opacity-70 leading-[145%]">
              About
            </a>
            <a href="#" className="text-[18px] font-bold uppercase transition-opacity hover:opacity-70 leading-[145%]">
              FAQ
            </a>
            <a href="#" className="text-[18px] font-bold uppercase transition-opacity hover:opacity-70 leading-[145%]">
              Blog
            </a>
            <a href="#" className="text-[18px] font-bold uppercase transition-opacity hover:opacity-70 leading-[145%]">
              Contact
            </a>
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-70"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <span className="text-[18px] font-bold uppercase leading-[145%]">EN</span>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={`mt-0.5 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}>
                <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isLangOpen && (
              <div className="absolute top-full right-0 bg-blue-dark rounded-none w-[100px] py-2 z-50 shadow-xl">
                <div className="flex flex-col">
                  <button className="px-5 py-2 text-left text-[18px] font-bold uppercase transition-colors text-white hover:bg-white/5">
                    EN
                  </button>
                  <button className="px-5 py-2 text-left text-[18px] font-bold uppercase transition-colors text-white/60 hover:bg-white/5">
                    RU
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
