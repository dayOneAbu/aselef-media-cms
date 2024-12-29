'use client'

import { FeaturedArticleCard } from './article-card'
import { FeaturedPost } from './types'

export function FeaturedGrid({ articles }: { articles: FeaturedPost[] }) {
  if (!articles.length) return null

  const [main, ...otherArticles] = articles

  return (
    <div className="grid grid-cols-12 gap-1 md:gap-4">
      {/* Main Featured Article - Large */}
      <div className="col-span-6 md:col-span-8">
        <FeaturedArticleCard article={main} size="large" />
      </div>

      {/* Right Column - Medium Articles */}
      <div className="col-span-6 md:col-span-4 grid grid-rows-2 gap-1 md:gap-4">
        {otherArticles.slice(0, 2).map((article) => (
          <FeaturedArticleCard key={article.id} article={article} size="medium" />
        ))}
      </div>

      {/* Bottom Row - Small Articles */}
      {otherArticles.slice(2).map((article) => (
        <div key={article.id} className="col-span-12 md:col-span-6">
          <FeaturedArticleCard article={article} size="small" />
        </div>
      ))}
    </div>
  )
}
