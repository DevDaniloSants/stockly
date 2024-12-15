import { db } from '@/app/_lib/prisma'

export interface SaleDto {
    id: string
    productsName: string
    totalProducts: number
    totalAmount: number
    date: Date
}

export const getSales = async (): Promise<SaleDto[]> => {
    const sales = await db.sale.findMany({
        include: { SaleProducts: { include: { product: true } } },
    })

    return sales.map((sale) => {
        return {
            id: sale.id,
            productsName: sale.SaleProducts.map(
                (saleProduct) => saleProduct.product.name
            ).join(' • '),
            totalProducts: sale.SaleProducts.reduce(
                (acc, saleProduct) => acc + saleProduct.quantity,
                0
            ),
            totalAmount: sale.SaleProducts.reduce(
                (acc, saleProduct) =>
                    acc + saleProduct.quantity * Number(saleProduct.unitPrice),
                0
            ),
            date: sale.date,
        }
    })
}
