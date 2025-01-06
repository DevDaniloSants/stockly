import { formatCurrency } from '@/app/_helpers/currency'
import { DollarSignIcon } from 'lucide-react'
import {
    SummaryCard,
    SummaryCardIcon,
    SummaryCardTitle,
    SummaryCardValue,
} from './summary-card'

import { getTodayRevenue } from '@/app/_data-access/dashboard/get-today-revenue'

const TodayRevenueCard = async () => {
    const todayRevenue = await getTodayRevenue()

    return (
        <SummaryCard>
            <SummaryCardIcon>
                <DollarSignIcon />
            </SummaryCardIcon>
            <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
            <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
        </SummaryCard>
    )
}

export default TodayRevenueCard
