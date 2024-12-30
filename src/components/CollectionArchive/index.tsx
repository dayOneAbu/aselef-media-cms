import { cn } from 'src/utilities/cn'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props
  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <Card key={index} className="h-full" doc={result} relationTo="posts" showCategories />
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
