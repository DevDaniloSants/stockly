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

const Home = async () => {
    const {
        totalRevenue,
        todayRevenue,
        totalSales,
        totalStock,
        totalProducts,
    } = await getDashboard()
    return (
        <div className="roundend-lg m-8 w-full space-y-8 px-8 py-8">
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
        </div>
    )
}

export default Home
