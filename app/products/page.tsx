import { DataTable } from '../_components/ui/data-table'
import { productsColums } from './_components/table-columns'
import CreateProductButton from './_components/create-product-button'

import { getProducts } from '../_data-access/product/get-products'

const ProductsPage = async () => {
    const products = await getProducts()
    return (
        <div className="roundend-lg m-8 w-full space-y-8 bg-white px-8 py-8">
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-500">
                        Gestão de produtos
                    </span>
                    <h1 className="text-xl font-semibold">Produtos</h1>
                </div>

                <div className="self-end">
                    <CreateProductButton />
                </div>
            </div>

            <DataTable columns={productsColums} data={products} />
        </div>
    )
}

export default ProductsPage
