import { DataTable } from '../_components/ui/data-table'
import { productsColums } from './_components/table-columns'
import CreateProductButton from './_components/create-product-button'

import { getProducts } from '../_data-access/product/get-products'
import Header, {
    HeaderLeft,
    HeaderRight,
    HeaderSubtitle,
    HeaderTitle,
} from '../_components/header'

const ProductsPage = async () => {
    const products = await getProducts()
    return (
        <div className="roundend-lg m-8 w-full max-w-[1200px] space-y-8 bg-white p-8">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>Gestão de produtos</HeaderSubtitle>
                    <HeaderTitle>Produtos</HeaderTitle>
                </HeaderLeft>
                <HeaderRight>
                    <CreateProductButton />
                </HeaderRight>
            </Header>

            <div className="overflow-x-auto">
                <DataTable columns={productsColums} data={products} />
            </div>
        </div>
    )
}

export default ProductsPage
