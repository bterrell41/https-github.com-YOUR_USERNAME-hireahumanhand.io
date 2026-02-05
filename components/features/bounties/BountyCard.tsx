import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CalendarClock, MapPin } from "lucide-react"
import Link from "next/link"

export const BountyCard = ({ bounty }: { bounty: any }) => {
    return (
        <Card className="flex flex-col h-full bg-card/40 hover:bg-card/60 transition-colors border-border/50 hover:border-primary/30">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2">
                    <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary hover:bg-primary/20">{bounty.category}</Badge>
                    <span className="font-mono font-bold text-accent">${bounty.price_amount}{bounty.price_type === 'hourly' && '/hr'}</span>
                </div>
                <h3 className="font-semibold text-lg leading-tight mt-2 line-clamp-2">
                    {bounty.title}
                </h3>
            </CardHeader>
            <CardContent className="flex-1 space-y-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                    {bounty.description}
                </p>

                <div className="space-y-1">
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <MapPin className="w-3 h-3" />
                        {bounty.is_remote_allowed ? "Remote" : bounty.location || "On-site"}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <CalendarClock className="w-3 h-3" />
                        Due in 2 days
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                    {bounty.skills_required?.slice(0, 3).map((skill: string) => (
                        <Badge key={skill} variant="outline" className="text-[10px] bg-background/50 border-border/50 text-muted-foreground">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="pt-2 pb-4">
                <Link href={`/tasks/${bounty.id}`} className="w-full">
                    <Button className="w-full text-xs h-9">View Task</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
