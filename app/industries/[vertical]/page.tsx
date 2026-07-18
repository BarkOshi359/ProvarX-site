import { notFound } from 'next/navigation'
import { industries, getIndustryBySlug } from '@/lib/industries'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'
import CTABanner from '@/components/seo/CTABanner'
import RelatedLinks from '@/components/seo/RelatedLinks'
import {
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'

interface Props {
  params: Promise<{ vertical: string }>
}

export async function generateStaticParams() {
  return industries.map((i) => ({ vertical: i.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { vertical } = await params
  const industry = getIndustryBySlug(vertical)
  if (!industry) return {}
  return buildMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    canonical: `https://getprovarx.com/industries/${industry.slug}`,
    keywords: industry.keywords,
  })
}

const toolMeta: Record<string, { title: string; description: string }> = {
  'fsma-gap-assessment': {
    title: 'Free FSMA 204 Gap Assessment',
    description: 'Score your facility\'s FSMA 204 readiness across 10 critical compliance dimensions.',
  },
  'recall-trace-simulator': {
    title: 'Recall Trace Simulator',
    description: 'Walk through an FDA recall trace event and see exactly what 24-hour compliance looks like.',
  },
  'cpk-calculator': {
    title: 'Free Cpk Calculator',
    description: 'Calculate process capability, sigma level, and DPMO for any production parameter.',
  },
  'fsma-deadline-tracker': {
    title: 'FSMA 204 Deadline Tracker',
    description: 'Live countdown to your compliance deadline with a 12-point readiness checklist.',
  },
}

const postMeta: Record<string, { title: string; description: string }> = {
  'fsma-204-compliance-guide-food-manufacturers': {
    title: 'The Complete FSMA 204 Compliance Guide',
    description: 'Everything mid-market food manufacturers need to know about the Food Traceability Rule.',
  },
  'what-is-kde-fsma-204-key-data-elements': {
    title: 'What Is a KDE? FSMA 204 Explained',
    description: 'Exactly what FDA requires for Key Data Elements at each Critical Tracking Event.',
  },
  'blockchain-batch-records-tamper-proof-food-manufacturing': {
    title: 'How Blockchain Makes Batch Records Tamper-Proof',
    description: 'Why blockchain-verified records change the compliance equation for food manufacturers.',
  },
}

// JSON-LD schema
function SoftwareApplicationSchema({ industry }: { industry: ReturnType<typeof getIndustryBySlug> }) {
  if (!industry) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Provarx',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: industry.metaDescription,
    url: `https://getprovarx.com/industries/${industry.slug}`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '499',
      highPrice: '999',
      offerCount: '3',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function IndustryPage({ params }: Props) {
  const { vertical } = await params
  const industry = getIndustryBySlug(vertical)
  if (!industry) notFound()

  const toolInfo = toolMeta[industry.relatedTool]
  const postInfo = postMeta[industry.relatedPost]

  const relatedLinks = [
    {
      title: toolInfo?.title ?? 'Free FSMA Gap Assessment',
      href: `/tools/${industry.relatedTool}`,
      description: toolInfo?.description ?? 'Score your facility\'s FSMA 204 readiness.',
      type: 'tool' as const,
    },
    {
      title: postInfo?.title ?? 'FSMA 204 Compliance Guide',
      href: `/blog/${industry.relatedPost}`,
      description: postInfo?.description ?? 'The complete guide to FSMA 204 for food manufacturers.',
      type: 'blog' as const,
    },
    {
      title: 'All Industry Guides',
      href: '/industries',
      description: 'See how Provarx addresses the specific regulations for every food manufacturing vertical.',
      type: 'industry' as const,
    },
  ]

  return (
    <>
      <SoftwareApplicationSchema industry={industry} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Industries', path: '/industries' },
              { name: industry.name, path: `/industries/${industry.slug}` },
            ])
          ),
        }}
      />

      {/* Section 1 — Hero */}
      <section className="bg-[#0A2540] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-4">
            {industry.name}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {industry.headline}
          </h1>
          <p className="text-white/70 text-xl font-light max-w-2xl mx-auto leading-relaxed mb-8">
            {industry.subheadline}
          </p>

          {/* Hero stat */}
          <div className="inline-block mb-10 bg-white/5 border border-white/10 rounded-xl px-8 py-5">
            <div className="text-5xl font-bold text-[#00C9A7] mb-1">{industry.heroStat.value}</div>
            <div className="text-white/60 text-sm">{industry.heroStat.label}</div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a
              href="/contact"
              className="inline-block bg-[#00C9A7] text-[#0A2540] font-bold px-10 py-4 rounded-md hover:bg-[#00b396] transition-colors"
            >
              Join the pilot
            </a>
            <a
              href="/contact"
              className="inline-block border border-white/30 text-white font-semibold px-10 py-4 rounded-md hover:border-white/60 hover:bg-white/5 transition-colors"
            >
              See a demo
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/40 text-xs font-medium tracking-wide">
            {['FDA 21 CFR Part 11', 'Blockchain-verified', 'FSMA 204 Ready'].map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#00C9A7]" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — Regulation strip */}
      <section className="bg-[#0A2540] border-t border-white/10 py-6 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-4 text-center">
            Regulations this page addresses
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {industry.regulations.map((reg) => (
              <span
                key={reg.code}
                className="bg-[#00C9A7]/10 text-[#00C9A7] border border-[#00C9A7]/20 rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap"
              >
                {reg.name} · {reg.code}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Pain points */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-4">
            The Problem
          </p>
          <h2 className="text-3xl font-bold text-[#0A2540] mb-12">
            Why compliance fails in {industry.name.toLowerCase()} facilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industry.painPoints.map((point) => (
              <div
                key={point.title}
                className="bg-white border border-gray-200 rounded-lg p-7 border-l-4 border-l-[#F59E0B]"
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle size={18} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-[#0A2540] text-base">{point.title}</h3>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed pl-7">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — How Provarx solves it */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-4">
            The Solution
          </p>
          <h2 className="text-3xl font-bold text-[#0A2540] mb-12">
            How Provarx solves it
          </h2>
          <div className="flex flex-col gap-16">
            {industry.howProvarxHelps.map((item, i) => (
              <div
                key={item.title}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 items-center`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 size={20} className="text-[#00C9A7] flex-shrink-0" />
                    <h3 className="font-bold text-[#0A2540] text-xl">{item.title}</h3>
                  </div>
                  <p className="text-[#64748B] leading-relaxed mb-6">{item.description}</p>
                </div>
                <div className="flex-shrink-0 w-full md:w-72">
                  <div className="bg-[#F8FAFC] border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-[#FFF7ED] border-b border-[#FED7AA] px-5 py-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                      <span className="text-xs font-semibold text-[#92400E] uppercase tracking-wider">Before Provarx</span>
                    </div>
                    <div className="px-5 py-4 text-sm text-[#64748B] leading-relaxed">
                      {item.before}
                    </div>
                    <div className="bg-[#F0FDF9] border-t border-b border-[#A7F3D0] px-5 py-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00C9A7]" />
                      <span className="text-xs font-semibold text-[#065F46] uppercase tracking-wider">After Provarx</span>
                    </div>
                    <div className="px-5 py-4 text-sm text-[#0A2540] font-medium leading-relaxed">
                      {item.after}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Social proof placeholder */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-4 text-center">
            Results
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
            <div className="w-10 h-0.5 bg-[#00C9A7] mx-auto mb-6" />
            <blockquote className="text-xl text-[#0A2540] font-medium italic leading-relaxed mb-6 max-w-2xl mx-auto">
              &ldquo;I built Provarx because I lived the problem. I&apos;ve stood on production
              floors, prepped for FDA audits at 6am, and watched facilities scramble to
              reconstruct records that should have been one click away.&rdquo;
            </blockquote>
            <p className="text-[#64748B] text-sm">
              Clinton — Founder, Provarx · Six Sigma Black Belt · OSHA 30 · 10+ years regulated manufacturing
            </p>
          </div>
        </div>
      </section>

      {/* Section 6 — Related links */}
      <RelatedLinks links={relatedLinks} />

      {/* Section 7 — CTA */}
      <CTABanner
        headline={`Ready to make your ${industry.name.toLowerCase()} operation audit-proof?`}
        subtext="No enterprise contracts. No six-month implementations. A platform built for the specific regulations your facility operates under — and the audits you actually face."
        primaryCTA={{ label: 'Join the pilot', href: '/contact' }}
        secondaryCTA={{ label: 'See a demo', href: '/contact' }}
      />
    </>
  )
}
