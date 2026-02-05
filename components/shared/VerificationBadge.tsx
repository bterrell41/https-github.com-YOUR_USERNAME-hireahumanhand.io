import { BadgeCheck } from "lucide-react"

export const VerificationBadge = ({ className }: { className?: string }) => {
    return (
        <div className={`inline-flex items-center justify-center text-primary ${className}`} title="Verified Human">
            <BadgeCheck className="w-5 h-5 fill-primary/10" />
        </div>
    )
}
