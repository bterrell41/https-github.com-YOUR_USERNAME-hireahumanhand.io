
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/db/supabase'

// Placeholder for Stripe library since we don't have keys yet
// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })

export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get('Stripe-Signature') as string

    let event;

    try {
        // Verified event construction would go here
        // event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)

        // For now, simple mock parsing
        event = JSON.parse(body)
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const supabase = createClient()

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object
            const userId = session.client_reference_id

            if (userId) {
                // Grant verification status
                await supabase.from('users').update({
                    verification_status: 'verified',
                    verification_tier: 'pro',
                    stripe_customer_id: session.customer
                }).eq('id', userId)
                console.log(`User ${userId} verified via Stripe`)
            }
            break;

        case 'customer.subscription.deleted':
            // Revoke verification
            break;

        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
}
