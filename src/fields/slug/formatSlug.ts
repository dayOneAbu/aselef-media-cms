import type { FieldHook } from 'payload'

// export const formatSlug = (val: string): string =>
//   val
//     .replace(/ /g, '-')
//     .replace(/[^\w-]+/g, '')
//     .toLowerCase()
export const formatSlug = (val: string): string => {
  return val
    .replace(/ /g, '-') // Replace spaces with hyphens
    .replace(/[^\p{L}\p{N}-]+/gu, '') // Allow all letters, numbers, and hyphens
    .toLowerCase() // Convert to lowercase// Convert to lowercase
}

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
