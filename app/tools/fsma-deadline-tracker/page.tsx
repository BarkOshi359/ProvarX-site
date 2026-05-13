'use client'

import { useState, useEffect } from 'react'
import { CheckSquare, Square, Download, X } from 'lucide-react'
import { submitLead } from '@/app/actions/leads'
import { trackEvent } from '@/lib/analytics'

const FACILITY_OPTIONS = [
  {
    label: 'Large business (>$10M annual food sales)',
    value: 'large',
    deadline: new Date('2026-01-20T00:00:00'),
    deadlineLabel: 'January 20, 2026',
    passed: new Date('2026-01-20T00:00:00') < new Date(),
  },
  {
    label: 'Small business ($1M–$10M annual food sales)',
    value: 'small',
    deadline: new Date('2026-07-20T00:00:00'),
    deadlineLabel: 'July 20, 2026',
    passed: new Date('2026-07-20T00:00:00') < new Date(),
  },
  {
    label: 'Very small business (<$1M annual food sales)',
    value: 'very-small',
    deadline: new Date('2027-01-20T00:00:00'),
    deadlineLabel: 'January 20, 2027',
    passed: new Date('2027-01-20T00:00:00') < new Date(),
  },
]

const RULE_PUBLICATION = new Date('2022-11-21T00:00:00')

const CHECKLIST = [
  'Written food traceability plan documented',
  'All Critical Tracking Events (CTEs) identified for your food categories',
  'All Key Data Elements (KDEs) defined for each CTE',
  'Records system selected and configured',
  'Staff trained on KDE capture procedures',
  'Supplier traceability requirements communicated',
  'Records format tested for FDA-readability',
  '24-hour recall drill completed',
  'Internal audit of records completeness done',
  'Mock FDA records request completed',
  'Customer notification procedures documented',
  'Legal review of traceability plan completed',
]

const SALES_RANGES = [
  'Under $1 million',
  '$1M–$5M',
  '$5M–$10M',
  '$10M–$50M',
  'Over $50M',
]

interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getCountdown(deadline: Date): CountdownParts {
  const diff = deadline.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

export default function DeadlineTrackerPage() {
  const [selectedFacility, setSelectedFacility] = useState('')
  const [countdown, setCountdown] = useState<CountdownParts | null>(null)
  const [checked, setChecked] = useState<boolean[]>(Array(12).fill(false))
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [facilityType, setFacilityType] = useState('')
  const [salesRange, setSalesRange] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const facility = FACILITY_OPTIONS.find((f) => f.value === selectedFacility)

  useEffect(() => {
    if (!facility || facility.passed) return
    const update = () => setCountdown(getCountdown(facility.deadline))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [facility])

  function toggleCheck(i: number) {
    const next = [...checked]
    next[i] = !next[i]
    setChecked(next)
  }

  const checkedCount = checked.filter(Boolean).length

  // Progress bar: days elapsed since rule publication vs total days to deadline
  function getProgress() {
    if (!facility) return 0
    const total = facility.deadline.getTime() - RULE_PUBLICATION.getTime()
    const elapsed = Date.now() - RULE_PUBLICATION.getTime()
    return Math.min(100, Math.max(0, (elapsed / total) * 100))
  }

  async function handleDownload(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    setSubmitError('')
    // TODO: track event — email captured
    trackEvent('lead_captured', { source: 'deadline_tracker' })
    const result = await submitLead({
      email,
      source: 'deadline_tracker',
      facility_type: facilityType || facility?.label,
      annual_sales_range: salesRange,
    })
    setSubmitting(false)
    if (!result.success) {
      setSubmitError(result.error ?? 'Something went wrong.')
      return
    }
    setSubmitted(true)
    // TODO: trigger email via Resend API — send PDF checklist to email
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0A2540] text-white py-16 px-6 text-center">
        <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-3">Free Tool</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">FSMA 204 Compliance Deadline Tracker</h1>
        <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
          Live countdown to your compliance deadline, with a 12-item readiness checklist.
          See exactly where your facility stands.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Facility selector */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
          <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
            Select your facility type
          </label>
          <select
            value={selectedFacility}
            onChange={(e) => { setSelectedFacility(e.target.value); setCountdown(null) }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
          >
            <option value="">— Choose your facility size —</option>
            {FACILITY_OPTIONS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>

        {/* Deadline display */}
        {facility && (
          <>
            {facility.passed ? (
              <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-8 text-center mb-8">
                <p className="text-[#991B1B] font-bold text-xl mb-2">⚠ Deadline passed: {facility.deadlineLabel}</p>
                <p className="text-[#991B1B] leading-relaxed">
                  This deadline has passed. If your facility hasn&apos;t achieved compliance, you are currently
                  at risk of FDA enforcement — including warning letters, injunctions, and product seizure.
                  <strong> Act now.</strong>
                </p>
                <a
                  href="/contact"
                  className="inline-block mt-5 bg-[#EF4444] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#DC2626] transition-colors"
                >
                  Talk to us urgently →
                </a>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 text-center">
                <p className="text-[#64748B] text-sm mb-1">Your compliance deadline</p>
                <p className="text-[#0A2540] font-bold text-xl mb-6">{facility.deadlineLabel}</p>

                {countdown && (
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {[
                      { value: countdown.days, label: 'Days' },
                      { value: countdown.hours, label: 'Hours' },
                      { value: countdown.minutes, label: 'Min' },
                      { value: countdown.seconds, label: 'Sec' },
                    ].map(({ value, label }) => (
                      <div key={label} className="bg-[#0A2540] rounded-xl px-4 py-5">
                        <div className="text-3xl font-bold text-[#00C9A7] font-mono">
                          {String(value).padStart(2, '0')}
                        </div>
                        <div className="text-white/50 text-xs mt-1">{label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs text-[#64748B] mb-1.5">
                    <span>Rule published: Nov 2022</span>
                    <span>Deadline: {facility.deadlineLabel}</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-[#F59E0B] h-full rounded-full transition-all"
                      style={{ width: `${getProgress()}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#64748B] mt-1.5 text-right">
                    {getProgress().toFixed(0)}% of time elapsed
                  </p>
                </div>
              </div>
            )}

            {/* Checklist */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-[#0A2540] text-lg">Readiness checklist</h2>
                <span className="text-sm font-bold text-[#00C9A7]">{checkedCount} / {CHECKLIST.length}</span>
              </div>
              <div className="flex flex-col gap-3">
                {CHECKLIST.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => toggleCheck(i)}
                    className="flex items-start gap-3 text-left w-full hover:bg-[#F8FAFC] rounded-lg px-2 py-2 -mx-2 transition-colors"
                  >
                    {checked[i]
                      ? <CheckSquare size={18} className="text-[#00C9A7] flex-shrink-0 mt-0.5" />
                      : <Square size={18} className="text-gray-300 flex-shrink-0 mt-0.5" />
                    }
                    <span className={`text-sm leading-relaxed ${checked[i] ? 'text-[#64748B] line-through' : 'text-[#0A2540]'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-6 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#00C9A7] h-full rounded-full transition-all"
                  style={{ width: `${(checkedCount / CHECKLIST.length) * 100}%` }}
                />
              </div>
            </div>

            {/* PDF download gated */}
            <div className="bg-[#0A2540] rounded-xl p-8 text-center text-white">
              <Download size={24} className="text-[#00C9A7] mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-3">Download the complete FSMA 204 implementation checklist</h2>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                The full PDF guide — 24 pages, with step-by-step implementation instructions,
                timeline, and templates. Free.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-block bg-[#00C9A7] text-[#0A2540] font-bold px-8 py-4 rounded-lg hover:bg-[#00b396] transition-colors"
              >
                Download free PDF →
              </button>
            </div>
          </>
        )}

        {!facility && (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-16 text-center text-[#64748B] text-sm">
            Select your facility type above to see your compliance deadline and readiness checklist.
          </div>
        )}
      </div>

      {/* Email gate modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#64748B] hover:text-[#0A2540]"
            >
              <X size={20} />
            </button>
            {submitted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-[#00C9A7]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download size={22} className="text-[#00C9A7]" />
                </div>
                <h2 className="text-xl font-bold text-[#0A2540] mb-2">Check your email</h2>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Your FSMA 204 implementation checklist PDF is on its way to <strong>{email}</strong>.
                  Check your inbox in the next few minutes.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-[#0A2540] mb-2">Download the free PDF</h2>
                <p className="text-[#64748B] text-sm mb-6 leading-relaxed">
                  Enter your email and we&apos;ll send the complete FSMA 204 implementation checklist — no spam, just the guide.
                </p>
                <form onSubmit={handleDownload} className="flex flex-col gap-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
                  />
                  <select
                    value={facilityType}
                    onChange={(e) => setFacilityType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
                  >
                    <option value="">Facility type (optional)</option>
                    {FACILITY_OPTIONS.map((f) => (
                      <option key={f.value} value={f.label}>{f.label}</option>
                    ))}
                  </select>
                  <select
                    value={salesRange}
                    onChange={(e) => setSalesRange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
                  >
                    <option value="">Approximate annual sales (optional)</option>
                    {SALES_RANGES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {submitError && <p className="text-red-600 text-sm">{submitError}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#00C9A7] text-[#0A2540] font-bold py-3 rounded-lg hover:bg-[#00b396] transition-colors disabled:opacity-60"
                  >
                    {submitting ? 'Sending…' : 'Send me the PDF →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
