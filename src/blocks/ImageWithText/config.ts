import { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ImageWithText: Block = {
  slug: 'imageWithText',
  interfaceName: 'ImageWithText',
  labels: {
    singular: 'Image with Text Block',
    plural: 'Image with Text Blocks',
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
        { label: 'Text Above', value: 'textAbove' },
        { label: 'Text Below', value: 'textBelow' },
        { label: 'Text Overlay', value: 'textOverlay' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      name: 'text',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Text Content',
    },
    {
      name: 'textColor',
      type: 'select',
      label: 'Text Color',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Primary', value: 'primary' },
      ],
    },
    {
      name: 'imageSize',
      type: 'select',
      label: 'Image Size',
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Full Width', value: 'full' },
      ],
    },
    {
      name: 'padding',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    {
      name: 'vAlignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Top', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'end' },
      ],
      admin: {
        width: '50%',
      },
    },
    {
      name: 'hAlignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        width: '50%',
      },
    },
  ],
}
