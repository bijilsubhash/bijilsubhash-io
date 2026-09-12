import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { tagLabel } from './tags'

const DEEP_DIVES_DIR = path.join(process.cwd(), 'content', 'deep-dives')
const DIVE_INDEX_FILE = '_dive.mdx'

/**
 * Fixed order for the Deep Dives index: spark, databricks, then anything else
 * alphabetically. Subjects are a grouping only, never a nav item or URL segment.
 */
const SUBJECT_ORDER = ['spark', 'databricks']

export type Subject = 'spark' | 'databricks' | 'agents' | 'mlops' | (string & {})

type PartConfig = { title: string; lessons: string[] }

type DiveFrontmatter = {
  title: string
  subject?: Subject
  description?: string
  youtubePlaylist?: string
  draft?: boolean
  related?: string[]
  parts?: PartConfig[]
}

type LessonFrontmatter = {
  title: string
  date: string
  description?: string
  tags?: string[]
  youtube?: string
  draft?: boolean
  related?: string[]
}

export type Lesson = {
  slug: string
  diveSlug: string
  title: string
  date: string
  description: string
  tags: string[]
  youtube?: string
  related: string[]
  draft: boolean
  readingTime: string
  content: string
  // navigation, resolved after ordering
  part: string
  index: number // 0-based position across the whole dive
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}

export type Part = { title: string; lessons: Lesson[] }

export type DeepDive = {
  slug: string
  title: string
  subject: Subject
  description: string
  youtubePlaylist?: string
  related: string[]
  draft: boolean
  parts: Part[]
  lessons: Lesson[] // flattened, in order
  lessonCount: number
  updatedAt: string // max lesson date
  content: string // _dive.mdx body
}

function readLessonFile(diveSlug: string, slug: string, part: string): Lesson {
  const raw = fs.readFileSync(
    path.join(DEEP_DIVES_DIR, diveSlug, `${slug}.mdx`),
    'utf8',
  )
  const { data, content } = matter(raw)
  const fm = data as LessonFrontmatter
  return {
    slug,
    diveSlug,
    title: fm.title,
    date: fm.date,
    description: fm.description ?? '',
    tags: (fm.tags ?? []).map(tagLabel),
    youtube: fm.youtube,
    related: fm.related ?? [],
    draft: fm.draft ?? false,
    readingTime: readingTime(content).text,
    content,
    part,
    index: 0, // assigned after draft filtering and flattening
  }
}

/**
 * Load one deep dive from its folder, applying the build-time validation in
 * `docs/design/deep-dives.md` §3.3. Throws on a structural error so `next build`
 * fails loudly rather than rendering a broken dive; unreachable lessons are a
 * non-fatal console warning.
 */
function readDeepDive(diveSlug: string): DeepDive {
  const diveDir = path.join(DEEP_DIVES_DIR, diveSlug)
  const raw = fs.readFileSync(path.join(diveDir, DIVE_INDEX_FILE), 'utf8')
  const { data, content } = matter(raw)
  const fm = data as DiveFrontmatter

  if (!fm.subject) {
    throw new Error(`Deep dive "${diveSlug}": ${DIVE_INDEX_FILE} is missing "subject".`)
  }
  const partConfigs = fm.parts ?? []
  if (partConfigs.length === 0) {
    throw new Error(`Deep dive "${diveSlug}": ${DIVE_INDEX_FILE} has no "parts".`)
  }

  // Files present in the folder (lessons only), for existence and reachability checks.
  const filesOnDisk = new Set(
    fs
      .readdirSync(diveDir)
      .filter((f) => /\.mdx?$/.test(f) && f !== DIVE_INDEX_FILE)
      .map((f) => f.replace(/\.mdx?$/, '')),
  )

  const listed = new Set<string>()
  for (const part of partConfigs) {
    for (const slug of part.lessons) {
      if (listed.has(slug)) {
        throw new Error(
          `Deep dive "${diveSlug}": lesson "${slug}" is listed more than once across parts.`,
        )
      }
      listed.add(slug)
      if (!filesOnDisk.has(slug)) {
        throw new Error(
          `Deep dive "${diveSlug}": lesson "${slug}" is listed in ${DIVE_INDEX_FILE} but has no matching .mdx file.`,
        )
      }
    }
  }

  // Reachability warning: a file on disk that no part lists is unreachable.
  for (const slug of filesOnDisk) {
    if (!listed.has(slug)) {
      console.warn(
        `Deep dive "${diveSlug}": lesson file "${slug}.mdx" is not listed in ${DIVE_INDEX_FILE} and is unreachable.`,
      )
    }
  }

  // Read listed lessons, then drop drafts (visible only in development, like posts).
  const showDrafts = process.env.NODE_ENV === 'development'
  const parts: Part[] = partConfigs.map((part) => ({
    title: part.title,
    lessons: part.lessons
      .map((slug) => readLessonFile(diveSlug, slug, part.title))
      .filter((lesson) => showDrafts || !lesson.draft),
  }))

  // Flatten in order and resolve navigation across the whole dive.
  const lessons = parts.flatMap((part) => part.lessons)
  lessons.forEach((lesson, i) => {
    lesson.index = i
    const prev = lessons[i - 1]
    const next = lessons[i + 1]
    if (prev) lesson.prev = { slug: prev.slug, title: prev.title }
    if (next) lesson.next = { slug: next.slug, title: next.title }
  })

  const updatedAt = lessons.reduce((max, l) => (l.date > max ? l.date : max), '')

  return {
    slug: diveSlug,
    title: fm.title,
    subject: fm.subject,
    description: fm.description ?? '',
    youtubePlaylist: fm.youtubePlaylist,
    related: fm.related ?? [],
    draft: fm.draft ?? false,
    parts,
    lessons,
    lessonCount: lessons.length,
    updatedAt,
    content,
  }
}

/** All non-draft deep dives, most recently updated first. Drafts only in development. */
export function getAllDeepDives(): DeepDive[] {
  if (!fs.existsSync(DEEP_DIVES_DIR)) return []
  const showDrafts = process.env.NODE_ENV === 'development'
  return fs
    .readdirSync(DEEP_DIVES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readDeepDive(entry.name))
    .filter((dive) => showDrafts || !dive.draft)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
}

export function getDeepDiveBySlug(slug: string): DeepDive | null {
  return getAllDeepDives().find((d) => d.slug === slug) ?? null
}

export function getLesson(dive: string, lesson: string): Lesson | null {
  const deepDive = getDeepDiveBySlug(dive)
  if (!deepDive) return null
  return deepDive.lessons.find((l) => l.slug === lesson) ?? null
}

/** Group dives by subject in the fixed index order; empty subjects are dropped. */
export function groupBySubject(
  dives: DeepDive[],
): { subject: Subject; dives: DeepDive[] }[] {
  const groups = new Map<Subject, DeepDive[]>()
  for (const dive of dives) {
    const list = groups.get(dive.subject) ?? []
    list.push(dive)
    groups.set(dive.subject, list)
  }
  const rank = (subject: Subject): number => {
    const i = SUBJECT_ORDER.indexOf(subject)
    return i === -1 ? SUBJECT_ORDER.length : i
  }
  return [...groups.entries()]
    .sort((a, b) => {
      const byRank = rank(a[0]) - rank(b[0])
      return byRank !== 0 ? byRank : a[0].localeCompare(b[0])
    })
    .map(([subject, dives]) => ({ subject, dives }))
}
