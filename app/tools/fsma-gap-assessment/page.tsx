'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, MinusCircle, ChevronRight, Mail } from 'lucide-react'
import { submitLead } from '@/app/actions/leads'
import { trackEvent } from '@/lib/analytics'

const QUESTIONS = [
  'Do you maintain a written food traceability plan that identifies all critical tracking events (CTEs) and key data elements (KDEs)?',
  'Can you produce a complete lot-level traceability report within 24 hours of an FDA request?',
  'Are your batch records stored in a tamper-evident system — not paper or standard spreadsheets?',
  'Do you have documented procedures for tracing an ingredient from receiving through finished product and into distribution?',
  'Can you identify every customer who received product from a specific lot number within 2 hours?',
  'Do your batch records capture all FSMA 204 KDEs: lot code, location, quantity, unit of measure, and reference document number?',
  'Are your Critical Control Points (CCPs) monitored digitally with automatic time-stamping?',
  'Do you have a written recall plan that has been tested in the last 12 months?',
  'Are your suppliers providing FSMA 204-compliant traceability records that you can link to your own?',
  'Does your QA team have real-time visibility into production records without being physically on the floor?',
]

type Answer = 'yes' | 'partially' | 'no' | null

function scoreAnswer(a: Answer): number {
  if (a === 'yes') return 10
  if (a === 'partially') return 5
  return 0
}

function getRiskLevel(score: number) {
  if (score >= 80) return { label: 'Strong foundation', color: '#00C9A7', bg: '#F0FDF9', border: '#A7F3D0', text: 'A few gaps to close before your next audit.' }
  if (score >= 50) return { label: 'Moderate risk', color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A', text: 'Several compliance gaps need attention before a deadline or audit.' }
  return { label: 'High risk', color: '#EF4444', bg: '#FEF2F2', border: '#FECACA', text: 'Significant traceability gaps that expose your facility to FDA enforcement action.' }
}

// Radial SVG score display
function ScoreCircle({ score }: { score: number }) {
  const r = 60
  const circ = 2 * Math.PI * r
  const filled = (score / 100) * circ
  const risk = getRiskLevel(score)
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={r} fill="none" stroke="#E5E7EB" strokeWidth="12" />
        <circle
          cx="80" cy="80" r={r} fill="none"
          stroke={risk.color} strokeWidth="12"
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
        />
        <text x="80" y="76" textAnchor="middle" fontSize="32" fontWeight="bold" fill={risk.color}>{score}</text>
        <text x="80" y="96" textAnchor="middle" fontSize="13" fill="#64748B">out of 100</text>
      </svg>
      <span
        className="px-4 py-1.5 rounded-full text-sm font-bold"
        style={{ background: risk.bg, border: `1px solid ${risk.border}`, color: risk.color }}
      >
        {risk.label}
      </span>
    </div>
  )
}

const FACILITY_TYPES = [
  'Meat / Poultry Processing',
  'Beverage Manufacturing',
  'Dairy',
  'Nutraceutical / Supplements',
  'Frozen Foods',
  'Co-Packer / Contract Manufacturer',
  'Other',
]

