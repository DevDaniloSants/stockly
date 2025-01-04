import ProductStatusBadge from '@/app/_components/product-status-badge'
import { MostSoldProductDto } from '@/app/_data-access/dashboard/get-dashboard'
import { formatCurrency } from '@/app/_helpers/currency'

interface MostSoldProductProps {
    product: MostSoldProductDto
}

const MostSoldProductItem = ({ product }: MostSoldProductProps) => {
    return (
        <div className="flex items-center justify-between p-2 transition-all duration-500 hover:bg-slate-100">
            <div className="space-y-[6px]">
                <p className="font-semibold text-slate-900">{product.name}</p>
                <p className="font-medium text-slate-500">
                    {formatCurrency(product.price)}
                </p>
            </div>
            <div className="flex flex-col items-end gap-2">
                <ProductStatusBadge status={product.status} />
                <p className="text-sm font-semibold text-slate-900">
                    {product.totalSold} vendido(s)
                </p>
            </div>
        </div>
    )
}

export default MostSoldProductItem
