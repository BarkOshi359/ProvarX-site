'use client'

import { useState, useMemo } from 'react'
import { trackEvent } from '@/lib/analytics'

// Standard normal CDF approximation (Hart approximation)
function normCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp(-z * z / 2)
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.8212560 + t * 1.3302744))))
  return z > 0 ? 1 - p : p
}

function cpkColor(cpk: number): string {
  if (cpk >= 1.67) return '#00C9A7'
  if (cpk >= 1.33) return '#22C55E'
  if (cpk >= 1.0) return '#F59E0B'
  return '#EF4444'
}

function cpkLabel(cpk: number): string {
  if (cpk >= 1.67) return 'Excellent — Six Sigma capable'
  if (cpk >= 1.33) return 'Capable — meets industry standard'
  if (cpk >= 1.0) return 'Marginally capable — improvement needed'
  return 'Not capable — significant defect risk'
}

const FOOD_MFG_BENCHMARKS = [
  { parameter: 'Fill weight (dry goods)', target: '≥1.33', note: 'Required for NIST Handbook 133 compliance' },
  { parameter: 'pH control (acidified foods)', target: '≥1.67', note: 'Critical CCP — FDA pH requirements' },
  { parameter: 'Temperature control (cook step)', target: '≥1.67', note: 'Kill step validation requirement' },
  { parameter: 'Brix / soluble solids', target: '≥1.33', note: 'Quality specification' },
  { parameter: 'Net weight (beverages)', target: '≥1.33', note: 'NIST / FDA label compliance' },
  { parameter: 'Metal detection sensitivity', target: '≥2.00', note: 'Industry best practice for CCP' },
]

