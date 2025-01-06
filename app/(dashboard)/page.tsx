import Header, {
    HeaderLeft,
    HeaderSubtitle,
    HeaderTitle,
} from '../_components/header'
import { getDashboard } from '../_data-access/dashboard/get-dashboard'

import MostSoldProductItem from './_components/most-sold-product-item'
import TotalRevenueCard from './_components/total-revenue-card'
import { Suspense } from 'react'
import TodayRevenueCard from './_components/today-revenue-card'
import TotalSalesCard from './_components/total-sales-card'
import TotalStockCard from './_components/total-stock-card'
import TotalProductsCard from './_components/total-products-card'
import { SummaryCardSkeleton } from './_components/summary-card'
import Last14DaysRevenueCard from './_components/last-14-days-revenue-card'
import { Skeleton } from '../_components/ui/skeleton'

const Home = async () => {
    const { mostSoldProducts } = await getDashboard()
    return (
        <div className="m-8 flex w-full flex-col space-y-8 rounded-lg px-8 py-8">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>Dashboard</HeaderSubtitle>
                    <HeaderTitle>Dashboard</HeaderTitle>
                </HeaderLeft>
            </Header>
            <div className="grid grid-cols-2 gap-6">
                <Suspense fallback={<SummaryCardSkeleton />}>
                    <TotalRevenueCard />
                </Suspense>
                <Suspense fallback={<SummaryCardSkeleton />}>
                    <TodayRevenueCard />
                </Suspense>
            </div>
            <div className="grid grid-cols-3 gap-6">
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

            <div className="grid min-h-0 grid-cols-3 gap-6">
                <Suspense
                    fallback={
                        <Skeleton className="col-span-2 rounded-xl bg-white" />
                    }
                >
                    <Last14DaysRevenueCard />
                </Suspense>

                <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
                    <p className="px-6 pt-6 text-lg font-semibold text-slate-900">
                        Produtos mais vendidos
                    </p>
                    <div className="space-y-4 overflow-y-auto p-6">
                        {mostSoldProducts.map((product) => (
                            <MostSoldProductItem
                                key={product.productId}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
