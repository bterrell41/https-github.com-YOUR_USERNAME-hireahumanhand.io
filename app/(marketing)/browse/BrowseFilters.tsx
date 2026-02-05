"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export const BrowseFilters = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(searchParams.get("query") || "")
    const [maxRate, setMaxRate] = useState(searchParams.get("maxRate") || "")

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (query) params.set("query", query)
        if (maxRate) params.set("maxRate", maxRate)

        // Preserve other filters if needed, or clear them. For MVP simplicity we replace.
        // To preserve, we'd loop searchParams entries.

        router.push(`/browse?${params.toString()}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch()
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-xl bg-card border border-border/50">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                    placeholder="Search by name, skill, or bio..."
                    className="pl-9 bg-background/50 border-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="w-full md:w-48">
                <Input
                    type="number"
                    placeholder="Max Rate ($/hr)"
                    className="bg-background/50 border-input"
                    value={maxRate}
                    onChange={(e) => setMaxRate(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <Button onClick={handleSearch} className="md:w-32">
                Search
            </Button>
        </div>
    )
}
