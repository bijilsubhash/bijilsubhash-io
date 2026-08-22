import type { MetadataRoute } from 'next'
import { getAllPosts, getAllTags } from '@/lib/posts'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const tags = getAllTags()
  const now = new Date()

  const staticRoutes = ['', '/writing', '/about', '/cv'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
  }))

  const postRoutes = posts.map((post) => ({
    url: `${site.url}/writing/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  const tagRoutes = tags.map((tag) => ({
    url: `${site.url}/tags/${tag.slug}`,
    lastModified: now,
  }))

  return [...staticRoutes, ...postRoutes, ...tagRoutes]
}
