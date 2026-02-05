import Link from 'next/link'

export default function ProfileSettings() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white pb-24">
            {/* Top Nav */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center p-4 justify-between max-w-md mx-auto">
                    <Link href="/dashboard" className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-bold">Edit Profile</h1>
                    <button className="text-primary font-bold text-sm">Save</button>
                </div>
            </header>

            <main className="max-w-md mx-auto p-6 space-y-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group cursor-pointer">
                        <div
                            className="w-28 h-28 rounded-full bg-center bg-cover border-4 border-slate-200 dark:border-slate-800 shadow-xl"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQSFU0RfAART4VgZi7FRstgJlgTVlMwlPOYNPl9id-Kx0Iwsx-dC4kmlLHEKFU8WGg6uKXWonMApvRDRKlhfBTEOw2654OuNID88pnACod43oMPV60XlNPSvleqRSQEyjGzOYAaZqVt8uD8vMDJFu3sav0BGUlPtH07qH_tFYFVIcuQBxjbfC24gSFtzxuDhj6l2ybnOQWwfw9GD_IB2bh79tEQIlfHeVBeZnxVioUg_sgD62KLd609VZmTlSU8LijwlFI9yHrCiwP")' }}
                        ></div>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-white">photo_camera</span>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-1.5 border-4 border-background-light dark:border-background-dark">
                            <span className="material-symbols-outlined text-xs font-bold leading-none">check</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold">Brandon Terrell</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Level 3 Human Agent</p>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Basic Info</h3>

                        <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-sm">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Display Name</label>
                                <input
                                    type="text"
                                    defaultValue="Brandon Terrell"
                                    className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Bio</label>
                                <textarea
                                    defaultValue="Specialist in physical verification and logistics."
                                    className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/50 h-24 text-slate-900 dark:text-white resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Capabilities</h3>

                        <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-sm">
                            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/20 p-2 rounded-md text-primary">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Location Tracking</p>
                                        <p className="text-[10px] text-slate-500">Allow agents to see your location</p>
                                    </div>
                                </div>
                                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/20 p-2 rounded-md text-primary">
                                        <span className="material-symbols-outlined">camera_alt</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Camera Access</p>
                                        <p className="text-[10px] text-slate-500">For photo validation tasks</p>
                                    </div>
                                </div>
                                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="bg-slate-200 p-2 rounded-md text-slate-500">
                                        <span className="material-symbols-outlined">mic</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-400">Audio Recording</p>
                                        <p className="text-[10px] text-slate-500">Not currently enabled</p>
                                    </div>
                                </div>
                                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700">
                                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="w-full bg-red-500/10 text-red-500 font-bold py-4 rounded-xl text-sm hover:bg-red-500/20 transition-colors">
                    Sign Out
                </button>
            </main>
        </div>
    )
}
