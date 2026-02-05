import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="border-t border-border/50 bg-background/50">
            <div className="container flex flex-col md:flex-row items-center justify-between py-8 gap-4">
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Human Hand Clearance. All rights reserved.
                </div>
                <nav className="flex items-center gap-6 text-sm text-muted-foreground">
                    <Link href="/about" className="hover:text-primary">About</Link>
                    <Link href="/terms" className="hover:text-primary">Terms</Link>
                    <Link href="/privacy" className="hover:text-primary">Privacy</Link>
                    <Link href="/api-docs" className="hover:text-primary">API</Link>
                </nav>
            </div>
        </footer>
    )
}
