'use client'

import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

export function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  const forced = document.documentElement.dataset.theme
  if (forced === 'dark' || forced === 'light') return forced
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function subscribe(callback: () => void) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', callback)
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  return () => {
    mq.removeEventListener('change', callback)
    observer.disconnect()
  }
}

/**
 * The effective theme, reactive to both the header toggle (a data-theme
 * mutation on <html>) and the OS preference. Server snapshot is 'light'.
 */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, currentTheme, () => 'light')
}
