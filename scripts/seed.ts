import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { MOCK_HUMANS, MOCK_BOUNTIES } from '../lib/db/mock-data'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.log('Missing Supabase credentials. Use HHC_MOCK_MODE=true for frontend only.')
    process.exit(0)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
    console.log('Starting seed...')

    // Seed Humans (Users)
    console.log(`Seeding ${MOCK_HUMANS.length} humans...`)
    for (const human of MOCK_HUMANS) {
        const { error } = await supabase.from('users').upsert({
            id: undefined, // Let Supabase generate ID or use a deterministic one if we want constant IDs
            // Actually we'll mimic the mock IDs if possible, but UUID is required. 
            // For verified mock data we will let Supabase gen UUIDs or we should have valid UUIDs in mock data.
            // Mock data has 'h1', 'h2' which are not UUIDs. We will strip ID and insert new, OR we can generate UUIDs.
            // For now let's insert without ID and let Supabase generate it.
            email: human.email,
            full_name: human.full_name,
            handle: human.handle,
            avatar_url: human.avatar_url,
            bio: human.bio,
            city: human.city,
            state: human.state,
            country: human.country,
            timezone: human.timezone,
            rate_hourly: human.rate_hourly,
            is_available: human.is_available,
            is_remote_ok: human.is_remote_ok,
            skills: human.skills,
            verification_status: human.verification_status,
            verification_tier: human.verification_tier,
            priority_score: human.priority_score
        }, { onConflict: 'email' })

        if (error) console.error(`Error inserting ${human.handle}:`, error.message)
    }

    // Seed Bounties
    // We need real user IDs for bounties. Let's fetch a user to assign as poster.
    const { data: users } = await supabase.from('users').select('id').limit(1)
    const posterId = users?.[0]?.id

    if (posterId) {
        console.log(`Seeding ${MOCK_BOUNTIES.length} bounties...`)
        for (const bounty of MOCK_BOUNTIES) {
            const { error } = await supabase.from('bounties').insert({
                poster_id: posterId,
                title: bounty.title,
                description: bounty.description,
                category: bounty.category,
                location: bounty.location,
                is_remote_allowed: bounty.is_remote_allowed,
                price_amount: bounty.price_amount,
                price_type: bounty.price_type,
                skills_required: bounty.skills_required,
            })
            if (error) console.error(`Error inserting bounty ${bounty.title}:`, error.message)

        }
    }

    console.log('Seed complete.')
}

seed()
