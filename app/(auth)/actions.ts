'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/db/supabase-server'

export async function login(formData: FormData) {
    const supabase = await createServerSupabaseClient()

    // Type-casting here for simplicity, but in a real app you'd validate
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        // Ideally return error to show on UI, but for now redirect or similar
        // We can't easily return error state without useFormState or similar
        // For this MVP, we will just log and maybe not redirect?
        console.error('Login error:', error)
        // If we return, the form action needs to handle it.
        // Let's just redirect to dashboard for now if successful, or do nothing if validation fails
        return
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createServerSupabaseClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('full_name') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
        },
    })

    if (error) {
        console.error('Signup error:', error)
        return
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signout() {
    const supabase = await createServerSupabaseClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}
