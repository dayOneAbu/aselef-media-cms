'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Slash } from 'lucide-react'

const ITEMS_TO_DISPLAY = 3

export function Breadcrumbs() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const pathname = usePathname()

  const items =
    pathname === '/'
      ? [{ href: '/', label: 'Home' }]
      : [
          { href: '/', label: 'Home' },
          ...pathname
            .split('/')
            .filter(Boolean)
            .map((path, index, array) => {
              if (path.toLowerCase() === 'home') return null
              return {
                href:
                  index === array.length - 1
                    ? undefined
                    : `/${array.slice(0, index + 1).join('/')}`,
                label: path.charAt(0).toUpperCase() + path.slice(1),
              }
            })
            .filter(Boolean),
        ]

  if (items.length <= 1) return null

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-wrap text-foreground items-center text-sm md:text-base">
        <BreadcrumbItem>
          <BreadcrumbLink
            href={items[0]?.href ?? '#'}
            className="text-sm font-medium hover:text-white/90 transition-colors"
          >
            {items[0]?.label}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <Slash className="h-4 w-4 text-white/60" />

        {items.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1 hover:text-white/90 transition-colors"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48 max-h-[300px] overflow-y-auto">
                    {items.slice(1, -2).map((item, index) => (
                      <DropdownMenuItem key={index}>
                        <Link
                          href={item?.href ?? '#'}
                          className="w-full truncate hover:text-white/90"
                        >
                          {item?.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger
                    className="hover:text-white/90 transition-colors"
                    aria-label="Toggle Menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>Select a page to navigate to.</DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-2 px-4">
                      {items.slice(1, -2).map((item, index) => (
                        <Link
                          key={index}
                          href={item?.href ?? '#'}
                          className="py-2 text-sm hover:text-white/90 transition-colors"
                        >
                          {item?.label}
                        </Link>
                      ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>

            <Slash className="h-4 w-4 text-white/60" />
          </>
        ) : null}

        {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
          <BreadcrumbItem key={index}>
            {item?.href ? (
              <>
                <BreadcrumbLink
                  asChild
                  className="max-w-[120px] md:max-w-[200px] truncate hover:text-white/90 transition-colors"
                >
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>

                <Slash className="h-4 w-4 text-white/60" />
              </>
            ) : (
              <BreadcrumbPage className="max-w-[120px] md:max-w-[200px] truncate text-white">
                {item?.label}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
