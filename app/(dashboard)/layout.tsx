import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/shared/Logo"
import { LayoutDashboard, MessageSquare, User, CreditCard, LogOut, Settings, Activity } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar - Desktop */}
            <aside className="hidden w-64 border-r border-border/50 bg-card/30 md:flex flex-col">
                <div className="flex h-16 items-center px-6 border-b border-border/50">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>

                <div className="flex-1 py-6 px-4 space-y-2">
                    <h4 className="px-2 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">Menu</h4>

                    <Link href="/dashboard">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-primary hover:bg-primary/10">
                            <LayoutDashboard className="w-4 h-4" />
                            Overview
                        </Button>
                    </Link>

                    <Link href="/dashboard/leads">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-primary hover:bg-primary/10">
                            <Activity className="w-4 h-4" />
                            Live Leads
                        </Button>
                    </Link>

                    <Link href="/dashboard/profile">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-primary hover:bg-primary/10">
                            <User className="w-4 h-4" />
                            Profile & Skills
                        </Button>
                    </Link>

                    <Link href="/dashboard/messages">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-primary hover:bg-primary/10">
                            <MessageSquare className="w-4 h-4" />
                            Messages
                        </Button>
                    </Link>

                    <Link href="/dashboard/settings">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-primary hover:bg-primary/10">
                            <CreditCard className="w-4 h-4" />
                            Verification & Plan
                        </Button>
                    </Link>
                </div>

                <div className="p-4 border-t border-border/50">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <Avatar className="w-8 h-8 rounded-lg">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Brandon" />
                            <AvatarFallback>BT</AvatarFallback>
                        </Avatar>
                        <div className="text-xs">
                            <p className="font-bold">Brandon T.</p>
                            <p className="text-muted-foreground">Human Verified</p>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:border-destructive/50">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="flex h-16 items-center justify-between px-6 border-b border-border/50 bg-background/50 backdrop-blur-sm md:hidden">
                    <Logo />
                    {/* Mobile Menu Trigger would go here */}
                </header>
                <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    )
}
