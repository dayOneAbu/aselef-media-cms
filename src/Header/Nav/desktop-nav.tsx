'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { cn } from 'src/utilities/cn'

interface DesktopNavProps {
  items: Array<{
    type: 'link' | 'separator'
    link?: {
      href: string
      label: string
    }
  }>
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ items }) => {
  return (
    <NavigationMenu className="hidden lg:block w-full">
      <NavigationMenuList className="flex items-center flex-wrap gap-2">
        {items.map((item, i) => {
          if (item.type === 'separator') {
            return (
              <NavigationMenuItem key={`sep-${i}`}>
                <span className="text-foreground/60">|</span>
              </NavigationMenuItem>
            )
          }

          if (item.link) {
            return (
              <NavigationMenuItem key={`link-${i}`}>
                <Link
                  href={item.link.href}
                  className={cn(
                    'text-foreground transition-colors flex-shrink-0',
                    'text-base lg:text-lg',
                    'hover:text-foreground/80',
                    'group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2',
                    'hover:bg-accent',
                    'focus:bg-accent focus:outline-none',
                    'disabled:pointer-events-none disabled:opacity-50',
                  )}
                >
                  {item.link.label}
                </Link>
              </NavigationMenuItem>
            )
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
