import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  RichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'

import { getBlogMessages, type BlogLocale, withBlogLocale } from '@/lib/blog-locale'

type FeaturedPost = {
  id: number | string
  image: string
  slug: string
  title: string
}

interface BlogContentProps {
  content: unknown
  featuredImage: string
  featuredPosts: FeaturedPost[]
  locale: BlogLocale
}

const blogRichTextConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  quote: ({ node, nodesToJSX }) => (
    <blockquote className="p-6 md:p-[24px] bg-[#E6F1F6] border-l-[3px] border-[#071A26] [&_p]:m-0">
      {nodesToJSX({ nodes: node.children })}
    </blockquote>
  ),
  upload: ({ node }) => {
    const uploadNode = node as {
      fields?: {
        alt?: string
      }
      value?: {
        filename?: string
        height?: null | number
        mimeType?: null | string
        url?: null | string
        width?: null | number
      }
    }

    const uploadDoc = uploadNode.value

    if (!uploadDoc || typeof uploadDoc !== 'object' || !uploadDoc.url) {
      return null
    }

    const alt = uploadNode.fields?.alt || ''
    const isImage = Boolean(uploadDoc.mimeType?.startsWith('image'))

    if (!isImage) {
      return (
        <a className="underline" href={uploadDoc.url} rel="noopener noreferrer">
          {uploadDoc.filename || uploadDoc.url}
        </a>
      )
    }

    return (
      <figure className="my-2">
        <img
          alt={alt}
          className="w-full h-auto object-cover"
          height={uploadDoc.height ?? undefined}
          loading="lazy"
          src={uploadDoc.url}
          width={uploadDoc.width ?? undefined}
        />
      </figure>
    )
  },
})

export const BlogContent: React.FC<BlogContentProps> = ({
  content,
  featuredImage,
  featuredPosts,
  locale,
}) => {
  const messages = getBlogMessages(locale)

  const hasRichText =
    Boolean(content) &&
    typeof content === 'object' &&
    !Array.isArray(content) &&
    'root' in (content as Record<string, unknown>)

  return (
    <div className="w-full bg-white">
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <Image
          alt="Blog featured image"
          className="object-cover"
          fill
          priority
          src={featuredImage}
        />
      </div>

      <section className="container-custom px-6 lg:px-[70px] py-[70px] lg:pb-[140px]">
        <div className="flex flex-col lg:flex-row gap-[56px] items-start">
          <div className="flex-1 w-full max-w-[800px] text-[#071A26]">
            {hasRichText ? (
              <RichText
                className="text-[18px] leading-[145%] flex flex-col gap-6 [&_h1]:text-[40px] [&_h1]:font-semibold [&_h1]:leading-[125%] [&_h2]:text-[28px] [&_h2]:font-semibold [&_h2]:leading-[125%] [&_h3]:text-[24px] [&_h3]:font-semibold [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:m-0 [&_ul]:list-disc [&_ul]:pl-6"
                converters={blogRichTextConverters}
                data={content as any}
              />
            ) : (
              <p className="text-[18px] leading-[145%]">{messages.emptyContent}</p>
            )}
          </div>

          <aside className="w-full lg:w-[430px] flex flex-col gap-[80px]">
            <div className="bg-[#E6F1F6] p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="text-[#071A26] text-[32px] font-semibold leading-[125%]">
                  {messages.shareTitle}
                </h3>
                <p className="text-[#0C2B3A] text-base leading-[145%]">
                  {messages.shareDescription}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-[#071A26] text-[32px] font-semibold leading-[125%] tracking-[-0.02em]">
                {messages.featuredPosts}
              </h3>
              <div className="flex flex-col gap-[15px]">
                {featuredPosts.map((post) => (
                  <Link
                    className="flex items-center gap-[15px] group"
                    href={withBlogLocale(`/blog/${post.slug}`, locale)}
                    key={post.id}
                  >
                    <div className="relative w-[186px] h-[124px] flex-shrink-0 overflow-hidden">
                      <Image
                        alt={post.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        src={post.image}
                      />
                    </div>
                    <span className="text-[#071A26] text-[18px] font-bold leading-[110%] tracking-[-0.02em] group-hover:text-blue-dark/70 transition-colors line-clamp-2">
                      {post.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
