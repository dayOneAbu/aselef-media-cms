import type { CollectionBeforeChangeHook } from 'payload'
import type { Post } from '../../../payload-types'

const wordCount = (text: string): number => {
  const words = text.trim().split(/\s+/)
  return words.length
}

export const timeToReadHook: CollectionBeforeChangeHook<Post> = async ({ data }) => {
  if (data?.content) {
    // Extract text content from the rich text structure
    const textContent = JSON.stringify(data.content)

    // Get word count from content
    const words = wordCount(textContent)

    // Average reading speed (words per minute)
    const averageReadingSpeed = 200

    // Calculate time to read in minutes
    const timeToRead = Math.ceil(words / averageReadingSpeed)

    // Set the timeToRead field
    data.timeToRead = timeToRead
  }

  return data
}
