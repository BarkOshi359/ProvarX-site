'use client'

import Link from 'next/link'
import { blogPosts } from '@/lib/blog-posts'
import { Clock, ArrowRight } from 'lucide-react'

// Metadata is exported from app/blog/layout.tsx (required for 'use client' pages)

const categoryColors: Record<string, { bg: string; text: string }> = {
  'FSMA 204': { bg: 'bg-teal-100', text: 'text-teal-700' },
  'Traceability': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Food Safety': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Audit Readiness': { bg: 'bg-purple-100', text: 'text-purple-700' },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogIndexPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#0A2540] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-4">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The Provarx compliance blog — FSMA, food safety, and process intelligence
          </h1>
          {/* Author block */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-10 h-10 rounded-full bg-[#00C9A7] flex items-center justify-center flex-shrink-0">
              <span className="text-[#0A2540] font-bold text-sm">C</span>
            </div>
            <div className="text-left">
              <p className="text-white font-semibold text-sm">Clinton Wells</p>
              <p className="text-white/50 text-xs">Founder, Provarx · Six Sigma Black Belt · OSHA 30 · 10+ years regulated manufacturing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-[#F8FAFC] py-16 px-6 min-h-[50vh]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => {
              const colors = categoryColors[post.category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' }
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-7 flex flex-col hover:border-[#00C9A7] hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#64748B]">
                      <Clock size={11} /> {post.readTime} min read
                    </span>
                  </div>
                  <h2 className="font-bold text-[#0A2540] text-base leading-snug mb-3 group-hover:text-[#00C9A7] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-[#64748B]">{formatDate(post.publishedAt)}</span>
                    <span className="text-[#00C9A7] text-sm font-semibold flex items-center gap-1">
                      Read more <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
