'use client'

import { deleteSale } from '@/app/_actions/sale/delete-sale'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog'
import { Button } from '@/app/_components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'

import { Sale } from '@prisma/client'

import { Ellipsis, ClipboardCopy, SquarePen, Trash } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

interface SaleTableDropDownMenuProps {
    sale: Pick<Sale, 'id'>
}

const SaleTableDropDownMenu = ({ sale }: SaleTableDropDownMenuProps) => {
    const { execute: executeDeleteSale } = useAction(deleteSale, {
        onSuccess: () => {
            toast.success('Venda deletada com sucesso!')
        },
        onError: () => {
            toast.error('Erro ao deletar venda!')
        },
    })

    const handleCopyToClipboardClick = () => {
        navigator.clipboard.writeText(sale.id!)
        toast.success('ID copiado para a área de transferência!')
    }

    const handleConfirmDeleteClick = () => {
        executeDeleteSale({
            id: sale.id,
        })
    }

    return (
        <AlertDialog>
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
                        onClick={handleCopyToClipboardClick}
                    >
                        <ClipboardCopy size={16} />
                        Copiar ID
                    </DropdownMenuItem>

                    <DropdownMenuItem className="gap-1.5">
                        <SquarePen size={16} />
                        Editar
                    </DropdownMenuItem>

                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="gap-1.5">
                            <Trash size={16} />
                            Deletar
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Você está prestes a excluir este venda. Esta ação pode
                        não ser desfeito. Deseja continuar ?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmDeleteClick}>
                        Continuar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SaleTableDropDownMenu
