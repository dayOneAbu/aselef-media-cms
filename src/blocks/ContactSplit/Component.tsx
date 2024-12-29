'use client'

import React from 'react'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import { FormBlock } from '@/blocks/Form/Component'
import { CMSLink } from '@/components/Link'

// Temporary type until payload-types is regenerated
type Column = {
  size?: 'oneThird' | 'half' | 'twoThirds' | 'full'
  alignment?: 'left' | 'center' | 'right'
  richText?: any
  enableLink?: boolean
  link?: any
}

type ContactSplitBlockType = {
  blockType: 'contactSplit'
  layout?: 'formRight' | 'formLeft'
  form: any
  columns?: Column[]
  backgroundColor?: 'none' | 'gold' | 'purple' | 'black'
  padding?: 'none' | 'small' | 'medium' | 'large'
  richText?: any
}

type Props = ContactSplitBlockType & {
  className?: string
}

export const ContactSplitBlock: React.FC<Props> = ({
  className,
  layout = 'formRight',
  form,
  columns,
  backgroundColor,
  padding,
}) => {
  const containerClasses = cn(
    'container mx-auto w-full',
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

  const gridClasses = cn('grid md:grid-cols-2 gap-8 items-start', {
    'md:[&>*:first-child]:order-2': layout === 'formRight',
    'md:[&>*:first-child]:order-1': layout === 'formLeft',
  })

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className={containerClasses}>
      <div className={gridClasses}>
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
            {columns &&
              columns.length > 0 &&
              columns.map((col, index) => {
                const { enableLink, link, richText, size, alignment } = col

                return (
                  <div
                    className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                      'md:col-span-2': size !== 'full',
                      'text-left': alignment === 'left',
                      'text-center': alignment === 'center',
                      'text-right': alignment === 'right',
                    })}
                    key={index}
                  >
                    {richText && <RichText data={richText} enableGutter={false} />}
                    {enableLink && <CMSLink {...link} />}
                  </div>
                )
              })}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <FormBlock form={form} enableIntro={false} />
        </div>
      </div>
    </div>
  )
}
