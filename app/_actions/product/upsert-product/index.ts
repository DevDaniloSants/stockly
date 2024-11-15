'use server'

import { db } from '@/app/_lib/prisma'
import { upsertProductSchema, UpsertProductSchema } from './schemas'
import { revalidatePath } from 'next/cache'

export const upsertProduct = async (data: UpsertProductSchema) => {
    upsertProductSchema.parse(data)

    if (!data.id) {
        const product = await db.product.findFirst({
            where: {
                name: data.name,
            },
        })

        if (product) {
            throw new Error('A product with this name already exists.')
        }
    }

    await db.product.upsert({
        update: data,
        create: data,
        where: {
            id: data.id ?? '',
        },
    })
    revalidatePath('/products')
}
