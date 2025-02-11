'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Category, Page } from '@/payload-types'

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
            ? `/${(item.link.reference?.value as Page)?.slug}`
            : item.link?.url || '#',
        label: item.link?.label || '',
      },
    })),
  ]

  return (
    <header className="bg-brand py-4 lg:h-48 h-24">
      <div className="container mx-auto px-4 flex flex-col">
        {/* Top bar */}
        <div className="flex flex-row items-center justify-between py-4 h-24 lg:h-30">
          <Link
            href="/"
            className="text-2xl w -2/3 font-bold transition-colors flex-shrink-0 lg:text-center lg:w-auto"
          >
            <Logo />
          </Link>

          <div className="flex flex-row lg:mr-14">
            <ThemeSelector />
            <div className="lg:hidden py-2 w -1/3">
              <MobileNav items={navItems} />
            </div>
          </div>
        </div>

        {/* Desktop Navigation - under the logo on desktop */}
        <div className="py-2 lg:h-auto flex mt-4 flex-col lg:flex-row justify-center lg:justify-between lg:gap-8">
          <DesktopNav items={navItems} />
        </div>
      </div>
    </header>
  )
}
