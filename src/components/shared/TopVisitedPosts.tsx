import { cn } from '@/utilities/cn'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Post } from '@/payload-types'
import { Card } from '@/components/Card'
import type React from 'react'

export type Props = {
  className?: string
}

export const TopVisitedPosts: React.FC<Props> = async ({ className }) => {
  const posts = await queryTopVisitedPosts()

  return (
    <div className={cn('bg-card border border-border rounded-xl p-4', className)}>
      <h2 className="text-xl font-semibold mb-4">Most Visited Posts</h2>
      {posts?.length ? (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <Card
              key={index}
              doc={post}
              relationTo="posts"
              showCategories={false}
              size="sidebar"
              className="border-none shadow-none"
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">No popular posts yet.</p>
      )}
    </div>
  )
}

export const queryTopVisitedPosts = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      depth: 0, // Reduce depth to avoid image processing
      limit: 8,
      overrideAccess: false,
      where: {
        _status: { equals: 'published' },
      },
      sort: '-visitorsRead',
      context: { isListFetch: true },
      select: {
        id: true,
        title: true,
        slug: true,
        meta: { description: true },
        heroImage: true,
        visitorsRead: true,
        publishedAt: true,
        authors: true,
      },
    })

    return result.docs as Post[]
  } catch (error) {
    console.error('Error fetching top visited posts:', error)
    return []
  }
})
