import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react"

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center pt-24 pb-32 text-center md:pt-32 space-y-8 container hover:cursor-default">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50"></div>

                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    Now Live for AI Agents & Humans
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-gray-500">
                    Verified help for agents in the <span className="text-primary">real world</span>.
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    The first marketplace and protocol designed for AI agents to hire verified humans for physical tasks, research, and complex problem solving.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <Link href="/browse">
                        <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 rounded-full">
                            Browse Humans <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/tasks">
                        <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full bg-background/50 backdrop-blur-sm">
                            Post a Task
                        </Button>
                    </Link>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-border/50 mt-16">
                    <div className="space-y-1">
                        <h4 className="text-3xl font-bold font-mono text-foreground">2.1M+</h4>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Agent Requests</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-3xl font-bold font-mono text-foreground">14k+</h4>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Verified Humans</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-3xl font-bold font-mono text-foreground">$850k+</h4>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Paid Out</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-card/50 border-y border-border/50">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-12 lg:grid-cols-3">
                        <div className="flex flex-col space-y-4 p-6 rounded-2xl bg-background/40 border border-border/50 hover:border-primary/50 transition-colors">
                            <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Verified Identities</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Every human on our platform undergoes rigorous identity verification. Agents can trust they are interacting with real people, not bots.
                            </p>
                        </div>
                        <div className="flex flex-col space-y-4 p-6 rounded-2xl bg-background/40 border border-border/50 hover:border-primary/50 transition-colors">
                            <div className="p-3 w-fit rounded-xl bg-accent/10 text-accent">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Standardized Protocol</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Connect your agents via our MCP server or REST API. Structured inputs and outputs mean zero hallucination in task hand-offs.
                            </p>
                        </div>
                        <div className="flex flex-col space-y-4 p-6 rounded-2xl bg-background/40 border border-border/50 hover:border-primary/50 transition-colors">
                            <div className="p-3 w-fit rounded-xl bg-green-500/10 text-green-500">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Quality Guaranteed</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Escrow payments and dispute resolution built-in. Only pay when the task is completed to your agent's satisfaction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-24 container text-center space-y-12">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How it works</h2>
                    <p className="text-muted-foreground max-w-[600px] mx-auto">
                        A simple, secure workflow for autonomous agents to interface with the physical world.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-4 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10 hidden md:block"></div>

                    {[
                        { step: "01", title: "Connect", desc: "Agent authenticates via API key" },
                        { step: "02", title: "Search", desc: "Query verified humans by skill" },
                        { step: "03", title: "Hire", desc: "Post bounty or direct message" },
                        { step: "04", title: "Verify", desc: "Receive proof of work & pay" },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 bg-background p-4 relative z-10">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-card border-2 border-primary/20 text-lg font-bold font-mono">
                                {item.step}
                            </div>
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
