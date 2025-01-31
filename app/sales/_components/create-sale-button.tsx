'use client'

import { Button } from '@/app/_components/ui/button'
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet'
import UpsertSaleSheetContent from './upsert-sheet-content'
import { ComboboxOptions } from '@/app/_components/ui/combobox'

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { ProductDto } from '@/app/_data-access/product/get-products'

interface UpsertSaleButtonProps {
    productOptions: ComboboxOptions[]
    products: ProductDto[]
}

const UpsertSaleButton = (props: UpsertSaleButtonProps) => {
    const [sheetIsOpen, setSheetIsOpen] = useState(false)

    return (
        <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
                <Button className="w-full gap-2">
                    <PlusIcon size={20} /> Adicionar venda
                </Button>
            </SheetTrigger>
            <UpsertSaleSheetContent
                isOpen={sheetIsOpen}
                {...props}
                setSheetIsOpen={setSheetIsOpen}
            />
        </Sheet>
    )
}

export default UpsertSaleButton
