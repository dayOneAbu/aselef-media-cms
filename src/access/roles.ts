import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const isAdmin: isAuthenticated = ({ req: { user } }) => {
  return checkRole(['admin'], user)
}

export const isEditor: isAuthenticated = ({ req: { user } }) => {
  return checkRole(['admin', 'editor'], user)
}

export const isAuthor: isAuthenticated = ({ req: { user } }) => {
  return checkRole(['admin', 'editor', 'author'], user)
}

export const checkRole = (allRoles: string[] = [], user?: User | null): boolean => {
  if (user) {
    if (
      allRoles.some((role) => {
        return (user as any).roles?.some((individualRole: string) => {
          return individualRole === role
        })
      })
    )
      return true
  }

  return false
}
