function HighlightBox({ points }: { points: string[] }) {
  return (
    <div className="border-l-4 border-[#4A90D9] bg-white pl-6 py-5 pr-6 rounded-r-lg">
      <ul className="flex flex-col gap-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-base text-[#1B2D4F]" style={{ lineHeight: "1.75" }}>
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4A90D9] flex-shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhyProvarxPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-[#1B2D4F] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-4">
            Why Provarx
          </p>
          <h1 className="text-5xl font-bold mb-6">
            Not the first option. The right one.
          </h1>
          <p className="text-white/70 text-xl font-light max-w-2xl mx-auto" style={{ lineHeight: "1.75" }}>
            There are other ways to handle compliance. Here is why they fall short — and what
            Provarx does differently.
          </p>
        </div>
      </section>

      {/* Section 1 — vs Paper and Spreadsheets */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <hr className="border-t-2 border-[#4A90D9] mb-8 w-12" />
          <h2 className="text-[1.75rem] font-bold text-[#1B2D4F] mb-8">
            vs. Paper and Spreadsheets
          </h2>
          <div className="flex flex-col gap-6 text-gray-600 mb-10" style={{ fontSize: "16px", lineHeight: "1.75" }}>
            <p>
              Paper logs and spreadsheets are not compliance systems — they are compliance
              liabilities. A handwritten logbook has no timestamp verification. A spreadsheet has no
              edit history. Both can be altered after the fact, and neither meets the FDA&apos;s
              requirements under FSMA 204 for tamper-evident recordkeeping.
            </p>
            <p>
              When an FDA investigator asks for records from a specific date, a paper-based system
              puts you in the position of asking them to trust your handwriting. That is not a
              defensible position in an outbreak investigation. And when a recall happens, paper
              traceability means pulling binders, calling suppliers, and manually reconstructing
              lot genealogy — a process that takes days while contaminated product continues to
              move through distribution.
            </p>
            <p>
              Spreadsheets add a false sense of organization. They are easy to use and easy to
              break. Formulas drift. Columns get deleted. Files get saved over. There is no audit
              trail, no access control, and no cryptographic proof that any record is what it
              claims to be.
            </p>
          </div>
          <HighlightBox
            points={[
              "Paper and spreadsheet records can be altered — Provarx records cannot",
              "Manual trace takes days — Provarx recall trace takes seconds",
              "No process intelligence in a logbook — Provarx flags drift before it becomes a violation",
              "No FDA-compliant export format — Provarx generates audit packages in one click",
            ]}
          />
        </div>
      </section>

      {/* Section 2 — vs Enterprise Platforms */}
      <section className="bg-[#F8FAFC] py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <hr className="border-t-2 border-[#4A90D9] mb-8 w-12" />
          <h2 className="text-[1.75rem] font-bold text-[#1B2D4F] mb-8">
            vs. Enterprise Platforms
          </h2>
          <div className="flex flex-col gap-6 text-gray-600 mb-10" style={{ fontSize: "16px", lineHeight: "1.75" }}>
            <p>
              Enterprise food safety platforms exist — and they are built for enterprise companies.
              Six-figure implementation fees. Twelve-month onboarding timelines. Dedicated IT
              resources required for configuration and maintenance. A customer success team that
              treats your facility as a support ticket.
            </p>
            <p>
              Mid-market manufacturers with 50 to 500 employees face the same FDA requirements as
              companies ten times their size — but without the budget, the IT staff, or the
              implementation runway. An enterprise platform does not solve that problem. It
              replicates it at a smaller scale, with all the complexity and none of the support.
            </p>
            <p>
              Provarx is purpose-built for the mid-market. Configuration takes hours, not months.
              Your QA Manager sets it up. Floor workers are logging the same day. There are no
              implementation consultants, no change management programs, and no annual contracts
              that lock you into a system that no longer fits your operation.
            </p>
          </div>
          <HighlightBox
            points={[
              "Enterprise platforms require IT teams — Provarx is configured by your QA Manager",
              "Six-month implementations — Provarx is operational in days",
              "Enterprise pricing built for enterprise budgets — Provarx is priced for mid-market reality",
              "Generic compliance modules — Provarx is purpose-built for food and beverage",
            ]}
          />
        </div>
      </section>

      {/* Section 3 — The Six Sigma Difference */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <hr className="border-t-2 border-[#4A90D9] mb-8 w-12" />
          <h2 className="text-[1.75rem] font-bold text-[#1B2D4F] mb-8">
            The Six Sigma Difference
          </h2>
          <div className="flex flex-col gap-6 text-gray-600 mb-10" style={{ fontSize: "16px", lineHeight: "1.75" }}>
            <p>
              Most compliance platforms are record-keeping systems. They log what happened. They
              do not tell you what is about to happen. That distinction matters when the difference
              between a passed audit and a consent decree is whether you caught a process drift
              before or after an FDA inspection.
            </p>
            <p>
              Provarx was designed by a Six Sigma Black Belt who has worked directly in regulated
              manufacturing environments. That background is not a credential on a marketing page
              — it is the architecture of the platform. Every data point your facility generates
              runs through Statistical Process Control methodology. Control limits are calculated
              from your actual process data. Cpk scores are updated in real time. The system tells
              you when a process is drifting toward a violation before it crosses the line.
            </p>
            <p>
              This is the capability that food manufacturers pay Six Sigma consultants tens of
              thousands of dollars per engagement to deliver. Provarx builds it into your daily
              compliance workflow automatically — no consultant, no engagement, no additional cost.
            </p>
          </div>
          <HighlightBox
            points={[
              "SPC control charts generated automatically from your compliance data",
              "Cpk scoring surfaces process capability — not just pass/fail status",
              "Early warning signals before drift becomes a deviation",
              "Six Sigma methodology embedded in the platform — not sold as a separate service",
            ]}
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#1B2D4F] text-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to see the difference for your facility?
          </h2>
          <p className="text-white/70 mb-8" style={{ lineHeight: "1.75" }}>
            A direct conversation about your compliance challenges — no sales deck, no pressure.
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
