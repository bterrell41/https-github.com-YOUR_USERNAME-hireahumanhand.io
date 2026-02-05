import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/shared/Logo"

export const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <Logo />
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <Link href="/browse" className="transition-colors hover:text-primary">
                            Browse Humans
                        </Link>
                        <Link href="/tasks" className="transition-colors hover:text-primary">
                            Task Bounties
                        </Link>
                        <Link href="/mcp" className="transition-colors hover:text-primary text-muted-foreground">
                            For Agents
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/verify">
                        <Button variant="outline" className="text-accent hover:text-accent hover:bg-accent/10 border-accent/20">
                            Get Verified
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button>Dashboard</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
