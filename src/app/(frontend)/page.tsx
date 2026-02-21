import React from 'react'
import type { Metadata } from 'next'

import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { WhoWeAre } from '@/components/WhoWeAre'
import { RealExperience } from '@/components/RealExperience'
import { WhatYouFind } from '@/components/WhatYouFind'
import { Pricing } from '@/components/Pricing'
import { FromTheFleet } from '@/components/FromTheFleet'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import { getHomeFleetArticles } from '@/lib/blog'
import { getFAQItems } from '@/lib/faq'
import { getHomeContent } from '@/lib/home'
import { normalizeBlogLocale } from '@/lib/blog-locale'

type HomePageProps = {
  searchParams?: Promise<{
    locale?: string | string[]
  }>
}

export async function generateMetadata({
  searchParams,
}: HomePageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const locale = normalizeBlogLocale(resolvedSearchParams?.locale)
  const homeContent = await getHomeContent(locale)

  const metadata: Metadata = {
    description: homeContent.seo.metaDescription,
    title: homeContent.seo.metaTitle,
  }

  if (homeContent.seo.openGraphImage) {
    metadata.openGraph = {
      description: homeContent.seo.metaDescription,
      images: [homeContent.seo.openGraphImage],
      title: homeContent.seo.metaTitle,
    }
  }

  return metadata
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams
  const locale = normalizeBlogLocale(resolvedSearchParams?.locale)
  const [faqItems, homeContent] = await Promise.all([
    getFAQItems(locale),
    getHomeContent(locale),
  ])
  const fleetArticles = await getHomeFleetArticles(
    locale,
    homeContent.fromTheFleet.articleIds,
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero
          eyebrow={homeContent.hero.eyebrow}
          headline={homeContent.hero.headline}
          supportingText={homeContent.hero.supportingText}
        />
        <WhoWeAre
          description={homeContent.whoWeAre.description}
          learnMoreUrl={homeContent.whoWeAre.learnMoreUrl}
        />
        <RealExperience cards={homeContent.realExperience.cards} />
        <WhatYouFind
          ctaUrl={homeContent.whatYouFind.ctaUrl}
          firstColumnText={homeContent.whatYouFind.firstColumnText}
          headline={homeContent.whatYouFind.headline}
          secondColumnText={homeContent.whatYouFind.secondColumnText}
          sectionTitle={homeContent.whatYouFind.sectionTitle}
        />
        <Pricing
          headline={homeContent.pricing.headline}
          plans={homeContent.pricing.plans}
        />
        <FromTheFleet
          articles={fleetArticles}
          locale={locale}
        />
        <FAQ items={faqItems} />
      </main>
      <Footer />
    </div>
  )
}
