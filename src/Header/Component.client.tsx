'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Category } from '@/payload-types'

import { MobileNav } from './Nav/mobile-nav'
import { DesktopNav } from './Nav/desktop-nav'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Logo } from '@/components/Logo/Logo'

interface HeaderClientProps {
  categories: Category[]
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ categories, data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const navItems = [
    ...(categories || []).map((category) => ({
      type: 'link' as const,
      link: {
        href: `/categories/${category.slug}`,
        label: category.title,
      },
    })),
    { type: 'separator' as const },
    ...(data?.navItems || []).map((item) => ({
      type: 'link' as const,
      link: {
        href:
          item.link?.type === 'reference'
            ? `/${item.link.reference?.value?.slug}`
            : item.link?.url || '#',
        label: item.link?.label || '',
      },
    })),
  ]

  return (
    <header className="bg-brand text-brand-white lg:h-40 h-20">
      <div className="container mx-auto px-4 flex flex-col">
        {/* Top bar - push to top */}
        <div className="flex items-center h-20 lg:h-30 justify-between py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-brand-light hover:text-brand-white transition-colors"
          >
            ASELEF MEDIA COMMUNICATION
          </Link>

          <div className="flex items-center gap-4">
            <div className="lg:mr-14 text-foreground">
              <ThemeSelector />
            </div>
            <MobileNav items={navItems} />
          </div>
        </div>

        <div className="py-2 h-10 flex-1">
          <DesktopNav items={navItems} />
        </div>
      </div>
    </header>
  )
}
