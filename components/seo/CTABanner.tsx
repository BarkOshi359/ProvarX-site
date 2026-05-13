import Link from 'next/link'

interface CTALink {
  label: string
  href: string
}

interface CTABannerProps {
  headline: string
  subtext: string
  primaryCTA: CTALink
  secondaryCTA?: CTALink
}

export default function CTABanner({ headline, subtext, primaryCTA, secondaryCTA }: CTABannerProps) {
  return (
    <section className="bg-[#0A2540] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          {headline}
        </h2>
        <p className="text-white/70 text-lg mb-10 leading-relaxed">
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={primaryCTA.href}
            className="inline-block bg-[#00C9A7] text-[#0A2540] font-bold px-10 py-4 rounded-md hover:bg-[#00b396] transition-colors text-base"
          >
            {primaryCTA.label}
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="inline-block border border-white/30 text-white font-semibold px-10 py-4 rounded-md hover:border-white/60 hover:bg-white/5 transition-colors text-base"
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
