'use server'

import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
    const supabase = await createServerSupabaseClient()

    // Check auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    const full_name = formData.get('full_name') as string
    const bio = formData.get('bio') as string
    const rate_hourly = parseFloat(formData.get('rate_hourly') as string)
    // For skills, assuming a comma-separated string input for now, or multiple inputs
    // Let's handle it as a simple text input splitting by comma
    const skillsString = formData.get('skills') as string
    const skills = skillsString ? skillsString.split(',').map(s => s.trim()).filter(Boolean) : []

    const { error } = await supabase
        .from('users')
        .update({
            full_name,
            bio,
            rate_hourly,
            skills,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

    if (error) {
        throw new Error('Failed to update profile')
    }

    revalidatePath('/dashboard/profile')
    revalidatePath('/browse')
    return { success: true }
}

export async function signOutAction() {
    const supabase = await createServerSupabaseClient()
    await supabase.auth.signOut()
    redirect('/login')
}
