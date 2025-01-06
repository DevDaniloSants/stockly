import { Skeleton } from '@/app/_components/ui/skeleton'

const MostSoldProductsSkeleton = () => {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
            <Skeleton className="mb-10 h-8 w-64 bg-gray-200 px-6" />
            <div className="space-y-7">
                <div className="flex items-center justify-between">
                    <div className="space-y-4">
                        <Skeleton className="h-5 w-20 bg-gray-200" />
                        <Skeleton className="h-5 w-28 bg-gray-200" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-5 w-24 rounded-xl bg-gray-200" />
                        <Skeleton className="h-4 w-24 bg-gray-200" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-4">
                        <Skeleton className="h-5 w-20 bg-gray-200" />
                        <Skeleton className="h-5 w-28 bg-gray-200" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-5 w-24 rounded-xl bg-gray-200" />
                        <Skeleton className="h-4 w-24 bg-gray-200" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-4">
                        <Skeleton className="h-5 w-20 bg-gray-200" />
                        <Skeleton className="h-5 w-28 bg-gray-200" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-5 w-24 rounded-xl bg-gray-200" />
                        <Skeleton className="h-4 w-24 bg-gray-200" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-4">
                        <Skeleton className="h-5 w-20 bg-gray-200" />
                        <Skeleton className="h-5 w-28 bg-gray-200" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-5 w-24 rounded-xl bg-gray-200" />
                        <Skeleton className="h-4 w-24 bg-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MostSoldProductsSkeleton
