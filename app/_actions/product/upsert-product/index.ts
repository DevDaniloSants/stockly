'use server'

import { db } from '@/app/_lib/prisma'
import { upsertProductSchema } from './schemas'
import { revalidatePath } from 'next/cache'

import { actionClient } from '@/app/_lib/safe-action'
import { returnValidationErrors } from 'next-safe-action'

export const upsertProduct = actionClient
    .schema(upsertProductSchema)
    .action(async ({ parsedInput: { id, ...data } }) => {
        if (!id) {
            const product = await db.product.findFirst({
                where: {
                    name: data.name,
                },
            })

            if (product) {
                returnValidationErrors(upsertProductSchema, {
                    _errors: [`Product already exists.`],
                })
            }
        }

        await db.product.upsert({
            update: data,
            create: data,
            where: {
                id: id ?? '',
            },
        })
        revalidatePath('/products')
    })
