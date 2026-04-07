export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[#1B2D4F] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-4">
            Contact
          </p>
          <h1 className="text-5xl font-bold mb-6">
            Let&apos;s talk about your facility.
          </h1>
          <p className="text-white/70 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            We work directly with QA Managers, Food Safety Directors, and Plant Owners at
            mid-market food and beverage manufacturers. If that&apos;s you, we&apos;d like to
            hear about your compliance challenges.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Email Block */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <p className="text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-3">
              Email
            </p>
            <a
              href="mailto:clinton@provarx.com"
              className="text-[#1B2D4F] text-2xl font-bold hover:text-[#4A90D9] transition-colors"
            >
              clinton@provarx.com
            </a>
            <p className="text-gray-400 text-sm mt-2">
              You&apos;ll hear back from Clinton directly — not a support queue.
            </p>
          </div>

          {/* Calendly Placeholder */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-16 text-center mb-8">
            <p className="text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-3">
              Schedule a Call
            </p>
            <p className="text-[#1B2D4F] font-bold text-lg mb-2">
              Book a 30-minute call
            </p>
            <p className="text-gray-400 text-sm">
              Calendly embed goes here
            </p>
          </div>

          {/* What to expect */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <p className="text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-5">
              What to Expect
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "A direct conversation — no slide deck, no scripted demo",
                "Questions about your facility, your product lines, and your current compliance setup",
                "An honest assessment of whether Provarx is the right fit",
                "No pressure, no follow-up campaign if it's not the right time",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4A90D9] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Prefer email? Reach us directly at{" "}
            <a
              href="mailto:clinton@provarx.com"
              className="text-[#4A90D9] hover:underline"
            >
              clinton@provarx.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
