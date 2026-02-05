"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export const TaskFilters = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(searchParams.get("query") || "")
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
    const [category, setCategory] = useState(searchParams.get("category") || "All")

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (query) params.set("query", query)
        if (minPrice) params.set("minPrice", minPrice)
        if (category && category !== 'All') params.set("category", category)

        router.push(`/tasks?${params.toString()}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch()
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-xl bg-card border border-border/50">
            <div className="relative flex-[2]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                    placeholder="Search task title..."
                    className="pl-9 bg-background/50 border-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="w-full md:w-48">
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-background/50 border-input">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="Photography">Photography</SelectItem>
                        <SelectItem value="Logistics">Logistics</SelectItem>
                        <SelectItem value="Translation">Translation</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full md:w-32">
                <Input
                    type="number"
                    placeholder="Min Price"
                    className="bg-background/50 border-input"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <Button onClick={handleSearch} className="md:w-32">
                Search
            </Button>
        </div>
    )
}
