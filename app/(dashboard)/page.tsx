import {
    CircleDollarSign,
    DollarSignIcon,
    Package,
    ShoppingBasketIcon,
} from 'lucide-react'
import Header, {
    HeaderLeft,
    HeaderSubtitle,
    HeaderTitle,
} from '../_components/header'
import {
    SummaryCard,
    SummaryCardIcon,
    SummaryCardTitle,
    SummaryCardValue,
} from './_components/summary-card'
import { getDashboard } from '../_data-access/dashboard/get-dashboard'
import { formatCurrency } from '../_helpers/currency'
import RevenueChart from './_components/revenue-chart'
import MostSoldProductItem from './_components/most-sold-product-item'

const Home = async () => {
    const {
        totalRevenue,
        todayRevenue,
        totalSales,
        totalStock,
        totalProducts,
        totalLast14DaysRevenue,
        mostSoldProducts,
    } = await getDashboard()
    return (
        <div className="m-8 flex w-full flex-col space-y-8 rounded-lg px-8 py-8">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>Dashboard</HeaderSubtitle>
                    <HeaderTitle>Dashboard</HeaderTitle>
                </HeaderLeft>
            </Header>
            <div className="grid grid-cols-2 gap-6">
                <SummaryCard>
                    <SummaryCardIcon>
                        <DollarSignIcon />
                    </SummaryCardIcon>
                    <SummaryCardTitle>Receita Total</SummaryCardTitle>
                    <SummaryCardValue>
                        {formatCurrency(totalRevenue)}
                    </SummaryCardValue>
                </SummaryCard>
                <SummaryCard>
                    <SummaryCardIcon>
                        <DollarSignIcon />
                    </SummaryCardIcon>
                    <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
                    <SummaryCardValue>
                        {formatCurrency(todayRevenue)}
                    </SummaryCardValue>
                </SummaryCard>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <SummaryCard>
                    <SummaryCardIcon>
                        <CircleDollarSign />
                    </SummaryCardIcon>
                    <SummaryCardTitle>Vendas totais</SummaryCardTitle>
                    <SummaryCardValue>{totalSales}</SummaryCardValue>
                </SummaryCard>
                <SummaryCard>
                    <SummaryCardIcon>
                        <Package />
                    </SummaryCardIcon>
                    <SummaryCardTitle>Total em estoque</SummaryCardTitle>
                    <SummaryCardValue>{totalStock}</SummaryCardValue>
                </SummaryCard>
                <SummaryCard>
                    <SummaryCardIcon>
                        <ShoppingBasketIcon />
                    </SummaryCardIcon>
                    <SummaryCardTitle>Produtos</SummaryCardTitle>
                    <SummaryCardValue>{totalProducts}</SummaryCardValue>
                </SummaryCard>
            </div>

            <div className="grid min-h-0 grid-cols-3 gap-6">
                <div className="col-span-2 flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
                    <p className="text-lg font-semibold text-slate-900">
                        Receita
                    </p>
                    <p className="text-sm text-slate-400">Últimos 14 dias</p>
                    <RevenueChart data={totalLast14DaysRevenue} />
                </div>

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
