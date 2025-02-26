'use client'

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Menu, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import Link from 'next/link'

interface NavItem {
  type: 'link' | 'separator' | 'dropdown'
  link?: {
    href: string
    label: string
  }
  children?: Array<{
    href: string
    label: string
  }>
}

interface MobileNavProps {
  items: NavItem[]
}

export const MobileNav: React.FC<MobileNavProps> = ({ items }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 text-white w-6" />
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

                if (item.type === 'link' && item.link) {
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

                if (item.type === 'dropdown' && item.link && item.children) {
                  return (
                    <Collapsible key={`dropdown-${i}`}>
                      <CollapsibleTrigger className="flex items-center bg-transparent justify-between w-full p-2 hover:bg-accent rounded-md">
                        <span className="text-foreground text-sm sm:text-base">
                          {item.link.label}
                        </span>
                        <ChevronRight className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="pl-4 space-y-2 py-2">
                          {item.children.map((child, j) => (
                            <Link
                              key={`child-${j}`}
                              href={child.href}
                              className="text-foreground text-sm block p-2 hover:bg-accent rounded-md"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
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
