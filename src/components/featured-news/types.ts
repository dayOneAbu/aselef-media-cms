export type FeaturedArticleSize = 'large' | 'medium' | 'small'

interface Media {
  id: number
  url: string
  alt?: string
  filename: string
}

export interface Category {
  id: number
  title: string
}

interface Meta {
  title?: string
  description?: string
  image?: Media
}

export interface FeaturedPost {
  id: number
  title: string
  heroImage?: Media
  categories?: Category[]
  meta?: Meta
  slug: string
}
