import { Plus } from 'lucide-react'
import { Button } from '../_components/ui/button'
import { db } from '../_lib/prisma'
import { DataTable } from '../_components/ui/data-table'
import { productsColums } from './_components/table-columns'

const ProductsPage = async () => {
    const products = await db.product.findMany({})
    const serializedProducts = JSON.parse(JSON.stringify(products))

    return (
        <div className="roundend-lg m-8 w-full space-y-8 bg-white px-8 py-8">
            {/* header  */}
            <div className="flex w-full items-center justify-between">
                {/* esquerda */}
                <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-500">
                        Gestão de produtos
                    </span>
                    <h1 className="text-xl font-semibold">Produtos</h1>
                </div>
                {/* direita */}
                <div className="self-end">
                    <Button className="gap-2">
                        <Plus />
                        Novo produto
                    </Button>
                </div>
            </div>
            {/*  table */}
            <DataTable columns={productsColums} data={serializedProducts} />
        </div>
    )
}

export default ProductsPage
