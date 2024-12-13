'use server'

import { db } from '@/app/_lib/prisma'
import { createSaleSchame, CreateSaleSchema } from './schema'
import { revalidatePath } from 'next/cache'

export const createSale = async (data: CreateSaleSchema) => {
    createSaleSchame.parse(data)

    await db.$transaction(async (trx) => {
        const sale = await trx.sale.create({
            data: {
                date: new Date(),
            },
        })

        for (const product of data.products) {
            const productFromDb = await db.product.findUnique({
                where: {
                    id: product.id,
                },
            })

            if (!productFromDb) {
                throw new Error('Product is out of stock')
            }

            const productIsOutOfStock = product.quantity > productFromDb.stock

            if (productIsOutOfStock) {
                throw new Error('Product quantity is greater than stock')
            }

            await trx.saleProducts.create({
                data: {
                    saleId: sale.id,
                    productId: product.id,
                    quantity: product.quantity,
                    unitPrice: productFromDb.price,
                },
            })

            await trx.product.update({
                where: {
                    id: product.id,
                },
                data: {
                    stock: {
                        decrement: product.quantity,
                    },
                },
            })

            revalidatePath('/sales')
        }
    })
}
