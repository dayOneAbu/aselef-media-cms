import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Metadata } from 'next'
import { cache } from 'react'
import { FeaturedGrid } from '@/components/featured-news/featured-grid'
import type { Category, FeaturedPost } from '@/components/featured-news/types'
import { PageRange } from '@/components/PageRange'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
export const dynamic = 'force-static'

export const revalidate = 300
export default async function Home() {
  const FeaturedArticles = await queryFeaturedPosts()
  const posts = await queryPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="w-full">
        <FeaturedGrid articles={FeaturedArticles} />
      </section>
      <div className="grid grid-cols-12 gap-8 mt-8">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-8">
            {/* <AdvertisementBanner /> */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Latest News</h2>
              </div>
              <div className="container mb-8">
                <PageRange
                  collection="posts"
                  currentPage={posts.page}
                  limit={12}
                  totalDocs={posts.totalDocs}
                />
              </div>

              <CollectionArchive posts={posts.docs} />

              <div className="container">
                {posts.totalPages > 1 && posts.page && (
                  <Pagination page={posts.page} totalPages={posts.totalPages} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4 space-y-8">
          <div className="space-y-8">
            {/* <AdvertisementBanner />
            <TrendingHeadlines /> */}
          </div>
        </aside>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Aselef Media and Communication Home',
  }
}
const queryPosts = async () => {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      isFeatured: {
        equals: false,
      },
    },
    sort: '-createdAt',
    select: {
      id: true,
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
      timeToRead: true,
      publishedAt: true,
      visitorsRead: true,
    },
  })
  return posts
}
const queryFeaturedPosts = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 5,
    overrideAccess: false,
    where: {
      isFeatured: {
        equals: true,
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
    },
  })

  return result.docs.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug || '',
    heroImage:
      post.heroImage && typeof post.heroImage !== 'number'
        ? {
            id: post.heroImage.id,
            url: post.heroImage.url,
            filename: post.heroImage.filename,
            alt: post.heroImage.alt,
          }
        : undefined,
    categories: post.categories
      ?.filter(
        (
          cat,
        ): cat is Category & { id: string; title: string; updatedAt: string; createdAt: string } =>
          typeof cat !== 'number' && cat !== null && 'id' in cat && 'title' in cat,
      )
      .map((cat) => ({
        id: cat.id,
        title: cat.title,
      })),
    meta: {
      description: post.meta?.description || undefined,
    },
  })) as FeaturedPost[]
})
