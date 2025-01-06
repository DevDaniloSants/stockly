import { Package } from 'lucide-react'
import {
    SummaryCard,
    SummaryCardIcon,
    SummaryCardTitle,
    SummaryCardValue,
} from './summary-card'
import { getTotalStock } from '@/app/_data-access/dashboard/get-total-stock'

const TotalStockCard = async () => {
    const totalStock = await getTotalStock()
    return (
        <SummaryCard>
            <SummaryCardIcon>
                <Package />
            </SummaryCardIcon>
            <SummaryCardTitle>Total em estoque</SummaryCardTitle>
            <SummaryCardValue>{totalStock}</SummaryCardValue>
        </SummaryCard>
    )
}

export default TotalStockCard
