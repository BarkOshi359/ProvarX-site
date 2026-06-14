import { buildMetadata, faqPageSchema } from '@/lib/seo'
import { CheckCircle2, XCircle } from 'lucide-react'

export const metadata = buildMetadata({
  title: 'Pricing — Provarx Compliance Software for Mid-Market Food Manufacturers',
  description: 'Provarx is priced for mid-market food manufacturers — not enterprise budgets. One plan, all features, no implementation fees, no annual lock-in.',
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
  'SOC 2 Type II infrastructure',
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
    a: 'Pricing is based on your facility size and production volume — not seat count. We price for mid-market operations, not enterprise budgets. Schedule a call and we\'ll give you an exact number for your specific facility.',
  },
]

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }}
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
            One plan. Every feature. No six-figure implementation. No enterprise contract.
            Priced based on your facility size — not your seat count.
          </p>
        </div>
      </section>

      {/* Pricing card + What you get */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Contact card */}
          <div className="bg-white border border-gray-200 rounded-xl p-10 shadow-sm">
            <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-3">
              One Plan
            </p>
            <h2 className="text-3xl font-bold text-[#0A2540] mb-2">Everything included.</h2>
            <p className="text-[#64748B] mb-8 leading-relaxed">
              Pricing is based on your facility size and annual production volume. No per-seat fees.
              No add-on modules. No surprises.
            </p>
            <a
              href="https://calendar.app.google/agEvxXjDA1SavteP6"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-[#00C9A7] text-[#0A2540] font-bold px-8 py-4 rounded-md hover:bg-[#00b396] transition-colors mb-4"
            >
              Get your facility&apos;s price →
            </a>
            <a
              href="/contact"
              className="block text-center border border-gray-200 text-[#64748B] font-semibold px-8 py-4 rounded-md hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Ask us a question
            </a>
            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap gap-x-6 gap-y-2 text-[#64748B] text-xs font-medium">
              {['No annual contract', 'Month-to-month', 'SOC 2 Type II', 'FDA 21 CFR Part 11'].map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#00C9A7]" />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Feature list */}
          <div>
            <p className="text-[#64748B] text-sm font-semibold uppercase tracking-wide mb-5">
              Everything in the plan
            </p>
            <ul className="flex flex-col gap-3">
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
