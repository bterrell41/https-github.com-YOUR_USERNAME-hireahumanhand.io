
import Link from 'next/link'

export type Human = {
    id: string
    full_name: string
    handle: string
    avatar_url: string
    bio: string
    city: string
    state: string
    country: string
    rate_hourly: number
    is_remote_ok: boolean
    skills: string[]
    verification_status: string
}

export function HumanCard({ human }: { human: Human }) {
    const isVerified = human.verification_status === 'verified'
    const location = [human.city, human.country === 'USA' ? 'US' : human.country || 'Remote'].filter(Boolean).join(', ')

    return (
        <div className="glass-card rounded-xl p-4 flex flex-col gap-4 transition-transform active:scale-[0.98]">
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-1.5">
                        <p className="text-lg font-bold">{human.full_name}</p>
                        {isVerified && (
                            <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                                verified
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-[#9da9b9] text-xs font-medium">
                        <span className="material-symbols-outlined text-xs">location_on</span>
                        <span>{location}</span>
                    </div>
                </div>
                <div
                    className="size-16 rounded-full bg-center bg-cover border-2 border-primary ring-2 ring-primary/20"
                    style={{ backgroundImage: `url("${human.avatar_url}")` }}
                />
            </div>
            
            <div className="flex flex-wrap gap-2">
                {human.skills.slice(0, 3).map((skill) => (
                    <div key={skill} className="flex h-7 items-center rounded-lg bg-slate-200 dark:bg-white/5 px-3">
                        <p className="text-xs font-medium">{skill}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-[#9da9b9] font-bold">Hourly Rate</span>
                    <p className="text-xl font-bold text-primary">${human.rate_hourly.toFixed(2)}</p>
                </div>
                <button className="bg-primary text-white font-bold py-2 px-6 rounded-lg text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                    Hire Human
                </button>
            </div>
        </div>
    )
}
