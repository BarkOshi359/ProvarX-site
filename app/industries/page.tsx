import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { industries } from '@/lib/industries'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'FSMA 204 Compliance Software by Industry | Provarx',
  description: 'Purpose-built FSMA 204 compliance for meat processing, beverage manufacturing, dairy, nutraceutical, frozen foods, and co-packers. Built for how your facility actually works.',
  canonical: 'https://getprovarx.com/industries',
  keywords: ['FSMA 204 compliance software', 'food manufacturing compliance', 'food safety software by industry'],
})

export default function IndustriesIndexPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[#0A2540] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-4">
            Industries
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            FSMA 204 compliance software by industry — built for how your facility actually works
          </h1>
          <p className="text-white/70 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Food safety regulations aren&apos;t one-size-fits-all. Provarx is purpose-built for the specific
            regulations, terminology, and operational challenges of your manufacturing vertical.
          </p>
        </div>
      </section>

      {/* Industry Grid */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:border-[#00C9A7] hover:shadow-md transition-all group"
              >
                <h2 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-[#00C9A7] transition-colors">
                  {industry.name}
                </h2>
                <p className="text-[#64748B] text-sm leading-relaxed mb-5">
                  {industry.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {industry.regulations.slice(0, 3).map((reg) => (
                    <span
                      key={reg.code}
                      className="text-xs bg-[#0A2540]/5 text-[#0A2540] px-2.5 py-1 rounded-full font-medium"
                    >
                      {reg.name}
                    </span>
                  ))}
                  {industry.regulations.length > 3 && (
                    <span className="text-xs text-[#64748B] px-2.5 py-1">
                      +{industry.regulations.length - 3} more
                    </span>
                  )}
                </div>
                <span className="text-[#00C9A7] text-sm font-semibold flex items-center gap-1">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0A2540] text-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Don&apos;t see your vertical?</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Provarx is built for any regulated food and beverage manufacturer under FSMA 204.
            Talk to us about your specific compliance environment.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#00C9A7] text-[#0A2540] font-bold px-10 py-4 rounded-md hover:bg-[#00b396] transition-colors"
          >
            Talk to Us →
          </Link>
        </div>
      </section>
    </>
  )
}
