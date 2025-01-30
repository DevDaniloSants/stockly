import { Skeleton } from '@/app/_components/ui/skeleton'

const MostSoldProductsSkeleton = () => {
    return (
        <div className="col-span-2 flex h-full flex-col overflow-hidden rounded-xl bg-white p-6 md:col-span-2 lg:col-span-1">
            <Skeleton className="mb-10 h-8 w-[80%] max-w-48 bg-gray-200 px-6" />
            <div className="space-y-7">
                <div className="flex items-center justify-between">
                    <div className="w-full space-y-4">
                        <Skeleton className="h-5 w-[60%] max-w-20 bg-gray-200" />
                        <Skeleton className="h-5 w-[80%] max-w-28 bg-gray-200" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-5 w-24 rounded-xl bg-gray-200" />
                        <Skeleton className="h-4 w-24 bg-gray-200" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="w-full space-y-4">
                        <Skeleton className="h-5 w-[60%] max-w-20 bg-gray-200" />
                        <Skeleton className="h-5 w-[80%] max-w-28 bg-gray-200" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-5 w-24 rounded-xl bg-gray-200" />
                        <Skeleton className="h-4 w-24 bg-gray-200" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="w-full space-y-4">
                        <Skeleton className="h-5 w-[60%] max-w-20 bg-gray-200" />
                        <Skeleton className="h-5 w-[80%] max-w-28 bg-gray-200" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-5 w-24 rounded-xl bg-gray-200" />
                        <Skeleton className="h-4 w-24 bg-gray-200" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="w-full space-y-4">
                        <Skeleton className="h-5 w-[60%] max-w-20 bg-gray-200" />
                        <Skeleton className="h-5 w-[80%] max-w-28 bg-gray-200" />
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
