import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Category, Footer, SocialMedia } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer({ categories }: { categories: Category[] }) {
  const socialData: SocialMedia = await getCachedGlobal('social-media', 1)()
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const socialNavItems = socialData?.links || []

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link className="flex items-center" href="/">
              <Logo />
            </Link>
            <h3 className="font-bold mb-4">ASELEF MEDIA AND COMMUNICATION</h3>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AMC. All rights reserved
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <nav className="space-y-2 text-sm flex flex-col md:flex-col gap-4">
              {navItems.map(({ link }, i) => {
                return <CMSLink className="text-white" key={i} {...link} />
              })}
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Categories</h4>
            <nav className="space-y-2 text-sm flex flex-col md:flex-col gap-4">
              {categories.map((cat) => (
                <Link key={cat.id} href={cat.title}>
                  {cat.title}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Social Links</h4>
            <nav className="space-y-2 text-sm flex flex-col md:flex-col gap-4">
              {socialNavItems.map(({ label, url }, i) => {
                return (
                  <CMSLink
                    className="text-white capitalize"
                    key={i}
                    label={label}
                    url={url}
                    newTab={true}
                  />
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
