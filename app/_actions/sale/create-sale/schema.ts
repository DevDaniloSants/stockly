import { z } from 'zod'

export const createSaleSchame = z.object({
    products: z.array(
        z.object({
            id: z.string().uuid(),
            quantity: z.number().int().positive(),
        })
    ),
})

export type CreateSaleSchema = z.infer<typeof createSaleSchame>
