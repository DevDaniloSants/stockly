import { Skeleton } from '@/app/_components/ui/skeleton'

const SummaryCardSkeleton = () => {
    return (
        <Skeleton className="space-y-2 rounded-xl bg-white p-6">
            <Skeleton className="flex h-9 w-9 rounded-md bg-slate-100" />
            <Skeleton className="h-4 w-[250px] bg-slate-100" />
            <Skeleton className="h-4 w-[250px] bg-slate-100" />
        </Skeleton>
    )
}

export default SummaryCardSkeleton
