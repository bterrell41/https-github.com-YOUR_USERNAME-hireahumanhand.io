import { createServerSupabaseClient } from '@/lib/db/supabase-server'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Bitcoin, ArrowUpRight, ArrowDownLeft, DollarSign } from "lucide-react"
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function PaymentsPage() {
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

    const wallets = profile?.wallet_addresses || {}

    return (
        <div className="space-y-8">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
                <p className="text-muted-foreground">Manage your earnings and payouts.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-primary-foreground/70">Total Earnings</CardDescription>
                        <CardTitle className="text-3xl">$0.00</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">Available for payout</div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-3 bg-card/50 border-border/50">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Connected Wallets</CardTitle>
                                <CardDescription>Payouts are processed automatically to these addresses.</CardDescription>
                            </div>
                            <Link href="/dashboard/profile">
                                <Button variant="outline" size="sm">Manage Wallets</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-background/50">
                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-full">
                                <span className="font-bold text-lg">Ξ</span>
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold text-sm">Ethereum</p>
                                <p className="text-xs text-muted-foreground truncate font-mono">
                                    {wallets.eth || 'Not Connected'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-background/50">
                            <div className="p-3 bg-orange-500/10 text-orange-500 rounded-full">
                                <Bitcoin className="h-5 w-5" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold text-sm">Bitcoin</p>
                                <p className="text-xs text-muted-foreground truncate font-mono">
                                    {wallets.btc || 'Not Connected'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-card/50 border-border/50">
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                        <div className="p-4 bg-muted rounded-full">
                            <DollarSign className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-medium">No transactions yet</p>
                            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                                Once you complete tasks, your earnings and payout confirmations will appear here.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
