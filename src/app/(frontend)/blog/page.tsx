import React from 'react'
import type { Metadata } from 'next'

import { Header } from '@/components/Header'
import { BlogPageContent } from '@/components/blog/BlogPageContent'
import { Footer } from '@/components/Footer'
import { getBlogPageData } from '@/lib/blog'
import {
  getBlogMessages,
  normalizeBlogLocale,
} from '@/lib/blog-locale'

type BlogPageProps = {
  searchParams?: Promise<{
    locale?: string | string[]
  }>
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const locale = normalizeBlogLocale(resolvedSearchParams?.locale)
  const messages = getBlogMessages(locale)

  return {
    description: messages.blogDescription,
    title: messages.blogTitle,
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams
  const locale = normalizeBlogLocale(resolvedSearchParams?.locale)
  const { posts, categories } = await getBlogPageData(locale)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <BlogPageContent categories={categories} locale={locale} posts={posts} />
      </main>
      <Footer showGetInTouch={false} />
    </div>
  )
}
