'use client'

import React, { useMemo, useState } from 'react'

import { BlogGrid } from './BlogGrid'
import { BlogHero } from './BlogHero'
import { getBlogMessages, type BlogLocale } from '@/lib/blog-locale'

type BlogPostCard = {
  category: string
  categorySlug: string
  description: string
  id: number | string
  image: string
  slug: string
  title: string
}

type BlogCategoryFilter = {
  label: string
  slug: string
}

type BlogPageContentProps = {
  categories: BlogCategoryFilter[]
  locale: BlogLocale
  posts: BlogPostCard[]
}

export const BlogPageContent: React.FC<BlogPageContentProps> = ({
  categories,
  locale,
  posts,
}) => {
  const messages = getBlogMessages(locale)
  const [activeCategory, setActiveCategory] = useState('all')

  const categoryFilters = useMemo(
    () => [
      {
        label: messages.allCategories,
        slug: 'all',
      },
      ...categories,
    ],
    [categories, messages.allCategories],
  )

  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((post) => post.categorySlug === activeCategory)

  return (
    <>
      <BlogHero
        activeCategory={activeCategory}
        categories={categoryFilters}
        locale={locale}
        onCategoryChange={setActiveCategory}
      />
      <BlogGrid locale={locale} posts={filteredPosts} />
    </>
  )
}

