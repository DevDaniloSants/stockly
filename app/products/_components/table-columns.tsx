'use client'

import { Badge } from '@/app/_components/ui/badge'

import { Product } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Circle } from 'lucide-react'
import ProductTableDropDownMenu from './table-dropdown-menu'

const getStatusLabel = (status: string) => {
    if (status === 'IN_STOCK') {
        return 'Em estoque'
    }

    return 'Fora de estoque'
}

export const productsColums: ColumnDef<Product>[] = [
    {
        accessorKey: 'name',
        header: 'Produto',
    },
    {
        accessorKey: 'price',
        header: 'Valor unitário',
        cell: ({ row: { original } }) => {
            const price = original.price
            return Intl.NumberFormat('pt-Br', {
                style: 'currency',
                currency: 'BRL',
            }).format(Number(price))
        },
    },
    {
        accessorKey: 'stock',
        header: 'Estoque',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status
            const label = getStatusLabel(status)
            if (status === 'IN_STOCK') {
                return (
                    <Badge
                        variant={`${label === 'Em estoque' ? 'secondary' : 'default'}`}
                    >
                        <Circle size={10} className="fill-current" />
                        Em estoque
                    </Badge>
                )
            }

            return (
                <Badge
                    variant={`${label === 'Em estoque' ? 'secondary' : 'default'}`}
                >
                    <Circle size={10} className="fill-current" />
                    Esgotado
                </Badge>
            )
        },
    },
    {
        accessorKey: 'actions',
        header: 'Ações',
        cell({ row }) {
            const product = {
                ...row.original,
                price: Number(row.original.price),
            }

            return <ProductTableDropDownMenu product={product} />
        },
    },
]
