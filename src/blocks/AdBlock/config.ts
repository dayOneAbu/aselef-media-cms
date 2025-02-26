import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

const AdBlock: Block = {
  slug: 'advertisement',
  interfaceName: 'Advertisement',
  labels: {
    singular: 'Advertisement',
    plural: 'Advertisements',
  },
  fields: [
    {
      name: 'contentType',
      type: 'radio',
      label: 'Content Type',
      defaultValue: 'richText',
      options: [
        {
          label: 'Rich Text',
          value: 'richText',
        },
        {
          label: 'Image',
          value: 'image',
        },
      ],
      admin: {
        description: 'Choose whether to display text content or an image',
      },
    },

    {
      name: 'richTextContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'richTextContent',
      admin: {
        condition: (_, siblingData) => siblingData.contentType === 'richText',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Advertisement Image',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData.contentType === 'image',
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio',
      defaultValue: '728/90',
      options: [
        {
          label: 'Leaderboard (728x90)',
          value: '728/120',
        },
        {
          label: 'Medium Rectangle (300x250)',
          value: '300/250',
        },
        {
          label: 'Square (250x250)',
          value: '250/250',
        },
        {
          label: 'Wide Skyscraper (160x600)',
          value: '160/600',
        },
        {
          label: 'Large Rectangle (336x280)',
          value: '400/380',
        },
        {
          label: 'Banner (468x60)',
          value: '468/120',
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.contentType === 'image',
      },
    },
  ],
}

export default AdBlock
