import 'server-only'

import { db } from '@/app/_lib/prisma'
import { Product } from '@prisma/client'
import { unstable_cache } from 'next/cache'

export const getProducts = async (): Promise<Product[]> => {
    const products = await db.product.findMany({})
    const serializedProducts = JSON.parse(JSON.stringify(products))

    return serializedProducts
}

export const cachedGetProducts = unstable_cache(getProducts, ['get-products'], {
    revalidate: 5,
})
