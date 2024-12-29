/* eslint-disable @next/next/no-img-element */
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { FeaturedPost, FeaturedArticleSize } from './types'

interface FeaturedArticleCardProps {
  article: FeaturedPost
  size: FeaturedArticleSize
}

const sizeConfig = {
  large: {
    aspectRatio: 16 / 9,
    titleClass: 'text-2xl md:text-3xl lg:text-4xl',
    padding: 'p-6',
    showExcerpt: true,
    showImage: true,
  },
  medium: {
    aspectRatio: 16 / 9,
    titleClass: 'text-xl md:text-2xl',
    padding: 'p-5',
    showExcerpt: false,
    showImage: 'responsive', // Will be handled conditionally
  },
  small: {
    aspectRatio: 16 / 9,
    titleClass: 'text-base md:text-sm',
    padding: 'p-4',
    showExcerpt: false,
    showImage: false,
  },
}

export function FeaturedArticleCard({ article, size }: FeaturedArticleCardProps) {
  const config = sizeConfig[size]
  const showImage =
    config.showImage === true || (config.showImage === 'responsive' && size === 'medium')

  return (
    <Card
      className={cn(
        'group overflow-hidden',
        !showImage && 'bg-muted/30 hover:bg-muted/50 transition-colors',
      )}
    >
      <CardContent className={cn('relative', showImage ? 'p-0' : config.padding)}>
        {showImage ? (
          <>
            <AspectRatio ratio={config.aspectRatio}>
              <img
                src={article.heroImage?.url}
                alt={article.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
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
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {article.categories?.map((category) => (
          <Badge key={category.id} variant="secondary" className="bg-primary/90">
            {category.title}
          </Badge>
        ))}
        <span
          className={cn(
            'text-xs flex items-center gap-1',
            textColor === 'white' ? 'text-white/80' : 'text-muted-foreground',
          )}
        >
          <Clock className="h-3 w-3" />
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
            'text-sm line-clamp-2',
            textColor === 'white' ? 'text-white/90' : 'text-muted-foreground',
          )}
        >
          {article.meta.description}
        </p>
      )}
    </div>
  )
}
