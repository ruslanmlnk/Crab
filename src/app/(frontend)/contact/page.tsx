import React from 'react'

import { ContactFormSection } from '@/components/ContactFormSection'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import type { Metadata } from 'next'
import { normalizeBlogLocale } from '@/lib/blog-locale'
import { getContactContent } from '@/lib/contact'

type ContactPageProps = {
  searchParams?: Promise<{
    locale?: string | string[]
  }>
}

export const metadata: Metadata = {
  title: 'Contact Us | Crab Norway',
  description: 'Get in touch with Crab Norway for any questions or inquiries.',
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams
  const locale = normalizeBlogLocale(resolvedSearchParams?.locale)
  const contactContent = await getContactContent(locale)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <ContactFormSection
          contactDescription={contactContent.description}
          contactTitle={contactContent.title}
          locale={locale}
          socialLinks={contactContent.socialLinks}
        />
      </main>
      <Footer showGetInTouch={false} />
    </div>
  )
}
