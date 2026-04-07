function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="w-2 h-2 rounded-full bg-[#4A90D9] mb-4" />
      <h4 className="font-semibold text-[#1B2D4F] mb-2 text-sm">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function RoleSection({
  label,
  role,
  description,
  features,
  alt,
}: {
  label: string;
  role: string;
  description: string;
  features: { title: string; body: string }[];
  alt: boolean;
}) {
  return (
    <section className={`py-24 px-6 ${alt ? "bg-[#F8FAFC]" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto">
        <p className="text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-3">
          {label}
        </p>
        <h2 className="text-3xl font-bold text-[#1B2D4F] mb-4">{role}</h2>
        <p className="text-gray-500 max-w-2xl mb-12 leading-relaxed">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} title={f.title} body={f.body} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProductPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[#1B2D4F] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#4A90D9] text-xs uppercase tracking-widest font-semibold mb-4">
            The Platform
          </p>
          <h1 className="text-5xl font-bold mb-6">Built for every role on your team.</h1>
          <p className="text-white/70 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Provarx gives your QA Manager control, your floor workers simplicity, and your Plant
            Manager visibility — all in one platform.
          </p>
        </div>
      </section>

      {/* QA Manager */}
      <RoleSection
        label="Role 01 — QA Manager"
        role="Complete control. Total visibility."
        description="The QA Manager is the backbone of your compliance program. Provarx gives them the tools to build, manage, and verify every element of your HACCP plan — with the data they need to stay ahead of deviations instead of reacting to them."
        features={[
          {
            title: "HACCP Template Builder",
            body: "Build and customize HACCP plans for every product line. Define CCPs, set acceptable ranges, and assign verification responsibilities — all without IT support.",
          },
          {
            title: "Real-Time Dashboard",
            body: "See every active CCP check, open corrective action, and pending verification across all lines and shifts from a single dashboard view.",
          },
          {
            title: "SPC Control Charts",
            body: "Automatically generated control charts for every monitored parameter. Cpk scoring surfaces process capability at a glance — before drift becomes a deviation.",
          },
          {
            title: "Corrective Action Tracking",
            body: "Log, assign, and close corrective actions with a full audit trail. Every step is timestamped and linked to the original CCP record.",
          },
        ]}
        alt={false}
      />

      {/* Floor Worker */}
      <RoleSection
        label="Role 02 — Floor Worker"
        role="Thirty seconds. Any device."
        description="Floor workers don't have time for complicated software. Provarx is built for the production floor — fast inputs, clear prompts, and no training required beyond a single walkthrough."
        features={[
          {
            title: "Mobile-First CCP Logging",
            body: "Log temperature checks, pH readings, metal detector passes, and any custom CCP in under 30 seconds from any phone, tablet, or shared workstation.",
          },
          {
            title: "Out-of-Range Alerts",
            body: "When a reading falls outside acceptable limits, the system immediately flags it and prompts the worker to initiate a corrective action — no guessing required.",
          },
          {
            title: "SOP Sign-Off",
            body: "Digital signature capture for SOP acknowledgments and pre-shift checklists. Immutable. Timestamped. No paper required.",
          },
          {
            title: "Offline-Capable Logging",
            body: "Records queue locally when connectivity is limited and sync automatically when the device reconnects. No lost data on the production floor.",
          },
        ]}
        alt={true}
      />

      {/* Plant Manager */}
      <RoleSection
        label="Role 03 — Plant Manager"
        role="The numbers you actually need."
        description="Plant Managers need to know that compliance is running, costs are under control, and the facility is ready for anything. Provarx surfaces the metrics that matter — without requiring a QA degree to interpret them."
        features={[
          {
            title: "Facility-Level Compliance Score",
            body: "A rolling compliance rate across all CCPs and lines — updated in real time. One number that tells you how your facility is performing against its own standards.",
          },
          {
            title: "Recall Trace — One Click",
            body: "Enter any ingredient lot code or finished product batch. Provarx instantly returns every batch it touched, every shift it ran, and every distribution record on file.",
          },
          {
            title: "Audit Export Package",
            body: "When an auditor walks in, generate a complete, formatted compliance package in one click. Every record, organized, signed, and legally defensible.",
          },
          {
            title: "Trend Reporting",
            body: "Week-over-week and month-over-month views of deviation rates, corrective action close times, and process capability scores by line and shift.",
          },
        ]}
        alt={false}
      />

      {/* Bottom CTA */}
      <section className="bg-[#1B2D4F] text-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">See how it fits your facility.</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Every facility is different. Talk to us about your specific product lines, CCPs, and
            compliance challenges.
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
