import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { VerificationBadge } from "@/components/shared/VerificationBadge"
import Link from "next/link"
import { MapPin } from "lucide-react"

export const HumanCard = ({ human }: { human: any }) => {
    return (
        <Card className="flex flex-col h-full bg-card/40 hover:bg-card/60 transition-colors border-border/50 hover:border-primary/30">
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <Avatar className="w-12 h-12 border border-border">
                    <AvatarImage src={human.avatar_url} alt={human.full_name} />
                    <AvatarFallback>{human.full_name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base leading-none flex items-center gap-1">
                            {human.full_name}
                            {human.verification_status === 'verified' && <VerificationBadge />}
                        </h3>
                        <span className="text-sm font-mono text-primary font-bold">
                            ${human.rate_hourly}/hr
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">@{human.handle}</p>
                </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4 pt-2">
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                    {human.bio}
                </p>

                <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <MapPin className="w-3 h-3" />
                    {human.city}, {human.country}
                    {human.is_remote_ok && <Badge variant="secondary" className="ml-auto text-[10px] h-5 px-1.5 bg-green-500/10 text-green-500 hover:bg-green-500/20">Remote OK</Badge>}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                    {human.skills.slice(0, 3).map((skill: string) => (
                        <Badge key={skill} variant="outline" className="text-[10px] bg-background/50 border-border/50 text-muted-foreground">
                            {skill}
                        </Badge>
                    ))}
                    {human.skills.length > 3 && (
                        <Badge variant="outline" className="text-[10px] bg-background/50 border-border/50 text-muted-foreground">+{human.skills.length - 3}</Badge>
                    )}
                </div>
            </CardContent>
            <CardFooter className="pt-2 pb-4">
                <div className="flex w-full gap-2">
                    <Link href={`/humans/${human.id}`} className="flex-1">
                        <Button variant="secondary" className="w-full text-xs h-8">View Profile</Button>
                    </Link>
                    <Button className="flex-1 text-xs h-8">Message</Button>
                </div>
            </CardFooter>
        </Card>
    )
}
