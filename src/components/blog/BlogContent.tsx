import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  RichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'

import { getBlogMessages, type BlogLocale, withBlogLocale } from '@/lib/blog-locale'
import { getYouTubeEmbedURL } from '@/lib/youtube'
import { BlogShareButtons } from './BlogShareButtons'

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
  title: string
}

const getNodeType = (node: unknown): null | string => {
  if (!node || typeof node !== 'object' || !('type' in node)) {
    return null
  }

  const type = (node as { type?: unknown }).type

  return typeof type === 'string' ? type : null
}

const getNextSiblingType = (parent: unknown, childIndex: number): null | string => {
  if (
    !parent ||
    typeof parent !== 'object' ||
    !('children' in parent) ||
    childIndex < 0
  ) {
    return null
  }

  const children = (parent as { children?: unknown }).children

  if (!Array.isArray(children)) {
    return null
  }

  const nextSibling = children[childIndex + 1]

  return getNodeType(nextSibling)
}

const unwrapStrongNodes = (node: React.ReactNode): React.ReactNode => {
  if (Array.isArray(node)) {
    return node.map((child) => unwrapStrongNodes(child))
  }

  if (!React.isValidElement(node)) {
    return node
  }

  const element = node as React.ReactElement<{ children?: React.ReactNode }>

  if (element.type === 'strong') {
    return unwrapStrongNodes(element.props.children)
  }

  if (element.props.children !== undefined) {
    return React.cloneElement(
      element,
      undefined,
      unwrapStrongNodes(element.props.children),
    )
  }

  return element
}

const blogRichTextConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  text: (args) => {
    if (typeof defaultConverters.text !== 'function') {
      return args.node.text
    }

    const rendered = defaultConverters.text(args)
    const isHeadingText = getNodeType(args.parent) === 'heading'

    if (!isHeadingText) {
      return rendered
    }

    return unwrapStrongNodes(rendered)
  },
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const tag = node.tag

    if (tag !== 'h2' && tag !== 'h3') {
      return React.createElement(tag, null, children)
    }

    const className =
      'm-0 mb-5 text-[28px] font-semibold leading-[125%] tracking-[0] text-[#071A26]'

    return React.createElement(tag, { className }, children)
  },
  paragraph: ({ childIndex, node, nodesToJSX, parent }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const isInsideQuote = getNodeType(parent) === 'quote'

    if (isInsideQuote) {
      const className = 'm-0 text-[18px] font-normal leading-[145%] text-[#071A26]'

      if (!children?.length) {
        return (
          <p className={className}>
            <br />
          </p>
        )
      }

      return <p className={className}>{children}</p>
    }

    const nextSiblingType = getNextSiblingType(parent, childIndex)
    let marginBottomClass = 'mb-0'

    if (nextSiblingType === 'paragraph' || nextSiblingType === 'quote') {
      marginBottomClass = 'mb-4'
    } else if (nextSiblingType === 'heading') {
      marginBottomClass = 'mb-6'
    } else if (nextSiblingType === 'upload' || nextSiblingType === 'block') {
      marginBottomClass = 'mb-[32px]'
    } else if (nextSiblingType === 'list') {
      marginBottomClass = 'mb-5'
    }

    const className = [
      'm-0 text-[18px] font-normal leading-[145%] text-[#071A26]',
      marginBottomClass,
    ]
      .filter(Boolean)
      .join(' ')

    if (!children?.length) {
      return (
        <p className={className}>
          <br />
        </p>
      )
    }

    return <p className={className}>{children}</p>
  },
  list: ({ childIndex, node, nodesToJSX, parent }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const nextSiblingType = getNextSiblingType(parent, childIndex)
    let marginBottomClass = 'mb-0'

    if (nextSiblingType === 'heading') {
      marginBottomClass = 'mb-6'
    } else if (nextSiblingType === 'paragraph') {
      marginBottomClass = 'mb-4'
    }

    if (node.tag === 'ol') {
      const className = ['m-0 list-decimal pl-6', marginBottomClass]
        .filter(Boolean)
        .join(' ')

      return <ol className={className}>{children}</ol>
    }

    const className = ['m-0 flex list-none flex-col gap-2 p-0', marginBottomClass]
      .filter(Boolean)
      .join(' ')

    return <ul className={className}>{children}</ul>
  },
  listitem: ({ node, nodesToJSX, parent }) => {
    const children = nodesToJSX({
      nodes: node.children,
    })

    const listType =
      parent && typeof parent === 'object' && 'listType' in parent
        ? (parent as { listType?: unknown }).listType
        : null

    if (listType === 'bullet') {
      return (
        <li className="flex items-center gap-[10px] text-[18px] font-normal leading-[145%] text-[#071A26] before:h-[6px] before:w-[6px] before:flex-shrink-0 before:rounded-full before:bg-[#071A26] before:content-['']">
          {children}
        </li>
      )
    }

    return (
      <li className="text-[18px] font-normal leading-[145%] text-[#071A26]">
        {children}
      </li>
    )
  },
  quote: ({ childIndex, node, nodesToJSX, parent }) => {
    const nextSiblingType = getNextSiblingType(parent, childIndex)
    let marginBottomClass = 'mb-0'

    if (nextSiblingType === 'heading') {
      marginBottomClass = 'mb-6'
    } else if (nextSiblingType === 'paragraph') {
      marginBottomClass = 'mb-4'
    } else if (nextSiblingType === 'upload' || nextSiblingType === 'block') {
      marginBottomClass = 'mb-8'
    }

    const className = [
      'm-0 w-full border-l-[3px] border-[#071A26] bg-[#E6F1F6] p-6 text-[18px] font-normal leading-[145%] text-[#071A26]',
      marginBottomClass,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <blockquote className={className}>
        {nodesToJSX({ nodes: node.children })}
      </blockquote>
    )
  },
  blocks: {
    youtubeVideo: (args: { node: unknown }) => {
      const { node } = args

      const blockFields =
        node && typeof node === 'object' && 'fields' in node
          ? (node as { fields?: { youtubeUrl?: unknown } }).fields
          : undefined

      if (!blockFields || typeof blockFields.youtubeUrl !== 'string') {
        return null
      }

      const embedURL = getYouTubeEmbedURL(blockFields.youtubeUrl)

      if (!embedURL) {
        return null
      }

      return (
        <figure className="mt-0 mb-[32px]">
          <div className="relative w-full aspect-video overflow-hidden rounded-[2px]">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src={embedURL}
              title="YouTube video"
            />
          </div>
        </figure>
      )
    },
  },
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
      <figure className="mt-0 mb-[32px]">
        <div className="relative w-full aspect-[737/573] overflow-hidden rounded-[2px]">
          <Image
            alt={alt}
            className="object-cover"
            fill
            src={uploadDoc.url}
          />
        </div>
      </figure>
    )
  },
})

