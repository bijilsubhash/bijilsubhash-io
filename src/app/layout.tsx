import type { Metadata } from 'next'
import { newsreader, inter, jetbrainsMono } from './fonts'
import { nav, site } from '@/lib/site'
import { isGateEnabled } from '@/lib/deep-dives-gate'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s – ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // While the section is gated, don't advertise it in the nav.
  const visibleNav = isGateEnabled()
    ? nav.filter((item) => item.href !== '/deep-dives')
    : nav

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Header items={visibleNav} />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
