'use server'

import { db } from '@/app/_lib/prisma'
import { upsertProductSchema, UpsertProductSchema } from './schemas'
import { revalidatePath } from 'next/cache'

export const upsertProduct = async (data: UpsertProductSchema) => {
    upsertProductSchema.parse(data)
    await db.product.upsert({
        update: data,
        create: data,
        where: {
            id: data.id ?? '',
        },
    })
    revalidatePath('/products')
}
