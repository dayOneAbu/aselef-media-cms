import type { Access, Where } from 'payload'

import { checkRole } from './roles'

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return checkRole(['admin', 'editor'], user)
}

export const isAdminOrEditorOrAuthor: Access = ({ req: { user } }) => {
  return checkRole(['admin', 'editor', 'author'], user)
}

export const isAuthorOrPublished: Access = ({ req: { user } }) => {
  if (user && checkRole(['admin', 'editor'], user)) {
    return true
  }

  if (user) {
    return {
      or: [
        {
          _status: {
            equals: 'published',
          },
        },
        {
          authors: {
            equals: user.id,
          },
        },
      ],
    } as Where
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}

export const isAuthor: Access = ({ req: { user } }) => {
  if (user && checkRole(['admin', 'editor'], user)) {
    return true
  }

  if (user) {
    return {
      authors: {
        equals: user.id,
      },
    }
  }

  return false
}
