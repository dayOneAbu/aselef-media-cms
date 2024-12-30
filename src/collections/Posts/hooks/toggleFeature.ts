import { Post } from '@/payload-types'
import type { CollectionBeforeChangeHook } from 'payload'
export const toggleFeatureHook: CollectionBeforeChangeHook<Post> = async ({
  data,
  req,
  req: { payload },
}) => {
  if (data) {
    const featuredPosts = await payload.find({
      collection: 'posts',
      where: {
        isFeatured: {
          equals: true,
        },
      },
      limit: 5,
      sort: '-publishedAt',
    })

    if (featuredPosts.totalDocs >= 5) {
      const oldestFeatured = featuredPosts.docs[0]
      await payload.update({
        collection: 'posts',
        id: oldestFeatured.id,
        data: {
          isFeatured: false,
        },
      })
    }
  }

  return data
}
