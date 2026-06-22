'use client'

import { useState, useEffect } from 'react'
import { CheckSquare, Square, Download } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

// FSMA 204 has a single uniform compliance date. FDA's 30-month extension moved it
// from January 20, 2026 to July 20, 2028, and Congress directed no enforcement before then.
const DEADLINE = new Date('2028-07-20T00:00:00')
const DEADLINE_LABEL = 'July 20, 2028'
const RULE_PUBLICATION = new Date('2022-11-21T00:00:00')

const CHECKLIST_PDF = '/provarx-fsma-204-checklist.pdf'

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
  const [countdown, setCountdown] = useState<CountdownParts | null>(null)
  const [checked, setChecked] = useState<boolean[]>(Array(CHECKLIST.length).fill(false))

  useEffect(() => {
    const update = () => setCountdown(getCountdown(DEADLINE))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  function toggleCheck(i: number) {
    const next = [...checked]
    next[i] = !next[i]
    setChecked(next)
  }

  const checkedCount = checked.filter(Boolean).length

  // Progress bar: time elapsed since rule publication vs total time to deadline
  function getProgress() {
    const total = DEADLINE.getTime() - RULE_PUBLICATION.getTime()
    const elapsed = Date.now() - RULE_PUBLICATION.getTime()
    return Math.min(100, Math.max(0, (elapsed / total) * 100))
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0A2540] text-white py-16 px-6 text-center">
        <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-3">Free Tool</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">FSMA 204 Compliance Deadline Tracker</h1>
        <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
          Live countdown to the FSMA 204 compliance deadline, with a 12-item readiness checklist.
          See exactly where your facility stands.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Extension note */}
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-5 mb-8 text-sm text-[#1E3A5F] leading-relaxed">
          <strong>Heads up:</strong> FDA extended the FSMA 204 compliance date by 30 months — from
          January 20, 2026 to <strong>July 20, 2028</strong> — and Congress directed FDA not to
          enforce the rule before that date. The deadline applies uniformly to all covered
          businesses, regardless of size.
        </div>

        {/* Deadline display */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 text-center">
          <p className="text-[#64748B] text-sm mb-1">The FSMA 204 compliance deadline</p>
          <p className="text-[#0A2540] font-bold text-xl mb-6">{DEADLINE_LABEL}</p>

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
              <span>Deadline: {DEADLINE_LABEL}</span>
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

        {/* PDF download — direct, ungated */}
        <div className="bg-[#0A2540] rounded-xl p-8 text-center text-white">
          <Download size={24} className="text-[#00C9A7] mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-3">Download the FSMA 204 readiness checklist</h2>
          <p className="text-white/70 text-sm mb-6 leading-relaxed">
            The full checklist as a printable PDF — the 10-point readiness self-assessment, the
            12-step implementation checklist, and a CTE/KDE quick reference. Free, no email required.
          </p>
          <a
            href={CHECKLIST_PDF}
            download
            onClick={() => trackEvent('checklist_downloaded', { source: 'deadline_tracker' })}
            className="inline-block bg-[#00C9A7] text-[#0A2540] font-bold px-8 py-4 rounded-lg hover:bg-[#00b396] transition-colors"
          >
            Download free PDF →
          </a>
        </div>
      </div>
    </div>
  )
}
