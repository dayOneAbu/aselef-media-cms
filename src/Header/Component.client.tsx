'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'

import type { Header, Category, Page } from '@/payload-types'

import { MobileNav } from './Nav/mobile-nav'
import { DesktopNav } from './Nav/desktop-nav'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Logo } from '@/components/Logo/Logo'
import { buildNestedNavItems } from './helper'

interface HeaderClientProps {
  categories: Category[]
  data: Header
}
export const HeaderClient: React.FC<HeaderClientProps> = ({ categories, data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(null)
  }, [setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  // Build nested navigation items
  const navItems = [
    ...buildNestedNavItems(categories || []),
    { type: 'separator' as const },
    ...(data?.navItems || []).map((item) => ({
      type: 'link' as const,
      link: {
        href:
          item.link?.type === 'reference'
            ? `/${(item.link.reference?.value as Page)?.slug}`
            : item.link?.url || '#',
        label: item.link?.label || '',
      },
    })),
  ]

  return (
    <header className="bg-brand lg:h-48 h-28 relative">
      <div className="container mx-auto px-4 flex flex-col">
        <div className="flex flex-row items-center justify-between h-28 lg:h-30">
          <Link
            href="/"
            className="text-2xl font-bold flex flex-col md:flex-row items-baseline transition-colors flex-shrink-0 lg:text-center lg:w-auto"
          >
            <Logo />
            <h2 className="text-2xl ml-4 text-white font-semibold lg:font-bold transition-colors flex-shrink-0 lg:text-center lg:w-auto">
              ትክክለኛነት በፍጥነት
            </h2>
          </Link>
          <div className="flex flex-row lg:mr-14 items-center justify-center">
            <ThemeSelector />
            <div className="lg:hidden">
              <MobileNav items={navItems} />
            </div>
          </div>
        </div>
        <div className="py-2 lg:h-auto flex mt-4 flex-col lg:flex-row justify-center lg:justify-between lg:gap-8">
          <DesktopNav items={navItems} />
        </div>
      </div>
    </header>
  )
}
