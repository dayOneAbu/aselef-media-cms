'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sun, Moon, Monitor } from 'lucide-react'
import React, { useState } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label="Select a theme"
        className="w-auto bg-transparent text-white gap-2 pl-0 md:pl-3 border-none"
      >
        <SelectValue placeholder={<Sun className="h-4 w-4" />}>
          {value === 'light' && <Sun className="h-4 w-4" />}
          {value === 'dark' && <Moon className="h-4 w-4" />}
          {value === 'auto' && <Monitor className="h-4 w-4" />}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="auto">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span>Auto</span>
          </div>
        </SelectItem>
        <SelectItem value="light">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </div>
        </SelectItem>
        <SelectItem value="dark">
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
