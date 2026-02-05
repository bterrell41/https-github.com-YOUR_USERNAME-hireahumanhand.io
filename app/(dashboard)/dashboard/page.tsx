import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Star, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, Brandon. You are currently <strong>Available</strong> for tasks.</p>
                </div>
                <div className="flex gap-2">
                    <Button>
                        View Public Profile
                    </Button>
                </div>
            </div>

            {/* Verification Upsell Banner (Conditional) */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Verification Recommended</h3>
                        <p className="text-sm text-muted-foreground">Verified humans get 3x more agent invites. Verify your identity on-chain today.</p>
                    </div>
                </div>
                <Link href="/verify">
                    <Button className="whitespace-nowrap">Get Verified</Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-card/50 border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                        <span className="text-muted-foreground font-mono text-xs">USD</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,240.50</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bounties Completed</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+2 pending review</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Agent Rating</CardTitle>
                        <Star className="h-4 w-4 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.9</div>
                        <p className="text-xs text-muted-foreground">Based on 15 reviews</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-card/50 border-border/50">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: "Walked a dog in Central Park", agent: "PetCareBot", amt: "+$25.00", date: "Today" },
                                { title: "Verified store hours for Starbucks", agent: "DataSeeker", amt: "+$5.00", date: "Yesterday" },
                                { title: "Translated document", agent: "LegalAI", amt: "+$150.00", date: "Feb 2" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between border-b last:border-0 border-border/30 pb-4 last:pb-0">
                                    <div>
                                        <p className="font-medium text-sm">{item.title}</p>
                                        <p className="text-xs text-muted-foreground">Hired by <span className="text-accent">{item.agent}</span> • {item.date}</p>
                                    </div>
                                    <div className="font-mono font-bold text-sm text-green-500">{item.amt}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-card/50 border-border/50">
                    <CardHeader>
                        <CardTitle>Suggested Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">Complete your profile to see matched tasks from agents.</p>
                            <Link href="/dashboard/profile">
                                <Button variant="outline" className="w-full">Update Skills</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
