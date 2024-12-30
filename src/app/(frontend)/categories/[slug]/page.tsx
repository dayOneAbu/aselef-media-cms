import { PostGrid } from '@/components/PostGrid'

import configPromise from '@payload-config'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Metadata } from 'next'
import { cache } from 'react'
import { getPayload } from 'payload'

import { Post } from '@/payload-types'

import { HeroImageGrid } from '@/components/HeroSection'

export default async function CategoryPage({ params }) {
  console.log('first')
  const { slug } = await params

  const url = '/categories/' + slug
  const posts = await queryPostsByCategory({ slug })

  if (!posts) return <PayloadRedirects url={url} />

  return (
    <div className="container mx-auto p-4 space-y-8">
      <PayloadRedirects disableNotFound url={url} />
      <HeroImageGrid
        title="Discover the World's News 24/7"
        description="Find unique moments and news."
        image='/ezgif.com-gif-maker (1).webp'
        layout='textLeft'
      />

      <PostGrid
        title="Latest Stories"
        posts={posts as Post[]}
        onShowMore={() => console.log('Show more clicked')}
      />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Aselef Media and Communication | Ethiopian News Articles`,
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

  return result.docs || null
})
