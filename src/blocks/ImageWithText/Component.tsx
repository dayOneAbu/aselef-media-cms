import type { ImageWithText as ImageWithTextType, Media } from '@/payload-types'

import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'

type Props = {
  className?: string
} & ImageWithTextType

export const ImageWithTextBlock: React.FC<Props> = ({
  className,
  layout = 'textRight',
  image,
  text,
  backgroundColor,
  textColor,
  imageSize,
  padding,
  vOffset,
  hOffset,
}) => {
  const imageData = image as Media

  const containerClasses = cn(
    'mx-auto w-full',
    {
      'grid md:grid-cols-2 gap-8': ['textLeft', 'textRight'].includes(layout),
      'grid grid-cols-1 gap-6': ['textAbove', 'textBelow'].includes(layout),
      relative: layout === 'textOverlay',
    },
    {
      'bg-transparent': backgroundColor === 'none',
      'bg-gold': backgroundColor === 'gold',
      'bg-purple': backgroundColor === 'purple',
      'bg-black': backgroundColor === 'black',
    },
    {
      'p-0': padding === 'none',
      'p-4': padding === 'small',
      'p-8': padding === 'medium',
      'p-12': padding === 'large',
    },
    className,
  )

  const textClasses = cn(
    'flex flex-col justify-center',
    {
      'text-dark': textColor === 'dark',
      'text-light': textColor === 'light',
      'text-primary': textColor === 'primary',
    },
    {
      'order-1': layout === 'textRight',
      'order-2': layout === 'textLeft',
      'absolute inset-0 flex items-center justify-center bg-black/50 text-white p-6':
        layout === 'textOverlay',
    },
  )

  const imageClasses = cn(
    'relative',
    {
      'order-2': layout === 'textRight',
      'order-1': layout === 'textLeft',
    },
    {
      'h-48': imageSize === 'small',
      'h-64': imageSize === 'medium',
      'h-96': imageSize === 'large',
      'h-full': imageSize === 'full',
    },
  )

  const getOffsetValue = (value: string | null | undefined) => {
    if (!value || value === 'none') return 0
    return parseInt(value)
  }

  const imageWrapperStyle = {
    marginTop: `${getOffsetValue(vOffset)}px`,
    marginLeft: `${getOffsetValue(hOffset)}px`,
  }

  return (
    <div className={containerClasses}>
      <div className={imageClasses} style={imageWrapperStyle}>
        {imageData?.url && (
          <Image src={imageData.url} alt={imageData.alt || ''} fill className="object-cover" />
        )}
      </div>
      <div className={textClasses}>
        <RichText
          data={text}
          className={cn({
            'z-10': layout === 'textOverlay',
          })}
        />
      </div>
    </div>
  )
}
