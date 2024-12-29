import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'size',
        type: 'select',
        defaultValue: 'oneThird',
        options: [
          {
            label: 'One Third',
            value: 'oneThird',
          },
          {
            label: 'Half',
            value: 'half',
          },
          {
            label: 'Two Thirds',
            value: 'twoThirds',
          },
          {
            label: 'Full',
            value: 'full',
          },
        ],
      },
      {
        name: 'alignment',
        label: 'Alignment',
        type: 'select',
        defaultValue: 'left',
        required: true,
        options: [
          {
            label: 'Left',
            value: 'left',
          },
          {
            label: 'Center',
            value: 'center',
          },
          {
            label: 'Right',
            value: 'right',
          },
        ],
        admin: {
          width: '50%',
        },
      },
    ],
  },
  {
    name: 'richText',
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
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const ContactSplit: Block = {
  slug: 'contactSplit',
  interfaceName: 'ContactSplitBlock',
  labels: {
    singular: 'Contact Split Block',
    plural: 'Contact Split Blocks',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: 'formRight',
      options: [
        { label: 'Form Right', value: 'formRight' },
        { label: 'Form Left', value: 'formLeft' },
      ],
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Gold', value: 'gold' },
        { label: 'Purple', value: 'purple' },
        { label: 'Black', value: 'black' },
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
  ],
}
