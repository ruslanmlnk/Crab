import React from 'react'
import type { Metadata } from 'next'

import { Header } from '@/components/Header'
import { AboutHero } from '@/components/about/AboutHero'
import { WhoWeAre } from '@/components/WhoWeAre'
import { RealExperience } from '@/components/RealExperience'
import { Reviews } from '@/components/about/Reviews'
import { Footer } from '@/components/Footer'
import { normalizeBlogLocale } from '@/lib/blog-locale'
import { getAboutContent } from '@/lib/about'

type AboutPageProps = {
  searchParams?: Promise<{
    locale?: string | string[]
  }>
}

export async function generateMetadata({
  searchParams,
}: AboutPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const locale = normalizeBlogLocale(resolvedSearchParams?.locale)
  const aboutContent = await getAboutContent(locale)

  const metadata: Metadata = {
    description: aboutContent.seo.metaDescription,
    title: aboutContent.seo.metaTitle,
  }

  if (aboutContent.seo.openGraphImage) {
    metadata.openGraph = {
      description: aboutContent.seo.metaDescription,
      images: [aboutContent.seo.openGraphImage],
      title: aboutContent.seo.metaTitle,
    }
  }

  return metadata
}

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const resolvedSearchParams = await searchParams
  const locale = normalizeBlogLocale(resolvedSearchParams?.locale)
  const aboutContent = await getAboutContent(locale)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <AboutHero
          description={aboutContent.hero.description}
          headlineAfterImage={aboutContent.hero.headlineAfterImage}
          headlineBeforeImage={aboutContent.hero.headlineBeforeImage}
          headlineBottom={aboutContent.hero.headlineBottom}
          inlineImageUrl={aboutContent.hero.inlineImageUrl}
        />
        <WhoWeAre
          description={aboutContent.whoWeAre.description}
          learnMoreUrl={aboutContent.whoWeAre.learnMoreUrl}
          locale={locale}
        />
        <RealExperience
          backgroundImage="/images/backgrounds/aboutexperience.png"
          cards={aboutContent.realExperience.cards}
          isRight={true}
        />
        <Reviews
          cards={aboutContent.reviews.cards}
          description={aboutContent.reviews.description}
          locale={locale}
          title={aboutContent.reviews.title}
        />
      </main>
      <Footer />
    </div>
  )
}
