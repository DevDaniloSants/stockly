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
import { ClipboardCopy, EllipsisIcon, Trash } from 'lucide-react'

interface SaleDropDownMenuProps {
    product: Pick<Product, 'id'>
    onDelete: (productId: string) => void
}

const SaleDropDownMenu = ({ product, onDelete }: SaleDropDownMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <EllipsisIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="gap-1.5"
                    onClick={() => navigator.clipboard.writeText(product.id!)}
                >
                    <ClipboardCopy size={16} />
                    Copiar ID
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="gap-1.5"
                    onClick={() => onDelete(product.id)}
                >
                    <Trash size={16} />
                    Deletar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SaleDropDownMenu
