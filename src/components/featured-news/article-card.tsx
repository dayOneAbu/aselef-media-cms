/* eslint-disable @next/next/no-img-element */
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { FeaturedPost, FeaturedArticleSize } from './types'
import Link from 'next/link'

interface FeaturedArticleCardProps {
  article: FeaturedPost
  size: FeaturedArticleSize
}

const sizeConfig = {
  large: {
    aspectRatio: 16 / 9,
    titleClass: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    padding: 'p-4 sm:p-5 md:p-6',
    showExcerpt: true,
    showImage: true,
  },
  medium: {
    aspectRatio: 16 / 9,
    titleClass: 'text-base sm:text-lg md:text-xl lg:text-2xl',
    padding: 'p-3 sm:p-4 md:p-5',
    showExcerpt: true,
    showImage: 'responsive',
  },
  small: {
    aspectRatio: 16 / 9,
    titleClass: 'text-sm sm:text-base md:text-lg',
    padding: 'p-2 sm:p-3 md:p-4',
    showExcerpt: true,
    showImage: false,
  },
}

export function FeaturedArticleCard({ article, size }: FeaturedArticleCardProps) {
  const config = sizeConfig[size]
  const showImage =
    config.showImage === true || (config.showImage === 'responsive' && size === 'medium')

  return (
    <Link href={`/posts/${article.slug}`} className="block h-full">
      <Card
        className={cn(
          'group overflow-hidden rounded-xl h-full cursor-pointer border   bg-brand-dark transition-all hover:border-brand',
          !showImage && 'bg-muted/30 hover:bg-muted/50 transition-colors',
        )}
      >
        <CardContent className={cn('relative h-full', showImage ? 'p-0' : config.padding)}>
          {showImage ? (
            <>
              <AspectRatio ratio={config.aspectRatio}>
                <img
                  src={article.heroImage?.url}
                  alt={article.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </AspectRatio>
              <div
                className={cn(
                  'absolute inset-0 flex flex-col justify-end',
                  'bg-gradient-to-t from-black/90 via-black/50 to-transparent',
                  config.padding,
                )}
              >
                <ArticleContent article={article} config={config} textColor="white" />
              </div>
            </>
          ) : (
            <ArticleContent article={article} config={config} textColor="foreground" />
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

function ArticleContent({
  article,
  config,
  textColor,
}: {
  article: FeaturedPost
  config: (typeof sizeConfig)[keyof typeof sizeConfig]
  textColor: 'white' | 'foreground'
}) {
  return (
    <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {article.categories?.map((category) => (
          <Badge
            key={category.id}
            variant="secondary"
            className={cn(
              'text-[10px] sm:text-xs md:text-sm',
              textColor === 'white' ? 'text-white bg-primary/90' : 'text-primary bg-primary/10',
            )}
          >
            {category.title}
          </Badge>
        ))}
        <span
          className={cn(
            'text-[10px] sm:text-xs flex items-center gap-1',
            textColor === 'white' ? 'text-white/80' : 'text-muted-foreground',
          )}
        >
          <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          {article.meta?.description?.length
            ? Math.ceil(article.meta.description.length / 200)
            : 3}{' '}
          min read
        </span>
      </div>

      <h3
        className={cn(
          'font-bold line-clamp-3',
          config.titleClass,
          textColor === 'white' ? 'text-white' : 'text-foreground',
        )}
      >
        {article.title}
      </h3>

      {config.showExcerpt && article.meta?.description && (
        <p
          className={cn(
            'line-clamp-2 text-xs sm:text-sm md:text-base',
            textColor === 'white' ? 'text-white/90' : 'text-muted-foreground',
          )}
        >
          {article.meta.description}
        </p>
      )}
    </div>
  )
}
