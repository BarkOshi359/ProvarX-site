'use server'

import { createClient } from '@supabase/supabase-js'

interface LeadData {
  email: string
  source: 'gap_assessment' | 'deadline_tracker' | 'newsletter'
  score?: number
  answers?: Record<string, string>
  facility_type?: string
  annual_sales_range?: string
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase environment variables are not configured.')
  return createClient(url, key)
}

export async function submitLead(data: LeadData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from('leads').insert({
      email: data.email,
      source: data.source,
      score: data.score ?? null,
      answers: data.answers ?? null,
      facility_type: data.facility_type ?? null,
      annual_sales_range: data.annual_sales_range ?? null,
    })
    if (error) throw error
    // TODO: track event via analytics
    return { success: true }
  } catch (err) {
    console.error('Lead submission error:', err)
    return { success: false, error: 'Failed to save. Please try again.' }
  }
}
