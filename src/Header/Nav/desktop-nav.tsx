import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { cn } from 'src/utilities/cn'

interface DesktopNavProps {
  items: NavItem[]
}

interface NavItem {
  type: 'link' | 'separator' | 'dropdown'
  link?: { href: string; label: string }
  children?: Array<NavItem>
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ items }) => {
  return (
    <NavigationMenu className="hidden lg:block w-full">
      <NavigationMenuList className="flex items-center gap-2">
        {items.map((item, i) => {
          if (item.type === 'separator') {
            return (
              <NavigationMenuItem key={`sep-${i}`}>
                <span>|</span>
              </NavigationMenuItem>
            )
          }

          if (item.type === 'link' && item.link) {
            return (
              <NavigationMenuItem key={`link-${i}`}>
                <Link
                  href={item.link.href}
                  className={cn(
                    'text-brand-white transition-colors flex-shrink-0',
                    'text-base lg:text-lg',
                    'hover:text-foreground/80',
                    'group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2',
                    'hover:bg-accent',
                    'disabled:pointer-events-none disabled:opacity-50',
                  )}
                >
                  {item.link.label}
                </Link>
              </NavigationMenuItem>
            )
          }

          if (item.type === 'dropdown' && item.link && item.children) {
            return (
              <NavigationMenuItem key={`dropdown-${i}`} className="relative">
                <NavigationMenuTrigger>{item.link.label}</NavigationMenuTrigger>
                <NavigationMenuContent className="absolute z-50 mt-2 rounded-lg shadow-lg min-w-[500px] left-1/2 -translate-x-1/2">
                  <ScrollArea className="flex flex-col gap-2 min-h-[500px]">
                    {item.children.length > 0 ? (
                      item.children.map((child, j) =>
                        child.type === 'link' ? (
                          <Link
                            key={`child-${j}`}
                            href={child.link!.href}
                            className="text-foreground text-sm p-2 hover:bg-accent rounded-md block"
                          >
                            {child.link!.label}
                          </Link>
                        ) : (
                          <NavigationMenu key={`child-${j}`} className="w-full">
                            <NavigationMenuList>
                              <NavigationMenuItem>
                                <NavigationMenuTrigger className="">
                                  {child.link!.label}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="absolute z-50 mt-2 rounded-lg shadow-lg min-w-[500px] left-1/2 -translate-x-1/2">
                                  <div className="flex flex-row gap-2 min-h-[50px]">
                                    {(child.children ?? []).length > 0 ? (
                                      (child.children ?? []).map((grandchild, k) =>
                                        grandchild.type === 'link' ? (
                                          <Link
                                            key={`grandchild-${k}`}
                                            href={grandchild.link!.href}
                                            className="text-foreground text-sm p-2 hover:bg-accent rounded-md block"
                                          >
                                            {grandchild.link!.label}
                                          </Link>
                                        ) : (
                                          <div key={`grandchild-${k}`} className="pt-2">
                                            <strong className="">{grandchild.link!.label}</strong>
                                            {grandchild.children?.map((greatGrandchild, m) => (
                                              <Link
                                                key={`great-grandchild-${m}`}
                                                href={greatGrandchild.link!.href}
                                                className="text-foreground text-sm p-2 hover:bg-accent rounded-md block"
                                              >
                                                {greatGrandchild.link!.label}
                                              </Link>
                                            ))}
                                          </div>
                                        ),
                                      )
                                    ) : (
                                      <span className="">No sub-items</span>
                                    )}
                                  </div>
                                </NavigationMenuContent>
                              </NavigationMenuItem>
                            </NavigationMenuList>
                          </NavigationMenu>
                        ),
                      )
                    ) : (
                      <span className="">No items in dropdown</span>
                    )}
                  </ScrollArea>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          return null
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
