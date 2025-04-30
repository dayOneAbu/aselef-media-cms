import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Category, Footer as FooterTypes, SocialMedia } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { LogoFooter } from '@/components/Logo/Logo'

export async function Footer({ categories }: { categories: Category[] }) {
  const socialData: SocialMedia = await getCachedGlobal('social-media', 1)()
  const footerData: FooterTypes = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const socialNavItems = socialData?.links || []

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link className="flex items-center" href="/">
              <LogoFooter />
            </Link>
            {/* <h3 className="font-bold mb-4">ASELEF MEDIA AND COMMUNICATION</h3> */}
            <p className="text-sm text-left text-muted-foreground">
              © {new Date().getFullYear()} AMC. All rights reserved
            </p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold my-2 py-4">ስለ እኛ</h4>
            <nav className="space-y-2  text-sm flex flex-col md:flex-col gap-4">
              {navItems.map(({ link }, i) => {
                return <CMSLink className=" " key={i} {...link} />
              })}
            </nav>
          </div>
          <div>
            <h4 className="font-semibold my-2 py-4">ምድቦች</h4>
            <nav className="space-y-2 text-sm grid grid-cols-2 md:flex-col gap-4">
              <Link href={'/'}>መነሻ ገጽ</Link>
              {categories
                .filter((cat) => !cat.parent) // This filters out categories that have a parent
                .map((cat) => (
                  <Link key={cat.id} href={cat.title}>
                    {cat.title}
                  </Link>
                ))}
            </nav>
          </div>
          <div>
            <h4 className="font-semibold my-2 py-4">ማህበራዊ ትስስር ገጾች</h4>
            <nav className="space-y-2 text-sm flex flex-col md:flex-col gap-4">
              {socialNavItems.map(({ label, url }, i) => {
                return (
                  <CMSLink className="  capitalize" key={i} label={label} url={url} newTab={true} />
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
