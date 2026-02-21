"use client"
import React from 'react'
import { BlogCard } from '@/components/BlogCard'
import { getBlogMessages, type BlogLocale } from '@/lib/blog-locale'

interface BlogPost {
  id: number | string
  title: string
  description: string
  category: string
  categorySlug: string
  image: string
  slug: string
}

interface BlogGridProps {
  locale: BlogLocale
  posts: BlogPost[]
}

export const BlogGrid: React.FC<BlogGridProps> = ({ locale, posts }) => {
  const messages = getBlogMessages(locale)

  return (
    <section className="relative w-full bg-white overflow-hidden pb-[140px]">
      <div className="container-custom relative z-10 px-6 lg:px-[70px]">
        {/* Posts Grid */}
        <div className="flex flex-col items-center gap-[48px]">
          {posts.length === 0 ? (
            <p className="w-full border border-[#E6F1F6] p-8 text-center text-[#0C2B3A] text-base">
              {messages.emptyPosts}
            </p>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {posts.map((post, index) => (
              <BlogCard
                key={post.id}
                category={post.category}
                description={post.description}
                image={post.image}
                index={index}
                locale={locale}
                readMoreLabel={messages.readMore}
                slug={post.slug}
                title={post.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