export default function GapAssessmentPage() {
  const [step, setStep] = useState<'quiz' | 'email-gate' | 'results'>('quiz')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>(Array(10).fill(null))
  const [email, setEmail] = useState('')
  const [facilityType, setFacilityType] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const score = answers.reduce((sum, a) => sum + scoreAnswer(a), 0)
  const risk = getRiskLevel(score)

  function answer(val: Answer) {
    const next = [...answers]
    next[currentQ] = val
    setAnswers(next)
    if (currentQ < 9) {
      setCurrentQ(currentQ + 1)
    } else {
      // TODO: track event — gap assessment completed
      trackEvent('gap_assessment_completed', { score })
      setStep('email-gate')
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    setSubmitError('')
    const answerMap: Record<string, string> = {}
    answers.forEach((a, i) => { answerMap[`q${i + 1}`] = a ?? 'no' })
    // TODO: track event — email captured
    trackEvent('lead_captured', { source: 'gap_assessment', score })
    const result = await submitLead({
      email,
      source: 'gap_assessment',
      score,
      answers: answerMap,
      facility_type: facilityType,
    })
    setSubmitting(false)
    if (!result.success) {
      setSubmitError(result.error ?? 'Something went wrong.')
      return
    }
    setStep('results')
  }

  const progress = ((currentQ) / 10) * 100

  // ── Quiz step ──────────────────────────────────────────────────────────────
  if (step === 'quiz') {
    const q = QUESTIONS[currentQ]
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2540] text-white py-10 px-6 text-center">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-2">Free Tool</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">FSMA 204 Gap Assessment</h1>
          <p className="text-white/60 text-sm">Answer 10 questions to score your facility&apos;s readiness</p>
        </div>

        {/* Progress */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="max-w-xl mx-auto flex items-center gap-4">
            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#00C9A7] h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-[#64748B] font-medium whitespace-nowrap">
              {currentQ + 1} of 10
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="max-w-xl w-full">
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-4">
                Question {currentQ + 1}
              </p>
              <p className="text-[#0A2540] text-xl font-semibold leading-relaxed mb-10">
                {q}
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => answer('yes')}
                  className="flex items-center gap-3 w-full text-left px-5 py-4 rounded-lg border-2 border-[#00C9A7] text-[#0A2540] font-semibold hover:bg-[#F0FDF9] transition-colors"
                >
                  <CheckCircle2 size={20} className="text-[#00C9A7] flex-shrink-0" />
                  Yes — fully in place
                </button>
                <button
                  onClick={() => answer('partially')}
                  className="flex items-center gap-3 w-full text-left px-5 py-4 rounded-lg border-2 border-[#F59E0B] text-[#0A2540] font-semibold hover:bg-[#FFFBEB] transition-colors"
                >
                  <MinusCircle size={20} className="text-[#F59E0B] flex-shrink-0" />
                  Partially — some gaps remain
                </button>
                <button
                  onClick={() => answer('no')}
                  className="flex items-center gap-3 w-full text-left px-5 py-4 rounded-lg border-2 border-[#EF4444] text-[#0A2540] font-semibold hover:bg-[#FEF2F2] transition-colors"
                >
                  <XCircle size={20} className="text-[#EF4444] flex-shrink-0" />
                  No — not in place
                </button>
              </div>
            </div>

            {currentQ > 0 && (
              <button
                onClick={() => setCurrentQ(currentQ - 1)}
                className="mt-4 text-sm text-[#64748B] hover:text-[#0A2540] underline block mx-auto"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Email gate ─────────────────────────────────────────────────────────────
  if (step === 'email-gate') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center">
          <div className="w-12 h-12 bg-[#00C9A7]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <Mail size={22} className="text-[#00C9A7]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0A2540] mb-3">
            Your results are ready
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-6">
            Enter your email to see your complete results and receive your personalized compliance gap report.
          </p>
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C9A7] focus:border-transparent"
            />
            <select
              value={facilityType}
              onChange={(e) => setFacilityType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00C9A7] focus:border-transparent"
            >
              <option value="">Select your facility type (optional)</option>
              {FACILITY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {submitError && (
              <p className="text-red-600 text-sm">{submitError}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#00C9A7] text-[#0A2540] font-bold py-3 rounded-lg hover:bg-[#00b396] transition-colors disabled:opacity-60"
            >
              {submitting ? 'Saving…' : 'Show my results →'}
            </button>
          </form>
          <p className="text-xs text-[#64748B] mt-4">No spam. We&apos;ll send your results and nothing else.</p>
        </div>
      </div>
    )
  }

  // ── Results ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0A2540] text-white py-12 px-6 text-center">
        <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-2">Your Results</p>
        <h1 className="text-3xl font-bold">FSMA 204 Gap Assessment</h1>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Score */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center mb-8">
          <ScoreCircle score={score} />
          <p
            className="mt-4 text-sm leading-relaxed font-medium"
            style={{ color: risk.color }}
          >
            {risk.text}
          </p>
        </div>

        {/* Question breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
          <h2 className="font-bold text-[#0A2540] text-lg mb-6">Question-by-question breakdown</h2>
          <div className="flex flex-col gap-4">
            {QUESTIONS.map((q, i) => {
              const a = answers[i]
              const pts = scoreAnswer(a)
              return (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex-shrink-0 mt-0.5">
                    {pts === 10 && <CheckCircle2 size={18} className="text-[#00C9A7]" />}
                    {pts === 5 && <MinusCircle size={18} className="text-[#F59E0B]" />}
                    {pts === 0 && <XCircle size={18} className="text-[#EF4444]" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#0A2540] leading-relaxed">{q}</p>
                    <p className="text-xs text-[#64748B] mt-1 font-medium">
                      {a === 'yes' ? 'Yes — 10 pts' : a === 'partially' ? 'Partially — 5 pts' : 'No — 0 pts'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0A2540] rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Get your personalized FSMA 204 compliance roadmap</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            A 30-minute call with Clinton — the person who built Provarx and has worked directly in facilities like yours.
            No slide deck. Just a real conversation about your gaps and how to close them.
          </p>
          <a
            href="https://calendar.app.google/agEvxXjDA1SavteP6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#00C9A7] text-[#0A2540] font-bold px-8 py-4 rounded-lg hover:bg-[#00b396] transition-colors"
          >
            Book your call <ChevronRight size={16} />
          </a>
          <p className="mt-3 text-white/50 text-sm">
            Opens Google Calendar — pick a time that works for you.
          </p>
        </div>
      </div>
    </div>
  )
}
