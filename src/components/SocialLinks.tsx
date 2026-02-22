import Image from 'next/image'

import type { ContactSocialLinks } from '@/lib/contact'

type SocialLinksProps = {
  itemClassName?: string
  links: ContactSocialLinks
  wrapperClassName?: string
}

const ICON_ITEMS = [
  {
    alt: 'YouTube',
    hrefKey: 'youtubeUrl',
    icon: '/images/youtube.svg',
  },
  {
    alt: 'Instagram',
    hrefKey: 'instagramUrl',
    icon: '/images/instagram.svg',
  },
  {
    alt: 'Telegram',
    hrefKey: 'telegramUrl',
    icon: '/images/telegram.svg',
  },
] as const

export const SocialLinks: React.FC<SocialLinksProps> = ({
  itemClassName = '',
  links,
  wrapperClassName = 'flex items-center gap-[10px]',
}) => {
  return (
    <div className={wrapperClassName}>
      {ICON_ITEMS.map((item) => {
        const href = links[item.hrefKey] || '#'

        return (
          <a
            key={item.hrefKey}
            href={href}
            aria-label={item.alt}
            className={`icon-circle ${itemClassName}`.trim()}
            rel="noreferrer noopener"
            target="_blank"
          >
            <Image alt={item.alt} height={16} src={item.icon} width={16} />
          </a>
        )
      })}
    </div>
  )
}
