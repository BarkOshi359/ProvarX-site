import { buildMetadata, faqPageSchema } from '@/lib/seo'
import { CheckCircle2, XCircle } from 'lucide-react'

export const metadata = buildMetadata({
  title: 'Pricing — Provarx Compliance Software for Mid-Market Food Manufacturers',
  description: 'Provarx pricing for food & beverage manufacturers: Starter $499/mo, Growth $999/mo, or custom Scale. Every plan includes the full platform — no feature paywalls.',
  canonical: 'https://getprovarx.com/pricing',
})

const features = [
  'HACCP template builder — unlimited product lines',
  'Mobile CCP logging — any device, 30 seconds per check',
  'SPC control charts with real-time Cpk scoring',
  'Corrective action tracking with full audit trail',
  'Blockchain-verified batch records (Polygon network)',
  'One-click audit export package — formatted for FDA',
  'Recall trace — full lot genealogy in seconds',
  'FSMA 204 traceability records (KDEs at every CTE)',
  'FDA 21 CFR Part 11 compliant electronic signatures',
  'Offline-capable mobile logging with auto-sync',
  'Facility-level compliance score dashboard',
]

const notIncluded = [
  'Six-month onboarding timelines',
  'Implementation consultants',
  'Per-seat licensing that punishes growth',
  'Annual contracts that lock you in',
  'IT department required for configuration',
  'Separate modules sold as add-ons',
]

const faqs = [
  {
    q: 'How long does setup take?',
    a: 'Your QA Manager can configure your HACCP plans, CCPs, and acceptable ranges in a single afternoon. Floor workers are logging the same day. There are no implementation consultants, no change management programs, and no waiting.',
  },
  {
    q: 'Do I need an IT team to run this?',
    a: 'No. Provarx is a web-based SaaS platform that runs in any browser and on any mobile device. Your QA Manager sets it up. IT involvement is optional — not required.',
  },
  {
    q: 'Is there an annual contract?',
    a: 'No annual contracts. Provarx is month-to-month. You stay because it works, not because you\'re locked in.',
  },
  {
    q: 'What does "blockchain-verified" mean for my records?',
    a: 'Every batch record submitted through Provarx is cryptographically hashed and anchored to the Polygon blockchain. This creates tamper-proof, independently verifiable proof that each record was created when the timestamp says it was — meeting and exceeding FDA\'s 21 CFR Part 11 electronic records standards.',
  },
  {
    q: 'How is pricing determined?',
    a: 'Pricing is based on your batch volume and number of facilities — not seat count. We price for mid-market operations, not enterprise budgets. Every plan includes the complete platform; you only pay for the volume you run.',
  },
  {
    q: 'What counts as a batch?',
    a: 'A batch is a single production run logged in Provarx — one CCP-monitored lot of product. Your plan is sized by how many batches your facility logs per day on average, so you only pay for the volume you actually run.',
  },
  {
    q: 'Can I change plans as my facility grows?',
    a: 'Yes. Move between plans at any time as your batch volume changes — there is no lock-in. Annual billing saves 17% versus month-to-month, and multi-facility operations are covered under the Scale plan.',
  },
]

