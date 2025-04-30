'use client'

import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import type React from 'react'
import { Clock, ArrowRight, ImageIcon } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { formatDate } from '@/utilities/formatDate'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'authors' | 'timeToRead'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
  size?: 'default' | 'compact' | 'sidebar'
}> = (props) => {
  const { card } = useClickableCard({})
  const {
    className,
    doc,
    relationTo,
    showCategories = true,
    title: titleFromProps,
    size = 'default',
  } = props

  const { slug, categories, meta, title, publishedAt, authors, timeToRead } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/posts/${slug}`

  const author = authors?.[0]
  const isSidebar = size === 'sidebar'
  const isCompact = size === 'compact' || isSidebar

  return (
    <article
      className={cn(
        'group relative border border-border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-all duration-200',
        'hover:-translate-y-0.5',
        isSidebar ? 'max-w-full' : isCompact ? 'max-w-sm' : 'max-w-md',
        className,
      )}
      ref={card.ref}
    >
      <div className={cn('flex', isSidebar ? 'flex-row gap-3' : 'flex-col')}>
        {/* Image */}
        <div className={cn(isSidebar ? 'w-24' : 'w-full')}>
          <AspectRatio ratio={isSidebar ? 1 : isCompact ? 2 : 3 / 2}>
            {!metaImage && (
              <div className="flex items-center justify-center h-full bg-muted/20 group-hover:bg-muted/30 transition-colors rounded-t-xl">
                <ImageIcon
                  className={cn(
                    isSidebar ? 'h-4 w-4' : 'h-6 w-6 sm:h-8 sm:w-8',
                    'text-muted-foreground/50',
                  )}
                />
                {isSidebar ? null : (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    No image available
                  </p>
                )}
              </div>
            )}
            {metaImage && typeof metaImage !== 'string' && (
              <Media
                resource={metaImage}
                size={isSidebar ? '24vw' : '33vw'}
                className={cn(
                  'object-cover w-full h-full',
                  isSidebar ? 'rounded-lg' : 'rounded-t-xl',
                  'transition-all duration-200 group-hover:scale-[1.02]',
                )}
              />
            )}
          </AspectRatio>
        </div>
        {/* Content */}
        <div
          className={cn(
            isSidebar ? 'flex-1 p-2' : 'p-3 sm:p-4',
            isCompact && !isSidebar && 'p-2 sm:p-3',
          )}
        >
          {showCategories && hasCategories && (
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2">
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
                {`${timeToRead} min read`}
              </span>
            </div>
          )}
          {titleToUse && (
            <div className="mb-1 sm:mb-1.5">
              <h3
                className={cn(
                  'font-semibold line-clamp-2 group-hover:text-primary transition-colors',
                  isSidebar
                    ? 'text-sm'
                    : isCompact
                      ? 'text-sm sm:text-base'
                      : 'text-base sm:text-lg md:text-xl',
                )}
              >
                <Link href={`/posts/${slug}`} className="hover:underline">
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
          {author && publishedAt && !isSidebar && (
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
                  isSidebar
                    ? 'text-xs'
                    : isCompact
                      ? 'text-[10px] sm:text-xs'
                      : 'text-xs sm:text-sm',
                )}
              >
                {sanitizedDescription}
              </p>
            </div>
          )}
          <Link href={href} className="mt-auto block">
            <Button
              variant="secondary"
              size={isSidebar ? 'sm' : isCompact ? 'sm' : 'default'} // Changed 'xs' to 'sm'
              className={cn(
                'w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors',
                isSidebar ? 'text-xs' : isCompact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base',
              )}
            >
              ማንበብ ይቀጥሉ{' '}
              <ArrowRight
                className={cn(
                  isSidebar ? 'h-2.5 w-2.5' : isCompact ? 'h-3 w-3' : 'h-3.5 w-3.5 sm:h-4 sm:w-4',
                  'ml-1.5 sm:ml-2',
                )}
              />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
