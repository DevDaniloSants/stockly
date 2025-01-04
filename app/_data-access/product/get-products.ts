import 'server-only'

import { db } from '@/app/_lib/prisma'
import { Product } from '@prisma/client'

export type ProductStatusDto = 'IN_STOCK' | 'OUT_OF_STOCK'

export interface ProductDto extends Product {
    status: ProductStatusDto
}

export const getProducts = async (): Promise<ProductDto[]> => {
    const products = (await db.product.findMany({})).map((product) => {
        const status = product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK'
        return {
            ...product,
            status,
        }
    })

    return JSON.parse(JSON.stringify(products))
}
