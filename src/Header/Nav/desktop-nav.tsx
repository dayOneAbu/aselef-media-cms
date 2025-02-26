import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { cn } from 'src/utilities/cn'

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

interface DesktopNavProps {
  items: NavItem[]
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ items }) => {
  return (
    <NavigationMenu className="hidden lg:block w-full">
      <NavigationMenuList className="flex items-center flex-wrap gap-2">
        {items.map((item, i) => {
          if (item.type === 'separator') {
            return (
              <NavigationMenuItem key={`sep-${i}`}>
                <span className="text-white">|</span>
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
                <NavigationMenuContent className="absolute z-50 mt-2 min-h-24 rounded-lg shadow-lg min-w-[400px]">
                  <div className="p-2">
                    {item.children.map((child, j) => (
                      <Link
                        key={`child-${j}`}
                        href={child.href}
                        className="text-foreground text-sm p-2 hover:bg-accent rounded-md"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
