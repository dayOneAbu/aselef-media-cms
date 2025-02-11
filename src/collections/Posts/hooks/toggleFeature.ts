import type { Post } from '@/payload-types'
import type { CollectionBeforeChangeHook } from 'payload'

export const toggleFeatureHook: CollectionBeforeChangeHook<Post> = async ({
  data,
  req,
  req: { payload },
}) => {
  if (data?.isFeatured) {
    const featuredPosts = await payload.find({
      collection: 'posts',
      where: {
        isFeatured: {
          equals: true,
        },
      },
      limit: 5,
      sort: '-publishedAt', // Make sure you're sorting by the correct field
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
