'use client'

import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'
import { Clock, ArrowRight, ImageIcon } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { formatDate } from '@/utilities/formatDate'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'authors'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
  size?: 'default' | 'compact'
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    relationTo,
    showCategories = true,
    title: titleFromProps,
    size = 'default',
  } = props

  const { slug, categories, meta, title, publishedAt, authors } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`
  const timeToRead = '3 min read'
  const author = authors?.[0]

  const isCompact = size === 'compact'

  return (
    <article
      className={cn(
        'group relative border border-border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-all duration-200',
        'hover:-translate-y-0.5',
        isCompact ? 'max-w-sm' : 'max-w-md',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        <AspectRatio ratio={isCompact ? 2 : 3 / 2}>
          {!metaImage && (
            <div className="flex flex-col items-center justify-center h-full bg-muted/20 group-hover:bg-muted/30 transition-colors rounded-t-xl">
              <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground/50" />
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">No image available</p>
            </div>
          )}
          {metaImage && typeof metaImage !== 'string' && (
            <Media
              resource={metaImage}
              size="33vw"
              className="object-cover w-full h-full rounded-t-xl transition-all duration-200 group-hover:scale-[1.02]"
            />
          )}
        </AspectRatio>
      </div>

      <div className={cn('p-3 sm:p-4', isCompact && 'p-2 sm:p-3')}>
        {showCategories && hasCategories && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && 'title' in category && category.title) {
                return (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={cn('text-[10px] sm:text-xs', isCompact && 'px-1.5 py-0.5 sm:px-2')}
                  >
                    {category.title}
                  </Badge>
                )
              }
              return null
            })}
            <span className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1 ml-auto">
              <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              {timeToRead}
            </span>
          </div>
        )}

        {titleToUse && (
          <div className="mb-1 sm:mb-1.5">
            <h3
              className={cn(
                'font-semibold line-clamp-2 group-hover:text-primary transition-colors',
                isCompact ? 'text-sm sm:text-base' : 'text-base sm:text-lg md:text-xl',
              )}
            >
              <Link href={href} ref={link.ref} className="hover:underline">
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}

        {author && publishedAt && (
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 sm:mb-2">
            By {typeof author === 'object' && 'name' in author ? author.name : 'Unknown'} •{' '}
            {formatDate(publishedAt)}
          </p>
        )}

        {description && (
          <div className="mb-2 sm:mb-3">
            <p
              className={cn(
                'text-muted-foreground line-clamp-2',
                isCompact ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm',
              )}
            >
              {sanitizedDescription}
            </p>
          </div>
        )}

        <Link href={href} className="mt-auto block">
          <Button
            variant="secondary"
            size={isCompact ? 'sm' : 'default'}
            className={cn(
              'w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors',
              isCompact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base',
            )}
          >
            Read More{' '}
            <ArrowRight
              className={cn('ml-1.5 sm:ml-2', isCompact ? 'h-3 w-3' : 'h-3.5 w-3.5 sm:h-4 sm:w-4')}
            />
          </Button>
        </Link>
      </div>
    </article>
  )
}
