import type { CollectionBeforeChangeHook } from 'payload'

export const populateTimeToRead: CollectionBeforeChangeHook = ({ data }) => {
  if (data?.content?.root?.children) {
    const text = JSON.stringify(data.content.root.children)
    const words = text.split(/\s+/).length
    const time = Math.ceil(words / 200) // Assuming 200 words per minute
    return {
      ...data,
      timeToRead: time,
    }
  }

  return data
}
