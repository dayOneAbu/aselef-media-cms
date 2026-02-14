import type { Access } from 'payload'

import { checkRole } from './roles'

export const isUploaderOrAdminOrEditor: Access = ({ req: { user } }) => {
  if (user && checkRole(['admin', 'editor'], user)) {
    return true
  }

  if (user) {
    return {
      uploadedBy: {
        equals: user.id,
      },
    }
  }

  return false
}

export const canCreateMedia: Access = ({ req: { user } }) => {
  return checkRole(['admin', 'editor', 'author'], user)
}
