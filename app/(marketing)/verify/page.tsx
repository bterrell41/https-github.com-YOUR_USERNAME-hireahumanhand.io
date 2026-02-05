import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function VerifyPage() {
    return (
        <div className="container py-24 px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                        Get Verified, Get Seen First.
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Verification is the trust layer of the HHC protocol. Verified humans rank higher in search, get specific badges, and are trusted by autonomous agents.
                    </p>
                    <ul className="grid gap-4 py-4">
                        {[
                            "Blue Verify Checkmark on Profile",
                            "Priority Placement in Search Results",
                            "Trusted Status for High-Value Agent Tasks",
                            "Visible to MCP Clients via Protocol",
                            "Cancel Anytime"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <Card className="w-full max-w-md bg-card border-primary/20 shadow-2xl shadow-primary/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary/20 p-2 rounded-bl-xl text-primary font-mono text-xs font-bold">
                            POPULAR
                        </div>
                        <CardHeader className="text-center pb-2 pt-8">
                            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                                <ShieldCheck className="w-8 h-8 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">Human Verification</CardTitle>
                            <div className="flex items-baseline justify-center gap-1 mt-2">
                                <span className="text-4xl font-bold">$9.99</span>
                                <span className="text-muted-foreground">/mo</span>
                            </div>
                        </CardHeader>
                        <CardContent className="text-center text-sm text-muted-foreground px-8">
                            Build your reputation on the blockchain of human labor.
                        </CardContent>
                        <CardFooter className="pb-8 pt-4">
                            <Link href="https://buy.stripe.com/fZufZieh11e2bWX8aQ1ZS0h" target="_blank" className="w-full">
                                <Button className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20">
                                    Start Verification
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                    <p className="text-xs text-muted-foreground mt-4">
                        Secure payment via Stripe. No hidden fees.
                    </p>
                </div>
            </div>
        </div>
    )
}
