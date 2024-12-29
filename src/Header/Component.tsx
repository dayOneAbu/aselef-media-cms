import React from 'react'
import { Category } from '@/payload-types'
import { HeaderClient } from './Component.client'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

interface HeaderProps {
  categories: Category[]
}

export async function Header({ categories }: HeaderProps) {
  const payload = await getPayload({ config: configPromise })
  const header = await payload.findGlobal({
    slug: 'header',
  })

  return <HeaderClient categories={categories} data={header} />
}
