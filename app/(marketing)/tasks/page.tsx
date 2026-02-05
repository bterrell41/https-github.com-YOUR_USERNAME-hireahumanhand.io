import Link from 'next/link'

export default function TasksPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center p-4 justify-between max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                            <span className="material-symbols-outlined block">smart_toy</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Bounties</h1>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-md mx-auto px-4 py-6 space-y-6">
                {/* Filters Section */}
                <section className="space-y-4">
                    <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
                        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white px-5 shadow-lg shadow-primary/20">
                            <span className="text-sm font-semibold">All Tasks</span>
                        </button>
                        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-card-dark text-slate-700 dark:text-slate-300 px-5">
                            <span className="text-sm font-medium">Data Labeling</span>
                            <span className="material-symbols-outlined text-[18px]">expand_more</span>
                        </button>
                        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-card-dark text-slate-700 dark:text-slate-300 px-5">
                            <span className="text-sm font-medium">Physical</span>
                            <span className="material-symbols-outlined text-[18px]">expand_more</span>
                        </button>
                        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-card-dark text-slate-700 dark:text-slate-300 px-5">
                            <span className="text-sm font-medium">Validation</span>
                            <span className="material-symbols-outlined text-[18px]">expand_more</span>
                        </button>
                    </div>

                    {/* Price Range Slider Card */}
                    <div className="bg-slate-200/50 dark:bg-card-dark/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Budget Range</p>
                                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
                            </div>
                            <div className="flex h-8 w-full pt-3">
                                <div className="flex h-1.5 w-full rounded-full bg-slate-300 dark:bg-slate-700 items-center relative">
                                    {/* Track highlight */}
                                    <div className="absolute left-[20%] right-[15%] h-full bg-primary rounded-full"></div>
                                    {/* Low Thumb */}
                                    <div className="absolute left-[20%] -translate-x-1/2 flex flex-col items-center gap-1">
                                        <div className="size-5 rounded-full bg-white border-2 border-primary shadow-md"></div>
                                        <p className="text-slate-900 dark:text-white text-[10px] font-bold mt-1">$20</p>
                                    </div>
                                    {/* High Thumb */}
                                    <div className="absolute right-[15%] translate-x-1/2 flex flex-col items-center gap-1">
                                        <div className="size-5 rounded-full bg-white border-2 border-primary shadow-md"></div>
                                        <p className="text-slate-900 dark:text-white text-[10px] font-bold mt-1">$1.2k</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bounty List */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active Bounties (42)</h3>
                        <div className="flex items-center gap-1 text-primary text-xs font-bold">
                            <span>LATEST FIRST</span>
                            <span className="material-symbols-outlined text-[14px]">swap_vert</span>
                        </div>
                    </div>
                    {/* Card 1 */}
                    <div className="group flex flex-col bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all hover:ring-2 hover:ring-primary/40 active:scale-[0.98]">
                        <div
                            className="relative h-44 w-full bg-center bg-cover"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQSFU0RfAART4VgZi7FRstgJlgTVlMwlPOYNPl9id-Kx0Iwsx-dC4kmlLHEKFU8WGg6uKXWonMApvRDRKlhfBTEOw2654OuNID88pnACod43oMPV60XlNPSvleqRSQEyjGzOYAaZqVt8uD8vMDJFu3sav0BGUlPtH07qH_tFYFVIcuQBxjbfC24gSFtzxuDhj6l2ybnOQWwfw9GD_IB2bh79tEQIlfHeVBeZnxVioUg_sgD62KLd609VZmTlSU8LijwlFI9yHrCiwP')" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute top-3 left-3 flex gap-2">
                                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px] fill-current">verified</span> AGENT VERIFIED
                                </span>
                            </div>
                            <div className="absolute bottom-3 left-3 flex flex-col">
                                <p className="text-white text-lg font-bold leading-tight">Verify storefront in London</p>
                                <div className="flex items-center gap-2 text-white/70 text-xs mt-1">
                                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                                    <span>London, UK</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary bg-primary/10 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Physical Task</span>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">groups</span> 12 Applicants
                                        </span>
                                    </div>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">$15.00 <span className="text-xs font-normal text-slate-500">Fixed Reward</span></p>
                                </div>
                                <button className="bg-primary hover:bg-primary/90 text-white px-6 h-10 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-primary/20">
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="group flex flex-col bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all hover:ring-2 hover:ring-primary/40 active:scale-[0.98]">
                        <div
                            className="relative h-44 w-full bg-center bg-cover"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJ8Lr6Xi1Rt2oOukmnf4KDoyBUFYdmh9AzsxfZ6f6yrgL5XQbpjZHEpa_77WJ6G-8SSyrmYaxr38QahZeVZoKfO3BWYK42GGFammE46DSGYT7WBViR_mlXM88bY6labYLBlpivdnAS_t4svPEM1w4kXE2YSMQnOc3pnai13A1ppGBkcU4SE-PiJERcIQRp3EHqYdWKL6qHSKCOedGWSOxSlMOnCtu_1c2FcDv5Kfdz_WbRv7-x6uTfdR1Jw2BLNuFckNPLGdOsjl2F')" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute top-3 left-3 flex gap-2">
                                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">bolt</span> HIGH URGENCY
                                </span>
                            </div>
                            <div className="absolute bottom-3 left-3 flex flex-col">
                                <p className="text-white text-lg font-bold leading-tight">Annotate medical LIDAR data</p>
                                <div className="flex items-center gap-2 text-white/70 text-xs mt-1">
                                    <span className="material-symbols-outlined text-[14px]">cloud</span>
                                    <span>Remote / Digital</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary bg-primary/10 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Data Labeling</span>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">groups</span> 45 Applicants
                                        </span>
                                    </div>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">$25.00<span className="text-sm font-bold">/hr</span></p>
                                </div>
                                <button className="bg-primary hover:bg-primary/90 text-white px-6 h-10 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-primary/20">
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="group flex flex-col bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all hover:ring-2 hover:ring-primary/40 active:scale-[0.98]">
                        <div
                            className="relative h-44 w-full bg-center bg-cover"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaPyalWV77rSpDNvzouNY6vQCrRParCB0F8XiLPODbQWKJxQjQSUzHZfhFMcVg9RY_bPlR0VepWYhFVO5eByEa9JEsI9JCa4NHGOXfKCSntdZbfDvQ2xQMMBlH8NXor6WzY0P8pwOY8NKFtRe27reafzYYEyQz3tgqETCXk8v2AfocKZhYY8F0I25Bxc0Jd5gGZ6ILdNhU84MuVU5bDtGKaCfGaqe7IJYsmeazPDNHSiu7jxR7MnP1VWPa3iMQTERl2gX_-uXqrH1q')" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-3 left-3 flex flex-col">
                                <p className="text-white text-lg font-bold leading-tight">Debug Neural Response Patterns</p>
                                <div className="flex items-center gap-2 text-white/70 text-xs mt-1">
                                    <span className="material-symbols-outlined text-[14px]">terminal</span>
                                    <span>Logic & Creative</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary bg-primary/10 text-[10px] font-bold px-2 py-0.5 rounded uppercase">QA & Validation</span>
                                        <span className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">groups</span> 3 Applicants
                                        </span>
                                    </div>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">$45.00 <span className="text-xs font-normal text-slate-500">Fixed</span></p>
                                </div>
                                <button className="bg-primary hover:bg-primary/90 text-white px-6 h-10 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-primary/20">
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Navigation Tab Bar (iOS style) */}
            <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-6">
                <div className="flex items-center justify-between glass-card rounded-full h-16 px-8 blue-glow border border-white/10">
                    <Link href="/" className="text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-2xl">home</span>
                    </Link>
                    <Link href="/browse" className="text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-2xl">search</span>
                    </Link>
                    <div className="relative -top-8">
                        <Link href="/tasks" className="size-16 rounded-full bg-primary flex items-center justify-center text-white shadow-lg blue-glow border-4 border-[#05070A] hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </Link>
                    </div>
                    <Link href="/tasks" className="text-primary hover:text-primary transition-colors">
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
