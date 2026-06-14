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
      images: [seo.ogImage ?? '/og-default.png'],
    },
  }
}

const BASE = 'https://getprovarx.com'

/** Build FAQPage JSON-LD from a list of question/answer pairs. */
export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** Build BreadcrumbList JSON-LD. Pass site-relative paths (e.g. "/blog"); the base URL is prepended. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${BASE}${it.path}`,
    })),
  }
}
