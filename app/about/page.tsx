function TechBlock({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-8 bg-white">
      <div className="w-8 h-0.5 bg-[#4A90D9] mb-5" />
      <h3 className="font-bold text-[#1B2D4F] text-lg mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[#1B2D4F] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-4">
            About
          </p>
          <h1 className="text-5xl font-bold mb-6">
            Built by someone who lived the problem.
          </h1>
          <p className="text-white/70 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Provarx exists because mid-market food manufacturers deserve the same protection as
            the largest companies in the industry.
          </p>
        </div>
      </section>

      {/* Section 1 — The Mission */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-4">
            The Mission
          </p>
          <h2 className="text-3xl font-bold text-[#1B2D4F] mb-8">
            Closing the compliance gap.
          </h2>
          <div className="flex flex-col gap-6 text-gray-600 leading-relaxed text-lg">
            <p>
              The mid-market food and beverage industry has been underserved by compliance
              technology. Facilities with 50 to 500 employees face the same FDA requirements as
              enterprise manufacturers — but without the IT teams, implementation budgets, or
              dedicated compliance staff.
            </p>
            <p>
              Provarx exists to close that gap — giving every mid-market facility access to
              enterprise-grade protection at a price and complexity level that actually makes sense.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — The Founder */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-4">
            The Founder
          </p>
          <h2 className="text-3xl font-bold text-[#1B2D4F] mb-8">
            Clinton
          </h2>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Placeholder portrait card */}
            <div className="flex-shrink-0 w-full md:w-48">
              <div className="w-48 h-48 bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#1B2D4F]/10" />
                <span className="text-xs text-gray-400 uppercase tracking-wider">Clinton</span>
                <span className="text-xs text-gray-400">Founder</span>
              </div>
            </div>

            <div className="flex flex-col gap-6 text-gray-600 leading-relaxed">
              <p>
                Provarx was founded by Clinton, a Facilities and Operations Manager with over 10
                years in regulated manufacturing environments. A Six Sigma Black Belt certified
                through Purdue University and OSHA 30 certified, Clinton has worked directly in the
                facilities and alongside the QA teams that Provarx is built to serve.
              </p>
              <p>
                He knows what a 2am equipment failure looks like. He knows what an FDA auditor asks
                for first. He built Provarx because he lived the problem.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                {[
                  { label: "Certification", value: "Six Sigma Black Belt" },
                  { label: "Institution", value: "Purdue University" },
                  { label: "Safety", value: "OSHA 30 Certified" },
                ].map((item) => (
                  <div key={item.label} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <p className="text-[#4A90D9] text-xs uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-[#1B2D4F] font-semibold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Built on Proven Technology */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-4">
            The Technology
          </p>
          <h2 className="text-3xl font-bold text-[#1B2D4F] mb-4">
            Built on proven foundations.
          </h2>
          <p className="text-gray-500 mb-12 leading-relaxed">
            Every design decision in Provarx is grounded in actual regulatory requirements and
            proven methodology — not best guesses.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TechBlock
              title="Polygon Blockchain"
              body="Tamper-proof record integrity. Every compliance record generates a cryptographic hash anchored to the Polygon network — making alteration mathematically impossible and independently verifiable."
            />
            <TechBlock
              title="FSMA 204 Framework"
              body="Built around actual FDA requirements. Provarx structures records around Critical Tracking Events and Key Data Elements as defined in the Food Traceability Final Rule — not a generic interpretation."
            />
            <TechBlock
              title="Six Sigma Methodology"
              body="Black Belt-designed SPC engine. Statistical Process Control runs automatically against every data point your facility generates, surfacing process capability scores and early drift signals in real time."
            />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#1B2D4F] text-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Talk to the founder directly.</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            No sales team. No account executive. A real conversation with the person who built
            Provarx and has stood on a production floor.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#4A90D9] text-white font-semibold px-10 py-4 rounded-md hover:bg-[#3a7bc4] transition-colors"
          >
            Talk to Us →
          </a>
        </div>
      </section>
    </>
  );
}
