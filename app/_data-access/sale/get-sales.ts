import { db } from '@/app/_lib/prisma'

interface SaleProductDto {
    productId: string
    quantity: number
    unitPrice: number
    productName: string
}

export interface SaleDto {
    id: string
    productsName: string
    totalProducts: number
    totalAmount: number
    date: Date
    saleProducts: SaleProductDto[]
}

export const getSales = async (): Promise<SaleDto[]> => {
    const sales = await db.sale.findMany({
        include: { saleProducts: { include: { product: true } } },
    })

    return sales.map((sale) => {
        return {
            id: sale.id,
            productsName: sale.saleProducts
                .map((saleProduct) => saleProduct.product.name)
                .join(' • '),
            totalProducts: sale.saleProducts.reduce(
                (acc, saleProduct) => acc + saleProduct.quantity,
                0
            ),
            totalAmount: sale.saleProducts.reduce(
                (acc, saleProduct) =>
                    acc + saleProduct.quantity * Number(saleProduct.unitPrice),
                0
            ),
            date: sale.date,
            saleProducts: sale.saleProducts.map(
                (saleProduct): SaleProductDto => ({
                    productId: saleProduct.productId,
                    quantity: saleProduct.quantity,
                    unitPrice: Number(saleProduct.unitPrice),
                    productName: saleProduct.product.name,
                })
            ),
        }
    })
}
