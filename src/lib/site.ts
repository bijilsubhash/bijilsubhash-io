export const site = {
  name: 'Bijil Subhash',
  title: 'Bijil Subhash',
  description:
    'Data engineer writing about the modern data stack — dbt, dlt, BigQuery, Python, and data architecture.',
  url: 'https://bijilsubhash.io',
  location: 'Sydney',
  email: 'bijil@nimblestax.com',
  socials: {
    github: 'https://github.com/bijilsubhash',
    linkedin: 'https://www.linkedin.com/in/bijilsubhash/',
  },
} as const

export const nav = [
  { href: '/writing', label: 'writing' },
  { href: '/about', label: 'about' },
  { href: '/cv', label: 'cv' },
] as const
