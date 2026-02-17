"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface DecorativeLinesProps {
  color?: string
  opacity?: number
  fade?: 'top' | 'bottom' | 'both' | 'none'
  fadeAmount?: number // Percentage from 0 to 100
  showCenterLine?: boolean
  showMobile?: boolean
}

export const DecorativeLines: React.FC<DecorativeLinesProps> = ({ 
  color = "rgba(255, 255, 255, 1)", 
  opacity = 0.15,
  fade = 'none',
  fadeAmount, // Optional custom fade amount
  showCenterLine = true,
  showMobile = true
}) => {
  let backgroundStyle = {}

  switch (fade) {
    case 'top':
      const topStart = fadeAmount !== undefined ? fadeAmount : 20
      backgroundStyle = {
        background: `linear-gradient(to bottom, transparent 0%, ${color} ${topStart}%, ${color} 100%)`
      }
      break
    case 'bottom':
      // If fadeAmount is provided, we treat it as the point where line becomes fully transparent
      const bottomEnd = fadeAmount !== undefined ? fadeAmount : 80
      backgroundStyle = {
        background: `linear-gradient(to bottom, ${color} 0%, ${color} ${Math.max(0, bottomEnd - 15)}%, transparent ${bottomEnd}%, transparent 100%)`
      }
      break
    case 'both':
      backgroundStyle = {
        background: `linear-gradient(to bottom, transparent 0%, ${color} 15%, ${color} 85%, transparent 100%)`
      }
      break
    case 'none':
    default:
      backgroundStyle = {
        backgroundColor: color
      }
      break
  }

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${!showMobile ? 'hidden md:block' : ''}`}>
      <div className="container-custom h-full relative flex justify-between">
        {/* Left Line */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: opacity }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-[1px] h-full" 
          style={backgroundStyle} 
        />
        
        {/* Center Line */}
        {showCenterLine && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: opacity }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2" 
            style={backgroundStyle} 
          />
        )}
        
        {/* Right Line */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: opacity }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
          className="w-[1px] h-full" 
          style={backgroundStyle} 
        />
      </div>
    </div>
  )
}
