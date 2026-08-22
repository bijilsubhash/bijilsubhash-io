/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Old Hugo URLs -> new structure. See docs/adr/0002-writing-urls-with-redirects-from-blog.md
  async redirects() {
    return [
      // Blog archive + its Hugo aliases
      { source: '/blog', destination: '/writing', permanent: true },
      { source: '/articles', destination: '/writing', permanent: true },
      { source: '/showcase', destination: '/writing', permanent: true },
      { source: '/docs', destination: '/writing', permanent: true },
      // Individual posts
      { source: '/blog/:slug*', destination: '/writing/:slug*', permanent: true },
      // Bare-slug post aliases that resolved at the root under Hugo
      {
        source: '/exploring-dlt-for-data-ingestion',
        destination: '/writing/exploring-dlt-for-data-ingestion',
        permanent: true,
      },
      {
        source: '/evolution-of-data-lakehouse-architecture',
        destination: '/writing/evolution-of-data-lakehouse-architecture',
        permanent: true,
      },
      // About aliases
      { source: '/about-me', destination: '/about', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact', destination: '/about', permanent: true },
    ]
  },
}

export default nextConfig
