import { formatCurrency } from '@/app/_helpers/currency'
import { DollarSignIcon } from 'lucide-react'
import {
    SummaryCard,
    SummaryCardIcon,
    SummaryCardTitle,
    SummaryCardValue,
} from './summary-card'
import { getTotalRevenue } from '@/app/_data-access/dashboard/get-total-revenue'

const TotalRevenueCard = async () => {
    const totalRevenue = await getTotalRevenue()

    return (
        <SummaryCard>
            <SummaryCardIcon>
                <DollarSignIcon />
            </SummaryCardIcon>
            <SummaryCardTitle>Receita Total</SummaryCardTitle>
            <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
        </SummaryCard>
    )
}

export default TotalRevenueCard
