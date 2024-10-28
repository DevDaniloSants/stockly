import { Plus } from 'lucide-react'
import { Button } from '../_components/ui/button'

import { DataTable } from '../_components/ui/data-table'
import { productsColums } from './_components/table-columns'

const ProductsPage = async () => {
    const products = await fetch('http://localhost:3000/api/products').then(
        (res) => res.json()
    )

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
                    <Button className="gap-2">
                        <Plus />
                        Novo produto
                    </Button>
                </div>
            </div>

            <DataTable columns={productsColums} data={products} />
        </div>
    )
}

export default ProductsPage
