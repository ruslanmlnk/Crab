import React from 'react'

import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { getFAQItems } from '@/lib/faq'
import { normalizeBlogLocale } from '@/lib/blog-locale'

type FAQPageProps = {
  searchParams?: Promise<{
    locale?: string | string[]
  }>
}

export default async function FAQPage({ searchParams }: FAQPageProps) {
  const resolvedSearchParams = await searchParams
  const locale = normalizeBlogLocale(resolvedSearchParams?.locale)
  const faqItems = await getFAQItems(locale)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <FAQ items={faqItems} />
      </main>
      <Footer />
    </div>
  )
}
