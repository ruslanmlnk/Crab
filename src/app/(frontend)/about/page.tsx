import React from 'react'
import { Header } from '@/components/Header'
import { AboutHero } from '@/components/about/AboutHero'
import { WhoWeAre } from '@/components/WhoWeAre'
import { StorySection } from '@/components/about/StorySection'
import { RealExperience } from '@/components/RealExperience'
import { Reviews } from '@/components/about/Reviews'
import { GetInTouch } from '@/components/GetInTouch'
import { Footer } from '@/components/Footer'

export default async function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <AboutHero />
        <WhoWeAre />
        <StorySection />
        <RealExperience isRight={true}/>
        <Reviews />
        {/* Other sections will go here later */}
        <GetInTouch />
      </main>
      <Footer />
    </div>
  )
}
