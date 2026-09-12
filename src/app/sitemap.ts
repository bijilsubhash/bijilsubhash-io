import type { MetadataRoute } from 'next'
import { getAllPosts, getAllTags } from '@/lib/posts'
import { getAllDeepDives } from '@/lib/deep-dives'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const tags = getAllTags()
  const dives = getAllDeepDives()
  const now = new Date()

  const staticRoutes = ['', '/writing', '/deep-dives', '/about', '/cv'].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
    }),
  )

  const postRoutes = posts.map((post) => ({
    url: `${site.url}/writing/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  const tagRoutes = tags.map((tag) => ({
    url: `${site.url}/tags/${tag.slug}`,
    lastModified: now,
  }))

  const diveRoutes = dives.map((dive) => ({
    url: `${site.url}/deep-dives/${dive.slug}`,
    lastModified: new Date(dive.updatedAt),
  }))

  const lessonRoutes = dives.flatMap((dive) =>
    dive.lessons.map((lesson) => ({
      url: `${site.url}/deep-dives/${dive.slug}/${lesson.slug}`,
      lastModified: new Date(lesson.date),
    })),
  )

  return [
    ...staticRoutes,
    ...postRoutes,
    ...tagRoutes,
    ...diveRoutes,
    ...lessonRoutes,
  ]
}
