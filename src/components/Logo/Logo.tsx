import clsx from 'clsx'
import { Home } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Aselef Media Corporation Logo"
      width={193}
      height={38}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-20 lg:h-32', className)}
      src="/AMCRevised-logo with whitebg-Photoroom.png"
    />
  )
}
export const LogoFooter = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Aselef Media Corporation Logo"
      width={193}
      height={38}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-20 lg:h-32', className)}
      src="/ezgif.com-gif-maker.webp"
    />
  )
}
export const AdminLogo = () => {
  return (
    <div className="flex  justify-center items-center gap-2">
      <img
        width={193}
        height={38}
        src="/ezgif.com-gif-maker.webp"
        alt="Aselef Media Communication Logo"
      />
    </div>
  )
}
export const AdminHome = () => {
  return <Home className="text-white h-4 w-4 p-4" />
}

export const AccountIcon = () => {
  return (
    <Avatar className="h-16 bg-cyan-600 text-white w-16">
      <AvatarFallback>AMC</AvatarFallback>
    </Avatar>
  )
}
