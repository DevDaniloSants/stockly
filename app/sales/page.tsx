import Header, {
    HeaderLeft,
    HeaderSubtitle,
    HeaderTitle,
    HeaderRight,
} from '../_components/header'
import { ComboboxOptions } from '../_components/ui/combobox'
import { DataTable } from '../_components/ui/data-table'
import { getProducts } from '../_data-access/product/get-products'
import { getSales } from '../_data-access/sale/get-sales'
import UpsertSaleButton from './_components/create-sale-button'
import { saleColumns } from './_components/table-columns'

const SalesPage = async () => {
    const sales = await getSales()
    const products = await getProducts()
    const productOptions: ComboboxOptions[] = products.map((product) => {
        return {
            value: product.id,
            label: product.name,
        }
    })

    const tableData = sales.map((sale) => ({
        ...sale,
        productOptions,
        products,
    }))

    return (
        <div className="roundend-lg m-8 w-full space-y-8 bg-white px-8 py-8">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>Gestão de vendas</HeaderSubtitle>
                    <HeaderTitle>Vendas</HeaderTitle>
                </HeaderLeft>
                <HeaderRight>
                    <UpsertSaleButton
                        productOptions={productOptions}
                        products={products}
                    />
                </HeaderRight>
            </Header>

            <DataTable columns={saleColumns} data={tableData} />
        </div>
    )
}

export default SalesPage
