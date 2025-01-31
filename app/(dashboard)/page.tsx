import Header, {
    HeaderLeft,
    HeaderSubtitle,
    HeaderTitle,
} from '../_components/header'

import TotalRevenueCard from './_components/total-revenue-card'
import { Suspense } from 'react'
import TodayRevenueCard from './_components/today-revenue-card'
import TotalSalesCard from './_components/total-sales-card'
import TotalStockCard from './_components/total-stock-card'
import TotalProductsCard from './_components/total-products-card'
import { SummaryCardSkeleton } from './_components/summary-card'
import Last14DaysRevenueCard from './_components/last-14-days-revenue-card'
import { Skeleton } from '../_components/ui/skeleton'
import MostSoldProductsCard from './_components/most-sold-products-card'
import MostSoldProductsSkeleton from './_components/most-sold-products-skeleton'

const Home = async () => {
    return (
        <div className="flex w-full max-w-[1200px] flex-col space-y-8 rounded-lg px-8 py-8">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>Dashboard</HeaderSubtitle>
                    <HeaderTitle>Dashboard</HeaderTitle>
                </HeaderLeft>
            </Header>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Suspense fallback={<SummaryCardSkeleton />}>
                    <TotalRevenueCard />
                </Suspense>
                <Suspense fallback={<SummaryCardSkeleton />}>
                    <TodayRevenueCard />
                </Suspense>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Suspense fallback={<SummaryCardSkeleton />}>
                    <TotalSalesCard />
                </Suspense>
                <Suspense fallback={<SummaryCardSkeleton />}>
                    <TotalStockCard />
                </Suspense>
                <Suspense fallback={<SummaryCardSkeleton />}>
                    <TotalProductsCard />
                </Suspense>
            </div>

            <div className="grid min-h-0 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Suspense
                    fallback={
                        <div className="relative h-52 w-full rounded-xl bg-white md:col-span-2 lg:col-span-2">
                            <div className="space-y-2 p-5">
                                <Skeleton className="h-6 w-36 bg-gray-200" />
                                <Skeleton className="h-4 w-44 bg-gray-200" />
                            </div>
                            <Skeleton className="absolute bottom-4 right-6 h-1/2 w-10 bg-gray-200" />
                            <Skeleton className="absolute bottom-4 right-20 h-1/4 w-10 bg-gray-200" />
                            <Skeleton className="absolute bottom-4 right-[136px] h-[15%] w-10 bg-gray-200" />
                        </div>
                    }
                >
                    <Last14DaysRevenueCard />
                </Suspense>
                <Suspense fallback={<MostSoldProductsSkeleton />}>
                    <div className="col-span-2 md:col-span-2 lg:col-span-1">
                        <MostSoldProductsCard />
                    </div>
                </Suspense>
            </div>
        </div>
    )
}

export default Home
