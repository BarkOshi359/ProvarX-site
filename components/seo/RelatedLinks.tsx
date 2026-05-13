import Link from 'next/link'
import { ArrowRight, Building2, Wrench, BookOpen } from 'lucide-react'

interface RelatedLink {
  title: string
  href: string
  description: string
  type: 'industry' | 'tool' | 'blog'
}

interface RelatedLinksProps {
  links: RelatedLink[]
}

const typeConfig = {
  industry: {
    label: 'Industry',
    icon: Building2,
    color: 'text-[#00C9A7]',
    bg: 'bg-[#00C9A7]/10',
  },
  tool: {
    label: 'Free Tool',
    icon: Wrench,
    color: 'text-[#F59E0B]',
    bg: 'bg-[#F59E0B]/10',
  },
  blog: {
    label: 'Article',
    icon: BookOpen,
    color: 'text-[#64748B]',
    bg: 'bg-[#64748B]/10',
  },
}

export default function RelatedLinks({ links }: RelatedLinksProps) {
  return (
    <section className="bg-[#F8FAFC] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-3">
          Related Resources
        </p>
        <h2 className="text-2xl font-bold text-[#0A2540] mb-8">
          Keep exploring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link) => {
            const config = typeConfig[link.type]
            const Icon = config.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#00C9A7] hover:shadow-sm transition-all group"
              >
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-4 ${config.bg} ${config.color}`}>
                  <Icon size={12} />
                  {config.label}
                </div>
                <h3 className="font-bold text-[#0A2540] mb-2 leading-snug group-hover:text-[#00C9A7] transition-colors">
                  {link.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                  {link.description}
                </p>
                <span className="text-[#00C9A7] text-sm font-semibold flex items-center gap-1">
                  Read more <ArrowRight size={14} />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
