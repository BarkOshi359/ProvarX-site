'use client'

import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

// Note: metadata must be exported from a server component.
// This file is 'use client', so we define the meta separately in a layout or
// use generateMetadata — for now the title is set via <title> below via head approach.
// For full SSR metadata, wrap in a server parent. Currently handled via layout title fallback.

const TIMELINE_STEPS = [
  {
    hour: 'Hour 0',
    title: 'FDA contact received',
    description: (lot: string) =>
      `Written records request issued under FSMA Section 204(d)(1) for lot ${lot}. You have 24 hours.`,
    failsWithPaper: false,
  },
  {
    hour: 'Hour 0:30',
    title: 'Lot identification',
    description: (_lot: string, product: string) =>
      `Locate all records for this lot. Identify raw material receiving records, batch records, and CCPs for ${product}.`,
    failsWithPaper: false,
  },
  {
    hour: 'Hour 2:00',
    title: 'Upstream trace',
    description: (_lot: string, product: string): string =>
      `Trace ${product} back to supplier lot codes. Identify the farm/supplier, date received, and quantity for each ingredient.`,
    failsWithPaper: true,
  },
  {
    hour: 'Hour 4:00',
    title: 'Downstream trace',
    description: (lot: string, _product: string) =>
      `Identify all customers, distributors, or retailers who received product from lot ${lot}. Document exact quantities and ship dates.`,
    failsWithPaper: true,
  },
  {
    hour: 'Hour 6:00',
    title: 'CCP verification',
    description: (_lot: string, product: string) =>
      `Pull all CCP monitoring records for the ${product} production run. Temperature logs, metal detection, pH, kill step validation.`,
    failsWithPaper: true,
  },
  {
    hour: 'Hour 8:00',
    title: 'Supplier notification',
    description: () =>
      `Contact all affected suppliers. Document all communications with timestamps and receipt confirmation.`,
    failsWithPaper: false,
  },
  {
    hour: 'Hour 12:00',
    title: 'Customer notification',
    description: () =>
      `Issue written notification to all affected customers. Document receipt confirmation and retain records.`,
    failsWithPaper: false,
  },
  {
    hour: 'Hour 24:00',
    title: 'FDA submission',
    description: () =>
      `Submit complete traceability records package to FDA. All records must be readable without proprietary software.`,
    failsWithPaper: false,
  },
]

interface SetupForm {
  product: string
  lot: string
  productionDate: string
  facility: string
}

