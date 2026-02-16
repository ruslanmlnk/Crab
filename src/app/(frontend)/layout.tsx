import React from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import './styles.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata = {
  description: 'Crab Norway - Inside the industry log of the Norwegian crab fishing industry',
  title: 'Crab Norway',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div id="app">{children}</div>
      </body>
    </html>
  )
}

