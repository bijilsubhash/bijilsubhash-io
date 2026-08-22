import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { Mdx } from '@/components/Mdx'
import { site } from '@/lib/site'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About',
  description: `About ${site.name} — data engineer and founder of NimbleStax.`,
  alternates: { canonical: '/about' },
}

function getAboutContent() {
  return fs.readFileSync(path.join(process.cwd(), 'content', 'about.mdx'), 'utf8')
}

export default function AboutPage() {
  const content = getAboutContent()
  return (
    <div className={`container lede-first ${styles.about}`}>
      <header className={`${styles.head} reveal`}>
        <h1 className="t-page-title">About</h1>
      </header>
      <div className="reveal" style={{ animationDelay: '120ms' }}>
        <Mdx source={content} />
      </div>
    </div>
  )
}
