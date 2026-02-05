import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status') || 'open'

    if (process.env.HHC_MOCK_MODE === 'true') {
        const { MOCK_BOUNTIES } = await import('@/lib/db/mock-data')
        let bounties = MOCK_BOUNTIES
        if (category) bounties = bounties.filter(b => b.category === category)
        return NextResponse.json({ success: true, data: bounties })
    }

    const supabase = await createServerSupabaseClient()
    let query = supabase.from('bounties').select('*').eq('status', status)

    if (category) query = query.eq('category', category)

    const { data, error } = await query

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
}

export async function POST(request: Request) {
    const body = await request.json()

    // Basic validation
    if (!body.title || !body.price_amount) {
        return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Content Moderation
    const { checkContentSafety } = await import('@/lib/auth/moderation')
    const content = (body.title + " " + (body.description || "")).toLowerCase()
    const safety = checkContentSafety(content)

    if (!safety.safe) {
        return NextResponse.json({
            success: false,
            error: "Content Violation",
            moderation: safety
        }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.from('bounties').insert(body).select().single()

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
}
