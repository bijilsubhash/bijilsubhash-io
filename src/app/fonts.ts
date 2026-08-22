import { Newsreader, Inter, JetBrains_Mono } from 'next/font/google'

// Headings, wordmark, post titles, pull quotes. Variable opsz serif.
export const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
})

// Body, long-form prose, captions.
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

// Metadata, dates, tags, nav, code, labels.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains',
})
