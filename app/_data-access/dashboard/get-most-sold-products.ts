import 'server-only'

import { db } from '@/app/_lib/prisma'

import { ProductStatusDto } from '../product/get-products'

export interface MostSoldProductDto {
    name: string
    totalSold: number
    productId: string
    price: number
    status: ProductStatusDto
}

export const getMostSoldProducts = async (): Promise<MostSoldProductDto[]> => {
    const mostSoldProductQuery = `
    SELECT "Product"."name", SUM("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."id" as "productId", "Product"."stock"
    FROM "SaleProduct"
    JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
    GROUP BY "Product"."name", "Product"."price", "Product"."id", "Product"."stock"
    ORDER BY "totalSold" DESC
    LIMIT 5;
    `

    const mostSoldProducts = await db.$queryRawUnsafe<
        {
            name: string
            totalSold: number
            productId: string
            price: number
            stock: number
        }[]
    >(mostSoldProductQuery)

    return mostSoldProducts.map((product) => {
        return {
            ...product,
            price: Number(product.price),
            totalSold: Number(product.totalSold),
            status: product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
        }
    })
}
