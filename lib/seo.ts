export interface PageSEO {
  title: string
  description: string
  canonical: string
  ogImage?: string
  keywords?: string[]
}

export function buildMetadata(seo: PageSEO) {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    alternates: { canonical: seo.canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      siteName: 'Provarx',
      images: [{ url: seo.ogImage ?? '/og-default.png', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: seo.title,
      description: seo.description,
    },
  }
}
