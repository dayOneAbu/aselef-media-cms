import React from 'react'
import configPromise from '@payload-config'
import { CollectionArchive } from '../CollectionArchive'
import { Metadata } from 'next'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 300

async function CategoryPage() {
  const payload = await getPayload({ config: configPromise })

  try {
    // Fetch all categories with parent relationships
    const categories = await payload.find({
      collection: 'categories',
      depth: 2,
      limit: 1000,
    })

    const allCategories = categories.docs

    // Identify child categories (categories with parents)
    const childCategories = allCategories.filter((category) => {
      return category.parent !== null && category.parent !== undefined
    })

    // For each child category, get posts that include this category in their tags
    const categorySections = await Promise.all(
      childCategories.map(async (category) => {
        const posts = await payload.find({
          collection: 'posts',
          depth: 1,
          where: {
            categories: {
              contains: category.id, // Correct way to query posts by category ID
            },
          },
          limit: 12,
          sort: '-createdAt',
        })

        return {
          category,
          posts: posts.docs,
        }
      }),
    )

    // Filter out empty sections and sort alphabetically
    const nonEmptySections = categorySections
      .filter((section) => section.posts.length > 0)
      .sort((a, b) => a.category.title.localeCompare(b.category.title))

    if (nonEmptySections.length === 0) {
      return (
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold">Categories</h2>
          <p>No posts found in child categories.</p>
        </div>
      )
    }

    return (
      <div className="space-y-12">
        {nonEmptySections.map((section) => (
          <div key={section.category.id} className="space-y-6">
            <div className="prose dark:prose-invert max-w-none my-6">
              <h2 className="text-xl font-semibold">{section.category.title}</h2>
              <p className="text-sm text-gray-500">{section.posts.length} posts</p>
            </div>
            <CollectionArchive posts={section.posts} />
          </div>
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error loading categories:', error)
    return (
      <div className="prose dark:prose-invert max-w-none">
        <h1>Error</h1>
        <p>Failed to load categories. Please try again later.</p>
        <pre className="text-xs">{JSON.stringify(error, null, 2)}</pre>
      </div>
    )
  }
}

export default CategoryPage

export function generateMetadata(): Metadata {
  return {
    title: 'Categories - ASELEF MEDIA',
  }
}
