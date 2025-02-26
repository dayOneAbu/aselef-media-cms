import type { Category } from '@/payload-types'

interface NavItem {
  type: 'link' | 'separator' | 'dropdown'
  link?: { href: string; label: string }
  children?: Array<{ href: string; label: string }>
}

// Helper function to build nested nav items
export const buildNestedNavItems = (categories: Category[]): NavItem[] => {
  // Map of categories by ID for quick lookup
  const categoryMap = new Map<number, Category & { children?: Category[] }>()
  for (const cat of categories) {
    categoryMap.set(cat.id, { ...cat, children: [] })
  }

  // Build the hierarchy
  const rootItems: NavItem[] = []
  for (const cat of categoryMap.values()) {
    if (cat.parent) {
      if (typeof cat.parent !== 'number') {
        const parent = categoryMap.get(cat.parent.id)
        if (parent) {
          parent.children = parent.children || []
          parent.children.push(cat)
        }
      }
    }
  }

  // Convert to NavItem structure
  for (const cat of categoryMap.values()) {
    if (!cat.parent) {
      // Top-level category
      if (cat.children && cat.children.length > 0) {
        // Has children, make it a dropdown
        rootItems.push({
          type: 'dropdown',
          link: { href: `/categories/${cat.slug}`, label: cat.title },
          children: cat.children.map((child) => ({
            href: `/categories/${child.slug}`,
            label: child.title,
          })),
        })
      } else {
        // No children, make it a link
        rootItems.push({
          type: 'link',
          link: { href: `/categories/${cat.slug}`, label: cat.title },
        })
      }
    }
  }

  return rootItems
}
