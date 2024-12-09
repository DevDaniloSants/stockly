'use client'

import { Button } from '@/app/_components/ui/button'
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet'
import UpsertSaleSheetContent from './upsert-sheet-content'
import { ComboboxOptions } from '@/app/_components/ui/combobox'
import { Product } from '@prisma/client'
import { useState } from 'react'

interface CreateSaleButtonProps {
    productOptions: ComboboxOptions[]
    products: Product[]
}

const CreateSaleButton = (props: CreateSaleButtonProps) => {
    const [sheetIsOpen, setSheetIsOpen] = useState(false)

    return (
        <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
                <Button>Adicionar venda</Button>
            </SheetTrigger>
            <UpsertSaleSheetContent
                {...props}
                setSheetIsOpen={setSheetIsOpen}
            />
        </Sheet>
    )
}

export default CreateSaleButton
