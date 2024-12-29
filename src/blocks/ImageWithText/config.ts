import { Block } from 'payload'
import backgroundColor from '@/fields/backgroundColor'

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
      required: true,
      label: 'Text Content',
    },
    backgroundColor,
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
      name: 'vOffset',
      type: 'select',
      label: 'Vertical Spacing',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small (16px)', value: '16' },
        { label: 'Medium (32px)', value: '32' },
        { label: 'Large (48px)', value: '48' },
      ],
    },
    {
      name: 'hOffset',
      type: 'select',
      label: 'Horizontal Spacing',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small (16px)', value: '16' },
        { label: 'Medium (32px)', value: '32' },
        { label: 'Large (48px)', value: '48' },
      ],
    },
  ],
}
