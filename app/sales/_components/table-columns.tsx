'use client'

import { Button } from '@/app/_components/ui/button'
import { SaleDto } from '@/app/_data-access/sale/get-sales'
import { formatCurrency } from '@/app/_helpers/currency'

import { ColumnDef } from '@tanstack/react-table'
import { EllipsisIcon } from 'lucide-react'

export const saleColumns: ColumnDef<SaleDto>[] = [
    {
        accessorKey: 'productsName',
        header: 'Produtos',
    },
    {
        accessorKey: 'totalProducts',
        header: 'Quantidade de Produtos',
    },
    {
        accessorKey: 'totalAmount',
        header: 'Valor Total',
        cell: ({
            row: {
                original: { totalAmount },
            },
        }) => {
            return formatCurrency(totalAmount)
        },
    },
    {
        header: 'Data',
        cell: ({
            row: {
                original: { date },
            },
        }) => {
            return new Date(date).toLocaleDateString('pt-BR')
        },
    },
    {
        header: 'Ações',
        cell: () => {
            return (
                <Button variant="ghost" size="icon">
                    <EllipsisIcon className="h-4 w-4" />
                </Button>
            )
        },
    },
]
