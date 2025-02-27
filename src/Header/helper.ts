import type { Category } from '@/payload-types'

interface NavItem {
  type: 'link' | 'separator' | 'dropdown'
  link?: { href: string; label: string }
  children?: Array<NavItem> // Changed to NavItem[] to allow deeper nesting
}

export const buildNestedNavItems = (categories: Category[]): NavItem[] => {
  // Map of categories by ID for quick lookup
  const categoryMap = new Map<number, Category & { children?: Category[] }>()
  for (const cat of categories) {
    categoryMap.set(cat.id, { ...cat, children: [] })
  }

  // Build the hierarchy
  for (const cat of categoryMap.values()) {
    if (cat.parent) {
      const parentId = typeof cat.parent === 'number' ? cat.parent : cat.parent?.id
      if (parentId) {
        const parent = categoryMap.get(parentId)
        if (parent) {
          parent.children = parent.children || []
          parent.children.push(cat)
        }
      }
    }
  }

  // Recursive function to convert Category to NavItem
  const convertToNavItem = (cat: Category & { children?: Category[] }): NavItem => {
    const baseItem = {
      link: { href: `/categories/${cat.slug || cat.id}`, label: cat.title },
    }

    if (cat.children && cat.children.length > 0) {
      return {
        type: 'dropdown',
        ...baseItem,
        children: cat.children.map((child) => convertToNavItem(child)),
      }
    }

    return {
      type: 'link',
      ...baseItem,
    }
  }

  // Build root items (top-level categories with no parent)
  const rootItems: NavItem[] = []
  for (const cat of categoryMap.values()) {
    if (!cat.parent) {
      rootItems.push(convertToNavItem(cat))
    }
  }

  return rootItems
}
