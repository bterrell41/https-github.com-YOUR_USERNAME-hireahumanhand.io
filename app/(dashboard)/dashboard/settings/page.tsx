"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, CreditCard, Shield } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Verification & Plan</h1>
                <p className="text-muted-foreground">Manage your identity verification and subscription status.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">

                {/* Verification Status */}
                <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            <CardTitle>Verification Status</CardTitle>
                        </div>
                        <CardDescription>Your current identity status on the protocol.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 p-4 border border-primary/20 bg-primary/10 rounded-lg">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold">Verified Human</h4>
                                <p className="text-sm text-muted-foreground">Tier: <span className="text-primary font-mono">PRO</span></p>
                            </div>
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                <span>Visible to HHC Protocol Agents</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                <span>Priority Ranking in Search</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                <span>Blue Checkmark Badge</span>
                            </li>
                        </ul>
                    </CardContent>
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
                            <Badge variant="outline" className="border-green-500/50 text-green-500">Active</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Next billing date: <strong>March 14, 2026</strong>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border-border/50 pt-4">
                        <Button variant="outline" className="w-full">Manage Subscription</Button>
                    </CardFooter>
                </Card>

            </div>
        </div>
    )
}
