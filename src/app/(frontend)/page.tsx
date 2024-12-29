// import PageTemplate, { generateMetadata } from './[slug]/page'
// export default PageTemplate

// export { generateMetadata }
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { FeaturedGrid } from '@/components/featured-news/featured-grid'
import { Metadata } from 'next'
import { cache } from 'react'
import { Category, FeaturedPost } from '@/components/featured-news/types'

export default async function Home() {
  const articles = await queryPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="w-full">
        <FeaturedGrid articles={articles} />
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
              {/* <LatestNews /> */}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4 space-y-8">
          <div className="space-y-8">
            {/* <TrendingHeadlines />
            <AdvertisementBanner />
            <TrendingHeadlines /> */}
          </div>
        </aside>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Aselef Media and Communication Home`,
  }
}

const queryPosts = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 12,
    overrideAccess: false,
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
