"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DecorativeLines } from './DecorativeLines'
import { normalizeBlogLocale, type BlogLocale } from '@/lib/blog-locale'
import { getSiteMessages } from '@/lib/site-locale'

export const Header: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentLocale = normalizeBlogLocale(searchParams.get('locale'))
  const messages = getSiteMessages(currentLocale)

  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: messages.header.about, href: '/about' },
    { name: messages.header.faq, href: '/faq' },
    { name: messages.header.blog, href: '/blog' },
    { name: messages.header.contact, href: '/contact' },
  ]

  const updateLocale = (locale: BlogLocale) => {
    const params = new URLSearchParams(searchParams.toString())

    if (locale === 'en') {
      params.delete('locale')
    } else {
      params.set('locale', locale)
    }

    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
    setIsLangOpen(false)
    setIsMenuOpen(false)
  }

  const getLinkHref = (href: string) => {
    if (href.startsWith('#')) {
      return href
    }

    if (currentLocale === 'en') {
      return href
    }

    const separator = href.includes('?') ? '&' : '?'
    return `${href}${separator}locale=${currentLocale}`
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren"
      } as any
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      } as any
    }
  }

  const listItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  }

  return (
    <header className="w-full bg-blue-dark py-4 md:py-6 border-b border-white/5 relative z-[100]">
      <DecorativeLines color="rgba(255, 255, 255, 1)" opacity={0.15} showCenterLine={false} showMobile={false} />
      <div className="mx-auto max-w-[1328px] px-6 flex justify-between items-center whitespace-nowrap">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" } as any}
          className="flex-shrink-0"
        >
          <Link href={getLinkHref('/')} aria-label="Go to homepage">
            <Image
              src="/images/logo.svg"
              alt="Crab Norway Logo"
              width={177}
              height={48}
              className="w-[140px] md:w-[177px] h-auto object-contain"
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-[68px]">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="flex items-center gap-12"
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Link
                  href={getLinkHref(link.href)}
                  className="text-[18px] font-bold uppercase transition-opacity hover:opacity-70 leading-[145%]"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Language Switcher (Desktop) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative"
          >
            <div 
              className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-70"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <span className="text-[18px] font-bold uppercase leading-[145%]">
                {currentLocale.toUpperCase()}
              </span>
              <motion.svg 
                width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" 
                className="mt-0.5"
                animate={{ rotate: isLangOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </div>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 bg-blue-dark py-2 z-50 shadow-xl border border-white/10 mt-2"
                >
                  <div className="flex flex-col">
                    <button
                      className={`px-6 py-2 text-left text-[16px] font-bold uppercase transition-colors hover:bg-white/5 whitespace-nowrap ${
                        currentLocale === 'en' ? 'text-white' : 'text-white/60'
                      }`}
                      onClick={() => updateLocale('en')}
                      type="button"
                    >
                      EN
                    </button>
                    <button
                      className={`px-6 py-2 text-left text-[16px] font-bold uppercase transition-colors hover:bg-white/5 whitespace-nowrap ${
                        currentLocale === 'ru' ? 'text-white' : 'text-white/60'
                      }`}
                      onClick={() => updateLocale('ru')}
                      type="button"
                    >
                      RU
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            className="text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path d="M8 8L24 24M8 24L24 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <path d="M4 8H28M4 16H28M4 24H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-full left-0 w-full bg-blue-dark border-b border-white/10 md:hidden overflow-hidden z-[99]"
          >
            <div className="container-custom py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={listItemVariants}>
                  <Link
                    href={getLinkHref(link.href)}
                    className="text-[20px] font-bold uppercase text-white hover:text-white/70 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={listItemVariants} className="pt-4 border-t border-white/10 flex flex-col gap-4">
                <span className="text-white/60 uppercase text-sm font-bold tracking-widest">
                  {messages.header.language}
                </span>
                <div className="flex gap-6">
                  <button
                    className={`text-[18px] font-bold uppercase ${
                      currentLocale === 'en' ? 'text-white' : 'text-white/40'
                    }`}
                    onClick={() => updateLocale('en')}
                    type="button"
                  >
                    EN
                  </button>
                  <button
                    className={`text-[18px] font-bold uppercase ${
                      currentLocale === 'ru' ? 'text-white' : 'text-white/40'
                    }`}
                    onClick={() => updateLocale('ru')}
                    type="button"
                  >
                    RU
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
