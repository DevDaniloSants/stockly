import { db } from '@/app/_lib/prisma'

import { ProductStatusDto } from '../product/get-products'

export interface MostSoldProductDto {
    name: string
    totalSold: number
    productId: string
    price: number
    status: ProductStatusDto
}

interface DashboardDto {
    mostSoldProducts: MostSoldProductDto[]
}

export const getDashboard = async (): Promise<DashboardDto> => {
    const mostSoldProductQuery = `
    SELECT "Product"."name", SUM("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."id" as "productId", "Product"."stock"
    FROM "SaleProduct"
    JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
    GROUP BY "Product"."name", "Product"."price", "Product"."id", "Product"."stock"
    ORDER BY "totalSold" DESC
    LIMIT 5;
    `

    const mostSoldProductsPromise = db.$queryRawUnsafe<
        {
            name: string
            totalSold: number
            productId: string
            price: number
            stock: number
        }[]
    >(mostSoldProductQuery)

    const [mostSoldProducts] = await Promise.all([mostSoldProductsPromise])

    return JSON.parse(
        JSON.stringify({
            mostSoldProducts: mostSoldProducts.map((product) => {
                return {
                    ...product,
                    price: Number(product.price),
                    totalSold: Number(product.totalSold),
                    status: product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
                }
            }),
        })
    )
}
