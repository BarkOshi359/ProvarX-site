import Link from "next/link";

function ShieldCheckIcon() {
  return (
    <svg className="w-10 h-10 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function MagnifyingGlassIcon() {
  return (
    <svg className="w-10 h-10 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
    </svg>
  );
}

function ChartBarIcon() {
  return (
    <svg className="w-10 h-10 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function CheckBadgeIcon() {
  return (
    <svg className="w-8 h-8 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.723 3.066 3.745 3.745 0 01-3.066.723A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.066-.723 3.745 3.745 0 01-.723-3.066A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 01.723-3.066 3.745 3.745 0 013.066-.723A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.066.723 3.745 3.745 0 01.723 3.066A3.745 3.745 0 0121 12z" />
    </svg>
  );
}

function CpuChipIcon() {
  return (
    <svg className="w-8 h-8 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg className="w-8 h-8 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-8 h-8 text-[#4A90D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="bg-[#1B2D4F] text-white py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Every Record. Proven. Permanent.
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            Provarx gives food and beverage manufacturers tamper-proof compliance records and
            real-time process intelligence — so an FDA audit is never a surprise.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#4A90D9] text-white text-lg font-semibold px-10 py-4 rounded-md hover:bg-[#3a7bc4] transition-colors"
          >
            Talk to Us →
          </Link>
          <p className="mt-6 text-xs uppercase tracking-widest text-white/40 font-medium">
            Built for FSMA 204. Designed by a Six Sigma Black Belt.
          </p>
        </div>
      </section>

      {/* SECTION 2 — PROBLEM */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-4">
            The Reality of Compliance Today
          </p>
          <h2 className="text-4xl font-bold text-[#1B2D4F] text-center mb-14">
            Your current system has three problems.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Your records can be altered.",
                body: "Paper logs get backdated. Spreadsheets get edited. When an FDA investigator asks you to prove a CCP check happened at 2pm on a Tuesday three months ago, a handwritten logbook isn't enough anymore.",
              },
              {
                title: "Your recalls take too long.",
                body: "The average food recall trace takes days. During that time, contaminated product keeps moving. Every hour you spend searching binders and calling suppliers is an hour of exposure — legal, financial, and reputational.",
              },
              {
                title: "Your compliance data isn't working for you.",
                body: "Logging CCP checks tells you whether you passed today. It doesn't tell you that Line 3's cook temperature has been drifting for six shifts and is two deviations from a violation. That's the data you actually need.",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-1.5 bg-[#1B2D4F]" />
                <div className="p-8">
                  <h3 className="text-lg font-bold text-[#1B2D4F] mb-4">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — SOLUTION */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-4">
            How Provarx Works
          </p>
          <h2 className="text-4xl font-bold text-[#1B2D4F] text-center mb-4">
            One platform. Complete protection.
          </h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed">
            Provarx combines tamper-proof compliance records with Six Sigma process intelligence —
            purpose-built for mid-market food and beverage manufacturers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <ShieldCheckIcon />,
                title: "Immutable Records",
                body: "Every CCP check, SOP sign-off, and corrective action is timestamped and cryptographically sealed the moment it's submitted. Nobody changes it after the fact. Not your staff. Not us. The record is permanent.",
              },
              {
                icon: <MagnifyingGlassIcon />,
                title: "Recall Trace in Seconds",
                body: "Enter any ingredient lot code or product batch number. Provarx instantly surfaces every batch it touched, every shift it ran, and every distribution destination on record. What used to take days takes seconds.",
              },
              {
                icon: <ChartBarIcon />,
                title: "Process Intelligence Built In",
                body: "SPC control charts and Cpk scoring run automatically against your compliance data. Provarx flags process drift before it becomes a deviation — giving your QA team the signal they need before the FDA finds it first.",
              },
            ].map((feature) => (
              <div key={feature.title} className="flex flex-col gap-5">
                <div>{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#1B2D4F]">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-4">
            Getting Started
          </p>
          <h2 className="text-4xl font-bold text-[#1B2D4F] text-center mb-16">
            Up and running in days. Not months.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Configure your facility",
                body: "Set up your product lines, build your HACCP templates, define your CCPs and acceptable ranges. Your QA Manager does this once. Takes a few hours. No IT team required.",
              },
              {
                step: "02",
                title: "Your team starts logging",
                body: "Floor workers log CCP checks on any device — phone, tablet, or desktop — in under 30 seconds. The interface is built for the production floor, not a conference room.",
              },
              {
                step: "03",
                title: "Audit-ready from day one",
                body: "Every record is immediately timestamped, digitally signed, and blockchain-verified. When an auditor walks in, your complete compliance history is one click away — formatted, organized, and legally defensible.",
              },
            ].map((step) => (
              <div key={step.step} className="flex flex-col gap-4">
                <div className="text-7xl font-light text-[#4A90D9] leading-none">{step.step}</div>
                <h3 className="text-xl font-bold text-[#1B2D4F]">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — TRUST SIGNALS */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1B2D4F] text-center mb-14">
            Built on what regulators actually require.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {[
              {
                icon: <CheckBadgeIcon />,
                title: "FSMA 204 Aligned",
                body: "Records structured around FDA Critical Tracking Events and Key Data Elements.",
              },
              {
                icon: <CpuChipIcon />,
                title: "Six Sigma Black Belt Designed",
                body: "SPC methodology built into every data point your facility generates.",
              },
              {
                icon: <LinkIcon />,
                title: "Blockchain Verified",
                body: "Every record carries a cryptographic proof of integrity on the Polygon network.",
              },
              {
                icon: <ClockIcon />,
                title: "24-Hour FDA Compliance",
                body: "Records retrievable and exportable within the FDA's required response window.",
              },
            ].map((signal) => (
              <div key={signal.title} className="flex flex-col gap-4">
                <div>{signal.icon}</div>
                <h3 className="font-bold text-[#1B2D4F] text-base">{signal.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{signal.body}</p>
              </div>
            ))}
          </div>

          {/* FDA Quote Block */}
          <div className="border border-gray-300 rounded-lg p-10 max-w-3xl mx-auto text-center">
            <p className="text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-6">
              Directly from FSMA Rule 204:
            </p>
            <blockquote className="text-[#1B2D4F] italic text-base leading-relaxed mb-5">
              &ldquo;Persons must provide records to FDA within 24 hours of a request during an outbreak
              investigation or within a reasonable time in other circumstances.&rdquo;
            </blockquote>
            <p className="text-gray-400 text-xs">
              — FDA Food Traceability Final Rule, 21 CFR Part 1, Subpart S
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <section className="bg-[#1B2D4F] text-white py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
            Ready to make your next FDA audit the easiest one you&apos;ve ever had?
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10">
            We work directly with QA Managers, Food Safety Directors, and Plant Owners at mid-market
            food and beverage facilities. No enterprise contracts. No six-month implementations. Just
            a platform that works the way your facility works.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#4A90D9] text-white text-lg font-semibold px-10 py-4 rounded-md hover:bg-[#3a7bc4] transition-colors"
          >
            Talk to Us →
          </Link>
          <p className="mt-6 text-xs text-white/40">
            A real conversation with a real person who has stood on a production floor.
          </p>
        </div>
      </section>
    </>
  );
}
