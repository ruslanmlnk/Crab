import type { Metadata } from 'next'
import React from 'react'
import { notFound } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { BlogContent } from '@/components/blog/BlogContent'
import { BlogDetailsHeader } from '@/components/blog/BlogDetailsHeader'
import { getBlogPostBySlug, getFeaturedBlogPosts } from '@/lib/blog'
import { getBlogMessages, normalizeBlogLocale } from '@/lib/blog-locale'

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{
    locale?: string | string[]
  }>
}

export async function generateMetadata({
  params,
  searchParams,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const locale = normalizeBlogLocale(resolvedSearchParams?.locale)
  const messages = getBlogMessages(locale)
  const post = await getBlogPostBySlug(locale, slug)

  if (!post) {
    return {
      description: messages.articleNotFoundDescription,
      title: messages.articleNotFoundTitle,
    }
  }

  return {
    description: post.excerpt || messages.blogDescription,
    title: `${post.title} | Crab Fishing Community`,
  }
}

export default async function BlogPostPage({
  params,
  searchParams,
}: BlogPostPageProps) {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const locale = normalizeBlogLocale(resolvedSearchParams?.locale)
  const post = await getBlogPostBySlug(locale, slug)

  if (!post) {
    notFound()
  }

  const featuredPosts = await getFeaturedBlogPosts(locale, post.id)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <BlogDetailsHeader
          authorImage={post.authorImage ?? post.featuredImage}
          authorName={post.authorName}
          category={post.category}
          title={post.title}
        />
        <BlogContent
          content={post.content}
          featuredImage={post.featuredImage}
          featuredPosts={featuredPosts}
          locale={locale}
        />
      </main>
      <Footer showGetInTouch={false} />
    </div>
  )
}

