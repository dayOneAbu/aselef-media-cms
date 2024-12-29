import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import type { ImageWithText as ImageWithTextType } from '@/payload-types'

type Props = {
  className?: string
  vAlignment?: 'start' | 'center' | 'end'
  hAlignment?: 'left' | 'center' | 'right'
} & ImageWithTextType

export const ImageWithTextBlock: React.FC<Props> = ({
  className,
  layout = 'textRight',
  image,
  backgroundColor,
  textColor,
  imageSize = 'medium',
  padding = 'medium',
  vAlignment = 'center',
  hAlignment = 'left',
  text,
}) => {
  const imageData = typeof image === 'object' ? image : null

  const containerClasses = cn(
    'grid gap-32 border-2 border-red-500',
    {
      'grid-cols-1 md:grid-cols-2': ['textLeft', 'textRight'].includes(layout),
      'grid-cols-1': ['textAbove', 'textBelow'].includes(layout),
      relative: layout === 'textOverlay',
    },
    {
      'bg-gold': backgroundColor === 'gold',
      'bg-purple': backgroundColor === 'purple',
      'bg-black': backgroundColor === 'black',
    },
    {
      'p-0': padding === 'none',
      'p-16': padding === 'small',
      'p-24': padding === 'medium',
      'p-32': padding === 'large',
    },
    className,
  )

  const textClasses = cn(
    'prose max-w-none',
    {
      'text-foreground': textColor === 'dark',
      'text-white': textColor === 'light',
      'text-primary': textColor === 'primary',
    },
    {
      'order-2': layout === 'textRight',
      'order-1': layout === 'textLeft',
      'absolute inset-0 flex p-32 bg-black/50': layout === 'textOverlay',
    },
    {
      'items-start': vAlignment === 'start',
      'items-center': vAlignment === 'center',
      'items-end': vAlignment === 'end',
    },
    {
      'text-left': hAlignment === 'left',
      'text-center': hAlignment === 'center',
      'text-right': hAlignment === 'right',
    },
  )

  const imageClasses = cn(
    'relative w-full',
    {
      'order-1': layout === 'textRight',
      'order-2': layout === 'textLeft',
    },
    {
      'h-96': imageSize === 'small',
      'h-128': imageSize === 'medium',
      'h-160': imageSize === 'large',
      'h-full': imageSize === 'full',
    },
  )

  return (
    <div className={containerClasses}>
      <div className={imageClasses}>
        {imageData?.url && (
          <Image
            src={imageData.url}
            alt={imageData.alt || ''}
            fill
            className="object-cover rounded-2xl"
          />
        )}
      </div>
      <div className={textClasses}>{text && <RichText data={text} />}</div>
    </div>
  )
}
