import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, CreditCard, Shield, AlertTriangle } from "lucide-react"
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function SettingsPage() {
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

    return (
        <div className="space-y-8">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Verification & Plan</h1>
                <p className="text-muted-foreground">Manage your identity verification and subscription status.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">

                {/* Verification Status */}
                <Card className={`border-primary/20 ${isVerified ? 'bg-primary/5' : 'bg-card/50'}`}>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className={`h-5 w-5 ${isVerified ? 'text-primary' : 'text-muted-foreground'}`} />
                            <CardTitle>Verification Status</CardTitle>
                        </div>
                        <CardDescription>Your current identity status on the protocol.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isVerified ? (
                            <div className="flex items-center gap-4 p-4 border border-primary/20 bg-primary/10 rounded-lg">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Verified Human</h4>
                                    <p className="text-sm text-muted-foreground">Tier: <span className="text-primary font-mono uppercase">{profile.verification_tier || 'basic'}</span></p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 p-4 border border-yellow-500/20 bg-yellow-500/10 rounded-lg">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Not Verified</h4>
                                    <p className="text-sm text-muted-foreground">Verify to unlock more jobs.</p>
                                </div>
                            </div>
                        )}

                        <ul className="space-y-2 text-sm">
                            <li className={`flex items-center gap-2 ${isVerified ? '' : 'text-muted-foreground/50'}`}>
                                <CheckCircle2 className={`h-4 w-4 ${isVerified ? 'text-primary' : ''}`} />
                                <span>Visible to HHC Protocol Agents</span>
                            </li>
                            <li className={`flex items-center gap-2 ${isVerified ? '' : 'text-muted-foreground/50'}`}>
                                <CheckCircle2 className={`h-4 w-4 ${isVerified ? 'text-primary' : ''}`} />
                                <span>Priority Ranking in Search</span>
                            </li>
                            <li className={`flex items-center gap-2 ${isVerified ? '' : 'text-muted-foreground/50'}`}>
                                <CheckCircle2 className={`h-4 w-4 ${isVerified ? 'text-primary' : ''}`} />
                                <span>Blue Checkmark Badge</span>
                            </li>
                        </ul>
                    </CardContent>
                    {!isVerified && (
                        <CardFooter>
                            <Link href="/verify" className="w-full">
                                <Button className="w-full">Get Verified Now</Button>
                            </Link>
                        </CardFooter>
                    )}
                </Card>

                {/* Subscription Plan */}
                <Card className="bg-card/50 border-border/50">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Subscription</CardTitle>
                        </div>
                        <CardDescription>Manage your billing details via Stripe.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Human Hand Clearance Pro</p>
                                <p className="text-sm text-muted-foreground">$9.99 / month</p>
                            </div>
                            {isVerified ?
                                <Badge variant="outline" className="border-green-500/50 text-green-500">Active</Badge>
                                :
                                <Badge variant="outline" className="border-muted text-muted-foreground">Inactive</Badge>
                            }
                        </div>
                        {isVerified && (
                            <div className="text-sm text-muted-foreground">
                                Status: <strong>Active</strong>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="border-t border-border/50 pt-4">
                        <Link href="/verify" className="w-full">
                            <Button variant="outline" className="w-full">Manage Subscription</Button>
                        </Link>
                    </CardFooter>
                </Card>

            </div>
        </div>
    )
}
