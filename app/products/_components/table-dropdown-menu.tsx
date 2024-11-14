import {
    AlertDialog,
    AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog'
import { Button } from '@/app/_components/ui/button'
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu'
import { Ellipsis, ClipboardCopy, SquarePen, Trash } from 'lucide-react'
import DeleteProductDialogContent from './delete-dialog-content'
import UpsertProductDialogContent from './upsert-dialog-content'
import { useState } from 'react'

import { Product } from '@prisma/client'

interface ProductActionsProps {
    product: Product
}

const ProductTableDropDownMenu = ({ product }: ProductActionsProps) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false)

    const defaultValues = {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        stock: product.stock,
    }

    return (
        <AlertDialog>
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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
                                navigator.clipboard.writeText(product.id!)
                            }
                        >
                            <ClipboardCopy size={16} />
                            Copiar ID
                        </DropdownMenuItem>
                        <DialogTrigger asChild>
                            <DropdownMenuItem className="gap-1.5">
                                <SquarePen size={16} />
                                Editar
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="gap-1.5">
                                <Trash size={16} />
                                Deletar
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
                <UpsertProductDialogContent
                    defaultValues={defaultValues}
                    onSuccess={() => setEditDialogOpen(false)}
                />
                <DeleteProductDialogContent productId={product.id!} />
            </Dialog>
        </AlertDialog>
    )
}

export default ProductTableDropDownMenu
