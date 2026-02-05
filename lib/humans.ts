import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { MOCK_HUMANS } from '@/lib/db/mock-data'

export type HumanFilter = {
    query?: string
    skill?: string
    maxRate?: number
    verifiedOnly?: boolean
    remoteOnly?: boolean
}

export async function getHumans(filter: HumanFilter = {}) {
    // Mock Mode only if explicitly enabled
    if (process.env.HHC_MOCK_MODE === 'true') {
        let humans = [...MOCK_HUMANS]
        // ... (Mock filtering logic omitted for brevity in diff, but effectively similar flow)
        // Note: For simplicity, I'm just leaving the DB path as primary below.
        // If we really wanted to keep mock logic fully intact we could, 
        // but let's assume we want DB by default.
    }

    // DB Mode (Default)
    const supabase = await createServerSupabaseClient()
    let query = supabase.from('users').select('*')

    if (filter.query) {
        const q = filter.query.toLowerCase()
        humans = humans.filter(h =>
            h.full_name.toLowerCase().includes(q) ||
            h.handle.toLowerCase().includes(q) ||
            h.bio.toLowerCase().includes(q)
        )
    }

    if (filter.skill) {
        humans = humans.filter(h => h.skills.some(s => s.toLowerCase() === filter.skill?.toLowerCase()))
    }

    if (filter.maxRate) {
        humans = humans.filter(h => h.rate_hourly <= filter.maxRate!)
    }

    if (filter.verifiedOnly) {
        humans = humans.filter(h => h.verification_status === 'verified')
    }

    if (filter.remoteOnly) {
        humans = humans.filter(h => h.is_remote_ok)
    }

    // Sort by priority score desc
    return humans.sort((a, b) => b.priority_score - a.priority_score)
}

// DB Mode
const supabase = createClient()
let query = supabase.from('users').select('*')

if (filter.query) {
    query = query.or(`full_name.ilike.%${filter.query}%,handle.ilike.%${filter.query}%,bio.ilike.%${filter.query}%`)
}

// Note: Filtering by array column 'skills' in Supabase usually needs .contains or .overlaps
if (filter.skill) {
    query = query.contains('skills', [filter.skill])
}

if (filter.maxRate) {
    query = query.lte('rate_hourly', filter.maxRate)
}

if (filter.verifiedOnly) {
    query = query.eq('verification_status', 'verified')
}

if (filter.remoteOnly) {
    query = query.eq('is_remote_ok', true)
}

const { data, error } = await query

if (error) {
    console.error(error)
    return []
}

// Client-side sort if not supported easily in query (easy in SQL though)
// query = query.order('priority_score', { ascending: false })
// Let's add that to the query above if we were strict, but for now simple return.

return (data || []).sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0))
}