export default function RecallTraceSimulatorPage() {
  const [step, setStep] = useState<'setup' | 'simulation' | 'results'>('setup')
  const [form, setForm] = useState<SetupForm>({ product: '', lot: '', productionDate: '', facility: '' })
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function startSimulation(e: React.FormEvent) {
    e.preventDefault()
    // TODO: track event — recall simulator run
    trackEvent('recall_simulator_started', { product: form.product })
    setStep('simulation')
    setVisibleSteps(0)
    setElapsed(0)
    let shown = 0
    const stepInterval = setInterval(() => {
      shown++
      setVisibleSteps(shown)
      if (shown >= TIMELINE_STEPS.length) {
        clearInterval(stepInterval)
        setTimeout(() => setStep('results'), 600)
      }
    }, 500)
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => {
      clearInterval(stepInterval)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }

  useEffect(() => {
    if (step === 'results' && timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [step])

  function formatElapsed(s: number) {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  // ── Setup ──────────────────────────────────────────────────────────────────
  if (step === 'setup') {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <div className="bg-[#0A2540] text-white py-16 px-6 text-center">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-3">Free Tool</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">FSMA 204 Recall Trace Simulator</h1>
          <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
            Enter your product details and see exactly what FDA expects in 24 hours — step by step.
            Most facilities don&apos;t realize how much they&apos;re missing until they run this.
          </p>
        </div>
        <div className="max-w-lg mx-auto px-6 py-16">
          <form onSubmit={startSimulation} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col gap-5">
            <h2 className="text-xl font-bold text-[#0A2540] mb-1">Set up your recall simulation</h2>
            <div>
              <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Product name</label>
              <input
                required
                placeholder="e.g. Frozen spinach blend"
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Lot number</label>
              <input
                required
                placeholder="e.g. LOT-2024-0847-A"
                value={form.lot}
                onChange={(e) => setForm({ ...form, lot: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Production date</label>
              <input
                required
                type="date"
                value={form.productionDate}
                onChange={(e) => setForm({ ...form, productionDate: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Facility name</label>
              <input
                required
                placeholder="e.g. Green Valley Foods Inc."
                value={form.facility}
                onChange={(e) => setForm({ ...form, facility: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0A2540] text-white font-bold py-4 rounded-lg hover:bg-[#0d3060] transition-colors flex items-center justify-center gap-2 mt-2"
            >
              Run recall simulation <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Simulation ─────────────────────────────────────────────────────────────
  if (step === 'simulation') {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <div className="bg-[#0A2540] text-white py-10 px-6">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-1">Simulation running</p>
              <h1 className="text-2xl font-bold">{form.product} · {form.lot}</h1>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs mb-1">Elapsed</p>
              <p className="text-2xl font-mono font-bold text-[#00C9A7]">{formatElapsed(elapsed)}</p>
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="flex flex-col gap-0">
            {TIMELINE_STEPS.map((s, i) => {
              const visible = i < visibleSteps
              return (
                <div key={i} className={`flex gap-5 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                  {/* line + dot */}
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${visible ? 'bg-[#00C9A7]' : 'bg-gray-300'}`} />
                    {i < TIMELINE_STEPS.length - 1 && <div className="w-0.5 bg-gray-200 flex-1 my-1" />}
                  </div>
                  <div className="pb-8">
                    <p className="text-[#00C9A7] text-xs font-bold uppercase tracking-wider mb-0.5">{s.hour}</p>
                    <h3 className="text-[#0A2540] font-bold text-base mb-1">{s.title}</h3>
                    <p className="text-[#64748B] text-sm leading-relaxed">
                      {s.description(form.lot, form.product)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ── Results ────────────────────────────────────────────────────────────────
  const failingSteps = TIMELINE_STEPS.filter((s) => s.failsWithPaper)
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0A2540] text-white py-12 px-6 text-center">
        <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-2">Simulation complete</p>
        <h1 className="text-3xl font-bold mb-2">How does your system hold up?</h1>
        <p className="text-white/60 text-sm">Based on {form.facility} · {form.product} · {form.lot}</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Two-column comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Paper/spreadsheet */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-[#FEF2F2] border-b border-[#FECACA] px-6 py-4">
              <h2 className="font-bold text-[#991B1B] text-lg">With paper / spreadsheet records</h2>
            </div>
            <div className="p-6 flex flex-col gap-3">
              {TIMELINE_STEPS.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  {s.failsWithPaper
                    ? <XCircle size={16} className="text-[#EF4444] flex-shrink-0 mt-0.5" />
                    : <CheckCircle2 size={16} className="text-gray-300 flex-shrink-0 mt-0.5" />
                  }
                  <div>
                    <span className="text-xs text-[#64748B] font-medium">{s.hour} — </span>
                    <span className={`text-sm ${s.failsWithPaper ? 'text-[#991B1B] font-semibold' : 'text-[#64748B]'}`}>
                      {s.title}
                      {s.failsWithPaper && ' ✗ likely to fail'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* With Provarx */}
          <div className="bg-white border border-[#00C9A7] rounded-xl overflow-hidden">
            <div className="bg-[#F0FDF9] border-b border-[#A7F3D0] px-6 py-4">
              <h2 className="font-bold text-[#065F46] text-lg">With Provarx</h2>
            </div>
            <div className="p-6 flex flex-col gap-3">
              {TIMELINE_STEPS.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#00C9A7] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-[#64748B] font-medium">{s.hour} — </span>
                    <span className="text-sm text-[#0A2540]">{s.title} ✓ complete</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insight */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-6 mb-10 text-center">
          <p className="text-[#92400E] font-semibold leading-relaxed">
            This simulation used your inputs — in a real recall, every field above must be sourced
            from verified records within 24 hours.{' '}
            <strong>{failingSteps.length} of {TIMELINE_STEPS.length} steps</strong> are high-risk failure
            points with paper or spreadsheet systems. How confident are you?
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0A2540] mb-4">
            See how Provarx automates your recall trace
          </h2>
          <p className="text-[#64748B] mb-8 leading-relaxed">
            Every step in this simulation runs automatically in Provarx — no manual assembly, no missing records.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#00C9A7] text-[#0A2540] font-bold px-10 py-4 rounded-lg hover:bg-[#00b396] transition-colors"
          >
            Book a demo <ArrowRight size={16} />
          </a>
          <p className="mt-4 text-sm text-[#64748B]">Or <a href="/tools/fsma-gap-assessment" className="text-[#00C9A7] underline">take the free gap assessment</a> to score your full readiness.</p>
        </div>
      </div>
    </div>
  )
}
