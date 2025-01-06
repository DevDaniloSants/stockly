import { getMostSoldProducts } from '@/app/_data-access/dashboard/get-most-sold-products'
import MostSoldProductItem from './most-sold-product-item'

const MostSoldProductsCard = async () => {
    const mostSoldProducts = await getMostSoldProducts()
    return (
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
    )
}

export default MostSoldProductsCard
