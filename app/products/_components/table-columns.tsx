'use client'

import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'
import { Product } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Circle, ClipboardCopy, Ellipsis, SquarePen, Trash } from 'lucide-react'

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
            const product = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <Ellipsis size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="gap-1.5"
                            onClick={() =>
                                navigator.clipboard.writeText(product.id)
                            }
                        >
                            <ClipboardCopy size={16} />
                            Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-1.5">
                            <SquarePen size={16} />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-1.5">
                            <Trash size={16} />
                            Deletar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
