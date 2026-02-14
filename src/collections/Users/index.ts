import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { isAdmin, isAuthor } from '../../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: isAuthor,
    create: isAdmin,
    delete: isAdmin,
    read: authenticated,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['author'],
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Author',
          value: 'author',
        },
      ],
      hooks: {
        beforeChange: [
          async ({ req, data, operation }) => {
            if (operation === 'create') {
              const users = await req.payload.find({
                collection: 'users',
                limit: 0,
              })

              if (users.totalDocs === 0) {
                return ['admin']
              }
            }

            const user = req.user
            // Ensure only admins can change roles
            if (user && !(user as any).roles?.includes('admin')) {
              return data?.roles
            }
            return data?.roles
          },
        ],
      },
      access: {
        create: isAdmin,
        update: isAdmin,
        read: authenticated,
      },
    },
  ],
  timestamps: true,
}
