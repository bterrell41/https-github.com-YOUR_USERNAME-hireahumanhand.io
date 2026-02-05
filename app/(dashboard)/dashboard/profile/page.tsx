import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { updateProfile, signOutAction } from '../../actions'
import { redirect } from 'next/navigation'

export default async function ProfileSettings() {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile) {
        return <div>Profile not found.</div>
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white pb-24">
            <form action={updateProfile}>
                {/* Top Nav */}
                <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center p-4 justify-between max-w-md mx-auto">
                        <Link href="/dashboard" className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="text-lg font-bold">Edit Profile</h1>
                        <button type="submit" className="text-primary font-bold text-sm">Save</button>
                    </div>
                </header>

                <main className="max-w-md mx-auto p-6 space-y-8">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group cursor-pointer">
                            <div
                                className="w-28 h-28 rounded-full bg-center bg-cover border-4 border-slate-200 dark:border-slate-800 shadow-xl"
                                style={{ backgroundImage: `url("${profile.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQSFU0RfAART4VgZi7FRstgJlgTVlMwlPOYNPl9id-Kx0Iwsx-dC4kmlLHEKFU8WGg6uKXWonMApvRDRKlhfBTEOw2654OuNID88pnACod43oMPV60XlNPSvleqRSQEyjGzOYAaZqVt8uD8vMDJFu3sav0BGUlPtH07qH_tFYFVIcuQBxjbfC24gSFtzxuDhj6l2ybnOQWwfw9GD_IB2bh79tEQIlfHeVBeZnxVioUg_sgD62KLd609VZmTlSU8LijwlFI9yHrCiwP'}")` }}
                            ></div>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-white">photo_camera</span>
                            </div>
                            {profile.verification_status === 'verified' && (
                                <div className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-1.5 border-4 border-background-light dark:border-background-dark">
                                    <span className="material-symbols-outlined text-xs font-bold leading-none">check</span>
                                </div>
                            )}
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-bold">{profile.full_name || 'No Name'}</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                {profile.verification_status === 'verified' ? 'Verified Human' : 'Unverified User'}
                            </p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Basic Info</h3>

                            <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-sm">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Full Name</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        defaultValue={profile.full_name || ''}
                                        className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Bio</label>
                                    <textarea
                                        name="bio"
                                        defaultValue={profile.bio || ''}
                                        className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/50 h-24 text-slate-900 dark:text-white resize-none"
                                    ></textarea>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Hourly Rate ($)</label>
                                    <input
                                        type="number"
                                        name="rate_hourly"
                                        defaultValue={profile.rate_hourly || '15'}
                                        step="0.01"
                                        className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Skills (comma separated)</label>
                                    <input
                                        type="text"
                                        name="skills"
                                        defaultValue={profile.skills ? profile.skills.join(', ') : ''}
                                        className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </form>

            <div className="max-w-md mx-auto px-6">
                <form action={signOutAction}>
                    <button type="submit" className="w-full bg-red-500/10 text-red-500 font-bold py-4 rounded-xl text-sm hover:bg-red-500/20 transition-colors">
                        Sign Out
                    </button>
                </form>
            </div>
        </div>
    )
}
