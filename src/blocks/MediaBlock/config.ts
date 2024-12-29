import { Block } from 'payload'
import { Media as MediaType } from '@/payload-types'

export type Type = {
  blockType: 'media'
  blockName?: string
  media: MediaType
  type: 'normal' | 'wide' | 'fullscreen'
}

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: 'Media Block',
    plural: 'Media Blocks',
  },
  fields: [
    {
      name: 'media',
      label: 'Media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'radio',
      defaultValue: 'normal',
      options: [
        {
          label: 'Normal',
          value: 'normal',
        },
        {
          label: 'Fullscreen',
          value: 'fullscreen',
        },
        {
          label: 'Wide',
          value: 'wide',
        },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
  ],
}
