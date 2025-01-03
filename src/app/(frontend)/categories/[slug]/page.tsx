import { PostGrid } from '@/components/PostGrid'

import configPromise from '@payload-config'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import type { Metadata } from 'next'
import { cache } from 'react'
import { getPayload } from 'payload'

import type { Post } from '@/payload-types'

import { HeroImageGrid } from '@/components/HeroSection'
import { Pagination } from '@/components/Pagination'

export default async function CategoryPage({ params }) {
  const { slug } = await params

  const url = `/categories/${slug}`
  const posts = await queryPostsByCategory({ slug })

  if (!posts) return <PayloadRedirects url={url} />

  return (
    <div className="container mx-auto p-4 space-y-8">
      <PayloadRedirects disableNotFound url={url} />
      <HeroImageGrid
        title="Discover Category Name Goes Here 24/7"
        description="Find unique moments and news."
        image="/ezgif.com-gif-maker (1).webp"
        layout="textLeft"
      />

      <PostGrid title="Latest Stories" posts={posts.docs as Post[]} />
      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Aselef Media and Communication | Ethiopian News Articles',
  }
}

const queryPostsByCategory = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    where: {
      'categories.slug': {
        equals: slug,
      },
    },
    depth: 1,
    limit: 10,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
      publishedAt: true,
      timeToRead: true,
      visitorsRead: true,
    },
  })

  return result
})
