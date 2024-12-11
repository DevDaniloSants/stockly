import { ComboboxOptions } from '../_components/ui/combobox'
import { getProducts } from '../_data-access/product/get-products'
import CreateSaleButton from './_components/create-sale-button'

const SalesPage = async () => {
    const products = await getProducts()
    const productOptions: ComboboxOptions[] = products.map((product) => {
        return {
            value: product.id,
            label: product.name,
        }
    })
    return (
        <div className="roundend-lg m-8 w-full space-y-8 bg-white px-8 py-8">
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-500">
                        Gestão de vendas
                    </span>
                    <h1 className="text-xl font-semibold">Vendas</h1>
                </div>
                <CreateSaleButton
                    productOptions={productOptions}
                    products={products}
                />
            </div>

            {/* <DataTable columns={productsColums} data={products} /> */}
        </div>
    )
}

export default SalesPage