const plans = [
  {
    name: 'Starter',
    price: '$499',
    cadence: '/mo',
    specs: ['Up to 15 batches/day', '1 facility'],
    cta: 'Get started',
    href: '/contact',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$999',
    cadence: '/mo',
    specs: ['Up to 50 batches/day', '1 facility'],
    cta: 'Get started',
    href: '/contact',
    highlight: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    cadence: '',
    specs: ['50+ batches/day', 'or multiple facilities'],
    cta: 'Contact sales',
    href: '/contact',
    highlight: false,
  },
]

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Provarx',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'FSMA 204 compliance and process intelligence platform for mid-market food and beverage manufacturers. Blockchain-verified batch records, SPC analytics, and 24-hour recall trace.',
  url: 'https://getprovarx.com/pricing',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '499',
    highPrice: '999',
    offerCount: '3',
  },
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />

      {/* Hero */}
      <section className="bg-[#0A2540] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-4">
            Pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Built for mid-market. Priced for mid-market.
          </h1>
          <p className="text-white/70 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Every feature in every plan — no six-figure implementation, no enterprise contract.
            Pricing scales with your batch volume and facility count, not your feature access.
          </p>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
              Simple, transparent pricing. Every feature, every plan.
            </h2>
            <p className="text-[#64748B] leading-relaxed">
              Provarx doesn&apos;t lock blockchain verification, SPC analytics, or recall trace behind
              a paywall. Every facility gets the complete platform from day one. Pricing scales with
              your batch volume and facility count — not your feature access.
            </p>
          </div>

          {/* Tier cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-xl p-8 flex flex-col ${
                  plan.highlight ? 'border-2 border-[#00C9A7] shadow-md' : 'border border-gray-200'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00C9A7] text-[#0A2540] text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full whitespace-nowrap">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-[#0A2540] mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-4xl font-bold text-[#0A2540]">{plan.price}</span>
                  {plan.cadence && (
                    <span className="text-[#64748B] text-sm font-medium">{plan.cadence}</span>
                  )}
                </div>
                <ul className="flex flex-col gap-2.5 border-t border-gray-100 pt-5">
                  {plan.specs.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-[#0A2540]">
                      <CheckCircle2 size={15} className="text-[#00C9A7] flex-shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#64748B] mt-4 leading-relaxed">
                  Complete platform · unlimited users · all 8 roles
                </p>
                <a
                  href={plan.href}
                  className={`block text-center font-bold px-6 py-3 rounded-md transition-colors mt-8 ${
                    plan.highlight
                      ? 'bg-[#00C9A7] text-[#0A2540] hover:bg-[#00b396]'
                      : 'bg-[#0A2540] text-white hover:bg-[#13294B]'
                  }`}
                >
                  {plan.cta} →
                </a>
              </div>
            ))}
          </div>

          {/* Sub-note */}
          <p className="text-center text-[#64748B] text-sm mt-10 max-w-2xl mx-auto leading-relaxed">
            All plans include <strong className="text-[#0A2540]">unlimited users</strong>,{' '}
            <strong className="text-[#0A2540]">all 8 roles</strong>, and the complete platform.
            Annual billing saves <strong className="text-[#0A2540]">17%</strong>.
          </p>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[#64748B] text-xs font-medium">
            {['No lock-in', 'Month-to-month', 'FDA 21 CFR Part 11'].map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#00C9A7]" />
                {s}
              </span>
            ))}
          </div>

          {/* Every plan includes the complete platform */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="text-center mb-8">
              <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-3">
                Every plan includes
              </p>
              <h3 className="text-2xl font-bold text-[#0A2540]">The complete platform — from day one</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 max-w-3xl mx-auto">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#00C9A7] flex-shrink-0 mt-0.5" />
                  <span className="text-[#0A2540] text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What you're NOT paying for */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-4">
            The difference
          </p>
          <h2 className="text-3xl font-bold text-[#0A2540] mb-4">
            What you&apos;re NOT paying for.
          </h2>
          <p className="text-[#64748B] mb-10 leading-relaxed max-w-2xl">
            Enterprise compliance platforms charge for complexity. Provarx is built for facilities
            that need compliance protection — not a six-month IT project.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notIncluded.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-[#FFF7ED] border border-[#FED7AA] rounded-lg px-5 py-4">
                <XCircle size={16} className="text-[#F59E0B] flex-shrink-0" />
                <span className="text-[#92400E] text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F8FAFC] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-4">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-[#0A2540] mb-10">
            Common questions
          </h2>
          <div className="flex flex-col gap-8">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-gray-200 pb-8 last:border-0 last:pb-0">
                <h3 className="font-bold text-[#0A2540] text-base mb-3">{faq.q}</h3>
                <p className="text-[#64748B] leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0A2540] text-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to see the number for your facility?
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            A 30-minute call. Your specific product lines, CCPs, and facility size.
            A real price — no vague &ldquo;contact sales&rdquo; runaround.
          </p>
          <a
            href="https://calendar.app.google/agEvxXjDA1SavteP6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#00C9A7] text-[#0A2540] font-bold px-10 py-4 rounded-md hover:bg-[#00b396] transition-colors"
          >
            Book a 30-minute call →
          </a>
        </div>
      </section>
    </>
  )
}