export const BlogContent: React.FC<BlogContentProps> = ({
  content,
  featuredImage,
  featuredPosts,
  locale,
  title,
}) => {
  const messages = getBlogMessages(locale)

  const hasRichText =
    Boolean(content) &&
    typeof content === 'object' &&
    !Array.isArray(content) &&
    'root' in (content as Record<string, unknown>)

  return (
    <div className="w-full bg-white">
      {/* Featured Banner Image */}
      <div className="relative w-full h-[300px] md:h-[500px] lg:h-[700px] overflow-hidden">
        <Image
          alt="Blog featured image"
          className="object-cover"
          fill
          priority
          src={featuredImage}
        />
      </div>

      <section className="max-w-[1348px] mx-auto px-6  py-[70px] lg:pb-[140px]">
        <div className="flex flex-col lg:flex-row gap-[56px] items-start">
          {/* Main Content Area */}
          <div className="flex-1 w-full max-w-full lg:max-w-[800px] text-[#071A26]">
            <div className="flex flex-col gap-8">
              {hasRichText ? (
                <RichText
                  className="text-[#071A26]"
                  converters={blogRichTextConverters}
                  data={content as any}
                />
              ) : (
                <p className="text-[18px] leading-[145%]">{messages.emptyContent}</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex w-full flex-col gap-[64px] lg:w-[500px] lg:flex-none lg:gap-[80px]">
            {/* Share Section */}
            <div className="bg-[#E6F1F6] p-8 flex flex-col gap-6 rounded-[2px]">
              <div className="flex flex-col gap-4">
                <h3 className="text-[#071A26] text-[32px] font-semibold leading-[125%]">
                  {messages.shareTitle}
                </h3>
                <p className="text-[#0C2B3A] text-base leading-[145%] opacity-90">
                  {messages.shareDescription}
                </p>
              </div>
              <BlogShareButtons title={title} />
            </div>

            {/* Featured Posts List */}
            <div className="flex flex-col gap-6">
              <h3 className="text-[#071A26] text-[32px] font-semibold leading-[130%] tracking-[-0.64px]">
                {messages.featuredPosts}
              </h3>
              <div className="flex flex-col gap-[15px]">
                {featuredPosts.map((post) => (
                  <Link
                    className="flex items-center gap-[15px] group"
                    href={withBlogLocale(`/blog/${encodeURIComponent(post.slug)}`, locale)}
                    key={post.id}
                  >
                    <div className="relative w-[186px] h-[124px] flex-shrink-0 overflow-hidden rounded-[2px]">
                      <Image
                        alt={post.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        src={post.image}
                      />
                    </div>
                    <span className="text-[#071A26] text-[18px] font-bold leading-[110%] tracking-[-0.36px] group-hover:text-[#0C2B3A]/70 transition-colors line-clamp-3">
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
