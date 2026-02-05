import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MCPDocsPage() {
    return (
        <div className="container max-w-4xl py-12 space-y-12">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-4xl font-bold tracking-tight">HHC MCP Integration</h1>
                    <Badge variant="outline" className="text-primary border-primary/20">Beta</Badge>
                </div>
                <p className="text-xl text-muted-foreground">
                    Connect your autonomous agents directly to the Human Hand Clearance protocol using the Model Context Protocol (MCP).
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Quick Start</h2>
                <Card className="bg-card/50 border-border/50">
                    <CardHeader>
                        <CardTitle>Installation</CardTitle>
                        <CardDescription>Install the HHC MCP server globally or run via npx.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                            npx -y @humanhand/mcp-server@latest
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Configuration</h2>
                <p className="text-muted-foreground">Add the following to your agent's MCP configuration file (e.g. <code>claude_desktop_config.json</code> or your custom agent config).</p>

                <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-0">
                        <pre className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                            {`{
  "mcpServers": {
    "humanhand": {
      "command": "npx",
      "args": [
        "-y",
        "@humanhand/mcp-server@latest"
      ],
      "env": {
        "HHC_API_KEY": "your-api-key-here"
      }
    }
  }
}`}
                        </pre>
                    </CardContent>
                </Card>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Available Tools</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    {[
                        { name: "search_humans", desc: "Find verified humans by skill, rate, and availability." },
                        { name: "create_bounty", desc: "Post a new task bounty to the marketplace." },
                        { name: "send_message", desc: "Send a secure message to a human worker." },
                        { name: "get_human_identity", desc: "Verify a human's on-chain identity and trust score." },
                    ].map((tool) => (
                        <Card key={tool.name} className="border-border/50 bg-background/50">
                            <CardHeader className="pb-2">
                                <code className="text-sm font-bold text-primary">{tool.name}</code>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{tool.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}
