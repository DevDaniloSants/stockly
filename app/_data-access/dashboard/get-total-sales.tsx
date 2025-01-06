import { db } from '@/app/_lib/prisma'

export const getTotalSales = async (): Promise<number> => {
    const totalSales = await db.sale.count()
    return totalSales
}
