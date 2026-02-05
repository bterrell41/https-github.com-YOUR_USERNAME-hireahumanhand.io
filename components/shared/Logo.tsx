import { Hand } from 'lucide-react'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-2 font-mono font-bold text-lg tracking-tighter ${className}`}>
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 border border-primary/50 text-primary">
                <Hand className="w-5 h-5 strokew-2" />
            </div>
            <span className="hidden sm:inline-block">
                <span className="text-primary">Human</span>Hand
            </span>
        </div>
    )
}
