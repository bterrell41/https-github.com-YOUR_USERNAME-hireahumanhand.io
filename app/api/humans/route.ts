import { createClient } from '@/lib/db/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const skill = searchParams.get('skill')
    const verified = searchParams.get('verified')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Mock Mode Handling
    if (process.env.HHC_MOCK_MODE === 'true') {
        const { MOCK_HUMANS } = await import('@/lib/db/mock-data')
        let humans = MOCK_HUMANS
        if (skill) humans = humans.filter(h => h.skills.includes(skill))
        if (verified === 'true') humans = humans.filter(h => h.verification_status === 'verified')
        return NextResponse.json({ success: true, data: humans.slice(0, limit) })
    }

    const supabase = createClient()
    let query = supabase.from('users').select('*').limit(limit)

    if (skill) query = query.contains('skills', [skill])
    if (verified === 'true') query = query.eq('verification_status', 'verified')

    const { data, error } = await query

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
}
