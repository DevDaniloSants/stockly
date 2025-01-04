import { ProductStatusDto } from '../_data-access/product/get-products'
import { Badge } from './ui/badge'

const getStatusLabel = (status: string) => {
    if (status === 'IN_STOCK') {
        return 'Em estoque'
    }

    return 'Fora de estoque'
}

interface ProductStatusBadgeProps {
    status: ProductStatusDto
}

const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
    const label = getStatusLabel(status)
    if (status === 'IN_STOCK') {
        return (
            <Badge
                variant={`${label === 'Em estoque' ? 'default' : 'outline'}`}
            >
                Em estoque
            </Badge>
        )
    }

    return (
        <Badge
            variant={`${label === 'Fora de estoque' ? 'outline' : 'default'}`}
        >
            Fora de estoque
        </Badge>
    )
}

export default ProductStatusBadge
