import { Skeleton } from '@/app/_components/ui/skeleton'
import { ReactNode } from 'react'

export const SummaryCardIcon = ({ children }: { children: ReactNode }) => {
    return (
        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-slate-500 bg-opacity-10 text-slate-500">
            {children}
        </div>
    )
}

export const SummaryCardTitle = ({ children }: { children: ReactNode }) => {
    return <p className="text-sm font-medium text-slate-500">{children}</p>
}

export const SummaryCardValue = ({ children }: { children: ReactNode }) => {
    return <p className="text-2xl font-semibold text-slate-900">{children}</p>
}

export const SummaryCard = ({ children }: { children: ReactNode }) => {
    return <div className="rounded-xl bg-white p-6">{children}</div>
}

export const SummaryCardSkeleton = () => {
    return (
        <div className="space-y-2 rounded-xl bg-white p-6">
            <Skeleton className="flex h-9 w-9 rounded-md bg-gray-200" />
            <Skeleton className="h-5 w-[40%] max-w-[86.26px] rounded-md bg-gray-200" />
            <Skeleton className="h-8 w-[20%] min-w-[30px] rounded-md bg-gray-200" />
        </div>
    )
}
