import { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const TextImageGridBlock: Block = {
  slug: 'textImageGrid',
  interfaceName: 'TextImageGridBlock',
  labels: {
    singular: 'Text Image Grid Block',
    plural: 'Text Image Grid Blocks',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: 'textRight',
      admin: {
        description: 'Choose how to position the text relative to the image',
      },
      options: [
        { label: 'Text Right', value: 'textRight' },
        { label: 'Text Left', value: 'textLeft' },
      ],
    },
    {
      name: 'text',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({
            enabledHeadingSizes: ['h2', 'h3', 'h4'],
          }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Text Content',
    },
    {
      name: 'textColor',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Primary', value: 'primary' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Image Grid',
      maxRows: 4,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'regular',
          options: [
            {
              label: 'Regular',
              value: 'regular',
            },
            {
              label: 'Large',
              value: 'large',
            },
          ],
        },
      ],
    },
  ],
}

export { TextImageGridBlock }
