'use client'

import { FeaturedArticleCard } from './article-card'
import { FeaturedPost } from './types'

export function FeaturedGrid({ articles }: { articles: FeaturedPost[] }) {
  if (!articles.length) return null

  const [main, ...otherArticles] = articles

  return (
    <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
      {/* Main Featured Article - Large */}
      <div className="col-span-12 lg:col-span-8 lg:row-span-2 h-full">
        <FeaturedArticleCard article={main} size="large" />
      </div>

      {/* Right Column - Medium Articles */}
      <div className="col-span-12 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3 md:gap-4">
        {otherArticles.slice(0, 2).map((article) => (
          <div key={article.id} className="h-full">
            <FeaturedArticleCard article={article} size="medium" />
          </div>
        ))}
      </div>

      {/* Bottom Row - Small Articles */}
      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {otherArticles.slice(2).map((article) => (
          <div key={article.id} className="h-full">
            <FeaturedArticleCard article={article} size="small" />
          </div>
        ))}
      </div>
    </div>
  )
}
