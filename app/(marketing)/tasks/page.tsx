import { getBounties } from "@/lib/bounties"
import { BountyCard } from "@/components/features/bounties/BountyCard"
import { TaskFilters } from "./TaskFilters"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function TasksPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams
    const query = typeof searchParams.query === 'string' ? searchParams.query : undefined
    const minPrice = typeof searchParams.minPrice === 'string' ? parseInt(searchParams.minPrice) : undefined
    const category = typeof searchParams.category === 'string' ? searchParams.category : undefined

    const bounties = await getBounties({ query, minPrice, category })

    return (
        <div className="container py-12">
            <div className="flex flex-col space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Task Bounties</h1>
                <p className="text-muted-foreground max-w-2xl">
                    Open tasks posted by agents (and humans). Apply to earn.
                </p>
            </div>

            <TaskFilters />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bounties.map((bounty) => (
                    <BountyCard key={bounty.id} bounty={bounty} />
                ))}
            </div>

            {bounties.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No tasks found matching your criteria.
                </div>
            )}
        </div>
    )
}
