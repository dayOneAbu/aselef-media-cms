import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`
      payload.logger.info(`Triggering revalidation for post at path: ${path}`)
      try {
        const response = await fetch(`${baseUrl}/api/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Revalidate-Secret': process.env.REVALIDATE_SECRET || '',
          },
          body: JSON.stringify({ path, tag: 'posts-sitemap' }),
        })
        if (!response.ok) throw new Error(`Revalidation failed: ${response.statusText}`)
      } catch (err) {
        payload.logger.error(`Failed to revalidate path ${path}: ${err.message}`)
      }
    }
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`
      payload.logger.info(`Triggering revalidation for old post at path: ${oldPath}`)
      try {
        const response = await fetch(`${baseUrl}/api/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Revalidate-Secret': process.env.REVALIDATE_SECRET || '',
          },
          body: JSON.stringify({ path: oldPath, tag: 'posts-sitemap' }),
        })
        if (!response.ok) throw new Error(`Revalidation failed: ${response.statusText}`)
      } catch (err) {
        payload.logger.error(`Failed to revalidate old path ${oldPath}: ${err.message}`)
      }
    }
    // Revalidate home page for post changes
    try {
      const homePath = '/'
      payload.logger.info(`Triggering revalidation for home page at path: ${homePath}`)
      const response = await fetch(`${baseUrl}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Revalidate-Secret': process.env.REVALIDATE_SECRET || '',
        },
        body: JSON.stringify({ path: homePath, tag: 'posts' }),
      })
      if (!response.ok) throw new Error(`Revalidation failed: ${response.statusText}`)
    } catch (err) {
      payload.logger.error(`Failed to revalidate home path: ${err.message}`)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const path = `/posts/${doc?.slug}`
    payload.logger.info(`Triggering revalidation for deleted post at path: ${path}`)
    try {
      const response = await fetch(`${baseUrl}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Revalidate-Secret': process.env.REVALIDATE_SECRET || '',
        },
        body: JSON.stringify({ path, tag: 'posts-sitemap' }),
      })
      if (!response.ok) throw new Error(`Revalidation failed: ${response.statusText}`)
    } catch (err) {
      payload.logger.error(`Failed to revalidate path ${path}: ${err.message}`)
    }
    // Revalidate home page for post deletion
    try {
      const homePath = '/'
      payload.logger.info(`Triggering revalidation for home page at path: ${homePath}`)
      const response = await fetch(`${baseUrl}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Revalidate-Secret': process.env.REVALIDATE_SECRET || '',
        },
        body: JSON.stringify({ path: homePath, tag: 'posts' }),
      })
      if (!response.ok) throw new Error(`Revalidation failed: ${response.statusText}`)
    } catch (err) {
      payload.logger.error(`Failed to revalidate home path: ${err.message}`)
    }
  }
  return doc
}
