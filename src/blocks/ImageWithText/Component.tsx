import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

// Define types using string literals to match the database schema
type Layout = 'textRight' | 'textLeft' | 'textOverlay'
type TextColor = 'dark' | 'light' | 'primary'
type ImageSize = 'small' | 'medium' | 'large' | 'full'

// Define the block type based on the config
type ImageWithTextBlock = {
  layout: Layout
  image:
    | {
        url: string
        alt: string
        id: string
      }
    | string
  text: SerializedEditorState<SerializedLexicalNode> // Using any for richText content - you might want to type this more strictly
  textColor?: TextColor
  imageSize: ImageSize
}

type Props = {
  className?: string
} & ImageWithTextBlock

export const ImageWithTextBlock: React.FC<Props> = ({
  className,
  layout,
  image,
  textColor = 'dark',
  imageSize = 'medium',
  text,
}) => {
  const imageData = typeof image === 'object' ? image : null

  const containerClasses = cn(
    'grid gap-8 bg-background',
    {
      'grid-cols-1 md:grid-cols-2': ['textLeft', 'textRight'].includes(layout),
      'grid-cols-1 relative': layout === 'textOverlay',
    },
    className,
  )

  const textClasses = cn(
    'prose prose-lg max-w-none flex flex-col gap-4',
    {
      'text-foreground': textColor === 'dark',
      'text-white': textColor === 'light',
      'text-primary': textColor === 'primary',
    },
    {
      'order-2': layout === 'textRight',
      'order-1': layout === 'textLeft',
      'absolute inset-0 z-10 flex items-center p-8 bg-black/40': layout === 'textOverlay',
    },
  )

  const imageClasses = cn(
    'relative w-full overflow-hidden rounded-lg',
    {
      'order-1': layout === 'textRight',
      'order-2': layout === 'textLeft',
    },
    {
      'h-[300px]': imageSize === 'small',
      'h-[400px]': imageSize === 'medium',
      'h-[600px]': imageSize === 'large',
      'h-screen': imageSize === 'full',
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
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>
      <div className={textClasses}>{text && <RichText data={text} />}</div>
    </div>
  )
}
