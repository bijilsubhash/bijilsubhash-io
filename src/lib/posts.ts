import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { tagSlug, tagLabel } from './tags'

const WRITING_DIR = path.join(process.cwd(), 'content', 'writing')

export type PostFrontmatter = {
  title: string
  date: string
  tags?: string[]
  description?: string
  draft?: boolean
}

export type Post = {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
  draft: boolean
  readingTime: string
  content: string
}

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, '')
  const raw = fs.readFileSync(path.join(WRITING_DIR, fileName), 'utf8')
  const { data, content } = matter(raw)
  const fm = data as PostFrontmatter
  const tags = (fm.tags ?? []).map(tagLabel)
  return {
    slug,
    title: fm.title,
    date: fm.date,
    tags,
    description: fm.description ?? '',
    draft: fm.draft ?? false,
    readingTime: readingTime(content).text,
    content,
  }
}

/** All non-draft posts, newest first. Drafts are included only in development. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(WRITING_DIR)) return []
  const files = fs.readdirSync(WRITING_DIR).filter((f) => /\.mdx?$/.test(f))
  const showDrafts = process.env.NODE_ENV === 'development'
  return files
    .map(readPostFile)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

export type TagCount = { slug: string; label: string; count: number }

export function getAllTags(): TagCount[] {
  const counts = new Map<string, TagCount>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const slug = tagSlug(tag)
      const existing = counts.get(slug)
      if (existing) existing.count += 1
      else counts.set(slug, { slug, label: tag, count: 1 })
    }
  }
  return [...counts.values()].sort((a, b) => a.label.localeCompare(b.label))
}

export function getPostsByTag(slug: string): Post[] {
  return getAllPosts().filter((p) => p.tags.some((t) => tagSlug(t) === slug))
}

/** Group posts by year (desc) for the archive layout. */
export function groupByYear(posts: Post[]): { year: string; posts: Post[] }[] {
  const groups = new Map<string, Post[]>()
  for (const post of posts) {
    const year = post.date.slice(0, 4)
    const list = groups.get(year) ?? []
    list.push(post)
    groups.set(year, list)
  }
  return [...groups.entries()]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([year, posts]) => ({ year, posts }))
}
