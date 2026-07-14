import { MetadataRoute } from 'next'
import { industries } from '@/lib/industries'
import { blogPosts } from '@/lib/blog-posts'

const BASE = 'https://getprovarx.com'

// Stable last-modified date for evergreen pages. Bump when their content materially changes
// (blog posts derive their own date from publishedAt below).
const LAST_UPDATED = new Date('2026-05-13')

const toolSlugs = [
  'fsma-gap-assessment',
  'recall-trace-simulator',
  'cpk-calculator',
  'fsma-deadline-tracker',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/product`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/why-provarx`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/pricing`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/industries`, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/tools`, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/privacy`, lastModified: LAST_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const industryPages: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${BASE}/industries/${i.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${BASE}/tools/${slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...staticPages, ...industryPages, ...toolPages, ...blogPages]
}
