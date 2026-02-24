"use client"
import React from 'react'

interface DecorativeLinesProps {
  color?: string
  opacity?: number
  fade?: 'top' | 'bottom' | 'both' | 'none'
  fadeAmount?: number // Percentage from 0 to 100
  showCenterLine?: boolean
  showMobile?: boolean
}

export const DecorativeLines: React.FC<DecorativeLinesProps> = () => null
