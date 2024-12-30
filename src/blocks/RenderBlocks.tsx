import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ImageWithTextBlock } from '@/blocks/ImageWithText/Component'
import { ContactSplitBlock } from '@/blocks/ContactSplit/Component'
import { ImageGridTextBlock } from './TextImageGrid/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  imageWithText: ImageWithTextBlock,
  contactSplit: ContactSplitBlock,
  textImageGrid: ImageGridTextBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          console.log('Block type:', blockType)
          console.log('Available components:', Object.keys(blockComponents))

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16 mx-auto max-w-7xl" key={index}>
                  <Block {...block} />
                </div>
              )
            }
          }

          return null
        })}
      </Fragment>
    )
  }

  return null
}
