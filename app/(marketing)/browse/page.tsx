import Link from 'next/link'
import { getHumans } from '@/lib/humans'
import { HumanCard, Human } from '@/components/features/browse/human-card'

export default async function BrowseHumans() {
    // Fetch humans (mock or DB)
    // Cast to Human[] because getHumans returns data from DB or mock which might be loosely typed
    const humans = await getHumans() as unknown as Human[]

    return (
        <div className="flex flex-col min-h-screen pb-24">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center p-4 pb-2 justify-between max-w-md mx-auto">
                    <div className="text-primary flex size-10 shrink-0 items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">search</span>
                    </div>
                    <h1 className="text-xl font-bold leading-tight tracking-tight flex-1 text-center">Browse Humans</h1>
                    <div className="flex w-10 items-center justify-end">
                        <button className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-2xl">tune</span>
                        </button>
                    </div>
                </div>
                {/* Segmented Control (Sort) */}
                <div className="px-4 py-3 max-w-md mx-auto">
                    <div className="flex h-11 flex-1 items-center justify-center rounded-xl bg-slate-200 dark:bg-[#1c2127] p-1">
                        <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-[#9da9b9] text-sm font-medium transition-all">
                            <span className="truncate">Recommended</span>
                            <input defaultChecked className="invisible w-0" name="sort-options" type="radio" value="Recommended" />
                        </label>
                        <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-[#9da9b9] text-sm font-medium transition-all">
                            <span className="truncate">Lowest Rate</span>
                            <input className="invisible w-0" name="sort-options" type="radio" value="Lowest Rate" />
                        </label>
                        <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-[#9da9b9] text-sm font-medium transition-all">
                            <span className="truncate">Newest</span>
                            <input className="invisible w-0" name="sort-options" type="radio" value="Newest" />
                        </label>
                    </div>
                </div>
            </header>

            <main className="max-w-md mx-auto w-full">
                {/* Horizontal Filter Chips */}
                <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar">
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-[#1c2127] px-4 border border-white/5">
                        <p className="text-sm font-medium">Skills</p>
                        <span className="material-symbols-outlined text-sm">expand_more</span>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-[#1c2127] px-4 border border-white/5">
                        <p className="text-sm font-medium">Location</p>
                        <span className="material-symbols-outlined text-sm">expand_more</span>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/20 text-primary px-4 border border-primary/30">
                        <p className="text-sm font-medium">Verified</p>
                        <span className="material-symbols-outlined text-sm">check</span>
                    </button>
                </div>

                {/* Human Directory List */}
                <div className="flex flex-col gap-4 p-4">
                    {humans.length > 0 ? (
                        humans.map(human => (
                            <HumanCard key={human.id} human={human} />
                        ))
                    ) : (
                        <div className="text-center py-10 text-slate-500">
                            <p>No humans found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Bottom Navigation Bar (iOS Style) - Duplicated for now to match file, but could be component */}
            <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-6">
                <div className="flex items-center justify-between glass-card rounded-full h-16 px-8 blue-glow border border-white/10">
                    <Link href="/" className="text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-2xl">home</span>
                    </Link>
                    <Link href="/browse" className="text-primary">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>search</span>
                    </Link>
                    <div className="relative -top-8">
                        <Link href="/tasks" className="size-16 rounded-full bg-primary flex items-center justify-center text-white shadow-lg blue-glow border-4 border-[#05070A] hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </Link>
                    </div>
                    <Link href="/tasks" className="text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-2xl">receipt_long</span>
                    </Link>
                    <Link href="/dashboard" className="text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-2xl">account_circle</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
