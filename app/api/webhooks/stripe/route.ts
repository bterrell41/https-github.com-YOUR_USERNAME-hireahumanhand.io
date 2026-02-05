
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-01-27.acacia' })

export async function POST(req: Request) {
    const body = await req.text()
    const headerStore = await headers()
    const signature = headerStore.get('Stripe-Signature') as string

    let event: Stripe.Event;

    try {
        // Verified event construction
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session
            const userId = session.client_reference_id

            if (userId) {
                // Grant verification status
                const { error } = await supabase.from('users').update({
                    verification_status: 'verified',
                    verification_tier: 'pro',
                    stripe_customer_id: session.customer as string
                }).eq('id', userId)

                if (error) {
                    console.error('Error updating user verification:', error)
                    return new NextResponse('Database Error', { status: 500 })
                }

                console.log(`User ${userId} verified via Stripe`)
            } else {
                console.log('Webhook received but no client_reference_id found in session')
            }
            break;

        case 'customer.subscription.deleted':
            // TODO: Handle revocation if we add recurring subscriptions
            const subscription = event.data.object as Stripe.Subscription
            // logic to find user by stripe_customer_id and downgrade them
            break;

        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
}
