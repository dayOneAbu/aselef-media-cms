import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { toggleFeatureHook } from './hooks/toggleFeature'
import { populateTimeToRead } from './hooks/populateTimeToRead'
import AdBlock from '@/blocks/AdBlock/config'
import {
  isAdminOrEditor,
  isAdminOrEditorOrAuthor,
  isAuthor,
  isAuthorOrPublished,
} from '../../access/posts'
import { checkRole } from '../../access/roles'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: isAdminOrEditorOrAuthor,
    delete: isAdminOrEditor, // Only admins/editors can delete - authors can only delete their own if we change this
    read: isAuthorOrPublished,
    update: isAuthor, // Checks if user is admin/editor OR is in authors list
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'posts',
          req,
        })
        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'posts',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      access: {
        update: ({ req: { user } }) => checkRole(['admin', 'editor'], user),
      },
      admin: {
        position: 'sidebar',
        description: 'Show this post in the featured section',
      },
    },
    {
      name: 'timeToRead',
      type: 'number',
      min: 1,
      admin: {
        position: 'sidebar',
        description: 'Estimated time to read in minutes (auto-calculated)',
        readOnly: true,
      },
    },
    {
      name: 'visitorsRead',
      type: 'number',
      defaultValue: 0,
      access: {
        update: () => false,
      },
      admin: {
        position: 'sidebar',
        description: 'Number of visitors who have read this post',
        readOnly: true,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, AdBlock, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
          ],
          label: 'Meta',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
      defaultValue: ({ req }: { req: any }) => (req.user ? [req.user.id] : []),
      access: {
        update: ({ req: { user } }) => checkRole(['admin', 'editor'], user),
      },
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],

    afterRead: [
      populateAuthors,
      async ({ doc, req }) => {
        if (
          req?.payloadAPI === 'REST' ||
          req?.payloadAPI === 'GraphQL' ||
          req?.payloadAPI === 'local'
        ) {
          try {
            // Only increment for direct post visits, avoiding list fetches (like TopVisitedPosts sidebars)
            const isSinglePostFetch = req.query?.slug || req.context?.isSinglePost
            if (
              !req.context?.updatingVisitorsRead &&
              !req.context?.isListFetch &&
              isSinglePostFetch
            ) {
              const result = await req.payload.update({
                collection: 'posts',
                id: doc.id,
                overrideAccess: true,
                context: {
                  updatingVisitorsRead: true,
                  disableRevalidate: true,
                },
                data: {
                  visitorsRead: (doc.visitorsRead || 0) + 1,
                },
              })

              return result
            }
          } catch (err) {}
        } else {
        }
        return doc
      },
    ],
    afterDelete: [revalidateDelete],
    beforeChange: [populateTimeToRead, toggleFeatureHook],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}
