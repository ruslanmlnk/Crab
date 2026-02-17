import React from 'react'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { WhoWeAre } from '@/components/WhoWeAre'
import { RealExperience } from '@/components/RealExperience'
import { WhatYouFind } from '@/components/WhatYouFind'
import { Pricing } from '@/components/Pricing'
import { FromTheFleet } from '@/components/FromTheFleet'
import { FAQ } from '@/components/FAQ'
import { GetInTouch } from '@/components/GetInTouch'
import { Footer } from '@/components/Footer'

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhoWeAre />
        <RealExperience />
        <WhatYouFind />
        <Pricing />
        <FromTheFleet />
        <FAQ />
        <GetInTouch />
      </main>
      <Footer />
    </div>
  )
}
