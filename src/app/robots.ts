import type { MetadataRoute } from 'next'
import { isGateEnabled } from '@/lib/deep-dives-gate'
import { site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Keep the unlock page out of the index, and the whole section while it is
  // gated. Both flip on the next deploy after DEEP_DIVES_PASSWORD changes.
  const disallow = ['/unlock', ...(isGateEnabled() ? ['/deep-dives'] : [])]

  return {
    rules: { userAgent: '*', allow: '/', disallow },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
