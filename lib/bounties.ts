import { createClient } from '@/lib/db/supabase'
import { MOCK_BOUNTIES } from '@/lib/db/mock-data'

export type BountyFilter = {
    query?: string
    category?: string
    minPrice?: number
    remoteOnly?: boolean
}

export async function getBounties(filter: BountyFilter = {}) {
    // Mock Mode
    if (process.env.HHC_MOCK_MODE === 'true') {
        let bounties = [...MOCK_BOUNTIES]

        if (filter.query) {
            const q = filter.query.toLowerCase()
            bounties = bounties.filter(b =>
                b.title.toLowerCase().includes(q) ||
                b.description.toLowerCase().includes(q)
            )
        }

        if (filter.category && filter.category !== 'All') {
            bounties = bounties.filter(b => b.category.toLowerCase() === filter.category?.toLowerCase())
        }

        if (filter.minPrice) {
            bounties = bounties.filter(b => b.price_amount >= filter.minPrice!)
        }

        if (filter.remoteOnly) {
            bounties = bounties.filter(b => b.is_remote_allowed)
        }

        // Sort by newest (mock data doesn't have dates, just preserve order or reverse)
        return bounties
    }

    // DB Mode
    const supabase = createClient()
    let query = supabase.from('bounties').select('*')

    if (filter.query) {
        query = query.or(`title.ilike.%${filter.query}%,description.ilike.%${filter.query}%`)
    }

    if (filter.category && filter.category !== 'All') {
        query = query.eq('category', filter.category)
    }

    if (filter.minPrice) {
        query = query.gte('price_amount', filter.minPrice)
    }

    if (filter.remoteOnly) {
        query = query.eq('is_remote_allowed', true)
    }

    const { data, error } = await query

    if (error) {
        console.error(error)
        return []
    }

    return data || []
}
