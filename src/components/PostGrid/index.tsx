import { Post } from '@/payload-types'
import { CollectionArchive } from '../CollectionArchive'

interface PostGridProps {
  title: string
  posts: Post[]
}

export function PostGrid({ posts }: PostGridProps) {
  return (
    <section className="space-y-4">
      <CollectionArchive posts={posts} />
    </section>
  )
}
