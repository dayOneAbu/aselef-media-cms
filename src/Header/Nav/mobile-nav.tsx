'use client'

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'

interface MobileNavProps {
  items: Array<{
    type: 'link' | 'separator'
    link?: {
      href: string
      label: string
    }
  }>
}

export const MobileNav: React.FC<MobileNavProps> = ({ items }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <ScrollArea className="h-[calc(100vh-4rem)] px-4">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex flex-col space-y-4 py-4">
              {items.map((item, i) => {
                if (item.type === 'separator') {
                  return <div key={`sep-${i}`} className="h-px bg-border" />
                }

                if (item.link) {
                  return (
                    <NavigationMenuItem key={`link-${i}`}>
                      <Link
                        href={item.link.href}
                        className="text-foreground text-sm sm:text-base transition-colors block p-2 hover:bg-accent rounded-md"
                      >
                        {item.link.label}
                      </Link>
                    </NavigationMenuItem>
                  )
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