export default function CpkCalculatorPage() {
  const [usl, setUsl] = useState('')
  const [lsl, setLsl] = useState('')
  const [mean, setMean] = useState('')
  const [sigma, setSigma] = useState('')

  const results = useMemo(() => {
    const U = parseFloat(usl)
    const L = parseFloat(lsl)
    const X = parseFloat(mean)
    const S = parseFloat(sigma)
    if (!isFinite(U) || !isFinite(L) || !isFinite(X) || !isFinite(S) || S <= 0 || U <= L) return null

    const cp = (U - L) / (6 * S)
    const cpkUpper = (U - X) / (3 * S)
    const cpkLower = (X - L) / (3 * S)
    const cpk = Math.min(cpkUpper, cpkLower)
    const sigmaLevel = cpk * 3

    // DPMO calculation
    const zUpper = (U - X) / S
    const zLower = (X - L) / S
    const pDefect = normCDF(-zLower) + (1 - normCDF(zUpper))
    const dpmo = Math.round(pDefect * 1_000_000)
    const yieldPct = ((1 - pDefect) * 100).toFixed(4)

    // TODO: track event — Cpk calculation
    trackEvent('cpk_calculated', { cp, cpk, sigmaLevel, dpmo })

    return { cp, cpk, cpkUpper, cpkLower, sigmaLevel, dpmo, yieldPct, U, L, X, S }
  }, [usl, lsl, mean, sigma])

  // Bell curve SVG — 300×120
  function BellCurve() {
    if (!results) return null
    const { U, L, X, S } = results
    const W = 300
    const H = 120
    const padding = 20
    const range = Math.max((U - L) * 1.5, S * 8)
    const lo = X - range / 2
    const hi = X + range / 2
    const toX = (v: number) => padding + ((v - lo) / (hi - lo)) * (W - 2 * padding)
    const bell = (v: number) => Math.exp(-0.5 * ((v - X) / S) ** 2) / (S * Math.sqrt(2 * Math.PI))
    const peak = bell(X)
    const toY = (v: number) => H - padding - ((v / peak) * (H - 2 * padding))

    const steps = 100
    const pts: string[] = []
    for (let i = 0; i <= steps; i++) {
      const v = lo + (i / steps) * (hi - lo)
      pts.push(`${toX(v)},${toY(bell(v))}`)
    }
    const path = `M ${pts.join(' L ')}`

    const lslX = toX(L)
    const uslX = toX(U)
    const meanX = toX(X)

    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 140 }}>
        {/* Fill between LSL and USL */}
        <clipPath id="spec-clip">
          <rect x={lslX} y={0} width={uslX - lslX} height={H} />
        </clipPath>
        <path d={path} fill="#00C9A7" fillOpacity="0.15" stroke="none" clipPath="url(#spec-clip)" />
        <path d={path} fill="none" stroke="#0A2540" strokeWidth="2" />
        {/* LSL */}
        <line x1={lslX} y1={padding} x2={lslX} y2={H - padding} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x={lslX} y={H - 4} textAnchor="middle" fontSize="9" fill="#EF4444">LSL</text>
        {/* USL */}
        <line x1={uslX} y1={padding} x2={uslX} y2={H - padding} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x={uslX} y={H - 4} textAnchor="middle" fontSize="9" fill="#EF4444">USL</text>
        {/* Mean */}
        <line x1={meanX} y1={padding} x2={meanX} y2={H - padding} stroke="#0A2540" strokeWidth="1.5" />
        <text x={meanX} y={H - 4} textAnchor="middle" fontSize="9" fill="#0A2540">x̄</text>
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0A2540] text-white py-16 px-6 text-center">
        <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-3">Free Tool</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Cpk / Process Capability Calculator</h1>
        <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
          Real-time Cpk, sigma level, DPMO, and yield calculation for food manufacturing QA teams.
          Enter your spec limits and process data below.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="font-bold text-[#0A2540] text-lg mb-6">Process inputs</h2>
            <div className="flex flex-col gap-5">
              {[
                { label: 'Upper Specification Limit (USL)', val: usl, set: setUsl, placeholder: 'e.g. 4.6' },
                { label: 'Lower Specification Limit (LSL)', val: lsl, set: setLsl, placeholder: 'e.g. 4.0' },
                { label: 'Process Mean (x̄)', val: mean, set: setMean, placeholder: 'e.g. 4.3' },
                { label: 'Process Standard Deviation (σ)', val: sigma, set: setSigma, placeholder: 'e.g. 0.08' },
              ].map(({ label, val, set, placeholder }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">
                    {label}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-6">
            {results ? (
              <>
                {/* Cpk big number */}
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                  <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-2">Cpk</p>
                  <p className="text-6xl font-bold mb-2" style={{ color: cpkColor(results.cpk) }}>
                    {results.cpk.toFixed(3)}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: cpkColor(results.cpk) }}>
                    {cpkLabel(results.cpk)}
                  </p>
                </div>

                {/* Bell curve */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Process distribution</p>
                  <BellCurve />
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Cp', value: results.cp.toFixed(3) },
                    { label: 'Sigma Level', value: results.sigmaLevel.toFixed(2) + 'σ' },
                    { label: 'DPMO', value: results.dpmo.toLocaleString() },
                    { label: 'Process Yield', value: results.yieldPct + '%' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                      <p className="text-[#64748B] text-xs uppercase tracking-wider mb-1">{label}</p>
                      <p className="text-xl font-bold text-[#0A2540]">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Interpretation */}
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    Your process is <strong className="text-[#0A2540]">{cpkLabel(results.cpk).split(' — ')[0].toLowerCase()}</strong>.
                    At a Cpk of <strong>{results.cpk.toFixed(3)}</strong>, approximately{' '}
                    <strong>{results.dpmo.toLocaleString()} units per million</strong> will fall outside specification.
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 flex items-center justify-center h-full min-h-[200px]">
                <p className="text-[#64748B] text-sm text-center">
                  Enter your process data on the left to see real-time Cpk results.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Benchmark table */}
        <div className="mt-12 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100">
            <h2 className="font-bold text-[#0A2540] text-lg">Common Cpk targets in food manufacturing</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Parameter</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Target Cpk</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody>
                {FOOD_MFG_BENCHMARKS.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-[#F8FAFC]">
                    <td className="px-6 py-4 font-medium text-[#0A2540]">{row.parameter}</td>
                    <td className="px-6 py-4">
                      <span className="bg-[#00C9A7]/10 text-[#00C9A7] font-bold px-2.5 py-1 rounded-full text-xs">
                        {row.target}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#64748B]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 bg-[#0A2540] rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-3">
            Provarx tracks Cpk continuously across every production parameter
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            No manual calculation required. SPC control charts and Cpk scores run automatically
            against every data point your facility generates — and alert you before drift becomes a deviation.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#00C9A7] text-[#0A2540] font-bold px-8 py-4 rounded-lg hover:bg-[#00b396] transition-colors"
          >
            See it in action →
          </a>
        </div>
      </div>
    </div>
  )
}
