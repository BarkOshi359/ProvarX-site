import Link from 'next/link'
import { ArrowRight, ClipboardList, Play, Calculator, Clock } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Free FSMA 204 Compliance Tools for Food & Beverage Manufacturers | Provarx',
  description: 'Free FSMA 204 gap assessment, recall trace simulator, Cpk calculator, and deadline tracker — built by compliance professionals, no signup required.',
  canonical: 'https://getprovarx.com/tools',
  keywords: ['FSMA 204 tools', 'food safety compliance tools', 'free FSMA gap assessment'],
})

const tools = [
  {
    name: 'FSMA 204 Gap Assessment',
    href: '/tools/fsma-gap-assessment',
    description: '10-question interactive checklist that scores your facility\'s FSMA 204 readiness across every critical compliance dimension. Get a personalized gap report in 5 minutes.',
    icon: ClipboardList,
    time: '5 min',
    color: 'text-[#00C9A7]',
    bg: 'bg-[#00C9A7]/10',
  },
  {
    name: 'Recall Trace Simulator',
    href: '/tools/recall-trace-simulator',
    description: 'Walk through a real FDA recall trace event step-by-step. Enter your product details and see exactly what a 24-hour FSMA 204 trace requires — and where paper systems fail.',
    icon: Play,
    time: '3 min',
    color: 'text-[#F59E0B]',
    bg: 'bg-[#F59E0B]/10',
  },
  {
    name: 'Cpk / Process Capability Calculator',
    href: '/tools/cpk-calculator',
    description: 'Enter USL, LSL, process mean, and standard deviation to get real-time Cpk, sigma level, DPMO, and a bell curve visualization. Built for food manufacturing QA teams.',
    icon: Calculator,
    time: '2 min',
    color: 'text-[#64748B]',
    bg: 'bg-[#64748B]/10',
  },
  {
    name: 'FSMA 204 Deadline Tracker',
    href: '/tools/fsma-deadline-tracker',
    description: 'Live countdown to your FSMA 204 compliance deadline by facility size, with a 12-item readiness checklist and downloadable implementation guide.',
    icon: Clock,
    time: '2 min',
    color: 'text-[#0A2540]',
    bg: 'bg-[#0A2540]/10',
  },
]

export default function ToolsIndexPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#0A2540] text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-4">
            Free Tools
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Free FSMA 204 compliance tools for food and beverage manufacturers
          </h1>
          <p className="text-white/70 text-xl font-light leading-relaxed">
            Built by compliance professionals who&apos;ve been in your facility. No signup required.
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <div key={tool.href} className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${tool.bg}`}>
                  <Icon size={22} className={tool.color} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="font-bold text-[#0A2540] text-lg">{tool.name}</h2>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed mb-5 flex-1">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#64748B] bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                    Free · No signup · {tool.time}
                  </span>
                  <Link
                    href={tool.href}
                    className="flex items-center gap-1.5 text-sm font-bold text-[#00C9A7] hover:gap-2.5 transition-all"
                  >
                    Open tool <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom note */}
      <section className="bg-white py-12 px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#64748B] text-sm leading-relaxed">
            All tools are free, require no account, and are built on the same compliance methodology
            that powers Provarx. If a tool surfaces a gap in your operation,{' '}
            <Link href="/contact" className="text-[#00C9A7] font-semibold hover:underline">
              talk to us about fixing it.
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
