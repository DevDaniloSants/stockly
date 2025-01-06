import { db } from '@/app/_lib/prisma'

export const getTotalRevenue = async (): Promise<number> => {
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(1000)
        }, 4000)
    })

    const totalRevenueQuery = `
    SELECT SUM("unitPrice" * "quantity") as "totalRevenue"
    FROM "SaleProduct"
    JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id";
    `

    const totalRevenue =
        await db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery)

    return totalRevenue[0].totalRevenue ?? 0
}
