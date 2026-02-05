import { getHumans } from "@/lib/humans"
import { HumanCard } from "@/components/features/humans/HumanCard"
import { BrowseFilters } from "./BrowseFilters"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function BrowsePage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams
    const query = typeof searchParams.query === 'string' ? searchParams.query : undefined
    const maxRate = typeof searchParams.maxRate === 'string' ? parseInt(searchParams.maxRate) : undefined
    const skill = typeof searchParams.skill === 'string' ? searchParams.skill : undefined

    const humans = await getHumans({ query, maxRate, skill })

    return (
        <div className="container py-12">
            <div className="flex flex-col space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Browse Humans</h1>
                <p className="text-muted-foreground max-w-2xl">
                    Find verified humans for your agent's tasks. Filter by skill, rate, or verify their identity on-chain.
                </p>
            </div>

            <BrowseFilters />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {humans.map((human) => (
                    <HumanCard key={human.id} human={human} />
                ))}
            </div>

            {humans.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No humans found matching your criteria.
                </div>
            )}
        </div>
    )
}
