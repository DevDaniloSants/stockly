'use client'

import { SaleDto } from '@/app/_data-access/sale/get-sales'
import { formatCurrency } from '@/app/_helpers/currency'

import { ColumnDef } from '@tanstack/react-table'

import SaleTableDropDownMenu from './table-dropdown-menu'

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
        cell: ({ row: { original: sale } }) => {
            return <SaleTableDropDownMenu sale={sale} />
        },
    },
]
