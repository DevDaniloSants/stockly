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
        <div className="roundend-lg m-8 w-full space-y-8 overflow-auto bg-white px-8 py-8">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>Gestão de produtos</HeaderSubtitle>
                    <HeaderTitle>Produtos</HeaderTitle>
                </HeaderLeft>
                <HeaderRight>
                    <CreateProductButton />
                </HeaderRight>
            </Header>

            <DataTable columns={productsColums} data={products} />
        </div>
    )
}

export default ProductsPage
