'use client'

import { ColumnDef } from '@tanstack/react-table'
import ProductTableDropDownMenu from './table-dropdown-menu'
import { ProductDto } from '@/app/_data-access/product/get-products'
import ProductStatusBadge from '@/app/_components/product-status-badge'

export const productsColums: ColumnDef<ProductDto>[] = [
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
        cell: ({ row: { original: product } }) => {
            return <ProductStatusBadge status={product.status} />
        },
    },
    {
        accessorKey: 'actions',
        header: 'Ações',
        cell: ({ row }) => {
            const product = {
                ...row.original,
                price: row.original.price,
            }

            return <ProductTableDropDownMenu product={product} />
        },
    },
]
