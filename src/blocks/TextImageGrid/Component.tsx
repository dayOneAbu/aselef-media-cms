import React from 'react'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export type ImageSize = 'regular' | 'large'

type ImageGridImage = {
  image: {
    id: string
    filename: string
    alt: string
  }
  size?: ImageSize
}

export type TextImageGridProps = {
  blockType: 'textImageGrid'
  layout?: 'textRight' | 'textLeft'
  text: any
  textColor?: 'dark' | 'light' | 'primary'
  images?: ImageGridImage[]
}

export const ImageGridTextBlock: React.FC<TextImageGridProps> = ({
  layout = 'textRight',
  text,
  textColor = 'dark',
  images,
}) => {
  console.log('Rendering TextImageGrid with props:', { layout, textColor, images })

  return (
    <div className="container my-16">
      <div
        className={cn('grid gap-8 items-center', {
          'md:grid-cols-[1fr_auto]': layout === 'textRight',
          'md:grid-cols-[auto_1fr]': layout === 'textLeft',
        })}
      >
        {/* Text Content */}
        <div
          className={cn('prose max-w-prose', {
            'text-foreground': textColor === 'dark',
            'text-white': textColor === 'light',
            'text-primary': textColor === 'primary',
            'order-2': layout === 'textLeft',
            'order-1': layout === 'textRight',
          })}
        >
          <RichText data={text} />
        </div>

        {/* Image Grid */}
        <div
          className={cn('grid gap-4', {
            'order-1': layout === 'textLeft',
            'order-2': layout === 'textRight',
            'grid-cols-2': (images ?? []).length > 1,
          })}
        >
          {images?.map((imageData, i) => {
            const { image, size = 'regular' } = imageData

            return (
              <div
                key={i}
                className={cn('relative overflow-hidden rounded-lg', {
                  'col-span-2': size === 'large',
                  'aspect-square': size === 'regular',
                  'aspect-video': size === 'large',
                })}
              >
                <Media className="object-cover" fill resource={image} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
