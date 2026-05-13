import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog-posts'
import { buildMetadata } from '@/lib/seo'
import { Clock, ArrowRight, Share2 } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    canonical: `https://getprovarx.com/blog/${post.slug}`,
  })
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  Education: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Pillar: { bg: 'bg-purple-100', text: 'text-purple-700' },
  SEO: { bg: 'bg-green-100', text: 'text-green-700' },
  Trust: { bg: 'bg-amber-100', text: 'text-amber-700' },
}

function ArticleSchema({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Provarx Compliance Team',
      url: 'https://getprovarx.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Provarx',
      url: 'https://getprovarx.com',
      logo: { '@type': 'ImageObject', url: 'https://getprovarx.com/og-default.png' },
    },
    url: `https://getprovarx.com/blog/${post.slug}`,
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.relatedSlugs)
  const colors = categoryColors[post.category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' }
  const shareUrl = `https://getprovarx.com/blog/${post.slug}`
  const shareTitle = encodeURIComponent(post.title)

  return (
    <>
      <ArticleSchema post={post} />

      {/* Header */}
      <section className="bg-[#0A2540] text-white py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
              {post.category}
            </span>
            <span className="text-white/40 text-sm">{formatDate(post.publishedAt)}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-5">{post.title}</h1>
          <div className="flex items-center gap-5 text-white/50 text-sm">
            <span>By Provarx Compliance Team</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.readTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Post content */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <article
            className="prose prose-slate max-w-none prose-headings:text-[#0A2540] prose-headings:font-bold prose-p:text-[#374151] prose-p:leading-relaxed prose-li:text-[#374151] prose-strong:text-[#0A2540] prose-a:text-[#00C9A7]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* In-post CTA (appears naturally after content) */}
          <aside className="my-12 bg-[#F0FDF9] border border-[#A7F3D0] rounded-xl p-7">
            <p className="text-xs text-[#00C9A7] font-semibold uppercase tracking-widest mb-2">From Provarx</p>
            <p className="text-[#0A2540] font-semibold text-lg mb-4">{post.cta.headline}</p>
            <Link
              href={post.cta.href}
              className="inline-flex items-center gap-2 bg-[#00C9A7] text-[#0A2540] font-bold px-6 py-3 rounded-lg hover:bg-[#00b396] transition-colors text-sm"
            >
              Try it free <ArrowRight size={14} />
            </Link>
          </aside>

          {/* Share */}
          <div className="border-t border-gray-100 pt-8 flex items-center gap-4">
            <span className="text-[#64748B] text-sm font-medium">Share:</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-[#0A66C2] hover:underline"
            >
              <Share2 size={16} /> LinkedIn
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-[#1DA1F2] hover:underline"
            >
              <Share2 size={16} /> X / Twitter
            </a>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-[#F8FAFC] py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-4">Related Articles</p>
            <div className="flex flex-col gap-4">
              {related.map((rp) => {
                const rColors = categoryColors[rp.category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' }
                return (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="bg-white border border-gray-200 rounded-xl p-6 flex items-start gap-4 hover:border-[#00C9A7] hover:shadow-sm transition-all group"
                  >
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${rColors.bg} ${rColors.text}`}>
                      {rp.category}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0A2540] text-sm leading-snug group-hover:text-[#00C9A7] transition-colors mb-1">
                        {rp.title}
                      </h3>
                      <p className="text-[#64748B] text-xs">{rp.readTime} min read</p>
                    </div>
                    <ArrowRight size={16} className="text-[#00C9A7] flex-shrink-0 mt-1" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-[#0A2540] text-white py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to close these compliance gaps?</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Every concept in this article is built directly into Provarx.
            See how the platform works for your specific facility.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#00C9A7] text-[#0A2540] font-bold px-10 py-4 rounded-lg hover:bg-[#00b396] transition-colors"
          >
            Talk to Us →
          </Link>
        </div>
      </section>
    </>
  )
}
