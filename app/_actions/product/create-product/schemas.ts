import { z } from 'zod'

export const createProductSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: 'O nome do produto é obrigatório.' }),
    price: z
        .number()
        .min(0.01, { message: 'O preço do produto é obrigatório.' }),
    stock: z.coerce
        .number()
        .positive({
            message: 'A quantidade do produto deve ser positiva.',
        })
        .min(1, { message: 'A quantidade do produto é obrigatória.' }),
})

export type CreateProductSchema = z.infer<typeof createProductSchema>
