import React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { FloatingHiringPopup } from '@/components/FloatingHiringPopup'
import './styles.css'

const geistSans = Geist({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-geist-mono',
})

const resolveMetadataBase = (): URL => {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL

  if (!configuredUrl) {
    return new URL('http://localhost:3000')
  }

  try {
    return new URL(configuredUrl)
  } catch {
    return new URL(`https://${configuredUrl}`)
  }
}

export const metadata: Metadata = {
  description: 'Crab Norway - Inside the industry log of the Norwegian crab fishing industry',
  metadataBase: resolveMetadataBase(),
  title: 'Crab Norway',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div id="app">{children}</div>
        <FloatingHiringPopup />
      </body>
    </html>
  )
}
