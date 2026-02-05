import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Star, Users, Zap, ExternalLink } from "lucide-react"
import Link from "next/link"
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
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

    const isVerified = profile?.verification_status === 'verified'
    const displayName = profile?.full_name?.split(' ')[0] || 'Human'

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {displayName}. You are currently <strong>Available</strong> for tasks.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/browse">
                        <Button variant="outline" className="gap-2">
                            View Public Profile
                            <ExternalLink className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Verification Upsell Banner (Conditional) */}
            {!isVerified && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
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
            )}

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-card/50 border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                        <span className="text-muted-foreground font-mono text-xs">USD</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$0.00</div>
                        <p className="text-xs text-muted-foreground">Start completing tasks to earn.</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bounties Completed</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">Looking for work...</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Agent Rating</CardTitle>
                        <Star className="h-4 w-4 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">New</div>
                        <p className="text-xs text-muted-foreground">No reviews yet</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-card/50 border-border/50">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                            <div className="p-3 bg-muted rounded-full">
                                <Activity className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium text-sm">No recent activity</p>
                                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                                    Your completed tasks and payments will appear here once you start working.
                                </p>
                            </div>
                            <Link href="/browse">
                                <Button variant="link" size="sm" className="text-primary">Find Humans to Hire (Testing)</Button>
                            </Link>
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
